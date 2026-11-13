import Image from "next/image";
import Link from "next/link";
import content from "@/lib/wp-content.json";
import { MobileHeroStory } from "@/components/mobile-hero-story";
import { DesktopHeroBackground } from "@/components/desktop-hero-background";
import { HomeServices } from "@/components/home-services";
import { FaqAccordion, PortfolioGrid, PricingGrid } from "@/components/interactive-sections";

import { createClient } from "@supabase/supabase-js";
import { TestimonialShowcase, type Testimonial } from "@/components/testimonial-showcase";



const growthSteps = [
  {
    num: "01",
    label: "Audit",
    title: "Deep Audit & Discovery Sprint",
    copy: "We tear down your current codebase, crawl logs, competitor ad spend, and conversion drop-offs to locate the exact leak in your revenue engine.",
    image: "/assets/images/stock/service-digital-marketing.jpg",
    alt: "Digital Agency Discovery & Analysis by Go Execution",
  },
  {
    num: "02",
    label: "Blueprint",
    title: "Technical Blueprint & Roadmap",
    copy: "Before writing a line of code, we map out the tech stack, keyword architecture, database schema, and high-converting wireframes for your approval.",
    image: "/assets/images/stock/industry-professional-services.jpg",
    alt: "Digital Strategy Planning by Go Execution",
  },
  {
    num: "03",
    label: "Engineer",
    title: "High-Speed Engineering & Content Build",
    copy: "Our developers and creators build your platform with modular components, lightning-fast edge caching, and semantic search markup.",
    image: "/assets/images/stock/service-web-development.jpg",
    alt: "Web Engineering & Marketing Execution by Go Execution",
  },
  {
    num: "04",
    label: "Launch",
    title: "Zero-Downtime Launch & Tracking",
    copy: "We deploy with 100% redirect preservation, configure server-side conversion tracking, and launch paid search funnels simultaneously.",
    image: "/assets/images/stock/subservice-website-redesign.jpg",
    alt: "Digital Asset Launch & Performance Tracking by Go Execution",
  },
  {
    num: "05",
    label: "Scale",
    title: "Continuous Growth & Conversion Loop",
    copy: "We monitor Core Web Vitals, A/B test conversion bottlenecks, and scale search rankings to compound your customer acquisition month over month.",
    image: "/assets/images/stock/service-seo.jpg",
    alt: "Digital Performance Optimization by Go Execution",
  },
] as const;

const homepageIndustries = [
  {
    slug: "real-estate",
    number: "01",
    tag: "PROPERTY & MLS",
    title: "Real Estate & Development",
    desc: "Fast IDX/MLS search platforms that don't crash under high volume, paired with automated property valuation funnels that capture high-equity seller leads.",
    image: "/assets/images/stock/industry-real-estate.jpg",
    feature: "MLS/IDX Integration & Listing Leads",
    cta: "See MLS Platforms",
  },
  {
    slug: "fashion",
    number: "02",
    tag: "E-COMMERCE & LUXURY",
    title: "Fashion & Apparel",
    desc: "Sub-second headless storefronts with instant 1-click checkout. Eliminate cart abandonment and scale paid TikTok & Meta campaigns profitably.",
    image: "/assets/images/stock/industry-fashion.jpg",
    feature: "Headless E-Commerce & UGC Ads",
    cta: "Explore Headless Storefronts",
  },
  {
    slug: "health-wellness",
    number: "03",
    tag: "CLINICAL & HEALTHCARE",
    title: "Health & Wellness",
    desc: "HIPAA-conscious patient booking portals, local Google Map Pack dominance, and automated review systems that build community trust.",
    image: "/assets/images/stock/industry-health-wellness.jpg",
    feature: "HIPAA Portals & Local Map Pack SEO",
    cta: "View Patient Booking Systems",
  },
  {
    slug: "technology",
    number: "04",
    tag: "SAAS & B2B TECH",
    title: "Technology & B2B SaaS",
    desc: "High-converting interactive demo funnels, technical SaaS SEO, and modern documentation platforms built on Next.js to shorten your sales cycle.",
    image: "/assets/images/stock/industry-technology.jpg",
    feature: "Demo Booking & Technical SEO",
    cta: "Scale B2B Pipeline",
  },
  {
    slug: "professional-services",
    number: "05",
    tag: "LEGAL & FINANCIAL",
    title: "Professional Services",
    desc: "Authority-building digital platforms and practice-area search rankings engineered to convert high-net-worth consultation inquiries.",
    image: "/assets/images/stock/industry-professional-services.jpg",
    feature: "Consultation Funnels & Organic Growth",
    cta: "Build Firm Authority",
  },
  {
    slug: "hospitality",
    number: "06",
    tag: "LUXURY RESORTS & DINING",
    title: "Hospitality & Leisure",
    desc: "Direct-booking web architectures with interactive visual menus and 4K video storytelling that bypass third-party OTA commission fees.",
    image: "/assets/images/stock/industry-hospitality.jpg",
    feature: "Direct Booking & Video Marketing",
    cta: "Boost Direct Bookings",
  },
];

