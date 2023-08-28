"use client";
import { Analytics } from "@vercel/analytics/react";

import { ThemeProvider } from "./theme-provider";
import { Toaster, TooltipProvider } from "@shared/ui";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NextAuthSessionProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
        <Toaster />
        <Analytics />
      </NextAuthSessionProvider>
    </>
  );
};
