"use client"
import { createTRPCReact } from "@trpc/react-query";


import { type AppRouter } from "@shared/api/src/app-router";

/**
 * The TRPC client instance for the app.
 *
 * @remarks
 * This instance is created using `createTRPCReact` from the `@trpc/react` package.
 * It is used to communicate with the server and fetch data for the app.
 */
export const trpc = createTRPCReact<AppRouter>({});

