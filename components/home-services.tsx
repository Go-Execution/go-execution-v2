import Image from "next/image";
import Link from "next/link";
import { allServiceCategories } from "@/lib/services";
import styles from "./home-services.module.css";

export function HomeServices() {
  return (
    <section className={`ge-section ${styles.section}`} aria-labelledby="home-services-title">
      <span className={styles.gridPattern} aria-hidden="true" />
      <div className={`ge-container ${styles.container}`}>
        <header className={styles.header}>
          <div className={styles.headingBlock}>
            <p className="ge-eyebrow">Integrated Growth Services</p>
            <h2 id="home-services-title">
              Six specialist teams.
              <span> One accountable growth system.</span>
            </h2>
          </div>
          <div className={styles.intro}>
            <p>
              Strategy, engineering, search, performance media, brand design, and product delivery work together to move your business from visibility to measurable revenue.
            </p>
            <Link className="ge-button ge-button--outline" href="/services/">
              <span>Explore All Services</span>
            </Link>
          </div>
        </header>

        <div className={styles.grid}>
          {allServiceCategories.map((service, index) => (
            <article className={styles.card} key={service.slug}>
              <Link
                className={styles.cardLink}
                href={`/services/${service.slug}/`}
                aria-label={`Explore ${service.title}`}
              >
                <div className={styles.media}>
                  <Image
                    className={styles.image}
                    src={service.image}
                    alt={`${service.title} by Go Execution`}
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1080px) 50vw, 33vw"
                    quality={85}
                  />
                  <span className={styles.shade} aria-hidden="true" />

                  <div className={styles.topline}>
                    <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                    <span className={styles.count}>{service.subServiceSlugs.length} specialist services</span>
                  </div>
                </div>

                <div className={styles.content}>
                  <p className={styles.eyebrow}>{service.eyebrow}</p>
                  <h3>{service.title}</h3>
                  <p className={styles.description}>{service.description}</p>

                  <div className={styles.capabilities} aria-label="Featured capabilities">
                    {service.capabilities.slice(0, 2).map((capability) => (
                      <span key={capability}>{capability}</span>
                    ))}
                  </div>

                  <div className={styles.cardFooter}>
                    <span>{index === 0 ? "View the full engineering practice" : service.capabilities[0]}</span>
                    <b aria-hidden="true">↗</b>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className={styles.outcomes}>
          <div><span>01</span><strong>One strategy across every channel</strong></div>
          <div><span>02</span><strong>Senior specialists, not disconnected vendors</strong></div>
          <div><span>03</span><strong>Performance measured against commercial goals</strong></div>
          <Link href="/contact/">Build your growth system <b aria-hidden="true">→</b></Link>
        </div>
      </div>
    </section>
  );
}
