'use client';

import { usePathname, useSearchParams, useRouter, redirect } from "next/navigation";
import { LeftIcon, RightIcon } from "./icons";
import PaginatorItem from "./PaginatorItem";
import { useEffect } from "react";

type Props = {
    total: number;
};

const UNIT = 12;
const _ = Array(3).fill([]); 

export default function PostPaginator({ total }: Props) {
    const path = usePathname();
    const router = useRouter();
    const curPageNum = parseInt(useSearchParams().get('page') ?? '');
    const rangeMin = 1;
    const rangeMax = Math.ceil(total / UNIT);
    
    if (curPageNum < rangeMin || curPageNum > rangeMax) {
        redirect(`${path}?page=1`);
    }

    const movePage = (page: number) => {
        router.push(`${path}?page=${page}`);
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

    useEffect(() => {
        router.push(`${path}?page=1`);
    }, []);

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
                        item={value} 
                        onClick={() => movePage(value)}
                        isSelected={value === curPageNum}
                    />
                )
            })}
            { curPageNum < rangeMax - 2 && <PaginatorItem item='...'/> }
            <PaginatorItem 
                item={rangeMax} 
                onClick={() => movePage(rangeMax)}
                isSelected={rangeMax === curPageNum}
            />
            <PaginatorItem 
                item={<RightIcon/>} 
                onClick={() => movePage(curPageNum + 1)}
                disabled={rangeMax === curPageNum}
            />
        </div>
    )
}