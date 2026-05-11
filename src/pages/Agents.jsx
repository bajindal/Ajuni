import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Check, Briefcase, PenTool, Users, MessageCircle, Banknote,
  FileText, FileSearch, ShieldCheck, Bell, TrendingUp, Target, Search
} from "lucide-react";
import { Reveal } from "../components/Primitives";
import { AGENTS } from "../data/content";
import "./Inner.css";

const ICONS = {
  Briefcase, PenTool, Users, MessageCircle, Banknote, FileText,
  FileSearch, ShieldCheck, Bell, TrendingUp, Target, Search,
};

export default function Agents() {
  const fns = useMemo(
    () => ["All", ...Array.from(new Set(AGENTS.map((a) => a.fn)))],
    []
  );
  const [filter, setFilter] = useState("All");
  const list = filter === "All" ? AGENTS : AGENTS.filter((a) => a.fn === filter);

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
            <span style={{ color: "var(--text-on-dark)" }}>Agents</span>
          </div>
          <h1>The Ajuni <br /><span className="serif">agent roster.</span></h1>
          <p className="lede">
            Twelve production-ready agents across Sales, Marketing, HR,
            Support, Finance, Procurement, and Compliance. Use one. Use all.
            Build your own.
          </p>
          <div className="inner-hero-ctas">
            <Link to="/contact" className="btn-on-dark">Book a demo <ArrowRight size={14} /></Link>
            <Link to="/platform" className="btn-outline-dark">Build your own</Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="section-inner">
          <Reveal className="section-head">
            <span className="section-tag">All agents</span>
            <h2 className="section-h">Specialists, <span className="serif">on tap.</span></h2>
          </Reveal>

          <div className="sh-tabs" role="tablist">
            {fns.map((f) => (
              <button
                key={f}
                className={`sh-tab ${filter === f ? "active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="agents-grid-page">
            {list.map((a) => {
              const Ico = ICONS[a.icon] || Briefcase;
              return (
                <Reveal key={a.name}>
                  <div className="agent-card-page">
                    <div className="acp-head">
                      <div className="acp-icon"><Ico size={22} /></div>
                      <span className="acp-fn">{a.fn}</span>
                    </div>
                    <div>
                      <div className="acp-name">{a.name}</div>
                      <div className="acp-role">{a.role}</div>
                    </div>
                    <p className="acp-desc">{a.desc}</p>
                    {a.capabilities && (
                      <ul className="acp-caps">
                        {a.capabilities.map((c) => (
                          <li key={c} className="acp-cap"><Check size={13} /> {c}</li>
                        ))}
                      </ul>
                    )}
                    {a.metric && (
                      <div className="acp-foot">
                        <div className="acp-metric">
                          <span className="acp-metric-num tabular">{a.metric.n}</span>
                          <span className="acp-metric-lbl">{a.metric.l}</span>
                        </div>
                        <div className="acp-arrow"><ArrowRight size={14} /></div>
                      </div>
                    )}
                  </div>
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
          <h2>Need an agent we don't <span className="serif">have yet?</span></h2>
          <p>Custom agents in 2–3 weeks. Talk to an architect.</p>
          <div className="hero-ctas">
            <Link to="/contact" className="btn-on-dark">Book a demo <ArrowRight size={14} /></Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
