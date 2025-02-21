import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import Translate, { translate } from "@docusaurus/Translate";

type FeatureItem = {
  title: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: (
      <Translate id="member.gjdwyxgsdsjzx">
        国家电网有限公司大数据中心
      </Translate>
    ),
  },
  {
    title: (
      <Translate id="member.zshsyhkyjyxgs">
        中石化石油化工科学研究院有限公司
      </Translate>
    ),
  },
  {
    title: (
      <Translate id="member.wkxnyclhngfyxgs">
        五矿新能源材料（湖南）股份有限公司
      </Translate>
    ),
  },
  {
    title: <Translate id="member.zjtkjyxgs">中建碳科技有限公司</Translate>,
  },
  {
    title: (
      <Translate id="member.zczzdljcysyxgs">
        中车株洲电力机车研究所有限公司
      </Translate>
    ),
  },
  {
    title: (
      <Translate id="member.zjclkxyjyxgs">
        中国建筑材料科学研究总院有限公司
      </Translate>
    ),
  },
  {
    title: (
      <Translate id="member.zhxydkjyxgs">中航信移动科技有限公司</Translate>
    ),
  },
  {
    title: (
      <Translate id="member.snddqzgyxgsshyffgs">
        施耐德电气（中国）有限公司上海研发分公司
      </Translate>
    ),
  },
  {
    title: <Translate id="member.zhjjnyjsxh">中国化工节能技术协会</Translate>,
  },
];

function Feature({ title }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center padding-horiz--md">
        <Heading as="h6">{title}</Heading>
      </div>
    </div>
  );
}

export default function HomepageMemberUnit(): ReactNode {
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
