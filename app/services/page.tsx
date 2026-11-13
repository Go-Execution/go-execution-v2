import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { allServiceCategories, allSubServices } from "@/lib/services";
import { JsonLd, buildWebPage, buildBreadcrumbList, buildOrganization, buildWebSite } from "@/lib/seo/jsonld";
import { FaqAccordion } from "@/components/interactive-sections";

export const metadata: Metadata = {
  title: { absolute: "Full-Service Digital Agency & Custom Web Engineering | Go Execution" },
  description:
    "Go Execution unites custom web development, technical SEO, performance marketing, and branding into a single accountable growth engine for US businesses.",
  alternates: { canonical: "/services/" },
  openGraph: {
    type: "website",
    siteName: "Go Execution",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    url: "/services/",
  },
};

const servicesFaqs = [
  {
    question: "Can we engage Go Execution for an individual service, or do we have to hire the entire agency?",
    answer:
      "You can engage us for a single specialized objective or partner with us across our full digital capabilities. Many clients begin with a high-priority need—such as an urgent website redesign, a technical SEO migration, or Google Ads restructuring—and expand into a multi-practice partnership once they experience our execution speed and accountability.",
  },
  {
    question: "Who owns the website code, design files, and ad accounts once the project is finished?",
    answer:
      "You retain 100% full ownership of all source code, Figma design files, brand assets, and advertising accounts. We deploy projects directly to your private GitHub repository and cloud hosting accounts (such as Vercel, AWS, or your enterprise server). We never hold your intellectual property hostage or lock you into proprietary CMS systems.",
  },
  {
    question: "How does Go Execution prevent technical debt compared to traditional WordPress agencies?",
    answer:
      "Traditional agencies frequently rely on dozens of third-party plugins and pre-packaged visual themes that slow page speeds, introduce security vulnerabilities, and break during core updates. Go Execution builds with clean, componentized TypeScript and Next.js, or lightweight headless CMS configurations. This ensures fast load speeds, robust security, and seamless long-term maintainability.",
  },
  {
    question: "How are projects managed, and who will be our day-to-day point of contact?",
    answer:
      "You work directly with a dedicated Senior Engineering or Marketing Pod. We do not pass your communications through junior account coordinators or middle-management layers. You have direct access to your lead engineer, search strategist, or media buyer via scheduled sprint reviews, private Slack channels, and real-time project management dashboards.",
  },
  {
    question: "What is your typical timeline for a custom web development or digital marketing sprint?",
    answer:
      "Timelines vary based on scope complexity. A high-converting landing page or targeted PPC restructuring typically launches within 2 to 3 weeks. A comprehensive custom Next.js corporate website or full e-commerce migration generally runs on a 6 to 10-week sprint cycle, including discovery, interactive wireframing, custom frontend engineering, backend integrations, SEO pre-launch audits, and quality assurance.",
  },
  {
    question: "How do you handle ongoing maintenance and support after launch?",
    answer:
      "Following deployment, we provide a 30-day warranty period covering all code and functionality. We also offer dedicated monthly SLA support packages covering proactive security monitoring, Core Web Vitals maintenance, server optimization, and continuous conversion rate experimentation.",
  },
];

