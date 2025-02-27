import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";

declare module "next-auth" {
  interface User {
    role?: "ADMIN" | "USER";
  }
  interface Session {
    user: User & {
      role?: "ADMIN" | "USER";
    };
  }
  interface JWT {
    role?: "ADMIN" | "USER";
  }
}

type Role = "ADMIN" | "USER";

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  providers: [
    ...authConfig.providers.slice(0, -1),
    Credentials({
      async authorize(credentials) {
        if (
          !credentials ||
          !("email" in credentials) ||
          !("password" in credentials)
        ) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
});
