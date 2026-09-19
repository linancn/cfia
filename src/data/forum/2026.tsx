import Translate, { translate } from "@docusaurus/Translate";

import { activityAgendaDetails, masterAgendaSlots } from "./2026/agenda";
import type {
  AgendaDayKey,
  AgendaText,
  ForumAgendaGroup,
  ForumDevConfLogo,
  ForumEdition,
  ForumHighlight,
  ForumOrganizerLogo,
  ForumPerson,
  ForumSupportLogo,
} from "./types";

/**
 * 天工论坛 2026（江苏 · 南京）的全部内容。
 *
 * 会议已结束，本文件即为该届的存档快照。此后如需勘误，请一并补记 revisions，
 * 不要静默修改已经对外公布过的信息。
 */


const highlights: ForumHighlight[] = [
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
    theme: {
      zh: "政产学研全面协同，共建产品碳足迹管理体系",
      en: "Cross-sector collaboration to build a product carbon footprint management system",
    },
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
    theme: {
      zh: "发起 LCA 数据开放共享与协同治理联合研究计划",
      en: "Launched a joint research initiative on open sharing and collaborative governance of LCA data.",
    },
    image: "img/tg-forum/past/tg-forum-1st.jpg",
    to: "/forum/2023",
  },
];

const people: ForumPerson[] = [
  {
    key: "thiago-rodrigues",
    nameEn: "Thiago Oliveira Rodrigues",
    nameZh: "Thiago Oliveira Rodrigues",
    titleZh: <>巴西科学与技术信息研究所（Ibict）高级研究员</>,
    titleEn: <>Senior researcher, Brazilian Institute for Science and Technology Information (Ibict)</>,
    image: "img/tg-forum/people/ThiagoR-ibict.jpeg",
  },
  {
    key: "andreas-ciroth",
    nameEn: "Andreas Ciroth",
    nameZh: "Andreas Ciroth",
    titleZh: <>GreenDelta CEO<br />（openLCA）</>,
    titleEn: <>CEO, GreenDelta</>,
    image: "img/tg-forum/people/AndreasC-greendelta.jpg",
  },
  {
    key: "jun-ki-choi",
    nameEn: "Jun-Ki Choi",
    nameZh: "Jun-Ki Choi",
    titleZh: <>代顿大学教授</>,
    titleEn: <>Professor, University of Dayton</>,
    image: "img/tg-forum/people/ChoiJK-uod.jpg",
  },
  {
    key: "qimin-chai",
    nameEn: "Qimin Chai",
    nameZh: "柴麒敏",
    titleZh: <>国家气候战略中心战略规划部主任、研究员</>,
    titleEn: (
      <>
        Director and Research Fellow, Strategic Planning Department, NCSC
      </>
    ),
    image: "img/tg-forum/people/QiminC-ncsc.jpg",
  },
  {
    key: "natasha-das",
    nameEn: "Natasha Das",
    nameZh: "Natasha Das",
    titleZh: <>AECOM 高级碳咨询顾问</>,
    titleEn: <>Senior Carbon Consultant, AECOM</>,
    image: "img/tg-forum/people/NatashaD-AECOM.jpg",
  },
  {
    key: "matthias-finkbeiner",
    nameEn: "Matthias Finkbeiner",
    nameZh: "Matthias Finkbeiner",
    titleZh: <>柏林工业大学教授</>,
    titleEn: (
      <>
        Prof. Dr., TU Berlin
      </>
    ),
    image: "img/tg-forum/people/MatthiasF-tub.jpg",
  },
  {
    key: "shabbir-gheewala",
    nameEn: "Shabbir H. Gheewala",
    nameZh: "Shabbir H. Gheewala",
    titleZh: <>泰国国王科技大学吞武里校区（KMUTT）教授</>,
    titleEn: (
      <>
        Professor, King Mongkut's University of Technology Thonburi (KMUTT)
      </>
    ),
    image: "img/tg-forum/people/ShabbirG-kmutt.jpg",
  },
  {
    key: "zhuohui-huang",
    nameEn: "Zhuohui Huang",
    nameZh: "黄卓晖",
    titleZh: <>世界资源研究所北京代表处副研究员</>,
    titleEn: <>Research Analyst, WRI China</>,
    image: "img/tg-forum/people/ZhuohuiH-wri.jpg",
  },
  {
    key: "zhijun-gui",
    nameEn: "Zhijun Gui",
    nameZh: "桂志军",
    titleZh: <>海科数据 CEO<br />（HiQ LCD）</>,
    titleEn: <>CEO, HiQ LCD</>,
    image: "img/tg-forum/people/ZhijunG-hiq.jpg",
  },
  {
    key: "ramzy-kahhat",
    nameEn: "Ramzy Kahhat",
    nameZh: "Ramzy Kahhat",
    titleZh: <>秘鲁天主教大学工程学院（PELCAN）教授</>,
    titleEn: <>Professor, Pontificia Universidad Católica del Perú (PELCAN)</>,
    image: "img/tg-forum/people/RamzyK-pucp.jpg",
  },
  {
    key: "mo-li",
    nameEn: "Mo Li",
    nameZh: "Mo Li",
    titleZh: <>Watershed/Cornerstone 环境科学家</>,
    titleEn: <>Environmental Scientist at Watershed/Cornerstone</>,
    image: "img/tg-forum/people/MoL-watershed.jpg",
  },
  {
    key: "nan-li",
    nameEn: "Nan Li",
    nameZh: "李楠",
    titleZh: <>清华大学环境学院副研究员</>,
    titleEn: <>Associate Researcher, School of Environment, Tsinghua University</>,
    image: "img/tg-forum/people/NanL-thu.jpeg",
  },
  {
    key: "alessandro-manzardo",
    nameEn: "Alessandro Manzardo",
    nameZh: "Alessandro Manzardo",
    titleZh: <>帕多瓦大学副教授</>,
    titleEn: <>Associate Professor, University of Padua</>,
    image: "img/tg-forum/people/AlessandroM-upd.jpg",
  },
  {
    key: "patrick-mcmaster",
    nameEn: "Patrick McMaster",
    nameZh: "Patrick McMaster（廖利财）",
    titleZh: <>国际能源署（IEA）能效与包容性转型中心中国负责人</>,
    titleEn: <>China Lead, IEA Office of Energy Efficiency and Inclusive Transitions</>,
    image: "img/tg-forum/people/PatrickM-iea.jpg",
  },
  {
    key: "llorenc-mila-i-canals",
    nameEn: "Llorenç Milà i Canals",
    nameZh: "Llorenç Milà i Canals",
    titleZh: <>UNEP LCI 秘书处负责人</>,
    titleEn: <>Head of Secretariat, UNEP Life Cycle Initiative</>,
    image: "img/tg-forum/people/LlorencM-unep.jpg",
  },
  {
    key: "lorie-hamelin",
    nameEn: "Lorie Hamelin",
    nameZh: "Lorie Hamelin",
    titleZh: <>法国农业、食品与环境研究院（INRAE）研究员</>,
    titleEn: <>Researcher at INRAE; Chair Professor at INSA Toulouse</>,
    image: "img/tg-forum/people/LorieH-inrae.jpg",
  },
  {
    key: "eric-mieras",
    nameEn: "Eric Mieras",
    nameZh: "Eric Mieras",
    titleZh: <>PRé 总经理、One Click LCA 首席创新官（SimaPro）</>,
    titleEn: <>Managing Director at PRé & Chief Innovation Officer at One Click LCA</>,
    image: "img/tg-forum/people/EricMieras-1clicklca-pre.jpg",
  },
  {
    key: "raoul-meys",
    nameEn: "Raoul Meys",
    nameZh: "Raoul Meys",
    titleZh: <>Carbon Minds<br />联合创始人、总经理</>,
    titleEn: <>Co-Founder and Managing Director, Carbon Minds</>,
    image: "img/tg-forum/people/RaoulM-carbonminds.jpg",
  },
  {
    key: "jitti-mungkalasiri",
    nameEn: "Jitti Mungkalasiri",
    nameZh: "Jitti Mungkalasiri",
    titleZh: <>泰国国家科学技术发展署（NSTDA）</>,
    titleEn: (
      <>
        National Science and Technology
        <br />
        Development Agency (NSTDA), Thailand
      </>
    ),
    image: "img/tg-forum/people/JittiM-nstda.jpg",
  },
  {
    key: "carl-vadenbo",
    nameEn: "Carl Vadenbo",
    nameZh: "Carl Vadenbo",
    titleZh: <>ecoinvent 数据库内容负责人</>,
    titleEn: <>Database Content Lead, ecoinvent</>,
    image: "img/tg-forum/people/CarlV-ecoinvent.jpg",
  },
  {
    key: "chris-mutel",
    nameEn: "Chris Mutel",
    nameZh: "Chris Mutel",
    titleZh: <>Départ de Sentier 主席<br />（Brightway）</>,
    titleEn: <>President, Départ de Sentier</>,
    image: "img/tg-forum/people/ChrisM-DdS.jpg",
  },
  {
    key: "rober-pell",
    nameEn: "Robert Pell",
    nameZh: "Robert Pell",
    titleZh: <>Minviro CEO</>,
    titleEn: <>CEO, Minviro</>,
    image: "img/tg-forum/people/RobertP-minviro.jpg",
  },
  {
    key: "xuexing-pan",
    nameEn: "Xuexing Pan",
    nameZh: "潘学兴",
    titleZh: <>宁德时代可持续发展负责人</>,
    titleEn: <>Head of Sustainability, CATL</>,
    image: "img/tg-forum/people/XuexingP-catl.jpg",
  },
  {
    key: "sangwon-suh",
    nameEn: "Sangwon Suh",
    nameZh: "Sangwon Suh",
    titleZh: <>清华大学讲席教授</>,
    titleEn: <>Chair Professor, Tsinghua University</>,
    image: "img/tg-forum/people/SangwonS-thu.jpg",
  },
  {
    key: "jinping-tian",
    nameEn: "Jinping Tian",
    nameZh: "田金平",
    titleZh: <>清华大学环境学院研究员</>,
    titleEn: <>Researcher, School of Environment, Tsinghua University</>,
    image: "img/tg-forum/people/JinpingT-thu.JPG",
  },
  {
    key: "ian-vazquez-rowe",
    nameEn: "Ian Vázquez-Rowe",
    nameZh: "Ian Vázquez-Rowe",
    titleZh: <>秘鲁天主教大学（PUCP）工程系正教授</>,
    titleEn: <>Full professor at the Department of Engineering at PUCP.</>,
    image: "img/tg-forum/people/IanVR-pucp.jpg",
  },
  {
    key: "ming-xu",
    nameEn: "Ming Xu",
    nameZh: "徐明",
    titleZh: <>清华大学讲席教授</>,
    titleEn: <>Chair Professor, Tsinghua University</>,
    image: "img/tg-forum/people/MingX-thu.jpg",
  },
  {
    key: "jingjie-zhang",
    nameEn: "Jingjie Zhang",
    nameZh: "张晶杰",
    titleZh: <>中国电力企业联合会规划发展部（低碳研究部）副主任</>,
    titleEn: (
      <>
        Deputy Director, Planning and Development Department (Low-Carbon Research
        Department), China Electricity Council
      </>
    ),
    image: "img/tg-forum/people/JingjieZ-zdl.jpg",
  },
  {
    key: "jingxuan-hui",
    nameEn: "Jingxuan Hui",
    nameZh: "惠婧璇",
    titleZh: <>国家发展改革委能源研究所环境中心副主任</>,
    titleEn: <>Deputy Director, Environmental Center, Energy Research Institute, NDRC</>,
    image: "img/tg-forum/people/JingxuanH-nrdc.jpg",
  },
  {
    key: "haixiao-zhang",
    nameEn: "Haixiao Zhang",
    nameZh: "张海孝",
    titleZh: <>GaBi中国区 总经理（宁波希耐科）</>,
    titleEn: (
      <>
        General Manager
        <br />
        GaBi China & CNECO
      </>
    ),
    image: "img/tg-forum/people/HaixiaoZ-gabi.jpg",
  },
  {
    key: "naama-avni-kadosh",
    nameEn: "Naama Avni-Kadosh",
    nameZh: "Naama Avni-Kadosh",
    titleZh: <>世界可持续发展工商理事会（WBCSD）碳透明伙伴关系（PACT）总监</>,
    titleEn: <>Director of the Partnership for Carbon Transparency (PACT) at WBCSD</>,
    image: "img/tg-forum/people/NaamaA-wbcsd.jpg",
  },
  {
    key: "lin-qiu",
    nameEn: "Lin Qiu",
    nameZh: "邱林",
    titleZh: <>远景智能（Univers）零碳卓越中心全球负责人</>,
    titleEn: <>Global Head of Zero Carbon Excellence Center, Univers</>,
    image: "img/tg-forum/people/LinQ-univers.jpg",
  },
  {
    key: "ying-zheng",
    nameEn: "Ying Zheng",
    nameZh: "郑颖",
    titleZh: <>电链科技/天工智库 总监/研究员</>,
    titleEn: <>Dianlian Tech / TianGong Think Tank, Director / Researcher</>,
    image: "img/tg-forum/people/YingZ-tg.jpg",
  },
];

