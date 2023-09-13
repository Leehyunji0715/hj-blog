import CategoryChipList from "@/components/CategoryChipList";
import GridPostList from "@/components/GridPostList";
import PostPaginator from "@/components/PostPaginator";
import { Category } from "@/model/Category";
import { getPosts, postCount } from "@/service/posts";
import { $Enums } from "@prisma/client";

type Props = {
    params: { slug: string[] }
};

export async function generateStaticParams() {
    return Object.values($Enums.Category).map((category) => ([ category, 1 ]))
}   

export default async function BlogPageByCategory({ params: {slug}}: Props) {
    const countInfo = await postCount();
    const category = slug[0] as Category;
    const pageNo = Number(slug[1]);
    const posts = await getPosts(pageNo, category === 'all' ? undefined : category);
    const curCount = category === 'all' ? 
        countInfo.reduce((acc, cur) => acc + cur._count, 0) 
        : countInfo.find(info => info.category === category)?._count ?? 0;
    return <div className="blog">
        <CategoryChipList/>
        <div className="blog__post-list">
            <GridPostList posts={posts ?? []}/>
        </div>
        <PostPaginator total={curCount}/>
    </div>;
}