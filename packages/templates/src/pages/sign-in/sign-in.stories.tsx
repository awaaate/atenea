import {
  AuthenticationPage,
  AuthenticationPageHeading,
  AuthenticationPageHeadingWrapper,
  AuthenticationPageSubheading,
  AuthenticationPageTerms,
} from "./sign-in-page";

import { Button, Icon, Link } from "@shared/ui";
import { Meta } from "@storybook/react";


export default {
  title: "Pages/Signin",
  component: AuthenticationPage,
  parameters: {
    layout: "fullscreen",
  }
}  satisfies Meta<typeof AuthenticationPage>;

export const Signin = () => (
  <AuthenticationPage>
    <AuthenticationPageHeadingWrapper>
      <AuthenticationPageHeading>Sign in to your 3</AuthenticationPageHeading>
      <AuthenticationPageSubheading>
        Or <Link href="/sign-up">create a new account</Link>
      </AuthenticationPageSubheading>
    </AuthenticationPageHeadingWrapper>

    <Button>
        <Icon name="Wallet2" className="mr-2" />
        Connect wallet 
    </Button>
    <AuthenticationPageTerms />
  </AuthenticationPage>
);