const devConfLogos: ForumDevConfLogo[] = [
  {
    key: "carbonminds",
    name: "Carbon Minds",
    src: "img/tg-forum/orgnizations/lca_dev_conf/carbonminds.jpg",
  },
  {
    key: "dds",
    name: "Départ de Sentier",
    src: "img/tg-forum/orgnizations/lca_dev_conf/dds.jpg",
  },
  {
    key: "cornerstone",
    name: "Cornerstone",
    src: "img/tg-forum/orgnizations/lca_dev_conf/cornerstone.jpg",
  },
  {
    key: "ecoinvent",
    name: "ecoinvent",
    src: "img/tg-forum/orgnizations/lca_dev_conf/ecoinvent.png",
  },
  {
    key: "greendelta",
    name: "GreenDelta",
    src: "img/tg-forum/orgnizations/lca_dev_conf/greendelta.jpg",
  },
  {
    key: "hiq",
    name: "HiQ",
    src: "img/tg-forum/orgnizations/lca_dev_conf/hiq.jpg",
  },
  {
    key: "minviro",
    name: "Minviro",
    src: "img/tg-forum/orgnizations/lca_dev_conf/minviro.jpg",
  },
  {
    key: "pre",
    name: "PRé",
    src: "img/tg-forum/orgnizations/lca_dev_conf/pre.png",
  },
  {
    key: "tiangong",
    name: "TianGong",
    src: "img/tg-forum/orgnizations/lca_dev_conf/tiangong.jpg",
  },
  {
    key: "envision",
    name: "Univers",
    src: "img/tg-forum/orgnizations/lca_dev_conf/univers.png",
  },
  {
    key: "watershed",
    name: "Watershed",
    src: "img/tg-forum/orgnizations/lca_dev_conf/watershed.jpg",
  },
  {
    key: "sues",
    name: "Shanghai University of Engineering Science",
    src: "img/tg-forum/orgnizations/lca_dev_conf/sues.jpg",
  },
  {
    key: "wbcsd",
    name: "WBCSD",
    src: "img/tg-forum/orgnizations/lca_dev_conf/wbcsd.jpg",
  },
];

