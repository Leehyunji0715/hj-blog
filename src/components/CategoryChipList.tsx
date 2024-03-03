'use client'

import Link from 'next/link'
import Chip from './Chip'
import { trimAlphaNumeric } from '@/util/url'

type Props = {
  currentCategory: string
  categories: string[]
}

export default function CategoryChipList({ currentCategory, categories }: Props) {
  return (
    <ul className='blog-category'>
      {categories.map((category) => {
        const isCurrent = trimAlphaNumeric(category) === trimAlphaNumeric(currentCategory)
        return (
          <li key={category}>
            <Link href={`/blog/${category}/1`}>
              <Chip
                text={category}
                highlight={isCurrent}
                fill={isCurrent}
                baseBackground
                round
                size='small'
              />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
