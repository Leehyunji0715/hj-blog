'use client';

import { useQuery } from '@tanstack/react-query'

export default function BlogPage() {
    const { isLoading, error, data } = useQuery({
        queryKey: ['/api/posts'],
        queryFn: () =>
          fetch('/api/posts').then(
            (res) => res.json(),
          ),
      }) 
    return <div className="blog">
        블로그
        <ul>카테고리</ul>
        <section>
            목차
        </section>
    </div>;
}