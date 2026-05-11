import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Check, Shield, Zap, Sparkles, Play, Pause,
  Quote as QuoteIcon, Plus, Minus, Workflow, Network, Database,
  Share2, ShieldAlert, Scale, Activity, Lock, CheckCircle2,
  Briefcase, Building2, Landmark, ShoppingBag, Factory, Cpu,
  Bell, FileText, Banknote, MessageCircle, Globe,
  TrendingUp, Megaphone, Users, Headphones, Calculator, Package
} from "lucide-react";
import { AjuniMark, AjuniWordmark, Reveal, useReveal, useCounter, useParallax, Magnetic, useSpotlight } from "../components/Primitives";
import { INDUSTRIES, FUNCTIONS, MODULES, CUSTOMERS, TESTIMONIALS } from "../data/content";
import "./Home.css";

const ICONS = {
  Workflow, Network, Database, Share2, ShieldAlert, Scale, Activity, Lock,
  Briefcase, Building2, Landmark, ShoppingBag, Factory, Cpu, Bell, FileText, Banknote, MessageCircle
};

const FUNCTION_ICONS = {
  TrendingUp, Megaphone, Users, Headphones, Calculator, Package,
};

const INDUSTRY_ICON = {
  bfsi: Building2,
  healthcare: Plus,
  government: Landmark,
  retail: ShoppingBag,
  manufacturing: Factory,
  "it-saas": Cpu,
};

// ============ ROTATOR ============
const ROTATOR = ["loan applications", "patient claims", "vendor RFPs", "customer tickets", "compliance reports"];
function Rotator() {
  const [i, setI] = useState(0);
  const wrapRef = useRef(null);
  const measureRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % ROTATOR.length), 2400);
    return () => clearInterval(id);
  }, []);

  // Measure the active word's width and apply it to the wrapper. CSS transitions
  // animate the change, so the comma stays glued to the right edge of the word.
  useEffect(() => {
    if (!wrapRef.current || !measureRef.current) return;
    const setW = () => {
      if (wrapRef.current && measureRef.current) {
        wrapRef.current.style.width = measureRef.current.offsetWidth + "px";
      }
    };
    setW();
    // Re-measure on font load (avoids first-paint with fallback metrics)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(setW).catch(() => {});
    }
    window.addEventListener("resize", setW);
    return () => window.removeEventListener("resize", setW);
  }, [i]);

  return (
    <span className="rotator" aria-live="polite" ref={wrapRef}>
      {ROTATOR.map((w, idx) => (
        <span key={w} className={`rot-word ${idx === i ? "active" : ""}`}>{w}</span>
      ))}
      {/* Hidden measurer — picks up font metrics, never visible */}
      <span className="rot-measure" ref={measureRef} aria-hidden="true">{ROTATOR[i]}</span>
    </span>
  );
}

// ============ HERO ============
// Compact ops console rendered to the right of the H1. Dense, tabular, with
// sparkline visualizations — built to read as "real production telemetry,"
// not a marketing card. Updates a fake activity log every 2.4s.
function MiniSparkline({ points, stroke = "currentColor" }) {
  const w = 56, h = 16, pad = 1.5;
  const max = Math.max(...points), min = Math.min(...points);
  const dx = (w - pad * 2) / (points.length - 1);
  const norm = (v) => h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2);
  const d = points.map((v, i) => `${i === 0 ? "M" : "L"}${pad + i * dx},${norm(v)}`).join(" ");
  const fill = `${d} L${w - pad},${h} L${pad},${h} Z`;
  return (
    <svg className="lop-spark" width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <path d={fill} fill={stroke} opacity="0.14" />
      <path d={d} fill="none" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={w - pad} cy={norm(points[points.length - 1])} r="1.8" fill={stroke} />
    </svg>
  );
}

