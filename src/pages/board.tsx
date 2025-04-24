import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageChair from "@site/src/components/HomepageChair";
import HomepageViceChair from "../components/HomepageViceChair";
import HomepageBoardMember from "../components/HomepageBoardMember";
import HomepageSecretariat from "@site/src/components/HomepageSecretariat";
import HomepageSecretariatGeneral from "@site/src/components/HomepageSecretariatGeneral";
import HomepageViceSecretariatGeneral from "@site/src/components/HomepageViceSecretariatGeneral";
import Heading from "@theme/Heading";
import Translate, { translate } from "@docusaurus/Translate";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          <Translate id="homepage.title">碳足迹产业技术创新联盟</Translate>
        </Heading>
        <p className="hero__subtitle">
          <Translate id="homepage.tagline">
            促进产业协同，推动技术创新，支撑国家战略
          </Translate>
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            <Translate id="homepage.button1">📚　开放知识中心</Translate>
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            <Translate id="homepage.button2">🛠️　天工 LCA 数据系统（TIDAS）</Translate>
          </Link>
          <Link
            className="button button--secondary button--lg"
            href="https://lca.tiangong.earth"
          >
            <Translate id="homepage.button3">🌐　天工 LCA 数据平台</Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={translate({
        message: "web-title",
        description: "The title of the website",
      })}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main className={styles.customBackground}>
        <div className={styles.customBackgroundSection1}>
          <div className="container">
          <p className={styles.heroSubtitle}>
              <Translate id="homepage.sub-title-chair">理事长</Translate>
            </p>
            <HomepageChair />
            <p className={styles.heroSubtitle}>
              <Translate id="homepage.sub-title-vice-chair">副理事长</Translate>
            </p>
            <HomepageViceChair />
          </div>
        </div>
        <div className={styles.customBackgroundSection2}>
          <div className="container">
          <p className={styles.heroSubtitle}>
              <Translate id="homepage.sub-title-board-member">理事</Translate>
            </p>
            <HomepageBoardMember />
          </div>
        </div>
      </main>
    </Layout>
  );
}
