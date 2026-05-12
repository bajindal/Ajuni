import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Check, MapPin, Mail, Phone, Clock, Calendar,
  MessageCircle, Handshake, Linkedin,
} from "lucide-react";
import { Reveal } from "../components/Primitives";
import "./Inner.css";

// ─────────────────────────────────────────────────────────────────────────
// BACKEND WIRING — replace this stub with a real endpoint.
//
// Currently: stores the submission in component state only (lead is lost on
// reload). To send leads anywhere useful, swap the body of submitLead() for
// one of these patterns:
//
//   1. Slack webhook:
//      await fetch("https://hooks.slack.com/services/...", {
//        method: "POST",
//        headers: { "Content-Type": "application/json" },
//        body: JSON.stringify({ text: `New lead: ${form.name} from ${form.company}` })
//      });
//
//   2. Zapier / Make catch-hook (recommended — easiest to chain to HubSpot/SF):
//      await fetch(import.meta.env.VITE_LEAD_WEBHOOK, {
//        method: "POST",
//        headers: { "Content-Type": "application/json" },
//        body: JSON.stringify(form)
//      });
//
//   3. HubSpot Forms API:
//      await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL}/${FORM_ID}`, ...);
//
// Set VITE_LEAD_WEBHOOK in a `.env.local` file (gitignored). Add a try/catch
// + show an inline error state if the POST fails.
// ─────────────────────────────────────────────────────────────────────────
async function submitLead(form) {
  // TODO: wire backend. Stub returns success after a short delay so the UX flow is testable.
  await new Promise((r) => setTimeout(r, 400));
  return { ok: true };
}

