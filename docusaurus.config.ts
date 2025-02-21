import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "CFIA",
  tagline: "subtitle",
  favicon: "img/favicon.png",

  // Set the production url of your site here
  url: "https://www.carbonfootprint.network",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "CFIA", // Usually your GitHub org/user name.
  projectName: "CIFA", // Usually your repo name.

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
          remarkPlugins: [require('remark-math')],
          rehypePlugins: [require('rehype-mathjax')],
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
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-vZTG03m+PBjY6Pz5E6Q8b4yR9Gt6EZU6AWKc6Yg1EMw8sI/4l+f9ZO4ZXcCb2G0',
      crossorigin: 'anonymous',
    },
  ],
  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "cifa",
      logo: {
        alt: "CIFA Logo",
        src: "img/logo.png",
      },
      items: [
        // { to: "/blog", label: "News", position: "left" },
        { to: "/board", label: "board", position: "left" },
        { to: "/secretariat", label: "secretariat", position: "left" },
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "open-knowledge-center",
        },
        { to: "https://lca.tiangong.earth", label: "tiangong-lca-data-platform", position: "left" },
        // {
        //   type: 'localeDropdown',
        //   position: 'right',
        // },
      ],
    },
    footer: {
      links: [
        {
          title: "open-source-ecosystem",
          items: [
            {
              label: "tiangong-lca-data-platform",
              href: "https://lca.tiangong.earth",
            },
            {
              label: "open-knowledge-center",
              to: "/docs/intro",
            },
            // {
            //   label: "Open-source LCA Data Structure",
            //   to: "/docs/intro",
            // },
          ],
        },
        {
          title: "organizations",
          items: [
            {
              label: "icon-tsinghua",
              href: "https://www.icon.tsinghua.edu.cn/",
            },
            {
              label: "tiangong-think-tank",
              href: "http://www.tsinghua-riet.com/",
            }
          ],
        },
        {
          title: "community",
          items: [
            // {
            //   label: "news",
            //   to: "/blog",
            // },
            {
              label: "cooperation-platform",
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
    algolia: {
      // The application ID provided by Algolia
      appId: 'SDTUE4LQLS',

      // Public API key: it is safe to commit it
      apiKey: '0250bf46f5a6601148b8f0c4f4602684',

      indexName: 'carbonfootprint',

      // Optional: see doc section below
      contextualSearch: true,

      // // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      // externalUrlRegex: 'external\\.com|domain\\.com',

      // // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
      // replaceSearchResultPathname: {
      //   from: '/docs/', // or as RegExp: /\/docs\//
      //   to: '/',
      // },

      // // Optional: Algolia search parameters
      // searchParameters: {},

      // // Optional: path for search page that enabled by default (`false` to disable it)
      // searchPagePath: 'search',

      // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
      insights: true,

      //... other Algolia params
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
