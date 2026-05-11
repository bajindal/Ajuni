import { Link } from "react-router-dom";
import { ArrowRight, Home } from "lucide-react";
import { AjuniMark } from "../components/Primitives";
import "./Inner.css";

export default function NotFound() {
  return (
    <div className="page-enter">
      <section className="inner-hero" style={{ minHeight: "70vh", display: "grid", placeItems: "center" }}>
        <div className="inner-hero-grid" aria-hidden="true" />
        <div className="hero-orbs" aria-hidden="true">
          <div className="orb orb-1" />
          <div className="orb orb-3" />
        </div>
        <div className="inner-hero-inner">
          <div style={{ marginBottom: 32, color: "var(--accent-on-dark)" }}>
            <AjuniMark size={56} />
          </div>
          <h1 style={{ fontSize: "clamp(60px, 10vw, 120px)", marginBottom: 8 }}>
            <span className="serif">404</span>
          </h1>
          <p className="lede">
            That route doesn't exist. Maybe you meant one of these?
          </p>
          <div className="inner-hero-ctas">
            <Link to="/" className="btn-on-dark"><Home size={14} /> Back home</Link>
            <Link to="/platform" className="btn-outline-dark">Explore platform <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
