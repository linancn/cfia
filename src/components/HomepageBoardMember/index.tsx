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
    title: <Translate id="board-member.dn">丁宁</Translate>,
    description: (
      <Translate id="board-member.dn-desc">
        中国科学院生态环境研究中心副研究员
      </Translate>
    ),
  },
  {
    title: <Translate id="board-member.wyt">王玉涛</Translate>,
    description: (
      <Translate id="board-member.wyt-desc">
        复旦大学环境科学与工程系教授，上海能源与碳中和战略研究院副院长
      </Translate>
    ),
  },
  {
    title: <Translate id="board-member.whm">王鹤鸣</Translate>,
    description: (
      <Translate id="board-member.whm-desc">东北大学冶金学院教授</Translate>
    ),
  },
  {
    title: <Translate id="board-member.fk">方恺</Translate>,
    description: (
      <Translate id="board-member.fk-desc">
        浙江大学公共管理学院长聘教授，国家高端智库副主任
      </Translate>
    ),
  },
  {
    title: <Translate id="board-member.lh">刘华</Translate>,
    description: (
      <Translate id="board-member.lh-desc">
        中国华电集团有限公司市场营销部副总监
      </Translate>
    ),
  },
  {
    title: <Translate id="board-member.lgy">刘耕源</Translate>,
    description: (
      <Translate id="board-member.lgy-desc">
        北京师范大学环境学院副院长，教授
      </Translate>
    ),
  },
  {
    title: <Translate id="board-member.sy">孙悦</Translate>,
    description: (
      <Translate id="board-member.sy-desc">
        北京金风零碳能源有限公司副总经理
      </Translate>
    ),
  },
  {
    title: <Translate id="board-member.sl2">孙露</Translate>,
    description: (
      <Translate id="board-member.sl2-desc">
        西安交通大学人居环境与建筑工程学院副教授
      </Translate>
    ),
  },
  {
    title: <Translate id="board-member.lsb">李少斌</Translate>,
    description: (
      <Translate id="board-member.lsb-desc">
        厦门大学环境与生态学院副教授
      </Translate>
    ),
  },
  {
    title: <Translate id="board-member.ljs">李佳硕</Translate>,
    description: (
      <Translate id="board-member.ljs-desc">
        山东大学威海前沿交叉科学研究院教授
      </Translate>
    ),
  },
  {
    title: <Translate id="board-member.xzx">肖忠湘</Translate>,
    description: (
      <Translate id="board-member.xzx-desc">
        惠州亿纬锂能股份有限公司ESG双碳部总经理
      </Translate>
    ),
  },
  {
    title: <Translate id="board-member.wy">吴莹</Translate>,
    description: (
      <Translate id="board-member.wy-desc">
        隆基绿能科技股份有限公司中国地区部副总裁
      </Translate>
    ),
  },
  {
    title: <Translate id="board-member.sjn">宋俊年</Translate>,
    description: (
      <Translate id="board-member.sjn-desc">
        吉林大学新能源与环境学院教授
      </Translate>
    ),
  },
  {
    title: <Translate id="board-member.zyl">张玉莲</Translate>,
    description: (
      <Translate id="board-member.zyl-desc">
        梅赛德斯—奔驰（中国）投资有限公司产品可持续发展高级经理
      </Translate>
    ),
  },
  {
    title: <Translate id="board-member.cy">陈一</Translate>,
    description: (
      <Translate id="board-member.cy-desc">
        重庆大学环境与生态学院副院长，教授
      </Translate>
    ),
  },
  {
    title: <Translate id="board-member.ct">陈坦</Translate>,
    description: (
      <Translate id="board-member.ct-desc">
        中央民族大学生命与环境科学学院副院长，副教授
      </Translate>
    ),
  },
  {
    title: <Translate id="board-member.ct2">陈霆</Translate>,
    description: (
      <Translate id="board-member.ct2-desc">小米通讯技术有限公司总监</Translate>
    ),
  },
  {
    title: <Translate id="board-member.cwq">陈伟强</Translate>,
    description: (
      <Translate id="board-member.cwq-desc">
        中国科学院城市环境研究所研究员
      </Translate>
    ),
  },
  {
    title: <Translate id="board-member.wyb">武延兵</Translate>,
    description: (
      <Translate id="board-member.wyb-desc">
        京东方科技集团股份有限公司MNT SBU副总经理
      </Translate>
    ),
  },
  {
    title: <Translate id="board-member.my">孟毅</Translate>,
    description: (
      <Translate id="board-member.my-desc">
        内蒙古伊利实业集团股份有限公司低碳发展总监
      </Translate>
    ),
  },
  {
    title: <Translate id="board-member.mdh">孟大海</Translate>,
    description: (
      <Translate id="board-member.mdh-desc">
        蔚来控股有限公司产品环保及可持续团队负责人，总监
      </Translate>
    ),
  },
  {
    title: <Translate id="board-member.dhb">段华波</Translate>,
    description: (
      <Translate id="board-member.dhb-desc">
        华中科技大学环境科学与工程学院副教授
      </Translate>
    ),
  },
  {
    title: <Translate id="board-member.yss">袁闪闪</Translate>,
    description: (
      <Translate id="board-member.yss-desc">
        中国建筑科学研究院有限公司建科环境科技有限公司副总经理
      </Translate>
    ),
  },
  {
    title: <Translate id="board-member.xcq">徐常青</Translate>,
    description: (
      <Translate id="board-member.xcq-desc">
        北京理工大学经济学院副教授
      </Translate>
    ),
  },
  {
    title: <Translate id="board-member.cz">曹植</Translate>,
    description: (
      <Translate id="board-member.cz-desc">
        南开大学环境科学与工程学院教授
      </Translate>
    ),
  },
  {
    title: <Translate id="board-member.gxz">龚先政</Translate>,
    description: (
      <Translate id="board-member.gxz-desc">北京工业大学材料学院教授</Translate>
    ),
  },
  {
    title: <Translate id="board-member.czj">程占军</Translate>,
    description: (
      <Translate id="board-member.czj-desc">
        天津大学环境科学与工程学院副院长，教授
      </Translate>
    ),
  },
  {
    title: <Translate id="board-member.dy">窦燕</Translate>,
    description: (
      <Translate id="board-member.dy-desc">
        TCL华星光电技术有限公司副总裁
      </Translate>
    ),
  },
  {
    title: <Translate id="board-member.xdq">薛丁琪</Translate>,
    description: (
      <Translate id="board-member.xdq-desc">
        中联重科股份有限公司焊接技术研究所所长
      </Translate>
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

export default function HomepageBoardMember(): ReactNode {
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
