import { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Menu, X, ArrowRight, ChevronDown, Sun, Moon,
  Building2, Plus, Landmark, ShoppingBag, Factory, Cpu,
  TrendingUp, Megaphone, Users, Headphones, Calculator, Package,
  Workflow, Network, Database, Share2, ShieldAlert, Scale, Activity, Lock,
  BookOpen, Sparkles, Zap, FileText, Globe, Shield, MessageCircle,
} from "lucide-react";
import { AjuniWordmark, AjuniMark, useTheme } from "./Primitives";
import { INDUSTRIES, FUNCTIONS, MODULES, CUSTOMERS, CASE_STUDIES } from "../data/content";
import "./Nav.css";

const INDUSTRY_ICON = {
  bfsi: Building2,
  healthcare: Plus,
  government: Landmark,
  retail: ShoppingBag,
  manufacturing: Factory,
  "it-saas": Cpu,
};
const FUNCTION_ICON = {
  TrendingUp, Megaphone, Users, Headphones, Calculator, Package,
};
const MODULE_ICON = {
  Workflow, Network, Database, Share2, ShieldAlert, Scale, Activity, Lock,
};

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className={`tt-thumb ${isDark ? "dark" : "light"}`} aria-hidden="true">
        {isDark ? <Moon size={14} /> : <Sun size={14} />}
      </span>
    </button>
  );
}

