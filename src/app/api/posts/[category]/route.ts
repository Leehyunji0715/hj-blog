import { Category } from "@/model/Category";
import { getPosts } from "@/service/posts";
import { NextRequest, NextResponse } from "next/server";

type Context = {
    params: { category: Category };
}

export async function GET(request: NextRequest, context: Context) {
    const pageNum = Number(request.nextUrl.searchParams.get('page')) ?? 1;
    const category = context.params.category === 'all' ? undefined : context.params.category;
    
    return getPosts(pageNum, category)
    .then(posts => NextResponse.json(posts, { status: 200 }))
    .catch(err => new Response(err, { status: 500 }));
}