const organizerLogos: ForumOrganizerLogo[] = [
  {
    key: "cfa",
    name: "CFA",
    src: "img/tg-forum/orgnizations/events/cfa.png",
  },
  {
    key: "cses",
    name: "CSES",
    src: "img/tg-forum/partner-logo/cses.jpg",
  },
  {
    key: "envision",
    name: "Envision",
    src: "img/tg-forum/partner-logo/envision.png",
  },
];

const supportInstitutionLogos: ForumSupportLogo[] = [
  {
    key: "thuicon",
    name: translate({
      id: "forum.partner.thuicon",
      message: "清华大学碳中和研究院",
    }),
    src: "img/tg-forum/partner-logo/thuicon.jpg",
  },
  {
    key: "thuenv",
    name: translate({
      id: "forum.partner.thuenv",
      message: "清华大学环境学院",
    }),
    src: "img/tg-forum/partner-logo/thuenv.jpg",
  },
  {
    key: "cnest",
    name: "CNEST",
    src: "img/tg-forum/partner-logo/CNEST.jpg",
  },
  {
    key: "dcv",
    name: "国际数碳谷",
    src: "img/tg-forum/partner-logo/dcv.jpg",
  },
  {
    key: "ijmcccn",
    name: "ijmcccn",
    src: "img/tg-forum/partner-logo/ijmcccn.jpg",
    href: "https://jointmission.lib.tsinghua.edu.cn/",
  },
  {
    key: "riet",
    name: translate({
      id: "forum.partner.riet",
      message: "清华苏州环境创新研究院（RIET）",
    }),
    src: "img/tg-forum/partner-logo/riet.jpg",
  },
  {
    key: "cesqa",
    name: "CESQA",
    src: "img/tg-forum/partner-logo/cesqa.jpg",
  },
  {
    key: "ibict",
    name: "IBICT",
    src: "img/tg-forum/partner-logo/ibict.jpg",
  },
  {
    key: "icea",
    name: "ICEA",
    src: "img/tg-forum/partner-logo/ICEA.jpg",
  },
  {
    key: "lis",
    name: "LIS",
    src: "img/tg-forum/partner-logo/lis.jpg",
  },
  {
    key: "pucp",
    name: "PUCP",
    src: "img/tg-forum/partner-logo/PUCP.jpg",
  },
];

