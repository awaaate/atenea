import { authOptions } from "@/lib/auth/authOptions";
import NextAuth, { type AuthOptions } from "next-auth";

const handler = NextAuth(authOptions as AuthOptions);

export { handler as GET, handler as POST };
