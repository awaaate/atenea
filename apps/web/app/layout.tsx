import { Londrina_Solid } from "next/font/google";
import { Metadata } from "next";
import { env } from "@/env.mjs";

import "./global.css";

import { siteConfig } from "@/config";
import { MainProvider } from "@/components/providers/main-provider";
import { TRPCProvider } from "@/components/providers/trpc-provider";

const londrina = Londrina_Solid({
  subsets: ["latin"],
  weight: ["100", "300", "400", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={londrina.className}>
        <TRPCProvider>
          <MainProvider>{children}</MainProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}
