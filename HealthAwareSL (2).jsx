import { useState, useEffect } from "react";

const HEALTH_DATA = {
  articles: [
    {
      id: 1,
      title: "Malaria Prevention in Sierra Leone",
      category: "Prevention",
      sdg: "SDG 3",
      summary: "Malaria remains one of the leading causes of death in Sierra Leone. Using insecticide-treated bed nets, removing stagnant water, and seeking treatment early are key prevention strategies.",
      tips: ["Sleep under treated mosquito nets", "Remove stagnant water around your home", "Wear long sleeves at dusk and dawn", "Visit a clinic immediately if you feel feverish"],
      author: "Ministry of Health, SL",
      date: "2026-03-01",
    },
    {
      id: 2,
      title: "Maternal & Child Health",
      category: "Maternal Health",
      sdg: "SDG 3",
      summary: "Sierra Leone has one of the highest maternal mortality rates globally. Antenatal care visits, skilled birth attendants, and postnatal support are critical to saving lives.",
      tips: ["Attend all 8 antenatal care visits", "Deliver in a health facility", "Breastfeed exclusively for 6 months", "Immunize your child on schedule"],
      author: "UNICEF Sierra Leone",
      date: "2026-03-10",
    },
    {
      id: 3,
      title: "Clean Water & Sanitation",
      category: "Hygiene",
      sdg: "SDG 6",
      summary: "Waterborne diseases like cholera and typhoid are preventable. Access to clean water and proper sanitation saves thousands of lives each year.",
      tips: ["Boil or treat drinking water", "Wash hands with soap before eating", "Use latrines properly", "Keep food covered and stored safely"],
      author: "WHO Sierra Leone",
      date: "2026-03-15",
    },
    {
      id: 4,
      title: "Mental Health Awareness",
      category: "Mental Health",
      sdg: "SDG 3",
      summary: "Mental health is often overlooked in Sierra Leone. Post-conflict trauma, poverty, and stigma create barriers to care. Awareness and community support can make a real difference.",
      tips: ["Talk to someone you trust", "Seek help from a health worker", "Avoid self-medicating with alcohol", "Support community members who are struggling"],
      author: "Mental Health Coalition SL",
      date: "2026-04-01",
    },
    {
      id: 5,
      title: "HIV/AIDS Prevention",
      category: "Prevention",
      sdg: "SDG 3",
      summary: "HIV/AIDS continues to affect thousands of Sierra Leoneans. Testing, treatment, and education are essential to halting its spread.",
      tips: ["Get tested regularly", "Use protection consistently", "Know your partner's status", "Seek antiretroviral therapy if positive"],
      author: "NAS Sierra Leone",
      date: "2026-04-05",
    },
    {
      id: 6,
      title: "Childhood Nutrition",
      category: "Nutrition",
      sdg: "SDG 2",
      summary: "Malnutrition affects nearly one-third of children under five in Sierra Leone. A balanced diet rich in local vegetables, proteins, and fruits supports healthy development.",
      tips: ["Feed children diverse, locally available foods", "Include iron-rich foods like beans and fish", "Monitor your child's growth at clinics", "Supplement with Vitamin A where available"],
      author: "WFP Sierra Leone",
      date: "2026-04-10",
    },
  ],
  alerts: [
    { id: 1, type: "outbreak", title: "Cholera Alert – Western Area", message: "Cases of cholera have been reported in parts of Freetown. Boil all drinking water and avoid open defecation.", date: "2026-06-08", severity: "high" },
    { id: 2, type: "campaign", title: "Free Malaria Testing – Bo District", message: "Free malaria rapid tests are available at Bo Government Hospital this week. No appointment needed.", date: "2026-06-07", severity: "info" },
    { id: 3, type: "reminder", title: "National Immunisation Week", message: "Bring your children aged 0–5 to any health centre for free vaccinations from June 12–18.", date: "2026-06-05", severity: "medium" },
  ],
  categories: ["All", "Prevention", "Maternal Health", "Hygiene", "Mental Health", "Nutrition"],
};

const COLORS = {
  green: "#1a6b3c",
  greenLight: "#2d8f54",
  greenPale: "#e8f5ee",
  gold: "#c8922a",
  goldPale: "#fdf3e1",
  blue: "#1a4f7a",
  bluePale: "#e8f0f8",
  red: "#c0392b",
  redPale: "#fdecea",
  white: "#ffffff",
  offWhite: "#f7f9f7",
  text: "#1a2e1f",
  textMuted: "#5a7060",
  border: "#d0e4d8",
};

