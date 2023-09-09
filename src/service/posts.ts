import { $Enums, Post } from "@prisma/client";
import { prisma } from "./prisma";

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

export async function addPost() {
    return await prisma.post.create({
        data: {
          title: 'General 6',
          content: '# Heading level 1',
          category: 'GENERAL',
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

export async function getPost(id: number): Promise<Post | null> {
    return await prisma.post.findFirst({
        where: { id: id }
    })
    .catch(async (e) => {
        await prisma.$disconnect();
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
}