export default function ServicesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganization(),
      buildWebSite(),
      buildWebPage({
        path: "/services/",
        title: "Full-Service Digital Agency & Custom Web Engineering | Go Execution",
      }),
      buildBreadcrumbList([
        { name: "Home", url: "/" },
        { name: "Services", url: "/services/" },
      ]),
    ],
  };

  return (
    <>
      <JsonLd data={schema} />
      <main id="primary" className="site-main ge-services-index-page">
        {/* --- CINEMATIC HERO --- */}
        <section className="ge-hero ge-hero--inner ge-services-hero-new">
          <div className="ge-hero__bg-grid" aria-hidden="true" />
          <div className="ge-hero__bg-glow" aria-hidden="true" />

          <div className="ge-container">
            <div className="ge-hero__pill-tag">
              <span className="ge-hero__pill-dot" />
              <span>Enterprise Digital Capabilities • Dallas, TX & Nationwide</span>
            </div>

            <h1 className="ge-hero__title ge-hero__title--large">
              Full-Stack Digital Capabilities <br />
              <span className="ge-title-accent">Engineered for Commercial Growth</span>
            </h1>

            <p className="ge-hero__copy">
              We unite custom web engineering, technical search visibility, performance advertising, and brand design into a single accountable growth engine. No template bloat. No outsourced junior handoffs. Just measurable commercial execution for businesses that demand a real return on investment.
            </p>

            {/* Quick Metrics Bar (Defensible & Credible) */}
            <div className="ge-hero-metrics-bar">
              <div className="ge-metric-pill">
                <strong>6 Core Practices</strong>
                <span>Complete Digital Spectrum</span>
              </div>
              <div className="ge-metric-pill">
                <strong>100% Custom Code</strong>
                <span>Next.js & Clean TypeScript</span>
              </div>
              <div className="ge-metric-pill">
                <strong>Direct Code Ownership</strong>
                <span>Zero Vendor Lock-In</span>
              </div>
              <div className="ge-metric-pill">
                <strong>Dedicated Senior Pod</strong>
                <span>Direct Access to Builders</span>
              </div>
            </div>

            <div className="ge-hero__actions" style={{ marginTop: 32, display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link className="ge-button ge-button--gold ge-magnetic" href="/contact/">
                <span>Book Strategy Consultation</span>
              </Link>
              <a className="ge-button ge-button--outline" href="#service-grid">
                <span>Explore Service Practices</span>
              </a>
            </div>
          </div>
        </section>

        {/* --- UNIFIED AGENCY MODEL (PROBLEM - SOLUTION) --- */}
        <section className="ge-section ge-dark-section" style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <div className="ge-container">
            <div className="ge-section-heading ge-section-heading--wide">
              <div>
                <p className="ge-eyebrow ge-eyebrow--gold">The Unified Agency Model</p>
                <h2>Six Specialized Practices. Zero Disconnected Vendors.</h2>
              </div>
              <div style={{ maxWidth: "760px", color: "rgba(255, 255, 255, 0.76)", lineHeight: "1.75", fontSize: "1.05rem" }}>
                <p style={{ marginBottom: "16px" }}>
                  Most growing businesses suffer from vendor fragmentation. They hire one agency for web design, an overseas freelancer for SEO, an independent contractor for paid ads, and a boutique studio for branding. When conversion rates drop or campaigns miss targets, each party points the finger at the other. The developer blames the ad copy, the media buyer blames the landing page speed, and the client absorbs the financial loss.
                </p>
                <p>
                  Go Execution eliminates this friction entirely. Our engineers, search strategists, media buyers, and visual designers operate as a synchronized growth unit. Every line of code is written with technical SEO indexing in mind. Every landing page is designed around conversion psychology and paid traffic intent. By housing technical development and revenue marketing under one accountable roof, we deliver faster sprint turnarounds, tighter attribution, and compounding commercial results.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- CATEGORY CARDS GRID --- */}
        <section id="service-grid" className="ge-section ge-dark-section ge-services-category-grid-section">
          <div className="ge-container">
            <div className="ge-section-heading ge-section-heading--wide" style={{ marginBottom: 48 }}>
              <div>
                <p className="ge-eyebrow">Service Capabilities</p>
                <h2>Explore Our Six Core Practices</h2>
              </div>
              <p>
                Select a practice to inspect dedicated architecture, specialized sub-services, and strategic execution frameworks.
              </p>
            </div>

            <div className="ge-grid ge-grid--3col ge-industry-dark-grid">
              {allServiceCategories.map((cat, idx) => {
                const subServices = allSubServices.filter((s) => s.categorySlug === cat.slug);
                return (
                  <article key={cat.slug} className="ge-dark-bento-card ge-reveal">
                    {/* Media Banner */}
                    <div className="ge-dark-bento-card__media ge-media-4x3">
                      <Image
                        src={cat.image}
                        alt={cat.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={80}
                        className="ge-dark-bento-card__img"
                      />
                      <div className="ge-dark-bento-card__shade" />

                      <div className="ge-dark-bento-card__header-bar">
                        <span className="ge-dark-bento-card__num-pill">
                          0{idx + 1} &bull; PRACTICE HUB
                        </span>
                        <span className="ge-dark-bento-card__stat-pill">
                          {subServices.length} Services
                        </span>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="ge-dark-bento-card__body">
                      <div className="ge-dark-bento-card__eyebrow-wrap">
                        <span className="ge-eyebrow ge-eyebrow--gold">{cat.eyebrow}</span>
                      </div>

                      <h3 className="ge-dark-bento-card__title">
                        <Link href={`/services/${cat.slug}/`}>{cat.title}</Link>
                      </h3>

                      <p className="ge-dark-bento-card__desc">{cat.description}</p>

                      {/* Sub-Service Link Chips */}
                      <div className="ge-dark-bento-card__chips">
                        {subServices.slice(0, 4).map((sub) => (
                          <Link
                            key={sub.slug}
                            href={`/services/${cat.slug}/${sub.slug}/`}
                            className="ge-dark-chip"
                          >
                            <span className="ge-chip-icon">⚡</span>
                            {sub.title}
                          </Link>
                        ))}
                      </div>

                      {/* Action Button */}
                      <div className="ge-dark-bento-card__action">
                        <Link
                          className="ge-button ge-button--gold ge-button--full ge-magnetic"
                          href={`/services/${cat.slug}/`}
                        >
                          <span>Explore {cat.title} Practice →</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* --- AGENCY STANDARD PILLARS --- */}
        <section className="ge-section ge-dark-section" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <div className="ge-container">
            <div className="ge-section-heading ge-section-heading--wide">
              <div>
                <p className="ge-eyebrow ge-eyebrow--light">Accountability Framework</p>
                <h2>The Go Execution Standard: Engineered for Direct Business Impact</h2>
              </div>
              <p className="ge-light-copy">
                Every project we accept is governed by four core operating principles designed to protect your capital, secure your digital assets, and drive measurable enterprise value.
              </p>
            </div>

            <div className="ge-grid ge-grid--4col ge-pillars-grid">
              <div className="ge-pillar-card">
                <span className="ge-pillar-num">01</span>
                <h3>Custom Code Engineering</h3>
                <p>We build on production-grade Next.js, React, and modern TypeScript architectures. Zero template bloat and zero vulnerable plugins.</p>
              </div>
              <div className="ge-pillar-card">
                <span className="ge-pillar-num">02</span>
                <h3>Search Infrastructure by Default</h3>
                <p>Semantic HTML5 structuring, server-rendered open-graph protocols, JSON-LD schema markup, and optimized Core Web Vitals built directly into the foundation.</p>
              </div>
              <div className="ge-pillar-card">
                <span className="ge-pillar-num">03</span>
                <h3>Conversion-First UX & Psychology</h3>
                <p>Frictionless user journeys, intuitive form validation, and clear value hierarchies that guide qualified traffic toward booked calls and completed transactions.</p>
              </div>
              <div className="ge-pillar-card">
                <span className="ge-pillar-num">04</span>
                <h3>Transparent Closed-Loop Attribution</h3>
                <p>You own 100% of your source code, design assets, and ad accounts from day one. Tracking pipelines connect directly to your CRM for verifiable revenue data.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- FAQ SECTION --- */}
        <section className="ge-section ge-faq" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <div className="ge-container">
            <div className="ge-section-heading ge-reveal" style={{ marginBottom: 48 }}>
              <p className="ge-eyebrow">Procurement & Engagement</p>
              <h2>Frequently Asked Commercial Questions</h2>
            </div>
            <div className="ge-reveal">
              <FaqAccordion items={servicesFaqs} idPrefix="services-faq" />
            </div>
          </div>
        </section>

        {/* --- HIGH-INTENT CLOSING CTA --- */}
        <section className="ge-section ge-dark-section" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", textAlign: "center" }}>
          <div className="ge-container" style={{ maxWidth: "860px", margin: "0 auto" }}>
            <p className="ge-eyebrow ge-eyebrow--gold">Start Your Project</p>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", marginBottom: "20px" }}>
              Ready to Consolidate Your Digital Growth Under One Accountable Team?
            </h2>
            <p style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "1.1rem", lineHeight: "1.7", marginBottom: "32px" }}>
              Stop juggling disconnected freelancers and finger-pointing agencies. Schedule an engineering and growth consultation with our senior team in Dallas, Texas. We will analyze your current digital architecture, evaluate your search visibility, and map out a clear execution plan.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap", marginBottom: "24px" }}>
              <Link className="ge-button ge-button--gold ge-magnetic" href="/contact/">
                <span>Schedule Strategy Consultation →</span>
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
