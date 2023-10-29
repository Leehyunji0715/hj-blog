'use client';

import Link from "next/link";
import Chip from "./Chip";

type Props = {
    currentCategory: string;
    categories: string[];
}

export default function CategoryChipList({currentCategory, categories}: Props) {
    return (
        <ul className="blog-category">
            {categories.map(category => <li key={category}>
                <Link href={`/blog/${category}/1`}>
                    <Chip 
                        text={category} 
                        highlight={category === currentCategory} 
                        fill={category === currentCategory}
                        baseBackground
                        round 
                        size='small'
                    />
                </Link>
            </li>)}
        </ul>
    )
}