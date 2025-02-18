import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import Translate, {translate} from '@docusaurus/Translate';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          <Translate id="homepage.title">碳足迹产业技术创新联盟</Translate>
        </Heading>
        <p className="hero__subtitle">
          <Translate id="homepage.tagline">促进产业协同，推动技术创新，支撑国家战略</Translate>
          </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            <Translate id="homepage.button1">开放知识中心</Translate>
          </Link>
          <Link
            className="button button--secondary button--lg"
            href='https://lca.tiangong.earth'>
            <Translate id="homepage.button2">天工数据平台</Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={
        translate({
          message: 'web-title',
          description: 'The title of the website',
        })
      }
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
