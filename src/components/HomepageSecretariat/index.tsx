import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import Translate, { translate } from "@docusaurus/Translate";

type FeatureItem = {
  img: string;
};

const FeatureList: FeatureItem[] = [
  {
    img: require("@site/static/img/homepage/logo-sec-thuicon.jpg").default,
  },
];

function Feature({ img }: FeatureItem) {
  return (
    <div className={clsx("col col")}>
      <div className="text--center">
        <img className={styles.featureSvg} src={img} role="img" />
      </div>
    </div>
  );
}

export default function HomepageSecretariat(): ReactNode {
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
