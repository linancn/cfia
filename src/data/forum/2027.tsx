import type { ForumEdition } from "./types";

/**
 * 天工论坛 2027 —— 当前届次，`/forum` 渲染的就是本文件。
 *
 * 内容依据《2027·天工论坛 会议计划（唯一事实文档）》v0.1（编制日期 2026-09-16）。
 * 该文档规定「未确认信息一律标注待确认」，所以下面凡是文档标了待确认的，
 * 站上也跟着写清楚，不能当成已定事项对外说。
 *
 * 现阶段只公布筹备初期适合给出的信息：主题、会期、地点、规模、办会模式、
 * 论坛定位与年度框架。以下内容一律不上站，等文档确认后再逐项补：
 * 议程草案细节、目标参会机构名单、赞助档位与目标金额、向北京市的支持诉求、
 * 组织分工、倒排计划、首轮任务清单、风险提示。
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
    zh: "天工论坛 2027：产品碳足迹与绿色供应链——能力、规则与行动。会议信息与筹备进展。",
    en: "TianGong Forum 2027: Product Carbon Footprint and Green Supply Chains — Capabilities, Rules and Action. Meeting information and planning updates.",
  },

  hero: {
    title: { zh: "天工论坛 · 2027", en: "TianGong Forum · 2027" },
    theme: {
      zh: "产品碳足迹与绿色供应链——能力、规则与行动",
      en: "Product Carbon Footprint and Green Supply Chains: Capabilities, Rules and Action",
    },
    date: {
      zh: "2027 年 3 月 24 - 26 日  北京（拟定）",
      en: "March 24-26, 2027 · Beijing (tentative)",
    },
    image: "img/tg-forum/kv.jpg",
  },

  planning: {
    intro: {
      zh: "围绕生命周期评价（LCA）和产品碳足迹，聚焦数据与技术的开放创新，连接国内外政策规则和前沿产业实践，服务我国和全球绿色低碳转型的国际交流合作平台。",
      en: "A platform for international exchange and cooperation on life cycle assessment (LCA) and product carbon footprint — centred on open innovation in data and technology, connecting policy rules and frontier industry practice at home and abroad, and serving China's and the world's green and low-carbon transition.",
    },
    facts: [
      {
        label: { zh: "会期", en: "Dates" },
        value: {
          zh: "2027 年 3 月 24 - 26 日（周三至周五）",
          en: "March 24-26, 2027 (Wednesday to Friday)",
        },
        note: { zh: "拟定，待确认", en: "Tentative, to be confirmed" },
      },
      {
        label: { zh: "地点", en: "City" },
        value: { zh: "北京", en: "Beijing, China" },
        note: { zh: "待确认", en: "To be confirmed" },
      },
      {
        label: { zh: "规模", en: "Scale" },
        value: {
          zh: "500 人国际会议",
          en: "A 500-participant international conference",
        },
        note: { zh: "待确认", en: "To be confirmed" },
      },
      {
        label: { zh: "办会模式", en: "Format" },
        value: {
          zh: "1 + N + X：1 个主论坛 + N 个平行分论坛 + X 个专项活动",
          en: "1 + N + X: one plenary forum, N parallel sub-forums and X special activities",
        },
      },
    ],
    pillars: [
      {
        label: { zh: "BUILD", en: "BUILD" },
        value: {
          zh: "建设 LCA、数据、系统和数字基础设施",
          en: "Build LCA, data, systems and digital infrastructure",
        },
      },
      {
        label: { zh: "SHAPE", en: "SHAPE" },
        value: {
          zh: "连接中国政策、全球绿色规则与企业气候行动",
          en: "Connect China's policies, global green rules and corporate climate action",
        },
      },
      {
        label: { zh: "ACT", en: "ACT" },
        value: {
          zh: "推动产品碳足迹和企业碳管理进入采购、贸易与供应链减排实践",
          en: "Move product carbon footprints and corporate carbon management into procurement, trade and supply-chain decarbonisation practice",
        },
      },
    ],
  },

  // 议程、嘉宾、会场与报名都等确定后再补。
  revisions: [],
};