const agendaGroups: ForumAgendaGroup[] = [
  {
    key: "main-forum",
    title: <Translate id="forum.agenda.mainForum.title">主论坛</Translate>,
    desc: (
      <Translate id="forum.agenda.mainForum.desc">
        高级别主旨演讲和重点成果发布。
      </Translate>
    ),
    count: "1",
    wide: true,
    singleMode: "panel",
    items: [],
  },
  {
    key: "sub-forums",
    title: <Translate id="forum.agenda.subForums.title">分论坛</Translate>,
    desc: (
      <Translate id="forum.agenda.subForums.desc">
        行业议题深度讨论与数据体系共建，分论坛独立发布更新。
      </Translate>
    ),
    count: "5",
    layout: "subForum",
    items: [
      {
        key: "power-workshop",
        title: (
          <Translate id="forum.agenda.special.powerWorkshop">
            电力
          </Translate>
        ),
        lead: (
          <Translate id="forum.agenda.special.powerWorkshop.lead">
            活动内容和议程确认中。
          </Translate>
        ),
        icon: "forum",
        tags: [translate({ id: "forum.agenda.tag.subForum", message: "分论坛" })],
      },
      {
        key: "petrochemical",
        title: <Translate id="forum.agenda.subForums.petroleum">石化化工</Translate>,
        lead: (
          <Translate id="forum.agenda.subForums.petroleum.lead">
            产品碳足迹驱动石化行业绿色低碳发展。
          </Translate>
        ),
        icon: "forum",
        tags: [translate({ id: "forum.agenda.tag.subForum", message: "分论坛" })],
      },
      {
        key: "battery",
        title: <Translate id="forum.agenda.subForums.battery">电池</Translate>,
        lead: (
          <Translate id="forum.agenda.subForums.battery.lead">
            产品碳足迹在电池产业链的实践与展望。
          </Translate>
        ),
        icon: "forum",
        tags: [translate({ id: "forum.agenda.tag.subForum", message: "分论坛" })],
      },
      {
        key: "electronics",
        title: <Translate id="forum.agenda.subForums.electronics">电子电器</Translate>,
        lead: (
          <Translate id="forum.agenda.subForums.electronics.lead">
            电子电器供应链深度脱碳。
          </Translate>
        ),
        icon: "forum",
        tags: [translate({ id: "forum.agenda.tag.subForum", message: "分论坛" })],
      },
      {
        key: "lca-audit",
        title: (
          <Translate id="forum.agenda.subForums.audit">LCA与碳足迹数据</Translate>
        ),
        lead: (
          <Translate id="forum.agenda.subForums.audit.lead">
            聚焦数据库、核证与数据质量的全球实践。
          </Translate>
        ),
        icon: "forum",
      },
    ],
  },
  {
    key: "developer",
    title: <Translate id="forum.agenda.developer.title">LCA 开发者大会</Translate>,
    desc: (
      <Translate id="forum.agenda.developer.desc">
        关注工具链、数据生态与开发实践，面向开发者的主题活动。
      </Translate>
    ),
    count: "1",
    wide: true,
    singleMode: "panel",
    items: [
      {
        key: "developer-conference",
        title: <Translate id="forum.agenda.developer.item">LCA 开发者大会</Translate>,
        lead: (
          <Translate id="forum.agenda.developer.lead">
            主场议程信息持续完善，欢迎提供议题与案例。
          </Translate>
        ),
        icon: "developer",
      },
    ],
  },
  {
    key: "special-events",
    title: <Translate id="forum.agenda.special.title">专项活动</Translate>,
    desc: (
      <Translate id="forum.agenda.special.desc">
        跨机构联合活动与全球合作专场，信息实时更新。
      </Translate>
    ),
    count: "4",
    layout: "specialEvents",
    items: [
      {
        key: "general-assembly",
        title: (
          <Translate id="forum.agenda.special.assembly">{"联盟全体会员大会\n（闭门）"}</Translate>
        ),
        lead: (
          <Translate id="forum.agenda.special.assembly.lead">
            总结年度工作，发布年度计划与阶段性成果。
          </Translate>
        ),
        icon: "assembly",
        tags: [translate({ id: "forum.agenda.tag.special", message: "专项活动" })],
      },
      {
        key: "unep-workshop",
        title: (
          <Translate id="forum.agenda.special.unep">
            {"UNEP 全球 LCA 平台研讨会（邀请制）"}
          </Translate>
        ),
        lead: (
          <Translate id="forum.agenda.special.unep.lead">
            UNEP 牵头建设的全球 LCA 平台专项工作组会议。
          </Translate>
        ),
        icon: "spark",
      },
      {
        key: "national-factor-database-forum",
        title: (
          <Translate id="forum.agenda.special.factorDatabase">
            国家碳足迹因子库建设专题论坛
          </Translate>
        ),
        lead: (
          <Translate id="forum.agenda.special.factorDatabase.lead">
            活动内容和议程确认中。
          </Translate>
        ),
        icon: "spark",
      },
      {
        key: "china-lca",
        title: (
          <Translate id="forum.agenda.special.chinaLca">
            中国的LCA
          </Translate>
        ),
        lead: (
          <Translate id="forum.agenda.special.chinaLca.lead">
            聚焦中国 LCA 方法体系、数据库建设与应用实践。
          </Translate>
        ),
        icon: "spark",
      },
    ],
  },
];

