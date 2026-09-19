import type { ForumEdition } from "./types";

/**
 * 天工论坛 2027 —— 当前届次，`/forum` 渲染的就是本文件。
 *
 * 内容依据《2027·天工论坛 会议计划（唯一事实文档）》v0.1（编制日期 2026-09-16）。
 *
 * 现阶段只公布筹备初期适合给出的信息：主题框架 BUILD — SHAPE — ACT、
 * 会期与地点（hero 与筹备卡片各呈现一次），以及历届入口。
 * 以下内容一律不上站，等文档确认后再逐项补：议程草案细节、目标参会机构名单、
 * 赞助档位与目标金额、向北京市的支持诉求、组织分工、倒排计划、
 * 首轮任务清单、风险提示。
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
    zh: "天工论坛 2027：产品碳足迹与绿色供应链——能力、规则与行动。2027 年 3 月 24 至 26 日在北京举行。",
    en: "TianGong Forum 2027: Product Carbon Footprint and Green Supply Chains — Capabilities, Rules and Action. March 24-26, 2027, Beijing.",
  },

  hero: {
    title: { zh: "天工论坛 · 2027", en: "TianGong Forum · 2027" },
    theme: {
      zh: "产品碳足迹与绿色供应链——能力、规则与行动",
      en: "Product Carbon Footprint and Green Supply Chains: Capabilities, Rules and Action",
    },
    date: {
      zh: "2027 年 3 月 24 - 26 日  北京",
      en: "March 24-26, 2027 · Beijing, China",
    },
    image: "img/tg-forum/kv.jpg",
  },

  // 只留会期和地点。板块标题、说明与定位段按剑川 9-19 的意见删除。
  planning: {
    facts: [
      {
        label: { zh: "会期", en: "Dates" },
        value: {
          zh: "2027 年 3 月 24 - 26 日（周三至周五）",
          en: "March 24-26, 2027 (Wednesday to Friday)",
        },
      },
      {
        label: { zh: "地点", en: "City" },
        value: { zh: "北京", en: "Beijing, China" },
      },
    ],
  },

  framework: {
    intro: {
      zh: "打通「能力基础 — 规则协同 — 联合行动」的完整链条。",
      en: "One chain, from capabilities to rules to joint action.",
    },
    items: [
      {
        label: { zh: "BUILD", en: "BUILD" },
        stage: { zh: "能力基础", en: "Capabilities" },
        value: {
          zh: "建设 LCA、数据、系统和数字基础设施。",
          en: "Build LCA, data, systems and digital infrastructure.",
        },
      },
      {
        label: { zh: "SHAPE", en: "SHAPE" },
        stage: { zh: "规则协同", en: "Rules" },
        value: {
          zh: "连接中国政策、全球绿色规则与企业气候行动。",
          en: "Connect China's policies, global green rules and corporate climate action.",
        },
      },
      {
        label: { zh: "ACT", en: "ACT" },
        stage: { zh: "联合行动", en: "Joint action" },
        value: {
          zh: "推动产品碳足迹和企业碳管理进入采购、贸易与供应链减排实践。",
          en: "Move product carbon footprints and corporate carbon management into procurement, trade and supply-chain decarbonisation practice.",
        },
      },
    ],
  },

  highlights: [
    {
      // 上一届，整行强调呈现。
      featured: true,
      date: { zh: "2026", en: "2026" },
      title: {
        zh: "凝聚全球力量，共建创新生态",
        en: "Bringing global forces together to build an innovation ecosystem",
      },
      focus: { zh: "2026 年 3 月 · 江苏南京", en: "March 2026 · Nanjing, Jiangsu, China" },
      tags: [
        { zh: "参会单位 260+", en: "260+ organizations" },
        { zh: "参会代表 500+", en: "500+ delegates" },
        { zh: "国际嘉宾来自 10+ 个国家", en: "Guests from 10+ countries" },
      ],
      image: "img/tg-forum/kv.jpg",
      to: "/forum/2026",
    },
    {
      date: { zh: "2025", en: "2025" },
      title: {
        zh: "发起成立“碳足迹产业技术创新联盟”",
        en: "Initiated the Carbon Footprint Industry Technology Innovation Alliance",
      },
      focus: { zh: "2025 年 1 月 · 北京", en: "January 2025 · Beijing" },
      tags: [
        { zh: "联盟发布", en: "Alliance Launch" },
        { zh: "产业共建", en: "Industry Collaboration" },
      ],
      image: "img/tg-forum/past/tg-forum-2nd.jpg",
      to: "/forum/2025",
    },
    {
      date: { zh: "2023", en: "2023" },
      title: {
        zh: "发布开放、透明的“天工数据库”",
        en: "Released the open and transparent TianGong Database",
      },
      focus: { zh: "2023 年 11 月 · 北京", en: "November 2023 · Beijing" },
      tags: [
        { zh: "数据库", en: "Database" },
        { zh: "开放透明", en: "Open & Transparent" },
      ],
      image: "img/tg-forum/past/tg-forum-1st.jpg",
      to: "/forum/2023",
    },
  ],

  // 议程、嘉宾、会场与报名都等确定后再补。
  revisions: [],
};
