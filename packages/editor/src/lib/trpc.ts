import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@shared/api';
import superjson from 'superjson';


function getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop()?.split(';').shift();
    }
}
export const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            //TODO: change this to the real url in the env
            url: "https://atenea-mvp.vercel.app/api/trpc",
            async headers(opts) {
                return {
                    authorization: getCookie("next-auth.session-token") || "",
                }
            },
        }),


    ],
    transformer: superjson,
});
