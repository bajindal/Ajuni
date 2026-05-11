import { Link } from "react-router-dom";
import { ArrowRight, Quote as QuoteIcon, Building2, Plus, Landmark, ShoppingBag, Factory, Cpu, Briefcase } from "lucide-react";
import { Reveal } from "../components/Primitives";
import { CASE_STUDIES, TESTIMONIALS } from "../data/content";
import "./Inner.css";
import "./CaseStudies.css";

const INDUSTRY_ICON = {
  "BFSI": Building2,
  "Healthcare": Plus,
  "Government": Landmark,
  "Retail": ShoppingBag,
  "Manufacturing": Factory,
  "IT / SaaS": Cpu,
  "Travel & Hospitality": Briefcase,
};

function monogram(name) {
  return name
    .replace(/&/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function CaseStudies() {
  const withTestimonials = CASE_STUDIES.filter((c) => c.status === "testimonial");
  const logosOnly = CASE_STUDIES.filter((c) => c.status === "logo");

  return (
    <div className="page-enter">
      {/* HERO */}
      <section className="inner-hero">
        <div className="inner-hero-grid" aria-hidden="true" />
        <div className="hero-orbs" aria-hidden="true">
          <div className="orb orb-1" />
          <div className="orb orb-3" />
        </div>
        <div className="inner-hero-inner">
          <div className="crumbs">
            <Link to="/">Home</Link><span>/</span>
            <span style={{ color: "var(--text-on-dark)" }}>Case studies</span>
          </div>
          <h1>How teams put Ajuni <br /><span className="serif">to work.</span></h1>
          <p className="lede">
            Banks, hospitals, governments, manufacturers — across India and the
            wider world. A growing library of customer stories. Pick a name to
            request the full deck.
          </p>
        </div>
      </section>

      {/* QUOTE STRIP — real testimonials only */}
      <section className="section section-tight cs-quotes">
        <div className="section-inner">
          <Reveal className="section-head">
            <span className="section-tag">In their words</span>
            <h2 className="section-h">Why customers <span className="serif">picked Ajuni.</span></h2>
          </Reveal>
          <div className="cs-quote-grid">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={i} delay={i * 80}>
                <article className="cs-quote-card">
                  <QuoteIcon size={22} className="cs-quote-icon" />
                  <q>{t.q}</q>
                  <div className="cs-quote-author">
                    <span className="cs-quote-avatar" style={{ background: t.c }}>{t.a}</span>
                    <div>
                      <div className="cs-quote-name">{t.n}</div>
                      <div className="cs-quote-role">{t.r}</div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GRID — all customers as cards */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="section-inner">
          <Reveal className="section-head">
            <span className="section-tag">Library</span>
            <h2 className="section-h">Browse by <span className="serif">customer.</span></h2>
            <p className="section-sub">
              Cards marked <strong>Read story</strong> have a published case study or testimonial.
              The rest are customer logos with full case studies in production —
              request the deck and our team will share it under NDA.
            </p>
          </Reveal>

          <div className="cs-grid">
            {[...withTestimonials, ...logosOnly].map((c, idx) => {
              const Ico = INDUSTRY_ICON[c.industry] || Briefcase;
              const ready = c.status === "testimonial";
              return (
                <Reveal key={c.slug} delay={idx * 30}>
                  <Link to={`/case-studies/${c.slug}`} className={`cs-card ${ready ? "ready" : "pending"}`}>
                    <div className="cs-card-head">
                      <span className="cs-mono">{monogram(c.name)}</span>
                      <span className={`cs-status ${ready ? "ready" : "pending"}`}>
                        {ready ? "Read story" : "Request deck"}
                      </span>
                    </div>
                    <h3>{c.name}</h3>
                    <div className="cs-meta">
                      <span className="cs-meta-pill"><Ico size={12} /> {c.industry}</span>
                      <span className="cs-meta-pill cs-meta-region">{c.region}</span>
                    </div>
                    <div className="cs-card-foot">
                      <span>{ready ? "View story" : "Request the deck"}</span>
                      <ArrowRight size={14} />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
