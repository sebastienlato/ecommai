import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  // eslint-disable-next-line no-var
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

type GlobalThisWithPrisma = typeof globalThis & {
  prisma: ReturnType<typeof prismaClientSingleton> | undefined;
};

export const prisma =
  (globalThis as GlobalThisWithPrisma).prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production")
  (globalThis as GlobalThisWithPrisma).prisma = prisma;
