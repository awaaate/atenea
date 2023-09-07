import { createTRPCProxyClient, httpBatchLink, } from '@trpc/client';
import type { DataSourceRouter } from '@shared/api/src/api/data-source';
import superjson from 'superjson';


function getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop()?.split(';').shift();
    }
}

const getApiRoot = () => {
    const apiRoot = process.env.NODE_ENV === 'production' ? 'https://atenea-mvp.vercel.app' : 'http://localhost:3000';
    return apiRoot;
}
export const sourceFetcher = createTRPCProxyClient<DataSourceRouter>({
    links: [
        httpBatchLink({
            //TODO: change this to the real url in the env
            url: `${getApiRoot()}/api/data-source`,
            fetch(url, options) {
                return fetch(url, {
                    ...options,
                    credentials: "include",

                })
            },

        }),

    ],


    transformer: superjson,
});
