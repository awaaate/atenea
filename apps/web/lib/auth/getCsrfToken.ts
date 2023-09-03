import { env } from "@/env.mjs";
const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;


export async function getCsrfToken(cookies: string) {
    console.log("getCsrfToken")
    console.log(cookies)
    let name = `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.csrf-token`
    let token = cookies
        .split(";")
        .find((c: string) => c.trim().startsWith(`${name}=`))
    token = token?.split("=")[1]


    return token

}
//