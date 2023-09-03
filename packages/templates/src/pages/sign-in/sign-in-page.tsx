import { TypingMessage } from "../../components/typing-message";

import React, { forwardRef, HTMLAttributes } from "react";
import { quotes } from "./sign-in-quotes";
import { buttonVariants } from "@shared/ui/src/button";
import { Link } from "@shared/ui/src/link";
import { cn } from "@shared/ui/src/utils";

const AuthenticationPageHeading = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ children, className, ...props }, ref) => {
  return (
    <h1
      ref={ref}
      className={cn("text-2xl tracking-tight font-weight-heading", className)}
      {...props}
    >
      {children}
    </h1>
  );
});

const AuthenticationPageSubheading = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ children, className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm  text-text-weak", className)}
      {...props}
    >
      {children}
    </p>
  );
});

const AuthenticationPageTerms = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      className={cn("px-8 text-center text-sm text-text-weak", className)}
      ref={ref}
      {...props}
    >
      By clicking continue, you agree to our
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
  );
});
const AuthenticationPageHeadingWrapper = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-2 text-center", className)}
      {...props}
    >
      {children}
    </div>
  );
});

const AuthenticationPage = ({ children }: { children: React.ReactNode }) => {
  const randomDialogue = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="container bg-border-neutral relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col p-10 sm:flex">
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
          {children}
        </div>
      </div>
    </div>
  );
};

export {
  AuthenticationPage,
  AuthenticationPageHeading,
  AuthenticationPageHeadingWrapper,
  AuthenticationPageSubheading,
  AuthenticationPageTerms,
};