function LiveAgentsPanel() {
  // Tabular agent telemetry — fixed columns: agent · status · latency · last-run
  const agents = [
    { name: "Aria",   role: "SDR",        status: "run", lat: "1.2s", last: "now",   icon: Briefcase },
    { name: "Riya",   role: "Reconciler", status: "ok",  lat: "0.8s", last: "14:32", icon: Banknote },
    { name: "Asha",   role: "Support",    status: "run", lat: "2.1s", last: "14:31", icon: MessageCircle },
    { name: "Veer",   role: "Audit",      status: "ok",  lat: "0.4s", last: "14:29", icon: Lock },
    { name: "Dwight", role: "Procurement",status: "warn",lat: "3.8s", last: "14:27", icon: FileText },
  ];

  // Live activity ticker — rotating one-line log entries.
  const lines = [
    { t: "14:32:18", tag: "AUDIT", text: "Veer sealed 142 actions to ledger" },
    { t: "14:32:09", tag: "GST",   text: "Riya filed GSTR-3B · 6 entities · ₹2.4Cr" },
    { t: "14:32:02", tag: "SDR",   text: "Aria queued 28 outbound emails" },
    { t: "14:31:55", tag: "RCM",   text: "Asha escalated 3 denials · ₹4.2L recovery" },
    { t: "14:31:48", tag: "KYC",   text: "Riya validated 412 PAN-Aadhaar links" },
    { t: "14:31:39", tag: "FRAUD", text: "Veer flagged 2 anomalous wires to ops" },
  ];
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setTick((t) => (t + 1) % lines.length), 2400);
    return () => clearInterval(id);
  }, [lines.length]);
  const current = lines[tick];

  return (
    <aside className="lop" aria-label="Live operations">
      {/* Chrome */}
      <div className="lop-chrome">
        <div className="lop-chrome-left">
          <span className="lop-dot lop-dot-r" />
          <span className="lop-dot lop-dot-y" />
          <span className="lop-dot lop-dot-g" />
          <span className="lop-path tabular">app.ajuni.ai/ops</span>
        </div>
        <span className="lop-live">
          <span className="lop-live-dot" />
          <span>LIVE</span>
        </span>
      </div>

      {/* Stats grid with sparklines */}
      <div className="lop-stats">
        <div className="lop-stat">
          <div className="lop-stat-num tabular">48,206</div>
          <div className="lop-stat-row">
            <span className="lop-stat-lbl">RUNS TODAY</span>
            <MiniSparkline points={[12, 18, 14, 22, 28, 26, 34, 38, 42, 48]} stroke="oklch(0.78 0.14 285)" />
          </div>
        </div>
        <div className="lop-stat">
          <div className="lop-stat-num tabular">84.2<span className="lop-stat-suf">%</span></div>
          <div className="lop-stat-row">
            <span className="lop-stat-lbl">AUTO-RESOLVED</span>
            <MiniSparkline points={[78, 80, 79, 82, 81, 83, 82, 84, 83, 84]} stroke="oklch(0.72 0.16 152)" />
          </div>
        </div>
        <div className="lop-stat">
          <div className="lop-stat-num tabular">₹0.42</div>
          <div className="lop-stat-row">
            <span className="lop-stat-lbl">COST / RUN</span>
            <MiniSparkline points={[58, 54, 52, 49, 46, 44, 45, 43, 42, 42]} stroke="oklch(0.78 0.16 152)" />
          </div>
        </div>
      </div>

      {/* Agent telemetry table */}
      <div className="lop-table">
        <div className="lop-thead">
          <span>AGENT</span>
          <span>STATUS</span>
          <span>P95</span>
          <span>LAST</span>
        </div>
        {agents.map((a) => {
          const Ico = a.icon;
          return (
            <div key={a.name} className="lop-tr">
              <div className="lop-cell-agent">
                <span className="lop-agent-icon"><Ico size={12} /></span>
                <span className="lop-agent-name">{a.name}</span>
                <span className="lop-agent-role">{a.role.toLowerCase()}</span>
              </div>
              <div className="lop-cell-status">
                <span className={`lop-st lop-st-${a.status}`}>
                  <span className="lop-st-dot" />
                  {a.status === "run" ? "running" : a.status === "warn" ? "review" : "ok"}
                </span>
              </div>
              <div className="lop-cell-mono tabular">{a.lat}</div>
              <div className="lop-cell-mono lop-cell-muted tabular">{a.last}</div>
            </div>
          );
        })}
      </div>

      {/* Activity ticker */}
      <div className="lop-ticker">
        <span className="lop-ticker-time tabular">{current.t}</span>
        <span className={`lop-ticker-tag lop-ticker-tag-${current.tag.toLowerCase()}`}>{current.tag}</span>
        <span className="lop-ticker-text">{current.text}</span>
      </div>
    </aside>
  );
}

