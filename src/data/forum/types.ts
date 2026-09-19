import type { ReactNode } from "react";

/**
 * 天工论坛的共享类型与域常量。
 *
 * 这里放两类东西：所有年份共用的类型，以及与具体年份无关的域常量
 * （例如议程轨道的固定排列顺序）。某一年的具体内容一律放在
 * `src/data/forum/<年份>.tsx`，不要写回本文件。
 */

// ---------------------------------------------------------------------------
// 议程（各年份共用）
// ---------------------------------------------------------------------------

export type AgendaStatus = "published" | "updating" | "pending";

export type AgendaDayKey = "day1" | "day2";

export type AgendaTrackKey = "main" | "subforums" | "special" | "developer";

export type AgendaText = {
  zh: string;
  en?: string;
};

/**
 * 年份数据里的展示文案。
 *
 * 两种写法都允许：
 * - `{ zh, en }` 双语对——新届次推荐用这种，文案与它所在的年份文件待在一起，
 *   不必再往 `i18n/en/code.json` 里添键；
 * - 现成的 `ReactNode`——历史遗留的 `<Translate>` 写法，仍然支持。
 *
 * 渲染时统一交给 `renderForumText()` 取值。
 */
export type ForumText = ReactNode | AgendaText;

export type MasterAgendaSlot = {
  id: string;
  day: AgendaDayKey;
  track: AgendaTrackKey;
  start: string;
  end: string;
  activityKey: string;
  shortTitle: AgendaText;
  status: AgendaStatus;
  note?: AgendaText;
};

export type ActivitySession = {
  id: string;
  day: AgendaDayKey;
  start?: string;
  end?: string;
  title: AgendaText;
  talkTitle?: AgendaText;
  orgLogoKey?: string;
  sessionType?: AgendaText;
  speakers?: AgendaText;
  moderator?: AgendaText;
  note?: AgendaText;
  status?: AgendaStatus;
};

export type ActivityAgendaGroupKey =
  | "main-forum"
  | "sub-forums"
  | "developer"
  | "special-events";

export type ActivityAgendaDetail = {
  activityKey: string;
  groupKey: ActivityAgendaGroupKey;
  title: AgendaText;
  summaryLeadTop?: AgendaText;
  summaryLead?: AgendaText;
  summary?: AgendaText;
  hideSummaryUpdateNote?: boolean;
  dateLabel?: AgendaText;
  timeRange?: string;
  venue?: AgendaText;
  language?: "zh" | "en" | "bilingual";
  status: AgendaStatus;
  hostName?: AgendaText;
  hostLogo?: string;
  sessions: ActivitySession[];
};

/**
 * 轨道在页面上的固定排列顺序，与年份无关。
 * 被模块级的排期计算函数使用，因此必须留在模块作用域。
 */
export const agendaTrackOrder: AgendaTrackKey[] = [
  "main",
  "subforums",
  "special",
  "developer",
];

// ---------------------------------------------------------------------------
// 页面展示用的类型
// ---------------------------------------------------------------------------

export type ForumIconKey =
  | "assembly"
  | "developer"
  | "forum"
  | "spark"
  | "collaboration"
  | "media"
  | "sponsor";

/** 历届论坛的一张卡片。 */
export type ForumHighlight = {
  date: ForumText;
  title: ForumText;
  focus: ForumText;
  tags?: ForumText[];
  image?: string;
  /** 该届的存档页地址；填了卡片就会变成可点击的链接。 */
  to?: string;
  /**
   * 重点呈现（用来把「上一届」垫高一档）：卡片占满整行、图文左右分栏。
   * 一届最多标一张，标多了版式会乱。
   *
   * 注意它的图片列宽是按下面网格的**两列**算出来的（见 `.cardFeatured`），
   * 所以历届列表固定两列，别改成别的列数。
   */
  featured?: boolean;
};

/** 参会嘉宾。全站按 key 唯一，同一个人跨年份复用同一条记录。 */
export type ForumPerson = {
  key: string;
  nameEn: string;
  nameZh: string;
  titleZh: ReactNode;
  titleEn: ReactNode;
  image?: string;
};

export type ForumAgendaItem = {
  key: string;
  title: ReactNode;
  lead: ReactNode;
  icon: ForumIconKey;
  tags?: string[];
  wide?: boolean;
};

export type ForumAgendaGroup = {
  key: string;
  title: ReactNode;
  desc: ReactNode;
  count: string;
  items: ForumAgendaItem[];
  wide?: boolean;
  layout?: "default" | "subForum" | "specialEvents";
  singleMode?: "panel";
};

export type ForumOrganizerLogo = {
  key: string;
  name: string;
  src: string;
};

export type ForumDevConfLogo = {
  key: string;
  name: string;
  src?: string;
};

export type ForumSupportLogo = {
  key: string;
  name: string;
  src: string;
  href?: string;
};

// ---------------------------------------------------------------------------
// 届次（edition）
// ---------------------------------------------------------------------------

/**
 * 届次所处阶段，决定页面形态：
 * - `planned` / `announced`：筹备或已公布，展示注册信息与「持续更新中」
 * - `live`：会议进行中
 * - `closed`：已结束，隐藏注册与占位内容，改以存档与回顾为主
 */
