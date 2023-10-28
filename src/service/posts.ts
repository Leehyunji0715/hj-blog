import path from "path";
import { cache } from "react";
import { promises as fs } from "fs"; 
import { $Enums } from "@prisma/client";
import { prisma } from "./prisma";

export type Post = {
    title: string;
    description: string;
    date: Date;
    category: string;
    path: string;
    featured: boolean
};

export type PostData = Post & { content: string, next: Post | null, prev: Post | null };

// export async function postCount() {
//     return await prisma.post.groupBy({ by: 'category', _count: true})
//     .catch(async (e) => {
//         await prisma.$disconnect();
//         process.exit(1);
//     })
//     .finally(async () => {
//         await prisma.$disconnect();
//     });
// }

export const getPosts = cache(async () => {
    const filePath = path.join(process.cwd(), 'src/data', 'posts.json');
    return fs.readFile(filePath, 'utf-8')
        .then<Post[]>(JSON.parse)
        .then((posts) => posts.sort((a, b) => a.date > b.date ? -1 : 1));
});

export async function getPost(path: string): Promise<Post | undefined> {
    const posts = await getPosts();
    return posts.find((item) => item.path === path);
}

export async function getPostContent(fileName: string): Promise<PostData>  {
    const filePath = path.join(process.cwd(), 'src/data', 'posts', `${fileName}.mdx`);
    const posts = await getPosts();
    const post = posts.find(post => post.path === fileName);

    if (!post)  throw new Error(`${fileName}에 해당하는 내용을 찾을 수 없음`);
    const index = posts.indexOf(post);
    const prev = index > 0 ? posts[index - 1]: null;
    const next = index < posts.length - 1 ? posts[index + 1] : null;
    const content = await fs.readFile(filePath, 'utf-8');

    return { next, prev, content, ...post };
}

export async function addPost({ title, content, category, image }: 
    { title: string, content: string, category: $Enums.Category, image?: string | Blob, imageFile?: Blob }
) {
    const arrayBuffer = typeof image !== 'string' ? await (image as Blob)?.arrayBuffer() : null;

    return await prisma.post.create({
        data: {
          title: title,
          content: content,
          category: category,
          image: typeof image === 'string' ? image : null,
          imageFile: arrayBuffer ? Buffer.from(arrayBuffer) : null,
          published: true
        }
    })
    .catch(async (e) => {
        await prisma.$disconnect();
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
}

export async function updatePost({ id, content, image }: 
    { id: number, content: string, image?: string }
) {
    const data = { content, image };

    if (!image) {
        delete data.image;
    }

    return await prisma.post.update({
        where: { id: id },
        data
    })
    .catch(async (e) => {
        await prisma.$disconnect();
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
}