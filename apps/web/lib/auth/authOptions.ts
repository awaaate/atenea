import { env } from "@/env.mjs";
import { authProviders } from "@/lib/auth/authProviders";
import { type NextAuthConfig } from "next-auth";
import { logServer } from "../utils/log";

//TODO: fix this
//@ts-ignore
const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;


export const authOptions: NextAuthConfig = {
    providers: authProviders,
    pages: {
        signIn: `/login`,
        verifyRequest: `/login`,
        error: "/login", // Error code passed in query string as ?error=
    },
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
                    ? `.${env.NEXT_PUBLIC_APP_URL}`
                    : undefined,
                secure: VERCEL_DEPLOYMENT,
            },
        },
    },

    callbacks: {
        session: async ({ session, token }) => {
            logServer("jwt", { token, session });
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
            logServer("session", { token, user });
            if (user) {
                token.id = user.id;
                //token.walletAddress = user.walletAddress;
                const u = user as unknown as any;
                return {
                    ...token,
                    id: u.id,
                    walletAddress: u.walletAddress,
                };
            }
            return token;
        },
        signIn: async () => {
            //logServer("signIn", { user, account, profile, email, credentials });
            return true;

            //return "/dashboard";
        },

    },
}