const severityStyle = (severity) => {
  if (severity === "high") return { bg: COLORS.redPale, border: COLORS.red, icon: "🚨", label: "High Alert" };
  if (severity === "medium") return { bg: COLORS.goldPale, border: COLORS.gold, icon: "📢", label: "Notice" };
  return { bg: COLORS.bluePale, border: COLORS.blue, icon: "ℹ️", label: "Info" };
};

export default function App() {
  const [tab, setTab] = useState("home");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [submittedSymptom, setSubmittedSymptom] = useState(false);
  const [symptomInput, setSymptomInput] = useState("");
  const [symptomLocation, setSymptomLocation] = useState("");
  const [alertSubscribed, setAlertSubscribed] = useState(false);
  const [alertEmail, setAlertEmail] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiQuery, setAiQuery] = useState("");

  const filtered = HEALTH_DATA.articles.filter((a) => {
    const matchCat = category === "All" || a.category === category;
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.summary.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  async function askHealthAI(question) {
    if (!question.trim()) return;
    setAiLoading(true);
    setAiAnswer("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: "You are a public health assistant for Sierra Leone. You give clear, accurate, plain-English answers about health topics relevant to Sierra Leone and West Africa. Focus on prevention, when to seek care, and local context. Always end by recommending users consult a qualified health worker for personal medical advice. Keep answers under 200 words.",
          messages: [{ role: "user", content: question }],
        }),
      });
      const data = await res.json();
      const text = data.content?.map((b) => b.text || "").join("\n") || "No response received.";
      setAiAnswer(text);
    } catch (e) {
      setAiAnswer("Sorry, the health assistant is temporarily unavailable. Please visit your nearest health centre.");
    }
    setAiLoading(false);
  }

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: COLORS.offWhite, minHeight: "100vh", color: COLORS.text }}>
      {/* Header */}
      <header style={{ background: COLORS.green, color: "#fff", padding: "0 24px", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 32 }}>🩺</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: 20, letterSpacing: "-0.3px" }}>HealthAware SL</div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>Digital Health for Sierra Leone</div>
            </div>
          </div>
          <div style={{ fontSize: 11, background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "4px 12px" }}>
            MIT Licensed · Open Source
          </div>
        </div>
        {/* Nav */}
        <nav style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 4, paddingBottom: 0 }}>
          {[
            { id: "home", label: "🏠 Home" },
            { id: "articles", label: "📚 Health Info" },
            { id: "alerts", label: "🔔 Alerts" },
            { id: "report", label: "📝 Report" },
            { id: "ask", label: "🤖 Ask AI" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setSelectedArticle(null); }}
              style={{
                background: tab === t.id ? "#fff" : "transparent",
                color: tab === t.id ? COLORS.green : "rgba(255,255,255,0.85)",
                border: "none",
                borderRadius: "8px 8px 0 0",
                padding: "10px 16px",
                fontWeight: tab === t.id ? 700 : 500,
                fontSize: 13,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "28px 16px" }}>

        {/* HOME */}
        {tab === "home" && (
          <div>
            <div style={{ background: `linear-gradient(135deg, ${COLORS.green} 0%, ${COLORS.greenLight} 100%)`, borderRadius: 16, color: "#fff", padding: "32px 28px", marginBottom: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: 1, opacity: 0.8, marginBottom: 8, textTransform: "uppercase" }}>Digital Public Good · SDG 3</div>
              <h1 style={{ margin: "0 0 12px", fontSize: 28, fontWeight: 800, lineHeight: 1.2 }}>Health information that reaches everyone in Sierra Leone</h1>
              <p style={{ margin: "0 0 20px", opacity: 0.9, fontSize: 15, lineHeight: 1.6 }}>
                Browse health guides, receive outbreak alerts, report symptoms in your community, and ask our AI health assistant — all in one open-source platform.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button onClick={() => setTab("articles")} style={{ background: "#fff", color: COLORS.green, border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Browse Health Articles</button>
                <button onClick={() => setTab("alerts")} style={{ background: "rgba(255,255,255,0.2)", color: "#fff", border: "2px solid rgba(255,255,255,0.5)", borderRadius: 8, padding: "10px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>View Active Alerts</button>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }}>
              {[
                { label: "Health Articles", value: "6", icon: "📄", color: COLORS.green },
                { label: "Active Alerts", value: "3", icon: "🔔", color: COLORS.gold },
                { label: "SDGs Covered", value: "3", icon: "🌍", color: COLORS.blue },
              ].map((s) => (
                <div key={s.label} style={{ background: "#fff", borderRadius: 12, padding: "20px 16px", textAlign: "center", border: `1px solid ${COLORS.border}` }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: COLORS.textMuted, fontWeight: 600 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Latest alert */}
            <div style={{ background: COLORS.redPale, border: `1px solid ${COLORS.red}`, borderRadius: 12, padding: "16px 20px", marginBottom: 24, display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ fontSize: 22 }}>🚨</span>
              <div>
                <div style={{ fontWeight: 700, color: COLORS.red, fontSize: 14 }}>Latest Alert: {HEALTH_DATA.alerts[0].title}</div>
                <div style={{ fontSize: 13, color: COLORS.text, marginTop: 4 }}>{HEALTH_DATA.alerts[0].message}</div>
                <button onClick={() => setTab("alerts")} style={{ marginTop: 8, background: "none", color: COLORS.red, border: "none", fontWeight: 700, fontSize: 13, cursor: "pointer", padding: 0, textDecoration: "underline" }}>See all alerts →</button>
              </div>
            </div>

            {/* Legal notice */}
            <div style={{ background: COLORS.bluePale, borderRadius: 12, padding: "16px 20px", fontSize: 13, lineHeight: 1.7, color: COLORS.blue, border: `1px solid ${COLORS.border}` }}>
              <strong>⚖️ Legal & Licensing Notice:</strong> HealthAware SL is licensed under the <strong>MIT License</strong>, making it freely available, reusable, and modifiable. User data is handled in compliance with Sierra Leone's data protection principles. No personally identifiable information is stored without consent. This tool is a Digital Public Good aligned with the DPG Standard and UNICEF's open-source principles.
            </div>
          </div>
        )}

        {/* ARTICLES */}
        {tab === "articles" && !selectedArticle && (
          <div>
            <h2 style={{ margin: "0 0 20px", fontSize: 22, fontWeight: 800 }}>Health Information Library</h2>
            <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search health topics..."
                style={{ flex: 1, minWidth: 180, padding: "10px 14px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 14, outline: "none" }}
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ padding: "10px 14px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 14, background: "#fff", cursor: "pointer" }}
              >
                {HEALTH_DATA.categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ display: "grid", gap: 14 }}>
              {filtered.map((a) => (
                <div
                  key={a.id}
                  onClick={() => setSelectedArticle(a)}
                  style={{ background: "#fff", borderRadius: 12, padding: "20px", border: `1px solid ${COLORS.border}`, cursor: "pointer", transition: "box-shadow 0.15s" }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)"}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, gap: 12 }}>
                    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, lineHeight: 1.3 }}>{a.title}</h3>
                    <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                      <span style={{ background: COLORS.greenPale, color: COLORS.green, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>{a.sdg}</span>
                      <span style={{ background: COLORS.goldPale, color: COLORS.gold, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>{a.category}</span>
                    </div>
                  </div>
                  <p style={{ margin: "0 0 8px", fontSize: 13, color: COLORS.textMuted, lineHeight: 1.6 }}>{a.summary}</p>
                  <div style={{ fontSize: 12, color: COLORS.textMuted }}>By {a.author} · {a.date}</div>
                </div>
              ))}
              {filtered.length === 0 && <div style={{ textAlign: "center", color: COLORS.textMuted, padding: 40 }}>No articles match your search.</div>}
            </div>
          </div>
        )}

        {/* ARTICLE DETAIL */}
        {tab === "articles" && selectedArticle && (
          <div>
            <button onClick={() => setSelectedArticle(null)} style={{ background: "none", border: "none", color: COLORS.green, fontWeight: 700, fontSize: 14, cursor: "pointer", padding: 0, marginBottom: 20 }}>← Back to Articles</button>
            <div style={{ background: "#fff", borderRadius: 16, padding: "28px", border: `1px solid ${COLORS.border}` }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                <span style={{ background: COLORS.greenPale, color: COLORS.green, borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 700 }}>{selectedArticle.sdg}</span>
                <span style={{ background: COLORS.goldPale, color: COLORS.gold, borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 700 }}>{selectedArticle.category}</span>
              </div>
              <h2 style={{ margin: "0 0 12px", fontSize: 24, fontWeight: 800 }}>{selectedArticle.title}</h2>
              <p style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 20 }}>By {selectedArticle.author} · Published {selectedArticle.date}</p>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: COLORS.text, marginBottom: 24 }}>{selectedArticle.summary}</p>
              <div style={{ background: COLORS.greenPale, borderRadius: 12, padding: "20px" }}>
                <div style={{ fontWeight: 800, fontSize: 15, color: COLORS.green, marginBottom: 12 }}>✅ Key Prevention Tips</div>
                {selectedArticle.tips.map((tip, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                    <span style={{ color: COLORS.green, fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                    <span style={{ fontSize: 14, lineHeight: 1.6 }}>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ALERTS */}
        {tab === "alerts" && (
          <div>
            <h2 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 800 }}>Health Alerts & Notifications</h2>
            <p style={{ color: COLORS.textMuted, fontSize: 14, marginBottom: 20 }}>Real-time health alerts for Sierra Leone communities.</p>

            <div style={{ display: "grid", gap: 14, marginBottom: 28 }}>
              {HEALTH_DATA.alerts.map((alert) => {
                const style = severityStyle(alert.severity);
                return (
                  <div key={alert.id} style={{ background: style.bg, border: `1px solid ${style.border}`, borderRadius: 12, padding: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ fontSize: 20 }}>{style.icon}</span>
                        <span style={{ fontWeight: 800, fontSize: 15 }}>{alert.title}</span>
                      </div>
                      <span style={{ fontSize: 11, color: COLORS.textMuted, fontWeight: 600 }}>{alert.date}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>{alert.message}</p>
                  </div>
                );
              })}
            </div>

            {/* Subscribe */}
            <div style={{ background: "#fff", borderRadius: 12, padding: "24px", border: `1px solid ${COLORS.border}` }}>
              <h3 style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 800 }}>🔔 Subscribe to Alerts</h3>
              <p style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 16 }}>Receive outbreak and health campaign notifications for your district.</p>
              {alertSubscribed ? (
                <div style={{ color: COLORS.green, fontWeight: 700, fontSize: 14 }}>✅ You're subscribed! Alerts will be sent to {alertEmail}</div>
              ) : (
                <div style={{ display: "flex", gap: 10 }}>
                  <input
                    type="email"
                    value={alertEmail}
                    onChange={(e) => setAlertEmail(e.target.value)}
                    placeholder="Enter your email address"
                    style={{ flex: 1, padding: "10px 14px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 14, outline: "none" }}
                  />
                  <button
                    onClick={() => { if (alertEmail.includes("@")) setAlertSubscribed(true); }}
                    style={{ background: COLORS.green, color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}
                  >
                    Subscribe
                  </button>
                </div>
              )}
              <p style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 10, marginBottom: 0 }}>🔒 Your email is only used for health alerts. We comply with Sierra Leone's data protection principles and never share your data.</p>
            </div>
          </div>
        )}

        {/* REPORT */}
        {tab === "report" && (
          <div>
            <h2 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 800 }}>Report a Health Concern</h2>
            <p style={{ color: COLORS.textMuted, fontSize: 14, marginBottom: 20 }}>Help us track disease outbreaks and health issues in your community.</p>

            {submittedSymptom ? (
              <div style={{ background: COLORS.greenPale, border: `1px solid ${COLORS.green}`, borderRadius: 12, padding: "28px", textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
                <div style={{ fontWeight: 800, fontSize: 18, color: COLORS.green, marginBottom: 8 }}>Report Submitted</div>
                <p style={{ fontSize: 14, color: COLORS.text, marginBottom: 16 }}>Thank you for helping us monitor health in Sierra Leone. Your anonymous report from <strong>{symptomLocation || "your area"}</strong> has been recorded.</p>
                <button onClick={() => { setSubmittedSymptom(false); setSymptomInput(""); setSymptomLocation(""); }} style={{ background: COLORS.green, color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 700, cursor: "pointer" }}>Submit Another Report</button>
              </div>
            ) : (
              <div style={{ background: "#fff", borderRadius: 12, padding: "24px", border: `1px solid ${COLORS.border}` }}>
                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: "block", fontWeight: 700, fontSize: 14, marginBottom: 6 }}>District / Location</label>
                  <input
                    value={symptomLocation}
                    onChange={(e) => setSymptomLocation(e.target.value)}
                    placeholder="e.g. Freetown, Bo, Kenema..."
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 14, outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: "block", fontWeight: 700, fontSize: 14, marginBottom: 6 }}>Describe the Health Concern</label>
                  <textarea
                    value={symptomInput}
                    onChange={(e) => setSymptomInput(e.target.value)}
                    placeholder="e.g. Several people in my community have fever and vomiting. Possibly cholera..."
                    rows={5}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 14, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }}
                  />
                </div>
                <div style={{ background: COLORS.goldPale, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: COLORS.text, marginBottom: 20 }}>
                  🔒 <strong>Privacy notice:</strong> Reports are anonymous by default. No personally identifiable information is required. Data is used only for public health monitoring purposes in line with Sierra Leone's data protection principles.
                </div>
                <button
                  onClick={() => { if (symptomInput.trim()) setSubmittedSymptom(true); }}
                  style={{ background: COLORS.green, color: "#fff", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer", width: "100%" }}
                >
                  Submit Report
                </button>
              </div>
            )}
          </div>
        )}

        {/* ASK AI */}
        {tab === "ask" && (
          <div>
            <h2 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 800 }}>Ask the Health Assistant</h2>
            <p style={{ color: COLORS.textMuted, fontSize: 14, marginBottom: 20 }}>Powered by AI. Ask any health question relevant to Sierra Leone.</p>

            <div style={{ background: "#fff", borderRadius: 12, padding: "24px", border: `1px solid ${COLORS.border}`, marginBottom: 16 }}>
              <textarea
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                placeholder="e.g. How can I prevent malaria during the rainy season? What are signs of malnutrition in children?"
                rows={4}
                style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 14, outline: "none", resize: "vertical", fontFamily: "inherit", boxSizing: "border-box", marginBottom: 12 }}
              />
              <button
                onClick={() => askHealthAI(aiQuery)}
                disabled={aiLoading || !aiQuery.trim()}
                style={{ background: aiLoading || !aiQuery.trim() ? "#a0c4b0" : COLORS.green, color: "#fff", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, fontSize: 15, cursor: aiLoading ? "wait" : "pointer", width: "100%" }}
              >
                {aiLoading ? "⏳ Getting answer..." : "Ask Health Assistant"}
              </button>
            </div>

            {aiAnswer && (
              <div style={{ background: COLORS.greenPale, border: `1px solid ${COLORS.green}`, borderRadius: 12, padding: "20px" }}>
                <div style={{ fontWeight: 800, color: COLORS.green, marginBottom: 10, fontSize: 14 }}>🩺 Health Assistant Response</div>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{aiAnswer}</p>
              </div>
            )}

            <div style={{ marginTop: 20, background: COLORS.bluePale, borderRadius: 12, padding: "16px 20px", fontSize: 13, color: COLORS.blue }}>
              <strong>Suggested questions:</strong>
              {["What are the symptoms of malaria?", "How do I protect my baby from disease?", "When should I go to the clinic for fever?"].map((q) => (
                <button
                  key={q}
                  onClick={() => setAiQuery(q)}
                  style={{ display: "block", background: "rgba(26,79,122,0.1)", color: COLORS.blue, border: "none", borderRadius: 6, padding: "6px 12px", marginTop: 8, fontSize: 13, cursor: "pointer", textAlign: "left", fontWeight: 600 }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ background: COLORS.text, color: "rgba(255,255,255,0.7)", textAlign: "center", padding: "20px 16px", fontSize: 12, marginTop: 40 }}>
        <div style={{ marginBottom: 6 }}>HealthAware SL · Licensed under the MIT License · Open Source Digital Public Good</div>
        <div>Aligned with SDG 3 (Good Health), SDG 2 (Zero Hunger), SDG 6 (Clean Water) · DLAW207 Group Project · Limkokwing University, Sierra Leone</div>
      </footer>
    </div>
  );
}
