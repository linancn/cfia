export type AgendaStatus = "published" | "updating" | "pending";

export type AgendaDayKey = "day1" | "day2";

export type AgendaTrackKey = "main" | "subforums" | "special" | "developer";

export type AgendaText = {
  zh: string;
  en?: string;
};

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

export const agendaTrackOrder: AgendaTrackKey[] = [
  "main",
  "subforums",
  "special",
  "developer",
];

export const masterAgendaSlots: MasterAgendaSlot[] = [
  {
    id: "d1-special-unep-am",
    day: "day1",
    track: "special",
    start: "09:00",
    end: "12:00",
    activityKey: "unep-workshop",
    shortTitle: { zh: "UNEP 全球 LCA 平台研讨会", en: "UNEP Global LCA Platform Workshop" },
    status: "updating",
  },
  {
    id: "d1-special-factordb-am",
    day: "day1",
    track: "special",
    start: "10:00",
    end: "12:00",
    activityKey: "national-factor-database-forum",
    shortTitle: {
      zh: "碳足迹因子库建设专题研讨会",
      en: "China National Carbon Footprint Database Workshop",
    },
    status: "pending",
  },
  {
    id: "d1-dev-pm",
    day: "day1",
    track: "developer",
    start: "13:30",
    end: "18:00",
    activityKey: "developer-conference",
    shortTitle: { zh: "LCA 开发者大会", en: "LCA Developer Conference" },
    status: "updating",
  },
  {
    id: "d1-special-assembly-pm",
    day: "day1",
    track: "special",
    start: "16:00",
    end: "17:30",
    activityKey: "general-assembly",
    shortTitle: { zh: "联盟年度大会", en: "CFA General Assembly" },
    status: "published",
  },
  {
    id: "d2-sub-power-pm",
    day: "day2",
    track: "subforums",
    start: "14:00",
    end: "17:30",
    activityKey: "power-workshop",
    shortTitle: { zh: "电力", en: "Power" },
    status: "pending",
  },
  {
    id: "d2-main-am",
    day: "day2",
    track: "main",
    start: "09:00",
    end: "12:00",
    activityKey: "main-forum",
    shortTitle: { zh: "主论坛", en: "Main Forum" },
    status: "published",
  },
  {
    id: "d2-sub-petrochemical-pm",
    day: "day2",
    track: "subforums",
    start: "14:00",
    end: "17:30",
    activityKey: "petrochemical",
    shortTitle: { zh: "石油化工", en: "Petrochemicals" },
    status: "updating",
  },
  {
    id: "d2-sub-battery-pm",
    day: "day2",
    track: "subforums",
    start: "14:00",
    end: "17:30",
    activityKey: "battery",
    shortTitle: { zh: "电池", en: "Battery" },
    status: "updating",
  },
  {
    id: "d2-sub-electronics-pm",
    day: "day2",
    track: "subforums",
    start: "14:00",
    end: "17:30",
    activityKey: "electronics",
    shortTitle: { zh: "电子电器", en: "Electronics" },
    status: "updating",
  },
  {
    id: "d2-sub-lca-audit-pm",
    day: "day2",
    track: "subforums",
    start: "14:00",
    end: "17:30",
    activityKey: "lca-audit",
    shortTitle: { zh: "数据（英语）", en: "Data (EN)" },
    status: "published",
  },
];