// ============ MEGA · SOLUTIONS ============
function MegaSolutions({ onClose, open }) {
  const [tab, setTab] = useState("industry");
  const [hover, setHover] = useState(null);

  const items = tab === "industry" ? INDUSTRIES : FUNCTIONS;
  const active = hover ?? items[0];

  return (
    <div className={`mega mega-rich ${open ? "is-open" : ""}`} role="menu" aria-hidden={!open}>
      <div className="mega-tabs">
        <button className={`mtab ${tab === "industry" ? "active" : ""}`} onClick={() => { setTab("industry"); setHover(null); }}>
          <Globe size={13} /> By Industry
        </button>
        <button className={`mtab ${tab === "function" ? "active" : ""}`} onClick={() => { setTab("function"); setHover(null); }}>
          <Sparkles size={13} /> By Function
        </button>
        <Link to="/agents" className="mtab mtab-link" onClick={onClose}>
          All agents <ArrowRight size={12} />
        </Link>
      </div>

      <div className="mega-rich-grid">
        {/* Cards column */}
        <div className="mega-rich-cards">
          {items.map((it, i) => {
            const Ico = tab === "industry"
              ? (INDUSTRY_ICON[it.slug] || Building2)
              : (FUNCTION_ICON[it.icon] || TrendingUp);
            const href = tab === "industry" ? `/industries/${it.slug}` : `/functions/${it.slug}`;
            const isActive = active.slug === it.slug;
            return (
              <Link
                key={`${tab}-${it.slug}`}
                to={href}
                className={`mega-card ${isActive ? "is-active" : ""}`}
                onMouseEnter={() => setHover(it)}
                onClick={onClose}
              >
                <span className="mega-card-icon"><Ico size={16} /></span>
                <div className="mega-card-text">
                  <strong>{tab === "industry" ? it.short || it.name : it.name}</strong>
                  <span>{it.tagline}</span>
                </div>
                <ArrowRight size={13} className="mega-card-arrow" />
              </Link>
            );
          })}
        </div>

        {/* Live preview column — content updates inline (no re-mount) */}
        <div className="mega-preview">
          <div className="mp-chrome">
            <span className="mp-dot mp-r" />
            <span className="mp-dot mp-y" />
            <span className="mp-dot mp-g" />
            <div className="mp-url">
              <Lock size={9} />
              app.ajuni.ai/{tab === "industry" ? "industries" : "functions"}/{active.slug}
            </div>
            <span className="mp-live"><span className="mp-live-dot" /> LIVE</span>
          </div>
          <div className="mp-body">
            <div className="mp-eyebrow">{tab === "industry" ? "Industry" : "Function"}</div>
            <div className="mp-title">{active.name}</div>
            <p className="mp-desc">{active.desc}</p>
            <div className="mp-stat">
              <span className="mp-stat-num tabular">{(active.stat || active.metrics).n}</span>
              <span className="mp-stat-lbl">{(active.stat || active.metrics).l}</span>
            </div>
            <div className="mp-agents">
              <div className="mp-agents-lbl">Pre-built agents</div>
              <div className="mp-agents-list">
                {(active.useCases || active.agents || []).slice(0, 3).map((a, i) => (
                  <div key={i} className="mp-agent">
                    <span className="mp-agent-dot" />
                    <span>{(a + "").split(" (")[0].split(" — ")[0].slice(0, 64)}</span>
                  </div>
                ))}
              </div>
            </div>
            <Link
              to={tab === "industry" ? `/industries/${active.slug}` : `/functions/${active.slug}`}
              className="mp-cta"
              onClick={onClose}
            >
              Explore {active.name} <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      {/* Customer logo strip */}
      <div className="mega-trust">
        <span className="mega-trust-lbl">Trusted by</span>
        <div className="mega-trust-pills">
          {CUSTOMERS.slice(0, 8).map((c) => (
            <span key={c} className="mega-trust-pill">{c}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ MEGA · PLATFORM ============
function MegaPlatform({ onClose, open }) {
  const groups = [
    { label: "Build",  desc: "Author, orchestrate, ground.", mods: ["Agent Studio", "Orchestration", "Knowledge Base", "Knowledge Graph"] },
    { label: "Govern", desc: "Safety, fairness, audit.",     mods: ["Hallucination Manager", "Responsible AI"] },
    { label: "Run",    desc: "Operate at scale.",            mods: ["Observability", "Audit Trail"] },
  ];
  return (
    <div className={`mega mega-rich mega-platform ${open ? "is-open" : ""}`} role="menu" aria-hidden={!open}>
      <div className="mega-rich-grid mega-platform-grid">
        <div className="mega-platform-cols">
          {groups.map((g) => (
            <div key={g.label} className="mp-group">
              <div className="mp-group-head">
                <span className="mp-group-label">{g.label}</span>
                <span className="mp-group-desc">{g.desc}</span>
              </div>
              <div className="mp-group-list">
                {MODULES.filter((m) => g.mods.includes(m.name)).map((m) => {
                  const Ico = MODULE_ICON[m.icon] || Workflow;
                  return (
                    <Link key={m.name} to={`/modules/${m.slug}`} className="mp-mod" onClick={onClose}>
                      <span className="mp-mod-icon"><Ico size={15} /></span>
                      <div>
                        <strong>{m.name}</strong>
                        <span>{m.desc}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <aside className="mega-platform-feat">
          <div className="mpf-brand">
            <div className="mpf-mark">
              <AjuniMark size={48} />
            </div>
            <div className="mpf-brand-text">
              <span className="mpf-brand-name">ajuni</span>
              <span className="mpf-brand-sub">Platform</span>
            </div>
          </div>
          <div className="mpf-tag">Featured</div>
          <h5>The control plane.</h5>
          <p>Eight modules across three layers. The plumbing that turns "we have a POC" into "agents are running our business."</p>
          <Link to="/platform" className="btn-primary" onClick={onClose}>
            Explore platform <ArrowRight size={13} />
          </Link>
          <ul className="mpf-list">
            <li><Zap size={11} /> 100+ enterprise integrations</li>
            <li><Shield size={11} /> Sovereign deployment</li>
            <li><Lock size={11} /> Hash-chained audit trail</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}

// ============ MEGA · RESOURCES ============
function MegaResources({ onClose, open }) {
  const featured = CASE_STUDIES.find((c) => c.status === "testimonial") || CASE_STUDIES[0];
  return (
    <div className={`mega mega-rich mega-resources ${open ? "is-open" : ""}`} role="menu" aria-hidden={!open}>
      <div className="mega-rich-grid mega-resources-grid">
        <div className="mres-cols">
          <div>
            <div className="mres-h">Learn</div>
            <Link to="/case-studies" className="mres-item" onClick={onClose}>
              <FileText size={15} />
              <div><strong>Case studies</strong><span>Real customers, real workloads.</span></div>
            </Link>
            <Link to="/resources" className="mres-item" onClick={onClose}>
              <BookOpen size={15} />
              <div><strong>Resource library</strong><span>Whitepapers, guides, recordings.</span></div>
            </Link>
            <Link to="/integrations" className="mres-item" onClick={onClose}>
              <Network size={15} />
              <div><strong>Integrations</strong><span>100+ enterprise connectors.</span></div>
            </Link>
          </div>
          <div>
            <div className="mres-h">Trust</div>
            <Link to="/security" className="mres-item" onClick={onClose}>
              <Shield size={15} />
              <div><strong>Security & compliance</strong><span>ISO 27001 · SOC 2 · CERT-In.</span></div>
            </Link>
            <Link to="/about" className="mres-item" onClick={onClose}>
              <Users size={15} />
              <div><strong>About Ajuni</strong><span>Built by Webority Technologies.</span></div>
            </Link>
            <Link to="/contact" className="mres-item" onClick={onClose}>
              <MessageCircle size={15} />
              <div><strong>Talk to us</strong><span>Book a demo or pilot.</span></div>
            </Link>
          </div>
        </div>

        <aside className="mres-spotlight">
          <div className="mres-spot-tag">Customer spotlight</div>
          <h5>{featured.name}</h5>
          <div className="mres-spot-meta">{featured.industry} · {featured.region}</div>
          <p>Read how leading teams are putting Ajuni's agents into production across regulated industries.</p>
          <Link to={`/case-studies/${featured.slug}`} className="mres-spot-cta" onClick={onClose}>
            Read story <ArrowRight size={13} />
          </Link>
        </aside>
      </div>
    </div>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  // small grace period when leaving so the user can dart down to the panel
  const open = (key) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(key);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  const close = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMobileOpen(false);
    setOpenMenu(null);
  };

  return (
    <header
      className={`nav ${scrolled ? "scrolled" : ""} ${openMenu ? "menu-open" : ""}`}
      onMouseLeave={scheduleClose}
    >
      <div className="nav-inner">
        <Link to="/" className="brand" aria-label="Ajuni home" onClick={close}>
          <span className="brand-mark">
            <AjuniWordmark size={32} />
          </span>
          <span className="brand-name">
            <em>by Webority</em>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          <div
            className={`nav-trigger ${openMenu === "sol" ? "open" : ""}`}
            onMouseEnter={() => open("sol")}
          >
            <button className="nav-link-btn" aria-expanded={openMenu === "sol"}>
              Solutions <ChevronDown size={14} className="chev" />
            </button>
            <MegaSolutions onClose={close} open={openMenu === "sol"} />
          </div>

          <div
            className={`nav-trigger ${openMenu === "plat" ? "open" : ""}`}
            onMouseEnter={() => open("plat")}
          >
            <button className="nav-link-btn" aria-expanded={openMenu === "plat"}>
              Platform <ChevronDown size={14} className="chev" />
            </button>
            <MegaPlatform onClose={close} open={openMenu === "plat"} />
          </div>

          <div
            className={`nav-trigger ${openMenu === "res" ? "open" : ""}`}
            onMouseEnter={() => open("res")}
          >
            <button className="nav-link-btn" aria-expanded={openMenu === "res"}>
              Resources <ChevronDown size={14} className="chev" />
            </button>
            <MegaResources onClose={close} open={openMenu === "res"} />
          </div>

          <NavLink to="/pricing" className="nav-link" onMouseEnter={scheduleClose} onClick={close}>
            Pricing
          </NavLink>
        </nav>

        <div className="nav-cta">
          <ThemeToggle />
          <Link to="/login" className="btn-ghost">
            Sign in
          </Link>
          <Link to="/contact" className="btn-primary">
            Book a demo <ArrowRight size={14} />
          </Link>
          <button
            className="menu-toggle"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Backdrop dim while a mega is open */}
      <div className={`mega-scrim ${openMenu ? "active" : ""}`} onMouseEnter={scheduleClose} aria-hidden="true" />

      {/* Mobile drawer */}
      {mobileOpen && <MobileDrawer onClose={close} />}
    </header>
  );
}

function MobileDrawer({ onClose }) {
  const [section, setSection] = useState(null);
  return (
    <div className="mobile-drawer">
      <div className="md-section">
        <button className="md-row" onClick={() => setSection(section === "ind" ? null : "ind")}>
          Industries <ChevronDown size={16} />
        </button>
        {section === "ind" &&
          INDUSTRIES.map((i) => (
            <NavLink key={i.slug} to={`/industries/${i.slug}`} className="md-sub" onClick={onClose}>
              {i.name}
            </NavLink>
          ))}
      </div>
      <div className="md-section">
        <button className="md-row" onClick={() => setSection(section === "fn" ? null : "fn")}>
          Functions <ChevronDown size={16} />
        </button>
        {section === "fn" &&
          FUNCTIONS.map((f) => (
            <NavLink key={f.slug} to={`/functions/${f.slug}`} className="md-sub" onClick={onClose}>
              {f.name}
            </NavLink>
          ))}
      </div>
      <div className="md-section">
        <button className="md-row" onClick={() => setSection(section === "mod" ? null : "mod")}>
          Modules <ChevronDown size={16} />
        </button>
        {section === "mod" &&
          MODULES.map((m) => (
            <NavLink key={m.slug} to={`/modules/${m.slug}`} className="md-sub" onClick={onClose}>
              {m.name}
            </NavLink>
          ))}
      </div>
      <NavLink to="/platform" className="md-row" onClick={onClose}>Platform</NavLink>
      <NavLink to="/agents" className="md-row" onClick={onClose}>Agents</NavLink>
      <NavLink to="/case-studies" className="md-row" onClick={onClose}>Case studies</NavLink>
      <NavLink to="/customers" className="md-row" onClick={onClose}>Customers</NavLink>
      <NavLink to="/pricing" className="md-row" onClick={onClose}>Pricing</NavLink>
      <NavLink to="/security" className="md-row" onClick={onClose}>Security</NavLink>
      <NavLink to="/about" className="md-row" onClick={onClose}>About</NavLink>
      <NavLink to="/contact" className="md-row md-cta" onClick={onClose}>
        Book a demo <ArrowRight size={16} />
      </NavLink>
    </div>
  );
}
