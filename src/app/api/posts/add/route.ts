import { addPost } from "@/service/posts";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { $Enums, Category } from "@prisma/client";
import { NextApiResponse } from "next";

export async function POST(request: NextRequest, res: NextApiResponse) {
    const session = await getServerSession(authOptions);
    if (session?.user.role !== $Enums.Role.ADMIN) {
        return new Response('Authentication Error', { status: 401 })
    }
    const formData = await request.formData();
    const title = formData.get('title')?.toString();
    const category = formData.get('category')?.toString() as Category;
    const content = formData.get('content')?.toString();
    const imageFile = formData.get('imageFile') as Blob;
    const imageURL = formData.get('imageURL')?.toString();
    const image = imageFile ?? imageURL;
    
    if (!title || !category || !content) {
        return new Response('Bad Request', { status: 400 })
    }

    return addPost({ title, content, category, image })
    .then(async post => {
        /** ISR: on-demand revalidate: https://nextjs.org/docs/pages/building-your-application/rendering/incremental-static-regeneration */
        await res.revalidate("/blog/all/1")
        return NextResponse.json(post, { status: 200 })
    })
    .catch(err => new Response(err, { status: 500 }));
}