// Compact, ever-ticking activity counter rendered above the CTAs.
// Number ticks up by ~1-3 every few seconds (we never claim a specific count).
function LiveCounter() {
  const [n, setN] = useState(1247);
  useEffect(() => {
    if (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setN((v) => v + Math.floor(Math.random() * 3) + 1), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="hero-live-chip" aria-label="Live agent activity">
      <span className="hlc-dot" />
      <span className="hlc-num tabular">{n.toLocaleString("en-IN")}</span>
      <span className="hlc-text">agent runs across active deployments</span>
    </div>
  );
}

// Above-the-fold customer trust strip — renders all CUSTOMERS as monogram pills.
function HeroLogosStrip() {
  const monogram = (name) =>
    name.replace(/&/g, "").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  return (
    <div className="hero-logos">
      <span className="hero-logos-lbl">Trusted by</span>
      <div className="hero-logos-pills">
        {CUSTOMERS.slice(0, 8).map((c) => (
          <span key={c} className="hero-logo-pill" title={c}>
            <span className="hlp-mono">{monogram(c)}</span>
            <span className="hlp-name">{c}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// Lightweight modal that pops a placeholder video pane. Wire to a real
// embed (YouTube / Loom / Mux) by swapping the iframe src.
function VideoModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onEsc = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="video-modal" onClick={onClose} role="dialog" aria-modal="true">
      <div className="video-modal-frame" onClick={(e) => e.stopPropagation()}>
        <button className="video-modal-close" onClick={onClose} aria-label="Close video">
          <Plus size={18} style={{ transform: "rotate(45deg)" }} />
        </button>
        <div className="video-modal-pane">
          <div className="video-modal-placeholder">
            <Play size={36} fill="currentColor" />
            <strong>90-second product tour</strong>
            <p>Drop your real Loom / YouTube / Mux embed URL into <code>VideoModal</code>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const orb1Ref = useParallax(-0.18);
  const orb2Ref = useParallax(-0.10);
  const orb3Ref = useParallax(-0.24);
  const gridRef = useParallax(-0.06);
  const spotRef = useSpotlight();
  const [videoOpen, setVideoOpen] = useState(false);
  return (
    <section className="hero spotlight" ref={spotRef}>
      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
      <div className="hero-grid" aria-hidden="true" ref={gridRef} />
      <div className="hero-orbs" aria-hidden="true">
        <div className="orb-px" ref={orb1Ref}><div className="orb orb-1" /></div>
        <div className="orb-px" ref={orb2Ref}><div className="orb orb-2" /></div>
        <div className="orb-px" ref={orb3Ref}><div className="orb orb-3" /></div>
      </div>
      <div className="hero-inner hero-split">
        {/* LEFT — text + CTAs */}
        <div className="hero-text">
          <span className="eyebrow eyebrow-live">
            <span className="dot dot-pulse" />
            <span>Live · India-born, deployed globally</span>
          </span>
          <h1 className="h1-glow">
            Your team handles strategy.<br />
            Ajuni handles <Rotator />, <span className="serif">end to end.</span>
          </h1>
          <p className="lede lede-tight">
            Production-ready AI agents for regulated industries.
          </p>
          <div className="hero-ctas">
            <Magnetic><Link to="/contact" className="btn-on-dark">Book a demo <ArrowRight size={14} /></Link></Magnetic>
            <button className="btn-watch-demo" onClick={() => setVideoOpen(true)}>
              <span className="btn-watch-play"><Play size={11} fill="currentColor" /></span>
              <span>Watch 90s demo</span>
            </button>
          </div>
        </div>
        {/* RIGHT — compact live-agents panel */}
        <LiveAgentsPanel />
      </div>
      <HeroMock />
    </section>
  );
}

// Pool of agent activity events the live feed cycles through.
const FEED_EVENTS = [
  { tag: "SDR",     dot: "ok",   text: "Aria · drafted 28 outbound emails to enterprise leads" },
  { tag: "GST",     dot: "ok",   text: "Gaurav · prepared GSTR-3B for 6 entities" },
  { tag: "RCM",     dot: "warn", text: "Asha · escalated 3 claim denials to physician review" },
  { tag: "Procure", dot: "run",  text: "Dwight · analyzing 14-page RFP from Govt of Karnataka" },
  { tag: "QA",      dot: "ok",   text: "Veer · sealed 142 actions to immutable audit log" },
  { tag: "HR",      dot: "ok",   text: "Diya · screened 84 candidates for SDE-2 role" },
  { tag: "KYC",     dot: "ok",   text: "Riya · validated 412 PAN-Aadhaar links" },
  { tag: "Support", dot: "run",  text: "Asha · resolving 'refund stuck' for 9 customers" },
  { tag: "Fraud",   dot: "warn", text: "Veer · flagged 2 anomalous wires to ops" },
  { tag: "Demand",  dot: "ok",   text: "Maya · recomputed weekly forecast across 1.2k SKUs" },
];

function pad2(n) { return n < 10 ? "0" + n : "" + n; }
function fmtTime(d) { return pad2(d.getHours()) + ":" + pad2(d.getMinutes()); }

function HeroMock() {
  // Live feed: keep last 6 events, prepend a new one every few seconds.
  // Seed with 6 fixed entries so SSR/first paint matches what the user expects.
  const seed = useRef(null);
  if (seed.current === null) {
    const now = new Date();
    seed.current = FEED_EVENTS.slice(0, 6).map((e, i) => {
      const t = new Date(now.getTime() - (i + 1) * 4 * 60 * 1000);
      return { ...e, time: fmtTime(t), id: `seed-${i}` };
    });
  }
  const [feed, setFeed] = useState(seed.current);
  const [paused, setPaused] = useState(false);
  const [approved, setApproved] = useState(false);
  const cursorRef = useRef(6);
  const idRef = useRef(0);

  useEffect(() => {
    if (paused) return;
    if (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      const evt = FEED_EVENTS[cursorRef.current % FEED_EVENTS.length];
      cursorRef.current++;
      idRef.current++;
      setFeed((cur) => [
        { ...evt, time: fmtTime(new Date()), id: `live-${idRef.current}` },
        ...cur,
      ].slice(0, 6));
    }, 3200);
    return () => clearInterval(id);
  }, [paused]);

  // Counters use the existing useCounter hook scoped to a hidden anchor at top of mock
  return (
    <div className="hero-mock" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="mock-frame">
        <div className="mock-chrome" aria-hidden="true">
          <span className="mc-dot mc-r" />
          <span className="mc-dot mc-y" />
          <span className="mc-dot mc-g" />
          <div className="mc-url">
            <Lock size={10} />
            app.ajuni.ai/operations
          </div>
          <div className="mc-tools">
            <span className="mc-pill mc-live"><span className="mc-live-dot" /> Live</span>
          </div>
        </div>
        <div className="mock-screen">
          <aside className="mock-side">
            <div className="ms-brand"><AjuniWordmark size={22} /></div>
            <div className="ms-section">Workspace</div>
            <div className="ms-item"><Workflow size={14} /> Dashboard</div>
            <div className="ms-item active"><Activity size={14} /> Agent Activity <span className="ms-badge">12</span></div>
            <div className="ms-item"><Database size={14} /> Knowledge</div>
            <div className="ms-item"><Lock size={14} /> Audit trail</div>
            <div className="ms-section">Agents</div>
            <div className="ms-item"><span className="ms-online" /><Briefcase size={14} /> Aria · SDR</div>
            <div className="ms-item"><span className="ms-online" /><Banknote size={14} /> Riya · Reconciler</div>
            <div className="ms-item"><span className="ms-online" /><MessageCircle size={14} /> Asha · Support</div>
            <div className="ms-section">Account</div>
            <div className="ms-item"><Shield size={14} /> Governance</div>
          </aside>
          <main className="mock-main">
            <div className="mock-topbar">
              <div>
                <div className="crumb">Live · All agents · Last 24 hours</div>
                <h3>Operations dashboard</h3>
              </div>
              <span className="mock-status"><span className="ms-dot" /> 12 agents running</span>
            </div>
            <div className="mock-stats">
              <LiveStat label="Agent runs"   target={48206} suffix=""    delta="+14% vs yesterday" />
              <LiveStat label="Auto-resolved" target={84.2}  suffix="%"   delta="Above target" decimals={1} />
              <LiveStat label="Avg latency"   target={1.2}   suffix="s"   delta="p95" decimals={1} />
              <LiveStat label="Cost / run"    target={0.42}  prefix="₹"   delta="-8% MoM" decimals={2} />
            </div>
            <div className="agent-feed">
              {feed.map((e, idx) => (
                <FeedLine key={e.id} tag={e.tag} dot={e.dot} text={e.text} time={e.time} fresh={idx === 0} />
              ))}
            </div>
            <div className={`mock-ai ${approved ? "approved" : ""}`}>
              <div className="mock-ai-mark"><AjuniMark size={14} /></div>
              <div className="mock-ai-text">
                <strong>Ajuni:</strong>{" "}
                {approved
                  ? <>Routed to physician review · audit entry <span className="tabular">#48,207</span> sealed.</>
                  : <>3 claims need physician review. I prioritized by recovery probability — top one is ₹4.2L. Approve to route?</>}
                <div className="mock-ai-actions">
                  {approved ? (
                    <button className="ai-done"><CheckCircle2 size={12} /> Done</button>
                  ) : (
                    <>
                      <button onClick={() => setApproved(true)}>Approve &amp; route</button>
                      <button className="ghost">View details</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function LiveStat({ label, target, prefix = "", suffix = "", decimals = 0, delta, warn }) {
  const { ref, display } = useCounter(target, 1800, decimals);
  return (
    <div className="mock-stat" ref={ref}>
      <div className="ms-label">{label}</div>
      <div className="ms-val tabular">{prefix}{display}{suffix}</div>
      <div className={`ms-delta ${warn ? "warn" : ""}`}>{delta}</div>
    </div>
  );
}

function FeedLine({ tag, dot, text, time, fresh }) {
  return (
    <div className={`feed-line ${fresh ? "fresh" : ""}`}>
      <span className={`feed-dot ${dot}`} />
      <span className="feed-tag">{tag}</span>
      <span>{text}</span>
      <span className="feed-time tabular">{time}</span>
    </div>
  );
}

// ============ MARQUEE ============
function Marquee() {
  // Initials for monogram tile (handles "Johnson & Johnson" → JJ, "Apollo Hospitals" → AH)
  const monogram = (name) =>
    name
      .replace(/&/g, "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();

  return (
    <section className="marquee-band">
      <p className="logos-label">Trusted by leading enterprises and government bodies — across India and the world</p>
      <div className="marquee">
        <div className="marquee-track">
          {[...CUSTOMERS, ...CUSTOMERS].map((t, i) => (
            <span key={i} className="marquee-item">
              <span className="me-dot">{monogram(t)}</span>
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ STATS ============
function Sparkline({ points = [3, 5, 4, 7, 6, 9, 8, 12, 11, 14], stroke = "currentColor" }) {
  const w = 96, h = 28, pad = 2;
  const max = Math.max(...points), min = Math.min(...points);
  const dx = (w - pad * 2) / (points.length - 1);
  const norm = (v) => h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2);
  const d = points.map((v, i) => `${i === 0 ? "M" : "L"}${pad + i * dx},${norm(v)}`).join(" ");
  const fill = `${d} L${w - pad},${h} L${pad},${h} Z`;
  return (
    <svg className="sb-spark" width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <path d={fill} fill="currentColor" opacity="0.10" />
      <path d={d} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={w - pad} cy={norm(points[points.length - 1])} r="2.4" fill={stroke} />
    </svg>
  );
}
function StatBig({ icon: Ico, n, label, prefix = "", suffix = "", decimals = 0, delta, spark }) {
  const { ref, display } = useCounter(n, 1800, decimals);
  return (
    <div className="stat-big" ref={ref}>
      {Ico && (
        <div className="sb-icon">
          <Ico size={18} />
        </div>
      )}
      <div className="sb-num tabular">{prefix}{display}{suffix}</div>
      <div className="sb-label">{label}</div>
      {(delta || spark) && (
        <div className="sb-foot">
          {delta && <span className="sb-delta">{delta}</span>}
          {spark && <Sparkline points={spark} />}
        </div>
      )}
    </div>
  );
}
function StatsBand() {
  return (
    <section className="stats-band">
      <div className="stats-inner">
        <div className="stats-head">
          <span className="stats-head-tag">By the numbers</span>
          <h3 className="stats-head-title">
            What happens when you put production-grade agents <span className="serif">to work.</span>
          </h3>
        </div>
        <div className="stats-grid">
          <StatBig
            icon={Sparkles}
            n={12}
            label="pre-built agents across functions"
            suffix="+"
            delta="+3 this quarter"
            spark={[6, 7, 6, 8, 9, 8, 10, 11, 11, 12]}
          />
          <StatBig icon={CheckCircle2} n={84} label="auto-resolution across deployed agents" suffix="%" />
          <StatBig icon={Zap} n={4} label="weeks to first agent in production" suffix="–8" />
          <StatBig icon={Network} n={100} label="enterprise integrations out of the box" suffix="+" />
        </div>
      </div>
    </section>
  );
}

// ============ SOLUTIONS HOME ============
function SolutionsHome() {
  const [tab, setTab] = useState("industry");
  const items = tab === "industry" ? INDUSTRIES : FUNCTIONS;

  // Industry-specific accent treatments — Lucide SVG icons only, no emoji
  const industryAccent = {
    bfsi: { tone: "from-indigo", agents: ["Loan underwriter", "KYC validator", "Fraud watcher"] },
    healthcare: { tone: "from-emerald", agents: ["Claims drafter", "Clinical scribe", "Patient triage"] },
    government: { tone: "from-amber", agents: ["Tender analyst", "Citizen helper", "Scheme advisor"] },
    retail: { tone: "from-pink", agents: ["Demand forecaster", "WhatsApp seller", "Returns agent"] },
    manufacturing: { tone: "from-blue", agents: ["Maintenance predictor", "Dispatch optimizer", "QA inspector"] },
    "it-saas": { tone: "from-cyan", agents: ["In-product copilot", "Tier-1 support", "Demo qualifier"] },
  };

  return (
    <section className="section solutions-home">
      <div className="section-inner">
        <Reveal className="section-head">
          <span className="section-tag">Solutions</span>
          <h2 className="section-h">One platform, <span className="serif">every domain.</span></h2>
          <p className="section-sub">
            Pre-built agent blueprints for India's regulated industries and the
            functions every enterprise runs. Mix, match, and deploy.
          </p>
        </Reveal>

        <div className="sh-tabs" role="tablist">
          <button className={`sh-tab ${tab === "industry" ? "active" : ""}`} onClick={() => setTab("industry")}>
            By Industry
          </button>
          <button className={`sh-tab ${tab === "function" ? "active" : ""}`} onClick={() => setTab("function")}>
            By Function
          </button>
        </div>

        {tab === "industry" ? (
          <div className="sh-bento">
            {/* Featured industry - BFSI */}
            <Reveal className="shb-card shb-feat" delay={0}>
              <Link to={`/industries/${items[0].slug}`} className="shb-link">
                <div className="shb-feat-tag">Featured · most regulated</div>
                <div className="shb-feat-grid">
                  <div className="shb-feat-content">
                    <div className="shb-icon shb-icon-feat">
                      <Building2 size={28} />
                    </div>
                    <h3>{items[0].name}</h3>
                    <p className="shb-desc">{items[0].desc}</p>
                    <div className="shb-feat-stats">
                      <div className="shb-feat-stat">
                        <div className="shb-feat-stat-num tabular">{items[0].stat.n}</div>
                        <div className="shb-feat-stat-lbl">{items[0].stat.l}</div>
                      </div>
                      <div className="shb-feat-customers">
                        <div className="shb-feat-customers-lbl">Trusted by</div>
                        <div className="shb-feat-customer-list">
                          {items[0].customers.slice(0, 4).map((c) => (
                            <span key={c} className="shb-cust-pill">{c}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="shb-feat-cta">
                      Explore BFSI agents <ArrowRight size={14} />
                    </div>
                  </div>
                  <div className="shb-feat-visual">
                    <div className="shb-visual-mock">
                      <div className="svm-head">
                        <div className="svm-dot" />
                        <span>Loan underwriting agent · live</span>
                      </div>
                      <div className="svm-row">
                        <span className="svm-label">Application LP-2098</span>
                        <span className="svm-pill svm-ok">Approved</span>
                      </div>
                      <div className="svm-bar">
                        <div className="svm-bar-fill" style={{ width: "76%" }} />
                        <span className="svm-bar-lbl">76% confidence · 4 min</span>
                      </div>
                      <div className="svm-row">
                        <span className="svm-label">Application LP-2099</span>
                        <span className="svm-pill svm-warn">Review</span>
                      </div>
                      <div className="svm-bar">
                        <div className="svm-bar-fill warn" style={{ width: "42%" }} />
                        <span className="svm-bar-lbl">2 docs missing</span>
                      </div>
                      <div className="svm-row">
                        <span className="svm-label">Application LP-2100</span>
                        <span className="svm-pill svm-ok">Approved</span>
                      </div>
                      <div className="svm-bar">
                        <div className="svm-bar-fill" style={{ width: "89%" }} />
                        <span className="svm-bar-lbl">89% · 3 min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>

            {/* Other industries — rich cards */}
            {items.slice(1).map((item, idx) => {
              const Ico = INDUSTRY_ICON[item.slug] || Building2;
              const accent = industryAccent[item.slug] || {};
              return (
                <Reveal key={item.slug} delay={(idx + 1) * 60}>
                  <Link to={`/industries/${item.slug}`} className={`shb-card shb-${accent.tone}`}>
                    <div className="shb-card-head">
                      <div className="shb-icon">
                        <Ico size={22} />
                      </div>
                    </div>
                    <h3>{item.name}</h3>
                    <p className="shb-tagline">{item.tagline}</p>
                    <div className="shb-agents">
                      <div className="shb-agents-lbl">Pre-built agents</div>
                      <div className="shb-agents-list">
                        {(accent.agents || []).map((a) => (
                          <span key={a} className="shb-agent-pill">{a}</span>
                        ))}
                      </div>
                    </div>
                    <div className="shb-foot">
                      <div className="shb-foot-stat">
                        <strong className="tabular">{item.stat.n}</strong> {item.stat.l}
                      </div>
                      <ArrowRight size={16} className="shb-arrow" />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <div className="sh-fn-grid">
            {items.map((f, idx) => {
              const FIco = FUNCTION_ICONS[f.icon] || Briefcase;
              return (
              <Reveal key={f.slug} delay={idx * 50}>
                <Link to={`/functions/${f.slug}`} className="shf-card">
                  <div className="shf-head">
                    <div className="shf-icon"><FIco size={20} /></div>
                    <div>
                      <h3>{f.name}</h3>
                      <p className="shf-tagline">{f.tagline}</p>
                    </div>
                  </div>
                  <p className="shf-desc">{f.desc}</p>
                  <div className="shf-agents">
                    <span className="shf-agents-lbl">Includes:</span>
                    {f.agents.map((a) => (
                      <span key={a} className="shf-agent-pill">{a.split(" (")[0]}</span>
                    ))}
                  </div>
                  <div className="shf-foot">
                    <div className="shf-stat">
                      <span className="shf-stat-num tabular">{f.metrics.n}</span>
                      <span className="shf-stat-lbl">{f.metrics.l}</span>
                    </div>
                    <span className="shf-arrow"><ArrowRight size={16} /></span>
                  </div>
                </Link>
              </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

// ============ MODULES ============
function ModulesSection() {
  // Group the 8 modules into 3 architectural layers
  const groups = [
    {
      label: "Build",
      tag: "Layer 1",
      desc: "Author, orchestrate, ground in your data.",
      mods: ["Agent Studio", "Orchestration", "Knowledge Base", "Knowledge Graph"],
      color: "build",
    },
    {
      label: "Govern",
      tag: "Layer 2",
      desc: "Safety, fairness, audit, compliance.",
      mods: ["Hallucination Manager", "Responsible AI"],
      color: "govern",
    },
    {
      label: "Run",
      tag: "Layer 3",
      desc: "Operate at scale with observability and trust.",
      mods: ["Observability", "Audit Trail"],
      color: "run",
    },
  ];

  return (
    <section className="section modules-section">
      <div className="section-inner">
        <Reveal className="section-head">
          <span className="section-tag">Platform</span>
          <h2 className="section-h">Built for production, <span className="serif">not demos.</span></h2>
          <p className="section-sub">
            Eight modules across three layers — the plumbing that turns "we have a
            POC" into "agents are running our business."
          </p>
        </Reveal>

        <div className="mod-stack">
          {groups.map((g, gi) => (
            <Reveal key={g.label} className={`mod-group mod-${g.color}`} delay={gi * 100}>
              <div className="mod-group-head">
                <div className="mod-group-meta">
                  <span className="mod-group-tag">{g.tag}</span>
                  <h3 className="mod-group-label">{g.label}</h3>
                  <p className="mod-group-desc">{g.desc}</p>
                </div>
                <div className="mod-group-line" aria-hidden="true" />
              </div>
              <div className="mod-group-cards">
                {MODULES.filter((m) => g.mods.includes(m.name)).map((m, mi) => {
                  const Ico = ICONS[m.icon];
                  return (
                    <Link key={m.name} to={`/modules/${m.slug}`} className="mod-card-rich" style={{ transitionDelay: `${mi * 40}ms` }}>
                      <div className="mcr-icon"><Ico size={20} /></div>
                      <div className="mcr-content">
                        <h4>{m.name}</h4>
                        <p>{m.desc}</p>
                      </div>
                      <ArrowRight size={14} className="mcr-arrow" />
                    </Link>
                  );
                })}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mod-foot">
          <div className="mod-foot-cards">
            <div className="mof-card">
              <div className="mof-num tabular">100+</div>
              <div className="mof-lbl">enterprise integrations out of the box</div>
            </div>
            <div className="mof-card">
              <div className="mof-num">5</div>
              <div className="mof-lbl">model providers including India-native Sarvam</div>
            </div>
            <div className="mof-card">
              <div className="mof-num">3</div>
              <div className="mof-lbl">deployment modes: VPC · on-prem · sovereign</div>
            </div>
            <Link to="/platform" className="mof-cta">
              <span>Explore the full platform</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ============ HOW IT WORKS ============
function How() {
  const steps = [
    {
      n: "01", w: "Week 1", h: "Discover", p: "Workshop with our agent architects. Pick use cases. Define success metrics.",
      check: ["Use-case scoping", "Success metric definition", "Stakeholder alignment"],
    },
    {
      n: "02", w: "Week 2-3", h: "Design", p: "Production-grade agent architecture. Connected to your existing systems.",
      check: ["Agent architecture diagram", "Integration plan", "Guardrails & policies"],
    },
    {
      n: "03", w: "Week 4-6", h: "Deploy", p: "VPC, on-prem, or cloud. Your data stays where it should.",
      check: ["Deploy to your environment", "Connect to source systems", "Run shadow mode"],
    },
    {
      n: "04", w: "Week 7+", h: "Iterate", p: "Bi-weekly improvement releases. Observability, safety, performance.",
      check: ["Bi-weekly releases", "Monthly business review", "On-call SLAs"],
    },
  ];
  return (
    <section className="section how">
      <div className="section-inner">
        <Reveal className="section-head">
          <span className="section-tag">How we work</span>
          <h2 className="section-h">Production-ready agents — <span className="serif">in 4 to 8 weeks.</span></h2>
          <p className="section-sub">
            Not a SaaS-and-pray approach. Embedded agent architects from Webority
            own outcomes with you, from POC to scale.
          </p>
        </Reveal>

        <div className="how-timeline">
          <div className="how-rail" aria-hidden="true">
            <div className="how-rail-fill" />
          </div>
          {steps.map((s, idx) => (
            <Reveal key={s.n} className="how-tnode" delay={idx * 100}>
              <div className="how-tnode-marker">
                <div className="how-tnode-num">{s.n}</div>
                <div className="how-tnode-pulse" />
              </div>
              <div className="how-tnode-card">
                <div className="how-tnode-week">{s.w}</div>
                <h4>{s.h}</h4>
                <p>{s.p}</p>
                <ul className="how-tnode-check">
                  {s.check.map((c) => (
                    <li key={c}><CheckCircle2 size={12} /> {c}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="how-promise">
          <div className="how-promise-icon"><Sparkles size={20} /></div>
          <div className="how-promise-text">
            <strong>Our promise:</strong> First agent in production by week 8, or we
            keep working without an additional fee. Backed by Webority's CMMI Level 5 delivery.
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ============ COMPARISON ============
function Comparison() {
  // Columns: Ajuni · Lyzr · Kore.ai · Salesforce Agentforce · Glean
  const rows = [
    { f: "Sovereign deployment (VPC · on-prem · regional cloud)", a: true,  b: false,        c: "Partial",     d: false,        e: false },
    { f: "Pre-built agents for regulated industries",              a: true,  b: false,        c: false,         d: "CRM-bound",  e: false },
    { f: "Multilingual (11 Indian + 8 international)",             a: true,  b: "Limited",    c: "English-first",d: "English-first", e: "English-first" },
    { f: "Immutable hash-chained audit trail",                     a: true,  b: false,        c: false,         d: false,        e: false },
    { f: "CMMI L5 delivery + embedded architects",                 a: true,  b: false,        c: false,         d: false,        e: false },
    { f: "Multi-model (GPT · Claude · Gemini · Llama · Sarvam)",   a: true,  b: true,         c: "Limited",     d: "SF-partners", e: "Limited" },
    { f: "Native connectors: Tally · ABDM · GST · SAP",            a: true,  b: false,        c: false,         d: "SF-only",    e: false },
    { f: "ISO 27001 + SOC 2 + CERT-In compliance",                 a: true,  b: "Varies",     c: "Varies",      d: "SOC 2",      e: "SOC 2" },
    { f: "Public, usage-based pricing",                            a: true,  b: true,         c: false,         d: false,        e: false },
  ];
  const Cell = ({ v }) => {
    if (v === true) return <span className="cmp-yes"><CheckCircle2 size={16} /></span>;
    if (v === false) return <span className="cmp-no">—</span>;
    return <span className="cmp-text">{v}</span>;
  };
  return (
    <section className="section comparison">
      <div className="section-inner">
        <Reveal className="section-head">
          <span className="section-tag">Why Ajuni</span>
          <h2 className="section-h">Built for regulated enterprises, <span className="serif">not retro-fitted.</span></h2>
          <p className="section-sub">
            Compared to global platforms (Salesforce Agentforce, Glean) and
            India-origin peers (Lyzr, Kore.ai). Ajuni was built sovereign,
            multilingual, and audit-grade from day one — not retro-fitted.
          </p>
        </Reveal>
        <Reveal className="cmp-table-wrap">
          <table className="cmp-table">
            <thead>
              <tr>
                <th></th>
                <th><span className="cmp-head ours"><AjuniWordmark size={18} /></span></th>
                <th><span className="cmp-head">Lyzr</span></th>
                <th><span className="cmp-head">Kore.ai</span></th>
                <th><span className="cmp-head">Agentforce</span></th>
                <th><span className="cmp-head">Glean</span></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.f}>
                  <td className="cmp-feat">{r.f}</td>
                  <td className="cmp-c ours"><Cell v={r.a} /></td>
                  <td className="cmp-c"><Cell v={r.b} /></td>
                  <td className="cmp-c"><Cell v={r.c} /></td>
                  <td className="cmp-c"><Cell v={r.d} /></td>
                  <td className="cmp-c"><Cell v={r.e} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}

// ============ TESTIMONIAL CAROUSEL ============
function Carousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(id);
  }, [paused]);
  return (
    <section className="carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="carousel-inner">
        <div className="carousel-mark"><QuoteIcon size={32} /></div>
        <div className="carousel-stage">
          {TESTIMONIALS.map((q, idx) => (
            <div key={idx} className={`car-slide ${idx === i ? "active" : ""}`}>
              <q>{q.q}</q>
              <div className="car-author">
                <div className="ca-avatar" style={{ background: q.c }}>{q.a}</div>
                <div className="ca-text">
                  <div className="ca-name">{q.n}</div>
                  <div className="ca-role">{q.r}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="carousel-nav">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              className={`car-dot ${idx === i ? "active" : ""}`}
              onClick={() => setI(idx)}
              aria-label={`Quote ${idx + 1}`}
            />
          ))}
          <button className="car-pause" onClick={() => setPaused((p) => !p)} aria-label={paused ? "Play" : "Pause"}>
            {paused ? <Play size={12} /> : <Pause size={12} />}
          </button>
        </div>
      </div>
    </section>
  );
}

// ============ FAQ ============
function FAQ() {
  const faqs = [
    {
      q: "What's the difference between Ajuni and Lyzr or Kore.ai?",
      a: "Ajuni is built for regulated enterprises that need sovereign deployment first — born in India, deployed globally. Native support for 11 Indian and 8 international languages, and pre-built connectors for both Indian (Tally, GST, ABDM) and global (SAP, Salesforce, Workday) systems. Backed by Webority's CMMI Level 5 delivery and clients like Parliament of India, DRDO, and Johnson & Johnson — you get the platform plus embedded architects.",
    },
    {
      q: "How long until our first agent is in production?",
      a: "4 to 8 weeks for the first agent. Discovery (1 week) → Design (1–2 weeks) → Deploy (1–2 weeks) → Iterate (ongoing). After the first agent, additional ones typically take 2–3 weeks each because they share the platform infrastructure.",
    },
    {
      q: "Can we deploy on-premises?",
      a: "Yes. Ajuni runs on your VPC (AWS / Azure / GCP / OCI in any region — Mumbai, Singapore, Frankfurt, Virginia, Dubai, Sydney and more), on-prem in your data center, or in sovereign-cloud partners (Yotta, CtrlS for India; G-Cloud, GovCloud and equivalents elsewhere). Most regulated customers — banks, government, healthcare — pick VPC or on-prem.",
    },
    {
      q: "What models does Ajuni support?",
      a: "GPT-5, Claude Opus 4.7, Gemini 2.5, Llama 3, and India-native models like Sarvam. You can mix and match per agent. We never lock you into a single model provider.",
    },
    {
      q: "Is our data used to train Ajuni?",
      a: "Never. Your data stays in your environment. We don't train on customer data. Period. This is a contractual commitment, audited annually under our ISO 27001 certification.",
    },
    {
      q: "What if an agent gets something wrong?",
      a: "Every action is a draft until approved (in human-in-loop mode) or governed by guardrails (in autonomous mode). You can roll back, audit, and retrain. The hash-chained audit trail means every decision is traceable to the input, model, and approver.",
    },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq">
      <div className="section-inner faq-inner">
        <Reveal className="section-head">
          <span className="section-tag">FAQ</span>
          <h2 className="section-h">Questions, <span className="serif">answered.</span></h2>
        </Reveal>
        <div className="faq-list">
          {faqs.map((f, idx) => (
            <div key={f.q} className={`faq-item ${open === idx ? "open" : ""}`}>
              <button
                className="faq-q"
                onClick={() => setOpen((o) => (o === idx ? -1 : idx))}
                aria-expanded={open === idx}
              >
                <span>{f.q}</span>
                <span className="faq-icon">{open === idx ? <Minus size={18} /> : <Plus size={18} />}</span>
              </button>
              <div className="faq-a-wrap">
                <p className="faq-a">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ FINAL CTA ============
function FinalCTA() {
  const spotRef = useSpotlight();
  return (
    <section className="cta-final spotlight" ref={spotRef}>
      <div className="cta-orbs" aria-hidden="true">
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      <Reveal className="cta-inner">
        <div className="cta-eyebrow"><Sparkles size={14} /> 30-day pilot · No commitment</div>
        <h2>From POC to <span className="serif">production</span> <br />in a quarter, not a year.</h2>
        <p>Talk to an agent architect. Pick a use case. See what your business looks like with AI agents running it.</p>
        <div className="hero-ctas">
          <Link to="/contact" className="btn-on-dark">Book a demo <ArrowRight size={14} /></Link>
          <Link to="/platform" className="btn-outline-dark">Explore platform</Link>
        </div>
        <div className="cta-meta">
          <span><Check size={14} /> Production in 4–8 weeks</span>
          <span><Check size={14} /> Sovereign deployment</span>
          <span><Check size={14} /> CMMI L5 delivery</span>
        </div>
      </Reveal>
    </section>
  );
}

// ============ HOME ============
export default function Home() {
  return (
    <div className="page-enter">
      <Hero />
      <Marquee />
      <StatsBand />
      <SolutionsHome />
      <ModulesSection />
      <How />
      <Comparison />
      <Carousel />
      <FAQ />
      <FinalCTA />
    </div>
  );
}