export const activityAgendaDetails: ActivityAgendaDetail[] = [
  {
    activityKey: "main-forum",
    groupKey: "main-forum",
    title: { zh: "主论坛", en: "Main Forum" },
    summary: {
      zh: "聚焦全球 LCA 与产品碳足迹体系互联互通，包含领导讲话、主旨报告与总结交流。",
      en: "Leadership remarks, keynote talks, and wrap-up discussions on global LCA and product carbon footprint interoperability.",
    },
    dateLabel: { zh: "2026 年 3 月 26 日", en: "March 26, 2026" },
    timeRange: "Day 2 09:00-12:00",
    venue: { zh: "主会场（紫金厅）", en: "Main Hall (Zijin Hall)" },
    language: "bilingual",
    status: "published",
    hostName: {
      zh: "碳足迹产业技术创新联盟 · 天工LCA",
      en: "Carbon Footprint Alliance · TianGong LCA",
    },
    sessions: [
      {
        id: "mf-d2-open",
        day: "day2",
        title: { zh: "开场", en: "Opening" },
      },
      {
        id: "mf-d2-remarks",
        day: "day2",
        title: { zh: "领导讲话", en: "Leadership Remarks" },
      },
      {
        id: "mf-d2-keynote-he",
        day: "day2",
        title: { zh: "贺克斌", en: "Kebin He" },
        sessionType: { zh: "主旨报告", en: "Keynote" },
        speakers: {
          zh: "清华大学碳中和研究院院长、环境学院教授，中国工程院院士",
          en: "Academician, Chinese Academy of Engineering",
        },
      },
      {
        id: "mf-d2-keynote-llorenc",
        day: "day2",
        title: { zh: "Llorenç Milà i Canals", en: "Llorenc Milà i Canals" },
        sessionType: { zh: "主旨报告", en: "Keynote" },
        speakers: {
          zh: "UNEP Life Cycle Initiative 秘书处负责人",
          en: "Head of Secretariat, UNEP Life Cycle Initiative",
        },
      },
      {
        id: "mf-d2-keynote-xu",
        day: "day2",
        title: { zh: "徐明", en: "Ming Xu" },
        sessionType: { zh: "主旨报告", en: "Keynote" },
        speakers: {
          zh: "清华大学碳中和讲席教授、环境学院副院长",
          en: "Chair Professor of Carbon Neutrality; Deputy Dean, School of Environment, Tsinghua University",
        },
      },
      {
        id: "mf-d2-keynote-finkbeiner",
        day: "day2",
        title: { zh: "Matthias Finkbeiner", en: "Matthias Finkbeiner" },
        sessionType: { zh: "主旨报告", en: "Keynote" },
        speakers: {
          zh: "柏林工业大学教授，可持续工程教席负责人，环境技术研究所常务所长",
          en: "Head of Chair of Sustainable Engineering; Managing Director, Institute of Environmental Technology, Technische Universität Berlin",
        },
      },
      {
        id: "mf-d2-keynote-hamelin",
        day: "day2",
        title: { zh: "Lorie Hamelin", en: "Lorie Hamelin" },
        talkTitle: {
          zh: "可互操作且可信的生物经济 LCA：来自“地平线欧洲”ALIGNED 项目的经验",
          en: "Interoperable and Trustworthy Bioeconomy LCAs: Lessons from the Horizon Europe ALIGNED Project",
        },
        sessionType: { zh: "主旨报告", en: "Keynote" },
        speakers: {
          zh: "法国农业、食品与环境研究院（INRAE）研究员；法国图卢兹国立应用科学学院（INSA Toulouse）讲席教授",
          en: "Researcher at INRAE; Chair Professor at INSA Toulouse",
        },
      },
      {
        id: "mf-d2-keynote-mieras",
        day: "day2",
        title: { zh: "Eric Mieras", en: "Eric Mieras" },
        talkTitle: {
          zh: "构建全球 LCI 数据生态系统的坚实基础",
          en: "Building a Strong Foundation for a Global LCI Data Ecosystem",
        },
        sessionType: { zh: "主旨报告", en: "Keynote" },
        speakers: {
          zh: "PRé 总经理；One Click LCA 首席创新官",
          en: "Managing Director at PRé; Chief Innovation Officer at One Click LCA",
        },
      },
      {
        id: "mf-d2-keynote-naama",
        day: "day2",
        title: { zh: "Naama Avni-Kadosh", en: "Naama Avni-Kadosh" },
        sessionType: { zh: "主旨报告", en: "Keynote" },
        speakers: {
          zh: "世界可持续发展工商理事会（WBCSD）碳透明伙伴关系（PACT）总监",
          en: "Director of the Partnership for Carbon Transparency (PACT), WBCSD",
        },
      },
      {
        id: "mf-d2-wrap",
        day: "day2",
        title: { zh: "总结", en: "Wrap-up" },
      },
    ],
  },
  {
    activityKey: "petrochemical",
    groupKey: "sub-forums",
    title: { zh: "石油化工", en: "Petrochemicals" },
    summaryLeadTop: {
      zh: "主办：\n中国化工节能技术协会",
      en: "Organizer:\nChina Chemical Energy Conservation Technology Association",
    },
    summaryLead: {
      zh: "主持人：\n韦志浩，中国化工节能技术协会党委书记\n李永亮，中国化工节能技术协会秘书长、中国石油和化学工业联合会科技与装备部主任",
      en: "Hosts:\nZhihao Wei, Party Secretary, China Chemical Energy Conservation Technology Association\nYongliang Li, Secretary-General, China Chemical Energy Conservation Technology Association; Director, Department of Science & Technology and Equipment, China Petroleum and Chemical Industry Federation",
    },
    summary: {
      zh: "石油化工分论坛由中国化工节能技术协会承办，将聚焦行业在“双碳”与全球规则背景下面临的关键议题，围绕产品碳足迹政策动态、企业核算与管理平台建设实践、行业标准进展，以及大宗化工产品碳足迹核算与数据体系建设等内容展开交流。论坛设置主题演讲与圆桌讨论两个环节，旨在推动方法、数据与产业链协同机制的对接与共识形成，并为后续行业合作与能力建设提供方向。",
      en: "Hosted by the China Chemical Energy Conservation Technology Association, the Petrochemical Sub-forum will focus on key issues facing the industry under dual-carbon goals and evolving global rules, including policy updates on product carbon footprints, enterprise accounting and management platform practices, industry standard progress, and carbon footprint accounting and data system development for bulk chemical products. The forum will include keynote talks and a roundtable discussion to advance alignment on methods, data, and supply-chain collaboration mechanisms, and to inform follow-on industry cooperation and capacity building.",
    },
    dateLabel: { zh: "2026 年 3 月 26 日", en: "March 26, 2026" },
    timeRange: "Day 2 14:00-17:30",
    venue: { zh: "分会场 A", en: "Breakout Room A" },
    language: "zh",
    status: "updating",
    sessions: [],
  },
  {
    activityKey: "battery",
    groupKey: "sub-forums",
    title: { zh: "电池", en: "Battery" },
    summaryLead: {
      zh: "主持人：\n潘学兴，宁德时代可持续发展总监",
      en: "Host:\nXuexing Pan, Sustainability Director, CATL",
    },
    summary: {
      zh: "电池行业分论坛将以“报告 + 圆桌”的形式，围绕电池产业链在可持续发展与合规要求方面的最新进展展开交流。报告环节将邀请行业组织及产业链代表分享在LCA/碳足迹管理、法规与市场趋势应对（含电池法案与数字产品护照 DPP 等相关方向）、以及数据体系与能力建设方面的实践与思考。圆桌环节将聚焦“共建可用、可信的产业数据生态”，由产业链相关方围绕供应链参与机制与协作模式进行讨论，促进跨环节对接与后续合作机会形成。",
      en: "The Battery Sub-forum will adopt a “talks + roundtable” format to discuss the latest developments in sustainability and compliance requirements across the battery value chain. The talks session will invite industry associations and value-chain representatives to share practices and perspectives on LCA/carbon footprint management, responses to regulatory and market trends (including directions related to the Battery Regulation and Digital Product Passport, DPP), as well as data systems and capability building. The roundtable will focus on “building a usable and trustworthy industry data ecosystem,” bringing stakeholders together to discuss supply-chain participation mechanisms and collaboration models, and to foster cross-link coordination and follow-on cooperation opportunities.",
    },
    dateLabel: { zh: "2026 年 3 月 26 日", en: "March 26, 2026" },
    timeRange: "Day 2 14:00-17:30",
    venue: { zh: "分会场 B", en: "Breakout Room B" },
    language: "zh",
    status: "updating",
    sessions: [],
  },
  {
    activityKey: "electronics",
    groupKey: "sub-forums",
    title: { zh: "电子电器", en: "Electronics" },
    summaryLead: {
      zh: "主持人：\n田金平，清华大学环境学院研究员",
      en: "Host:\nJinping Tian, Researcher, School of Environment, Tsinghua University",
    },
    summary: {
      zh: "电子电器行业分论坛聚焦电子电器产业链在可持续与合规方面的最新进展，围绕产品碳足迹核算与管理、延伸生产者责任（EPR）与回收合规、数字产品护照（DPP）相关要求，以及支撑上述工作的企业数据体系与治理机制展开交流。论坛设置专题报告与圆桌讨论两个环节：报告环节将从整机品牌、关键供应链环节与解决方案视角分享实践经验与挑战；圆桌环节将围绕“如何共建可用、可信的产业数据生态”展开对话，重点讨论供应链参与机制、数据质量与可审计性、数据共享与协作模式等关键议题，促进产业链上下游形成可落地的协同路径。",
      en: "The Electronics Sub-forum focuses on the latest developments in sustainability and compliance across the electronics and electrical appliance value chain, covering product carbon footprint accounting and management, extended producer responsibility (EPR) and recycling compliance, Digital Product Passport (DPP)-related requirements, and the enterprise data systems and governance mechanisms that support these efforts. The forum includes two parts: topical presentations and a roundtable discussion. The presentations will share practical experience and challenges from the perspectives of OEM brands, key supply-chain links, and solution providers. The roundtable will discuss “how to build a usable and trustworthy industry data ecosystem,” with a focus on supply-chain participation mechanisms, data quality and auditability, and data sharing and collaboration models, to help shape actionable collaboration pathways across the value chain.",
    },
    dateLabel: { zh: "2026 年 3 月 26 日", en: "March 26, 2026" },
    timeRange: "Day 2 14:00-17:30",
    venue: { zh: "分会场 C", en: "Breakout Room C" },
    language: "zh",
    status: "updating",
    sessions: [],
  },
  {
    activityKey: "lca-audit",
    groupKey: "sub-forums",
    title: { zh: "数据", en: "Data (EN)" },
    summaryLead: {
      zh: "主持人：\nAlessandro Manzardo，帕多瓦大学土木、建筑与环境工程系（ICEA）环境质量研究中心（CESQA）副教授",
      en: "Host:\nAlessandro Manzardo, Associate Professor, Centre for Environmental Quality Studies (CESQA), Department of Civil, Environmental and Architectural Engineering (ICEA), University of Padua",
    },
    summary: {
      zh: "本分论坛聚焦LCA 与碳足迹数据相关，旨在汇聚全球范围内数据库建设与数据应用的最新实践，围绕数据获取与治理、方法学一致性、数据质量管理与不确定性表达，以及第三方审验/认证与质量控制等关键问题开展交流。议程将包括若干实践分享环节，介绍不同地区与机构在数据库构建、运行维护与服务应用方面的经验，并设置圆桌讨论，围绕“如何提升数据的可用性、可信度与可比性”展开对话与互动，促进后续合作与对接。",
      en: "This sub-forum focuses on LCA and carbon footprint data, aiming to bring together the latest global practices in database development and data application. Discussions will cover key topics including data acquisition and governance, methodological consistency, data quality management and uncertainty representation, as well as third-party verification/certification and quality control. The agenda will include practical sharing sessions introducing experiences from different regions and institutions in database construction, operation and maintenance, and service applications, followed by a roundtable discussion on “how to improve data usability, trustworthiness, and comparability” to foster follow-on collaboration and matchmaking.",
    },
    dateLabel: { zh: "2026 年 3 月 26 日", en: "March 26, 2026" },
    timeRange: "Day 2 14:00-17:30",
    venue: { zh: "国际专场（英文）", en: "International Track (EN)" },
    language: "en",
    status: "published",
    sessions: [],
  },
  {
    activityKey: "developer-conference",
    groupKey: "developer",
    title: { zh: "LCA 开发者大会", en: "LCA Developer Conference" },
    summary: { zh: "围绕 LCA 工具链、数据库生态、开发接口与协作实践展开。", en: "Focus on tooling, database ecosystems, APIs, and collaborative development practices." },
    dateLabel: { zh: "2026 年 3 月 25 日", en: "March 25, 2026" },
    timeRange: "Day 1 13:30-18:00",
    venue: { zh: "开发者专场", en: "Developer Track" },
    language: "bilingual",
    status: "updating",
    sessions: [
      {
        id: "dev-opening",
        day: "day1",
        start: "13:30",
        end: "13:35",
        title: { zh: "开场", en: "Opening" },
        orgLogoKey: "tiangong",
        sessionType: { zh: "开场", en: "Opening" },
        speakers: {
          zh: "李楠，清华大学环境学院副研究员",
          en: "Nan Li, Associate Researcher, School of Environment, Tsinghua University",
        },
      },
      {
        id: "dev-tiangong",
        day: "day1",
        start: "13:35",
        end: "13:55",
        title: { zh: "天工计划", en: "Tsinghua University (TianGong)" },
        orgLogoKey: "tiangong",
        sessionType: { zh: "报告", en: "Talk" },
        speakers: { zh: "李楠", en: "Nan Li" },
        note: {
          zh: "清华大学环境学院副研究员",
          en: "Associate Researcher, School of Environment, Tsinghua University",
        },
      },
      {
        id: "dev-carbonminds",
        day: "day1",
        start: "13:55",
        end: "14:15",
        title: { zh: "Carbon Minds", en: "Carbon Minds" },
        orgLogoKey: "carbonminds",
        sessionType: { zh: "报告", en: "Talk" },
        speakers: { zh: "Raoul Meys", en: "Raoul Meys" },
        note: {
          zh: "Carbon Minds 联合创始人、总经理",
          en: "Co-Founder and Managing Director, Carbon Minds",
        },
      },
      {
        id: "dev-dds",
        day: "day1",
        start: "14:15",
        end: "14:35",
        title: { zh: "Départ de Sentier（Brightway）", en: "Départ de Sentier" },
        orgLogoKey: "dds",
        sessionType: { zh: "报告", en: "Talk" },
        speakers: { zh: "Chris Mutel", en: "Chris Mutel" },
        note: {
          zh: "Départ de Sentier 主席",
          en: "President, Départ de Sentier",
        },
      },
      {
        id: "dev-envision",
        day: "day1",
        start: "14:35",
        end: "14:55",
        title: { zh: "Univers", en: "Univers" },
        orgLogoKey: "envision",
        sessionType: { zh: "报告", en: "Talk" },
        speakers: {
          zh: "邱林",
          en: "Lin Qiu",
        },
        note: {
          zh: "远景智能零碳卓越中心全球负责人",
          en: "Global Head of Net Zero CoE, Univers",
        },
      },
      {
        id: "dev-greendelta",
        day: "day1",
        start: "14:55",
        end: "15:15",
        title: { zh: "GreenDelta（openLCA）", en: "GreenDelta" },
        orgLogoKey: "greendelta",
        sessionType: { zh: "报告", en: "Talk" },
        speakers: { zh: "Andreas Ciroth", en: "Andreas Ciroth" },
        note: { zh: "GreenDelta CEO", en: "CEO, GreenDelta" },
      },
      {
        id: "dev-hiq",
        day: "day1",
        start: "15:15",
        end: "15:35",
        title: { zh: "HiQ LCD", en: "HiQ LCD" },
        orgLogoKey: "hiq",
        sessionType: { zh: "报告", en: "Talk" },
        speakers: { zh: "桂志军", en: "Zhijun Gui" },
        note: { zh: "海科数据 CEO（HiQ LCD）", en: "CEO, HiQ LCD" },
      },
      {
        id: "dev-minviro",
        day: "day1",
        start: "15:35",
        end: "15:55",
        title: { zh: "Minviro", en: "Minviro" },
        orgLogoKey: "minviro",
        sessionType: { zh: "报告", en: "Talk" },
        speakers: { zh: "Robert Pell", en: "Robert Pell" },
        note: { zh: "Minviro CEO", en: "CEO, Minviro" },
      },
      {
        id: "dev-pre",
        day: "day1",
        start: "15:55",
        end: "16:15",
        title: { zh: "PRé（SimaPro）", en: "PRé" },
        orgLogoKey: "pre",
        sessionType: { zh: "报告", en: "Talk" },
        speakers: { zh: "Eric Mieras", en: "Eric Mieras" },
        note: {
          zh: "One Click LCA 首席创新官；PRé 总经理",
          en: "Chief Innovation Officer at One Click LCA & Managing Director at PRé",
        },
      },
      {
        id: "dev-watershed",
        day: "day1",
        start: "16:15",
        end: "16:35",
        title: { zh: "Watershed", en: "Watershed" },
        orgLogoKey: "watershed",
        sessionType: { zh: "报告", en: "Talk" },
        speakers: { zh: "Mo Li", en: "Mo Li" },
        note: {
          zh: "Watershed/Cornerstone 环境科学家",
          en: "Environmental Scientist at Watershed/Cornerstone",
        },
      },
      {
        id: "dev-panel",
        day: "day1",
        start: "16:50",
        end: "17:20",
        title: { zh: "圆桌讨论（全体嘉宾）", en: "Panel Discussion (All Speakers)" },
        sessionType: { zh: "圆桌", en: "Panel" },
        moderator: { zh: "李楠（Nan Li）", en: "Nan Li" },
      },
      {
        id: "dev-networking",
        day: "day1",
        start: "17:20",
        end: "18:00",
        title: { zh: "交流与自由讨论", en: "Networking & Open Discussion" },
        sessionType: { zh: "交流", en: "Networking" },
      },
    ],
  },
  {
    activityKey: "general-assembly",
    groupKey: "special-events",
    title: { zh: "联盟全体会员大会", en: "CFA General Assembly" },
    summaryLead: {
      zh: "主持人：\n徐明，碳足迹产业技术创新联盟秘书长",
      en: "Host:\nMing Xu, Secretary-General, Carbon Footprint Industry Technology Innovation Alliance",
    },
    summary: {
      zh: "本次联盟全体大会将围绕联盟年度重点工作开展交流与讨论，主要包括通报联盟阶段性工作进展，审议年度工作计划和相关事项，听取成员单位意见建议，并就下一步合作方向和重点任务进行沟通协调，推动联盟各项工作有序开展。",
      en: "The CFA General Assembly will focus on the alliance’s annual priority work, including updates on phased progress, review of the annual work plan and related matters, collection of feedback and suggestions from member organizations, and coordination on next-step cooperation directions and priority tasks, in order to advance the alliance’s work in an orderly manner.",
    },
    hideSummaryUpdateNote: true,
    dateLabel: { zh: "2026 年 3 月 25 日", en: "March 25, 2026" },
    timeRange: "Day 1 16:00-17:30",
    venue: { zh: "专项活动会场 1", en: "Special Events Room 1" },
    language: "zh",
    status: "published",
    hostName: { zh: "碳足迹产业技术创新联盟（CFA）", en: "Carbon Footprint Alliance (CFA)" },
    hostLogo: "img/tg-forum/orgnizations/events/cfa.png",
    sessions: [],
  },
  {
    activityKey: "unep-workshop",
    groupKey: "special-events",
    title: { zh: "UNEP 全球 LCA 平台研讨会", en: "UNEP Global LCA Platform Workshop" },
    summaryLead: {
      zh: "主持人：Llorenç Milà i Canals，UNEP Life Cycle Initiative 秘书处负责人",
      en: "Moderator: Llorenç Milà i Canals, Head of Secretariat, UNEP Life Cycle Initiative",
    },
    summary: {
      zh: "UNEP Global LCA Platform Workshop 为一场专项研讨，主要面向 LCA 服务机构、数据库/软件提供方和用户。会议将基于平台蓝图，聚焦梳理一线实践中的关键痛点，设计应用场景，并讨论可执行的协作方式与支持路径，形成下一步推进的共识与行动项。",
      en: "The UNEP Global LCA Platform Workshop is a focused workshop primarily for LCA service providers, database/software providers, and users. Based on the platform blueprint, the workshop will identify key pain points in frontline practice, design application scenarios, and discuss actionable collaboration models and support pathways to build consensus and define next-step actions.",
    },
    dateLabel: { zh: "2026 年 3 月 25 日", en: "March 25, 2026" },
    timeRange: "Day 1 09:00-12:00",
    venue: { zh: "专项活动会场 2", en: "Special Events Room 2" },
    language: "en",
    status: "updating",
    hostName: { zh: "UNEP 生命周期倡议", en: "UNEP Life Cycle Initiative" },
    hostLogo: "img/tg-forum/orgnizations/events/unep_lci.png",
    sessions: [],
  },
  {
    activityKey: "national-factor-database-forum",
    groupKey: "special-events",
    title: {
      zh: "碳足迹因子库建设专题研讨会",
      en: "China National Carbon Footprint Database Workshop",
    },
    summary: {
      zh: "本专题研讨会围绕生态环境部《产品碳足迹因子数据库建设工作指引》开展技术研讨与交流，面向国家与地方因子库建设相关科研机构、技术服务机构、行业协会与企业。会议聚焦高质量因子库建设的方法论与口径、数据结构与元数据、数据资源与质量管理、辅助工具与平台支撑等关键问题，通过专题报告、案例分享与技术交流，推动构建覆盖广、质量高、可持续更新且具国际影响力的产品碳足迹数据体系。",
      en: "This focused workshop will conduct technical discussions and exchanges around the Ministry of Ecology and Environment’s Guidelines for the Construction of Product Carbon Footprint Databases, targeting research institutions, technical service providers, industry associations, and enterprises involved in national and local database development. The workshop will focus on key topics for building high-quality databases, including methodologies and accounting boundaries, data structures and metadata, data resources and quality management, and supporting tools and platforms. Through thematic presentations, case sharing, and technical exchange, it aims to advance the development of a product carbon footprint data system that is broad in coverage, high in quality, sustainably updatable, and internationally influential.",
    },
    dateLabel: { zh: "2026 年 3 月 25 日", en: "March 25, 2026" },
    timeRange: "Day 1 10:00-12:00",
    venue: { zh: "专项活动会场 1", en: "Special Events Room 1" },
    language: "zh",
    status: "pending",
    sessions: [],
  },
  {
    activityKey: "power-workshop",
    groupKey: "sub-forums",
    title: { zh: "电力", en: "Power" },
    summaryLeadTop: {
      zh: "主办：\n国网江苏省电力公司\n清华苏州环境创新研究院 天工智库中心",
      en: "Organizers:\nState Grid Jiangsu Electric Power Co., Ltd.\nTianGong Think Tank Center, Tsinghua Suzhou Institute for Environmental Innovation",
    },
    summaryLead: {
      zh: "主持人：\n郑颖，北京电链科技有限公司双碳事业部总监/清华天工智库中心特邀研究员\n李卓，能源基金会清洁电力项目主管\n陈钰什，清华天工智库特聘研究员",
      en: "Hosts:\nYing Zheng, Director, Dual-Carbon Business Division, Beijing Dianlian Technology Co., Ltd.; Invited Research Fellow, Tsinghua TianGong Think Tank Center\nZhuo Li, Program Manager, Clean Power Program, Energy Foundation China\nYushi Chen, Distinguished Research Fellow, TianGong Think Tank",
    },
    summary: {
      zh: "电力与碳足迹分论坛将围绕电力碳足迹与电力系统碳排放议题，结合能源转型背景，邀请相关机构与企业代表进行分享与交流，讨论方法、数据与应用协同，推动电力碳数据体系建设与实践对接。",
      en: "The Power and Carbon Footprint Sub-forum will focus on power carbon footprints and power-system carbon emissions in the context of the energy transition. Representatives from relevant institutions and enterprises will be invited to share practices and exchange views, discussing coordination across methods, data, and applications, and advancing the development and practical alignment of power carbon data systems.",
    },
    dateLabel: { zh: "2026 年 3 月 26 日", en: "March 26, 2026" },
    timeRange: "Day 2 14:00-17:30",
    venue: { zh: "分论坛会场（待确认）", en: "Sub-forum Venue (TBC)" },
    language: "zh",
    status: "pending",
    sessions: [],
  },
];
