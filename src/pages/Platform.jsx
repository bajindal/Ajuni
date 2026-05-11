import { Link } from "react-router-dom";
import {
  ArrowRight, Workflow, Network, Database, Share2, ShieldAlert,
  Scale, Activity, Lock, Check
} from "lucide-react";
import { Reveal } from "../components/Primitives";
import { MODULES } from "../data/content";
import "./Inner.css";

const ICONS = { Workflow, Network, Database, Share2, ShieldAlert, Scale, Activity, Lock };

export default function Platform() {
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
            <span style={{ color: "var(--text-on-dark)" }}>Platform</span>
          </div>
          <h1>One platform <br /><span className="serif">for the entire agent lifecycle.</span></h1>
          <p className="lede">
            Build, deploy, govern, and observe AI agents at enterprise scale.
            Eight modules, one platform, your data — wherever it needs to live.
          </p>
          <div className="inner-hero-ctas">
            <Link to="/contact" className="btn-on-dark">Book a demo <ArrowRight size={14} /></Link>
            <Link to="/pricing" className="btn-outline-dark">See pricing</Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="section-inner">
          <Reveal className="section-head">
            <span className="section-tag">Modules</span>
            <h2 className="section-h">The platform, <span className="serif">module by module.</span></h2>
            <p className="section-sub">
              Each module solves a specific problem in the agent lifecycle.
              Together, they're the difference between "we have a POC" and
              "agents are running our business."
            </p>
          </Reveal>
          <div className="agents-grid-page">
            {MODULES.map((m, idx) => {
              const Ico = ICONS[m.icon];
              return (
                <Reveal key={m.name} delay={idx * 50}>
                  <Link to={`/modules/${m.slug}`} className="agent-card-page">
                    <div className="acp-head">
                      <div className="acp-icon"><Ico size={22} /></div>
                      <span className="acp-fn">{m.layer}</span>
                    </div>
                    <div>
                      <div className="acp-name">{m.name}</div>
                      <div className="acp-role">{m.tagline}</div>
                    </div>
                    <p className="acp-desc">{m.desc}</p>
                    <div className="acp-foot">
                      <div className="acp-metric">
                        <span className="acp-metric-num tabular">{m.metric.n}</span>
                        <span className="acp-metric-lbl">{m.metric.l}</span>
                      </div>
                      <div className="acp-arrow"><ArrowRight size={14} /></div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section two-col">
        <div className="section-inner">
          <Reveal className="left">
            <span className="section-tag">Architecture</span>
            <h2>Open, extensible, <span className="serif">enterprise-grade.</span></h2>
            <p>
              Bring your own models, your own data, your own deployment
              environment. Ajuni provides the orchestration layer — you stay in
              control of every other choice.
            </p>
            <div className="use-list">
              <div className="use-item">
                <div className="use-num">01</div>
                <div className="use-text"><strong>Multi-model.</strong> GPT-5, Claude Opus 4.7, Gemini, Llama 3, Sarvam — mix per agent.</div>
              </div>
              <div className="use-item">
                <div className="use-num">02</div>
                <div className="use-text"><strong>Multi-cloud.</strong> AWS, Azure, GCP, OCI, or sovereign Yotta. Or on-prem.</div>
              </div>
              <div className="use-item">
                <div className="use-num">03</div>
                <div className="use-text"><strong>Open standards.</strong> A2A protocols, MCP, OpenTelemetry. No vendor lock-in.</div>
              </div>
              <div className="use-item">
                <div className="use-num">04</div>
                <div className="use-text"><strong>Pro-code escape hatch.</strong> Visual builder is fast; SDK is unlimited. Use both.</div>
              </div>
            </div>
          </Reveal>
          <Reveal className="right" delay={120}>
            <div className="right-card">
              <div className="right-card-inner">
                <div className="rc-stat-num tabular">8</div>
                <div className="rc-stat-lbl">production-grade modules, one platform</div>
                <div className="rc-customers">
                  <div className="rc-label">Modules include</div>
                  <div className="rc-cust-list">
                    {MODULES.map((m) => (
                      <span key={m.name} className="rc-cust-pill">{m.name}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cta-final">
        <div className="cta-orbs" aria-hidden="true">
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>
        <Reveal className="cta-inner">
          <h2>Ready to see it <span className="serif">running?</span></h2>
          <p>30-minute walkthrough with an architect. Bring your hardest use case.</p>
          <div className="hero-ctas">
            <Link to="/contact" className="btn-on-dark">Book a demo <ArrowRight size={14} /></Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
