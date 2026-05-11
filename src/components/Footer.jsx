import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ShieldCheck, Lock, Linkedin, Twitter, Youtube,
  Github, Check, ArrowRight, Send, ArrowUpRight, Globe, MapPin
} from "lucide-react";
import { AjuniWordmark } from "./Primitives";
import "./Footer.css";

const COLS = [
  {
    h: "Platform",
    links: [
      { l: "Overview", to: "/platform" },
      { l: "Agents", to: "/agents" },
      { l: "Agent Studio", to: "/modules/agent-studio" },
      { l: "Audit Trail", to: "/modules/audit-trail" },
      { l: "Integrations", to: "/integrations" },
      { l: "Pricing", to: "/pricing" },
    ],
  },
  {
    h: "Industries",
    links: [
      { l: "BFSI", to: "/industries/bfsi" },
      { l: "Healthcare", to: "/industries/healthcare" },
      { l: "Government", to: "/industries/government" },
      { l: "Retail", to: "/industries/retail" },
      { l: "Manufacturing", to: "/industries/manufacturing" },
      { l: "IT & SaaS", to: "/industries/it-saas" },
    ],
  },
  {
    h: "Functions",
    links: [
      { l: "Sales", to: "/functions/sales" },
      { l: "Marketing", to: "/functions/marketing" },
      { l: "HR", to: "/functions/hr" },
      { l: "Support", to: "/functions/support" },
      { l: "Finance", to: "/functions/finance" },
      { l: "Procurement", to: "/functions/procurement" },
    ],
  },
  {
    h: "Company",
    links: [
      { l: "About", to: "/about" },
      { l: "Customers", to: "/customers" },
      { l: "Resources", to: "/resources" },
      { l: "Security", to: "/security" },
      { l: "Careers", to: "/about", badge: "Hiring" },
      { l: "Contact", to: "/contact" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subbed, setSubbed] = useState(false);

  return (
    <footer className="footer">
      <div className="footer-halo" aria-hidden="true">
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* CTA strip */}
      <div className="footer-cta">
        <div className="footer-cta-inner">
          <div>
            <div className="fc-eyebrow">Ready when you are</div>
            <h3 className="fc-title">
              Bring agents into <span className="serif">production.</span>
            </h3>
            <p className="fc-sub">
              30-minute walkthrough with an architect. Bring your hardest use case.
            </p>
          </div>
          <div className="fc-actions">
            <Link to="/contact" className="btn-primary btn-large">
              Book a demo <ArrowRight size={14} />
            </Link>
            <Link to="/pricing" className="btn-outline btn-large">
              See pricing
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-inner">
        {/* Top: brand (compact) + 4 link columns */}
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="fb-mark" aria-label="Ajuni home">
              <AjuniWordmark size={36} dark />
            </Link>
            <p className="fb-tag">
              The control plane for enterprise AI agents. Production-ready,
              India-native, sovereign-deployable.
            </p>
            <div className="fb-status">
              <span className="fb-status-dot" />
              <span>All systems operational</span>
              <a href="#" className="fb-status-link">
                status <ArrowUpRight size={11} />
              </a>
            </div>
          </div>

          <div className="footer-cols">
            {COLS.map((c) => (
              <div key={c.h} className="footer-col">
                <h5>{c.h}</h5>
                <ul>
                  {c.links.map((l) => (
                    <li key={l.l}>
                      <Link to={l.to}>
                        <span>{l.l}</span>
                        {l.external && <ArrowUpRight size={11} className="fc-ext" />}
                        {l.badge && <span className="fc-badge">{l.badge}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Middle band: newsletter + compliance pills + regions */}
        <div className="footer-band">
          <div className="footer-band-newsletter">
            <h6>The Agent Brief</h6>
            <p>Stories from the agentic frontier. One short email a fortnight.</p>
            {!subbed ? (
              <div className="fn-row">
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email"
                />
                <button
                  className="fn-submit"
                  onClick={() => {
                    if (email.includes("@")) setSubbed(true);
                  }}
                  aria-label="Subscribe"
                >
                  <Send size={14} />
                </button>
              </div>
            ) : (
              <div className="fn-thanks">
                <Check size={14} /> Thanks — see you in your inbox.
              </div>
            )}
          </div>
          <div className="footer-band-trust">
            <div className="ft-badges">
              <span className="trust-badge"><ShieldCheck size={14} /> ISO 27001</span>
              <span className="trust-badge"><Lock size={14} /> AES-256</span>
              <span className="trust-badge"><MapPin size={14} /> Hosted in India</span>
              <span className="trust-badge"><Check size={14} /> CMMI L5</span>
            </div>
            <div className="footer-band-regions">
              <Globe size={12} /> Gurgaon HQ &middot; Mumbai &middot; Bengaluru &middot; Singapore
            </div>
          </div>
        </div>

        {/* Bottom: copyright + contact + legal links + socials, all in one tight row */}
        <div className="footer-bottom">
          <span className="fb-copy">
            © 2026 Webority Technologies Pvt. Ltd. ·
            {" "}<a href="mailto:hello@ajuni.ai">hello@ajuni.ai</a> ·
            {" "}+91-124-460-1100
          </span>
          <div className="fb-legal-links">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/dpa">DPA</Link>
            <Link to="/cookies">Cookies</Link>
          </div>
          <div className="footer-social">
            <a href="#" aria-label="LinkedIn"><Linkedin size={14} /></a>
            <a href="#" aria-label="Twitter / X"><Twitter size={14} /></a>
            <a href="#" aria-label="YouTube"><Youtube size={14} /></a>
            <a href="#" aria-label="GitHub"><Github size={14} /></a>
          </div>
        </div>

        <div className="footer-bigmark" aria-hidden="true">
          <span className="footer-bigmark-text">ajuni</span>
        </div>
      </div>
    </footer>
  );
}
