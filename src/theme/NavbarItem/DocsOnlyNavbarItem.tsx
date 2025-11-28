import React from "react";
import { useLocation } from "@docusaurus/router";
import DefaultNavbarItem from "@theme/NavbarItem/DefaultNavbarItem";
import type { Props as DefaultNavbarItemProps } from "@theme/NavbarItem/DefaultNavbarItem";

const docsPathRegex = /^\/(en\/)?docs(\/|$)/;

export default function DocsOnlyNavbarItem(
  props: DefaultNavbarItemProps,
): JSX.Element | null {
  const { pathname } = useLocation();
  const isDocsPage = docsPathRegex.test(pathname);

  if (!isDocsPage) {
    return null;
  }

  return <DefaultNavbarItem {...props} />;
}
