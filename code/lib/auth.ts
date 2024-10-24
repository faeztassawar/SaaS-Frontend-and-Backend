import GoogleProvider from "next-auth/providers/google";
import { getServerSession, NextAuthOptions } from "next-auth";



const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
};
export { authOptions };

export const getAuthSession = () => getServerSession(authOptions)