const testimonials: readonly Testimonial[] = [
  { quote: "We reached $2.4M in revenue during our first year on the ecommerce platform built by Go Execution. Their strategic guidance was instrumental to our growth.", name: "Raj Patel", role: "Founder, Coastal Roasters", metric: "$2.4M", metricLabel: "first-year revenue" },
  { quote: "The website overhaul and technical SEO strategy pushed us to top Google rankings for all our core practice areas. Consultation inquiries doubled.", name: "Kwame Asante", role: "Managing Partner, Zenith Legal", metric: "94%", metricLabel: "more consultation requests" },
  { quote: "The brand identity and packaging system they crafted elevated our positioning instantly. We gained 12,000 engaged followers and secured national press coverage.", name: "Anika Bergström", role: "Brand Manager, Lumina Cosmetics", metric: "12K", metricLabel: "new followers in 90 days" },
  { quote: "The custom property management portal reduced operational overhead by 73%. We now scale our property portfolio without adding administrative friction.", name: "James Mitchell", role: "Owner, Horizon Real Estate", metric: "73%", metricLabel: "less administration time" },
] as const;

export const homepageFaqs = [
  {
    question: "How does Go Execution differ from a typical WordPress template agency?",
    answer: "Most agencies buy a $50 WordPress theme, install 40 bloated plugins, and hand you a slow website that fails Google's Core Web Vitals. We hand-engineer custom platforms using Next.js and TypeScript. The result is sub-second load times, rock-solid security, superior organic search rankings, and significantly higher conversion rates."
  },
  {
    question: "How fast can we launch our custom website or marketing campaign?",
    answer: "A custom Next.js web application or corporate platform typically launches within 4 to 6 weeks, following our structured 5-step sprint framework. Targeted paid search and social campaigns can be architected, tracked, and deployed in under 7 business days."
  },
  {
    question: "Do you lock our business into long-term retainer contracts?",
    answer: "No. We believe in earning your business through measurable monthly ROI, not 12-month handcuffs. Our retainer agreements are flexible, transparent, and driven by agreed commercial KPIs."
  },
  {
    question: "Will our new website actually pass Google Core Web Vitals?",
    answer: "Yes, guaranteed. We test every build against Google's real-world field metrics—guaranteeing sub-2.0s Largest Contentful Paint (LCP), sub-150ms Interaction to Next Paint (INP), and zero Cumulative Layout Shift (CLS)."
  },
  {
    question: "Do we own the source code, ad accounts, and design assets?",
    answer: "100% yes. You receive complete administrative ownership of your GitHub repositories, Vercel deployments, Figma design libraries, Google Ads accounts, and analytics properties. We never hold your assets hostage."
  },
  {
    question: "Can you migrate our existing website without losing our current SEO rankings?",
    answer: "Yes. We execute a comprehensive zero-loss migration protocol: cataloging every indexed URL, mapping precise 301 redirects, preserving page intent and metadata, and monitoring Search Console crawl logs during deployment."
  }
] as const;