const dayLabels: Record<AgendaDayKey, AgendaText> = {
  day1: { zh: "3 月 25 日（Day 1）", en: "Mar 25 (Day 1)" },
  day2: { zh: "3 月 26 日（Day 2）", en: "Mar 26 (Day 2)" },
};

const timelineDayLabels: Record<AgendaDayKey, AgendaText> = {
  day1: { zh: "3 月 25 日", en: "Mar 25" },
  day2: { zh: "3 月 26 日", en: "Mar 26" },
};

const timelineDayShortLabels: Record<AgendaDayKey, string> = {
  day1: "3.25",
  day2: "3.26",
};

const keynoteSpeakerPhotoBySessionId: Record<string, string> = {
  "mf-d2-keynote-llorenc": "img/tg-forum/people/LlorencM-unep.jpg",
  "mf-d2-keynote-xu": "img/tg-forum/people/MingX-thu.jpg",
  "mf-d2-keynote-finkbeiner": "img/tg-forum/people/MatthiasF-tub.jpg",
  "mf-d2-keynote-hamelin": "img/tg-forum/people/LorieH-inrae.jpg",
  "mf-d2-keynote-mieras": "img/tg-forum/people/EricMieras-1clicklca-pre.jpg",
  "mf-d2-keynote-naama": "img/tg-forum/people/NaamaA-wbcsd.jpg",
};

