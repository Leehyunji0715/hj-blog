import { Client, DataSourceObjectResponse } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import { Post } from './posts'

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

const n2m = new NotionToMarkdown({ notionClient: notion })

const DATABASE_ID = process.env.NOTION_DATABASE_ID || ''

type NotionDataSource = {
  id: string
  type: string
  name?: string
}

type NotionDatabaseResponse = {
  data_sources: NotionDataSource[]
  title: any[]
  [key: string]: any
}

// type NotionPage = {
//   id: string
//   properties: {
//     Title: { title: { plain_text: string }[] }
//     Description: { rich_text: { plain_text: string }[] }
//     Category: { select: { name: string } }
//     Date: { date: { start: string } }
//     Tags: { multi_select: { name: string }[] }
//     Published: { checkbox: boolean }
//     Image: { rich_text: { plain_text: string }[] }
//     Path: { rich_text: { plain_text: string }[] }
//   }
// }

export async function getNotionPosts(): Promise<DataSourceObjectResponse[]> {
  try {
    const response = await notion.request<NotionDatabaseResponse>({
      method: 'get',
      path: `databases/${DATABASE_ID}`,
    })

    const dataSource = response.data_sources[0]
    const dataSourceResponse = await notion.dataSources.query({
      data_source_id: dataSource.id,
      page_size: 3,
      // filter_properties: ['status'], // TODO: published
    })
    console.log('dataSourceResponse', dataSourceResponse)
    const postList = dataSourceResponse.results as DataSourceObjectResponse[]
    return postList
  } catch (error) {
    console.error('Error fetching Notion posts:', error)
    return []
  }
}

export async function getNotionPostContent(pageId: string): Promise<string> {
  try {
    const mdblocks = await n2m.pageToMarkdown(pageId)
    const mdString = n2m.toMarkdownString(mdblocks)
    return mdString.parent
  } catch (error) {
    console.error('Error fetching Notion page content:', error)
    return ''
  }
}

export async function getNotionPostByPath(path: string): Promise<Post | undefined> {
  try {
    // Path로 검색
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        and: [
          {
            property: 'Path',
            rich_text: {
              equals: path,
            },
          },
          {
            property: 'Published',
            checkbox: {
              equals: true,
            },
          },
        ],
      },
    })

    if (response.results.length === 0) {
      // Path로 못찾으면 ID로 시도
      const idResponse = await notion.databases.query({
        database_id: DATABASE_ID,
        filter: {
          property: 'Published',
          checkbox: {
            equals: true,
          },
        },
      })

      const found = idResponse.results.find((page: any) => page.id === path)
      if (!found) return undefined

      const page = found as any
      const props = page.properties

      return {
        title: props.Title?.title?.[0]?.plain_text || 'Untitled',
        description: props.Description?.rich_text?.[0]?.plain_text || '',
        date: new Date(props.Date?.date?.start || Date.now()),
        category: props.Category?.select?.name || 'uncategorized',
        path: path,
        image: props.Image?.rich_text?.[0]?.plain_text || 'default_post_img.jpg',
        published: props.Published?.checkbox || false,
      }
    }

    const page = response.results[0] as any
    const props = page.properties

    return {
      title: props.Title?.title?.[0]?.plain_text || 'Untitled',
      description: props.Description?.rich_text?.[0]?.plain_text || '',
      date: new Date(props.Date?.date?.start || Date.now()),
      category: props.Category?.select?.name || 'uncategorized',
      path: path,
      image: props.Image?.rich_text?.[0]?.plain_text || 'default_post_img.jpg',
      published: props.Published?.checkbox || false,
    }
  } catch (error) {
    console.error('Error fetching Notion post by path:', error)
    return undefined
  }
}
