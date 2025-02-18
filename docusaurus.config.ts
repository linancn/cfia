import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Carbon Footprint Industry Alliance",
  tagline: "Cooperation, Innovation, and Openness",
  favicon: "img/favicon.png",

  // Set the production url of your site here
  url: "https://www.carbonfootprint.network",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "facebook", // Usually your GitHub org/user name.
  projectName: "docusaurus", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "zh-CN",
    locales: ["zh-CN","en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Carbon Footprint Industry Alliance",
      logo: {
        alt: "CIFA Logo",
        src: "img/logo.png",
      },
      items: [
        { to: "/blog", label: "News", position: "left" },
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Open Knowledge Center",
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Open-source Ecosystem",
          items: [
            {
              label: "TianGong Data Platform",
              href: "https://lca.tiangong.earth",
            },
            {
              label: "Open Knowledge Center",
              to: "/docs/intro",
            },
            // {
            //   label: "Open-source LCA Data Structure",
            //   to: "/docs/intro",
            // },
          ],
        },
        {
          title: "Organizations",
          items: [
            {
              label: "ICON Tsinghua University",
              href: "https://www.icon.tsinghua.edu.cn/",
            },
            {
              label: "TianGong Think Tank",
              href: "https://discordapp.com/invite/docusaurus",
            }
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "News",
              to: "/blog",
            },
            {
              label: "Cooperation Platform",
              href: "https://github.com/linancn/cfia",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    // algolia: {
    //   // The application ID provided by Algolia
    //   appId: 'YOUR_APP_ID',

    //   // Public API key: it is safe to commit it
    //   apiKey: 'YOUR_SEARCH_API_KEY',

    //   indexName: 'cfia',

    //   // Optional: see doc section below
    //   contextualSearch: true,

    //   // // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
    //   // externalUrlRegex: 'external\\.com|domain\\.com',

    //   // // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
    //   // replaceSearchResultPathname: {
    //   //   from: '/docs/', // or as RegExp: /\/docs\//
    //   //   to: '/',
    //   // },

    //   // // Optional: Algolia search parameters
    //   // searchParameters: {},

    //   // // Optional: path for search page that enabled by default (`false` to disable it)
    //   // searchPagePath: 'search',

    //   // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
    //   insights: true,

    //   //... other Algolia params
    // },
  } satisfies Preset.ThemeConfig,
};

export default config;
