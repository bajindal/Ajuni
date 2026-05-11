import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, ShieldCheck, Lock, MapPin, Clock, Eye, Database, Scale, AlertTriangle,
  BadgeCheck, Award, Flag, Server, FileCheck, Globe,
} from "lucide-react";
import { Reveal } from "../components/Primitives";
import { DEPLOYMENT_REGIONS } from "../data/content";
import "./Inner.css";

// ============ GLOBAL DEPLOYMENT MAP ============
// Stylised continents in SVG (1000x540 viewBox) + region pulses pulled from
// content.js so they're easy to edit. The continent paths are intentionally
// simplified silhouettes — fast to render, dark-mode safe, and recognisable.
function DeploymentMap() {
  const [active, setActive] = useState(null);
  const sel = active ?? DEPLOYMENT_REGIONS.find((r) => r.primary) ?? DEPLOYMENT_REGIONS[0];

  return (
    <section className="section deploy-section">
      <div className="section-inner">
        <Reveal className="section-head">
          <span className="section-tag"><Globe size={12} /> Deploy anywhere</span>
          <h2 className="section-h">Sovereign by default. <span className="serif">Anywhere you operate.</span></h2>
          <p className="section-sub">
            Pick the region. We deploy to your VPC there. Data, models, and
            inference all stay inside the boundary your regulators care about.
          </p>
        </Reveal>

        <Reveal className="deploy-wrap">
          <div className="deploy-map-pane">
            <svg className="deploy-map" viewBox="0 0 1000 540" xmlns="http://www.w3.org/2000/svg" aria-label="Global deployment regions">
              <defs>
                <radialGradient id="dm-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%"   stopColor="oklch(0.78 0.14 285)" stopOpacity="0.55"/>
                  <stop offset="100%" stopColor="oklch(0.78 0.14 285)" stopOpacity="0"/>
                </radialGradient>
                <linearGradient id="dm-land" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%"   stopColor="oklch(0.36 0.060 285)"/>
                  <stop offset="100%" stopColor="oklch(0.28 0.050 285)"/>
                </linearGradient>
                <pattern id="dm-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="oklch(0.97 0.008 285 / 0.04)" strokeWidth="1"/>
                </pattern>
              </defs>

              <rect width="1000" height="540" fill="url(#dm-grid)"/>

              {/* Stylised continent silhouettes (simplified) */}
              {/* North America */}
              <path d="M 80 100 L 200 80 L 280 130 L 290 220 L 240 270 L 200 295 L 140 280 L 110 220 L 80 180 Z" fill="url(#dm-land)" opacity="0.85"/>
              {/* South America */}
              <path d="M 240 290 L 290 285 L 320 340 L 330 420 L 290 470 L 260 460 L 250 410 L 230 360 Z" fill="url(#dm-land)" opacity="0.85"/>
              {/* Europe */}
              <path d="M 470 110 L 540 95 L 580 110 L 580 175 L 540 200 L 480 195 L 460 160 Z" fill="url(#dm-land)" opacity="0.85"/>
              {/* Africa */}
              <path d="M 480 200 L 560 195 L 600 240 L 610 320 L 560 410 L 520 405 L 490 350 L 480 280 Z" fill="url(#dm-land)" opacity="0.85"/>
              {/* Middle East */}
              <path d="M 590 195 L 650 200 L 660 250 L 620 270 L 595 240 Z" fill="url(#dm-land)" opacity="0.85"/>
              {/* Asia (simplified) */}
              <path d="M 595 150 L 720 130 L 820 145 L 870 195 L 850 250 L 770 270 L 720 280 L 660 245 L 620 210 Z" fill="url(#dm-land)" opacity="0.85"/>
              {/* India peninsula */}
              <path d="M 650 240 L 700 245 L 720 270 L 710 295 L 680 305 L 660 280 Z" fill="url(#dm-land)" opacity="0.95"/>
              {/* SE Asia / Indonesia */}
              <path d="M 750 290 L 820 290 L 830 320 L 790 335 L 760 320 Z" fill="url(#dm-land)" opacity="0.85"/>
              {/* Australia */}
              <path d="M 860 380 L 950 380 L 960 430 L 920 450 L 870 440 L 855 410 Z" fill="url(#dm-land)" opacity="0.85"/>

              {/* Lines from selected region to other primary regions */}
              {DEPLOYMENT_REGIONS.filter((r) => r.code !== sel.code).map((r) => (
                <line
                  key={`line-${r.code}`}
                  x1={sel.x} y1={sel.y} x2={r.x} y2={r.y}
                  stroke="oklch(0.78 0.14 285 / 0.18)"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                />
              ))}

              {/* Region pulses */}
              {DEPLOYMENT_REGIONS.map((r) => {
                const isActive = sel.code === r.code;
                return (
                  <g
                    key={r.code}
                    transform={`translate(${r.x} ${r.y})`}
                    onMouseEnter={() => setActive(r)}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Halo */}
                    <circle r="36" fill="url(#dm-glow)" opacity={isActive ? 0.95 : 0.35}/>
                    {/* Ping ring */}
                    <circle
                      r="6"
                      fill="none"
                      stroke="oklch(0.78 0.14 285)"
                      strokeWidth="1.4"
                      opacity="0.6"
                      className="dm-ping"
                      style={{ animationDelay: `${(r.x + r.y) % 2400}ms` }}
                    />
                    {/* Core dot */}
                    <circle
                      r={isActive ? 6.5 : 5}
                      fill={r.primary ? "oklch(0.95 0.05 285)" : "oklch(0.72 0.18 285)"}
                      stroke="oklch(0.50 0.24 285)"
                      strokeWidth="1.5"
                    />
                    {/* Code label */}
                    <text
                      y={-12}
                      fontSize="9"
                      fontWeight="700"
                      letterSpacing="0.06em"
                      textAnchor="middle"
                      fill={isActive ? "oklch(0.95 0.05 285)" : "oklch(0.78 0.14 285 / 0.85)"}
                    >
                      {r.code}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <aside className="deploy-detail">
            <div className="dd-tag">Selected region</div>
            <h3>{sel.city} <span className="dd-country">· {sel.country}</span></h3>
            <div className="dd-code">Region code · <span className="tabular">{sel.code}</span></div>
            <div className="dd-providers-lbl">Providers</div>
            <div className="dd-providers">
              {sel.providers.map((p) => (
                <span key={p} className="dd-provider-pill">{p}</span>
              ))}
            </div>
            <ul className="dd-features">
              <li><BadgeCheck size={13} /> Data residency contractually pinned</li>
              <li><Server size={13} /> Choice of VPC, on-prem, or sovereign cloud</li>
              <li><FileCheck size={13} /> Local audit log retention &amp; export</li>
            </ul>
            <Link to="/contact" className="btn-primary dd-cta">
              Talk to us about {sel.city} <ArrowRight size={13} />
            </Link>
            <div className="dd-legend">
              <span className="dd-legend-item"><span className="dd-dot dd-dot-primary" /> Primary region</span>
              <span className="dd-legend-item"><span className="dd-dot" /> Available region</span>
            </div>
          </aside>
        </Reveal>

        <div className="deploy-strip">
          {DEPLOYMENT_REGIONS.map((r) => (
            <button
              key={r.code}
              className={`deploy-strip-btn ${sel.code === r.code ? "active" : ""}`}
              onMouseEnter={() => setActive(r)}
            >
              <span className="dsb-code">{r.code}</span>
              <span className="dsb-city">{r.city}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Security() {
  const items = [
    { ico: ShieldCheck, h: "ISO 27001", p: "Independently audited information security management. Certified annually." },
    { ico: Lock, h: "AES-256 + TLS 1.3", p: "Encrypted at rest. Encrypted in flight. Keys rotated on schedule. No exceptions." },
    { ico: MapPin, h: "Regional data residency", p: "Pin data to any region — Mumbai, Singapore, Frankfurt, Virginia, Dubai, Sydney. Sovereign-cloud partners (Yotta, CtrlS, GovCloud, G-Cloud) where required." },
    { ico: Clock, h: "Immutable audit trail", p: "Every action — humans or agents — hash-chained. Tamper-evident, auditor-ready." },
    { ico: Eye, h: "PII redaction", p: "Aadhaar, PAN, GSTIN, mobile, email — auto-detected and redacted before model calls." },
    { ico: Database, h: "Your data, your training", p: "We never train on customer data. Period. Audited annually." },
    { ico: Scale, h: "Responsible AI", p: "Bias monitoring, content safety filters, output validation — built in, not bolted on." },
    { ico: AlertTriangle, h: "Hallucination guardrails", p: "Pre-call checks, post-call validation, citation enforcement, confidence scoring." },
  ];

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
            <span style={{ color: "var(--text-on-dark)" }}>Security</span>
          </div>
          <h1>Built like the bank vault, <br /><span className="serif">runs like a teammate.</span></h1>
          <p className="lede">
            Sovereign deployment in any region you operate in. Tamper-evident
            logs. SOC-style controls from day one. Trusted by Parliament of
            India, DRDO, Johnson &amp; Johnson, HDFC Bank, and growing across
            APAC, EMEA, and the Americas — through Webority.
          </p>
          <div className="inner-hero-ctas">
            <Link to="/contact" className="btn-on-dark">Talk to security team <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>

      <section className="section trust-section">
        <div className="section-inner">
          <Reveal className="section-head">
            <span className="section-tag" style={{ background: "rgba(167,139,250,.15)", color: "var(--accent-on-dark)" }}>
              Eight pillars
            </span>
            <h2 className="section-h">Security that <span className="serif">earns the deal.</span></h2>
            <p className="section-sub">
              Every regulated customer asks the same questions. Here are the
              answers, in one place.
            </p>
          </Reveal>
          <div className="trust-grid">
            {items.map((it, idx) => {
              const Ico = it.ico;
              return (
                <Reveal key={it.h} className="trust-card" delay={idx * 50}>
                  <div className="ti"><Ico size={20} /></div>
                  <h4>{it.h}</h4>
                  <p>{it.p}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <DeploymentMap />

      <section className="section compliance-section">
        <div className="section-inner">
          <Reveal className="section-head" style={{ textAlign: "left", maxWidth: "none" }}>
            <span className="section-tag">Compliance</span>
            <h2 className="section-h" style={{ textAlign: "left" }}>
              Certified, <span className="serif">audited, accountable.</span>
            </h2>
            <p className="section-sub" style={{ textAlign: "left", marginLeft: 0 }}>
              Webority has been delivering CMMI L5 software to Parliament of India and DRDO for over a decade.
              That delivery muscle is what makes Ajuni production-ready, not just demo-ready.
            </p>
          </Reveal>

          {/* Compliance scorecard — variety per row instead of identical numbered list */}
          <div className="compliance-grid">
            <Reveal>
              <div className="compliance-cert compliance-cert-feat">
                <div className="cc-head">
                  <div className="cc-icon"><Award size={22} /></div>
                  <span className="cc-status cc-active">Active</span>
                </div>
                <h3>CMMI Level 5</h3>
                <p className="cc-sub">Highest delivery maturity. Held by &lt;1% of software firms globally.</p>
                <dl className="cc-meta">
                  <div><dt>Certifying body</dt><dd>CMMI Institute (ISACA)</dd></div>
                  <div><dt>Last audit</dt><dd>Nov 2025</dd></div>
                  <div><dt>Scope</dt><dd>Webority engineering org · all delivery</dd></div>
                </dl>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="compliance-cert">
                <div className="cc-head">
                  <div className="cc-icon"><ShieldCheck size={20} /></div>
                  <span className="cc-status cc-active">Active</span>
                </div>
                <h3>ISO 27001:2022</h3>
                <p className="cc-sub">Information security management.</p>
                <dl className="cc-meta-tight">
                  <div><dt>Body</dt><dd>BSI</dd></div>
                  <div><dt>Renewal</dt><dd>Oct 2026</dd></div>
                </dl>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="compliance-cert">
                <div className="cc-head">
                  <div className="cc-icon"><BadgeCheck size={20} /></div>
                  <span className="cc-status cc-active">Active</span>
                </div>
                <h3>ISO 9001:2015</h3>
                <p className="cc-sub">Quality management system.</p>
                <dl className="cc-meta-tight">
                  <div><dt>Body</dt><dd>BSI</dd></div>
                  <div><dt>Renewal</dt><dd>Oct 2026</dd></div>
                </dl>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="compliance-cert">
                <div className="cc-head">
                  <div className="cc-icon"><Flag size={20} /></div>
                  <span className="cc-status cc-active">Compliant</span>
                </div>
                <h3>DPDP Act 2023</h3>
                <p className="cc-sub">India's Digital Personal Data Protection law.</p>
                <dl className="cc-meta-tight">
                  <div><dt>DPO</dt><dd>dpo@ajuni.ai</dd></div>
                  <div><dt>Residency</dt><dd>India only</dd></div>
                </dl>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="compliance-cert">
                <div className="cc-head">
                  <div className="cc-icon"><Server size={20} /></div>
                  <span className="cc-status cc-active">Empanelled</span>
                </div>
                <h3>CERT-In</h3>
                <p className="cc-sub">Empanelled for incident response per Indian Govt.</p>
                <dl className="cc-meta-tight">
                  <div><dt>Reporting</dt><dd>Within 6 hrs</dd></div>
                  <div><dt>Listed</dt><dd>cert-in.org.in</dd></div>
                </dl>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div className="compliance-cert compliance-cert-progress">
                <div className="cc-head">
                  <div className="cc-icon"><FileCheck size={20} /></div>
                  <span className="cc-status cc-progress">In progress</span>
                </div>
                <h3>SOC 2 Type II</h3>
                <p className="cc-sub">Trust services criteria — Security, Availability, Confidentiality.</p>
                <dl className="cc-meta-tight">
                  <div><dt>Audit period</dt><dd>Jan – Jun 2026</dd></div>
                  <div><dt>Report</dt><dd>Expected Oct 2026</dd></div>
                </dl>
              </div>
            </Reveal>
          </div>

          {/* SLA matrix — replaces the 99.97% hero-metric cliche */}
          <Reveal delay={120}>
            <div className="sla-matrix">
              <div className="sla-head">
                <span className="section-tag" style={{ marginBottom: 0 }}>Service levels</span>
                <h3>Pick the SLA that matches the workload.</h3>
              </div>
              <table className="sla-table">
                <thead>
                  <tr>
                    <th>Tier</th>
                    <th>Uptime</th>
                    <th>Response</th>
                    <th>Recovery</th>
                    <th>Credits</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Pilot</strong></td>
                    <td>99.5%</td>
                    <td>Next business day</td>
                    <td>RPO 24h · RTO 12h</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td><strong>Business</strong></td>
                    <td>99.9%</td>
                    <td>4 hrs (24×5)</td>
                    <td>RPO 4h · RTO 4h</td>
                    <td>10% per outage</td>
                  </tr>
                  <tr className="sla-row-feat">
                    <td><strong>Enterprise</strong></td>
                    <td>99.99%</td>
                    <td>30 min (24×7)</td>
                    <td>RPO 1h · RTO 1h</td>
                    <td>25% per outage</td>
                  </tr>
                </tbody>
              </table>
              <div className="sla-foot">
                <span className="sla-actual">Actual: <strong>99.97%</strong> over the last 12 months · <a href="#">status.ajuni.ai</a></span>
                <Link to="/contact" className="sla-cta">Discuss SLA terms <ArrowRight size={14} /></Link>
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
          <h2>Ready for a <span className="serif">security review?</span></h2>
          <p>Get our SOC report, DPA, and ISO 27001 cert. Or talk to the team directly.</p>
          <div className="hero-ctas">
            <Link to="/contact" className="btn-on-dark">Request docs <ArrowRight size={14} /></Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
