import type { ForumEdition } from "./types";

/**
 * 天工论坛 2027 —— 当前届次，`/forum` 渲染的就是本文件。
 *
 * 筹备期的写法：只填已经确定的信息，没定的一律不写（留空即不渲染），
 * 不要用「待定」占位符硬撑版式。确定一项补一项。
 *
 * 文案直接用 `{ zh, en }` 双语对，不必往 `i18n/en/code.json` 里加键。
 * 内容就绪后把 `phase` 从 "planned" 依次推进到
 * "announced"（已公布议程）→ "live"（会期中）→ "closed"（已结束，转为存档）。
 */
export const edition2027: ForumEdition = {
  year: 2027,
  phase: "planned",

  pageTitle: {
    zh: "天工论坛 2027",
    en: "TianGong Forum 2027",
  },
  pageDescription: {
    zh: "天工论坛 2027：联盟国际品牌会议，聚焦 LCA 与碳足迹体系的全球互联互通互信。",
    en: "TianGong Forum 2027: the Alliance's flagship international conference on global interconnection, interoperability and mutual trust for LCA and carbon footprint systems.",
  },

  hero: {
    title: { zh: "天工论坛 · 2027", en: "TianGong Forum · 2027" },
    theme: {
      zh: "全球互联、互通、互信的 LCA 与碳足迹体系",
      en: "Global Interconnection, Interoperability, and Mutual Trust for LCA and Carbon Footprint Systems",
    },
    date: {
      zh: "会期与地点确认中",
      en: "Date and venue to be announced",
    },
    image: "img/tg-forum/kv.jpg",
  },

  // 会场、报名、议程、嘉宾都等确定后再补。
  revisions: [],
};
