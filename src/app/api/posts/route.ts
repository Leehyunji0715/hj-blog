import { getPosts } from "@/service/posts";
import { $Enums } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const category = req.nextUrl.searchParams.get('category') as $Enums.Category;

    return getPosts(0, category)
        .then(posts => NextResponse.json(posts, { status: 200 }))
        .catch(err => new Response(err, { status: 500 }));
}