import { env } from "@/env.mjs";
import { authProviders } from "@/lib/auth/authProviders";
import { type NextAuthConfig } from "next-auth";
import { logServer } from "../utils/log";

//TODO: fix this
//@ts-ignore
const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;


export const authOptions: NextAuthConfig = {
    providers: authProviders,
    session: { strategy: "jwt" },
    secret: env.AUTH_SECRET,
    cookies: {
        sessionToken: {
            name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
                domain: VERCEL_DEPLOYMENT
                    //TODO: fix this to use env vars
                    ? `atenea-mvp.vercel.app`
                    : undefined,
                secure: VERCEL_DEPLOYMENT,
            },
        },
    },
    callbacks: {
        session: async ({ session, token }) => {
            logServer("session", { token, session });
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    walletAddress: token.walletAddress,
                },
            };
        },
        jwt: ({ token, user }) => {
            logServer("jwt", { token, user });
            //token.walletAddress = user.walletAddress;
            return {
                ...token,
                id: token.sub,
                walletAddress: token.walletAddress,
            };
        },
        signIn: async () => {
            //logServer("signIn", { user, account, profile, email, credentials });
            return true;

            //return "/dashboard";
        },

    },
}
