import CategoryChipList from "@/components/CategoryChipList";
import GridPostList from "@/components/GridPostList";
import PostPaginator from "@/components/PostPaginator";
import { Category } from "@/model/Category";
import { getPosts } from "@/service/posts";
import { $Enums } from "@prisma/client";

type Props = {
    params: { slug: string[] }
};

export const dynamic = 'force-static';

export async function generateStaticParams() {
    return Object.values($Enums.Category).map((category) => ([ category, 1 ]))
}   

export default async function BlogPageByCategory({ params: {slug}}: Props) {
    // export const ALL = 'all';
    const categories = Object.values($Enums.Category); // ['all'].concat(Object.values($Enums.Category));
    const category = slug[0] as Category;
    const pageNo = Number(slug[1]);
    // const posts = await getPosts(pageNo, category === 'all' ? undefined : category);
    const posts = await getPosts();
    // const countInfo = await postCount();
    const curCount = category === 'all' ? posts.length : posts.filter(p => p.category === category).length;
        // countInfo.reduce((acc, cur) => acc + cur._count, 0) 
        // : countInfo.find(info => info.category === category)?._count ?? 0;
    
    return <div className="blog">
        <CategoryChipList currentCategory={category} categories={categories}/>
        <div className="blog__post-list">
            { posts.length ? <GridPostList posts={posts}/> : "No Post"}
        </div>
        <PostPaginator total={curCount}/>
    </div>;
}