import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { addUser, getUserRole } from "@/service/user";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        })
    ],
    callbacks: {
        async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.role = (await getUserRole(token.sub ?? ''))?.role;
            }
            return session;
        },
        async signIn({ user: { id, name, email } }) {
            if (!id || !email) {
                return false;
            }
            await addUser({ id, name: name || '', email });
            return true;
        }

    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }