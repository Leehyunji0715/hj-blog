'use client';

import { createContext, useContext } from "react";
import { Post } from "@prisma/client";

const PostListContext = createContext<Post[]>([]);

type Props = {
    initValue: Post[]
    children: React.ReactNode;
}

export function PostListProvider({initValue=[], children}: Props) {
    return <PostListContext.Provider value={initValue}>
        {children}
    </PostListContext.Provider>
}

export function usePostListValue() {
    const value = useContext(PostListContext);
    if (value === undefined) {
      throw new Error('usePostListValue should be used within CounterProvider');
    }
    return value;
}