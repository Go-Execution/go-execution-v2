import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import wpContent from "@/lib/wp-content.json";
import { site } from "@/lib/seo/site";
import { ContactForm } from "@/components/contact-form";
import {
  JsonLd,
  buildOrganization,
  buildPlace,
  buildWebSite,
  buildWebPage,
  buildBreadcrumbList,
} from "@/lib/seo/jsonld";
import { buildCaseStudyProfile, portfolioSlug } from "@/lib/portfolio-case-studies";
import styles from "./case-study.module.css";

const videoPattern = /\.(mp4|webm|ogg)(?:[?#].*)?$/i;

export function generateStaticParams() {
  return wpContent.portfolio.map((project) => ({
    slug: portfolioSlug(project.title),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = wpContent.portfolio.find((p) => portfolioSlug(p.title) === slug);
  const fallbackTitle = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  const rawTitle = project ? project.title : fallbackTitle;
  const category = project ? project.category : "Digital Project";
  const profile = buildCaseStudyProfile(rawTitle, category);
  const fullTitle = `${profile.seoTitle} | Go Execution`;
  const url = `/portfolio/${slug}/`;
  const ogImage =
    project?.image && !videoPattern.test(project.image)
      ? project.image
      : profile.contextImage || "/opengraph-image.png";

  return {
    title: { absolute: fullTitle },
    description: profile.metaDescription,
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: fullTitle,
      description: profile.metaDescription,
      url,
      type: "article",
      siteName: "Go Execution",
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${rawTitle} — Go Execution Case Study` }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: profile.metaDescription,
      images: [ogImage],
    },
  };
}

export default async function PortfolioCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = wpContent.portfolio.find((p) => portfolioSlug(p.title) === slug);
  const fallbackTitle = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const title = project ? project.title : fallbackTitle;
  const category = project ? project.category : "Digital Project";
  const image = project ? project.image : "/assets/images/real/technology-saas.jpeg";
  const isVideo = videoPattern.test(image);

  const profile = buildCaseStudyProfile(title, category);
  const services = Object.values(wpContent.services).map((service) => service.title);

  const relatedProjects = wpContent.portfolio
    .filter((p) => p.category === category && portfolioSlug(p.title) !== slug)
    .slice(0, 3);

  if (relatedProjects.length < 3) {
    const additional = wpContent.portfolio.filter(
      (p) => portfolioSlug(p.title) !== slug && !relatedProjects.includes(p)
    );
    relatedProjects.push(...additional.slice(0, 3 - relatedProjects.length));
  }

  const pagePath = `/portfolio/${slug}/`;
  const fullTitle = `${profile.seoTitle} | Go Execution`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganization(),
      buildPlace(),
      buildWebSite(),
      buildWebPage({ path: pagePath, title: fullTitle }),
      buildBreadcrumbList([
        { name: "Home", url: "/" },
        { name: "Portfolio", url: "/portfolio/" },
        { name: title, url: pagePath },
      ]),
      {
        "@type": "Article",
        "@id": `${site.url}${pagePath}#case-study`,
        headline: profile.seoTitle,
        name: `${title} — ${profile.service}`,
        description: profile.metaDescription,
        articleSection: category,
        keywords: profile.techStack.join(", "),
        inLanguage: "en-US",
        mainEntityOfPage: { "@id": `${site.url}${pagePath}#webpage` },
        author: { "@id": `${site.url}/#organization` },
        publisher: { "@id": `${site.url}/#organization` },
        about: {
          "@type": "Thing",
          name: profile.industry,
        },
        image: `${site.url}${!isVideo ? image : profile.contextImage}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={schema} />
      <main id="primary" className={`site-main ${styles.page}`}>
        {/* 1. EDITORIAL PROJECT DETAILS HERO */}
        <header className={styles.hero}>
          <div className="ge-container">
            <div className={styles.topBar}>
              <div className={styles.emblemWrap}>
                <span className={styles.emblem} aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" strokeOpacity="0.35" />
                    <polyline points="8 12.5 11 15.5 16.5 9.5" />
                  </svg>
                </span>
                <Link href="/portfolio/" className={styles.backLink}>
                  <span aria-hidden="true">←</span> Back to Portfolio
                </Link>
              </div>
              <span className={styles.dateMeta}>CASE STUDY · {profile.year}</span>
            </div>

            <div className={styles.titleRow}>
              <h1 className={styles.title}>{title}</h1>
              <p className={styles.dateMeta}>{category}</p>
            </div>

            <div className={styles.detailsSplit}>
              <p className={styles.detailsLabel}>PROJECT DETAILS:</p>
              <div className={styles.detailsRight}>
                <p className={styles.leadSummary}>{profile.summary}</p>
                <dl className={styles.metaList}>
                  <div className={styles.metaRow}>
                    <dt>CLIENT:</dt>
                    <dd>{profile.client}</dd>
                  </div>
                  <div className={styles.metaRow}>
                    <dt>INDUSTRY:</dt>
                    <dd>{profile.industry}</dd>
                  </div>
                  <div className={styles.metaRow}>
                    <dt>SERVICE:</dt>
                    <dd>{profile.service}</dd>
                  </div>
                  <div className={styles.metaRow}>
                    <dt>TIMELINE:</dt>
                    <dd>{profile.timeline}</dd>
                  </div>
                  <div className={styles.metaRow}>
                    <dt>STACK &amp; METHODS:</dt>
                    <dd>
                      <ul className={styles.techStackList} aria-label="Technologies and methods used">
                        {profile.techStack.map((tech) => (
                          <li key={tech} className={styles.techChip}>
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className={styles.heroStage}>
              {isVideo ? (
                <video
                  className={styles.stageMedia}
                  src={image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label={`${title} showcase video`}
                />
              ) : (
                <Image
                  className={styles.stageMedia}
                  src={image}
                  alt={`${title} — ${profile.service} case study by Go Execution`}
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1240px"
                />
              )}
            </div>
          </div>
        </header>

        {/* 2. EDITORIAL NARRATIVE & SHOWCASE BENTO */}
        <section className={styles.narrativeSection} aria-label="Case study breakdown">
          <div className="ge-container">
            <div className={styles.statementWrap}>
              <p className={styles.statement}>{profile.statement}</p>
            </div>

            <div className={styles.dualGallery}>
              <div className={styles.contextCard}>
                <Image
                  className={styles.contextImg}
                  src={profile.contextImage}
                  alt={`${profile.industry} sector context for ${title}`}
                  fill
                  sizes="(max-width: 980px) 100vw, 610px"
                />
                <div className={styles.contextOverlay}>
                  <span>Sector Focus</span>
                  <span>{profile.industry}</span>
                </div>
              </div>

              <div className={styles.metricsBoard}>
                <div className={styles.boardHeader}>
                  <span className={styles.boardEyebrow}>Execution Benchmarks</span>
                  <span className={styles.boardTag}>{profile.timeline}</span>
                </div>

                <div className={styles.metricsGrid}>
                  {profile.metrics.map((metric) => (
                    <div className={styles.metricItem} key={metric.label}>
                      <strong>{metric.value}</strong>
                      <span>{metric.label}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.boardFooter}>
                  <span>Engineered by <b>Go Execution</b></span>
                  <span>Dallas, TX · Nationwide</span>
                </div>
              </div>
            </div>

            {/* Offset Right Narrative: Challenge / Approach / Key Deliverables */}
            <div className={styles.offsetRightGrid}>
              <div className={styles.offsetRail} aria-hidden="true">
                <span className={styles.railSticky}>
                  <i className={styles.railDot} />
                  01 — Strategy &amp; Scope
                </span>
              </div>

              <div className={styles.storyStack}>
                <article className={styles.storyBlock}>
                  <h2>The Challenge</h2>
                  {profile.challenge.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </article>

                <article className={styles.storyBlock}>
                  <h2>Our Approach</h2>
                  {profile.approach.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </article>

                <article className={styles.storyBlock}>
                  <h2>Key Deliverables</h2>
                  <p>{profile.deliverablesIntro}</p>
                  <ul className={styles.deliverablesList}>
                    {profile.deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </div>

            {/* 1-Over-2 Studio Presentation & Execution Pillars */}
            <div className={styles.bentoShowcase}>
              <div className={styles.browserFrame}>
                <div className={styles.browserChrome} aria-hidden="true">
                  <span className={styles.browserDots}>
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className={styles.browserUrl}>
                    goexecution.com / portfolio / {slug}
                  </span>
                </div>
                <div className={styles.browserViewport}>
                  {isVideo ? (
                    <video
                      className={styles.browserMedia}
                      src={image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      aria-label={`${title} detail playback`}
                    />
                  ) : (
                    <Image
                      className={styles.browserMedia}
                      src={image}
                      alt={`${title} interface and creative execution detail`}
                      fill
                      sizes="(max-width: 1280px) 100vw, 1240px"
                    />
                  )}
                </div>
              </div>

              <div className={styles.pillarPair}>
                <article className={styles.pillarCard}>
                  <span className={styles.pillarIndex}>{profile.pillars[0].index}</span>
                  <div>
                    <h3>{profile.pillars[0].title}</h3>
                    <p>{profile.pillars[0].copy}</p>
                  </div>
                </article>

                <article className={`${styles.pillarCard} ${styles.pillarCardDark}`}>
                  <span className={styles.pillarIndex}>{profile.pillars[1].index}</span>
                  <div>
                    <h3>{profile.pillars[1].title}</h3>
                    <p>{profile.pillars[1].copy}</p>
                  </div>
                </article>
              </div>
            </div>

            {/* Left-Aligned Outcome, Final Thoughts & Project Q&A */}
            <div className={styles.offsetLeftGrid}>
              <div className={styles.storyStack}>
                <article className={styles.storyBlock}>
                  <h2>The Outcome</h2>
                  <p>{profile.outcome}</p>
                </article>

                <article className={styles.storyBlock}>
                  <h2>Final Thoughts</h2>
                  <p>{profile.finalThoughts}</p>
                </article>

                {profile.faqs.length > 0 && (
                  <article className={styles.storyBlock}>
                    <h2>Project Architecture Q&amp;A</h2>
                    <div className={styles.faqList}>
                      {profile.faqs.map((faq) => (
                        <div className={styles.faqCard} key={faq.question}>
                          <h3>{faq.question}</h3>
                          <p>{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </article>
                )}
              </div>

              <div className={styles.offsetRail} aria-hidden="true">
                <span className={styles.railSticky}>
                  <i className={styles.railDot} />
                  02 — Impact &amp; Insights
                </span>
              </div>
            </div>

            {/* Contextual Internal Linking Silo: Capabilities & Industry Playbooks */}
            {profile.relatedLinks.length > 0 && (
              <div className={styles.siloBar}>
                <div className={styles.siloHeader}>
                  <span className={styles.siloEyebrow}>Related Capabilities &amp; Sector Playbooks</span>
                  <p className={styles.siloSub}>
                    Explore the specialized engineering, search, and creative practices behind {title}.
                  </p>
                </div>
                <div className={styles.siloGrid}>
                  {profile.relatedLinks.map((link) => (
                    <Link href={link.href} key={link.href} className={styles.siloCard}>
                      <span className={styles.siloContext}>{link.context}</span>
                      <strong className={styles.siloLabel}>{link.label}</strong>
                      <span className={styles.siloArrow} aria-hidden="true">
                        Explore Practice →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 3. EXPLORE MORE PROJECTS (OXNOD SPLIT CARDS) */}
        <section className={styles.moreSection} aria-labelledby="explore-more-projects">
          <div className="ge-container">
            <div className={styles.sectionTopRule}>
              <span className={styles.ruleLabel}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
                PROJECTS
              </span>
              <span className={styles.ruleHandle}>@GOEXECUTION</span>
            </div>

            <h2 id="explore-more-projects" className={styles.moreHeading}>
              Explore more projects
            </h2>

            <div className={styles.relatedStack}>
              {relatedProjects.map((item) => {
                const itemSlug = portfolioSlug(item.title);
                const itemProfile = buildCaseStudyProfile(item.title, item.category);
                const itemIsVideo = videoPattern.test(item.image);
                const initials = item.title
                  .split(/\s+/)
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join("")
                  .toUpperCase();

                return (
                  <article className={styles.relatedRow} key={itemSlug}>
                    <div className={styles.relatedInfoCard}>
                      <div>
                        <div className={styles.relatedBrandRow}>
                          <span className={styles.relatedBadge} aria-hidden="true">
                            {initials}
                          </span>
                          <h3>{item.title}</h3>
                        </div>
                        <p className={styles.relatedSummary}>{itemProfile.summary}</p>

                        <div className={styles.relatedMetaGroup}>
                          <div className={styles.relatedMetaItem}>
                            <span>SERVICE:</span>
                            <strong>{item.category}</strong>
                          </div>
                          <div className={styles.relatedMetaItem}>
                            <span>INDUSTRY:</span>
                            <strong>{itemProfile.industry}</strong>
                          </div>
                        </div>
                      </div>

                      <Link href={`/portfolio/${itemSlug}/`} className={styles.viewDetailsLink}>
                        <span aria-hidden="true">→|</span> VIEW DETAILS
                      </Link>
                    </div>

                    <Link
                      href={`/portfolio/${itemSlug}/`}
                      className={styles.relatedMediaCard}
                      aria-label={`Open ${item.title} case study`}
                    >
                      {itemIsVideo ? (
                        <video
                          className={styles.relatedMedia}
                          src={item.image}
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      ) : (
                        <Image
                          className={styles.relatedMedia}
                          src={item.image}
                          alt={`${item.title} case study preview`}
                          fill
                          sizes="(max-width: 980px) 100vw, 610px"
                        />
                      )}
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. CLOSING SPLIT CTA WITH DIRECT CONSULTATION FORM */}
        <section className={styles.closingCta} aria-labelledby="case-study-cta-heading">
          <div className="ge-container">
            <div className={styles.closingTopRule}>
              <span className={styles.closingRuleLabel}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                GET STARTED NOW
              </span>
              <span className={styles.closingRuleHandle}>@GOEXECUTION</span>
            </div>

            <div className={styles.closingGrid}>
              <div className={styles.closingLeft}>
                <h2 id="case-study-cta-heading">
                  Let&rsquo;s make something impossible to ignore.
                </h2>
                <p>
                  Let&rsquo;s build a distinctive digital platform and growth engine that turns ambitious goals into measurable commercial results.
                </p>

                <div className={styles.studioCard}>
                  <span className={styles.studioRole}>Strategy &amp; Engineering Desk</span>
                  <strong className={styles.studioName}>Go Execution Studio</strong>
                  <div className={styles.studioLinks}>
                    <a href={`mailto:${site.email}`}>{site.displayEmail || site.email}</a>
                    <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}>{site.phone}</a>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=13345+N+Central+Expy,+Suite+203,+Dallas,+Texas+75243"
                      target="_blank"
                      rel="noreferrer"
                    >
                      13345 N Central Expy, Suite #203, Dallas, TX 75243
                    </a>
                  </div>
                </div>

                <div className={styles.closingActions}>
                  <Link href="/portfolio/" className="ge-button ge-button--gold">
                    <span>Explore All Projects</span>
                  </Link>
                </div>
              </div>

              <div className={styles.formShell}>
                <ContactForm services={services} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
