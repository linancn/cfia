import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import { translate } from "@docusaurus/Translate";

import styles from "./cooperation.module.css";

const collaborationTracks = [
  {
    title: translate({
      id: "cooperation.tracks.research.title",
      message: "",
    }),
    desc: translate({
      id: "cooperation.tracks.research.desc",
      message: "",
    }),
  },
  {
    title: translate({
      id: "cooperation.tracks.opensource.title",
      message: "",
    }),
    desc: translate({
      id: "cooperation.tracks.opensource.desc",
      message: "",
    }),
  },
  {
    title: translate({
      id: "cooperation.tracks.events.title",
      message: "",
    }),
    desc: translate({
      id: "cooperation.tracks.events.desc",
      message: "",
    }),
  },
  {
    title: translate({
      id: "cooperation.tracks.international.title",
      message: "",
    }),
    desc: translate({
      id: "cooperation.tracks.international.desc",
      message: "",
    }),
  },
];

const openProjects = [
  {
    title: translate({
      id: "cooperation.projects.tiangong3.title",
      message: "",
    }),
    type: translate({
      id: "cooperation.projects.tiangong3.type",
      message: "",
    }),
    focus: translate({
      id: "cooperation.projects.tiangong3.focus",
      message: "",
    }),
    funding: translate({
      id: "cooperation.projects.tiangong3.funding",
      message: "",
    }),
    benefit: translate({
      id: "cooperation.projects.tiangong3.benefit",
      message: "",
    }),
    deadline: translate({
      id: "cooperation.projects.tiangong3.deadline",
      message: "",
    }),
    status: translate({
      id: "cooperation.projects.tiangong3.status",
      message: "",
    }),
  },
  {
    title: translate({
      id: "cooperation.projects.opensource.title",
      message: "",
    }),
    type: translate({
      id: "cooperation.projects.opensource.type",
      message: "",
    }),
    focus: translate({
      id: "cooperation.projects.opensource.focus",
      message: "",
    }),
    funding: translate({
      id: "cooperation.projects.opensource.funding",
      message: "",
    }),
    benefit: translate({
      id: "cooperation.projects.opensource.benefit",
      message: "",
    }),
    deadline: translate({
      id: "cooperation.projects.opensource.deadline",
      message: "",
    }),
    status: translate({
      id: "cooperation.projects.opensource.status",
      message: "",
    }),
  },
];

const processSteps = [
  {
    title: translate({
      id: "cooperation.process.submit.title",
      message: "",
    }),
    desc: translate({
      id: "cooperation.process.submit.desc",
      message: "",
    }),
  },
  {
    title: translate({
      id: "cooperation.process.review.title",
      message: "",
    }),
    desc: translate({
      id: "cooperation.process.review.desc",
      message: "",
    }),
  },
  {
    title: translate({
      id: "cooperation.process.sign.title",
      message: "",
    }),
    desc: translate({
      id: "cooperation.process.sign.desc",
      message: "",
    }),
  },
  {
    title: translate({
      id: "cooperation.process.manage.title",
      message: "",
    }),
    desc: translate({
      id: "cooperation.process.manage.desc",
      message: "",
    }),
  },
  {
    title: translate({
      id: "cooperation.process.deliver.title",
      message: "",
    }),
    desc: translate({
      id: "cooperation.process.deliver.desc",
      message: "",
    }),
  },
];

