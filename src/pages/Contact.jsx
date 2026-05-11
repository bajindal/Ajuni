import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, MapPin, Mail, Phone, Clock } from "lucide-react";
import { Reveal } from "../components/Primitives";
import "./Inner.css";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    industry: "BFSI",
    use: "",
  });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company) return;
    setSubmitted(true);
  };

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
            {/* Left column: form */}
            {!submitted ? (
              <Reveal>
                <div className="contact-form-wrap">
                  <form className="contact-form" onSubmit={onSubmit}>
                    <div className="cf-row">
                      <div className="cf-field">
                        <label htmlFor="name">Full name</label>
                        <input id="name" name="name" type="text" value={form.name} onChange={onChange} required />
                      </div>
                      <div className="cf-field">
                        <label htmlFor="email">Work email</label>
                        <input id="email" name="email" type="email" value={form.email} onChange={onChange} required />
                      </div>
                    </div>
                    <div className="cf-row">
                      <div className="cf-field">
                        <label htmlFor="company">Company</label>
                        <input id="company" name="company" type="text" value={form.company} onChange={onChange} required />
                      </div>
                      <div className="cf-field">
                        <label htmlFor="role">Role</label>
                        <input id="role" name="role" type="text" value={form.role} onChange={onChange} placeholder="e.g. Head of Operations" />
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
                    <button type="submit" className="btn-primary cf-submit btn-large">
                      Book a demo <ArrowRight size={16} />
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
                    <p>An agent architect will reach out to <strong>{form.email}</strong> within 4 working hours.</p>
                  </div>
                </div>
              </Reveal>
            )}

            {/* Right column: response promise + what-to-expect + reassurance */}
            <Reveal delay={120}>
              <aside className="contact-aside">
                <div className="contact-promise">
                  <div className="contact-promise-icon"><Clock size={18} /></div>
                  <div>
                    <h4>Response within 4 working hours</h4>
                    <p>Real human, working hours IST. Not a no-reply confirmation email.</p>
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
                    You'll talk to an <strong>engineer who's deployed agents in production</strong> at HDFC Bank, Apollo Hospitals, and the Government of India &mdash; not an SDR funnel. Bring your hardest use case.
                  </p>
                  <div className="contact-quick">
                    <a href="mailto:hello@ajuni.ai">
                      <Mail size={14} /> hello@ajuni.ai
                    </a>
                    <a href="tel:+911244601100">
                      <Phone size={14} /> +91-124-460-1100
                    </a>
                  </div>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="section-inner">
          <Reveal className="section-head">
            <span className="section-tag">Or reach out directly</span>
            <h2 className="section-h">Other ways <span className="serif">to talk to us.</span></h2>
          </Reveal>
          <div className="contact-methods">
            <div className="contact-method">
              <div className="contact-method-icon"><MapPin size={20} /></div>
              <div>
                <h4>Visit us</h4>
                <p>Webority Technologies, Sector 44, Gurgaon, Haryana, India</p>
              </div>
            </div>
            <a className="contact-method" href="mailto:hello@ajuni.ai">
              <div className="contact-method-icon"><Mail size={20} /></div>
              <div>
                <h4>Email</h4>
                <p>hello@ajuni.ai &middot; sales@ajuni.ai &middot; security@ajuni.ai</p>
              </div>
              <span className="cm-link">Send us a note &rarr;</span>
            </a>
            <a className="contact-method" href="tel:+911244601100">
              <div className="contact-method-icon"><Phone size={20} /></div>
              <div>
                <h4>Call</h4>
                <p>+91-124-XXX-XXXX (Mon&ndash;Fri, 9 AM &ndash; 7 PM IST)</p>
              </div>
              <span className="cm-link">Call sales &rarr;</span>
            </a>
            <a className="contact-method" href="mailto:partners@ajuni.ai">
              <div className="contact-method-icon"><Check size={20} /></div>
              <div>
                <h4>Partner with us</h4>
                <p>SI partners, MSPs, consultancies &mdash; partners@ajuni.ai</p>
              </div>
              <span className="cm-link">Become a partner &rarr;</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
