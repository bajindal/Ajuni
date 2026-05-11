import { Link } from "react-router-dom";
import { ArrowRight, FileText, BookOpen, Video, Code } from "lucide-react";
import { Reveal } from "../components/Primitives";
import "./Inner.css";

const RESOURCES = [
  { type: "Whitepaper", title: "The Indian enterprise's guide to agentic AI", desc: "A 32-page playbook on choosing, deploying, and scaling agents in regulated industries.", icon: FileText },
  { type: "Case study", title: "How a mid-tier bank deployed underwriting agents in 7 weeks", desc: "From POC to ₹4.2cr in approved loans — the architecture, decisions, and outcomes.", icon: FileText },
  { type: "Playbook", title: "Building your first compliance agent", desc: "Step-by-step: KYC, AML, DPDP Act, audit trail. With code samples and templates.", icon: BookOpen },
  { type: "Video", title: "Lyzr vs Kore.ai vs Ajuni — a 12-minute walkthrough", desc: "Side-by-side comparison: deployment, languages, security, integrations.", icon: Video },
  { type: "API docs", title: "Build agents with the Ajuni SDK", desc: "Python, Node, Go. Quickstart in 5 minutes. Production patterns.", icon: Code },
  { type: "Webinar", title: "AI agents for Indian healthcare — what works, what doesn't", desc: "With CIOs from Apollo, Manipal, and Cipla. Recorded in November 2025.", icon: Video },
];

export default function Resources() {
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
            <span style={{ color: "var(--text-on-dark)" }}>Resources</span>
          </div>
          <h1>Everything you need to <br /><span className="serif">build with confidence.</span></h1>
          <p className="lede">
            Playbooks, case studies, technical deep-dives, and API docs.
            Written by the architects who deploy Ajuni in production.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="section-inner">
          <Reveal className="section-head">
            <span className="section-tag">Library</span>
            <h2 className="section-h">Read, watch, <span className="serif">build.</span></h2>
          </Reveal>
          <div className="agents-grid-page">
            {RESOURCES.map((r, idx) => {
              const Ico = r.icon;
              return (
                <Reveal key={r.title} delay={idx * 50}>
                  <a href="#" className="agent-card-page" style={{ textDecoration: "none", color: "inherit" }}>
                    <div className="acp-icon"><Ico size={22} /></div>
                    <div>
                      <div className="acp-fn">{r.type}</div>
                      <div className="acp-name" style={{ fontSize: 16 }}>{r.title}</div>
                    </div>
                    <p className="acp-desc">{r.desc}</p>
                    <div style={{ marginTop: "auto", color: "var(--accent)", fontSize: 13, fontWeight: 600, display: "flex", gap: 4, alignItems: "center" }}>
                      Read more <ArrowRight size={14} />
                    </div>
                  </a>
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
          <h2>Get the <span className="serif">whitepaper.</span></h2>
          <p>32 pages. Real architectures. Real numbers. Sent to your inbox.</p>
          <div className="hero-ctas">
            <Link to="/contact" className="btn-on-dark">Request whitepaper <ArrowRight size={14} /></Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
