'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
// import { Post } from '@prisma/client'
import GridPostList from './GridPostList'
import CategoryChipList from './CategoryChipList'
import { Post } from '@/service/posts'

type PostListProps = {
    posts: Post[]
    // title: string
    // initialDisplayPosts?: CoreContent<Blog>[]
    // pagination?: PaginationProps
}

export default function FilterablePosts({ posts }: PostListProps) {
    const [searchValue, setSearchValue] = useState('')
    const filteredBlogPosts = posts.filter((post) => {
        const searchContent = post.title /* + post.summary + post.tags?.join(' ')*/
        return searchContent.toLowerCase().includes(searchValue.toLowerCase())
    });
    const displayPosts = filteredBlogPosts;
    return (
        <>
            {/* <CategoryChipList/> */}
            <GridPostList posts={displayPosts}/>
        </>
    );
}