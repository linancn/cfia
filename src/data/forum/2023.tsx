import type { ForumEdition } from "./types";

/**
 * 天工论坛 2023 —— 会议存档。
 *
 * 与 `2025.tsx` 同理：只呈现已留存的「往期精选」信息，不编造议程与嘉宾名单。
 *
 * 已知待补：会议全称、具体会期（只有月份）、会场、议程、参会嘉宾、
 * 天工数据库发布版本与数据规模。
 */
export const edition2023: ForumEdition = {
  year: 2023,
  phase: "closed",

  pageTitle: {
    zh: "天工论坛 2023（会议存档）",
    en: "TianGong Forum 2023 (Archive)",
  },
  pageDescription: {
    zh: "天工论坛 2023 会议存档：主题、时间地点与主要成果。",
    en: "Archive of TianGong Forum 2023: theme, when and where, and key outcomes.",
  },

  hero: {
    title: { zh: "天工论坛 · 2023", en: "TianGong Forum · 2023" },
    theme: {
      zh: "发起 LCA 数据开放共享与协同治理联合研究计划",
      en: "Launched a joint research initiative on open sharing and collaborative governance of LCA data",
    },
    date: { zh: "2023 年 11 月  北京", en: "November 2023 · Beijing" },
    image: "img/tg-forum/past/tg-forum-1st.jpg",
  },

  summary: {
    zh: "本届论坛上发布了开放、透明的“天工数据库”，并发起 LCA 数据开放共享与协同治理联合研究计划，为后续的碳足迹产业协同打下数据基础。",
    en: "This edition saw the release of the open and transparent TianGong Database and launched a joint research initiative on open sharing and collaborative governance of LCA data, laying the data foundation for subsequent cross-industry carbon footprint collaboration.",
  },

  revisions: [],
};
