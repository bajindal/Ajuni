import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Shield, FileText, Database, Cookie } from "lucide-react";
import { Reveal } from "../components/Primitives";
import "./Inner.css";

const PAGES = {
  "/privacy": {
    title: "Privacy",
    serif: "Policy.",
    icon: Shield,
    tag: "Effective 2026",
    lede: "How Ajuni handles personal data — what we collect, why we collect it, and the rights every user has under DPDP, GDPR, and applicable Indian laws.",
    sections: [
      {
        h: "Data we collect",
        p: "We collect only what's required to operate the service: account identifiers (name, work email), product telemetry (page views, feature usage), and content you submit through agents you build (which stays inside your tenant). We never sell or share data with third parties for advertising.",
      },
      {
        h: "Where data lives",
        p: "Customer data is stored exclusively in the deployment region of your choice — sovereign Indian cloud (Yotta, CtrlS), AWS / Azure / GCP regions in India, or on-prem in your data centre. Data does not leave the residency boundary.",
      },
      {
        h: "Retention",
        p: "Operational logs are retained for 90 days. Audit trails are retained per your contract (default 7 years for regulated customers). On account closure, we provide a 30-day export window before permanent deletion.",
      },
      {
        h: "Your rights",
        p: "You can request access, rectification, portability, or deletion of your personal data at any time by writing to privacy@ajuni.ai. We respond within 30 days as required by DPDP and GDPR.",
      },
      {
        h: "Sub-processors",
        p: "A current list of sub-processors (cloud hosts, model providers, observability tooling) is maintained at /trust-center. We notify customers 30 days in advance of any change.",
      },
      {
        h: "Contact",
        p: "Privacy questions: privacy@ajuni.ai. Data Protection Officer (DPO): dpo@ajuni.ai. Postal: Webority Technologies, Sector 44, Gurgaon, Haryana 122002, India.",
      },
    ],
  },
  "/terms": {
    title: "Terms of",
    serif: "Service.",
    icon: FileText,
    tag: "Last updated 2026",
    lede: "The terms governing your use of Ajuni. Plain language where possible; defined-term mode where the law requires it.",
    sections: [
      {
        h: "Service",
        p: "Ajuni provides an agentic AI platform for enterprises, made available as a managed service or as a self-hosted deployment under your contract. These Terms apply to both modes unless your master agreement says otherwise.",
      },
      {
        h: "Acceptable use",
        p: "You won't use Ajuni to violate applicable law, infringe third-party rights, generate intentionally deceptive content, or operate in life-critical systems without explicit written approval from us. We reserve the right to suspend service for serious violations after written notice.",
      },
      {
        h: "Your data, your IP",
        p: "Content you submit through Ajuni — prompts, knowledge sources, generated outputs — remains your intellectual property. We claim no licence to it beyond what's required to operate the service for you. We don't train models on customer data.",
      },
      {
        h: "Service levels",
        p: "Uptime targets and credit terms are defined in your order form. Default availability is 99.5% (Business) or 99.9% (Enterprise) measured monthly. Status: status.ajuni.ai.",
      },
      {
        h: "Term & termination",
        p: "Either party can terminate for material breach with 30 days' written notice. On termination, we provide a data-export window (30 days) before deletion. Surviving clauses include indemnity, IP ownership, and confidentiality.",
      },
      {
        h: "Governing law",
        p: "These Terms are governed by the laws of India. Disputes are subject to the exclusive jurisdiction of courts in Gurgaon, Haryana.",
      },
    ],
  },
  "/dpa": {
    title: "Data Processing",
    serif: "Addendum.",
    icon: Database,
    tag: "DPA · v3.1",
    lede: "Our standard DPA, applicable when Ajuni processes personal data on your behalf. Designed to cover DPDP, GDPR, and SCC requirements out of the box.",
    sections: [
      {
        h: "Roles",
        p: "You are the Controller; Ajuni is the Processor. We process personal data only on documented instructions from you, including your configuration of the platform.",
      },
      {
        h: "Sub-processing",
        p: "Authorised sub-processors are listed at /trust-center/sub-processors. You receive 30-day notice of any addition. You may object on reasonable data-protection grounds; we will work with you to find alternatives.",
      },
      {
        h: "Security measures",
        p: "We implement appropriate technical and organisational measures including encryption at rest (AES-256) and in transit (TLS 1.3), least-privilege access, hash-chained audit trails, ISO 27001 certified controls, and quarterly third-party penetration testing.",
      },
      {
        h: "Data subject requests",
        p: "We assist you in responding to data subject requests (access, rectification, erasure, portability) within 7 working days, using built-in platform tooling and APIs.",
      },
      {
        h: "Breach notification",
        p: "We notify you of any confirmed personal data breach without undue delay and within 24 hours of confirmation. Notification includes nature of the breach, categories affected, expected consequences, and remediation steps.",
      },
      {
        h: "Cross-border transfers",
        p: "Data is processed in the region you select. Where transfer outside the region is necessary, we rely on Standard Contractual Clauses, equivalent transfer mechanisms, or your written approval.",
      },
    ],
  },
  "/cookies": {
    title: "Cookie",
    serif: "Policy.",
    icon: Cookie,
    tag: "Cookies · 2026",
    lede: "What cookies we use on ajuni.ai, what they do, and how to control them. The product itself uses no third-party tracking.",
    sections: [
      {
        h: "Strictly necessary",
        p: "Session cookies that keep you signed in, remember your cookie preferences, and support form submissions. These can't be disabled without breaking the site.",
      },
      {
        h: "Analytics",
        p: "First-party, IP-anonymised analytics on page views and conversion. We don't use Google Analytics or Meta Pixel on ajuni.ai. You can opt out via the cookie banner at any time.",
      },
      {
        h: "Marketing",
        p: "We don't run third-party marketing or retargeting cookies on ajuni.ai. If we ever add them, we'll require explicit opt-in consent first.",
      },
      {
        h: "Inside the product",
        p: "The Ajuni platform itself uses session cookies only. It does not load any third-party JS or analytics tags inside customer tenants.",
      },
      {
        h: "Managing cookies",
        p: "Click 'Manage' in the cookie banner to change your preferences at any time. You can also clear cookies in your browser settings — you'll see the banner again on your next visit.",
      },
    ],
  },
};

export default function Legal() {
  const { pathname } = useLocation();
  const data = PAGES[pathname] || PAGES["/privacy"];
  const Ico = data.icon;
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
            <span style={{ color: "var(--text-on-dark)" }}>{data.title} {data.serif}</span>
          </div>
          <div className="module-hero-eyebrow">
            <span className="module-hero-icon"><Ico size={16} /></span>
            <span className="module-hero-layer">{data.tag}</span>
          </div>
          <h1>
            {data.title} <span className="serif">{data.serif}</span>
          </h1>
          <p className="lede">{data.lede}</p>
        </div>
      </section>

      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="section-inner legal-inner">
          {data.sections.map((s, i) => (
            <Reveal key={s.h} delay={i * 50}>
              <article className="legal-section">
                <h2>{s.h}</h2>
                <p>{s.p}</p>
              </article>
            </Reveal>
          ))}
          <Reveal>
            <div className="legal-foot">
              <p>
                Have questions? Email <a href="mailto:legal@ajuni.ai">legal@ajuni.ai</a> or
                <Link to="/contact"> book a call</Link> with the team.
              </p>
              <Link to="/contact" className="btn-primary">
                Talk to us <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
