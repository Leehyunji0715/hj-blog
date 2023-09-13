'use client';

import Link from "next/link";
import { useParams } from "next/navigation";
import { $Enums } from "@prisma/client";
import Chip from "./Chip";

export const ALL = 'all';
const categories = [ALL].concat(Object.values($Enums.Category));

export default function CategoryChipList() {
    const curCategory = useParams().slug[0];
    
    return (
        <ul className="blog-category">
            {categories.map(category => <li key={category}>
                <Link href={`/blog/${category}/1`}>
                    <Chip 
                        text={category} 
                        highlight={category === curCategory} 
                        fill={category === curCategory}
                        baseBackground
                        round 
                        size='small'
                    />
                </Link>
            </li>)}
        </ul>
    )
}