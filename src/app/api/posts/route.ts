import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json("SUCCESS", { status: 200 });
}