import { useParams, Link } from "react-router-dom";
import {
  ArrowRight, Check, Workflow, Network, Database, Share2,
  ShieldAlert, Scale, Activity, Lock,
} from "lucide-react";
import { Reveal } from "../components/Primitives";
import { MODULES } from "../data/content";
import "./Inner.css";

const ICONS = {
  Workflow, Network, Database, Share2, ShieldAlert, Scale, Activity, Lock,
};

const LAYER_TONE = {
  Build:  { tag: "Layer 1 · Build",  color: "var(--accent)" },
  Govern: { tag: "Layer 2 · Govern", color: "var(--success)" },
  Run:    { tag: "Layer 3 · Run",    color: "var(--accent-on-dark)" },
};

export default function Module() {
  const { slug } = useParams();
  const mod = MODULES.find((m) => m.slug === slug);

  if (!mod) {
    return (
      <div className="page-enter">
        <section className="inner-hero">
          <div className="inner-hero-inner">
            <h1>Module not found</h1>
            <p className="lede">We don't have a page for that module.</p>
            <Link to="/platform" className="btn-on-dark">
              Back to platform <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const Ico = ICONS[mod.icon] || Workflow;
  const layer = LAYER_TONE[mod.layer] || LAYER_TONE.Build;
  const otherMods = MODULES.filter((m) => m.slug !== slug).slice(0, 3);

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
            <Link to="/platform">Platform</Link><span>/</span>
            <span style={{ color: "var(--text-on-dark)" }}>{mod.name}</span>
          </div>
          <div className="module-hero-eyebrow">
            <span className="module-hero-icon"><Ico size={18} /></span>
            <span className="module-hero-layer" style={{ color: layer.color }}>{layer.tag}</span>
          </div>
          <h1>{mod.name}<span className="serif">.</span></h1>
          <p className="lede">{mod.tagline}</p>
          <div className="inner-hero-ctas">
            <Link to="/contact" className="btn-on-dark">Book a demo <ArrowRight size={14} /></Link>
            <Link to="/pricing" className="btn-outline-dark">See pricing</Link>
          </div>
        </div>
      </section>

      {/* OVERVIEW (two-col: long copy + metric card) */}
      <section className="section two-col">
        <div className="section-inner">
          <Reveal className="left">
            <span className="section-tag">What it does</span>
            <h2>The <span className="serif">{mod.name.toLowerCase()}</span> layer.</h2>
            <p>{mod.longDesc}</p>
            <Link to="/platform" className="btn-primary">
              Explore the full platform <ArrowRight size={14} />
            </Link>
          </Reveal>
          <Reveal className="right" delay={120}>
            <div className="right-card">
              <div className="right-card-inner">
                <div style={{
                  width: 56, height: 56, borderRadius: 14,
                  background: "rgba(167,139,250,.14)",
                  border: "1px solid rgba(167,139,250,.28)",
                  display: "grid", placeItems: "center",
                  color: "var(--accent-on-dark)",
                  marginBottom: 24,
                }}>
                  <Ico size={26} />
                </div>
                <div className="rc-stat-num tabular">{mod.metric.n}</div>
                <div className="rc-stat-lbl">{mod.metric.l}</div>
                <div className="rc-customers">
                  <div className="rc-label">Plays nicely with</div>
                  <div className="rc-cust-list">
                    {mod.integrations.map((c) => (
                      <span key={c} className="rc-cust-pill">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="section-inner">
          <Reveal className="section-head">
            <span className="section-tag">Features</span>
            <h2 className="section-h">
              Built for <span className="serif">production teams.</span>
            </h2>
            <p className="section-sub">
              Every feature is shipped with telemetry, docs, and an opinionated
              default. Override what you need; trust the defaults for the rest.
            </p>
          </Reveal>
          <div className="module-features">
            {mod.features.map((f, i) => (
              <Reveal key={f.name} delay={i * 60}>
                <div className="module-feature">
                  <div className="module-feature-num tabular">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="module-feature-body">
                    <h3>{f.name}</h3>
                    <p>{f.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="section-inner">
          <Reveal className="section-head">
            <span className="section-tag">In production</span>
            <h2 className="section-h">
              Where <span className="serif">{mod.name}</span> earns its keep.
            </h2>
          </Reveal>
          <div className="module-cases">
            {mod.useCases.map((u, i) => (
              <Reveal key={u} delay={i * 60}>
                <div className="module-case">
                  <Check size={18} />
                  <span>{u}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OTHER MODULES */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="section-inner">
          <Reveal className="section-head">
            <span className="section-tag">Keep exploring</span>
            <h2 className="section-h">
              The rest of the <span className="serif">platform.</span>
            </h2>
          </Reveal>
          <div className="rich-card-grid">
            {otherMods.map((m) => {
              const MIco = ICONS[m.icon] || Workflow;
              return (
                <Reveal key={m.slug}>
                  <Link to={`/modules/${m.slug}`} className="rich-card">
                    <div className="rich-card-head">
                      <div className="rich-card-icon"><MIco size={22} /></div>
                      <span className="rich-card-tag">{m.layer}</span>
                    </div>
                    <div className="rich-card-body">
                      <h3>{m.name}</h3>
                      <p className="rich-card-tagline">{m.tagline}</p>
                    </div>
                    <div className="rich-card-stat">
                      <span className="rich-card-stat-num tabular">{m.metric.n}</span>
                      <span className="rich-card-stat-lbl">{m.metric.l}</span>
                    </div>
                    <div className="rich-card-cta">
                      Explore {m.name} <ArrowRight size={14} />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-final">
        <div className="cta-orbs" aria-hidden="true">
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>
        <Reveal className="cta-inner">
          <h2>
            Ship <span className="serif">{mod.name.toLowerCase()}</span><br />
            into production.
          </h2>
          <p>30-minute walkthrough with an architect. Bring your hardest use case.</p>
          <div className="hero-ctas">
            <Link to="/contact" className="btn-on-dark">Book a demo <ArrowRight size={14} /></Link>
            <Link to="/pricing" className="btn-outline-dark">See pricing</Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
