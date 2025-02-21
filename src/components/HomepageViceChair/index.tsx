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
    title: <Translate id="vice-chair.wh">王海</Translate>,
    description: (
      <Translate id="vice-chair.wh-desc">
        中国中煤能源集团有限公司首席专家
      </Translate>
    ),
  },
  {
    title: <Translate id="vice-chair.wzw">王志伟</Translate>,
    description: (
      <Translate id="vice-chair.wzw-desc">
        同济大学环境科学与工程学院院长，教授
      </Translate>
    ),
  },
  {
    title: <Translate id="vice-chair.wjx2">王建新</Translate>,
    description: (
      <Translate id="vice-chair.wjx2-desc">中国电池工业协会副会长</Translate>
    ),
  },
  {
    title: <Translate id="vice-chair.sl">石磊</Translate>,
    description: (
      <Translate id="vice-chair.sl-desc">
        南昌大学资源与环境学院院长，流域碳中和研究院院长，特聘教授
      </Translate>
    ),
  },
  {
    title: <Translate id="vice-chair.tyj">田亚峻</Translate>,
    description: (
      <Translate id="vice-chair.tyj-desc">
        中国科学院青岛生物能源与过程研究所泛能源大数据与战略研究中心主任
      </Translate>
    ),
  },
  {
    title: <Translate id="vice-chair.lzz">兰珍珍</Translate>,
    description: (
      <Translate id="vice-chair.lzz-desc">
        欧莱雅北亚及中国公共事务总裁
      </Translate>
    ),
  },
  {
    title: <Translate id="vice-chair.lm">刘猛</Translate>,
    description: (
      <Translate id="vice-chair.lm-desc">
        大连理工大学环境学院院长，教授
      </Translate>
    ),
  },
  {
    title: <Translate id="vice-chair.sj">孙捷</Translate>,
    description: (
      <Translate id="vice-chair.sj-desc">
        远景科技集团首席可持续发展官，远景智能副总裁
      </Translate>
    ),
  },
  {
    title: <Translate id="vice-chair.yg">严刚</Translate>,
    description: (
      <Translate id="vice-chair.yg-desc">
        生态环境部环境规划院副院长，研究员
      </Translate>
    ),
  },
  {
    title: <Translate id="vice-chair.lr2">李然</Translate>,
    description: (
      <Translate id="vice-chair.lr2-desc">
        阿里集团副总裁、淘天集团副总裁、阿里资产总裁
      </Translate>
    ),
  },
  {
    title: <Translate id="vice-chair.lzh">李振华</Translate>,
    description: (
      <Translate id="vice-chair.lzh-desc">
        蚂蚁科技集团股份有限公司集团研究院院长
      </Translate>
    ),
  },
  {
    title: <Translate id="vice-chair.ygd">杨国栋</Translate>,
    description: (
      <Translate id="vice-chair.ygd-desc">中国物流与采购联合会副会长</Translate>
    ),
  },
  {
    title: <Translate id="vice-chair.wjx">吴建雄</Translate>,
    description: (
      <Translate id="vice-chair.wjx-desc">上海数据集团有限公司董事长</Translate>
    ),
  },
  {
    title: <Translate id="vice-chair.zb">张波</Translate>,
    description: (
      <Translate id="vice-chair.zb-desc">
        中信控股有限责任公司执行董事兼总经理
      </Translate>
    ),
  },
  {
    title: <Translate id="vice-chair.zmh">张孟衡</Translate>,
    description: (
      <Translate id="vice-chair.zmh-desc">中国环境科学研究院总工程师</Translate>
    ),
  },
  {
    title: <Translate id="vice-chair.dyb">党彦宝</Translate>,
    description: (
      <Translate id="vice-chair.dyb-desc">宁夏宝丰集团有限公司董事长</Translate>
    ),
  },
  {
    title: <Translate id="vice-chair.xm">徐明</Translate>,
    description: (
      <Translate id="vice-chair.xm-desc">
        清华大学碳中和讲席教授，环境学院副院长
      </Translate>
    ),
  },
  {
    title: <Translate id="vice-chair.xzy">徐智煜</Translate>,
    description: (
      <Translate id="vice-chair.xzy-desc">
        荣耀终端股份有限公司高级副总裁
      </Translate>
    ),
  },
  {
    title: <Translate id="vice-chair.cy">常远</Translate>,
    description: (
      <Translate id="vice-chair.cy-desc">
        耐克体育（中国）有限公司副总裁
      </Translate>
    ),
  },
  {
    title: <Translate id="vice-chair.lr">梁锐</Translate>,
    description: (
      <Translate id="vice-chair.lr-desc">
        欣旺达电子股份有限公司副总裁兼首席可持续发展官
      </Translate>
    ),
  },
  {
    title: <Translate id="vice-chair.jl">蒋理</Translate>,
    description: (
      <Translate id="vice-chair.jl-desc">
        宁德时代新能源科技股份有限公司副总经理兼董事会秘书，可持续发展委员会主席
      </Translate>
    ),
  },
  {
    title: <Translate id="vice-chair.cyq">蔡永强</Translate>,
    description: (
      <Translate id="vice-chair.cyq-desc">华能长江环保科技公司董事长</Translate>
    ),
  },
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx("col col--3")}>
      <div className="text--center padding-horiz--md">
        <Heading as="h5">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageMembers(): ReactNode {
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
