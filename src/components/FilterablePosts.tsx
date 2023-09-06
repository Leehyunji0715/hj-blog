'use client';
import useSWR from 'swr';
import GridPostList from './GridPostList';
import { Category } from '@/model/Category';

type Props = {
    pageNum: number;
    category: Category;
}

export default function FilterablePosts({ pageNum=1, category }: Props) {
    const {data, isLoading} = useSWR(`/api/posts/${category}?page=${pageNum}`);
    const posts = data;
    
    return (
        <>
            { isLoading ? <span>loading</span> : <GridPostList posts={posts ?? []}/> }
        </>
    )
}