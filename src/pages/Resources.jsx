import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, FileText, BookOpen, Video, Code, Search, Plus, Clock, Mic, Sparkles,
} from "lucide-react";
import { Reveal } from "../components/Primitives";
import "./Inner.css";

// Resource library. Items map to a `type` which drives the colored chip
// and the filter tabs. `status: "soon"` shows a "Coming soon" badge and
// disables the link. Replace placeholder hrefs with real ones as content ships.
const RESOURCES = [
  {
    type: "whitepaper",
    title: "The enterprise guide to agentic AI",
    desc: "A 32-page playbook on choosing, deploying, and scaling agents in regulated industries.",
    icon: FileText,
    meta: "32 pages · 18 min read",
    href: "/contact?asset=whitepaper-enterprise-guide",
    status: "ready",
  },
  {
    type: "case-study",
    title: "How a mid-tier bank deployed underwriting agents in 7 weeks",
    desc: "From POC to ₹4.2 Cr in approved loans — architecture, decisions, outcomes.",
    icon: FileText,
    meta: "Banking · 12 min read",
    href: "/case-studies",
    status: "ready",
  },
  {
    type: "playbook",
    title: "Building your first compliance agent",
    desc: "Step-by-step: KYC, AML, DPDP Act, audit trail. With code samples + templates.",
    icon: BookOpen,
    meta: "Practical · 25 min read",
    href: "/contact?asset=playbook-compliance",
    status: "ready",
  },
  {
    type: "video",
    title: "Lyzr vs Kore.ai vs Ajuni — 12-minute walkthrough",
    desc: "Side-by-side: deployment, languages, security, integrations. No marketing fluff.",
    icon: Video,
    meta: "12:04 · YouTube",
    href: "/contact?asset=competitor-walkthrough",
    status: "ready",
  },
  {
    type: "docs",
    title: "Build agents with the Ajuni SDK",
    desc: "Python, Node, Go. Quickstart in 5 minutes. Production patterns + reference architectures.",
    icon: Code,
    meta: "Reference · self-serve",
    href: "/contact?asset=sdk-docs",
    status: "ready",
  },
  {
    type: "webinar",
    title: "AI agents for Indian healthcare — what works, what doesn't",
    desc: "With CIOs from Apollo, Manipal, and Cipla. Recorded panel + Q&A.",
    icon: Mic,
    meta: "58 min · panel",
    href: "/contact?asset=webinar-healthcare",
    status: "ready",
  },
  {
    type: "whitepaper",
    title: "Sovereign AI deployments — a procurement playbook",
    desc: "For CIOs writing the buying criteria. RFP templates, security questionnaires, SOWs.",
    icon: FileText,
    meta: "22 pages · 14 min read",
    href: "#",
    status: "soon",
  },
  {
    type: "video",
    title: "30-min teardown: Ajuni's audit trail architecture",
    desc: "How hash-chained logs work, why regulators accept them, and how to verify integrity.",
    icon: Video,
    meta: "31:12 · technical",
    href: "#",
    status: "soon",
  },
];

const TYPE_META = {
  whitepaper:  { label: "Whitepaper", color: "oklch(0.55 0.20 285)" },
  "case-study":{ label: "Case study", color: "oklch(0.55 0.18 200)" },
  playbook:    { label: "Playbook",   color: "oklch(0.55 0.20 152)" },
  video:       { label: "Video",      color: "oklch(0.55 0.21 25)"  },
  docs:        { label: "Docs",       color: "oklch(0.42 0.025 285)" },
  webinar:     { label: "Webinar",    color: "oklch(0.62 0.17 78)"  },
};

const FILTERS = [
  { id: "all",         label: "All" },
  { id: "whitepaper",  label: "Whitepapers" },
  { id: "case-study",  label: "Case studies" },
  { id: "playbook",    label: "Playbooks" },
  { id: "video",       label: "Videos" },
  { id: "docs",        label: "Docs" },
  { id: "webinar",     label: "Webinars" },
];

export default function Resources() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const map = { all: RESOURCES.length };
    FILTERS.forEach((f) => {
      if (f.id !== "all") map[f.id] = RESOURCES.filter((r) => r.type === f.id).length;
    });
    return map;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RESOURCES.filter((r) => {
      if (filter !== "all" && r.type !== filter) return false;
      if (q && !r.title.toLowerCase().includes(q) && !r.desc.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [filter, query]);

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
            <span style={{ color: "var(--text-on-dark)" }}>Resources</span>
          </div>
          <h1>Everything you need <br /><span className="serif">to build with confidence.</span></h1>
          <p className="lede">
            Playbooks, case studies, technical deep-dives, and API docs.
            Written by the architects who deploy Ajuni in production.
          </p>
          {/* Search */}
          <div className="int-search-wrap">
            <Search size={16} className="int-search-icon" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search resources · try 'audit trail', 'healthcare', 'RFP'..."
              className="int-search"
              aria-label="Search resources"
            />
            {query && (
              <button className="int-search-clear" onClick={() => setQuery("")} aria-label="Clear search">
                <Plus size={14} style={{ transform: "rotate(45deg)" }} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* FILTER + LIBRARY */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="section-inner">
          <div className="int-filter-row res-filter-row">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                className={`int-chip ${filter === f.id ? "active" : ""}`}
                onClick={() => setFilter(f.id)}
              >
                <span>{f.label}</span>
                <span className="int-chip-count tabular">{counts[f.id] || 0}</span>
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="res-grid">
              {filtered.map((r) => {
                const Ico = r.icon;
                const meta = TYPE_META[r.type];
                const isSoon = r.status === "soon";
                const cardClass = `res-card ${isSoon ? "res-card-soon" : ""}`;
                const inner = (
                  <>
                    <div className="res-card-top">
                      <span className="res-chip" style={{ background: meta.color }}>
                        {meta.label}
                      </span>
                      {isSoon ? (
                        <span className="res-status res-status-soon">
                          <Sparkles size={11} /> Coming soon
                        </span>
                      ) : (
                        <span className="res-status res-status-ready">
                          <Clock size={11} /> {r.meta}
                        </span>
                      )}
                    </div>
                    <div className="res-icon"><Ico size={22} /></div>
                    <h3>{r.title}</h3>
                    <p>{r.desc}</p>
                    <div className="res-foot">
                      {isSoon ? (
                        <span>Sign up for early access <ArrowRight size={14} /></span>
                      ) : (
                        <span>Read more <ArrowRight size={14} /></span>
                      )}
                    </div>
                  </>
                );
                return (
                  <Reveal key={r.title}>
                    {isSoon ? (
                      <div className={cardClass}>{inner}</div>
                    ) : r.href.startsWith("http") ? (
                      <a className={cardClass} href={r.href} target="_blank" rel="noopener noreferrer">
                        {inner}
                      </a>
                    ) : (
                      <Link className={cardClass} to={r.href}>
                        {inner}
                      </Link>
                    )}
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <div className="int-empty">
              <div className="int-empty-icon"><Search size={28} /></div>
              <h3>No resources match "{query}"</h3>
              <p>Tell us what you're researching — we'll send a curated brief.</p>
              <Link to="/contact" className="btn-primary">
                Request a brief <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cta-final">
        <div className="cta-orbs" aria-hidden="true">
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>
        <Reveal className="cta-inner">
          <h2>Want the full <span className="serif">whitepaper?</span></h2>
          <p>32 pages. Real architectures. Real numbers. Sent to your inbox within the hour.</p>
          <div className="hero-ctas">
            <Link to="/contact" className="btn-on-dark">Request whitepaper <ArrowRight size={14} /></Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