const homeHeroContent = {
  eyebrow: "FULL-SERVICE DIGITAL MARKETING AGENCY",
  title: "Go Execution Digital",
  titleAccent: "Marketing Agency",
  copy: "Go Execution helps businesses turn digital traffic into measurable growth through conversion-focused web development, SEO, paid advertising, content, branding and digital strategy.",
  primaryLabel: "Get a Free Growth Audit",
  primaryHref: "/contact/",
  secondaryLabel: "Explore Our Services",
  secondaryHref: "/services/",
} as const;

function HeroContent() {
  return (
    <div className="ge-hero__content">
      <p className="ge-eyebrow ge-hero-reveal"><span />{homeHeroContent.eyebrow}</p>
      <h1 className="ge-hero__title">
        <span className="ge-hero-reveal">{homeHeroContent.title}</span>
        <span className="ge-hero-reveal ge-hero__title-accent">{homeHeroContent.titleAccent}</span>
      </h1>
      <p className="ge-hero__copy ge-hero-reveal">
        {homeHeroContent.copy}
      </p>
      <div className="ge-hero__actions ge-hero-reveal">
        <Link className="ge-button ge-button--gold ge-magnetic" href={homeHeroContent.primaryHref}>
          <span>{homeHeroContent.primaryLabel}</span>
        </Link>
        <Link className="ge-button ge-button--outline" href={homeHeroContent.secondaryHref}>
          <span>{homeHeroContent.secondaryLabel}</span>
        </Link>
      </div>
    </div>
  );
}

