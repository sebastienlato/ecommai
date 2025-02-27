import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

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

const config = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
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
          role: user.role as Role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.role) {
        token.role = user.role as Role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.role) {
        session.user.role = token.role as Role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  session: { strategy: "jwt" },
} satisfies NextAuthConfig;

const { handlers, auth, signIn, signOut } = NextAuth(config);

export { handlers, auth, signIn, signOut };
