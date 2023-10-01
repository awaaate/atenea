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
import { getSession } from "@/lib/auth/getSession";
import { redirect, useRouter } from "next/navigation";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Sign In",
  description: "Join the beta version of atenea",
};

const Page = async () => {
  const session = await getSession();
  if (session) {
    redirect("/app");
  }

  return (
    <AuthenticationPage>
      <AuthenticationPageHeadingWrapper>
        <AuthenticationPageHeading>
          Sign in with your wallet
        </AuthenticationPageHeading>
        <AuthenticationPageSubheading>
          Or <Link href="/sign-in">create a new account</Link>
        </AuthenticationPageSubheading>
      </AuthenticationPageHeadingWrapper>

      <UserAuthForm />
    </AuthenticationPage>
  );
};

export default Page;
