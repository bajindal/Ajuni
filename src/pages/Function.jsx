import { useParams, Link } from "react-router-dom";
import {
  ArrowRight, Check, Briefcase, PenTool, Users, MessageCircle, Banknote,
  FileText, FileSearch, ShieldCheck, Bell, TrendingUp, Target, Search,
  Megaphone, Headphones, Calculator, Package,
} from "lucide-react";
import { Reveal } from "../components/Primitives";
import { FUNCTIONS, AGENTS } from "../data/content";
import "./Inner.css";

const AGENT_ICONS = {
  Briefcase, PenTool, Users, MessageCircle, Banknote, FileText,
  FileSearch, ShieldCheck, Bell, TrendingUp, Target, Search,
};
const FUNCTION_ICONS = {
  TrendingUp, Megaphone, Users, Headphones, Calculator, Package,
};

export default function Func() {
  const { slug } = useParams();
  const fn = FUNCTIONS.find((f) => f.slug === slug);

  if (!fn) {
    return (
      <div className="page-enter">
        <section className="inner-hero">
          <div className="inner-hero-inner">
            <h1>Function not found</h1>
            <Link to="/" className="btn-on-dark">Back home <ArrowRight size={14} /></Link>
          </div>
        </section>
      </div>
    );
  }

  // Map function slug → set of agent.fn values that belong to it
  // (FUNCTIONS use full names like "Human Resources" while AGENTS use shortened tags like "HR")
  const SLUG_TO_AGENT_FN = {
    sales: ["Sales"],
    marketing: ["Marketing"],
    hr: ["HR"],
    support: ["Support"],
    finance: ["Finance"],
    procurement: ["Procurement"],
  };
  const matchSet = SLUG_TO_AGENT_FN[slug] || [fn.name];
  const fnAgents = AGENTS.filter((a) => matchSet.includes(a.fn));
  const otherFns = FUNCTIONS.filter((f) => f.slug !== slug).slice(0, 3);

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
            <Link to="/">Functions</Link><span>/</span>
            <span style={{ color: "var(--text-on-dark)" }}>{fn.name}</span>
          </div>
          <h1>
            AI agents for <br />
            <span className="serif">{fn.name}.</span>
          </h1>
          <p className="lede">{fn.desc}</p>
          <div className="inner-hero-ctas">
            <Link to="/contact" className="btn-on-dark">Book a demo <ArrowRight size={14} /></Link>
            <Link to="/agents" className="btn-outline-dark">All agents</Link>
          </div>
        </div>
      </section>

      <section className="section two-col">
        <div className="section-inner">
          <Reveal className="left">
            <span className="section-tag">{fn.tagline}</span>
            <h2>Stop tracking work. <span className="serif">Start running it.</span></h2>
            <p>
              Ajuni's {fn.name.toLowerCase()} agents handle the repetitive,
              high-volume work — so your team focuses on judgment and
              relationships. Connected to your CRM, ATS, ERP, or whatever runs
              your stack today.
            </p>
            <div className="use-list">
              {fn.agents.map((a, i) => (
                <div key={a} className="use-item">
                  <div className="use-num">{String(i + 1).padStart(2, "0")}</div>
                  <div className="use-text"><strong>{a}</strong></div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="right" delay={120}>
            <div className="right-card">
              <div className="right-card-inner">
                <div style={{ marginBottom: 24 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: "rgba(167,139,250,.15)", display: "grid",
                    placeItems: "center", color: "var(--accent-on-dark)",
                    marginBottom: 16
                  }}>
                    <Briefcase size={22} />
                  </div>
                </div>
                <div className="rc-stat-num tabular">{fn.metrics.n}</div>
                <div className="rc-stat-lbl">{fn.metrics.l}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {fnAgents.length > 0 && (
        <section className="section" style={{ background: "var(--surface)" }}>
          <div className="section-inner">
            <Reveal className="section-head">
              <span className="section-tag">Agents in this function</span>
              <h2 className="section-h">Specialists, <span className="serif">not generalists.</span></h2>
            </Reveal>
            <div className="agents-grid-page">
              {fnAgents.map((a) => {
                const AIco = AGENT_ICONS[a.icon] || Briefcase;
                return (
                  <Reveal key={a.name}>
                    <Link to="/agents" className="agent-card-page">
                      <div className="acp-head">
                        <div className="acp-icon"><AIco size={22} /></div>
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
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="section-inner">
          <Reveal className="section-head">
            <span className="section-tag">Other functions</span>
            <h2 className="section-h">Agents for every team.</h2>
          </Reveal>
          <div className="rich-card-grid">
            {otherFns.map((f) => {
              const FIco = FUNCTION_ICONS[f.icon] || Briefcase;
              return (
                <Reveal key={f.slug}>
                  <Link to={`/functions/${f.slug}`} className="rich-card">
                    <div className="rich-card-head">
                      <div className="rich-card-icon"><FIco size={22} /></div>
                      <span className="rich-card-tag">Function</span>
                    </div>
                    <div className="rich-card-body">
                      <h3>{f.name}</h3>
                      <p className="rich-card-tagline">{f.tagline}</p>
                    </div>
                    <div className="rich-card-stat">
                      <span className="rich-card-stat-num tabular">{f.metrics.n}</span>
                      <span className="rich-card-stat-lbl">{f.metrics.l}</span>
                    </div>
                    <div className="rich-card-pills-wrap">
                      <span className="rich-card-pills-lbl">Includes</span>
                      <div className="rich-card-pills">
                        {f.agents.slice(0, 3).map((a) => (
                          <span key={a} className="rich-card-pill">{a.split(" (")[0]}</span>
                        ))}
                      </div>
                    </div>
                    <div className="rich-card-cta">
                      Explore {f.name} <ArrowRight size={14} />
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
          <h2>Build your <span className="serif">{fn.name.toLowerCase()}</span> agent team.</h2>
          <p>Talk to an architect about which agents will move the needle for your team.</p>
          <div className="hero-ctas">
            <Link to="/contact" className="btn-on-dark">Book a demo <ArrowRight size={14} /></Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
