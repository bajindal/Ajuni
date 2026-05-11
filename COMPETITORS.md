# Ajuni — Competitive Landscape

A reference document for sales, marketing, and strategy. Updated as the
landscape moves. Pair this with `DESIGN.md` (site architecture) when
positioning new pages, comparison tables, or sales decks.

> **One-line positioning:** Ajuni is the **sovereign-by-default agentic AI
> platform for regulated enterprises** — born in India, deployed globally.

---

## 1. Direct competitors (India-origin, similar positioning)

These are the names buyers most often shortlist alongside Ajuni.

| Vendor | Pitch | Their strength | Where Ajuni wins |
|---|---|---|---|
| **Lyzr** | Enterprise agent builder, low-code, OSS-friendly | Broad agent templates, growing OSS adoption, fast PLG motion | Lighter on regulated-industry depth (BFSI/Healthcare/Government) and CMMI L5 delivery |
| **Kore.ai** | Conversational + agent platform, enterprise contact-center heritage | 350+ integrations, mature CX workflows, US presence | English-first; weak on Indian compliance (Tally, ABDM, GST, RBI reporting); less sovereign |
| **Yellow.ai** | Customer-experience automation | Strong CX/contact center, multilingual support | Narrow scope (CX-only) — not a general agent platform |
| **Haptik** (Reliance Jio) | Conversational AI for retail/BFSI | Reliance ecosystem distribution | Mostly chatbots, not autonomous agents |
| **Senseforth, Verloop, Avaamo** | Conversational AI | Some enterprise traction | Chatbot-era — none position as "agentic AI control plane" |

## 2. Global enterprise AI agent platforms

These are the names that come up in cross-border RFPs.

| Vendor | Backed by / scale | Where they win | Where Ajuni wins |
|---|---|---|---|
| **Salesforce Agentforce** | Salesforce, default for any SF customer | Massive AppExchange, baked into existing CRM data model, dev community | No sovereign deployment, locked into SF data model, weak on Indian compliance |
| **Microsoft Copilot Studio + Azure AI Foundry** | Microsoft Azure, M365 | Azure-customer default, M365/Office automation | Vendor lock-in, weak in non-MSFT-heavy enterprises, no on-prem flexibility |
| **Glean** | $4.6B valuation, well-funded | Enterprise search + workflow agents, 250+ connectors | SaaS-only, no on-prem, US/EU-centric pricing, no Indian compliance |
| **Writer** | $200M+ raised | Marketing/HR enterprise agents, strong content workflow | English-only, SaaS-only |
| **Sierra** | Bret Taylor's startup, ~$4.5B valuation | Best-in-class customer-support agents, high-quality voice/chat | Single-purpose (CX), no Indian languages, no sovereign deployment |
| **Cresta** | Series funding, contact-center focus | Strong real-time agent assist + coaching | Narrow scope (contact center) |
| **Moveworks** (acquired by ServiceNow) | $2.1B exit | IT/HR service desk virtual agents | Now under ServiceNow umbrella, less agile |
| **Aisera** | $1B+ valuation | IT/HR service automation | English-first, SaaS-only |
| **Decagon** | $65M Series B | Customer support agents | Narrow scope, SaaS-only |
| **Lindy, MultiOn, Adept** | Various | Workflow / browser agents | Consumer-flavored, no enterprise audit trail |

## 3. Hyperscaler agent runtimes (often **coexist**, not direct rivals)

These are infrastructure Ajuni can deploy on top of — not procurement competitors for the same budget line.

- **AWS Bedrock Agents** — runtime + tools
- **Azure AI Foundry** — runtime + Microsoft ecosystem
- **Google Vertex AI Agent Builder** — runtime + Google Cloud
- **OpenAI Assistants / Operators** — model-bound runtime
- **Anthropic Claude (Computer Use)** — model-bound

**Position vs hyperscalers:** Ajuni is multi-model and multi-cloud. Customers stay sovereign across all of them.

## 4. Open-source frameworks (often used inside competitors)

- **LangChain / LangGraph** — most-used dev framework
- **CrewAI** — multi-agent orchestration
- **AutoGen** (Microsoft) — agent collaboration framework
- **Haystack** — RAG + agents
- **Semantic Kernel** (Microsoft) — .NET-flavored

**Strategic note:** open-sourcing one Ajuni component (orchestration runtime, audit-trail spec, multilingual evaluator) would win developer mindshare quickly.

---

## 5. Where Ajuni wins (defensible moats)

1. **Sovereign-by-default deployment**
   No other major player defaults to VPC / on-prem / sovereign cloud. Salesforce, Glean, Sierra are all SaaS-only. Microsoft and AWS hyperscaler agents require their cloud.
2. **Indian compliance depth**
   Tally, GST, ABDM, RBI reporting, CERT-In, DPDP Act — all native. Closest competitors (Lyzr, Kore) are lighter; global players have nothing.
3. **11+ Indian languages**
   Plus 8+ international. Lyzr/Kore weaker. Global players: English-only or limited multilingual.
4. **Embedded architect model + CMMI Level 5 delivery**
   Webority's delivery muscle is rare in pure SaaS. Closest analog is Palantir's Forward Deployed Engineer model.
