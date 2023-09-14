import { prisma } from "./prisma";

export async function addUser({ id, name, email }: {
    id: string, name: string, email: string
}) {
    return prisma.user.upsert({
        create: { id, name, email },
        update: { },
        where: { id }
    })
    .catch(async () => {
        await prisma.$disconnect();
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
}

export async function hasSignedBefore(id: string) {
    return prisma.user.findFirst({
        where: { id },
        select: { email: true }
    })
    .catch(async () => {
        await prisma.$disconnect();
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
}

export async function getUserRole(id: string) {
    return prisma.user.findFirst({
        where: { id },
        select: { role: true }
    })
    .catch(async () => {
        await prisma.$disconnect();
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
}