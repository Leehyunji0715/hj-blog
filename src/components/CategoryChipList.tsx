'use client';

import Link from "next/link";
import { useParams } from "next/navigation";
import { $Enums } from "@prisma/client";
import Chip from "./Chip";

type Props = {
    currentCategory: string;
    categories: string[];
}

const ALL = 'all';

export default function CategoryChipList({currentCategory, categories}: Props) {
    // const curCategory = useParams().slug[0];
    
    return (
        <ul className="blog-category">
            <Link href={`/blog`}>
                <Chip 
                    text={ALL} 
                    highlight={ALL === currentCategory} 
                    fill={ALL === currentCategory}
                    baseBackground
                    round 
                    size='small'
                />
            </Link>
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