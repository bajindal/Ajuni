import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowRight, Check, Building2, Plus, Minus, Landmark, ShoppingBag, Factory, Cpu,
  Briefcase, PenTool, Users, MessageCircle, Banknote, FileText,
  FileSearch, ShieldCheck, Bell, TrendingUp, Target, Search, Server, BadgeCheck, Calendar,
} from "lucide-react";
import { Reveal } from "../components/Primitives";
import { INDUSTRIES, AGENTS } from "../data/content";
import "./Inner.css";

const ICONS = {
  bfsi: Building2,
  healthcare: Plus,
  government: Landmark,
  retail: ShoppingBag,
  manufacturing: Factory,
  "it-saas": Cpu,
};

const AGENT_ICONS = {
  Briefcase, PenTool, Users, MessageCircle, Banknote, FileText,
  FileSearch, ShieldCheck, Bell, TrendingUp, Target, Search,
};

export default function Industry() {
  const { slug } = useParams();
  const industry = INDUSTRIES.find((i) => i.slug === slug);

  if (!industry) {
    return (
      <div className="page-enter">
        <section className="inner-hero">
          <div className="inner-hero-inner">
            <h1>Industry not found</h1>
            <p className="lede">We don't have a page for that. Try another industry.</p>
            <Link to="/" className="btn-on-dark">Back home <ArrowRight size={14} /></Link>
          </div>
        </section>
      </div>
    );
  }

  const Ico = ICONS[slug] || Building2;
  const otherInds = INDUSTRIES.filter((i) => i.slug !== slug).slice(0, 3);

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
            <Link to="/">Industries</Link><span>/</span>
            <span style={{ color: "var(--text-on-dark)" }}>{industry.short}</span>
          </div>
          <h1>
            AI agents for <br />
            <span className="serif">{industry.name}.</span>
          </h1>
          <p className="lede">{industry.desc}</p>
          <div className="inner-hero-ctas">
            <Link to="/contact" className="btn-on-dark"><Calendar size={14} /> Schedule {industry.short} workshop</Link>
            <Link to="/customers" className="btn-outline-dark">See case studies</Link>
          </div>
        </div>
      </section>

      {/* COMPLIANCE + CORE SYSTEMS BAR */}
      {(industry.compliance || industry.coreSystems) && (
        <section className="ind-stripe">
          <div className="section-inner">
            <div className="ind-stripe-grid">
              {industry.compliance && (
                <div className="ind-stripe-block">
                  <div className="ind-stripe-h">
                    <BadgeCheck size={14} /> Compliance
                  </div>
                  <div className="ind-stripe-pills">
                    {industry.compliance.map((c) => (
                      <span key={c} className="ind-stripe-pill">{c}</span>
                    ))}
                  </div>
                </div>
              )}
              {industry.coreSystems && (
                <div className="ind-stripe-block">
                  <div className="ind-stripe-h">
                    <Server size={14} /> Core systems supported
                  </div>
                  <div className="ind-stripe-pills">
                    {industry.coreSystems.map((s) => (
                      <span key={s} className="ind-stripe-pill ind-stripe-pill-soft">{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* USE CASES */}
      <section className="section two-col">
        <div className="section-inner">
          <Reveal className="left">
            <span className="section-tag">Use cases</span>
            <h2>Where Ajuni works in <span className="serif">{industry.short}.</span></h2>
            <p>{industry.tagline}</p>
            <div className="use-list">
              {industry.useCases.map((u, i) => (
                <div key={u} className="use-item">
                  <div className="use-num">{String(i + 1).padStart(2, "0")}</div>
                  <div className="use-text">{u}</div>
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
                    <Ico size={22} />
                  </div>
                </div>
                <div className="rc-stat-num tabular">{industry.stat.n}</div>
                <div className="rc-stat-lbl">{industry.stat.l}</div>
                <div className="rc-customers">
                  <div className="rc-label">Trusted by</div>
                  <div className="rc-cust-list">
                    {industry.customers.map((c) => (
                      <span key={c} className="rc-cust-pill">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* RECOMMENDED AGENTS */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="section-inner">
          <Reveal className="section-head">
            <span className="section-tag">Recommended agents</span>
            <h2 className="section-h">Pre-built for <span className="serif">{industry.short}.</span></h2>
            <p className="section-sub">
              These agents come with industry-specific guardrails, data
              schemas, and compliance defaults. Production-ready in weeks.
            </p>
          </Reveal>
          <div className="agents-grid-page">
            {AGENTS.slice(0, 6).map((a) => {
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

      {/* OTHER INDUSTRIES */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="section-inner">
          <Reveal className="section-head">
            <span className="section-tag">Other industries</span>
            <h2 className="section-h">One platform, <span className="serif">every domain.</span></h2>
          </Reveal>
          <div className="rich-card-grid">
            {otherInds.map((i) => {
              const II = ICONS[i.slug] || Building2;
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
                      Explore {i.short} <ArrowRight size={14} />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* INDUSTRY-SPECIFIC FAQ */}
      {industry.faqs && industry.faqs.length > 0 && <IndustryFAQ industry={industry} />}

      {/* CTA */}
      <section className="cta-final">
        <div className="cta-orbs" aria-hidden="true">
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>
        <Reveal className="cta-inner">
          <h2>Ready to deploy in <span className="serif">{industry.short}?</span></h2>
          <p>90-minute architecture workshop with an agent architect who knows {industry.short}. No slides, just whiteboarding your stack.</p>
          <div className="hero-ctas">
            <Link to="/contact" className="btn-on-dark"><Calendar size={14} /> Schedule workshop</Link>
            <Link to="/pricing" className="btn-outline-dark">See pricing</Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

function IndustryFAQ({ industry }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="section ind-faq" style={{ background: "var(--surface)" }}>
      <div className="section-inner faq-inner">
        <Reveal className="section-head">
          <span className="section-tag">{industry.short} questions</span>
          <h2 className="section-h">What buyers actually ask <span className="serif">about {industry.short}.</span></h2>
          <p className="section-sub">
            Answers from our embedded architects. The full {industry.short} pack
            (architecture diagrams, KPI deltas, integration list) is on request.
          </p>
        </Reveal>
        <div className="faq-list">
          {industry.faqs.map((f, idx) => (
            <div key={f.q} className={`faq-item ${open === idx ? "open" : ""}`}>
              <button
                className="faq-q"
                onClick={() => setOpen((o) => (o === idx ? -1 : idx))}
                aria-expanded={open === idx}
              >
                <span>{f.q}</span>
                <span className="faq-icon">{open === idx ? <Minus size={18} /> : <Plus size={18} />}</span>
              </button>
              <div className="faq-a-wrap">
                <p className="faq-a">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
