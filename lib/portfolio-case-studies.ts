import { portfolioCasesPartA } from "./portfolio-cases-a";
import { portfolioCasesPartB } from "./portfolio-cases-b";

export type CaseStudyMetric = {
  value: string;
  label: string;
};

export type CaseStudyRelatedLink = {
  label: string;
  href: string;
  context: string;
};

export type CaseStudyFaq = {
  question: string;
  answer: string;
};

export type CaseStudyProfile = {
  seoTitle: string;
  metaDescription: string;
  client: string;
  industry: string;
  service: string;
  timeline: string;
  year: string;
  contextImage: string;
  techStack: string[];
  summary: string;
  statement: string;
  challenge: string[];
  approach: string[];
  deliverablesIntro: string;
  deliverables: string[];
  outcome: string;
  finalThoughts: string;
  metrics: CaseStudyMetric[];
  pillars: [
    { index: string; title: string; copy: string },
    { index: string; title: string; copy: string },
  ];
  relatedLinks: CaseStudyRelatedLink[];
  faqs: CaseStudyFaq[];
};

export function portfolioSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const allPortfolioCases: Record<string, CaseStudyProfile> = {
  ...portfolioCasesPartA,
  ...portfolioCasesPartB,
};

export function buildCaseStudyProfile(title: string, category: string): CaseStudyProfile {
  const slug = portfolioSlug(title);
  const bespoke = allPortfolioCases[slug];
  if (bespoke) {
    return bespoke;
  }

  return {
    seoTitle: `${title} — ${category} Case Study`,
    metaDescription: `Explore how Go Execution delivered ${category.toLowerCase()} strategy, design, and engineering for ${title}.`,
    client: title,
    industry: "Enterprise Digital & Brand Growth",
    service: category,
    timeline: "6 – 8 Weeks",
    year: "2026",
    contextImage: "/assets/images/real/technology-saas.jpeg",
    techStack: ["Custom Architecture", "UX Systems", "Performance QA", "Analytics Attribution"],
    summary: `${title} partnered with Go Execution to architect a high-performing ${category.toLowerCase()} solution built around commercial clarity and measurable execution.`,
    statement: `${title} unites disciplined brand direction, user-centered structure, and clean technical execution.`,
    challenge: [
      `${title} needed a cohesive digital asset capable of communicating core value immediately while removing friction across key buyer touchpoints.`,
    ],
    approach: [
      `Go Execution mapped audience intent first, pairing structured visual hierarchy with production-grade implementation tailored to ${category.toLowerCase()} benchmarks.`,
    ],
    deliverablesIntro: `End-to-end strategy, creative execution, and technical QA delivered for ${title}.`,
    deliverables: [
      "Discovery, Competitive Audit & Strategic Scoping",
      "Custom Design System & Visual Direction",
      "Production Engineering & Cross-Device QA",
      "Performance, Accessibility & Attribution Verification",
    ],
    outcome: `${title} launched with sharper market positioning, faster user comprehension, and a scalable foundation for ongoing growth.`,
    finalThoughts: `Combining strategy and execution under one roof ensured every detail served a clear commercial purpose.`,
    metrics: [
      { value: "99", label: "Quality Benchmark" },
      { value: "Sub-1s", label: "Interaction Speed" },
      { value: "AA+", label: "Accessibility Spec" },
    ],
    pillars: [
      {
        index: "01",
        title: "Intent-Led Architecture",
        copy: "Every layout and interaction prioritizes buyer clarity and measurable conversion momentum.",
      },
      {
        index: "02",
        title: "Scalable Production Craft",
        copy: "Clean systems and documented assets ready for long-term team adoption.",
      },
    ],
    relatedLinks: [
      { label: "Explore All Go Execution Services", href: "/services/", context: "Core Capabilities" },
      { label: "Custom Web Development Practice", href: "/services/web-development/", context: "Engineering" },
      { label: "Search Engine Optimization Services", href: "/services/seo/", context: "Organic Growth" },
    ],
    faqs: [
      {
        question: `How can our team scope a project similar to ${title}?`,
        answer:
          "Use the consultation form below or visit our Contact page with your timeline and goals—our Dallas strategy and engineering team responds with a tailored roadmap.",
      },
    ],
  };
}
