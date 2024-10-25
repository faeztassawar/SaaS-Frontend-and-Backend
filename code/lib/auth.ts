import GoogleProvider from "next-auth/providers/google";
import prisma from "./connect";
import { getServerSession, NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";


const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
};
export { authOptions };

export const getAuthSession = () => getServerSession(authOptions)