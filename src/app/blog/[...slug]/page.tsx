import CategoryChipList from '@/components/CategoryChipList'
import GridPostList from '@/components/GridPostList'
import PostPaginator from '@/components/PostPaginator'
import { Category } from '@/model/Category'
import { getPostCount, getPosts } from '@/service/posts'
import { genPageMetadata } from '@/util/seo'
import { trimAlphaNumeric } from '@/util/url'

type Props = {
  params: { slug: string[] }
}

export const metadata = genPageMetadata({ title: 'Blog' })

// ISR configuration: revalidate every hour
export const revalidate = 3600

export async function generateStaticParams() {
  const count = await getPostCount()
  return [Category.ALL, ...Object.keys(count)].map((category) => [category, 1])
}

const ALL = 'all'
const POSTS_PER_PAGE = 12

const isInRange = (pageNo: number, i: number) =>
  POSTS_PER_PAGE * (pageNo - 1) <= i && i < POSTS_PER_PAGE * pageNo

export default async function BlogPageByCategory({ params: { slug } }: Props) {
  const count = await getPostCount()
  const categories = [Category.ALL, ...Object.keys(count)]
  const category = slug[0] as Category
  const pageNo = Number(slug[1])
  const posts = await getPosts()
  let totalCount = category === ALL ? posts.length : 0
  const displayedPosts = posts
  // category === ALL || !category /** TODO: REMOVE */
  //   ? posts.filter((_, i) => isInRange(pageNo, i))
  //   : posts.filter((p, i) => {
  //       console.log('##############3 properties', p.properties.category)
  //       const postCategory = trimAlphaNumeric(p.properties.category)
  //       const slugCategory = trimAlphaNumeric(category)
  //       if (postCategory !== slugCategory) return false
  //       totalCount++
  //       return postCategory === slugCategory && isInRange(pageNo, i)
  //     })

  return (
    <div className='blog'>
      <CategoryChipList currentCategory={category} categories={categories} />
      <div className='blog__post-list'>
        {displayedPosts.length ? <GridPostList posts={displayedPosts} /> : 'No Post'}
      </div>
      <PostPaginator total={totalCount} itemsPerPage={POSTS_PER_PAGE} />
    </div>
  )
}
