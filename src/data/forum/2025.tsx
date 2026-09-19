import type { ForumEdition } from "./types";

/**
 * 天工论坛 2025 —— 会议存档。
 *
 * 本站留存的历史素材只有「往期精选」卡片里的那一组信息（时间、地点、
 * 主题、成果与配图），因此本页只呈现这些内容，不编造议程与嘉宾名单。
 * 如后续从秘书处拿到完整议程，按 `2026.tsx` 的结构补齐即可，
 * 并把 `phase` 保持为 "closed"。
 *
 * 已知待补：会议全称、具体会期（只有月份）、会场、议程、参会嘉宾。
 */
export const edition2025: ForumEdition = {
  year: 2025,
  phase: "closed",

  pageTitle: {
    zh: "天工论坛 2025（会议存档）",
    en: "TianGong Forum 2025 (Archive)",
  },
  pageDescription: {
    zh: "天工论坛 2025 会议存档：主题、时间地点与主要成果。",
    en: "Archive of TianGong Forum 2025: theme, when and where, and key outcomes.",
  },

  hero: {
    title: { zh: "天工论坛 · 2025", en: "TianGong Forum · 2025" },
    theme: {
      zh: "政产学研全面协同，共建产品碳足迹管理体系",
      en: "Cross-sector collaboration to build a product carbon footprint management system",
    },
    date: { zh: "2025 年 1 月  北京", en: "January 2025 · Beijing" },
    image: "img/tg-forum/past/tg-forum-2nd.jpg",
  },

  summary: {
    zh: "2025 年 1 月 7 日，联盟在本届论坛上由清华大学牵头，联合 50 余家重点行业龙头企业、行业组织、高校和科研机构共同发起成立，完成了从“发起倡议”到“搭建组织框架”的关键起步。",
    en: "On 7 January 2025, the Alliance was jointly initiated at this edition — led by Tsinghua University together with more than 50 leading industry enterprises, industry associations, universities and research institutions — marking the key step from a founding proposal to an established organisational framework.",
  },

  revisions: [],
};
