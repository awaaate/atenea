import { Metadata } from "next";
import Link from "next/link";

import { UserAuthForm } from "@/components/forms/user-auth-form";
import { env } from "@/env.mjs";
import {
  AuthenticationPage,
  AuthenticationPageHeading,
  AuthenticationPageHeadingWrapper,
  AuthenticationPageSubheading,
  AuthenticationPageTerms,
} from "@shared/templates/src/pages/sign-in";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Sign In",
  description:
    "Join our community or log in to your account. Explore personalized features and content on our platform.",
};

const Page = () => {
  return (
    <AuthenticationPage>
      <AuthenticationPageHeadingWrapper>
        <AuthenticationPageHeading>Sign in to your 3</AuthenticationPageHeading>
        <AuthenticationPageSubheading>
          Or <Link href="/sign-up">create a new account</Link>
        </AuthenticationPageSubheading>
      </AuthenticationPageHeadingWrapper>

      <UserAuthForm />
      <AuthenticationPageTerms />
    </AuthenticationPage>
  );
};

export default Page;
