import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../components/Primitives";
import { INTEGRATIONS } from "../data/content";
import "./Inner.css";

export default function Integrations() {
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
            <span style={{ color: "var(--text-on-dark)" }}>Integrations</span>
          </div>
          <h1>Plays nicely with <br /><span className="serif">everything you use.</span></h1>
          <p className="lede">
            100+ pre-built connectors. SAP, Salesforce, Tally, ABDM,
            WhatsApp, every major cloud, every major model. APIs and SDKs
            for the rest.
          </p>
          <div className="inner-hero-ctas">
            <Link to="/contact" className="btn-on-dark">Request a connector <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="section-inner">
          <Reveal className="section-head">
            <span className="section-tag">Connectors</span>
            <h2 className="section-h">Built for <span className="serif">your stack.</span></h2>
            <p className="section-sub">
              Every category that matters in an Indian enterprise — from
              government rails to global SaaS — pre-wired and ready.
            </p>
          </Reveal>
          <div className="integ-grid-page">
            {Object.entries(INTEGRATIONS).map(([cat, items], idx) => (
              <Reveal key={cat} delay={idx * 50}>
                <div className="integ-cat-card">
                  <h4>{cat}</h4>
                  <div className="integ-items-page">
                    {items.map((it) => (
                      <span key={it} className="integ-pill-page">{it}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-final">
        <div className="cta-orbs" aria-hidden="true">
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>
        <Reveal className="cta-inner">
          <h2>Don't see your <span className="serif">tool?</span></h2>
          <p>We build custom connectors in 1–2 weeks. APIs and SDKs available for self-serve.</p>
          <div className="hero-ctas">
            <Link to="/contact" className="btn-on-dark">Talk to us <ArrowRight size={14} /></Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
