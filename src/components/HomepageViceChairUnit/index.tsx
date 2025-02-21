import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import Translate, { translate } from "@docusaurus/Translate";

type FeatureItem = {
  img: string;
  height: string;
  width: string;
};

const FeatureList: FeatureItem[] = [
  {
    img: require("@site/static/img/homepage/logo-1-critic.png").default,
    height: "90px",
    width: "90px",
  },
  {
    img: require("@site/static/img/homepage/logo-2-huaneng.png").default,
    height: "40px",
    width: "120px",
  },
  {
    img: require("@site/static/img/homepage/logo-3-huadian.png").default,
    height: "23px",
    width: "180px",
  },
  {
    img: require("@site/static/img/homepage/logo-4-spic.png").default,
    height: "45px",
    width: "120px",
  },
  {
    img: require("@site/static/img/homepage/logo-5-china-coal.png").default,
    height: "30px",
    width: "120px",
  },
  {
    img: require("@site/static/img/homepage/logo-6-cfgc.png").default,
    height: "25px",
    width: "160px",
  },
  {
    img: require("@site/static/img/homepage/logo-7-cabr.png").default,
    height: "30px",
    width: "160px",
  },
  {
    img: require("@site/static/img/homepage/logo-8-baic.png").default,
    height: "40px",
    width: "100px",
  },
  {
    img: require("@site/static/img/homepage/logo-9-shanghai-data.png").default,
    height: "25px",
    width: "180px",
  },
  {
    img: require("@site/static/img/homepage/logo-10-alibaba.png").default,
    height: "35px",
    width: "120px",
  },
  {
    img: require("@site/static/img/homepage/logo-11-ant-group.png").default,
    height: "40px",
    width: "120px",
  },
  {
    img: require("@site/static/img/homepage/logo-12-baofeng-group.png").default,
    height: "65px",
    width: "100px",
  },
  {
    img: require("@site/static/img/homepage/logo-13-boe.png").default,
    height: "40px",
    width: "90px",
  },
  {
    img: require("@site/static/img/homepage/logo-14-catl.png").default,
    height: "50px",
    width: "120px",
  },
  {
    img: require("@site/static/img/homepage/logo-15-envision.png").default,
    height: "35px",
    width: "130px",
  },
  {
    img: require("@site/static/img/homepage/logo-16-eve-energy.png").default,
    height: "30px",
    width: "120px",
  },
  {
    img: require("@site/static/img/homepage/logo-17-goldwine.png").default,
    height: "30px",
    width: "120px",
  },
  {
    img: require("@site/static/img/homepage/logo-18-hornor.png").default,
    height: "25px",
    width: "120px",
  },
  {
    img: require("@site/static/img/homepage/logo-19-longi.png").default,
    height: "40px",
    width: "100px",
  },
  {
    img: require("@site/static/img/homepage/logo-20-xiaomi.png").default,
    height: "60px",
    width: "60px",
  },
  {
    img: require("@site/static/img/homepage/logo-21-nio.png").default,
    height: "45px",
    width: "120px",
  },
  {
    img: require("@site/static/img/homepage/logo-22-sunwoda.png").default,
    height: "50px",
    width: "120px",
  },
  {
    img: require("@site/static/img/homepage/logo-23-tcl.png").default,
    height: "40px",
    width: "120px",
  },
  {
    img: require("@site/static/img/homepage/logo-24-yili.png").default,
    height: "70px",
    width: "100px",
  },
  {
    img: require("@site/static/img/homepage/logo-25-zoomlion.png").default,
    height: "50px",
    width: "120px",
  },
  {
    img: require("@site/static/img/homepage/logo-26-deloittte.png").default,
    height: "30px",
    width: "120px",
  },
  {
    img: require("@site/static/img/homepage/logo-27-loreal.png").default,
    height: "40px",
    width: "120px",
  },
  {
    img: require("@site/static/img/homepage/logo-28-mercedes-benz.png").default,
    height: "60px",
    width: "100px",
  },
  {
    img: require("@site/static/img/homepage/logo-29-nike.png").default,
    height: "40px",
    width: "100px",
  },
  {
    img: require("@site/static/img/homepage/logo-30-cflp.png").default,
    height: "40px",
    width: "160px",
  },
  {
    img: require("@site/static/img/homepage/logo-31-cbia.png").default,
    height: "25px",
    width: "150px",
  },
  {
    img: require("@site/static/img/homepage/logo-32-caep.png").default,
    height: "70px",
    width: "90px",
  },
  {
    img: require("@site/static/img/homepage/logo-33-creas.png").default,
    height: "75px",
    width: "75px",
  },
  {
    img: require("@site/static/img/homepage/logo-34-bit.png").default,
    height: "75px",
    width: "75px",
  },
  {
    img: require("@site/static/img/homepage/logo-35-bnu.png").default,
    height: "75px",
    width: "75px",
  },
  {
    img: require("@site/static/img/homepage/logo-36-cqu.png").default,
    height: "75px",
    width: "75px",
  },
  {
    img: require("@site/static/img/homepage/logo-37-dut.png").default,
    height: "75px",
    width: "75px",
  },
  {
    img: require("@site/static/img/homepage/logo-38-fdu.png").default,
    height: "75px",
    width: "75px",
  },
  {
    img: require("@site/static/img/homepage/logo-39-hust.png").default,
    height: "80px",
    width: "100px",
  },
  {
    img: require("@site/static/img/homepage/logo-40-jlu.png").default,
    height: "75px",
    width: "75px",
  },
  {
    img: require("@site/static/img/homepage/logo-41-nku.png").default,
    height: "75px",
    width: "75px",
  },
  {
    img: require("@site/static/img/homepage/logo-42-sdu.png").default,
    height: "75px",
    width: "75px",
  },
  {
    img: require("@site/static/img/homepage/logo-43-zju.png").default,
    height: "75px",
    width: "75px",
  },
  {
    img: require("@site/static/img/homepage/logo-44-tju.png").default,
    height: "75px",
    width: "75px",
  },
  {
    img: require("@site/static/img/homepage/logo-45-tongji.png").default,
    height: "75px",
    width: "75px",
  },
  {
    img: require("@site/static/img/homepage/logo-46-xjtu.png").default,
    height: "75px",
    width: "75px",
  },
  {
    img: require("@site/static/img/homepage/logo-47-xmu.png").default,
    height: "75px",
    width: "75px",
  },
  {
    img: require("@site/static/img/homepage/logo-48-enu.png").default,
    height: "75px",
    width: "75px",
  },
  {
    img: require("@site/static/img/homepage/logo-49-muc.png").default,
    height: "75px",
    width: "75px",
  },
  {
    img: require("@site/static/img/homepage/logo-50-bjut.png").default,
    height: "75px",
    width: "75px",
  },
  {
    img: require("@site/static/img/homepage/logo-51-ncu.png").default,
    height: "75px",
    width: "75px",
  },
  {
    img: require("@site/static/img/homepage/logo-52-iue-cas.png").default,
    height: "75px",
    width: "75px",
  },
  {
    img: require("@site/static/img/homepage/logo-53-qibect-cas.png").default,
    height: "75px",
    width: "75px",
  },
  {
    img: require("@site/static/img/homepage/logo-54-rcees-cas.png").default,
    height: "60px",
    width: "60px",
  },
];

function Feature({ img, height, width }: FeatureItem) {
  return (
    <div className={clsx("col col--2", styles.feature)}>
      <div className="text--center">
        <img
          className={styles.featureSvg}
          src={img}
          role="img"
          style={{ height, width }}
        />
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
