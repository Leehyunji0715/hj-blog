import { postCount } from "@/service/posts";
import { NextResponse } from "next/server";

// TODO: API 호출 안하면 삭제하기 
export async function GET() {
    return postCount()
        .then(count => NextResponse.json(count, { status: 200 }))
        .catch(err => new Response(err, { status: 500 }));
}