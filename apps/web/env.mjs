import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    CLERK_SECRET_KEY: z.string().min(1),
    NODE_ENV: z.string().min(1),
    NEXT_PUBLIC_ROOT_DOMAIN: z.string().min(1),
    POSTGRES_URL_NON_POOLING: z.string().min(1),
    POSTGRES_PRISMA_URL: z.string().min(1),
    POSTGRES_URL: z.string().min(1),
    NEXT_PUBLIC_WEB3_PROJECT_ID: z.string().min(1),
    AUTH_SECRET: z.string().min(1),
    /*   NEXTAUTH_URL: z.string().url().optional(),
    NEXTAUTH_SECRET: z.string().min(1),
    NEXT_PUBLIC_APP_URL: z.string().min(1), */
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_ENABLE_TESTNETS: z.boolean(),

    //NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1),
    //NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().min(1),
    //NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string().min(1),
    //NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string().min(1),
  },
  runtimeEnv: {
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_ENABLE_TESTNETS:
      process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true",
    POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
    POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
    POSTGRES_URL: process.env.POSTGRES_URL,
    NEXT_PUBLIC_WEB3_PROJECT_ID: process.env.NEXT_PUBLIC_WEB3_PROJECT_ID,
    AUTH_SECRET: process.env.AUTH_SECRET,
    NEXT_PUBLIC_ROOT_DOMAIN: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
    /*  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL:
      process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL:
      process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL, */
  },
});
