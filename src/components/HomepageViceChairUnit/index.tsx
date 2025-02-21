import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import Translate, { translate } from "@docusaurus/Translate";

type FeatureItem = {
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
};

const FeatureList: FeatureItem[] = [
  {
    Svg: require("@site/static/img/logo.svg").default,
  }
];

function Feature({ Svg }: FeatureItem) {
  return (
    <div className={clsx("col col--2")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
    </div>
  );
}

export default function HomepageViceChairUnit(): ReactNode {
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
