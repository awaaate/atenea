import { Inter } from "next/font/google";
import { ThemeProvider } from "@shared/ui";

import "@shared/tailwind-config/lib/global.css";
import { Provider } from "@/components/provider";
export const metadata = {
  title: "Atenea Client",
  description: "",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <html lang="en">
        <body className={inter.variable}>
          <Provider>{children}</Provider>
        </body>
      </html>
    </ThemeProvider>
  );
}
