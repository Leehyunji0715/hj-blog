import { NextRequest, NextResponse } from "next/server";
import { updatePost } from "@/service/posts";

export async function POST(request: NextRequest) {
    const { id, content, image } = await request.json(); 
    return updatePost({ id, content, image })
    .then(post => NextResponse.json(post, { status: 200 }))
    .catch(err => new Response(err, { status: 500 }));
}