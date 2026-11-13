import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, getSubServicesForCategory, serviceCategories } from "@/lib/services";
import { blogPosts, formatBlogDate } from "@/lib/blog-posts";
import { FaqAccordion } from "@/components/interactive-sections";
import { JsonLd, buildService, buildWebPage, buildBreadcrumbList , buildOrganization, buildWebSite } from "@/lib/seo/jsonld";

type Props = { params: Promise<{ category: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(serviceCategories).map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: catSlug } = await params;
  const cat = getCategory(catSlug);
  if (!cat) return {};

  const path = `/services/${cat.slug}/`;
  return {
    title: { absolute: cat.seoTitle },
    description: cat.description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: "Go Execution", images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],  title: cat.seoTitle, description: cat.description, url: path },
    twitter: { card: "summary_large_image", title: cat.seoTitle, description: cat.description },
  };
}

export default async function CategoryHubPage({ params }: Props) {
  const { category: catSlug } = await params;
  const cat = getCategory(catSlug);

  if (!cat) {
    notFound();
  }

  const path = `/services/${cat.slug}/`;
  const subServicesList = getSubServicesForCategory(cat.slug);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
        buildOrganization(),
        buildWebSite(),
      buildService({ path, name: cat.title, description: cat.geoOverview || cat.intro }),
      buildWebPage({ path, title: cat.title }),
      buildBreadcrumbList([
        { name: "Home", url: "/" },
        { name: "Services", url: "/services/" },
        { name: cat.title, url: path },
      ]),
    ],
  };

  return (
    <>
      <JsonLd data={schema} />
      <main id="primary" className="site-main ge-service-category-hub-page">
        {/* --- CINEMATIC CATEGORY HERO --- */}
        <section className="ge-hero ge-hero--inner ge-industry-hero ge-hero--fixed-media">
          <div className="ge-hero__media-backdrop ge-media-4x3">
            <Image
              src={cat.image}
              alt={cat.title}
              fill
              priority
              sizes="100vw"
              quality={85}
              className="ge-hero__bg-img"
            />
            <div className="ge-hero__media-overlay" />
          </div>

          <div className="ge-container ge-hero__content">
            <div className="ge-hero__badge-wrap">
              <span className="ge-eyebrow ge-eyebrow--gold">{cat.eyebrow}</span>
            </div>

            <h1 className="ge-hero__title">
              {cat.h1Title || cat.title} <span className="ge-title-accent">{cat.h1Accent || "For Businesses"}</span>
            </h1>

            <p className="ge-hero__copy">{cat.intro}</p>

            {/* Metrics Bar */}
            <div className="ge-hero-stats">
              {(cat.stats || [
                { value: "Sub-2.0s LCP", label: "Core Web Vitals Target" },
                { value: "100% Custom", label: "Zero Code Bloat" },
                { value: `${subServicesList.length} Specialized`, label: "Service Architectures" },
              ]).map((s, i) => (
                <div key={i} className="ge-hero-stat-pill">
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>

            <div className="ge-hero__actions">
              <Link className="ge-button ge-button--gold ge-magnetic" href="/contact/">
                <span>Book Free Strategy Consultation</span>
              </Link>
              <a className="ge-button ge-button--outline" href="#sub-services">
                <span>Explore Specialized Services</span>
              </a>
            </div>
          </div>
        </section>

        {/* --- CAPABILITIES SPLIT SECTION --- */}
        <section className="ge-section ge-service-capabilities-section">
          <div className="ge-container">
            <div className="ge-section-heading ge-section-heading--wide" style={{ marginBottom: 44 }}>
              <div>
                <p className="ge-eyebrow">Category Architecture</p>
                <h2>Core Capabilities & Engineering Standards</h2>
              </div>
              <p>{cat.description}</p>
            </div>

            <div className="ge-grid ge-grid--2col ge-split-challenge-grid">
              {/* Category Philosophy */}
              <div className="ge-split-card ge-split-card--challenge">
                <div className="ge-split-card__header">
                  <span className="ge-split-card__badge ge-split-card__badge--gold">Commercial Objective</span>
                  <h3>Why Our {cat.title} Wins</h3>
                </div>
                <p style={{ color: "rgba(255, 255, 255, 0.85)", lineHeight: 1.7, fontSize: "1.02rem" }}>
                  {cat.geoOverview}
                </p>
              </div>

              {/* Deliverables List */}
              <div className="ge-split-card ge-split-card--solution">
                <div className="ge-split-card__header">
                  <span className="ge-split-card__badge ge-split-card__badge--gold">Deliverables Blueprint</span>
                  <h3>What We Build & Deliver</h3>
                </div>
                <ul className="ge-split-list">
                  {cat.capabilities.map((cap, i) => (
                    <li key={i}>
                      <span className="ge-split-list__icon ge-split-list__icon--check">✓</span>
                      <div>
                        <strong>Capability 0{i + 1}</strong>
                        <p>{cap}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* --- SUB-SERVICES SHOWCASE LIST (HORIZONTAL FEATURE ROWS V3) --- */}
        <section id="sub-services" className="ge-section ge-sub-services-bento-section">
          <div className="ge-container">
            <div className="ge-section-heading ge-section-heading--wide" style={{ marginBottom: 40 }}>
              <div>
                <p className="ge-eyebrow">Specialized Capabilities</p>
                <h2>Dedicated {cat.title} Architectures</h2>
              </div>
              <p>
                Explore our specialized service modules below. Each solution is configured for maximum performance and conversion.
              </p>
            </div>

            <div className="ge-services-showcase-list">
              {subServicesList.map((sub, idx) => (
                <article key={sub.slug} className="ge-service-feature-row ge-reveal">
                  {/* Left Media Box */}
                  <div className="ge-service-feature-row__media ge-media-4x3">
                    <Image
                      src={sub.image}
                      alt={sub.title}
                      fill
                      sizes="(max-width: 860px) 100vw, 320px"
                      quality={85}
                      className="ge-service-feature-row__img"
                    />
                    <div className="ge-service-feature-row__media-shade" />
                    
                    <span className="ge-service-feature-row__num">0{idx + 1}</span>
                  </div>

                  {/* Right Content Column */}
                  <div className="ge-service-feature-row__body">
                    <span className="ge-service-feature-row__eyebrow">✦ {sub.eyebrow}</span>
                    
                    <h3 className="ge-service-feature-row__title">
                      <Link href={`/services/${cat.slug}/${sub.slug}/`}>{sub.title}</Link>
                    </h3>

                    <p className="ge-service-feature-row__desc">{sub.description}</p>

                    {/* Capability Tags */}
                    <div className="ge-service-feature-row__tags">
                      {sub.capabilities.slice(0, 3).map((cap, i) => (
                        <span key={i} className="ge-feature-tag">
                          ⚡ {cap}
                        </span>
                      ))}
                    </div>

                    {/* Capsule Action Button */}
                    <div className="ge-service-feature-row__action">
                      <Link className="ge-btn-capsule ge-magnetic" href={`/services/${cat.slug}/${sub.slug}/`}>
                        <span>Explore {sub.title} Architecture</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* --- EXECUTION PROCESS --- */}
        <section className="ge-section ge-dark-section">
          <div className="ge-container">
            <div className="ge-section-heading ge-section-heading--wide" style={{ marginBottom: 44 }}>
              <div>
                <p className="ge-eyebrow ge-eyebrow--light">Execution Methodology</p>
                <h2 style={{ color: "#ffffff" }}>
                  Our 4-Stage <span className="ge-title-accent">Delivery Blueprint</span>
                </h2>
              </div>
              <p className="ge-light-copy">
                A proven, transparent engineering process ensuring zero technical debt and high-converting commercial results.
              </p>
            </div>

            <div className="ge-process-media-strip ge-media-4x3">
              <Image
                src={cat.image}
                alt={`${cat.title} team delivery process`}
                fill
                sizes="(max-width: 900px) 100vw, 1200px"
                quality={85}
              />
              <div className="ge-process-media-strip__shade" />
              
              <p>People, process and technology aligned from discovery through launch.</p>
            </div>

            <div className="ge-grid ge-grid--4col" style={{ marginTop: 24 }}>
              {(cat.processSteps || [
                {
                  num: "01",
                  badge: "PHASE ONE",
                  title: "Discovery & Architecture",
                  desc: "Analyzing commercial goals, user search intent, and technical specifications.",
                  bullets: ["Scope & Architecture Plan", "Competitor Benchmark"],
                },
                {
                  num: "02",
                  badge: "PHASE TWO",
                  title: "UX & Wireframing",
                  desc: "Designing interactive prototypes built for visitor conversion performance.",
                  bullets: ["Figma Design System", "Conversion Funnel Test"],
                },
                {
                  num: "03",
                  badge: "PHASE THREE",
                  title: "Clean Code Engineering",
                  desc: "Developing lightweight Next.js 16, React 19, and TypeScript code.",
                  bullets: ["Zero Code Bloat", "Schema & API Sync"],
                },
                {
                  num: "04",
                  badge: "PHASE FOUR",
                  title: "QA, Speed & Launch",
                  desc: "Rigorous Core Web Vitals audits, security hardening, and live launch.",
                  bullets: ["Core Web Vitals Speed Audit", "Search Infrastructure & Schema Verification"],
                },
              ]).map((step) => (
                <div key={step.num} className="ge-process-step-v5">
                  <div className="ge-process-step-v5__top">
                    <span className="ge-process-step-v5__num">{step.num}</span>
                    <span className="ge-process-step-v5__badge">{step.badge}</span>
                  </div>
                  <h3 className="ge-process-step-v5__title">{step.title}</h3>
                  <p className="ge-process-step-v5__desc">{step.desc}</p>
                  <ul className="ge-process-step-v5__bullets">
                    {step.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- RELATED INSIGHTS & GUIDES --- */}
        {(() => {
          const categoryBlogSlug = catSlug === "seo" ? "seo-services" : catSlug;
          const relatedBlogs = blogPosts
            .filter((p) => p.categorySlug === categoryBlogSlug || (catSlug !== "seo" && catSlug !== "web-development" && p.categorySlug === "web-development"))
            .slice(0, 3);
          if (relatedBlogs.length === 0) return null;
          return (
            <section className="ge-section ge-related-posts ge-bg-light">
              <div className="ge-container ge-container--narrow">
                <div className="ge-section-heading" style={{ marginBottom: 48 }}>
                  <p className="ge-eyebrow">Industry Insights</p>
                  <h2>Related {cat.title} Guides & Resources</h2>
                </div>
                <div className="ge-blog-grid">
                  {relatedBlogs.map((rel) => (
                    <article key={rel.slug} className="ge-blog-card">
                      {rel.image ? (
                        <Link href={`/${rel.slug}/`} className="ge-blog-card__image">
                          <Image src={rel.image} alt={rel.title} fill sizes="(max-width: 768px) 100vw, 33vw" />
                        </Link>
                      ) : (
                        <Link href={`/${rel.slug}/`} className="ge-blog-card__image">
                          <span>{String(1).padStart(2, "0")}</span>
                        </Link>
                      )}
                      <p className="ge-eyebrow">{rel.category}</p>
                      <h3><Link href={`/${rel.slug}/`}>{rel.title}</Link></h3>
                      <p>{rel.excerpt}</p>
                      <div>
                        <time dateTime={rel.date}>{formatBlogDate(rel.date)}</time>
                        <Link href={`/${rel.slug}/`}>Read more</Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          );
        })()}

        {/* --- FAQ SECTION --- */}
        {cat.faqs && cat.faqs.length > 0 && (
          <section className="ge-section ge-faq" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <div className="ge-container">
              <div className="ge-section-heading ge-reveal" style={{ marginBottom: 48 }}>
                <p className="ge-eyebrow">Clear Answers</p>
                <h2>Frequently Asked {cat.title} Questions</h2>
              </div>
              <div className="ge-reveal">
                <FaqAccordion items={cat.faqs} idPrefix={`${cat.slug}-faq`} />
              </div>
            </div>
          </section>
        )}

        {/* --- HIGH-INTENT CLOSING CTA --- */}
        <section className="ge-section ge-dark-section" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", textAlign: "center" }}>
          <div className="ge-container" style={{ maxWidth: "860px", margin: "0 auto" }}>
            <p className="ge-eyebrow ge-eyebrow--gold">{cat.closingCta?.eyebrow || "Start Your Project"}</p>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", marginBottom: "20px" }}>
              {cat.closingCta?.title || `Ready to Scale Your ${cat.title}?`}
            </h2>
            <p style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "1.1rem", lineHeight: "1.7", marginBottom: "32px" }}>
              {cat.closingCta?.copy || "Schedule a discovery session with our senior pod in Dallas, Texas. We will analyze your digital goals and map out a clear execution plan."}
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap", marginBottom: "24px" }}>
              <Link className="ge-button ge-button--gold ge-magnetic" href="/contact/">
                <span>{cat.closingCta?.buttonText || "Schedule Strategy Consultation →"}</span>
              </Link>
            </div>
            <p style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.95rem" }}>
              Or speak directly with our team at (469) 666-0225 • 13345 N Central Expy, Dallas, TX
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
