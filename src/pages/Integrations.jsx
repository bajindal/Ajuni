import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Plus, Check, Zap, Code2, MessageCircle } from "lucide-react";
import { Reveal } from "../components/Primitives";
import { INTEGRATION_CATEGORIES, INTEGRATION_ITEMS } from "../data/content";
import "./Inner.css";

// Brand-tile monogram. Uses the integration's brand color for the fill
// — keeps the page visually rich without shipping third-party logo SVGs
// (avoids trademark/licensing friction).
function monogram(name) {
  return name
    .replace(/[()&]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function IntegrationTile({ item, featured = false }) {
  return (
    <div className={`int-tile ${featured ? "int-tile-featured" : ""}`} title={item.name}>
      <div className="int-tile-logo" style={{ background: item.color }}>
        {monogram(item.name)}
      </div>
      <div className="int-tile-meta">
        <div className="int-tile-name">{item.name}</div>
        <div className="int-tile-cat">{INTEGRATION_CATEGORIES.find((c) => c.id === item.cat)?.label}</div>
      </div>
      <span className="int-tile-tick"><Check size={12} /></span>
    </div>
  );
}

export default function Integrations() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");

  const featured = INTEGRATION_ITEMS.filter((i) => i.featured);

  const counts = useMemo(() => {
    const map = { all: INTEGRATION_ITEMS.length };
    INTEGRATION_CATEGORIES.forEach((c) => {
      if (c.id !== "all") map[c.id] = INTEGRATION_ITEMS.filter((i) => i.cat === c.id).length;
    });
    return map;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return INTEGRATION_ITEMS.filter((i) => {
      if (cat !== "all" && i.cat !== cat) return false;
      if (q && !i.name.toLowerCase().includes(q) && !i.cat.includes(q)) return false;
      return true;
    });
  }, [query, cat]);

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
            <span style={{ color: "var(--text-on-dark)" }}>Integrations</span>
          </div>
          <h1>Plays nicely with <br /><span className="serif">everything you use.</span></h1>
          <p className="lede">
            <strong className="tabular">{INTEGRATION_ITEMS.length}+</strong> pre-built connectors across CRM, ERP, the Indian Stack,
            cloud providers, and AI models. Custom connectors in 1–2 weeks.
          </p>
          {/* Search lives in the hero — first thing visitors do */}
          <div className="int-search-wrap">
            <Search size={16} className="int-search-icon" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search 60+ integrations · try 'SAP', 'WhatsApp', 'Tally'..."
              className="int-search"
              aria-label="Search integrations"
            />
            {query && (
              <button className="int-search-clear" onClick={() => setQuery("")} aria-label="Clear search">
                <Plus size={14} style={{ transform: "rotate(45deg)" }} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* FEATURED ROW — only shown when no filters active */}
      {cat === "all" && !query && (
        <section className="section section-tight int-featured">
          <div className="section-inner">
            <Reveal className="section-head" style={{ marginBottom: 28 }}>
              <span className="section-tag"><Zap size={12} /> Most-used</span>
              <h2 className="section-h" style={{ fontSize: "clamp(24px, 3vw, 36px)" }}>
                Featured <span className="serif">connectors.</span>
              </h2>
            </Reveal>
            <div className="int-featured-row">
              {featured.map((item) => (
                <IntegrationTile key={item.name} item={item} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CATEGORY FILTER + GRID */}
      <section className="section int-section" style={{ background: "var(--surface)" }}>
        <div className="section-inner">
          <div className="int-filter-row">
            {INTEGRATION_CATEGORIES.map((c) => (
              <button
                key={c.id}
                className={`int-chip ${cat === c.id ? "active" : ""}`}
                onClick={() => setCat(c.id)}
              >
                <span>{c.label}</span>
                <span className="int-chip-count tabular">{counts[c.id] || 0}</span>
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="int-grid">
              {filtered.map((item) => (
                <IntegrationTile key={item.name} item={item} />
              ))}
            </div>
          ) : (
            <div className="int-empty">
              <div className="int-empty-icon"><Search size={28} /></div>
              <h3>No integrations match "{query}"</h3>
              <p>Don't see what you need? We build custom connectors in 1–2 weeks.</p>
              <Link to="/contact" className="btn-primary">
                Request "{query}" connector <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* REQUEST + SDK BAND */}
      <section className="section int-band">
        <div className="section-inner">
          <div className="int-band-grid">
            <Reveal className="int-band-card">
              <div className="int-band-icon"><MessageCircle size={22} /></div>
              <h3>Don't see your tool?</h3>
              <p>
                Tell us what you need. We typically ship a custom connector in
                1–2 weeks — included with Business and Enterprise plans.
              </p>
              <Link to="/contact" className="btn-primary">
                Request a connector <ArrowRight size={14} />
              </Link>
            </Reveal>
            <Reveal className="int-band-card" delay={120}>
              <div className="int-band-icon"><Code2 size={22} /></div>
              <h3>Or build your own.</h3>
              <p>
                REST + WebSocket APIs, plus SDKs in JavaScript, Python, and Go.
                Drop-in React component for chat-style UIs. Average integration:
                1–2 sprint cycles.
              </p>
              <Link to="/contact" className="btn-outline">
                Get SDK access <ArrowRight size={14} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cta-final">
        <div className="cta-orbs" aria-hidden="true">
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>
        <Reveal className="cta-inner">
          <h2>Plug Ajuni into <span className="serif">your stack.</span></h2>
          <p>Workshop with our integration architects — we map your systems, agents, and data flows live.</p>
          <div className="hero-ctas">
            <Link to="/contact" className="btn-on-dark">Schedule integration workshop <ArrowRight size={14} /></Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