// Replace with your real Calendly / Chili Piper / SavvyCal URL.
const CALENDAR_URL = "https://calendly.com/ajuni/demo";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    industry: "BFSI",
    use: "",
  });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company) return;
    setError("");
    setSubmitting(true);
    try {
      const res = await submitLead(form);
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch (err) {
      setError("Couldn't send right now. Please email hello@ajuni.ai instead.");
    } finally {
      setSubmitting(false);
    }
  };

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
            <span style={{ color: "var(--text-on-dark)" }}>Contact</span>
          </div>
          <h1>Talk to an <br /><span className="serif">agent architect.</span></h1>
          <p className="lede">
            30 minutes. No slides. We'll look at your stack, identify the
            highest-leverage agent to build first, and give you a realistic
            timeline and cost.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="section-inner">
          <div className="contact-layout">
            {/* Form / Success */}
            {!submitted ? (
              <Reveal>
                <div className="contact-form-wrap">
                  <form className="contact-form" onSubmit={onSubmit}>
                    <div className="cf-row">
                      <div className="cf-field">
                        <label htmlFor="name">Full name</label>
                        <input id="name" name="name" type="text" value={form.name} onChange={onChange} required autoComplete="name" />
                      </div>
                      <div className="cf-field">
                        <label htmlFor="email">Work email</label>
                        <input id="email" name="email" type="email" value={form.email} onChange={onChange} required autoComplete="email" />
                      </div>
                    </div>
                    <div className="cf-row">
                      <div className="cf-field">
                        <label htmlFor="company">Company</label>
                        <input id="company" name="company" type="text" value={form.company} onChange={onChange} required autoComplete="organization" />
                      </div>
                      <div className="cf-field">
                        <label htmlFor="role">Role</label>
                        <input id="role" name="role" type="text" value={form.role} onChange={onChange} placeholder="e.g. Head of Operations" autoComplete="organization-title" />
                      </div>
                    </div>
                    <div className="cf-field">
                      <label htmlFor="industry">Industry</label>
                      <select id="industry" name="industry" value={form.industry} onChange={onChange}>
                        <option>BFSI</option>
                        <option>Healthcare</option>
                        <option>Government / Public Sector</option>
                        <option>Retail / E-commerce</option>
                        <option>Manufacturing / Logistics</option>
                        <option>IT / SaaS</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="cf-field">
                      <label htmlFor="use">What problem are you trying to solve?</label>
                      <textarea
                        id="use"
                        name="use"
                        value={form.use}
                        onChange={onChange}
                        placeholder="e.g. Our underwriting team reviews 200 loan applications a week and we want to cut decision time in half."
                      />
                    </div>
                    {error && <div className="cf-error">{error}</div>}
                    <button type="submit" className="btn-primary cf-submit btn-large" disabled={submitting}>
                      {submitting ? "Sending..." : <>Book a demo <ArrowRight size={16} /></>}
                    </button>
                    <p style={{ fontSize: 12, color: "var(--text-3)", textAlign: "center", marginTop: 4 }}>
                      Your information is private and never sold.
                    </p>
                  </form>
                </div>
              </Reveal>
            ) : (
              <Reveal>
                <div className="contact-form-wrap">
                  <div className="cf-success">
                    <div className="cf-success-icon">
                      <Check size={32} />
                    </div>
                    <h3>Thanks, {form.name.split(" ")[0]}.</h3>
                    <p>
                      We'll reach out to <strong>{form.email}</strong> within
                      <strong> 4 business hours</strong>. Real human, working hours
                      IST — not a no-reply confirmation.
                    </p>
                    <div className="cf-success-next">
                      <span className="cf-success-or">Or skip the wait —</span>
                      <a
                        href={CALENDAR_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                      >
                        <Calendar size={14} /> Pick a time now
                      </a>
                    </div>
                    <ul className="cf-success-list">
                      <li><Check size={14} /> Workshop confirmation + calendar invite within minutes</li>
                      <li><Check size={14} /> Pre-call brief sent 24 hours before</li>
                      <li><Check size={14} /> One-pager architecture write-up next day</li>
                    </ul>
                  </div>
                </div>
              </Reveal>
            )}

            {/* Sidebar */}
            <Reveal delay={120}>
              <aside className="contact-aside">
                <div className="contact-promise">
                  <div className="contact-promise-icon"><Clock size={18} /></div>
                  <div>
                    <h4>Response in 4 business hours</h4>
                    <p>Real human, Mon–Fri 9 AM–7 PM IST. Or pick a slot directly.</p>
                  </div>
                </div>

                <div className="contact-card">
                  <span className="contact-card-tag">What happens next</span>
                  <ol className="contact-steps">
                    <li className="contact-step">
                      <span className="contact-step-num">1</span>
                      <span className="contact-step-text">
                        <strong>We confirm</strong> + send a calendar link with three time slots.
                      </span>
                    </li>
                    <li className="contact-step">
                      <span className="contact-step-num">2</span>
                      <span className="contact-step-text">
                        <strong>30-minute call</strong> with an agent architect — no slides, just your stack and your hardest use case.
                      </span>
                    </li>
                    <li className="contact-step">
                      <span className="contact-step-num">3</span>
                      <span className="contact-step-text">
                        <strong>One-pager</strong> the next day with the recommended agent, integration plan, and realistic timeline.
                      </span>
                    </li>
                  </ol>
                </div>

                <div className="contact-card">
                  <span className="contact-card-tag">Who you'll talk to</span>
                  <p className="contact-pitch">
                    An <strong>engineer who's deployed agents in production</strong>
                    {" "}at HDFC Bank, Apollo Hospitals, and the Government of India
                    — not an SDR. Bring your hardest use case.
                  </p>
                  <div className="contact-quick">
                    <a href="mailto:hello@ajuni.ai">
                      <Mail size={14} /> hello@ajuni.ai
                    </a>
                    <a href="tel:+911244601100">
                      <Phone size={14} /> +91 124 460 1100
                    </a>
                  </div>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      {/* OTHER WAYS — now action-oriented */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="section-inner">
          <Reveal className="section-head">
            <span className="section-tag">Direct lines</span>
            <h2 className="section-h">Or reach us <span className="serif">a different way.</span></h2>
            <p className="section-sub">
              Quick questions, security questionnaires, partnership intros —
              the right route by intent.
            </p>
          </Reveal>
          <div className="contact-methods">
            <a className="contact-method" href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
              <div className="contact-method-icon"><Calendar size={20} /></div>
              <div>
                <h4>Book a slot directly</h4>
                <p>Skip email — pick a 30-min window from our team's live calendar.</p>
              </div>
              <span className="cm-link">Open calendar →</span>
            </a>

            <a className="contact-method" href="mailto:hello@ajuni.ai">
              <div className="contact-method-icon"><Mail size={20} /></div>
              <div>
                <h4>Email</h4>
                <p>hello@ajuni.ai · sales@ajuni.ai · security@ajuni.ai</p>
              </div>
              <span className="cm-link">Send a note →</span>
            </a>

            <a className="contact-method" href="tel:+911244601100">
              <div className="contact-method-icon"><Phone size={20} /></div>
              <div>
                <h4>Call sales</h4>
                <p>+91 124 460 1100 · Mon–Fri, 9 AM – 7 PM IST</p>
              </div>
              <span className="cm-link">Call now →</span>
            </a>

            <a className="contact-method" href="https://linkedin.com/company/ajuni-ai" target="_blank" rel="noopener noreferrer">
              <div className="contact-method-icon"><Linkedin size={20} /></div>
              <div>
                <h4>LinkedIn</h4>
                <p>Follow product launches, customer stories, and team updates.</p>
              </div>
              <span className="cm-link">Follow us →</span>
            </a>

            <a className="contact-method" href="mailto:partners@ajuni.ai?subject=Partnership%20enquiry">
              <div className="contact-method-icon"><Handshake size={20} /></div>
              <div>
                <h4>Become a partner</h4>
                <p>SIs, MSPs, consultancies — let's build a joint go-to-market.</p>
              </div>
              <span className="cm-link">partners@ajuni.ai →</span>
            </a>

            <div className="contact-method contact-method-static">
              <div className="contact-method-icon"><MapPin size={20} /></div>
              <div>
                <h4>Visit us</h4>
                <p>Webority Technologies · Sector 44, Gurgaon, Haryana, India</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
