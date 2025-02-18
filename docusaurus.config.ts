import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "碳足迹产业技术创新联盟",
  tagline: "促进产业协同，推动技术创新，支撑国家战略",
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
    locales: ["zh-CN", "en"],
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
      title: "碳足迹产业技术创新联盟",
      logo: {
        alt: "CIFA Logo",
        src: "img/logo.png",
      },
      items: [
        { to: "/blog", label: "新闻动态", position: "left" },
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "开放知识中心",
        }
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "联盟开源体系",
          items: [
            {
              label: "天工数据平台",
              href: "https://lca.tiangong.earth",
            },
            {
              label: "开放知识中心",
              to: "/docs/intro",
            },
            // {
            //   label: "开源LCA数据结构",
            //   to: "/docs/intro",
            // },
          ],
        },
        {
          title: "联盟机构",
          items: [
            {
              label: "清华大学碳中和研究院（秘书处）",
              href: "https://www.icon.tsinghua.edu.cn/",
            },
            {
              label: "天工智库中心",
              href: "https://discordapp.com/invite/docusaurus",
            }
          ],
        },
        {
          title: "开放社区",
          items: [
            {
              label: "新闻动态",
              to: "/blog",
            },
            {
              label: "联合共创平台",
              href: "https://github.com/linancn/cfia",
            },
          ],
        },
      ],
      copyright: `版权所有 © ${new Date().getFullYear()} 碳足迹产业技术创新联盟，基于Docusaurus开发。`,
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
