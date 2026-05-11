import { useEffect, useRef, useState } from "react";

// ============ BRAND MARK ============
// Loads the official mark from /public/ajuni-mark.svg (extracted from the
// designer-supplied wordmark). Falls back to inline geometric pieces only if
// the asset 404s — never to a different design.
export function AjuniMark({ size = 24, className = "", asset = "/ajuni-mark.svg" }) {
  const [useAsset, setUseAsset] = useState(true);
  if (useAsset && asset) {
    return (
      <img
        src={asset}
        alt=""
        aria-hidden="true"
        height={size}
        width={size}
        style={{
          height: size,
          width: size,
          display: "inline-block",
          objectFit: "contain",
        }}
        onError={() => setUseAsset(false)}
      />
    );
  }
  // Fallback (asset missing): show a styled placeholder square that won't
  // be confused with the real logo.
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        display: "inline-block",
        width: size,
        height: size,
        borderRadius: 6,
        background: "linear-gradient(135deg,#6637E6,#8E37F9)",
      }}
    />
  );
}

// Stable per-instance ID for SVG gradient defs (avoids collisions)
let _gradCounter = 0;
function useGradientId() {
  const ref = useRef(null);
  if (ref.current === null) {
    _gradCounter += 1;
    ref.current = _gradCounter;
  }
  return ref.current;
}

// Wordmark variant — uses the official SVG asset.
// Auto-selects light/dark file based on the active theme (via <html data-theme>),
// re-checking on theme changes. Pass `dark={true}` to force the dark variant
// regardless of theme (e.g. for use on always-dark surfaces like the footer
// or the mega-menu featured panel). Pass an explicit `asset` to override.
export function AjuniWordmark({ size = 32, dark, asset }) {
  // Track current theme so the right asset is loaded after a toggle.
  const [theme, setTheme] = useState(() => {
    if (typeof document === "undefined") return "light";
    return document.documentElement.getAttribute("data-theme") || "light";
  });
  useEffect(() => {
    if (typeof window === "undefined") return;
    const obs = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute("data-theme") || "light");
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  // Resolve the wordmark asset:
  //   1. Explicit `asset` prop wins.
  //   2. Explicit `dark` prop wins next.
  //   3. Otherwise follow the live theme.
  const useDarkAsset = dark !== undefined ? dark : theme === "dark";
  const finalAsset = asset || (useDarkAsset ? "/ajuni-wordmark-dark.svg" : "/ajuni-wordmark.svg");

  const [useAsset, setUseAsset] = useState(true);
  if (useAsset && finalAsset) {
    return (
      <img
        src={finalAsset}
        alt="Ajuni"
        height={size}
        style={{
          height: size,
          width: "auto",
          display: "inline-block",
        }}
        onError={() => setUseAsset(false)}
      />
    );
  }
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: size * 0.32 }}>
      <AjuniMark size={size} />
      <span
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: size * 1.1,
          fontWeight: 400,
          letterSpacing: "-0.02em",
          color: useDarkAsset ? "var(--text-on-dark)" : "var(--text)",
          lineHeight: 0.9,
        }}
      >
        ajuni
      </span>
    </span>
  );
}

// ============ HOOKS ============
export function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    // If already in viewport on mount, reveal immediately (no animation flicker on top-of-page content)
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(node);
    // Failsafe: force visible after 1.5s in case IO never fires
    // (slow JS, SEO crawlers, headless screenshot tools, prefers-reduced-data clients)
    const failsafe = setTimeout(() => {
      setVisible(true);
      io.disconnect();
    }, 1500);
    return () => {
      io.disconnect();
      clearTimeout(failsafe);
    };
  }, [threshold]);
  return { ref, visible };
}

export function Reveal({ children, as: As = "div", className = "", delay = 0, ...props }) {
  const { ref, visible } = useReveal();
  return (
    <As
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity .8s cubic-bezier(.22,1,.36,1) ${delay}ms, transform .9s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
      {...props}
    >
      {children}
    </As>
  );
}

export function useCounter(target, duration = 1800, decimals = 0) {
  const { ref, visible } = useReveal(0.4);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      setVal(target * ease(p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, target, duration]);
  const display = decimals
    ? val.toFixed(decimals)
    : Math.floor(val).toLocaleString("en-IN");
  return { ref, display };
}

// ============ SCROLL PROGRESS ============
export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setP(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="scroll-progress" style={{ width: `${p}%` }} />;
}

// ============ SCROLL TO TOP ON ROUTE CHANGE ============
import { useLocation } from "react-router-dom";
export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// ============ THEME (light / dark) ============
// The initial theme is set in index.html before React mounts (no FOUC).
// This hook syncs subsequent toggles to localStorage + the <html data-theme>.
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof document === "undefined") return "light";
    return document.documentElement.getAttribute("data-theme") || "light";
  });
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("ajuni-theme", theme);
    } catch (_) {}
  }, [theme]);
  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return { theme, setTheme, toggle };
}

// ============ MAGNETIC BUTTON ============
// Wrap any button/link to give it a subtle pull-toward-cursor effect.
// Disabled under prefers-reduced-motion or on coarse pointers (touch).
export function Magnetic({ children, strength = 0.25, className = "", ...props }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let rafId = 0;
    const onMove = (e) => {
      const r = node.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        node.style.transform = `translate(${dx}px, ${dy}px)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(rafId);
      node.style.transform = "translate(0, 0)";
    };
    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", onLeave);
    return () => {
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, [strength]);
  return (
    <span ref={ref} className={`magnetic ${className}`} {...props}>
      {children}
    </span>
  );
}

// ============ CURSOR SPOTLIGHT ============
// Tracks the mouse over the wrapped element and exposes
// `--mx` / `--my` (in %) so CSS can render a radial-gradient halo.
// Disabled under reduced motion + on coarse pointers.
export function useSpotlight() {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let rafId = 0;
    const onMove = (e) => {
      const r = node.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        node.style.setProperty("--mx", x + "%");
        node.style.setProperty("--my", y + "%");
      });
    };
    const onEnter = () => node.classList.add("spot-on");
    const onLeave = () => {
      node.classList.remove("spot-on");
      cancelAnimationFrame(rafId);
    };
    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseenter", onEnter);
    node.addEventListener("mouseleave", onLeave);
    return () => {
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseenter", onEnter);
      node.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);
  return ref;
}

// ============ PARALLAX ============
// Translate child Y by `factor * scrollY`. Negative factor = moves up (slower than scroll).
export function useParallax(factor = -0.15) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const r = node.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const offset = (center - window.innerHeight / 2) * factor;
        node.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [factor]);
  return ref;
}
