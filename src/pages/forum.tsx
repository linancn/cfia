import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import Translate, { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import clsx from "clsx";

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
    message: "2026 年 3 月 25 - 26 日  江苏 · 南京",
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
    titleEn: <>Prof. Dr., TU Berlin</>,
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
    titleEn: <>CEO, HiQLCD</>,
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
    key: "alessandro-manzardo",
    nameEn: "Alessandro Manzardo",
    nameZh: "Alessandro Manzardo",
    titleZh: <>帕多瓦大学副教授</>,
    titleEn: <>Associate Professor, Università degli Studi di Padova</>,
    image: "img/tg-forum/people/AlessandroM-upd.jpg",
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
    key: "eric-mieras",
    nameEn: "Eric Mieras",
    nameZh: "Eric Mieras",
    titleZh: <>One Click LCA 首席创新官<br />PRé 总经理<br />（SimaPro）</>,
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
];

const logoSlots = Array.from({ length: 6 }, (_, index) => index);
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
    name: "Envision",
    src: "img/tg-forum/orgnizations/lca_dev_conf/envision.png",
  },
  {
    key: "greendelta",
    name: "GreenDelta",
    src: "img/tg-forum/orgnizations/lca_dev_conf/greendelta.png",
  },
  {
    key: "hiq",
    name: "HiQ",
    src: "img/tg-forum/orgnizations/lca_dev_conf/hiq.jpg",
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
    count: "4",
    layout: "subForum",
    items: [
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
          <Translate id="forum.agenda.subForums.audit">LCA 与碳足迹数据议题（英文）</Translate>
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
    count: "4",
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
      {
        key: "power-workshop",
        title: (
          <Translate id="forum.agenda.special.powerWorkshop">
            电力专题研讨会
          </Translate>
        ),
        lead: (
          <Translate id="forum.agenda.special.powerWorkshop.lead">
            活动内容和议程确认中。
          </Translate>
        ),
        icon: "spark",
      },
    ],
  },
];

export default function Forum(): ReactNode {
  const { i18n } = useDocusaurusContext();
  const isZh = i18n.currentLocale.startsWith("zh");
  const heroImage = useBaseUrl("img/tg-forum/kv.jpg");
  const venueImage = useBaseUrl("img/tg-forum/venue.png");

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
                {people.map((person) => (
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
                    {isZh ? "持续更新中" : "Updating"}
                  </div>
                  <div className={styles.personTitle}>
                    {isZh ? "敬请关注" : "More speakers coming soon"}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className={clsx(styles.section, styles.lightSection)}>
            <div className="container">
              <div className={styles.sectionHeader}>
                <p className={styles.sectionTitle}>
                  <Translate id="forum.section.sponsors">合作伙伴</Translate>
                </p>
                <p className={styles.sectionHint}>
                  <Translate id="forum.section.sponsors.desc">
                    有意愿合作和提供会议赞助，欢迎联系秘书处。
                  </Translate>
                </p>
              </div>
              <div className={styles.sponsorGrid}>
                <div className={clsx(styles.card, styles.sponsorCard)}>
                  <img
                    src="img/tg-forum/partner-logo/CNEST.png"
                    alt={translate({ id: "forum.sponsor.cnest", message: "CNEST" })}
                    className={styles.sponsorLogo}
                  />
                </div>
                <div className={clsx(styles.card, styles.sponsorCard)}>
                  <img
                    src="img/tg-forum/partner-logo/dcv.png"
                    alt={translate({ id: "forum.sponsor.dcv", message: "国际数碳谷" })}
                    className={styles.sponsorLogo}
                  />
                </div>
                <div className={clsx(styles.card, styles.sponsorCard)}>
                  <img
                    src="img/tg-forum/partner-logo/EF_China.png"
                    alt={translate({ id: "forum.sponsor.efChina", message: "能源基金会" })}
                    className={styles.sponsorLogo}
                  />
                </div>
                <div className={clsx(styles.card, styles.sponsorCard)}>
                  <a
                    href="https://jointmission.lib.tsinghua.edu.cn/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="img/tg-forum/partner-logo/ijmcccn.png"
                      alt={translate({
                        id: "forum.sponsor.ijmcccn",
                        message: "ijmcccn",
                      })}
                      className={styles.sponsorLogo}
                    />
                  </a>
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
                  <Translate id="forum.section.mainActivities">主要活动</Translate>
                </p>
                <p className={styles.sectionHint}>
                  <Translate id="forum.section.mainActivities.desc">
                    会议议程、各项活动与分论坛信息将持续更新。
                  </Translate>
                </p>
              </div>
              <div className={styles.agendaLayout}>
                {agendaGroups.map((group) => (
                  <div
                    key={group.key}
                    className={clsx(styles.agendaGroup, group.wide && styles.agendaGroupWide)}
                  >
                    <div className={styles.agendaGroupHeader}>
                      <div>
                        <div className={styles.groupTitle}>{group.title}</div>
                        <div className={styles.groupDesc}>{group.desc}</div>
                      </div>
                      <span className={styles.groupCount}>
                        {group.count}
                        <Translate id="forum.section.sessions"> 场</Translate>
                      </span>
                    </div>
                    <div
                      className={clsx(
                        styles.agendaGrid,
                        group.wide && styles.agendaGridWide,
                        group.layout === "subForum" && styles.agendaGridSubForum,
                        group.layout === "specialEvents" && styles.agendaGridSpecial
                      )}
                    >
                      {group.items.map((item) =>
                        group.singleMode === "panel" ? (
                          <div key={item.key} className={styles.singlePanel}>
                            {group.key === "developer" && (
                              <>
                                <div className={styles.logoWallHeader}>
                                  <span className={styles.logoWallTitle}>
                                    <Translate id="forum.agenda.partners">开发者阵容</Translate>
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
                                  <div
                                    className={clsx(
                                      styles.logoItem,
                                      styles.logoItemPlaceholder
                                    )}
                                  >
                                    <div className={styles.logoPlaceholderStack}>
                                      <span className={styles.logoPlaceholderMark}>+</span>
                                      <span className={styles.logoPlaceholderText}>
                                        {isZh ? "持续更新" : "More"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        ) : (
                          <div
                            key={item.key}
                            className={clsx(
                              styles.agendaCard,
                              group.layout === "specialEvents" && styles.specialCard,
                              item.wide && styles.specialWide
                            )}
                          >
                            {group.layout === "specialEvents" ? (
                              <div className={styles.specialHeader}>
                                {item.hostLogo && (
                                <div className={styles.specialLogoWrap}>
                                  <img
                                    src={item.hostLogo}
                                    alt={item.hostAlt ?? ""}
                                    className={clsx(
                                      styles.specialLogo,
                                      item.hostLogoClassName
                                    )}
                                  />
                                </div>
                              )}
                                <div className={styles.specialText}>
                                  <div className={styles.agendaCardTitle}>{item.title}</div>
                                  <div className={styles.agendaCardLead}>{item.lead}</div>
                                </div>
                              </div>
                            ) : (
                              <div className={styles.agendaCardHeader}>
                                <span className={styles.iconBubble}>{icons[item.icon]}</span>
                                <div className={styles.agendaCardHeaderText}>
                                  <div className={styles.agendaCardTitle}>{item.title}</div>
                                  <div className={styles.agendaCardLead}>{item.lead}</div>
                                </div>
                              </div>
                            )}
                            {/* {group.layout === "subForum" && (
                              <>
                                <div className={styles.logoWall}>
                                  {logoSlots.map((slot) => (
                                    <div key={slot} className={styles.logoSlot} />
                                  ))}
                                </div>
                              </>
                            )} */}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ))}
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