5. **Government / PSU credibility**
   Parliament of India, DRDO, Spices Board, BEE. Hard to fake. Salesforce has US Government Cloud; nobody else has Indian-government depth.
6. **Hash-chained immutable audit trail**
   Sierra/Decagon log actions, but few are tamper-evident at the cryptographic level. Ajuni's audit log is regulator-ready.
7. **Multi-model neutrality**
   Customers can mix GPT-5, Claude, Gemini, Llama, Sarvam per-agent. Salesforce/Microsoft push their own model partners; Ajuni stays neutral.

## 6. Where Ajuni currently loses

1. **Brand recognition**
   Outside India, awareness is near-zero. Salesforce ships Agentforce in every Dreamforce keynote. Sierra has Bret Taylor's name attached.
2. **Marketplace / ecosystem**
   No third-party agent ecosystem yet. Salesforce AppExchange has thousands of partners.
3. **Developer mindshare**
   Lyzr has stronger OSS presence; LangChain has the dev community; CrewAI has the multi-agent buzz.
4. **Pre-built connector count**
   Salesforce/Glean both claim 250–500+; Ajuni claims 100+.
5. **Scale stories**
   Salesforce can name Fortune 500 references. Sierra has SoFi, Sonos, Casper. Ajuni's case-study library is shorter and India-heavy.
6. **Pricing transparency at the low end**
   Lyzr has very low entry pricing. Salesforce/Sierra negotiate. Ajuni's published pricing is mid-market-friendly but contracts vary.

---

## 7. Strategic recommendations

1. **Own the "sovereign AI for regulated, emerging markets" wedge.**
   This is a real, defensible category. Salesforce can't easily do on-prem in India. Sierra can't either. Make it the headline category Ajuni invented and dominates.

2. **Win one marquee international logo this fiscal.**
   A US regional bank, an EU pharma, or a MENA government. Validates the "deployed globally" positioning. Currently most named customers are Indian.

3. **Open-source one meaningful component.**
   Orchestration runtime, audit-trail format, or the multilingual evaluator. Wins developer mindshare for free and signals seriousness.

4. **Publish a head-to-head benchmark.**
   "Ajuni vs Lyzr vs Kore vs Salesforce on a 100-claim healthcare RCM workload." Real numbers, public methodology. Generates inbound and PR.

5. **Build a partner / SI ecosystem.**
   Webority is one delivery partner. Recruit 5–10 SI partners (TCS, Infosys, Wipro adjacent — or boutiques) so deals scale beyond what Webority can deliver in a quarter.

6. **Add an integration directory with real logos.**
   Your `/integrations` route exists but lacks visual proof for the "100+" claim. SAP, Salesforce, Tally, Workday, Oracle, AWS, Azure, GCP, Slack, Teams, ServiceNow logos in a filterable grid.

7. **Vertical landing pages (Sierra/Cresta-style).**
   Industry pages exist (`/industries/bfsi`, etc.) but should be deepened with: customer-quote cards specific to that industry, an interactive ROI for that vertical, an architecture diagram per use case, and a "schedule a workshop" CTA. Helps buyers self-select faster.

8. **Comparison page.**
   A standalone `/compare` page (or `/compare/lyzr`, `/compare/kore`, `/compare/agentforce`) with detailed feature-by-feature breakdowns. Captures bottom-funnel search ("Ajuni vs Lyzr") and ranks well for SEO.

---

## 8. Win/loss talking points (one-liners for sales)

When the prospect mentions...

- **"We're already on Salesforce."** — "Agentforce is great if you live inside Salesforce data. The moment you need to operate across SAP, Tally, ABDM, or any non-SF system — and you need on-prem — Ajuni is built for that."
- **"Lyzr is cheaper to start."** — "Lyzr is great for pilots. When you scale to regulated workloads, you'll need an audit trail, embedded architects, and Indian compliance. Lyzr will take you 6 months. Ajuni gets you there in 4–8 weeks."
- **"Kore.ai has more integrations."** — "Kore is contact-center DNA. Agent count and integration count don't help if your bank's RBI auditor needs a hash-chained audit log. We built that on day one."
- **"Glean is the search standard."** — "Glean is excellent for English-first SaaS-stack enterprises in the US. For Hindi-speaking customers and on-prem deployment in a sovereign region, Ajuni is the move."
- **"We'll just use AWS Bedrock + LangChain."** — "Build vs buy. Bedrock is the runtime; you still need orchestration, governance, audit, observability, multilingual support, and Indian connectors. That's 12+ engineer-months. Ajuni ships it in week one."

---

## 9. Watch list (early-stage, may matter in 12-24 months)

- **Sema4.ai** (Robocorp rebranded) — process automation agents
- **Imbue** — research-heavy, agentic OS direction
- **Adept** — browser automation agents
- **Sakana AI** — Japan-based, novel agent architectures
- **Cohere** — enterprise multilingual focus, possible direct overlap
- **MindsDB** — data-aware agents, emerging in India
- **Articul8** (Intel spinoff) — sovereign GenAI for regulated industries — **closest US analog to Ajuni's positioning**

The one to watch closely: **Articul8** — same "sovereign GenAI for regulated industries" pitch, US-flavored, well-capitalized. If they push into APAC, they're Ajuni's most direct global competitor.
