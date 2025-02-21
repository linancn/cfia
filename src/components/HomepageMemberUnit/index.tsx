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
    title: <Translate id="member.thu">张三</Translate>,
  },
];

function Feature({ title }: FeatureItem) {
  return (
    <div className={clsx("col col--2")}>
      <div className="text--center padding-horiz--md">
        <Heading as="h5">{title}</Heading>
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
