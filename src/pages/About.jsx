import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Users, MapPin, Award } from "lucide-react";
import { Reveal } from "../components/Primitives";
import "./Inner.css";

export default function About() {
  const values = [
    { ico: Sparkles, h: "India-first, world-ready", p: "We build for India's languages, regulators, and infrastructure — and the rest of the world inherits the rigor." },
    { ico: Users, h: "Embedded, not extracted", p: "Architects work alongside your team. We win when you win, not when you renew." },
    { ico: Award, h: "CMMI L5 by default", p: "Webority's delivery muscle is what makes Ajuni production-ready, not just demo-ready." },
    { ico: MapPin, h: "Sovereign by design", p: "Your data, your country, your control. Always." },
  ];

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
            <span style={{ color: "var(--text-on-dark)" }}>About</span>
          </div>
          <h1>Building the <br /><span className="serif">control plane for Indian AI.</span></h1>
          <p className="lede">
            Ajuni is a Webority Technologies product. Made in Gurgaon. Built
            for the enterprises and government bodies that have trusted
            Webority for over a decade — and deserve a sovereign AI partner.
          </p>
        </div>
      </section>

      <section className="section two-col">
        <div className="section-inner">
          <Reveal className="left">
            <span className="section-tag">Our story</span>
            <h2>Started with a question: <span className="serif">why do we trust foreign clouds with India's books?</span></h2>
            <p>
              For 13+ years, Webority has built mission-critical software for
              Parliament of India, DRDO, Johnson &amp; Johnson, TVS Group, and
              DreamFolks. We saw the same pattern over and over: enterprises
              and government bodies wanted AI agents, but every credible
              platform was American, hosted abroad, or built without
              understanding Indian compliance.
            </p>
            <p>
              Ajuni is the answer. An agentic AI platform built in India, for
              India — with the global craftsmanship that comes from being
              CMMI Level 5, ISO 27001, ISO 9001 certified.
            </p>
            <Link to="/customers" className="btn-primary">See who's using it <ArrowRight size={14} /></Link>
          </Reveal>
          <Reveal className="right" delay={120}>
            <div className="right-card">
              <div className="right-card-inner">
                <div className="rc-stat-num">13+</div>
                <div className="rc-stat-lbl">years of enterprise delivery via Webority</div>
                <div className="rc-customers">
                  <div className="rc-label">Long-term clients include</div>
                  <div className="rc-cust-list">
                    <span className="rc-cust-pill">Parliament of India</span>
                    <span className="rc-cust-pill">DRDO</span>
                    <span className="rc-cust-pill">Johnson &amp; Johnson</span>
                    <span className="rc-cust-pill">TVS Group</span>
                    <span className="rc-cust-pill">DreamFolks</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="section-inner">
          <Reveal className="section-head">
            <span className="section-tag">What we believe</span>
            <h2 className="section-h">Four principles that <span className="serif">don't compromise.</span></h2>
          </Reveal>
          <div className="trust-grid" style={{ position: "relative" }}>
            {values.map((v, idx) => {
              const Ico = v.ico;
              return (
                <Reveal key={v.h} delay={idx * 60}>
                  <div style={{
                    background: "var(--surface)", border: "1px solid var(--border)",
                    borderRadius: "var(--r-lg)", padding: 24
                  }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: "var(--accent-100)", color: "var(--accent)",
                      display: "grid", placeItems: "center", marginBottom: 14
                    }}>
                      <Ico size={20} />
                    </div>
                    <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{v.h}</h4>
                    <p style={{ fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.55 }}>{v.p}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="section-inner">
          <Reveal className="section-head">
            <span className="section-tag">Made in India</span>
            <h2 className="section-h">Headquartered in <span className="serif">Gurgaon.</span></h2>
            <p className="section-sub">
              80+ engineers. CMMI Level 5. ISO 27001 + 9001 certified.
              Building for India, deployed across India, growing with India.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="cta-final">
        <div className="cta-orbs" aria-hidden="true">
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>
        <Reveal className="cta-inner">
          <h2>Want to <span className="serif">work with us?</span></h2>
          <p>We're hiring agent architects, ML engineers, and solutions consultants.</p>
          <div className="hero-ctas">
            <Link to="/contact" className="btn-on-dark">Get in touch <ArrowRight size={14} /></Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
