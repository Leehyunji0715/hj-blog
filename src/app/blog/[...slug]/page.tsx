import CategoryChipList from "@/components/CategoryChipList";
import GridPostList from "@/components/GridPostList";
import PostPaginator from "@/components/PostPaginator";
import { Category } from "@/model/Category";
import { getPosts } from "@/service/posts";

type Props = {
    params: { slug: string[] }
};

export const dynamic = 'force-static';

export async function generateStaticParams() {
    return Object.values(Category).map((category) => ([ category, 1 ]))
}   

const ALL = 'all';
const UNIT = 12; // 한 페이지에 보여질 포스트 개수

const isInRange = (pageNo: number, i: number) => UNIT * (pageNo - 1) <= i && i < UNIT * pageNo;

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
        <PostPaginator total={totalCount} itemsPerPage={UNIT}/>
    </div>;
}