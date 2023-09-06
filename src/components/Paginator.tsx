'use client';

import { useSearchParams } from "next/navigation";

type Props = {
    unit: number;
    total: number;
};

export default function Paginator({ unit, total }: Props) {
    const pageNum = useSearchParams().get('page');
    console.log("pageNum", pageNum);

    return (
        <div className="pagination">
            Pagination {unit} {total}
        </div>
    )
}