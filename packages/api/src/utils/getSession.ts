export function getCookieValue({ name, cookies }: { name: string; cookies: string }) {
    let cookie = cookies
        .split(";")
        .find((c) => c.trim().startsWith(`${name}=`))
    cookie = cookie?.split("=")[1]

    //
    //     return aSuffix - bSuffix;
    //   });


    // Use the sorted keys to join the chunks in the correct order
    return cookie
}
