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
    title: <Translate id="homepage.chair">贺克斌</Translate>,
    img: require("@site/static/img/homepage/board-chair.png").default,
    description: (
      <>
        <Translate id="homepage.chair-introduction">
          清华大学碳中和研究院院长、环境学院教授，中国工程院院士
        </Translate>
      </>
    ),
  },
];

function Feature({ title, img, description }: FeatureItem) {
  return (
    <div className={clsx("col col")}>
      <div className="text--center">
        <img className={styles.featureSvg} src={img} alt={title?.toString()} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h5">{title}</Heading>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageBoard(): ReactNode {
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
