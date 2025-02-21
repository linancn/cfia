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
    Svg: require("@site/static/img/homepage/logo-1-critic.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-2-huaneng.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-3-huadian.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-4-spic.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-5-china-coal.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-6-cfgc.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-7-cabr.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-8-baic.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-9-shanghai-data.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-10-alibaba.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-11-ant-group.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-12-baofeng-group.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-13-boe.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-14-catl.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-15-envision.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-16-eve-energy.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-17-goldwine.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-18-hornor.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-19-longi.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-20-xiaomi.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-21-nio.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-22-sunwoda.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-23-tcl.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-24-yili.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-25-zoomlion.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-26-deloittte.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-27-loreal.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-28-mercedes-benz.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-29-nike.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-30-cflp.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-31-cbia.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-32-caep.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-33-creas.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-34-bit.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-35-bnu.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-36-cqu.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-37-dut.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-38-fdu.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-39-hust.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-40-jlu.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-41-nku.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-42-sdu.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-43-zju.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-44-tju.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-45-tongji.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-46-xjtu.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-47-xmu.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-48-enu.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-49-muc.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-50-bjut.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-51-ncu.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-52-iue-cas.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-53-qibect-cas.svg").default,
  },
  {
    Svg: require("@site/static/img/homepage/logo-54-rcees-cas.svg").default,
  },
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
