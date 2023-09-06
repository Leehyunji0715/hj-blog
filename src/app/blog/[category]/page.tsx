import FilterablePosts from "@/components/FilterablePosts";
import Paginator from "@/components/Paginator";
import { Category } from "@/model/Category";
import { postCount } from "@/service/posts";

type Props = {
    params: { category: Category }
    searchParams: { page: number };
};

export default async function BlogPageByCategory({ params: {category}, searchParams: {page} }: Props) {
    const countInfo = await postCount();
    const curCount = category === 'all' ? 
        countInfo.reduce((acc, cur) => acc + cur._count, 0) 
        : countInfo.find(info => info.category === category)?._count ?? 0;
    
    return <>
        <FilterablePosts category={category} pageNum={page}/>
        <Paginator unit={12} total={curCount}/>
    </>;
}