import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Plus, Minus, Calculator, TrendingDown, Clock, Sparkles } from "lucide-react";
import { Reveal } from "../components/Primitives";
import { PRICING } from "../data/content";
import "./Inner.css";

// Currency presets — used by the ROI calculator
const CURRENCIES = {
  INR: { sym: "₹",  code: "INR", locale: "en-IN", defaultRate: 1200 },
  USD: { sym: "$",  code: "USD", locale: "en-US", defaultRate: 60 },
  EUR: { sym: "€",  code: "EUR", locale: "de-DE", defaultRate: 55 },
  GBP: { sym: "£",  code: "GBP", locale: "en-GB", defaultRate: 50 },
  AED: { sym: "AED",code: "AED", locale: "en-AE", defaultRate: 220 },
};

function fmt(n, cur) {
  const c = CURRENCIES[cur];
  if (n >= 1e7) return c.sym + (n / 1e7).toFixed(1) + " Cr";
  if (n >= 1e5 && cur === "INR") return c.sym + (n / 1e5).toFixed(1) + " L";
  if (n >= 1e6) return c.sym + (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return c.sym + (n / 1e3).toFixed(n >= 1e4 ? 0 : 1) + "K";
  return c.sym + Math.round(n).toLocaleString(c.locale);
}

function ROICalculator() {
  const [currency, setCurrency] = useState("INR");
  const [volume, setVolume]     = useState(2000);  // tasks per month
  const [minutes, setMinutes]   = useState(15);    // minutes per task
  const [rate, setRate]         = useState(CURRENCIES.INR.defaultRate); // hourly cost
  const [autoRate, setAutoRate] = useState(75);    // % of tasks Ajuni handles end-to-end

  // When user switches currency, reset rate to that currency's default
  const onCurrency = (c) => {
    setCurrency(c);
    setRate(CURRENCIES[c].defaultRate);
  };

  const calc = useMemo(() => {
    const monthlyHours = (volume * minutes) / 60;
    const monthlyCost  = monthlyHours * rate;
    const handled      = volume * (autoRate / 100);
    const savedHours   = (handled * minutes) / 60;
    const savedCost    = savedHours * rate;
    // Ajuni run cost — rough industry-style proxy; real numbers vary per agent
    const runCost      = currency === "INR" ? 0.42 : currency === "USD" ? 0.005 : currency === "EUR" ? 0.005 : currency === "GBP" ? 0.004 : 0.018;
    const ajuniCost    = handled * runCost;
    const netSaving    = Math.max(0, savedCost - ajuniCost);
    const yearlySaving = netSaving * 12;
    // Payback months — rough Business plan proxy per currency
    const planFee = currency === "INR" ? 199000 : currency === "USD" ? 2400 : currency === "EUR" ? 2200 : currency === "GBP" ? 1900 : 8800;
    const payback  = netSaving > 0 ? Math.max(1, Math.round(planFee / netSaving)) : null;
    return { monthlyHours, monthlyCost, savedHours, savedCost, ajuniCost, netSaving, yearlySaving, payback };
  }, [volume, minutes, rate, autoRate, currency]);

  return (
    <section className="section roi-section" id="roi">
      <div className="section-inner">
        <Reveal className="section-head">
          <span className="section-tag"><Calculator size={12} /> ROI Calculator</span>
          <h2 className="section-h">See your <span className="serif">payback in months,</span> not years.</h2>
          <p className="section-sub">
            Drop in your numbers — current task volume, time per task, and a fully-loaded
            hourly rate. Watch it in real time. No email gate.
          </p>
        </Reveal>

        <Reveal className="roi-grid">
          {/* Inputs */}
          <div className="roi-inputs">
            <div className="roi-curr">
              {Object.keys(CURRENCIES).map((c) => (
                <button
                  key={c}
                  className={`roi-curr-btn ${currency === c ? "active" : ""}`}
                  onClick={() => onCurrency(c)}
                >
                  {CURRENCIES[c].sym} <span>{c}</span>
                </button>
              ))}
            </div>

            <Slider
              label="Tasks per month"
              hint="Tickets, claims, RFPs, applications — anything an agent could handle."
              value={volume} setValue={setVolume}
              min={100} max={50000} step={100}
              format={(v) => v.toLocaleString(CURRENCIES[currency].locale)}
            />
            <Slider
              label="Minutes per task (today)"
              hint="Average human time per item end-to-end."
              value={minutes} setValue={setMinutes}
              min={2} max={120} step={1}
              format={(v) => v + " min"}
            />
            <Slider
              label="Fully-loaded hourly cost"
              hint="Salary + overhead + benefits, per hour, in the team handling the work."
              value={rate} setValue={setRate}
              min={Math.round(CURRENCIES[currency].defaultRate * 0.2)}
              max={Math.round(CURRENCIES[currency].defaultRate * 6)}
              step={Math.round(CURRENCIES[currency].defaultRate * 0.05)}
              format={(v) => fmt(v, currency) + "/hr"}
            />
            <Slider
              label="% Ajuni handles autonomously"
              hint="Typical: 70-85% for Tier-1 support, claims drafting, KYC, GST."
              value={autoRate} setValue={setAutoRate}
              min={30} max={95} step={1}
              format={(v) => v + "%"}
            />
          </div>

          {/* Output */}
          <div className="roi-output">
            <div className="roi-headline">
              <div className="roi-headline-tag">Net saving / month</div>
              <div className="roi-headline-num tabular">{fmt(calc.netSaving, currency)}</div>
              <div className="roi-headline-sub">
                <Sparkles size={13} /> {fmt(calc.yearlySaving, currency)} per year
              </div>
            </div>

            <div className="roi-stats">
              <div className="roi-stat">
                <Clock size={14} />
                <div>
                  <div className="roi-stat-num tabular">{Math.round(calc.savedHours).toLocaleString(CURRENCIES[currency].locale)}</div>
                  <div className="roi-stat-lbl">hours returned to your team / month</div>
                </div>
              </div>
              <div className="roi-stat">
                <TrendingDown size={14} />
                <div>
                  <div className="roi-stat-num tabular">{calc.payback ? calc.payback : "—"}{calc.payback ? " mo" : ""}</div>
                  <div className="roi-stat-lbl">payback on the Business plan</div>
                </div>
              </div>
            </div>

            {/* Comparison bar */}
            <div className="roi-bar">
              <div className="roi-bar-row">
                <span className="roi-bar-lbl">Today</span>
                <div className="roi-bar-track">
                  <div className="roi-bar-fill today" style={{ width: "100%" }}>
                    <span>{fmt(calc.monthlyCost, currency)}</span>
                  </div>
                </div>
              </div>
              <div className="roi-bar-row">
                <span className="roi-bar-lbl">With Ajuni</span>
                <div className="roi-bar-track">
                  <div
                    className="roi-bar-fill ajuni"
                    style={{ width: Math.max(8, Math.min(100, ((calc.monthlyCost - calc.netSaving) / calc.monthlyCost) * 100)) + "%" }}
                  >
                    <span>{fmt(Math.max(0, calc.monthlyCost - calc.netSaving), currency)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="roi-foot">
              <Link to="/contact" className="btn-primary">
                Get a custom ROI for your team <ArrowRight size={14} />
              </Link>
              <p className="roi-disclaimer">
                Indicative only. Real numbers depend on agent type, integrations, and your team's baseline. Talk to us for a tailored model.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Slider({ label, hint, value, setValue, min, max, step, format }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="roi-slider">
      <div className="roi-slider-head">
        <label>{label}</label>
        <span className="roi-slider-val tabular">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step} value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        style={{ '--pct': pct + '%' }}
      />
      {hint && <div className="roi-slider-hint">{hint}</div>}
    </div>
  );
}

export default function Pricing() {
  const [yearly, setYearly] = useState(true);
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: "What counts as an 'agent run'?",
      a: "An agent run is one complete task, end-to-end — from input received to output delivered. Multi-step agent workflows count as a single run as long as they complete one logical task. We never charge for retries, internal sub-calls, or supervisor-orchestrated coordination.",
    },
    {
      q: "Can I exceed my monthly run limit?",
      a: "Yes. Overage is metered at standard rates listed in your contract. We notify you at 80% and 100% of your plan limit. No surprise bills, no service interruptions.",
    },
    {
      q: "What's included in 'production support'?",
      a: "All plans include monitoring, observability, and standard SLAs. Business and Enterprise add a dedicated agent architect, Slack channel, and faster response times. Enterprise adds 24×7 SOC and 99.99% SLA with credits.",
    },
    {
      q: "Do you offer non-profit or government discounts?",
      a: "Yes. Government, public sector undertakings (PSUs), and registered non-profits get up to 30% off Business and Enterprise plans. Talk to sales for the exact rate.",
    },
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
            <span style={{ color: "var(--text-on-dark)" }}>Pricing</span>
          </div>
          <h1>Pay for outcomes, <br /><span className="serif">not seats.</span></h1>
          <p className="lede">
            Transparent, usage-based pricing. No setup fees. No per-seat
            tax. Includes deployment support from CMMI L5 architects.
          </p>
          <div className="bill-toggle" role="tablist">
            <button
              className={!yearly ? "active" : ""}
              onClick={() => setYearly(false)}
              role="tab"
              aria-selected={!yearly}
            >
              Monthly
            </button>
            <button
              className={yearly ? "active" : ""}
              onClick={() => setYearly(true)}
              role="tab"
              aria-selected={yearly}
            >
              Yearly <span className="bill-save">Save 20%</span>
            </button>
          </div>
        </div>
      </section>

      <section className="section pricing-section">
        <div className="section-inner">
          <div className="pricing-cards">
            {PRICING.map((p, idx) => (
              <Reveal key={p.name} className={`price-card ${p.featured ? "featured" : ""}`} delay={idx * 80}>
                <h3>{p.name}</h3>
                <p className="desc">{p.desc}</p>
                <div className="price-amt">
                  {p.price.custom ? (
                    <span className="num tabular">{p.price.custom}</span>
                  ) : (
                    <>
                      <span className="cur">₹</span>
                      <span className="num tabular">
                        {(yearly ? p.price.y : p.price.m).toLocaleString("en-IN")}
                      </span>
                      <span className="per">/ month{yearly ? ", billed yearly" : ""}</span>
                    </>
                  )}
                </div>
                <ul>
                  {p.bullets.map((b) => (
                    <li key={b}>
                      <Check size={14} /> {b}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={p.cta.style === "primary" ? "btn-primary btn-large" : "btn-outline"}
                >
                  {p.cta.label}
                </Link>
              </Reveal>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: 24, fontSize: 13, color: "var(--text-3)" }}>
            INR pricing shown · USD/EUR/GBP/AED contracts available · 18% GST in India · Pay by UPI, wire, ACH, or card · Annual billing saves 2 months
          </p>
        </div>
      </section>

      <ROICalculator />

      <section className="section faq" style={{ background: "var(--surface)" }}>
        <div className="section-inner faq-inner">
          <Reveal className="section-head">
            <span className="section-tag">Pricing FAQ</span>
            <h2 className="section-h">Questions about <span className="serif">pricing.</span></h2>
          </Reveal>
          <div className="faq-list">
            {faqs.map((f, idx) => (
              <div key={f.q} className={`faq-item ${openFaq === idx ? "open" : ""}`}>
                <button
                  className="faq-q"
                  onClick={() => setOpenFaq((o) => (o === idx ? -1 : idx))}
                >
                  <span>{f.q}</span>
                  <span className="faq-icon">{openFaq === idx ? <Minus size={18} /> : <Plus size={18} />}</span>
                </button>
                <div className="faq-a-wrap">
                  <p className="faq-a">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-final">
        <div className="cta-orbs" aria-hidden="true">
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>
        <Reveal className="cta-inner">
          <h2>Try Ajuni <span className="serif">free for 30 days.</span></h2>
          <p>No credit card. No commitment. One agent live in your environment by week three.</p>
          <div className="hero-ctas">
            <Link to="/contact" className="btn-on-dark">Start free pilot <ArrowRight size={14} /></Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
