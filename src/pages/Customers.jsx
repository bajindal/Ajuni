import { Link } from "react-router-dom";
import {
  ArrowRight, Building2, Plus, Landmark, ShoppingBag, Factory, Cpu,
} from "lucide-react";
import { Reveal } from "../components/Primitives";
import { CUSTOMERS, TESTIMONIALS, INDUSTRIES } from "../data/content";
import "./Inner.css";

const INDUSTRY_ICONS = {
  bfsi: Building2,
  healthcare: Plus,
  government: Landmark,
  retail: ShoppingBag,
  manufacturing: Factory,
  "it-saas": Cpu,
};

export default function Customers() {
  return (
    <div className="page-enter">
      <section className="inner-hero">
        <div className="inner-hero-grid" aria-hidden="true" />
        <div className="hero-orbs" aria-hidden="true">
          <div className="orb orb-1" />
          <div className="orb orb-3" />
        </div>
        <div className="inner-hero-inner">
          <div className="crumbs">
            <Link to="/">Home</Link><span>/</span>
            <span style={{ color: "var(--text-on-dark)" }}>Customers</span>
          </div>
          <h1>The companies <br /><span className="serif">building with Ajuni.</span></h1>
          <p className="lede">
            From Parliament of India to mid-tier banks, hospital chains to
            D2C retailers — Ajuni runs in the most demanding environments
            India has.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="section-inner">
          <Reveal className="section-head">
            <span className="section-tag">Trusted by</span>
            <h2 className="section-h">Real workloads, <span className="serif">real customers.</span></h2>
          </Reveal>
          <div className="cust-logo-grid">
            {CUSTOMERS.map((c) => {
              const mono = c
                .replace(/&/g, "")
                .split(/\s+/)
                .filter(Boolean)
                .slice(0, 2)
                .map((w) => w[0])
                .join("")
                .toUpperCase();
              return (
                <Reveal key={c}>
                  <div className="cust-logo">
                    <span className="cust-mono">{mono}</span>
                    {c}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="section-inner">
          <Reveal className="section-head">
            <span className="section-tag">In their words</span>
            <h2 className="section-h">From the <span className="serif">leaders running it.</span></h2>
          </Reveal>
          <div className="agents-grid-page">
            {TESTIMONIALS.map((t, idx) => (
              <Reveal key={idx} delay={idx * 80}>
                <div className="agent-card-page" style={{ minHeight: 280 }}>
                  <div style={{
                    fontFamily: "Instrument Serif, serif", fontStyle: "italic",
                    fontSize: 64, color: "var(--accent-100)", lineHeight: 0.5,
                    marginBottom: 8
                  }}>"</div>
                  <p style={{
                    fontFamily: "Instrument Serif, serif", fontStyle: "italic",
                    fontSize: 16, lineHeight: 1.5, color: "var(--text)", flex: 1
                  }}>
                    {t.q}
                  </p>
                  <div style={{ display: "flex", gap: 12, alignItems: "center", paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                    <div className="ca-avatar" style={{ background: t.c, width: 40, height: 40 }}>{t.a}</div>
                    <div>
                      <div className="ca-name">{t.n}</div>
                      <div className="ca-role">{t.r}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="section-inner">
          <Reveal className="section-head">
            <span className="section-tag">By industry</span>
            <h2 className="section-h">Production deployments <span className="serif">across India.</span></h2>
          </Reveal>
          <div className="rich-card-grid">
            {INDUSTRIES.map((i) => {
              const II = INDUSTRY_ICONS[i.slug] || Building2;
              return (
                <Reveal key={i.slug}>
                  <Link to={`/industries/${i.slug}`} className="rich-card">
                    <div className="rich-card-head">
                      <div className="rich-card-icon"><II size={22} /></div>
                      <span className="rich-card-tag">Industry</span>
                    </div>
                    <div className="rich-card-body">
                      <h3>{i.name}</h3>
                      <p className="rich-card-tagline">{i.tagline}</p>
                    </div>
                    <div className="rich-card-stat">
                      <span className="rich-card-stat-num tabular">{i.stat.n}</span>
                      <span className="rich-card-stat-lbl">{i.stat.l}</span>
                    </div>
                    <div className="rich-card-pills-wrap">
                      <span className="rich-card-pills-lbl">Trusted by</span>
                      <div className="rich-card-pills">
                        {i.customers.slice(0, 3).map((c) => (
                          <span key={c} className="rich-card-pill">{c}</span>
                        ))}
                      </div>
                    </div>
                    <div className="rich-card-cta">
                      See use cases <ArrowRight size={14} />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="cta-final">
        <div className="cta-orbs" aria-hidden="true">
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>
        <Reveal className="cta-inner">
          <h2>Be the next <span className="serif">case study.</span></h2>
          <p>Talk to an architect about getting your first agent in production.</p>
          <div className="hero-ctas">
            <Link to="/contact" className="btn-on-dark">Book a demo <ArrowRight size={14} /></Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
