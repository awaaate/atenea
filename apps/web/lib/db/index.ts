import { PrismaClient, type Prisma } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export const db = prisma;


type ModelNames = Prisma.ModelName; // "User" | "Post"

export type Models = {
    [M in ModelNames]: Exclude<
        Awaited<ReturnType<PrismaClient[Uncapitalize<M>]["findUnique"]>>,
        null
    >;
};

