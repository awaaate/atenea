import Link from "next/link";
import { Metadata } from "next";

import { env } from "@/env.mjs";
import { dialogue } from "@/data";
import TypingMessage from "@/components/typing-message";
import { UserAuthForm } from "@/components/forms/user-auth-form";

import { Button, buttonVariants, cn, Icon } from "@shared/ui";
export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Sign In",
  description:
    "Join our community or log in to your account. Explore personalized features and content on our platform.",
};

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const AuthenticationPage = () => {
  const randomDialogue = dialogue[Math.floor(Math.random() * dialogue.length)];

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col p-10 lg:flex">
        <div className="absolute inset-0 bg-surface-default" />

        <div className="relative z-20 flex items-center">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-lg font-medium"
            )}
          >
            <img src="/logo.png" alt="atenea" className="h-8 w-auto" />
          </Link>
        </div>
        <div className="relative z-20 mt-auto text-text-weak">
          <blockquote className="space-y-2">
            <TypingMessage text={`"${randomDialogue.message}"`} />
            <footer className="text-sm text-text-weakest">
              <TypingMessage text={randomDialogue.character} />
            </footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl tracking-tight font-weight-heading">
              Welcome to Atenea
            </h1>
            <p className="text-sm  text-text-weak">
              Choose your preferred sign in method
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-text-weak">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-accent"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-accent"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
