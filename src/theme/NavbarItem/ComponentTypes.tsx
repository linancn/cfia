import type { ComponentTypesObject } from "@theme/NavbarItem/ComponentTypes";
import OriginalComponentTypes from "@theme-original/NavbarItem/ComponentTypes";
import DocsOnlyNavbarItem from "@site/src/theme/NavbarItem/DocsOnlyNavbarItem";

const ComponentTypes: ComponentTypesObject = {
  ...OriginalComponentTypes,
  "custom-docs-only": DocsOnlyNavbarItem,
};

export default ComponentTypes;