export type ForumPhase = "planned" | "announced" | "live" | "closed";

export type ForumHero = {
  /** 首屏届次标识，例如「天工论坛 · 2027」。 */
  title: ForumText;
  /** 主题。 */
  theme: ForumText;
  /** 日期与地点，例如「2027 年 X 月 X - X 日  城市」。 */
  date: ForumText;
  /** 首屏背景图，相对于 static 的路径。 */
  image: string;
};

export type ForumVenue = {
  name: ForumText;
  address: ForumText;
  googleMaps: string;
  baiduMaps: string;
  /** 会场配图，相对于 static 的路径。 */
  image: string;
};

export type ForumRegistrationNote = {
  text: ForumText;
  /** 会员权益类备注，样式上会做强调。 */
  member?: boolean;
};

export type ForumRegistration = {
  online: string;
  onsite: string;
  notes: ForumRegistrationNote[];
};

/** 存档页之间用于上一届 / 下一届跳转的最小信息。 */
export type ForumEditionLink = {
  year: number;
  /** 该届的页面地址（当前届次就是 `/forum`）。 */
  to: string;
  label: string;
};

/** 筹备要点的一行：左标签、右内容。 */
export type ForumPlanningItem = {
  label: ForumText;
  value: ForumText;
};

/**
 * 筹备期的硬信息，以一行等宽的卡片呈现，每张卡是「小标签 + 内容」。
 *
 * 没有内容就不填，整段不渲染；会议结束后自动让位给存档提示。
 */
export type ForumPlanning = {
  /**
   * 把主办单位提到这一行的**首格**，摆在会期、地点的左边，整行读作
   * 「谁办的 — 什么时候 — 在哪里」。
   *
   * 主办单位的 logo 不在这里重复填，渲染时直接取 `organizerLogos[0]`，
   * 免得同一个 logo 有两份出处；开启后底部板块也就**不再**单独渲染
   * 主办单位那张卡（其余席位不受影响）。筹备期只定了主办单位时打开它；
   * 等联合主办、赞助商都落实、那一行放不下了，再关掉即可。
   */
  withHost?: boolean;
  /** 会期、地点这类条目，按声明顺序排在主办单位后面。 */
  facts?: ForumPlanningItem[];
};

/** 年度框架的一项，例如 BUILD — 能力基础。 */
export type ForumFrameworkItem = {
  /** 英文标签，例如 `BUILD`。 */
  label: ForumText;
  /** 对应的中文落点，例如「能力基础」。 */
  stage?: ForumText;
  /** 这个阶段要做的事。 */
  value: ForumText;
};

/**
 * 年度框架，例如 BUILD — SHAPE — ACT。
 *
 * 按顺序渲染，三项分别取三种强调色（见 `.frameworkCard`），
 * 所以顺序本身就是设计的一部分，不要随意调换。
 */
export type ForumFramework = {
  /** 一句话说明主线逻辑。 */
  intro?: ForumText;
  items: ForumFrameworkItem[];
};

export type ForumEdition = {
  year: number;
  phase: ForumPhase;
  /** 页面标题与描述，直接进入 <Layout>。 */
  pageTitle: AgendaText;
  pageDescription: AgendaText;

  hero: ForumHero;
  /** 会场未定或早期届次没有留存时可以不填。 */
  venue?: ForumVenue;
  /** 报名信息未定或会议已结束时可以不填。 */
  registration?: ForumRegistration;

  /** 存档页的一段回顾说明，写在「会议已结束」提示下面。 */
  summary?: ForumText;

  /** 筹备期的硬信息：会期、地点。定稿页可以不填。 */
  planning?: ForumPlanning;

  /** 本届的主题框架，例如 BUILD — SHAPE — ACT。 */
  framework?: ForumFramework;

  /**
   * 首屏以外的届次内容。以下字段名与渲染逻辑一致，便于整体传入。
   * 筹备期的届次大多为空，缺省按空集合处理。
   */
  highlights?: ForumHighlight[];
  people?: ForumPerson[];
  devConfLogos?: ForumDevConfLogo[];
  /**
   * 主办一类的席位，**按固定下标**取用：`[0]` 主办单位、`[1]` 联合主办单位、
   * `[2]` 钻石赞助商。缺的席位留空即可（渲染时会整张卡跳过，不会出现空壳），
   * 所以筹备期的届次只填 `[0]` 是正常的。
   */
  organizerLogos?: ForumOrganizerLogo[];
  supportInstitutionLogos?: ForumSupportLogo[];
  agendaGroups?: ForumAgendaGroup[];

  dayLabels?: Partial<Record<AgendaDayKey, AgendaText>>;
  timelineDayLabels?: Partial<Record<AgendaDayKey, AgendaText>>;
  timelineDayShortLabels?: Partial<Record<AgendaDayKey, string>>;

  keynoteSpeakerPhotoBySessionId?: Record<string, string>;
  masterAgendaSlots?: MasterAgendaSlot[];
  activityAgendaDetails?: ActivityAgendaDetail[];

  /** 勘误记录，用于让存档页的后续修改留痕。 */
  revisions?: { date: string; note: string }[];
};