export default function Cooperation(): ReactNode {
  return (
    <Layout
      title={translate({
        id: "cooperation.page.title",
        message: "",
      })}
      description={translate({
        id: "cooperation.page.description",
        message: "",
      })}
    >
      <div className={styles.page}>
        <section className={styles.hero}>
          <div className={clsx("container", styles.heroContent)}>
            <div>
              <p className={styles.heroEyebrow}>
                {translate({
                  id: "cooperation.hero.eyebrow",
                  message: "",
                })}
              </p>
              <Heading as="h1" className={styles.heroTitle}>
                {translate({
                  id: "cooperation.hero.title",
                  message: "",
                })}
              </Heading>
              <p className={styles.heroLead}>
                {translate({
                  id: "cooperation.hero.lead",
                  message: "",
                })}
              </p>
              <div className={styles.heroActions}>
                <Link className={clsx("button", styles.primaryButton)} to="#projects">
                  {translate({
                    id: "cooperation.hero.primaryCta",
                    message: "",
                  })}
                </Link>
                <Link className={clsx("button", styles.secondaryButton)} to="mailto:project@carbonfootprint.network">
                  {translate({
                    id: "cooperation.hero.secondaryCta",
                    message: "",
                  })}
                </Link>
              </div>
            </div>
            <div className={styles.heroCard}>
              <p className={styles.heroCardTitle}>
                {translate({
                  id: "cooperation.hero.cardTitle",
                  message: "",
                })}
              </p>
              <ul className={styles.heroCardList}>
                <li>
                  {translate({
                    id: "cooperation.hero.cardItem1",
                    message: "",
                  })}
                </li>
                <li>
                  {translate({
                    id: "cooperation.hero.cardItem2",
                    message: "",
                  })}
                </li>
                <li>
                  {translate({
                    id: "cooperation.hero.cardItem3",
                    message: "",
                  })}
                </li>
              </ul>
              <div className={styles.heroCardFootnote}>
                {translate({
                  id: "cooperation.hero.cardFootnote",
                  message: "",
                })}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <Heading as="h2" className={styles.sectionTitle}>
              {translate({
                id: "cooperation.section.tracks.title",
                message: "",
              })}
            </Heading>
            <p className={styles.sectionLead}>
              {translate({
                id: "cooperation.section.tracks.lead",
                message: "",
              })}
            </p>
            <div className={styles.trackGrid}>
              {collaborationTracks.map((track) => (
                <div key={track.title} className={styles.trackCard}>
                  <Heading as="h3" className={styles.cardTitle}>
                    {track.title}
                  </Heading>
                  <p className={styles.cardDesc}>{track.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <Heading as="h2" className={styles.sectionTitle}>
              {translate({
                id: "cooperation.section.projects.title",
                message: "",
              })}
            </Heading>
            <p className={styles.sectionLead}>
              {translate({
                id: "cooperation.section.projects.lead",
                message: "",
              })}
            </p>
            <div className={styles.projectGrid}>
              {openProjects.map((project) => (
                <article key={project.title} className={styles.projectCard}>
                  <div className={styles.projectHeader}>
                    <span className={styles.projectType}>{project.type}</span>
                    <span className={styles.projectStatus}>{project.status}</span>
                  </div>
                  <Heading as="h3" className={styles.projectTitle}>
                    {project.title}
                  </Heading>
                  <p className={styles.projectDesc}>{project.focus}</p>
                  <dl className={styles.projectDetails}>
                    <div>
                      <dt>
                        {translate({
                          id: "cooperation.section.projects.fundingLabel",
                          message: "",
                        })}
                      </dt>
                      <dd>{project.funding}</dd>
                    </div>
                    <div>
                      <dt>
                        {translate({
                          id: "cooperation.section.projects.benefitLabel",
                          message: "",
                        })}
                      </dt>
                      <dd>{project.benefit}</dd>
                    </div>
                    <div>
                      <dt>
                        {translate({
                          id: "cooperation.section.projects.deadlineLabel",
                          message: "",
                        })}
                      </dt>
                      <dd>{project.deadline}</dd>
                    </div>
                  </dl>
                  <Link className={styles.projectLink} to="mailto:project@carbonfootprint.network">
                    {translate({
                      id: "cooperation.section.projects.cta",
                      message: "",
                    })}
                  </Link>
                </article>
              ))}
            </div>
            <p className={styles.sectionFootnote}>
              {translate({
                id: "cooperation.section.projects.footnote",
                message: "",
              })}
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <Heading as="h2" className={styles.sectionTitle}>
              {translate({
                id: "cooperation.section.process.title",
                message: "",
              })}
            </Heading>
            <div className={styles.processGrid}>
              {processSteps.map((step, index) => (
                <div key={step.title} className={styles.processCard}>
                  <div className={styles.processIndex}>{String(index + 1).padStart(2, "0")}</div>
                  <Heading as="h3" className={styles.cardTitle}>
                    {step.title}
                  </Heading>
                  <p className={styles.cardDesc}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <Heading as="h2" className={styles.sectionTitle}>
              {translate({
                id: "cooperation.section.compliance.title",
                message: "",
              })}
            </Heading>
            <div className={styles.complianceGrid}>
              <div className={styles.complianceCard}>
                <Heading as="h3" className={styles.cardTitle}>
                  {translate({
                    id: "cooperation.section.compliance.open.title",
                    message: "",
                  })}
                </Heading>
                <p className={styles.cardDesc}>
                  {translate({
                    id: "cooperation.section.compliance.open.desc",
                    message: "",
                  })}
                </p>
              </div>
              <div className={styles.complianceCard}>
                <Heading as="h3" className={styles.cardTitle}>
                  {translate({
                    id: "cooperation.section.compliance.legal.title",
                    message: "",
                  })}
                </Heading>
                <p className={styles.cardDesc}>
                  {translate({
                    id: "cooperation.section.compliance.legal.desc",
                    message: "",
                  })}
                </p>
              </div>
              <div className={styles.complianceCard}>
                <Heading as="h3" className={styles.cardTitle}>
                  {translate({
                    id: "cooperation.section.compliance.results.title",
                    message: "",
                  })}
                </Heading>
                <p className={styles.cardDesc}>
                  {translate({
                    id: "cooperation.section.compliance.results.desc",
                    message: "",
                  })}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className={clsx("container", styles.ctaContent)}>
            <div>
              <Heading as="h2" className={styles.ctaTitle}>
                {translate({
                  id: "cooperation.section.cta.title",
                  message: "",
                })}
              </Heading>
              <p className={styles.ctaDesc}>
                {translate({
                  id: "cooperation.section.cta.desc",
                  message: "",
                })}
              </p>
            </div>
            <Link className={clsx("button", styles.primaryButton)} to="mailto:project@carbonfootprint.network">
              {translate({
                id: "cooperation.section.cta.email",
                message: "",
              })}
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
