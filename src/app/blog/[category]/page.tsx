import GridPostList from "@/components/GridPostList";
import PostPaginator from "@/components/PostPaginator";
import { Category } from "@/model/Category";
import { getPosts, postCount } from "@/service/posts";

type Props = {
    params: { category: Category }
    searchParams: { page: number };
};

export default async function BlogPageByCategory({ params: {category}, searchParams: {page} }: Props) {
    const countInfo = await postCount();
    const posts = await getPosts(page, category === 'all' ? undefined : category);
    const curCount = category === 'all' ? 
        countInfo.reduce((acc, cur) => acc + cur._count, 0) 
        : countInfo.find(info => info.category === category)?._count ?? 0;
    return <>
        <GridPostList posts={posts ?? []}/>
        <PostPaginator total={curCount}/>
    </>;
}