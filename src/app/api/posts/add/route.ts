import { addPost } from "@/service/posts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { title, content, category, image } = await request.json(); 
    return addPost({ title, content, category, image })
    .then(post => NextResponse.json(post, { status: 200 }))
    .catch(err => new Response(err, { status: 500 }));
}