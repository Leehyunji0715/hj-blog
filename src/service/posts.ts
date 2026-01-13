import { cache } from 'react'
import { getNotionPosts, getNotionPostContent, getNotionPostByPath } from './notion'

export type Post = {
  title: string
  description: string
  date: Date
  category: string
  path: string
  image: string
  published: boolean
}

export type PostData = Post & { content: string; next: Post | null; prev: Post | null }

export const revalidate = 3600 // 1 hour (ISR revalidation time)

export const getPostCount = cache(async () => {
  const posts = await getNotionPosts()
  const count: Record<string, number> = {}

  posts.forEach((post) => {
    count[post.category] = (count[post.category] || 0) + 1
  })

  return count
})

export const getPosts = cache(async () => {
  return getNotionPosts()
})

export async function getPost(path: string): Promise<Post | undefined> {
  return getNotionPostByPath(path)
}

export async function getPostContent(fileName: string): Promise<PostData> {
  const posts = await getPosts()
  const post = posts.find((post) => post.path === fileName)

  if (!post) throw new Error(`${fileName}에 해당하는 내용을 찾을 수 없음`)

  const index = posts.indexOf(post)
  const prev = index > 0 ? posts[index - 1] : null
  const next = index < posts.length - 1 ? posts[index + 1] : null

  // Notion page ID를 사용하여 컨텐츠 가져오기
  // fileName이 실제로는 page의 path이고, 이것이 notion page ID일 수 있음
  const content = await getNotionPostContent(fileName)

  return { next, prev, content, ...post }
}
