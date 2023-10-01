"use client";

import { ThemeProvider } from "./theme-provider";
import { TooltipProvider } from "@shared/ui/src/tooltip";
import { Toaster } from "@shared/ui/src/toast";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { Suspense } from "react";
import { Spinner } from "@shared/ui/src/spinner";
import { Analytics } from "@vercel/analytics/react";

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NextAuthSessionProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <TooltipProvider>
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-screen w-screen">
                  <Spinner />
                </div>
              }
            >
              <>{children}</>
            </Suspense>
          </TooltipProvider>
          <Analytics />
        </ThemeProvider>
        <Toaster />
      </NextAuthSessionProvider>
    </>
  );
};
