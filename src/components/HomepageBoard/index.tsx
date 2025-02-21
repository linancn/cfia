import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import Translate, { translate } from "@docusaurus/Translate";

type FeatureItem = {
  title: ReactNode;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: <Translate id="member.thu">清华大学</Translate>,
    Svg: require("@site/static/img/logo.svg").default,
    description: <Translate id="member.thu-discription">理事长单位</Translate>,
  },
  {
    title: <Translate id="member.thu">清华大学</Translate>,
    Svg: require("@site/static/img/logo.svg").default,
    description: (
      <>
        <Translate id="member.thu-discription">理事长单位</Translate>,
      </>
    ),
  },
  {
    title: <Translate id="member.thu">清华大学</Translate>,
    Svg: require("@site/static/img/logo.svg").default,
    description: (
      <>
        <Translate id="member.thu-discription">理事长单位</Translate>,
      </>
    ),
  },
  {
    title: <Translate id="member.thu">清华大学</Translate>,
    Svg: require("@site/static/img/logo.svg").default,
    description: (
      <>
        <Translate id="member.thu-discription">理事长单位</Translate>,
      </>
    ),
  },
  {
    title: <Translate id="member.thu">清华大学</Translate>,
    Svg: require("@site/static/img/logo.svg").default,
    description: (
      <>
        <Translate id="member.thu-discription">理事长单位</Translate>,
      </>
    ),
  },
  {
    title: <Translate id="member.thu">清华大学</Translate>,
    Svg: require("@site/static/img/logo.svg").default,
    description: (
      <>
        <Translate id="member.thu-discription">理事长单位</Translate>,
      </>
    ),
  },
  {
    title: <Translate id="member.thu">清华大学</Translate>,
    Svg: require("@site/static/img/logo.svg").default,
    description: (
      <>
        <Translate id="member.thu-discription">理事长单位</Translate>,
      </>
    ),
  },
  {
    title: <Translate id="member.thu">清华大学</Translate>,
    Svg: require("@site/static/img/logo.svg").default,
    description: (
      <>
        <Translate id="member.thu-discription">理事长单位</Translate>,
      </>
    ),
  },
  {
    title: <Translate id="member.thu">清华大学</Translate>,
    Svg: require("@site/static/img/logo.svg").default,
    description: (
      <>
        <Translate id="member.thu-discription">理事长单位</Translate>,
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--2")}>
      <div className="text--center padding-horiz--md">
        <Heading as="h5">{title}</Heading>
        <p>{description}</p>
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
