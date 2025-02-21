import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import Translate, { translate } from "@docusaurus/Translate";

type FeatureItem = {
  title: ReactNode;
  img: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: <Translate id="homepage.secretariat-general">徐明</Translate>,
    img: require("@site/static/img/homepage/secretary-general.png").default,
    description: (
      <>
        <Translate id="homepage.secretariat-general-introduction">
          清华大学碳中和讲席教授，环境学院副院长
        </Translate>
      </>
    ),
  },
];

function Feature({ title, img, description }: FeatureItem) {
  return (
    <div className={clsx("col col")}>
      <div className="text--center">
        <img
          className={styles.featureSvg}
          src={img}
          alt={title?.toString()}
          role="img"
        />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h5">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageSecretariatGeneral(): ReactNode {
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
