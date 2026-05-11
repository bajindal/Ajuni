import { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, X, ArrowUp } from "lucide-react";
import { AjuniMark } from "./Primitives";
import "./Widgets.css";

// ============ COOKIE BANNER ============
export function CookieBanner() {
  const [hidden, setHidden] = useState(false);
  return (
    <div
      className={`cookie ${hidden ? "hidden" : ""}`}
      role="dialog"
      aria-label="Cookie preferences"
    >
      <p>
        We use a small set of cookies to keep Ajuni working and to understand
        what's useful. Choose what you're comfortable with.
      </p>
      <div className="cookie-btns">
        <button
          className="btn-primary"
          style={{ padding: "8px 14px", fontSize: 13 }}
          onClick={() => setHidden(true)}
        >
          Accept all
        </button>
        <button
          className="btn-ghost"
          style={{ padding: "8px 12px", fontSize: 13 }}
          onClick={() => setHidden(true)}
        >
          Only essential
        </button>
        <a href="#" className="btn-link">
          Manage
        </a>
      </div>
    </div>
  );
}

// ============ CHAT WIDGET ============
function botReply(q) {
  const t = q.toLowerCase();
  if (t.includes("price") || t.includes("cost") || t.includes("plan"))
    return "Starter is ₹49k/mo, Business is ₹1.99L/mo, Enterprise is custom. All include a 30-day pilot. Want me to route you to sales?";
  if (t.includes("on-prem") || t.includes("vpc") || t.includes("sovereign"))
    return "Yes — Ajuni deploys on your VPC, on-prem, or in sovereign Indian cloud (Yotta). Most regulated customers pick VPC.";
  if (t.includes("integration") || t.includes("connect"))
    return "100+ pre-built connectors: SAP, Salesforce, Tally, GST Portal, ABDM, AWS/Azure/GCP, and more. APIs and SDKs for the rest.";
  if (t.includes("demo"))
    return "Sure — share a working email and a solutions architect will reach out within 4 working hours. Or click 'Book a demo' at the top.";
  if (t.includes("hi") || t.includes("hello") || t.includes("namaste"))
    return "Namaste! Ask me anything about agents, deployment, integrations, or pricing.";
  return "Good question. I can help with agents, platform, integrations, deployment, security, and pricing. For anything more specific I'll route you to a human — share a working email?";
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState([
    {
      who: "bot",
      text: "Namaste 👋 I'm an Ajuni helper bot. Agents, platform, deployment, pricing — ask away. For demos, I'll route you to a human.",
    },
  ]);
  const bodyRef = useRef(null);
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [msgs]);

  function send(text) {
    const t = (text || input).trim();
    if (!t) return;
    setMsgs((m) => [...m, { who: "user", text: t }]);
    setInput("");
    setTimeout(() => setMsgs((m) => [...m, { who: "bot", text: botReply(t) }]), 420);
  }

  const quick = [
    "Tell me about pricing",
    "Can you deploy on-prem?",
    "What integrations are supported?",
    "I'd like a demo",
  ];
  const quickLabel = ["Pricing", "On-prem", "Integrations", "Book a demo"];

  return (
    <>
      <button
        className="chat-launcher"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        <MessageCircle size={24} />
      </button>
      <div
        className={`chat-panel ${open ? "open" : ""}`}
        role="dialog"
        aria-label="Chat with Ajuni"
      >
        <div className="chat-head">
          <div className="ch-mark"><AjuniMark size={22} /></div>
          <div>
            <h5>Ajuni helper</h5>
            <div className="ch-status">Online</div>
          </div>
          <button
            className="ch-close"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
          >
            <X size={14} />
          </button>
        </div>
        <div className="chat-body" ref={bodyRef}>
          {msgs.map((m, i) => (
            <div key={i} className={`chat-msg ${m.who}`}>
              {m.text}
            </div>
          ))}
        </div>
        <div className="chat-quick">
          {quick.map((q, i) => (
            <button key={q} onClick={() => send(q)}>
              {quickLabel[i]}
            </button>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") send();
            }}
            placeholder="Ask anything…"
            aria-label="Type your question"
          />
          <button onClick={() => send()}>
            <Send size={16} />
          </button>
        </div>
      </div>
    </>
  );
}

// ============ SCROLL TO TOP BUTTON ============
export function ScrollTopBtn() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 1200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      className={`scroll-top ${visible ? "visible" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
    >
      <ArrowUp size={16} />
    </button>
  );
}