export async function Homepage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;
  
  let dbTestimonials: Testimonial[] = [];
  if (supabase) {
    const { data } = await supabase.from("testimonials").select("*").eq("approved", true).order("created_at", { ascending: false });
    if (data) {
      dbTestimonials = data.map(t => ({
        quote: t.quote,
        name: t.name,
        role: t.role,
        metric: t.metric,
        metricLabel: t.metric_label
      }));
    }
  }
  
  const allTestimonials = [...dbTestimonials, ...testimonials];

  return (
    <main id="primary" className="site-main">
      {/* --- HERO SECTION --- */}
      <section className="ge-hero ge-hero--desktop">
        <DesktopHeroBackground />
        <div className="ge-container ge-hero__centered-container"><HeroContent /></div>
        <div className="ge-hero__scroll" aria-hidden="true"><span />Scroll to explore</div>
      </section>

      <MobileHeroStory {...homeHeroContent} />

      {/* --- TRUST STATISTICS --- */}
      <section className="ge-stats" aria-label="Agency statistics"><div className="ge-container ge-stats__grid ge-stats--navy">
        {[["120", "+", "Custom Platforms Engineered"], ["85", "+", "High-ROAS Ad Campaigns"], ["98", "%", "Client Retention Rate"], ["250", "+", "Digital Milestones Delivered"]].map(([value, suffix, label]) => (
          <div className="ge-stat ge-reveal" key={label}>
            <strong data-counter={value} data-suffix={suffix}>{value}{suffix}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div></section>

      {/* --- SERVICES SECTION --- */}
      <HomeServices />

      {/* --- PORTFOLIO SECTION --- */}
      <section id="work" className="ge-section ge-work"><div className="ge-container">
        <div className="ge-section-heading ge-section-heading--wide ge-reveal">
          <div>
            <p className="ge-eyebrow">Proven Track Record</p>
            <h2>Real Businesses. Measurable Commercial Outcomes.</h2>
          </div>
          <p>
            We don't build generic mockups to look good in agency awards. Every platform in our portfolio was engineered to solve a specific revenue bottleneck—cutting bounce rates, ranking in competitive US markets, and generating qualified leads.
          </p>
        </div>
        <PortfolioGrid items={content.portfolio.filter((project) => project.category === "Website Design & Development")} initialLimit={6} includeAll={false} deferCatalogue showViewAll />
      </div></section>

      {/* --- INDUSTRIES SECTION (REDESIGNED LUXURY BENTO GRID) --- */}
      <section className="ge-section ge-bento-industries-section">
        <div className="ge-container">
          <div className="ge-section-heading ge-section-heading--wide ge-reveal" style={{ marginBottom: 36 }}>
            <div>
              <p className="ge-eyebrow">Sector-Specific Strategy</p>
              <h2 style={{ color: "#0d1b2a" }}>Engineered for High-Stakes Industries</h2>
            </div>
            <div>
              <p style={{ color: "#475569", marginBottom: 18 }}>
                Every vertical has unique compliance constraints, buyer cycles, and conversion bottlenecks. We architect custom digital growth systems tailored to your specific commercial reality.
              </p>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "1.5rem" }}>
                <Link className="ge-button ge-button--outline" href="/industries/">
                  <span>Explore All Industries</span>
                </Link>
                <Link className="ge-button ge-button--gold" href="/contact/">
                  <span>Request an Industry Case Study</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="ge-bento-industries-grid">
            {homepageIndustries.map((ind, index) => (
              <article
                key={ind.slug}
                className="ge-bento-industry-card"
                style={
                  {
                    "--card-index": index,
                  } as React.CSSProperties
                }
              >
                <div className="ge-bento-industry-card__media ge-media-4x3">
                  <Image
                    className="ge-bento-industry-card__image"
                    src={ind.image}
                    alt={`${ind.title} digital growth services`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span className="ge-bento-industry-card__shade" aria-hidden="true" />
                </div>
                <div className="ge-bento-card-content">
                  <div className="ge-bento-card-header">
                    <span className="ge-bento-card-num">{ind.number}</span>
                  </div>
                  <div>
                    <h3 className="ge-bento-card-title">{ind.title}</h3>
                    <p className="ge-bento-card-desc">{ind.desc}</p>
                    <div className="ge-bento-card-feature">
                      <i>✦</i> <span>{ind.feature}</span>
                    </div>
                  </div>
                  <Link className="ge-bento-card-btn" href={`/industries/${ind.slug}/`}>
                    <span>{ind.cta}</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Sleek Ticker Marquee */}
        <div className="ge-bento-marquee" aria-label="Industries ticker">
          <div className="ge-bento-marquee-track">
            <span>REAL ESTATE</span><i>✦</i>
            <span>FASHION &amp; LUXURY</span><i>✦</i>
            <span>HEALTH &amp; WELLNESS</span><i>✦</i>
            <span>SAAS &amp; TECHNOLOGY</span><i>✦</i>
            <span>PROFESSIONAL SERVICES</span><i>✦</i>
            <span>HOSPITALITY</span><i>✦</i>
            <span>REAL ESTATE</span><i>✦</i>
            <span>FASHION &amp; LUXURY</span><i>✦</i>
            <span>HEALTH &amp; WELLNESS</span><i>✦</i>
            <span>SAAS &amp; TECHNOLOGY</span><i>✦</i>
            <span>PROFESSIONAL SERVICES</span><i>✦</i>
            <span>HOSPITALITY</span><i>✦</i>
          </div>
        </div>
      </section>

      {/* --- WHY GO EXECUTION SECTION --- */}
      <section className="ge-section ge-why ge-why--split"><div className="ge-why__watermark" aria-hidden="true"><Image src="/assets/images/ce-icon.png" alt="" width={1200} height={1200} sizes="100vw" /></div><div className="ge-container ge-why__grid">
        <div className="ge-why__lead ge-reveal" data-reveal="left">
          <p className="ge-eyebrow ge-eyebrow--light">The Go Execution Difference</p>
          <h2>Why High-Growth Companies Fire Other Agencies &amp; Hire Us</h2>
          <p>You don't need another junior account manager forwarding emails or an offshore developer breaking your checkout page. We provide a dedicated senior squad that treats your digital infrastructure like an investment portfolio.</p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "2rem" }}>
            <Link className="ge-why__cta-btn" href="/about/"><span>Discover Our Approach</span></Link>
            <Link className="ge-button ge-button--gold" href="/contact/"><span>Speak with an Expert</span></Link>
          </div>
        </div>
        <div className="ge-why-cards">
          {[
            { title: "Zero-Bloat Codebases", copy: "We build on modern architectures (Next.js, React, TypeScript). That means zero vulnerable plugins, instantaneous page loads, and 100/100 Core Web Vitals out of the box." },
            { title: "Direct Senior Communication", copy: "You speak directly to the engineers, search strategists, and designers executing your project. Zero bureaucratic layers, no phone-tag, and weekly transparent sprints." },
            { title: "Revenue Attribution, Not Vanity Clicks", copy: "Anyone can buy cheap traffic. We track the entire visitor funnel from ad impression to closed customer, relentlessly optimizing cost per qualified acquisition (CPA)." },
            { title: "You Own 100% of Your Assets", copy: "No proprietary agency lock-ins. You receive full ownership of your clean source code, repositories, analytics properties, ad accounts, and design tokens on day one." },
          ].map((item, index) => (
            <div className="ge-why-card ge-reveal" data-reveal="right" style={{ "--card-index": index, transitionDelay: `${index * 120}ms` } as React.CSSProperties} key={item.title}>
              <div className="ge-why-card__top">
                <span className="ge-why-card__num">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </div>
          ))}
        </div>
      </div></section>

      {/* --- DIGITAL GROWTH PROCESS SECTION --- */}
      <section className="ge-section ge-problems ge-growth-redesign ge-growth-redesign--story"><div className="ge-container">
        <div className="ge-problems-heading ge-reveal">
          <p className="ge-eyebrow">Accountable Execution Framework</p>
          <h2>From Architecture to Market Dominance in 5 Sprints</h2>
          <div>
            <p className="ge-growth-redesign__intro" style={{ marginTop: 0 }}>A battle-tested deployment methodology that guarantees on-time delivery with zero surprises.</p>
            <div style={{ marginTop: "1.5rem", display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link className="ge-button ge-button--outline" href="/portfolio/">
                <span>View Past Campaigns</span>
              </Link>
              <Link className="ge-button ge-button--gold" href="/contact/">
                <span>Map Out Your Strategy</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="ge-scroll-section"><div className="ge-scroll-text">
          {growthSteps.map((step, index) => (
            <article className={`ge-scroll-step ge-growth-card ge-growth-story${index === 0 ? " is-active" : ""}`} data-index={index} key={step.title} style={{ "--card-index": index } as React.CSSProperties}>
              <div className="ge-scroll-step__mobile-img-wrap ge-media-4x3">
                <Image src={step.image} alt={step.alt} fill sizes="(max-width: 820px) 100vw, 50vw" quality={80} />
                
              </div>
              <div className="ge-growth-story__content">
                <div className="ge-scroll-step__header">
                  <span className="ge-scroll-step__badge">{step.num}</span>
                  <span className="ge-growth-story__label">{step.label}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
                <span className="ge-growth-story__line" aria-hidden="true" />
              </div>
            </article>
          ))}
        </div></div>
      </div></section>

      <TestimonialShowcase items={allTestimonials} />

      {/* --- PRICING SECTION --- */}
      <section className="ge-section ge-pricing"><div className="ge-container">
        <div className="ge-section-heading ge-reveal">
          <div>
            <p className="ge-eyebrow">Transparent Investment</p>
            <h2>Predictable Pricing. Zero Surprise Retainers.</h2>
            <p style={{ marginTop: 12, color: "#cbd5e1" }}>Choose a dedicated growth package engineered for your stage of business, or contact our team for a tailored enterprise build. Fixed scopes, clear deliverables, no hidden hourly fees.</p>
          </div>
        </div>
        <PricingGrid groups={content.pricing} />
      </div></section>

      {/* --- FAQ SECTION --- */}
      <section className="ge-section ge-faq">
        <div className="ge-container">
          <div className="ge-section-heading ge-reveal" style={{ marginBottom: 48 }}>
            <p className="ge-eyebrow">Clear Answers</p>
            <h2>Frequently Asked Questions About Partnering With Us</h2>
          </div>
          <div className="ge-reveal">
            <FaqAccordion items={homepageFaqs} idPrefix="home-faq" />
          </div>
        </div>
      </section>

    </main>
  );
}
