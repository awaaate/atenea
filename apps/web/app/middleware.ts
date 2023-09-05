// src/middleware.js 
// or 
// src/app/middleware.js 
// or 
// src/pages/middleware.js 

import { NextResponse } from "next/server";

export function middleware(req: Request) {
    // retrieve the current response
    const res = NextResponse.next()
    console.log("Midddleware", res);
    // add the CORS headers to the response
    res.headers.append('Access-Control-Allow-Credentials', "true")
    res.headers.append('Access-Control-Allow-Origin', 'http://localhost:6006')// replace this your actual origin
    res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
    res.headers.append(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )

    return res
}


// src/pages/api/data-source/[trpc].ts

export const config = {
    matcher: "/api/data-source/*",
}