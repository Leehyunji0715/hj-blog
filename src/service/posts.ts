import { $Enums, Post } from "@prisma/client";
import { prisma } from "./prisma";

export const data: {
    posts: Post[] | undefined
} = {
    posts: undefined
};

export async function postCount() {
    return await prisma.post.groupBy({ by: 'category', _count: true})
    .catch(async (e) => {
        await prisma.$disconnect();
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
}

export async function getAllPosts(): Promise<Post[]> {
    console.log(data.posts?.length);
    if (data.posts) return data.posts;

    return prisma.post.findMany({
        where: { published: true },
        orderBy: {
            createdAt: 'desc'
        }
    })
    .then(posts => {
        data.posts = posts;
        return posts;
    })
    .catch(async (e) => {
        await prisma.$disconnect();
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
}

export async function getPosts(pageNo: number = 0, category?: $Enums.Category): Promise<Post[]> {
    const size = 12;
    const where = {
        published: true,
        category
    };
    if (!where.category) {
        delete where.category;
    }
    return await prisma.post.findMany({
        skip: (pageNo - 1) * size,
        take: size,
        where: where,
        orderBy: {
            createdAt: 'desc'
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

export async function getPost(id: number): Promise<Post | null> {
    return (await getAllPosts()).find(post => post.id === id) ?? null;
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