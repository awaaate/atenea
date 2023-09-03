import { env } from "@/env.mjs";

export async function getCsrfToken(cookies: string) {
    console.log("getCsrfToken")
    console.log(cookies)
    let name = "next-auth.csrf-token"
    let token = cookies
        .split(";")
        .find((c: string) => c.trim().startsWith(`${name}=`))
    token = token?.split("=")[1].split("%")[0]

    if (!token) {
        //name __Host-next-auth.csrf-token
        name = "__Host-next-auth.csrf-token"
        token = cookies
            .split(";")
            .find((c: string) => c.trim().startsWith(`${name}=`))
        token = token?.split("=")[1].split("%")[0]
    }

    return token

}
//