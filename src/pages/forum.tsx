import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
import clsx from "clsx";

import styles from "./forum.module.css";

type Session = {
  date: string;
  title: string;
  focus: string;
  tags?: string[];
  theme?: string;
  accent?: string;
};

const currentEdition = {
  title: "2026 · 天工论坛",
  theme: "全球互联、互通、互信的 LCA 与碳足迹体系",
  date: "2026 年 3 月 25-26 日  江苏 · 南京",
  host: "承办：江苏 GDC 国际数碳谷",
  modules: [
    {
      title: "联盟全体会员大会",
      note: "总结年度工作、制定工作计划",
    },
    {
      title: "LCA 开发者大会",
      note: "工具链、数据生态与开发实践",
    },
    {
      title: "系列分论坛",
      note: "与合作方共创，议题与嘉宾将随合作推进更新",
    },
    {
      title: "专题活动",
      note: "与合作方共创，活动内容和主题即时更新",
    },
  ],
};

const highlights: Session[] = [
  {
    date: "2025 · 第二届",
    title: "发起成立“碳足迹产业技术创新联盟”",
    focus: "2025 年 1 月 · 北京",
    tags: ["联盟发布", "产业共建"],
    theme: "政产学研全面协同，共建产品碳足迹管理体系",
    accent: "linear-gradient(135deg, #0f4c75, #3282b8)",
  },
  {
    date: "2023 · 第一届",
    title: "发布开放、透明的“天工数据库”",
    focus: "2023 年 11 月 · 北京",
    tags: ["数据库", "开放透明"],
    theme: "发起 LCA 数据开放共享与协同治理联合研究计划",
    accent: "linear-gradient(135deg, #0b6e4f, #19a974)",
  },
];

export default function Forum(): ReactNode {
  return (
    <Layout
      title="天工论坛"
      description="天工论坛：联盟国际品牌会议的页面"
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
            <p className={styles.heroSupport}>{currentEdition.host}</p>
            <div className={styles.heroActions}>
              <Link
                className="button button--secondary button--lg"
                to="#current"
              >
                <Translate id="forum.cta.upcoming">查看本届日程</Translate>
              </Link>
              <Link
                className="button button--outline button--lg"
                to="#highlights"
              >
                <Translate id="forum.cta.highlights">浏览往期精彩</Translate>
              </Link>
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
              <p className={styles.sectionTitle}>主要活动</p>
              <p className={styles.sectionHint}>
                会议议程、各项活动与分论坛信息将持续更新。
              </p>
            </div>
            <div className={styles.agenda}>
              <div className={styles.moduleGrid}>
                {currentEdition.modules.map((item) => (
                  <div key={item.title} className={styles.moduleCard}>
                    <div className={styles.agendaTitle}>{item.title}</div>
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
              <p className={styles.sectionTitle}>加入议题共创合作</p>
              <p className={styles.sectionHint}>
                共建互联互通的 LCA 与碳足迹生态，欢迎合作。
              </p>
            </div>
            <div className={styles.coopGrid}>
              <div className={styles.coopCard}>
                <div className={styles.cardTitle}>分论坛承办</div>
                <div className={styles.agendaNote}>
                  共同策划议题，嘉宾与形式按合作推进更新。
                </div>
              </div>
              <div className={styles.coopCard}>
                <div className={styles.cardTitle}>专题活动</div>
                <div className={styles.agendaNote}>
                  闭门圆桌、标准与指南研讨等定制化交流。
                </div>
              </div>
              <div className={styles.coopCard}>
                <div className={styles.cardTitle}>赞助合作</div>
                <div className={styles.agendaNote}>
                  多层级品牌展示、致辞报告与媒体传播权益。
                </div>
              </div>
              <div className={styles.coopCard}>
                <div className={styles.cardTitle}>媒体与传播</div>
                <div className={styles.agendaNote}>
                  宣传矩阵共建，渠道与资源共享。
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={clsx(styles.section, styles.lightSection)}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <p className={styles.sectionTitle}>合作与赞助</p>
              <p className={styles.sectionHint}>
                合作伙伴与赞助商持续更新，欢迎联系秘书处。
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.agendaNote}>Logo 展示位（待更新）</div>
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
                    style={
                      session.accent
                        ? { backgroundImage: session.accent }
                        : undefined
                    }
                  >
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
