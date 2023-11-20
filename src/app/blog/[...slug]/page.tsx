import CategoryChipList from "@/components/CategoryChipList";
import GridPostList from "@/components/GridPostList";
import PostPaginator from "@/components/PostPaginator";
import { Category } from "@/model/Category";
import { getPosts } from "@/service/posts";
import { genPageMetadata } from "@/util/seo";

type Props = {
    params: { slug: string[] }
};

export const metadata = genPageMetadata({ title: 'Blog' });

export const dynamic = 'force-static';
export async function generateStaticParams() {
    return Object.values(Category).map((category) => ([ category, 1 ]))
}

const ALL = 'all';
const POSTS_PER_PAGE = 12;

const isInRange = (pageNo: number, i: number) => POSTS_PER_PAGE * (pageNo - 1) <= i && i < POSTS_PER_PAGE * pageNo;

export default async function BlogPageByCategory({ params: {slug}}: Props) {
    const categories = Object.values(Category);
    const category = slug[0] as Category;
    const pageNo = Number(slug[1]);
    const posts = await getPosts();
    let totalCount = category === ALL ? posts.length : 0;
    const displayedPosts = category === ALL ? posts.filter((_, i) => isInRange(pageNo, i))
        : posts.filter((p, i) => {
            if (p.category !== category) return false;
            totalCount++;
            return p.category === category && isInRange(pageNo, i)
        });
    
    
    return <div className="blog">
        <CategoryChipList currentCategory={category} categories={categories}/>
        <div className="blog__post-list">
            { displayedPosts.length ? <GridPostList posts={displayedPosts}/> : "No Post"}
        </div>
        <PostPaginator total={totalCount} itemsPerPage={POSTS_PER_PAGE}/>
    </div>;
}