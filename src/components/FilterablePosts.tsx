'use client';
import { useState } from 'react';
import { Post } from "@prisma/client";
import GridPostList from './GridPostList';
import Chip from './Chip';


type Props = {
    posts: Post[];
    categories: string[];
};

const ALL = 'All';

export default function FilterablePosts({ posts, categories }: Props) {
    const [selected, setSelected] = useState(ALL);

    return (
        <div>
            <ul className="blog-category">
                {categories.map(category => <li onClick={() => setSelected(category)}>
                    <Chip 
                        text={category} 
                        highlight={category === selected} 
                        fill={category === selected}
                        round 
                        size='small'
                    />
                </li>)}
            </ul>
            <GridPostList posts={posts}/>
        </div>
    )
}