import { NextRequest, NextResponse } from "next/server";
import { Category } from "@/model/Category";
import { getPosts } from "@/service/posts";

export async function GET(req: NextRequest) {
    const category = req.nextUrl.searchParams.get('category') as Category;

    return getPosts()
        .then(posts => NextResponse.json(posts, { status: 200 }))
        .catch(err => new Response(err, { status: 500 }));
}