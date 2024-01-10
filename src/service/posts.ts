import path from 'path'
import { cache } from 'react'
import { promises as fs } from 'fs'

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

export const revalidate = 12 * 3600 // 12 hours

export const getPostCount = cache(async () => {
  const filePath = path.join(process.cwd(), 'src/data', 'count.json')
  return fs.readFile(filePath, 'utf-8').then(JSON.parse)
})

export const getPosts = cache(async () => {
  const filePath = path.join(process.cwd(), 'src/data', 'posts.json')
  return fs
    .readFile(filePath, 'utf-8')
    .then<Post[]>(JSON.parse)
    .then((posts) => posts.filter((p) => p.published))
    .then((posts) => posts.sort((a, b) => (a.date > b.date ? -1 : 1)))
})

export async function getPost(path: string): Promise<Post | undefined> {
  const posts = await getPosts()
  return posts.find((item) => item.path === path)
}

export async function getPostContent(fileName: string): Promise<PostData> {
  const filePath = path.join(process.cwd(), 'src/data', 'posts', `${fileName}.mdx`)
  const posts = await getPosts()
  const post = posts.find((post) => post.path === fileName)

  if (!post) throw new Error(`${fileName}에 해당하는 내용을 찾을 수 없음`)
  const index = posts.indexOf(post)
  const prev = index > 0 ? posts[index - 1] : null
  const next = index < posts.length - 1 ? posts[index + 1] : null
  const content = await fs.readFile(filePath, 'utf-8')

  return { next, prev, content, ...post }
}
