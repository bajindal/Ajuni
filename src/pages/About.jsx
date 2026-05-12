import { Link } from "react-router-dom";
import {
  ArrowRight, Sparkles, Users, MapPin, Award, Shield, Globe, Calendar,
  Briefcase, Linkedin, Mail, BadgeCheck,
} from "lucide-react";
import { Reveal } from "../components/Primitives";
import { CUSTOMERS } from "../data/content";
import "./Inner.css";

// Leadership team — placeholder slots. Replace the `name`, `role`, `bio`,
// `linkedin`, and `photo` fields with real data when ready. The avatar
// fallback uses initials + brand-color tile so the section renders
// professionally even before photos land.
const LEADERSHIP = [
  {
    initials: "AJ",
    name: "Akshat Jindal",
    role: "Founder & CEO",
    bio: "13+ years building enterprise software at Webority. Led delivery for Parliament of India, DRDO, TVS Group.",
    linkedin: "https://linkedin.com/in/akshatjindal",
    photo: "", // Drop a /public/team/akshat.jpg here when ready
    color: "linear-gradient(135deg,#6637E6,#A78BFA)",
  },
  {
    initials: "AB",
    name: "Add team member",
    role: "Chief Architect",
    bio: "Update this entry in src/pages/About.jsx with the real name, role, and a one-line bio.",
    linkedin: "#",
    photo: "",
    color: "linear-gradient(135deg,#1FAE6B,#06B6D4)",
  },
  {
    initials: "AB",
    name: "Add team member",
    role: "Head of Engineering",
    bio: "Update this entry in src/pages/About.jsx with the real name, role, and a one-line bio.",
    linkedin: "#",
    photo: "",
    color: "linear-gradient(135deg,#FBC02D,#E2474C)",
  },
];

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

