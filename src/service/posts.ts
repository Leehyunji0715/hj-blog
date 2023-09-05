import { $Enums, Post } from "@prisma/client";
import { prisma } from "./prisma";

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
        skip: pageNo * size,
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
          title: 'Test 6',
          content: '# Heading level 1',
          category: 'TEST',
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