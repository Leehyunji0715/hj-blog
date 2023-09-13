'use client';

import { usePathname, useRouter, useParams, redirect } from "next/navigation";
import { LeftIcon, RightIcon } from "./icons";
import PaginatorItem from "./PaginatorItem";

type Props = {
    total: number;
};

const UNIT = 12;
const _ = Array(3).fill([]); 

export default function PostPaginator({ total }: Props) {
    const path = usePathname();
    const router = useRouter();
    const curPageNum = Number(useParams().slug[1]);
    const rangeMin = 1;
    const rangeMax = Math.ceil(total / UNIT);
    
    if (Number.isNaN(curPageNum) || curPageNum < rangeMin || curPageNum > rangeMax) {
        redirect(`/blog/all/1`);
    }

    const movePage = (pageNo: number) => {
        const matches = path.match(/\/([^/]+)\/([^/]+)/);
        if (matches) {
            const category = matches[2];
            router.push(`/blog/${category}/${pageNo}`);
        }
    };

    const getPageNumList = () => {
        if (curPageNum <= 3) {
            return [2, 3, 4, 5];
        } else if (curPageNum >= rangeMax-2) {
            return [rangeMax-4, rangeMax-3, rangeMax-2, rangeMax-1]
        } else {
            return [curPageNum - 1, curPageNum, curPageNum + 1];
        }
    };

    return (
        <div className="pagination">
            <PaginatorItem 
                item={<LeftIcon/>} 
                onClick={() => movePage(curPageNum - 1)}
                disabled={rangeMin >= curPageNum}
            />
            <PaginatorItem 
                item={rangeMin} 
                onClick={() => movePage(rangeMin)}
                isSelected={rangeMin === curPageNum}
            />
            { curPageNum > rangeMin + 2 && <PaginatorItem item='...'/> }
            { getPageNumList().map((value) => {
                return (rangeMin < value && value < rangeMax) && (
                    <PaginatorItem 
                        key={value}
                        item={value} 
                        onClick={() => movePage(value)}
                        isSelected={value === curPageNum}
                    />
                )
            })}
            { curPageNum < rangeMax - 2 && <PaginatorItem item='...'/> }
            {
                rangeMax > 1 &&
                <PaginatorItem 
                    item={rangeMax} 
                    onClick={() => movePage(rangeMax)}
                    isSelected={rangeMax === curPageNum}
                />
            }
            <PaginatorItem 
                item={<RightIcon/>} 
                onClick={() => movePage(curPageNum + 1)}
                disabled={rangeMax === curPageNum}
            />
        </div>
    )
}