export default function About() {
  // Values, each backed by a concrete proof point.
  const values = [
    {
      ico: Globe,
      h: "Born in India, deployed globally",
      p: "We build for India's languages, regulators, and infrastructure. The rigor we earn here travels everywhere.",
      proof: { n: "13", l: "deployment regions worldwide" },
    },
    {
      ico: Users,
      h: "Embedded, not extracted",
      p: "Architects work alongside your team. We win when you ship, not when you renew.",
      proof: { n: "4–8 wk", l: "to first agent in production" },
    },
    {
      ico: Award,
      h: "CMMI L5 delivery DNA",
      p: "Webority's 13-year delivery muscle is what makes Ajuni production-ready, not just demo-ready.",
      proof: { n: "0", l: "regulator-flagged incidents" },
    },
    {
      ico: Shield,
      h: "Sovereign by design",
      p: "Your data, your country, your control. On-prem, VPC, or sovereign cloud — your call.",
      proof: { n: "100%", l: "on-prem for government" },
    },
  ];

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
            <span style={{ color: "var(--text-on-dark)" }}>About</span>
          </div>
          <h1>Building the <br /><span className="serif">control plane for enterprise AI.</span></h1>
          <p className="lede">
            Ajuni is a Webority Technologies product. Born in Gurgaon, deployed
            globally. Built for the enterprises and government bodies that have
            trusted Webority for over a decade.
          </p>
        </div>
      </section>

      {/* TRUST LOGO STRIP — above the fold */}
      <section className="abt-trust">
        <div className="section-inner">
          <p className="abt-trust-lbl">Trusted by</p>
          <div className="abt-trust-pills">
            {CUSTOMERS.slice(0, 8).map((c) => (
              <span key={c} className="abt-trust-pill">
                <span className="abt-trust-mono">{monogram(c)}</span>
                <span>{c}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="section two-col">
        <div className="section-inner">
          <Reveal className="left">
            <span className="section-tag">Our story</span>
            <h2>Started with a question: <span className="serif">why do regulated enterprises trust foreign clouds with their books?</span></h2>
            <p>
              For 13+ years, Webority has built mission-critical software for
              Parliament of India, DRDO, Johnson &amp; Johnson, TVS Group, and
              DreamFolks. We kept seeing the same pattern: enterprises and
              government bodies wanted AI agents, but every credible platform
              was American, hosted abroad, or built without understanding the
              compliance reality of the markets they served.
            </p>
            <p>
              Ajuni is the answer. An agentic AI platform born in India and
              deployed globally — with the craftsmanship that comes from being
              CMMI Level 5, ISO 27001, and ISO 9001 certified.
            </p>
            <Link to="/customers" className="btn-primary">See who's using it <ArrowRight size={14} /></Link>
          </Reveal>
          <Reveal className="right" delay={120}>
            <div className="right-card">
              <div className="right-card-inner">
                <div className="rc-stat-num">13+</div>
                <div className="rc-stat-lbl">years of enterprise delivery via Webority</div>
                <div className="rc-customers">
                  <div className="rc-label">Long-term clients include</div>
                  <div className="rc-cust-list">
                    <span className="rc-cust-pill">Parliament of India</span>
                    <span className="rc-cust-pill">DRDO</span>
                    <span className="rc-cust-pill">Johnson &amp; Johnson</span>
                    <span className="rc-cust-pill">TVS Group</span>
                    <span className="rc-cust-pill">DreamFolks</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VALUES — now metric-backed */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="section-inner">
          <Reveal className="section-head">
            <span className="section-tag">What we believe</span>
            <h2 className="section-h">Four principles that <span className="serif">don't compromise.</span></h2>
            <p className="section-sub">
              Not marketing slogans — operating constraints. Each one has a
              real number behind it.
            </p>
          </Reveal>
          <div className="abt-values-grid">
            {values.map((v, idx) => {
              const Ico = v.ico;
              return (
                <Reveal key={v.h} delay={idx * 70}>
                  <div className="abt-value-card">
                    <div className="abt-value-icon"><Ico size={20} /></div>
                    <h4>{v.h}</h4>
                    <p>{v.p}</p>
                    <div className="abt-value-proof">
                      <span className="abt-value-proof-num tabular">{v.proof.n}</span>
                      <span className="abt-value-proof-lbl">{v.proof.l}</span>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="section-inner">
          <Reveal className="section-head">
            <span className="section-tag">Leadership</span>
            <h2 className="section-h">The people <span className="serif">behind Ajuni.</span></h2>
            <p className="section-sub">
              A team of engineers, architects, and operators who've shipped
              into the most demanding enterprises in India and globally.
            </p>
          </Reveal>
          <div className="abt-leaders-grid">
            {LEADERSHIP.map((p, idx) => (
              <Reveal key={p.name + idx} delay={idx * 90}>
                <article className="abt-leader-card">
                  <div className="abt-leader-photo" style={{ background: p.color }}>
                    {p.photo ? (
                      <img src={p.photo} alt={p.name} />
                    ) : (
                      <span className="abt-leader-initials">{p.initials}</span>
                    )}
                  </div>
                  <div className="abt-leader-meta">
                    <h4>{p.name}</h4>
                    <div className="abt-leader-role">{p.role}</div>
                    <p>{p.bio}</p>
                    {p.linkedin && p.linkedin !== "#" && (
                      <a className="abt-leader-link" href={p.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin size={13} /> LinkedIn
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          {/* Hiring callout */}
          <Reveal className="abt-hiring">
            <Briefcase size={18} />
            <div>
              <strong>We're hiring across engineering, architecture, and solutions.</strong>
              <span>Agent architects, ML engineers, FDE-style consultants. Email <a href="mailto:careers@webority.com">careers@webority.com</a>.</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MADE IN INDIA — now real content */}
      <section className="section abt-hq">
        <div className="section-inner">
          <Reveal className="section-head">
            <span className="section-tag"><MapPin size={12} /> Made in India</span>
            <h2 className="section-h">Headquartered in <span className="serif">Gurgaon.</span></h2>
            <p className="section-sub">
              India-first, world-ready. The Webority team has been shipping
              enterprise software since 2012.
            </p>
          </Reveal>
          <div className="abt-hq-grid">
            <Reveal className="abt-hq-stat">
              <div className="abt-hq-num tabular">80+</div>
              <div className="abt-hq-lbl">Engineers, architects, and operators</div>
            </Reveal>
            <Reveal className="abt-hq-stat" delay={80}>
              <div className="abt-hq-num tabular">13+</div>
              <div className="abt-hq-lbl">Years of enterprise delivery</div>
            </Reveal>
            <Reveal className="abt-hq-stat" delay={160}>
              <div className="abt-hq-num">CMMI L5</div>
              <div className="abt-hq-lbl">Delivery maturity</div>
            </Reveal>
            <Reveal className="abt-hq-stat" delay={240}>
              <div className="abt-hq-num">ISO 27001</div>
              <div className="abt-hq-lbl">Information security certified</div>
            </Reveal>
          </div>

          <Reveal className="abt-cert-row">
            <div className="abt-cert-head">Certifications & memberships</div>
            <div className="abt-cert-pills">
              <span className="abt-cert-pill"><BadgeCheck size={13} /> ISO 27001:2022</span>
              <span className="abt-cert-pill"><BadgeCheck size={13} /> ISO 9001:2015</span>
              <span className="abt-cert-pill"><BadgeCheck size={13} /> CMMI Level 5</span>
              <span className="abt-cert-pill"><BadgeCheck size={13} /> CERT-In empanelled (in progress)</span>
              <span className="abt-cert-pill"><BadgeCheck size={13} /> NASSCOM member</span>
              <span className="abt-cert-pill"><BadgeCheck size={13} /> MSME registered</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cta-final">
        <div className="cta-orbs" aria-hidden="true">
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>
        <Reveal className="cta-inner">
          <h2>Want to <span className="serif">work with us?</span></h2>
          <p>We're hiring agent architects, ML engineers, and solutions consultants.</p>
          <div className="hero-ctas">
            <Link to="/contact" className="btn-on-dark"><Calendar size={14} /> Talk to the team</Link>
            <a href="mailto:careers@webority.com" className="btn-outline-dark"><Mail size={14} /> Email careers</a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
