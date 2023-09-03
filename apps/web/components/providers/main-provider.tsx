"use client";

import { ThemeProvider } from "./theme-provider";
import { TooltipProvider } from "@shared/ui/src/tooltip";
import { Toaster } from "@shared/ui/src/toast";
import dynamic from "next/dynamic";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NextAuthSessionProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <TooltipProvider>
            <>{children}</>
          </TooltipProvider>
        </ThemeProvider>
        <Toaster />
      </NextAuthSessionProvider>
    </>
  );
};
