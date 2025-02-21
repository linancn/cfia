import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import Translate, { translate } from "@docusaurus/Translate";

type FeatureItem = {
  title: ReactNode;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: <Translate id="vice-secgeneral.wyt">王玉涛</Translate>,
    description: (
      <Translate id="vice-secgeneral.wyt-desc">
        复旦大学环境与工程系教授, 上海能源与碳中和战略研究院副院长
      </Translate>
    ),
  },
  {
    title: <Translate id="vice-secgeneral.wsw">王姝文</Translate>,
    description: (
      <Translate id="vice-secgeneral.wsw-desc">
        中信集团中信控股公司, 首席战略官、战略管理部总经理
      </Translate>
    ),
  },
  {
    title: <Translate id="vice-secgeneral.wzs">王稚晟</Translate>,
    description: (
      <Translate id="vice-secgeneral.wzs-desc">
        欧盟中国商会副会长, 中国欧盟协会理事, 中国碳中和五十人论坛秘书长
      </Translate>
    ),
  },
  {
    title: <Translate id="vice-secgeneral.tjp">田金平</Translate>,
    description: (
      <Translate id="vice-secgeneral.tjp-desc">
        清华大学环境学院研究员
      </Translate>
    ),
  },
  {
    title: <Translate id="vice-secgeneral.qjc">齐剑川</Translate>,
    description: (
      <Translate id="vice-secgeneral.qjc-desc">
        清华大学环境学院助理研究员
      </Translate>
    ),
  },
  {
    title: <Translate id="vice-secgeneral.lzy">李中阳</Translate>,
    description: (
      <Translate id="vice-secgeneral.lzy-desc">
        清华大学天津电子信息研究院能源电子中心主任
      </Translate>
    ),
  },
  {
    title: <Translate id="vice-secgeneral.ql">邱林</Translate>,
    description: (
      <Translate id="vice-secgeneral.ql-desc">
        远景智能零碳卓越中心全球负责人
      </Translate>
    ),
  },
  {
    title: <Translate id="vice-secgeneral.cwq">陈伟强</Translate>,
    description: (
      <Translate id="vice-secgeneral.cwq-desc">
        中国科学院城市环境研究所研究员
      </Translate>
    ),
  },
  {
    title: <Translate id="vice-secgeneral.sz">施正</Translate>,
    description: (
      <Translate id="vice-secgeneral.sz-desc">
        北京两区办开放政策研究院研究员
      </Translate>
    ),
  },
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center padding-horiz--md">
        <Heading as="h5">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageViceSecretariatGeneral(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
