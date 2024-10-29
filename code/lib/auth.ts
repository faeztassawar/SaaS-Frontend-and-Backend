import GoogleProvider from "next-auth/providers/google";
import prisma from "./connect";
import { getServerSession, NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"; // Correct import
import { PrismaClient } from "@prisma/client";
import type { AdapterUser } from "next-auth/adapters"; // Import AdapterUser type

interface Session {
    user?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        role?: string; // Add role here
    };
}

interface User {
    role?: string; // Add role to User type as well
}

const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma as PrismaClient),

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],

    callbacks: {
        async signIn({ user, account }) {
            // Ensure account?.oauth_token_params is defined and typed
            const { role }: any = account?.oauth_token_params ?? "USER"; // Default to "USER" if no role is specified

            // Upsert user with the specified role (either OWNER or USER)
            await prisma.user.upsert({
                where: { email: user.email! }, // Use non-null assertion operator
                update: { role },
                create: { email: user.email!, name: user.name, role }, // Use non-null assertion operator
            });

            return true;
        },
        async session({ session, user }) {
            // Check if session.user is defined and typecast user
            if (session.user) {
                session.user.role = (user as AdapterUser).role; // Cast user to AdapterUser
            }
            return session;
        },
    },
};

export { authOptions };
export const getAuthSession = () => getServerSession(authOptions);
