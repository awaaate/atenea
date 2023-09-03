"use client";
import { trpc } from "@/lib/trpc";
import { httpBatchLink } from "@trpc/client";
import { QueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useState } from "react";
import superjson from "superjson";

const QueryClientProvider = dynamic(
  () => import("@tanstack/react-query").then((e) => e.QueryClientProvider),
  { ssr: false }
);

const TRPCClientProvider = dynamic(
  () => import("@/lib/trpc").then((e) => e.trpc.Provider),
  { ssr: false }
);

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "/api/trpc",
        }),
      ],
      transformer: superjson,
    })
  );
  return (
    <TRPCClientProvider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </TRPCClientProvider>
  );
}
