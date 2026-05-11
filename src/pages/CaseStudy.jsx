import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Quote as QuoteIcon, Building2, Plus, Landmark, ShoppingBag, Factory, Cpu, Briefcase, Mail, FileText } from "lucide-react";
import { Reveal } from "../components/Primitives";
import { CASE_STUDIES, TESTIMONIALS } from "../data/content";
import "./Inner.css";
import "./CaseStudies.css";

const INDUSTRY_ICON = {
  "BFSI": Building2,
  "Healthcare": Plus,
  "Government": Landmark,
  "Retail": ShoppingBag,
  "Manufacturing": Factory,
  "IT / SaaS": Cpu,
  "Travel & Hospitality": Briefcase,
};

function monogram(name) {
  return name
    .replace(/&/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function CaseStudy() {
  const { slug } = useParams();
  const item = CASE_STUDIES.find((c) => c.slug === slug);
  if (!item) return <Navigate to="/case-studies" replace />;

  const Ico = INDUSTRY_ICON[item.industry] || Briefcase;
  const quote =
    item.status === "testimonial" && typeof item.quoteRef === "number"
      ? TESTIMONIALS[item.quoteRef]
      : null;

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
            <Link to="/case-studies">Case studies</Link><span>/</span>
            <span style={{ color: "var(--text-on-dark)" }}>{item.name}</span>
          </div>
          <div className="csd-badge">
            <span className="csd-mono">{monogram(item.name)}</span>
            <div>
              <div className="csd-badge-meta"><Ico size={13} /> {item.industry} · {item.region}</div>
              <h1 style={{ marginBottom: 0 }}>{item.name}</h1>
            </div>
          </div>
        </div>
      </section>

      {quote ? (
        <section className="section">
          <div className="section-inner csd-narrow">
            <Reveal>
              <div className="csd-quote-block">
                <QuoteIcon size={32} className="csd-quote-icon" />
                <q>{quote.q}</q>
                <div className="csd-quote-author">
                  <span className="csd-quote-avatar" style={{ background: quote.c }}>{quote.a}</span>
                  <div>
                    <div className="csd-quote-name">{quote.n}</div>
                    <div className="csd-quote-role">{quote.r}</div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="csd-note">
                <FileText size={18} />
                <div>
                  <strong>Full case study available on request.</strong>
                  <p>
                    Architecture, deployment topology, integration list, KPI deltas
                    and procurement deck are shared with prospects under NDA. Use the
                    button below to request the {item.name} pack.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200} className="csd-cta-row">
              <Link to="/contact" className="btn-primary">
                <Mail size={14} /> Request the {item.name} pack
              </Link>
              <Link to="/case-studies" className="btn-outline">
                <ArrowLeft size={14} /> Back to library
              </Link>
            </Reveal>
          </div>
        </section>
      ) : (
        <section className="section">
          <div className="section-inner csd-narrow">
            <Reveal>
              <div className="csd-pending">
                <div className="csd-pending-tag">Case study in production</div>
                <h2>The {item.name} story is being prepared.</h2>
                <p>
                  Our customer marketing team is working with {item.name}'s
                  procurement and security teams to clear the case study for
                  publication. Architecture diagrams, KPI deltas, and
                  deployment topology are shared under NDA in the meantime.
                </p>
                <div className="csd-cta-row">
                  <Link to="/contact" className="btn-primary">
                    <Mail size={14} /> Request the {item.name} pack
                  </Link>
                  <Link to="/case-studies" className="btn-outline">
                    <ArrowLeft size={14} /> Back to library
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="csd-related">
                <h3>While you're here</h3>
                <div className="csd-related-grid">
                  <Link to="/security" className="csd-related-card">
                    <strong>Security & compliance</strong>
                    <span>How Ajuni handles data residency, audit, and isolation.</span>
                    <ArrowRight size={14} />
                  </Link>
                  <Link to="/platform" className="csd-related-card">
                    <strong>Platform overview</strong>
                    <span>Modules, deployment modes, and the agent runtime.</span>
                    <ArrowRight size={14} />
                  </Link>
                  <Link to="/pricing" className="csd-related-card">
                    <strong>Pricing</strong>
                    <span>Plans for pilots through enterprise.</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}
    </div>
  );
}
