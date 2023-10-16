import { getPost } from "@/service/posts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { id } = await request.json(); 
    const pageId = Number(id);
    if (!pageId || Number.isNaN(pageId)) {
        return new Response('Invalid pageId', { status: 500 });
    }

    return getPost(id)
    .then(post => NextResponse.json(post, { status: 200 }))
    .catch(err => new Response(err, { status: 500 }));
}