import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Layout from "@theme/Layout";
import Translate, { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import clsx from "clsx";

import {
  activityAgendaDetails,
  agendaTrackOrder,
  masterAgendaSlots,
  type AgendaDayKey,
  type AgendaStatus,
  type AgendaText,
  type AgendaTrackKey,
  type ActivityAgendaDetail,
  type ActivitySession,
  type MasterAgendaSlot,
} from "../data/forumAgenda";
import styles from "./forum.module.css";

const icons = {
  assembly: (
    <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
      <path
        d="M12 4.5 15.5 7h3.5a1 1 0 0 1 1 1v7.5h-2V9.5h-3L12 11l-3-1.5H6.5v6.5h-2V8a1 1 0 0 1 1-1H9.5L13 4.5h-1Z"
        fill="currentColor"
      />
      <path
        d="M8 18h8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  developer: (
    <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
      <path
        d="M8.5 7.5 4.5 12l4 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m15.5 7.5 4 4.5-4 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m13.5 6.5-3 11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  forum: (
    <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
      <path
        d="M6 6h12c.6 0 1 .4 1 1v6c0 .6-.4 1-1 1H9.4c-.3 0-.6.1-.8.3L6 16.5V7c0-.6.4-1 1-1Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M8 11h9"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M8 8.5h5.5"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  spark: (
    <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
      <path
        d="M12 3.5 13.3 9H19l-4.6 3.3L15.6 18 12 14.7 8.4 18l1.2-5.7L5 9h5.7L12 3.5Z"
        fill="currentColor"
      />
    </svg>
  ),
  collaboration: (
    <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
      <path
        d="M12 12.5c1.9 0 3.5-1.6 3.5-3.5S13.9 5.5 12 5.5 8.5 7.1 8.5 9s1.6 3.5 3.5 3.5Z"
        fill="currentColor"
      />
      <path
        d="M7.5 17.5c0-2 2-3.5 4.5-3.5s4.5 1.5 4.5 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M6 9.5h-2m1 2v-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M20 9.5h-2m1-2v4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  media: (
    <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
      <path
        d="M6 6h8a2 2 0 0 1 2 2v8H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path d="M10.5 14.5v-5l4 2.5-4 2.5Z" fill="#fff" />
      <path
        d="M18 9.5 21 8v8l-3-1.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  sponsor: (
    <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
      <path
        d="M7.5 10.5h9V18a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-7.5Z"
        fill="currentColor"
      />
      <path
        d="M7.5 10.5h9"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M12 5.5v5"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M9.5 5.5H12a2 2 0 0 0-2-2c-1 0-2 .7-2 1.7 0 .9.6 1.6 1.4 1.8Z"
        fill="currentColor"
      />
      <path
        d="M12 5.5h2.5c.8-.2 1.4-.9 1.4-1.8 0-1-.9-1.7-2-1.7a2 2 0 0 0-2 2Z"
        fill="currentColor"
      />
    </svg>
  ),
} as const;

type IconKey = keyof typeof icons;

type Session = {
  date: string;
  title: string;
  focus: string;
  tags?: string[];
  theme?: string;
  image?: string;
};

type AgendaItem = {
  key: string;
  title: ReactNode;
  lead: ReactNode;
  icon: IconKey;
  tags?: string[];
  hostLogo?: string;
  hostAlt?: string;
  hostLogoClassName?: string;
  wide?: boolean;
};

type AgendaGroup = {
  key: string;
  title: ReactNode;
  desc: ReactNode;
  count: string;
  items: AgendaItem[];
  wide?: boolean;
  layout?: "default" | "subForum" | "specialEvents";
  singleMode?: "panel";
};

const currentEdition = {
  title: translate({ id: "forum.currentEdition.title", message: "天工论坛 · 2026" }),
  theme: translate({
    id: "forum.currentEdition.theme",
    message: "全球互联、互通、互信的 LCA 与碳足迹体系",
  }),
  date: translate({
    id: "forum.currentEdition.date",
    message: "2026 年 3 月 24 - 26 日  江苏 · 南京",
  }),
};

const coopItems: { title: ReactNode; desc: ReactNode; icon: IconKey }[] = [
  {
    title: <Translate id="forum.coop.hosting.title">参加分论坛</Translate>,
    desc: (
      <Translate id="forum.coop.hosting.desc">
        作为报告人或圆桌嘉宾参与分论坛。
      </Translate>
    ),
    icon: "forum",
  },
  {
    title: <Translate id="forum.coop.specialEvents.title">专题活动</Translate>,
    desc: (
      <Translate id="forum.coop.specialEvents.desc">
        闭门圆桌、标准与指南研讨等定制化交流。
      </Translate>
    ),
    icon: "spark",
  },
  {
    title: <Translate id="forum.coop.sponsorship.title">赞助合作</Translate>,
    desc: (
      <Translate id="forum.coop.sponsorship.desc">
        多层级品牌展示、致辞报告与媒体传播权益。
      </Translate>
    ),
    icon: "sponsor",
  },
  {
    title: <Translate id="forum.coop.media.title">媒体与传播</Translate>,
    desc: (
      <Translate id="forum.coop.media.desc">
        宣传矩阵共建，渠道与资源共享。
      </Translate>
    ),
    icon: "media",
  },
];

const highlights: Session[] = [
  {
    date: translate({ id: "forum.highlights.2025.date", message: "2025 · 第二届" }),
    title: translate({
      id: "forum.highlights.2025.title",
      message: "发起成立“碳足迹产业技术创新联盟”",
    }),
    focus: translate({
      id: "forum.highlights.2025.focus",
      message: "2025 年 1 月 · 北京",
    }),
    tags: [
      translate({ id: "forum.highlights.2025.tag.allianceLaunch", message: "联盟发布" }),
      translate({ id: "forum.highlights.2025.tag.industryCoBuild", message: "产业共建" }),
    ],
    theme: translate({
      id: "forum.highlights.2025.theme",
      message: "政产学研全面协同，共建产品碳足迹管理体系",
    }),
    image: require("@site/static/img/tg-forum/past/tg-forum-2nd.png").default,
  },
  {
    date: translate({ id: "forum.highlights.2023.date", message: "2023 · 第一届" }),
    title: translate({
      id: "forum.highlights.2023.title",
      message: "发布开放、透明的“天工数据库”",
    }),
    focus: translate({
      id: "forum.highlights.2023.focus",
      message: "2023 年 11 月 · 北京",
    }),
    tags: [
      translate({ id: "forum.highlights.2023.tag.database", message: "数据库" }),
      translate({ id: "forum.highlights.2023.tag.openTransparent", message: "开放透明" }),
    ],
    theme: translate({
      id: "forum.highlights.2023.theme",
      message: "发起 LCA 数据开放共享与协同治理联合研究计划",
    }),
    image: require("@site/static/img/tg-forum/past/tg-forum-1st.png").default,
  },
];

const people: {
  key: string;
  nameEn: string;
  nameZh: string;
  titleZh: ReactNode;
  titleEn: ReactNode;
  image?: string;
}[] = [
  {
    key: "tiago-braga",
    nameEn: "Tiago Braga",
    nameZh: "Tiago Braga",
    titleZh: <>巴西科学与技术信息研究所（Ibict）所长</>,
    titleEn: (
      <>
        Director of the Brazilian Institute of Information in Science and Technology (Ibict)
      </>
    ),
    image: "img/tg-forum/people/TiagoB-ibict.JPG",
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
    key: "natasha-das",
    nameEn: "Natasha Das",
    nameZh: "Natasha Das",
    titleZh: <>AECOM 高级碳咨询顾问</>,
    titleEn: <>Senior Carbon Consultant, AECOM</>,
    image: "img/tg-forum/people/NatashaD-AECOM.jpg",
  },
  {
    key: "archana-datta",
    nameEn: "Archana Datta",
    nameZh: "Archana Datta",
    titleZh: <>UNEP LCI 项目管理官员</>,
    titleEn: <>Programme Management Officer, UNEP Life Cycle Initiative</>,
    image: "img/tg-forum/people/ArchanaD-unep.jpg",
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
    image: "img/tg-forum/people/MoL-watershed.png",
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
    titleZh: <>One Click LCA 首席创新官；PRé 总经理<br />（SimaPro）</>,
    titleEn: <>Chief Innovation Officer at One Click LCA & Managing Director at PRé</>,
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

const peopleNameCollator = new Intl.Collator("en", { sensitivity: "base" });
const getSurname = (name: string) => {
  const nameParts = name.trim().split(/\s+/);
  return nameParts[nameParts.length - 1] ?? "";
};

const peopleSorted = [...people].sort((left, right) => {
  const surnameCompare = peopleNameCollator.compare(getSurname(left.nameEn), getSurname(right.nameEn));
  if (surnameCompare !== 0) return surnameCompare;
  return peopleNameCollator.compare(left.nameEn, right.nameEn);
});

const devConfLogos: { key: string; name: string; src?: string }[] = [
  {
    key: "carbonminds",
    name: "Carbon Minds",
    src: "img/tg-forum/orgnizations/lca_dev_conf/carbonminds.png",
  },
  {
    key: "cornerstone",
    name: "Cornerstone",
    src: "img/tg-forum/orgnizations/lca_dev_conf/cornerstone.png",
  },
  {
    key: "dds",
    name: "Départ de Sentier",
    src: "img/tg-forum/orgnizations/lca_dev_conf/dds.png",
  },
  {
    key: "envision",
    name: "Univers",
    src: "img/tg-forum/orgnizations/lca_dev_conf/univers.png",
  },
  {
    key: "greendelta",
    name: "GreenDelta",
    src: "img/tg-forum/orgnizations/lca_dev_conf/greendelta.png",
  },
  {
    key: "hiq",
    name: "HiQ",
    src: "img/tg-forum/orgnizations/lca_dev_conf/hiq.png",
  },
  {
    key: "minviro",
    name: "Minviro",
    src: "img/tg-forum/orgnizations/lca_dev_conf/minviro.png",
  },
  {
    key: "pre",
    name: "PRé",
    src: "img/tg-forum/orgnizations/lca_dev_conf/pre.png",
  },
  {
    key: "tiangong",
    name: "TianGong",
    src: "img/tg-forum/orgnizations/lca_dev_conf/tiangong.png",
  },
  {
    key: "watershed",
    name: "Watershed",
    src: "img/tg-forum/orgnizations/lca_dev_conf/watershed.png",
  },
];

const devConfLogoByKey = new Map(devConfLogos.map((logo) => [logo.key, logo]));

const organizerLogos: { key: string; name: string; src: string }[] = [
  {
    key: "cfa",
    name: "CFA",
    src: "img/tg-forum/orgnizations/events/cfa.png",
  },
  {
    key: "cses",
    name: "CSES",
    src: "img/tg-forum/partner-logo/cses.png",
  },
];

const supportInstitutionLogos: {
  key: string;
  name: string;
  src: string;
  href?: string;
}[] = [
  {
    key: "cnest",
    name: "CNEST",
    src: "img/tg-forum/partner-logo/CNEST.png",
  },
  {
    key: "dcv",
    name: "国际数碳谷",
    src: "img/tg-forum/partner-logo/dcv.png",
  },
  {
    key: "ef-china",
    name: "能源基金会",
    src: "img/tg-forum/partner-logo/EF_China.png",
  },
  {
    key: "ijmcccn",
    name: "ijmcccn",
    src: "img/tg-forum/partner-logo/ijmcccn.png",
    href: "https://jointmission.lib.tsinghua.edu.cn/",
  },
];

const agendaGroups: AgendaGroup[] = [
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
        title: <Translate id="forum.agenda.subForums.petroleum">石油化工</Translate>,
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
          <Translate id="forum.agenda.subForums.audit">数据</Translate>
        ),
        lead: (
          <Translate id="forum.agenda.subForums.audit.lead">
            汇聚全球 LCA 与碳足迹数据实践，探讨数据质量等关键议题。
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
    count: "3",
    layout: "specialEvents",
    items: [
      {
        key: "general-assembly",
        title: (
          <Translate id="forum.agenda.special.assembly">联盟全体会员大会</Translate>
        ),
        lead: (
          <Translate id="forum.agenda.special.assembly.lead">
            总结年度工作，发布年度计划与阶段性成果。
          </Translate>
        ),
        icon: "assembly",
        tags: [translate({ id: "forum.agenda.tag.special", message: "专项活动" })],
        hostLogo: "img/tg-forum/orgnizations/events/cfa.png",
        hostAlt: translate({
          id: "forum.eventHost.cfa",
          message: "碳足迹产业技术创新联盟（CFA）",
        }),
      },
      {
        key: "unep-workshop",
        title: (
          <Translate id="forum.agenda.special.unep">
            UNEP 全球 LCA 平台研讨会
          </Translate>
        ),
        lead: (
          <Translate id="forum.agenda.special.unep.lead">
            UNEP 牵头建设的全球 LCA 平台专项工作组会议。
          </Translate>
        ),
        icon: "spark",
        hostLogo: "img/tg-forum/orgnizations/events/unep_lci.png",
        hostAlt: translate({
          id: "forum.eventHost.unep",
          message: "UNEP 生命周期倡议",
        }),
        hostLogoClassName: styles.eventHostLogoWidePad,
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
    ],
  },
];

type MasterAgendaTimelineRow = {
  key: string;
  day: AgendaDayKey;
  start: string;
  end: string;
  activeSlots: MasterAgendaSlot[];
};

type MasterAgendaCalendarPlacement = {
  slot: MasterAgendaSlot;
  laneIndex: number;
  rowStart: number;
  rowSpan: number;
};

type MasterAgendaCalendarCluster = {
  key: string;
  day: AgendaDayKey;
  startMinutes: number;
  endMinutes: number;
  halfHourRows: number;
  placements: MasterAgendaCalendarPlacement[];
  laneCount: number;
};

type MasterAgendaCalendarDay = {
  key: string;
  day: AgendaDayKey;
  clusters: MasterAgendaCalendarCluster[];
};

const agendaDayOrder: AgendaDayKey[] = ["day1", "day2"];

const dayLabels: Record<AgendaDayKey, AgendaText> = {
  day1: { zh: "3 月 25 日（Day 1）", en: "Mar 25 (Day 1)" },
  day2: { zh: "3 月 26 日（Day 2）", en: "Mar 26 (Day 2)" },
};

const timelineDayLabels: Record<AgendaDayKey, AgendaText> = {
  day1: { zh: "3 月 25 日（周三）", en: "Mar 25 (Wed)" },
  day2: { zh: "3 月 26 日（周四）", en: "Mar 26 (Thu)" },
};

const trackLabels: Record<AgendaTrackKey, AgendaText> = {
  main: { zh: "主论坛", en: "Main Forum" },
  subforums: { zh: "分论坛", en: "Sub-forums" },
  special: { zh: "专项活动", en: "Special Events" },
  developer: { zh: "开发者大会", en: "Developer" },
};

const keynoteSpeakerPhotoBySessionId: Record<string, string> = {
  "mf-d2-keynote-he": "img/tg-forum/people/KebinH-thu.png",
  "mf-d2-keynote-llorenc": "img/tg-forum/people/LlorencM-unep.jpg",
  "mf-d2-keynote-xu": "img/tg-forum/people/MingX-thu.jpg",
  "mf-d2-keynote-finkbeiner": "img/tg-forum/people/MatthiasF-tub.jpg",
  "mf-d2-keynote-hamelin": "img/tg-forum/people/LorieH-inrae.jpg",
  "mf-d2-keynote-mieras": "img/tg-forum/people/EricMieras-1clicklca-pre.jpg",
  "mf-d2-keynote-naama": "img/tg-forum/people/NaamaA-wbcsd.jpg",
};

function getAgendaText(text: AgendaText | undefined, isZh: boolean): string {
  if (!text) {
    return "";
  }
  return isZh ? text.zh : (text.en ?? text.zh);
}

function getCompactTimeRangeLabel(timeRange: string | undefined): string {
  if (!timeRange) {
    return "";
  }
  return timeRange.replace(/^Day\s*\d+\s*/i, "").trim();
}

function getDayNumberFromTimeRange(timeRange: string | undefined): number | undefined {
  if (!timeRange) {
    return undefined;
  }
  const match = timeRange.match(/\bDay\s*(\d+)\b/i);
  if (!match) {
    return undefined;
  }
  const value = Number(match[1]);
  return Number.isFinite(value) ? value : undefined;
}

function getDateLabelWithDaySuffix(
  dateLabel: AgendaText | undefined,
  timeRange: string | undefined,
  isZh: boolean
): string {
  const base = getAgendaText(dateLabel, isZh);
  if (!base) {
    return "";
  }

  const dayNumber = getDayNumberFromTimeRange(timeRange);
  if (!dayNumber) {
    return base;
  }

  if (isZh) {
    if (/第\s*\d+\s*天/.test(base)) {
      return base;
    }
    return `${base}（第 ${dayNumber} 天）`;
  }

  if (/\bDay\s*\d+\b/i.test(base)) {
    return base;
  }
  return `${base} (Day ${dayNumber})`;
}

function parseTimeToMinutes(time: string): number {
  const [hour, minute] = time.split(":").map((part) => Number(part));
  return hour * 60 + minute;
}

function sortSessions(a: ActivitySession, b: ActivitySession): number {
  const aHasTime = Boolean(a.start && a.end);
  const bHasTime = Boolean(b.start && b.end);

  if (!aHasTime || !bHasTime) {
    if (aHasTime && !bHasTime) {
      return -1;
    }
    if (!aHasTime && bHasTime) {
      return 1;
    }
    return 0;
  }

  return (
    parseTimeToMinutes(a.start as string) - parseTimeToMinutes(b.start as string) ||
    parseTimeToMinutes(a.end as string) - parseTimeToMinutes(b.end as string) ||
    a.id.localeCompare(b.id)
  );
}

function groupSlotsForTimeline(slots: MasterAgendaSlot[]): MasterAgendaTimelineRow[] {
  const trackIndexMap = new Map(agendaTrackOrder.map((track, index) => [track, index]));
  const dayIndexMap = new Map(agendaDayOrder.map((day, index) => [day, index]));
  const slotOrderMap = new Map(slots.map((slot, index) => [slot.id, index]));
  const slotsByDay = new Map<AgendaDayKey, MasterAgendaSlot[]>();

  slots.forEach((slot) => {
    const daySlots = slotsByDay.get(slot.day);
    if (daySlots) {
      daySlots.push(slot);
      return;
    }
    slotsByDay.set(slot.day, [slot]);
  });

  const rows: MasterAgendaTimelineRow[] = [];

  agendaDayOrder.forEach((day) => {
    const daySlots = slotsByDay.get(day);
    if (!daySlots || daySlots.length === 0) {
      return;
    }

    const boundarySet = new Set<string>();
    let crossesNoon = false;

    daySlots.forEach((slot) => {
      boundarySet.add(slot.start);
      boundarySet.add(slot.end);

      if (
        parseTimeToMinutes(slot.start) < 12 * 60 &&
        parseTimeToMinutes(slot.end) > 12 * 60
      ) {
        crossesNoon = true;
      }
    });

    if (crossesNoon) {
      boundarySet.add("12:00");
    }

    const boundaries = Array.from(boundarySet).sort(
      (a, b) => parseTimeToMinutes(a) - parseTimeToMinutes(b)
    );

    for (let index = 0; index < boundaries.length - 1; index += 1) {
      const start = boundaries[index];
      const end = boundaries[index + 1];
      const rowStartMinutes = parseTimeToMinutes(start);
      const rowEndMinutes = parseTimeToMinutes(end);

      if (rowStartMinutes >= rowEndMinutes) {
        continue;
      }

      const activeSlots = daySlots
        .filter((slot) => {
          const slotStartMinutes = parseTimeToMinutes(slot.start);
          const slotEndMinutes = parseTimeToMinutes(slot.end);
          return slotStartMinutes < rowEndMinutes && slotEndMinutes > rowStartMinutes;
        })
        .sort((a, b) => {
          return (
            (trackIndexMap.get(a.track) ?? 99) - (trackIndexMap.get(b.track) ?? 99) ||
            (slotOrderMap.get(a.id) ?? 999) - (slotOrderMap.get(b.id) ?? 999) ||
            a.id.localeCompare(b.id)
          );
        });

      if (activeSlots.length === 0) {
        continue;
      }

      rows.push({
        key: `${day}-${start}-${end}`,
        day,
        start,
        end,
        activeSlots,
      });
    }
  });

  return rows.sort((a, b) => {
    return (
      (dayIndexMap.get(a.day) ?? 99) - (dayIndexMap.get(b.day) ?? 99) ||
      parseTimeToMinutes(a.start) - parseTimeToMinutes(b.start) ||
      parseTimeToMinutes(a.end) - parseTimeToMinutes(b.end)
    );
  });
}

function floorToHalfHour(minutes: number): number {
  return Math.floor(minutes / 30) * 30;
}

function ceilToHalfHour(minutes: number): number {
  return Math.ceil(minutes / 30) * 30;
}

function formatMinutesToTime(minutes: number): string {
  const hour = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const minute = (minutes % 60).toString().padStart(2, "0");
  return `${hour}:${minute}`;
}

function buildDayCalendarLayouts(slots: MasterAgendaSlot[]): MasterAgendaCalendarDay[] {
  const trackIndexMap = new Map(agendaTrackOrder.map((track, index) => [track, index]));
  const slotOrderMap = new Map(slots.map((slot, index) => [slot.id, index]));
  const slotsByDay = new Map<AgendaDayKey, MasterAgendaSlot[]>();

  slots.forEach((slot) => {
    const daySlots = slotsByDay.get(slot.day);
    if (daySlots) {
      daySlots.push(slot);
      return;
    }
    slotsByDay.set(slot.day, [slot]);
  });

  return agendaDayOrder.flatMap((day) => {
    const daySlots = slotsByDay.get(day);
    if (!daySlots || daySlots.length === 0) {
      return [];
    }

    const sortedSlots = [...daySlots].sort((a, b) => {
      return (
        parseTimeToMinutes(a.start) - parseTimeToMinutes(b.start) ||
        parseTimeToMinutes(a.end) - parseTimeToMinutes(b.end) ||
        (trackIndexMap.get(a.track) ?? 99) - (trackIndexMap.get(b.track) ?? 99) ||
        (slotOrderMap.get(a.id) ?? 999) - (slotOrderMap.get(b.id) ?? 999) ||
        a.id.localeCompare(b.id)
      );
    });

    const clusters: MasterAgendaSlot[][] = [];
    let currentCluster: MasterAgendaSlot[] = [];
    let currentClusterEndMinutes = -1;

    sortedSlots.forEach((slot) => {
      const slotStartMinutes = parseTimeToMinutes(slot.start);
      const slotEndMinutes = parseTimeToMinutes(slot.end);

      if (currentCluster.length === 0) {
        currentCluster = [slot];
        currentClusterEndMinutes = slotEndMinutes;
        return;
      }

      if (slotStartMinutes > currentClusterEndMinutes) {
        clusters.push(currentCluster);
        currentCluster = [slot];
        currentClusterEndMinutes = slotEndMinutes;
        return;
      }

      currentCluster.push(slot);
      currentClusterEndMinutes = Math.max(currentClusterEndMinutes, slotEndMinutes);
    });

    if (currentCluster.length > 0) {
      clusters.push(currentCluster);
    }

    const layoutClusters = clusters.map((clusterSlots, clusterIndex) => {
      const clusterStartMinutes = floorToHalfHour(
        Math.min(...clusterSlots.map((slot) => parseTimeToMinutes(slot.start)))
      );
      const clusterEndMinutes = ceilToHalfHour(
        Math.max(...clusterSlots.map((slot) => parseTimeToMinutes(slot.end)))
      );
      const laneEndMinutes: number[] = [];
      const placements: MasterAgendaCalendarPlacement[] = [];

      clusterSlots.forEach((slot) => {
        const slotStartMinutes = parseTimeToMinutes(slot.start);
        const slotEndMinutes = parseTimeToMinutes(slot.end);
        let laneIndex = laneEndMinutes.findIndex((endMinutes) => endMinutes <= slotStartMinutes);

        if (laneIndex < 0) {
          laneIndex = laneEndMinutes.length;
          laneEndMinutes.push(slotEndMinutes);
        } else {
          laneEndMinutes[laneIndex] = slotEndMinutes;
        }

        const rowStart = Math.max(
          0,
          Math.floor((slotStartMinutes - clusterStartMinutes) / 30)
        );
        const rowEnd = Math.max(
          rowStart + 1,
          Math.ceil((slotEndMinutes - clusterStartMinutes) / 30)
        );

        placements.push({
          slot,
          laneIndex,
          rowStart,
          rowSpan: rowEnd - rowStart,
        });
      });

      return {
        key: `${day}-cluster-${clusterIndex}-${formatMinutesToTime(clusterStartMinutes)}-${formatMinutesToTime(clusterEndMinutes)}`,
        day,
        startMinutes: clusterStartMinutes,
        endMinutes: clusterEndMinutes,
        halfHourRows: Math.max(1, (clusterEndMinutes - clusterStartMinutes) / 30),
        placements,
        laneCount: Math.max(1, laneEndMinutes.length),
      } satisfies MasterAgendaCalendarCluster;
    });

    return [
      {
        key: `calendar-${day}`,
        day,
        clusters: layoutClusters,
      } satisfies MasterAgendaCalendarDay,
    ];
  });
}

export default function Forum(): ReactNode {
  const { i18n } = useDocusaurusContext();
  const isZh = i18n.currentLocale.startsWith("zh");
  const heroImage = useBaseUrl("img/tg-forum/kv.jpg");
  const venueImage = useBaseUrl("img/tg-forum/venue.png");
  const [expandedActivityKeys, setExpandedActivityKeys] = useState<string[]>([
    "main-forum",
    "developer-conference",
  ]);
  const [highlightedActivityKey, setHighlightedActivityKey] = useState<string | null>(null);
  const activityPanelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const highlightTimeoutRef = useRef<number | null>(null);

  const activityDetailsByKey = Object.fromEntries(
    activityAgendaDetails.map((detail) => [detail.activityKey, detail])
  ) as Record<string, ActivityAgendaDetail>;

  const getActivityDetailByKey = (activityKey: string): ActivityAgendaDetail | undefined => {
    return activityDetailsByKey[activityKey];
  };

  const getDayLabel = (day: AgendaDayKey): string => getAgendaText(dayLabels[day], isZh);
  const getTrackLabel = (track: AgendaTrackKey): string => getAgendaText(trackLabels[track], isZh);

  const getMasterSlotClassName = (status: AgendaStatus): string => {
    if (status === "published") return styles.masterSlotPublished;
    if (status === "updating") return styles.masterSlotUpdating;
    return styles.masterSlotPending;
  };

  const getMasterTrackClassName = (track: AgendaTrackKey): string => {
    if (track === "main") return styles.masterTrackMain;
    if (track === "subforums") return styles.masterTrackSubforums;
    if (track === "special") return styles.masterTrackSpecial;
    return styles.masterTrackDeveloper;
  };

  const renderStatusPill = (_status: AgendaStatus, _className?: string): ReactNode => null;

  const setActivityPanelRef = (activityKey: string, node: HTMLDivElement | null): void => {
    activityPanelRefs.current[activityKey] = node;
  };

  const ensureExpanded = (activityKey: string): void => {
    setExpandedActivityKeys((prev) => {
      if (prev.includes(activityKey)) {
        return prev;
      }
      return [...prev, activityKey];
    });
  };

  const toggleActivityExpanded = (activityKey: string): void => {
    setExpandedActivityKeys((prev) => {
      if (prev.includes(activityKey)) {
        return prev.filter((key) => key !== activityKey);
      }
      return [...prev, activityKey];
    });
  };

  const triggerPanelHighlight = (activityKey: string): void => {
    setHighlightedActivityKey(activityKey);

    if (typeof window !== "undefined") {
      if (highlightTimeoutRef.current !== null) {
        window.clearTimeout(highlightTimeoutRef.current);
      }
      highlightTimeoutRef.current = window.setTimeout(() => {
        setHighlightedActivityKey((current) => (current === activityKey ? null : current));
      }, 1800);
    }
  };

  const openAndScrollToActivity = (
    activityKey: string,
    options?: { smooth?: boolean; updateHash?: boolean }
  ): void => {
    if (!getActivityDetailByKey(activityKey)) {
      return;
    }

    ensureExpanded(activityKey);
    triggerPanelHighlight(activityKey);

    if (typeof window !== "undefined" && options?.updateHash !== false) {
      const hash = `#agenda-${activityKey}`;
      if (window.history?.replaceState) {
        window.history.replaceState(null, "", hash);
      } else {
        window.location.hash = hash;
      }
    }

    if (typeof window !== "undefined") {
      window.requestAnimationFrame(() => {
        activityPanelRefs.current[activityKey]?.scrollIntoView({
          behavior: options?.smooth === false ? "auto" : "smooth",
          block: "start",
        });
      });
    }
  };

  const renderAgendaSubsectionHeader = (
    title: ReactNode,
    desc?: ReactNode
  ): ReactNode => (
    <div className={styles.agendaSubsectionHeader}>
      <div className={styles.agendaSubsectionTitle}>{title}</div>
      {desc && <div className={styles.agendaSubsectionDesc}>{desc}</div>}
    </div>
  );

  const renderTalkTitle = (talkTitle: ActivitySession["talkTitle"]): ReactNode => {
    if (!talkTitle) {
      return null;
    }

    const zhTitle = talkTitle.zh?.trim();
    const enTitle = talkTitle.en?.trim();
    const hasDistinctEnTitle = Boolean(enTitle && enTitle !== zhTitle);
    const enOnlyTitle = enTitle ?? zhTitle;

    if (!isZh) {
      return enOnlyTitle ? (
        <div className={styles.agendaTalkTitle}>
          <div className={styles.agendaTalkTitleEn}>{enOnlyTitle}</div>
        </div>
      ) : null;
    }

    return (
      <div className={styles.agendaTalkTitle}>
        {zhTitle && <div className={styles.agendaTalkTitleZh}>{zhTitle}</div>}
        {hasDistinctEnTitle && <div className={styles.agendaTalkTitleEn}>{enTitle}</div>}
      </div>
    );
  };

  const isHostOrModeratorLabel = (label: string): boolean => {
    const normalized = label.trim().toLowerCase();
    return /主持人?/.test(label) || normalized.startsWith("host") || normalized.startsWith("moderator");
  };

  const renderPersonNameWithBold = (value: string): ReactNode => {
    const text = value.trim();
    if (!text) {
      return "";
    }

    const separatorIndex = text.search(/[，,]/);
    if (separatorIndex < 0) {
      return <strong>{text}</strong>;
    }

    const namePart = text.slice(0, separatorIndex).trim();
    const tailPart = text.slice(separatorIndex);
    if (!namePart) {
      return text;
    }

    return (
      <>
        <strong>{namePart}</strong>
        {tailPart}
      </>
    );
  };

  const renderSummaryLeadBlock = (summaryLead: AgendaText | undefined): ReactNode => {
    if (!summaryLead) {
      return null;
    }

    const text = getAgendaText(summaryLead, isZh).trim();
    if (!text) {
      return null;
    }
    const labelSuffix = isZh ? "：" : ":";

    const lines = text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines.length === 0) {
      return null;
    }

    if (lines.length === 1) {
      const inlineMatch = lines[0].match(/^([^：:]+)[：:]\s*(.+)$/);
      if (inlineMatch) {
        const [, inlineLabel, inlineValue] = inlineMatch;
        const highlightName = isHostOrModeratorLabel(inlineLabel);
        return (
          <div
            className={clsx(
              styles.agendaPanelSummary,
              styles.agendaPanelSummaryLead,
              styles.agendaPanelSummaryLeadInline
            )}
          >
            <span className={styles.agendaPanelSummaryLeadLabel}>
              {inlineLabel}
              {labelSuffix}
            </span>
            <span>{highlightName ? renderPersonNameWithBold(inlineValue) : inlineValue}</span>
          </div>
        );
      }
    }

    const [labelLine, ...items] = lines;
    const label = labelLine.replace(/[：:]$/, "");
    const highlightName = isHostOrModeratorLabel(label);

    if (items.length <= 1) {
      return (
        <div
          className={clsx(
            styles.agendaPanelSummary,
            styles.agendaPanelSummaryLead,
            styles.agendaPanelSummaryLeadInline
          )}
        >
          <span className={styles.agendaPanelSummaryLeadLabel}>
            {label}
            {labelSuffix}
          </span>
          {items[0] && (
            <span>{highlightName ? renderPersonNameWithBold(items[0]) : items[0]}</span>
          )}
        </div>
      );
    }

    return (
      <div className={clsx(styles.agendaPanelSummary, styles.agendaPanelSummaryLead)}>
        <div className={styles.agendaPanelSummaryLeadHead}>
          <span className={styles.agendaPanelSummaryLeadLabel}>
            {label}
            {labelSuffix}
          </span>
        </div>
        <ul className={styles.agendaPanelSummaryLeadList}>
          {items.map((item) => (
            <li key={item} className={styles.agendaPanelSummaryLeadItem}>
              {highlightName ? renderPersonNameWithBold(item) : item}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderDeveloperConferenceAgendaList = (sessions: ActivitySession[]): ReactNode => (
    <div className={styles.devAgendaList}>
      {sessions.map((session) => {
        const logo = session.orgLogoKey ? devConfLogoByKey.get(session.orgLogoKey) : undefined;
        const logoLabel =
          session.sessionType
            ? getAgendaText(session.sessionType, isZh)
            : getAgendaText(session.title, isZh).slice(0, 8);

        return (
          <div key={session.id} className={styles.devAgendaCard}>
            <div className={styles.devAgendaCardBody}>
              <div
                className={styles.devAgendaLogoSlot}
                aria-hidden="true"
              >
                {logo?.src ? (
                  <div className={styles.devAgendaLogoCanvas}>
                    <img
                      className={styles.devAgendaLogoMark}
                      src={logo.src}
                      alt={logo.name}
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <span className={styles.devAgendaLogoFallback}>
                    {logoLabel || (isZh ? "环节" : "Session")}
                  </span>
                )}
              </div>

              <div className={styles.devAgendaCardContent}>
                <div className={clsx(styles.agendaTitle, styles.devAgendaCardUnit)}>
                  {getAgendaText(session.title, isZh)}
                </div>
                {session.speakers && (
                  <div className={styles.devAgendaCardName}>
                    {getAgendaText(session.speakers, isZh)}
                  </div>
                )}
                {session.note && (
                  <div className={clsx(styles.agendaNote, styles.devAgendaCardRole, styles.devAgendaCardNote)}>
                    {getAgendaText(session.note, isZh)}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderDeveloperConferencePhaseList = (sessions: ActivitySession[]): ReactNode => {
    const reportSessions = sessions
      .filter((session) => session.sessionType?.zh === "报告" || session.sessionType?.en === "Talk")
      .sort((a, b) => {
        const aPinned = a.orgLogoKey === "tiangong" ? 0 : 1;
        const bPinned = b.orgLogoKey === "tiangong" ? 0 : 1;

        return (
          aPinned - bPinned ||
          (a.title.en ?? a.title.zh).localeCompare(b.title.en ?? b.title.zh, "en", {
            sensitivity: "base",
          })
        );
      });
    const openingSessions = sessions.filter((session) => session.id === "dev-opening");
    const panelSessions = sessions.filter((session) => session.id === "dev-panel");
    const networkingSessions = sessions.filter((session) => session.id === "dev-networking");

    const phases = [
      {
        key: "dev-phase-opening",
        title: isZh ? "开场" : "Opening",
        items: openingSessions,
        mode: "opening",
      },
      {
        key: "dev-phase-showcase",
        title: isZh ? "展示报告" : "Showcase Talks",
        items: reportSessions,
        mode: "cards",
      },
      {
        key: "dev-phase-panel",
        title: isZh ? "圆桌讨论" : "Panel Discussion",
        items: panelSessions,
        mode: "title-only",
      },
      {
        key: "dev-phase-networking",
        title: isZh ? "交流与自由讨论" : "Networking & Open Discussion",
        items: networkingSessions,
        mode: "title-only",
      },
    ] satisfies Array<{
      key: string;
      title: string;
      items: ActivitySession[];
      mode: "opening" | "cards" | "title-only";
    }>;

    return (
      <div className={styles.agendaPhaseList}>
        {phases.filter((phase) => phase.items.length > 0).map((phase) => (
          <div key={phase.key} className={styles.agendaPhase}>
            <div className={styles.agendaPhaseTitle}>{phase.title}</div>
            {phase.mode === "cards" && renderDeveloperConferenceAgendaList(phase.items)}
            {phase.mode === "opening" && phase.items[0]?.speakers && (
              <div className={styles.agendaPhaseLead}>
                {isZh ? "主持人：" : "Host: "}
                {renderPersonNameWithBold(getAgendaText(phase.items[0].speakers, isZh))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderMasterAgendaOverview = (): ReactNode => {
    const timelineRows = groupSlotsForTimeline(masterAgendaSlots);
    const calendarDays = buildDayCalendarLayouts(masterAgendaSlots);
    const dayLayoutMap = new Map(calendarDays.map((layout) => [layout.day, layout]));
    const boardStartMinutes = 8 * 60;
    const boardEndMinutes = 18 * 60;
    const prepRegistrationStartMinutes = 14 * 60;
    const boardHalfHourRows = Math.max(1, (boardEndMinutes - boardStartMinutes) / 30);
    const boardRowTemplate = `repeat(${boardHalfHourRows}, var(--forum-agenda-half-row-height, 2.75rem))`;
    const boardRowsStyle: CSSProperties = { gridTemplateRows: boardRowTemplate };
    const boardDayWidthStyle = {
      "--forum-agenda-day1-col": "0.8fr",
      "--forum-agenda-day2-col": "1.2fr",
    } as CSSProperties;
    const boardRowMarks = Array.from(
      { length: boardHalfHourRows },
      (_, index) => boardStartMinutes + index * 30
    );

    const getTimelineDayLabel = (day: AgendaDayKey): string => {
      return getAgendaText(timelineDayLabels[day], isZh);
    };
    const registrationDayLabel = isZh ? "3 月 24 日（周二）" : "Mar 24 (Tue)";
    const registrationLabel = isZh ? "注册" : "Registration";
    const prepRegistrationRowStart =
      Math.max(0, Math.floor((prepRegistrationStartMinutes - boardStartMinutes) / 30)) + 1;
    const prepRegistrationRowSpan = Math.max(
      1,
      boardHalfHourRows - (prepRegistrationRowStart - 1)
    );
    const stackedAxisColumn = "var(--forum-agenda-stacked-axis-col, 84px)";
    const stackedPrepColumn =
      "minmax(var(--forum-agenda-stacked-prep-col-min, 88px), var(--forum-agenda-stacked-prep-col-fr, 0.34fr))";
    const stackedDay1BoardColumns = `${stackedAxisColumn} ${stackedPrepColumn} minmax(0, 1fr)`;
    const stackedDay2BoardColumns = `${stackedAxisColumn} minmax(0, 1fr)`;
    const stackedDay1BoardStyle: CSSProperties = { gridTemplateColumns: stackedDay1BoardColumns };
    const stackedDay2BoardStyle: CSSProperties = { gridTemplateColumns: stackedDay2BoardColumns };

    const getPeriodLabel = (start: string): string => {
      return parseTimeToMinutes(start) < 12 * 60
        ? (isZh ? "上午" : "Morning")
        : (isZh ? "下午" : "Afternoon");
    };
    const timelineRowsByDay = agendaDayOrder.map((day) => ({
      day,
      rows: timelineRows.filter((row) => row.day === day),
    }));

    const renderBoardAxis = (keyPrefix: string): ReactNode => (
      <div key={`${keyPrefix}-axis`} className={styles.masterCalendarBoardAxis} style={boardRowsStyle}>
        {boardRowMarks.map((minutes, rowIndex) => {
          const isHourRow = minutes % 60 === 0;
          const isLastRow = rowIndex === boardRowMarks.length - 1;
          return (
            <div
              key={`${keyPrefix}-axis-${minutes}`}
              className={clsx(
                styles.masterCalendarBoardAxisCell,
                isHourRow && styles.masterCalendarBoardAxisCellHour
              )}
              style={{ gridRow: `${rowIndex + 1}` }}
            >
              {isHourRow && (
                <span
                  className={clsx(
                    styles.masterCalendarBoardAxisLabel,
                    styles.masterCalendarBoardAxisLabelTop
                  )}
                >
                  {formatMinutesToTime(minutes)}
                </span>
              )}
              {isLastRow && (
                <span
                  className={clsx(
                    styles.masterCalendarBoardAxisLabel,
                    styles.masterCalendarBoardAxisLabelBottom
                  )}
                >
                  {formatMinutesToTime(boardEndMinutes)}
                </span>
              )}
            </div>
          );
        })}
      </div>
    );

    const renderPrepRegistrationFrame = (keyPrefix: string): ReactNode => (
      <div
        key={`${keyPrefix}-prep-frame`}
        className={clsx(
          styles.masterCalendarBoardDayFrame,
          styles.masterCalendarBoardDayFramePrep
        )}
      >
        <div className={styles.masterCalendarBoardDayGrid} style={boardRowsStyle}>
          {boardRowMarks.map((minutes, rowIndex) => (
            <div
              key={`${keyPrefix}-prep-row-${minutes}`}
              className={clsx(
                styles.masterCalendarGridRow,
                styles.masterCalendarBoardRow,
                minutes % 60 === 0 && styles.masterCalendarGridRowHour
              )}
              style={{ gridColumn: "1", gridRow: `${rowIndex + 1}` }}
              aria-hidden="true"
            />
          ))}

          <div
            className={styles.masterCalendarPrepEvent}
            style={{
              gridColumn: "1",
              gridRow: `${prepRegistrationRowStart} / span ${prepRegistrationRowSpan}`,
            }}
          >
            <span
              className={clsx(
                styles.masterCalendarPrepEventLabel,
                styles.masterCalendarPrepEventLabelHorizontal
              )}
            >
              {registrationLabel}
            </span>
          </div>
        </div>
      </div>
    );

    const renderDayBoardFrame = (day: AgendaDayKey, keyPrefix: string): ReactNode => {
      const dayLayout = dayLayoutMap.get(day);
      const showDayRegistration = day === "day1" || day === "day2";

      return (
        <div key={`${keyPrefix}-col-${day}`} className={styles.masterCalendarBoardDayFrame}>
          <div className={styles.masterCalendarBoardDayGrid} style={boardRowsStyle}>
            {boardRowMarks.map((minutes, rowIndex) => (
              <div
                key={`${keyPrefix}-${day}-row-${minutes}`}
                className={clsx(
                  styles.masterCalendarGridRow,
                  styles.masterCalendarBoardRow,
                  minutes % 60 === 0 && styles.masterCalendarGridRowHour
                )}
                style={{ gridColumn: "1", gridRow: `${rowIndex + 1}` }}
                aria-hidden="true"
              />
            ))}

            {showDayRegistration && (
              <div
                className={clsx(
                  styles.masterCalendarPrepEvent,
                  styles.masterCalendarPrepEventDay
                )}
                style={{ gridColumn: "1", gridRow: "1 / span 2" }}
              >
                <span
                  className={clsx(
                    styles.masterCalendarPrepEventLabel,
                    styles.masterCalendarPrepEventLabelHorizontal
                  )}
                >
                  {registrationLabel}
                </span>
              </div>
            )}

            {dayLayout?.clusters.map((cluster) => {
              const clusterRowStart = Math.max(
                0,
                Math.floor((cluster.startMinutes - boardStartMinutes) / 30)
              );
              const clusterGridStyle: CSSProperties = {
                gridTemplateRows: `repeat(${cluster.halfHourRows}, var(--forum-agenda-half-row-height, 2.75rem))`,
                gridTemplateColumns: `repeat(${cluster.laneCount}, minmax(0, 1fr))`,
              };

              return (
                <div
                  key={`${keyPrefix}-${cluster.key}`}
                  className={styles.masterCalendarClusterLayer}
                  style={{
                    gridColumn: "1",
                    gridRow: `${clusterRowStart + 1} / span ${cluster.halfHourRows}`,
                  }}
                >
                  <div className={styles.masterCalendarClusterGrid} style={clusterGridStyle}>
                    {cluster.placements.map((placement) => {
                      return (
                        <div
                          key={`${keyPrefix}-${placement.slot.id}`}
                          className={clsx(
                            styles.masterCalendarEventShell
                          )}
                          style={{
                            gridColumn: `${placement.laneIndex + 1}`,
                            gridRow: `${placement.rowStart + 1} / span ${placement.rowSpan}`,
                          }}
                        >
                          <button
                            type="button"
                            className={clsx(
                              styles.masterTimelineItem,
                              styles.masterCalendarEvent,
                              styles.masterSlotClickable,
                              getMasterTrackClassName(placement.slot.track)
                            )}
                            onClick={() => openAndScrollToActivity(placement.slot.activityKey)}
                          >
                            <div className={styles.masterTimelineItemTop}>
                              <span className={styles.masterPeriodTrackTag}>
                                {getTrackLabel(placement.slot.track)}
                              </span>
                            </div>
                            <div className={styles.masterTimelineItemTitle}>
                              {getAgendaText(placement.slot.shortTitle, isZh)}
                            </div>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    };

    return (
      <div className={clsx(styles.agendaGroup, styles.agendaGroupWide, styles.masterAgenda)}>
        <div className={styles.masterCalendarDesktop} style={boardDayWidthStyle}>
          <div className={styles.masterCalendarBoardHeader}>
            <div className={styles.masterCalendarBoardHeaderAxis}>
              {isZh ? "时间" : "Time"}
            </div>
            <div
              className={clsx(
                styles.masterCalendarBoardHeaderDay,
                styles.masterCalendarBoardHeaderPrep
              )}
            >
              {registrationDayLabel}
            </div>
            {agendaDayOrder.map((day) => (
              <div key={`header-${day}`} className={styles.masterCalendarBoardHeaderDay}>
                {getTimelineDayLabel(day)}
              </div>
            ))}
          </div>

          <div className={styles.masterCalendarBoardBody}>
            {renderBoardAxis("desktop")}
            {renderPrepRegistrationFrame("desktop")}
            {agendaDayOrder.map((day) => renderDayBoardFrame(day, "desktop"))}
          </div>
        </div>

        <div className={styles.masterCalendarStackedMobile}>
          <div className={styles.masterCalendarStackedBoard}>
            <div className={styles.masterCalendarBoardHeader} style={stackedDay1BoardStyle}>
              <div className={styles.masterCalendarBoardHeaderAxis}>
                {isZh ? "时间" : "Time"}
              </div>
              <div
                className={clsx(
                  styles.masterCalendarBoardHeaderDay,
                  styles.masterCalendarBoardHeaderPrep
                )}
              >
                {registrationDayLabel}
              </div>
              <div className={styles.masterCalendarBoardHeaderDay}>
                {getTimelineDayLabel("day1")}
              </div>
            </div>
            <div className={styles.masterCalendarBoardBody} style={stackedDay1BoardStyle}>
              {renderBoardAxis("stacked-day1")}
              {renderPrepRegistrationFrame("stacked-day1")}
              {renderDayBoardFrame("day1", "stacked-day1")}
            </div>
          </div>

          <div className={styles.masterCalendarStackedBoard}>
            <div className={styles.masterCalendarBoardHeader} style={stackedDay2BoardStyle}>
              <div className={styles.masterCalendarBoardHeaderAxis}>
                {isZh ? "时间" : "Time"}
              </div>
              <div className={styles.masterCalendarBoardHeaderDay}>
                {getTimelineDayLabel("day2")}
              </div>
            </div>
            <div className={styles.masterCalendarBoardBody} style={stackedDay2BoardStyle}>
              {renderBoardAxis("stacked-day2")}
              {renderDayBoardFrame("day2", "stacked-day2")}
            </div>
          </div>
        </div>

        <div className={styles.masterTimelineMobile}>
          <div className={styles.masterDayTables}>
            {timelineRowsByDay.map(({ day, rows }) => (
              <section key={`day-table-${day}`} className={styles.masterDayTable}>
                <div className={styles.masterDayTableHeader}>
                  <div className={styles.masterDayTableTitle}>{getTimelineDayLabel(day)}</div>
                </div>

                <div className={styles.masterDayTableColumns} aria-hidden="true">
                  <div className={styles.masterDayTableColumnCell}>
                    {isZh ? "时间" : "Time"}
                  </div>
                  <div className={styles.masterDayTableColumnCell}>
                    {isZh ? "日程" : "Agenda"}
                  </div>
                </div>

                <div className={styles.masterDayTableBody}>
                  {rows.map((row) => (
                    <div key={row.key} className={styles.masterDayTableRow}>
                      <div className={styles.masterDayTableTimeCell}>
                        <div className={styles.masterDayTableTimePeriod}>
                          {getPeriodLabel(row.start)}
                        </div>
                        <div className={styles.masterDayTableTimeRange}>
                          {row.start} - {row.end}
                        </div>
                      </div>

                      <div className={styles.masterDayTableAgendaCell}>
                        <div
                          className={clsx(
                            styles.masterTimelineSlots,
                            row.activeSlots.length === 4 && styles.masterTimelineSlotsTwoByTwo
                          )}
                        >
                          {row.activeSlots.map((slot) => (
                            <button
                              key={slot.id}
                              type="button"
                              className={clsx(
                                styles.masterTimelineItem,
                                styles.masterDayTableSlot,
                                styles.masterSlotClickable,
                                getMasterSlotClassName(slot.status)
                              )}
                              onClick={() => openAndScrollToActivity(slot.activityKey)}
                            >
                              <div className={styles.masterTimelineItemTop}>
                                <span className={styles.masterPeriodTrackTag}>
                                  {getTrackLabel(slot.track)}
                                </span>
                              </div>
                              <div className={styles.masterTimelineItemTitle}>
                                {getAgendaText(slot.shortTitle, isZh)}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderActivityAgendaPanels = (): ReactNode => (
    <>
      {renderAgendaSubsectionHeader(
        <Translate id="forum.detailAgenda.title">活动详细议程</Translate>
      )}
      {agendaGroups.map((group) => {
        const groupItemOrder = new Map(group.items.map((item, index) => [item.key, index]));
        const groupDetails = activityAgendaDetails
          .filter((detail) => detail.groupKey === group.key)
          .sort((a, b) => {
            return (
              (groupItemOrder.get(a.activityKey) ?? 999) - (groupItemOrder.get(b.activityKey) ?? 999)
            );
          });
        const showGroupHeader = groupDetails.length > 1;
        const showGroupCount =
          group.key !== "sub-forums" && group.key !== "special-events";

        if (groupDetails.length === 0) {
          return null;
        }

        return (
          <div
            key={`detail-${group.key}`}
            className={clsx(styles.agendaGroup, group.wide && styles.agendaGroupWide)}
          >
            {showGroupHeader && (
              <div className={styles.agendaGroupHeader}>
                <div>
                  <div className={styles.groupTitle}>{group.title}</div>
                  <div className={styles.groupDesc}>
                    {isZh ? "按活动查看详细环节安排，议程将持续更新。" : "View detailed sessions by activity. The agenda is updated continuously."}
                  </div>
                </div>
                {showGroupCount && (
                  <span className={styles.groupCount}>
                    {groupDetails.length}
                    <Translate id="forum.section.sessions"> 场</Translate>
                  </span>
                )}
              </div>
            )}

            <div className={styles.agendaPanels}>
              {groupDetails.map((detail) => {
                const isExpanded = expandedActivityKeys.includes(detail.activityKey);
                const panelId = `agenda-${detail.activityKey}`;
                const bodyId = `agenda-panel-body-${detail.activityKey}`;
                const titleId = `agenda-panel-title-${detail.activityKey}`;
                const sessionsByDay = agendaDayOrder
                  .map((day) => ({
                    day,
                    sessions: detail.sessions
                      .filter((session) => session.day === day)
                      .sort(sortSessions),
                  }))
                  .filter((section) => section.sessions.length > 0);
                const showSessionDayPill = sessionsByDay.length > 1;
                const compactTimeRange = getCompactTimeRangeLabel(detail.timeRange);
                const panelDateLabel = getDateLabelWithDaySuffix(
                  detail.dateLabel,
                  detail.timeRange,
                  isZh
                );
                const moderatorPrefix = isZh
                  ? "主持："
                  : (detail.activityKey.includes("workshop") ? "Moderator: " : "Host: ");
                const showSummaryOnlyBody =
                  detail.sessions.length === 0 && Boolean(detail.summary);

                return (
                  <div
                    key={detail.activityKey}
                    id={panelId}
                    ref={(node) => setActivityPanelRef(detail.activityKey, node)}
                    className={clsx(
                      styles.agendaPanel,
                      highlightedActivityKey === detail.activityKey && styles.agendaPanelHighlight
                    )}
                  >
                    <div className={styles.agendaPanelHeader}>
                      <button
                        id={titleId}
                        type="button"
                        className={styles.agendaPanelToggle}
                        aria-expanded={isExpanded}
                        aria-controls={bodyId}
                        onClick={() => toggleActivityExpanded(detail.activityKey)}
                      >
                        <div className={styles.agendaPanelToggleMain}>
                          <div
                            className={clsx(
                              styles.agendaPanelToggleTitle,
                              !showGroupHeader && styles.agendaPanelToggleTitlePromoted
                            )}
                          >
                            {getAgendaText(detail.title, isZh)}
                          </div>
                          {renderStatusPill(detail.status)}
                        </div>
                        <div className={styles.agendaPanelToggleMeta}>
                          {panelDateLabel && (
                            <span className={styles.agendaPanelMetaTag}>
                              {panelDateLabel}
                            </span>
                          )}
                          {detail.timeRange && (
                            <span className={styles.agendaPanelMetaTag}>
                              {compactTimeRange || detail.timeRange}
                            </span>
                          )}
                        </div>
                        <span
                          className={clsx(
                            styles.agendaPanelChevron,
                            isExpanded && styles.agendaPanelChevronExpanded
                          )}
                          aria-hidden="true"
                        >
                          ▾
                        </span>
                      </button>
                    </div>

                    {isExpanded && (
                      <div
                        id={bodyId}
                        role="region"
                        aria-labelledby={titleId}
                        className={styles.agendaPanelBody}
                      >
                        {detail.activityKey === "developer-conference" &&
                          !detail.sessions.some((session) => Boolean(session.orgLogoKey)) && (
                          <div className={styles.groupLogoWall}>
                            <div className={styles.logoWallHeader}>
                              <span className={styles.logoWallTitle}>
                                <Translate id="forum.agenda.partners">开发者阵容</Translate>
                              </span>
                              <span className={styles.logoWallNote}>
                                {isZh ? "机构持续更新中" : "Organization list in progress"}
                              </span>
                            </div>
                            <div className={clsx(styles.logoWall, styles.logoWallFive)}>
                              {devConfLogos.map((logo) => (
                                <div key={logo.key} className={styles.logoItem}>
                                  {logo.src ? (
                                    <img src={logo.src} alt={logo.name} />
                                  ) : (
                                    <span className={styles.logoPlaceholder}>{logo.name}</span>
                                  )}
                                </div>
                              ))}
                              <div className={clsx(styles.logoItem, styles.logoItemPlaceholder)}>
                                <div className={styles.logoPlaceholderStack}>
                                  <span className={styles.logoPlaceholderMark}>+</span>
                                  <span className={styles.logoPlaceholderText}>
                                    {isZh ? "持续更新" : "More coming soon"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {showSummaryOnlyBody ? (
                          <>
                            {renderSummaryLeadBlock(detail.summaryLeadTop)}
                            {renderSummaryLeadBlock(detail.summaryLead)}
                            {detail.summary && (
                              <div className={styles.agendaPanelSummary}>
                                {getAgendaText(detail.summary, isZh)}
                              </div>
                            )}
                            {!detail.hideSummaryUpdateNote && (
                              <div className={styles.agendaPanelSummaryNote}>
                                {isZh ? "详细日程后续更新" : "A detailed agenda will be published soon"}
                              </div>
                            )}
                          </>
                        ) : (
                        <div className={styles.agenda}>
                          {sessionsByDay.map((section) => {
                            const isPlainOnlySection = section.sessions.every(
                              (session) => !(session.start && session.end)
                            );
                            const isDeveloperLogoCardView =
                              detail.activityKey === "developer-conference";
                            const isMainForumPhaseView =
                              detail.activityKey === "main-forum" && isPlainOnlySection;

                            const mainForumPhases = isMainForumPhaseView
                              ? section.sessions.reduce<
                                  Array<{ key: string; title: string; items: ActivitySession[] }>
                                >((phases, session) => {
                                  const isKeynoteSession =
                                    session.sessionType?.zh === "主旨报告" ||
                                    session.sessionType?.en === "Keynote";

                                  if (isKeynoteSession) {
                                    const phaseTitle = session.sessionType
                                      ? getAgendaText(session.sessionType, isZh)
                                      : (isZh ? "主旨报告" : "Keynote");
                                    const lastPhase = phases[phases.length - 1];

                                    if (lastPhase && lastPhase.title === phaseTitle) {
                                      lastPhase.items.push(session);
                                    } else {
                                      phases.push({
                                        key: `phase-${session.id}`,
                                        title: phaseTitle,
                                        items: [session],
                                      });
                                    }

                                    return phases;
                                  }

                                  phases.push({
                                    key: `phase-${session.id}`,
                                    title: getAgendaText(session.title, isZh),
                                    items: [],
                                  });

                                  return phases;
                                }, [])
                              : [];

                            return (
                              <div key={`${detail.activityKey}-${section.day}`}>
                                {showSessionDayPill && (
                                  <div className={styles.agendaPanelDayHeader}>
                                    <span className={styles.pill}>{getDayLabel(section.day)}</span>
                                  </div>
                                )}

                                {isDeveloperLogoCardView ? (
                                  renderDeveloperConferencePhaseList(section.sessions)
                                ) : isMainForumPhaseView ? (
                                  <div className={styles.agendaPhaseList}>
                                    {mainForumPhases.map((phase) => (
                                      <div key={phase.key} className={styles.agendaPhase}>
                                        <div className={styles.agendaPhaseTitle}>{phase.title}</div>

                                        {phase.items.length > 0 && (
                                          <div
                                            className={clsx(
                                              styles.agendaPhaseItems,
                                              styles.agendaPhaseItemsCards
                                            )}
                                          >
                                            {phase.items.map((session) => {
                                              const speakerPhotoSrc =
                                                keynoteSpeakerPhotoBySessionId[session.id];

                                              return (
                                                <div
                                                  key={session.id}
                                                  className={clsx(
                                                    styles.agendaItem,
                                                    styles.agendaKeynoteCard,
                                                    session.talkTitle && styles.agendaItemHasTalkTitle
                                                  )}
                                                >
                                                  <div className={styles.agendaKeynoteCardBottom}>
                                                    <div
                                                      className={styles.agendaKeynoteCardPhoto}
                                                      aria-hidden="true"
                                                    >
                                                      <div className={styles.agendaSpeakerPhotoSlot}>
                                                        {speakerPhotoSrc ? (
                                                          <img
                                                            src={speakerPhotoSrc}
                                                            alt={getAgendaText(session.title, isZh)}
                                                            loading="lazy"
                                                          />
                                                        ) : (
                                                          <span
                                                            className={
                                                              styles.agendaSpeakerPhotoPlaceholder
                                                            }
                                                          >
                                                            {isZh ? "待补" : "TBD"}
                                                        </span>
                                                      )}
                                                    </div>
                                                  </div>
                                                  <div className={styles.agendaKeynoteCardMain}>
                                                      <div className={styles.agendaTitle}>
                                                        {getAgendaText(session.title, isZh)}
                                                      </div>
                                                      {session.note && (
                                                        <div className={styles.agendaNote}>
                                                          {getAgendaText(session.note, isZh)}
                                                        </div>
                                                      )}
                                                      {session.speakers && (
                                                        <div className={styles.agendaNote}>
                                                          {getAgendaText(session.speakers, isZh)}
                                                        </div>
                                                      )}
                                                      {session.moderator && (
                                                        <div className={styles.agendaNote}>
                                                          {moderatorPrefix}
                                                          {renderPersonNameWithBold(
                                                            getAgendaText(session.moderator, isZh)
                                                          )}
                                                        </div>
                                                      )}
                                                    </div>
                                                  </div>
                                                  {session.talkTitle && (
                                                    <div className={styles.agendaKeynoteCardTop}>
                                                      {renderTalkTitle(session.talkTitle)}
                                                    </div>
                                                  )}
                                                </div>
                                              );
                                            })}
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div
                                    className={clsx(
                                      styles.agendaList,
                                      isPlainOnlySection && styles.agendaListPlain
                                    )}
                                  >
                                    {section.sessions.map((session, sessionIndex) => {
                                      const hasSessionTime = Boolean(session.start && session.end);
                                      const prevSession =
                                        sessionIndex > 0 ? section.sessions[sessionIndex - 1] : null;
                                      const sameSessionTypeAsPrevPlain =
                                        !hasSessionTime &&
                                        Boolean(session.sessionType) &&
                                        Boolean(
                                          prevSession && !(prevSession.start && prevSession.end)
                                        ) &&
                                        Boolean(prevSession?.sessionType) &&
                                        session.sessionType?.zh === prevSession?.sessionType?.zh &&
                                        (session.sessionType?.en ?? "") ===
                                          (prevSession?.sessionType?.en ?? "");
                                      const showSessionTypeTag =
                                        Boolean(session.sessionType) && !sameSessionTypeAsPrevPlain;
                                      const isKeynoteSession =
                                        session.sessionType?.zh === "主旨报告" ||
                                        session.sessionType?.en === "Keynote";
                                      const showSpeakerPhotoSlot =
                                        !hasSessionTime && isKeynoteSession;
                                      const speakerPhotoSrc =
                                        keynoteSpeakerPhotoBySessionId[session.id];
                                      const showSessionMeta =
                                        hasSessionTime ||
                                        showSessionTypeTag ||
                                        Boolean(session.status);

                                      return (
                                        <div
                                          key={session.id}
                                          className={clsx(
                                            styles.agendaItem,
                                            !hasSessionTime && styles.agendaItemPlain,
                                            showSpeakerPhotoSlot && styles.agendaItemSpeaker,
                                            session.talkTitle && styles.agendaItemHasTalkTitle
                                          )}
                                        >
                                          {showSessionMeta && (
                                            <div className={styles.sessionMetaRow}>
                                              {hasSessionTime && (
                                                <span className={styles.sessionTime}>
                                                  {session.start} - {session.end}
                                                </span>
                                              )}
                                              {showSessionTypeTag && session.sessionType && (
                                                <span className={styles.sessionTypeTag}>
                                                  {getAgendaText(session.sessionType, isZh)}
                                                </span>
                                              )}
                                              {session.status && renderStatusPill(session.status)}
                                            </div>
                                          )}
                                          {renderTalkTitle(session.talkTitle)}
                                          <div className={styles.agendaTitle}>
                                            {getAgendaText(session.title, isZh)}
                                          </div>
                                          {session.speakers && (
                                            <div className={styles.agendaNote}>
                                              {getAgendaText(session.speakers, isZh)}
                                            </div>
                                          )}
                                          {session.moderator && (
                                            <div className={styles.agendaNote}>
                                              {moderatorPrefix}
                                              {renderPersonNameWithBold(
                                                getAgendaText(session.moderator, isZh)
                                              )}
                                            </div>
                                          )}
                                          {session.note && (
                                            <div className={styles.agendaNote}>
                                              {getAgendaText(session.note, isZh)}
                                            </div>
                                          )}
                                          {showSpeakerPhotoSlot && (
                                            <div className={styles.agendaItemAside} aria-hidden="true">
                                              <div className={styles.agendaSpeakerPhotoSlot}>
                                                {speakerPhotoSrc ? (
                                                  <img
                                                    src={speakerPhotoSrc}
                                                    alt={getAgendaText(session.title, isZh)}
                                                    loading="lazy"
                                                  />
                                                ) : (
                                                  <span
                                                    className={styles.agendaSpeakerPhotoPlaceholder}
                                                  >
                                                    {isZh ? "待补" : "TBD"}
                                                  </span>
                                                )}
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && highlightTimeoutRef.current !== null) {
        window.clearTimeout(highlightTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const rawHash = decodeURIComponent(window.location.hash);
    if (!rawHash.startsWith("#agenda-")) {
      return;
    }

    const activityKey = rawHash.slice("#agenda-".length);
    if (!getActivityDetailByKey(activityKey)) {
      return;
    }

    const timer = window.setTimeout(() => {
      openAndScrollToActivity(activityKey, { smooth: false, updateHash: false });
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <Layout
      title={translate({ id: "forum.page.title", message: "天工论坛" })}
      description={translate({
        id: "forum.page.description",
        message: "天工论坛：联盟国际品牌会议的页面",
      })}
    >
      <div className={styles.page}>
        <div
          className={styles.hero}
          style={{
            backgroundImage: `linear-gradient(120deg, rgba(8, 12, 24, 0.58), rgba(8, 12, 24, 0.36)), url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className={styles.heroGlow} />
          <div className="container">
            <div className={styles.heroContent}>
              <span className={styles.heroTag}>{currentEdition.title}</span>
              <div className={styles.heroTitle}>{currentEdition.theme}</div>
              <div className={styles.heroMetaRow}>
                <span className={styles.heroPill}>{currentEdition.date}</span>
              </div>
            </div>
          </div>
        </div>

        <main>
          <section className={clsx(styles.section, styles.lightSection)}>
            <div className="container">
              <div className={styles.partnerGroupGrid}>
                <div className={clsx(styles.card, styles.partnerGroupCard)}>
                  <h2 className={styles.partnerGroupLabel}>
                    <Translate id="forum.section.organizers">主办单位</Translate>
                  </h2>
                  <div className={styles.partnerGroupBody}>
                    <div
                      className={clsx(
                        styles.logoItem,
                        styles.partnerLogoItem,
                        styles.partnerHostLogoItem,
                      )}
                    >
                      <img
                        src={organizerLogos[0].src}
                        alt={organizerLogos[0].name}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
                <div className={clsx(styles.card, styles.partnerGroupCard)}>
                  <h2 className={styles.partnerGroupLabel}>
                    <Translate id="forum.section.coOrganizers">联合主办单位</Translate>
                  </h2>
                  <div className={styles.partnerGroupBody}>
                    <div
                      className={clsx(
                        styles.logoItem,
                        styles.partnerLogoItem,
                        styles.partnerCoHostLogoItem,
                      )}
                    >
                      <img
                        src={organizerLogos[1].src}
                        alt={organizerLogos[1].name}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className={clsx(
                    styles.card,
                    styles.partnerGroupCard,
                    styles.partnerGroupCardWide,
                  )}
                >
                  <h2 className={styles.partnerGroupLabel}>
                    <Translate id="forum.section.supportingOrgs">支持机构</Translate>
                  </h2>
                  <div className={styles.partnerSupportGrid}>
                    {supportInstitutionLogos.map((logo) => {
                      const logoNode = (
                        <div
                          className={clsx(styles.logoItem, styles.partnerLogoItem)}
                          key={logo.key}
                        >
                          <img src={logo.src} alt={logo.name} loading="lazy" />
                        </div>
                      );

                      if (!logo.href) {
                        return logoNode;
                      }

                      return (
                        <a
                          key={logo.key}
                          href={logo.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.partnerLogoLink}
                        >
                          {logoNode}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            id="current"
            className={clsx(styles.section, styles.lightSection)}
          >
            <div className="container">
              <div className={styles.sectionHeader}>
                <p className={styles.sectionTitle}>
                  <Translate id="forum.section.mainActivities">论坛议程</Translate>
                </p>
                <p className={styles.sectionHint}>
                  <Translate id="forum.section.mainActivities.desc">
                    会议议程、各项活动与分论坛信息将持续更新。
                  </Translate>
                </p>
              </div>
              <div className={styles.agendaLayout}>
                {renderMasterAgendaOverview()}
                {renderActivityAgendaPanels()}
              </div>
              <div className={styles.venueBlock}>
                <div
                  className={styles.venueCard}
                  style={{ backgroundImage: `url(${venueImage})` }}
                >
                  <div className={styles.venueOverlay} />
                  <div className={styles.venueContent}>
                    <span className={styles.venueTag}>
                      <Translate id="forum.venue.tag">会议地点</Translate>
                    </span>
                    <div className={styles.venueTitle}>
                      <Translate id="forum.venue.name">
                        南京紫金山庄
                      </Translate>
                    </div>
                    <div className={styles.venueAddress}>
                      <Translate id="forum.venue.address">
                        中国江苏南京环陵路18号
                      </Translate>
                      <div className={styles.venueLinks}>
                        <a
                          className={styles.venueLink}
                          href="https://www.google.com/maps/place/Purple+Palace+Nanjing/@32.0775585,118.8739961,17z/data=!3m1!4b1!4m9!3m8!1s0x35b58c90bd752e9d:0xe4f90392f0b75149!5m2!4m1!1i2!8m2!3d32.077554!4d118.876571!16s%2Fg%2F1tc_c96s!5m1!1e4?authuser=0&entry=ttu&g_ep=EgoyMDI2MDEyNi4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Translate id="forum.venue.googleMaps">谷歌地图</Translate>
                        </a>
                        <a
                          className={styles.venueLink}
                          href="https://maps.baidu.com/poi/%E5%8D%97%E4%BA%AC%E7%B4%AB%E9%87%91%E5%B1%B1%E5%BA%84/@13234200.503662258,3751003.1576246065,17.13z?uid=3e63684910aadee888b9881c&ugc_type=3&ugc_ver=1&device_ratio=2&compat=1&routetype=drive&sn_xy=12950335,4840853&en_uid=3e63684910aadee888b9881c&pcevaname=pc4.1&querytype=detailConInfo&da_src=shareurl"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Translate id="forum.venue.baiduMaps">百度地图</Translate>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className={clsx(styles.section, styles.lightSection)}>
            <div className="container">
              <div className={styles.sectionHeader}>
                <p className={styles.sectionTitle}>
                  <Translate id="forum.section.people">参会嘉宾</Translate>
                </p>
                <p className={styles.sectionHint}>
                  <Translate id="forum.section.people.desc">
                    按姓氏字母排序，随确认参会情况持续更新。
                  </Translate>
                </p>
              </div>
              <div className={styles.peopleGrid}>
                {peopleSorted.map((person) => (
                  <div key={person.key} className={styles.personCard}>
                    <div className={styles.personPhoto}>
                      {person.image && (
                        <img
                          src={person.image}
                          alt={isZh ? person.nameZh : person.nameEn}
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className={styles.personName}>
                      {isZh ? person.nameZh : person.nameEn}
                    </div>
                    <div className={styles.personTitle}>
                      {isZh ? person.titleZh : person.titleEn}
                    </div>
                  </div>
                ))}
                <div className={clsx(styles.personCard, styles.personCardPlaceholder)}>
                  <div className={clsx(styles.personPhoto, styles.personPlaceholderPhoto)}>
                    <span className={styles.personPlaceholderMark}>+</span>
                  </div>
                  <div className={styles.personName}>
                    {isZh ? "持续更新中" : "More updates coming soon"}
                  </div>
                  <div className={styles.personTitle}>
                    {isZh ? "敬请关注" : "More speakers coming soon"}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={clsx(styles.section, styles.mutedSection)}>
            <div className="container">
              <div className={styles.sectionHeader}>
                <p className={styles.sectionTitle}>
                  <Translate id="forum.section.coCreation">加入议题共创合作</Translate>
                </p>
                <p className={styles.sectionHint}>
                  <Translate id="forum.section.coCreation.desc">
                    共建互联互通的 LCA 与碳足迹生态，欢迎合作。
                  </Translate>
                </p>
              </div>
              <div className={styles.coopGrid}>
                {coopItems.map((item) => (
                  <div key={item.title?.toString()} className={styles.coopCard}>
                    <div className={styles.cardHeader}>
                      <span className={styles.iconBubble}>{icons[item.icon]}</span>
                      <div className={styles.cardTitle}>{item.title}</div>
                    </div>
                    <div className={styles.agendaNote}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="highlights" className={styles.section}>
            <div className="container">
              <div className={styles.sectionHeader}>
                <p className={styles.sectionTitle}>
                  <Translate id="forum.section.highlights">往期精选</Translate>
                </p>
                <p className={styles.sectionHint}>
                  <Translate id="forum.section.highlights.desc">
                    典型议题、成果发布与产业合作案例的快速回顾。
                  </Translate>
                </p>
              </div>
              <div className={styles.cardGrid}>
                {highlights.map((session) => (
                  <div key={session.title} className={styles.card}>
                    <div className={styles.cardPhoto}>
                      {session.image && (
                        <img
                          src={session.image}
                          alt={session.title}
                          className={styles.cardPhotoImg}
                          loading="lazy"
                        />
                      )}
                      <div className={styles.cardPhotoLabel}>
                        {session.theme ?? session.title}
                      </div>
                    </div>
                    <span className={styles.pill}>{session.date}</span>
                    <div className={styles.cardTitle}>{session.title}</div>
                    <div className={styles.cardMeta}>{session.focus}</div>
                    {session.tags && (
                      <div className={styles.badgeRow}>
                        {session.tags.map((tag) => (
                          <span key={tag} className={styles.badge}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
