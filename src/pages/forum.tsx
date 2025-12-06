import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
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

const currentEdition = {
  title: translate({ id: "forum.currentEdition.title", message: "2026 · 天工论坛" }),
  theme: translate({
    id: "forum.currentEdition.theme",
    message: "全球互联、互通、互信的 LCA 与碳足迹体系",
  }),
  date: translate({
    id: "forum.currentEdition.date",
    message: "2026 年 3 月 25-26 日  江苏 · 南京",
  }),
  modules: [
  {
    title: translate({
      id: "forum.modules.generalAssembly.title",
      message: "联盟全体会员大会",
    }),
      note: translate({
        id: "forum.modules.generalAssembly.note",
        message: "总结年度工作、制定工作计划",
      }),
      icon: "assembly" as IconKey,
    },
    {
      title: translate({
        id: "forum.modules.developerConference.title",
        message: "LCA 开发者大会",
      }),
      note: translate({
        id: "forum.modules.developerConference.note",
        message: "工具链、数据生态与开发实践",
      }),
      icon: "developer" as IconKey,
    },
    {
      title: translate({
        id: "forum.modules.subForums.title",
        message: "系列分论坛",
      }),
      note: translate({
        id: "forum.modules.subForums.note",
        message: "与合作方共创，议题与嘉宾将随合作推进更新",
      }),
      icon: "forum" as IconKey,
    },
    {
      title: translate({
        id: "forum.modules.specialEvents.title",
        message: "专题活动",
      }),
      note: translate({
        id: "forum.modules.specialEvents.note",
        message: "与合作方共创，活动内容和主题即时更新",
      }),
      icon: "spark" as IconKey,
    },
  ],
};

const coopItems: { title: ReactNode; desc: ReactNode; icon: IconKey }[] = [
  {
    title: <Translate id="forum.coop.hosting.title">分论坛承办</Translate>,
    desc: (
      <Translate id="forum.coop.hosting.desc">
        共同策划议题，嘉宾与形式按合作推进更新。
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

export default function Forum(): ReactNode {
  return (
    <Layout
      title={translate({ id: "forum.page.title", message: "天工论坛" })}
      description={translate({
        id: "forum.page.description",
        message: "天工论坛：联盟国际品牌会议的页面",
      })}
    >
      <div className={styles.hero}>
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
            <div className={styles.agenda}>
              <div className={styles.moduleGrid}>
                {currentEdition.modules.map((item) => (
                  <div key={item.title} className={styles.moduleCard}>
                    <div className={styles.cardHeader}>
                      <span className={styles.iconBubble}>{icons[item.icon]}</span>
                      <div className={styles.agendaTitle}>{item.title}</div>
                    </div>
                    <div className={styles.agendaNote}>{item.note}</div>
                  </div>
                ))}
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
        <section className={clsx(styles.section, styles.lightSection)}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTitle}>
                <Translate id="forum.section.sponsors">合作机构</Translate>
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
                <img
                  src="img/tg-forum/partner-logo/ijmcccn.png"
                  alt={translate({ id: "forum.sponsor.ijmcccn", message: "ijmcccn" })}
                  className={styles.sponsorLogo}
                />
              </div>
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
                  <div
                    className={styles.cardPhoto}
                  >
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
    </Layout>
  );
}