export const edition2026: ForumEdition = {
  year: 2026,
  phase: "closed",
  pageTitle: {
    zh: "天工论坛 2026（会议存档）",
    en: "TianGong Forum 2026 (Archive)",
  },
  pageDescription: {
    zh: "天工论坛 2026 会议存档：完整议程、参会嘉宾与会议信息。",
    en: "Archive of TianGong Forum 2026: full agenda, featured guests and event information.",
  },
  hero: {
    title: { zh: "天工论坛 · 2026", en: "TianGong Forum · 2026" },
    theme: {
      zh: "全球互联、互通、互信的 LCA 与碳足迹体系",
      en: "Global Interconnection, Interoperability, and Mutual Trust for LCA and Carbon Footprint Systems",
    },
    date: {
      zh: "2026 年 3 月 24 - 26 日  江苏 · 南京",
      en: "March 24-26, 2026 · Nanjing, Jiangsu, China",
    },
    image: "img/tg-forum/kv.jpg",
  },
  venue: {
    name: { zh: "南京紫金山庄", en: "The Purple Palace" },
    address: {
      zh: "中国江苏南京环陵路18号",
      en: "No. 18 Huanling Road, Nanjing, Jiangsu, China",
    },
    googleMaps:
      "https://www.google.com/maps/place/Purple+Palace+Nanjing/@32.0775585,118.8739961,17z/data=!3m1!4b1!4m9!3m8!1s0x35b58c90bd752e9d:0xe4f90392f0b75149!5m2!4m1!1i2!8m2!3d32.077554!4d118.876571!16s%2Fg%2F1tc_c96s!5m1!1e4?authuser=0&entry=ttu&g_ep=EgoyMDI2MDEyNi4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D",
    baiduMaps:
      "https://maps.baidu.com/poi/%E5%8D%97%E4%BA%AC%E7%B4%AB%E9%87%91%E5%B1%B1%E5%BA%84/@13234200.503662258,3751003.1576246065,17.13z?uid=3e63684910aadee888b9881c&ugc_type=3&ugc_ver=1&device_ratio=2&compat=1&routetype=drive&sn_xy=12950335,4840853&en_uid=3e63684910aadee888b9881c&pcevaname=pc4.1&querytype=detailConInfo&da_src=shareurl",
    image: "img/tg-forum/venue.jpg",
  },
  registration: {
    online: "\u00a51,500",
    onsite: "\u00a52,500",
    notes: [
      {
        member: true,
        text: {
          zh: "联盟会员单位各有 1 个免费参会席位。",
          en: "Each alliance member organization is entitled to one complimentary conference seat.",
        },
      },
      {
        text: {
          zh: "会议注册费用仅用于会议场地租赁、会务组织、资料制作及相关运行保障等支出。",
          en: "Registration fees are used only for venue rental, event operations, material production, and related running costs.",
        },
      },
      {
        text: {
          zh: "报名渠道和支付方式请见会议通知。",
          en: "Please refer to the conference notice for registration channels and payment methods.",
        },
      },
    ],
  },
  highlights,
  people,
  devConfLogos,
  organizerLogos,
  supportInstitutionLogos,
  agendaGroups,
  dayLabels,
  timelineDayLabels,
  timelineDayShortLabels,
  keynoteSpeakerPhotoBySessionId,
  masterAgendaSlots,
  activityAgendaDetails,
  revisions: [],
};
