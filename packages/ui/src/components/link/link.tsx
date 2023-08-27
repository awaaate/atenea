import React, { forwardRef } from "react";

let NextLink: any;
try {
  // Attempt to import Link from next/link
  NextLink = require("next/link").default;
} catch (error) {
  // Handle error if next/link is not installed
  console.error("next/link is not installed");
}

const Link = forwardRef<HTMLAnchorElement, any>(
  ({ children, href, ...props }, ref) => {
    if (NextLink) {
      return (
        <NextLink href={href} {...props}>
          {children}
        </NextLink>
      );
    }

    return (
      <a href={href} ref={ref} {...props}>
        {children}
      </a>
    );
  }
);

export { Link };
