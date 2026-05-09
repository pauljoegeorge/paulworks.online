import React, { useEffect, useRef, useState } from "react";
import { isMobile } from "../../utils/utils";
import { GithubUrl, LinkedinUrl, TwitterUrl } from "./constants/constants";

const SCHEMES = {
  amber: {
    bg: "#0e0c08", bgSoft: "#161208", fg: "#e8d4a8", fgSoft: "#b89a68",
    dim: "#6a5a3a", ok: "#9bbf5a", warn: "#d9a13a", accent: "#e8941a", rule: "#2a2014",
  },
  green: {
    bg: "#070d07", bgSoft: "#0c160c", fg: "#c8f0a8", fgSoft: "#7ab068",
    dim: "#3a5a2a", ok: "#8ed070", warn: "#d4d860", accent: "#5fdc4a", rule: "#152418",
  },
  mono: {
    bg: "#0d0d0d", bgSoft: "#161616", fg: "#e8e6df", fgSoft: "#a8a6a0",
    dim: "#5a5a5a", ok: "#c8c8c8", warn: "#e8e8e8", accent: "#ffffff", rule: "#262626",
  },
};

const BOOT_LINES = [
  { tag: "OK",   text: "Initializing portfolio.target",         delay: 60  },
  { tag: "OK",   text: "Mounting /home/paul",                   delay: 80  },
  { tag: "OK",   text: "Loading identity from /etc/passwd",     delay: 90  },
  { tag: "OK",   text: "Reading bio.txt (642 bytes)",           delay: 100 },
  { tag: "OK",   text: "Indexing projects/ — found 5 entries",  delay: 120 },
  { tag: "WARN", text: "imposter_syndrome.service: ignored",    delay: 140 },
  { tag: "OK",   text: "Loading stack manifest",                delay: 160 },
  { tag: "OK",   text: "Started networking.service",            delay: 180 },
  { tag: "OK",   text: "Reached target portfolio.online",       delay: 220 },
];

const PROJECTS = [
  {
    num: "01", name: "MoneyProphet", domain: "fintech · side project",
    desc: "AI-powered personal finance app. Budget tracking, expense forecasting, and spending insights. Built end-to-end — Rails backend, React frontend, and ML pipeline.",
    stack: ["ruby on rails", "react", "mysql", "google ai"],
    href: "/dashboard",
  },
  {
    num: "02", name: "Jarit", domain: "ios · side project",
    desc: "A reverse expense tracker — instead of logging what you spent, you log what you saved. Flips the mental model of budgeting.",
    stack: ["react native", "firebase"],
    href: "https://apps.apple.com/jp/app/jarit/id6758780320?l=en-US",
  },
  {
    num: "03", name: "JNews", domain: "edtech · side project",
    desc: "News content for JLPT learners under 200 words. Real Japanese news, simplified and annotated for language learners.",
    stack: ["react", "firebase", "google ai"],
    href: "https://jnews.site",
  },
];

function ts(n) {
  const t = (n * 0.4321).toFixed(6);
  return `[ ${t.padStart(11, " ")} ]`;
}


function cssVars(scheme) {
  const s = SCHEMES[scheme] || SCHEMES.amber;
  return {
    "--bg": s.bg, "--bg-soft": s.bgSoft, "--fg": s.fg, "--fg-soft": s.fgSoft,
    "--dim": s.dim, "--ok": s.ok, "--warn": s.warn, "--accent": s.accent, "--rule": s.rule,
  };
}

export default function HomeContainer() {
  const [scheme, setScheme] = useState(() => {
    const options = ["amber", "green", "mono"];
    return options[Math.floor(Math.random() * options.length)];
  });
  const [bootLines, setBootLines] = useState([]);
  const [visibleSections, setVisibleSections] = useState(0);
  const [clock, setClock] = useState("--:--:--");
  const [panelOpen, setPanelOpen] = useState(false);
  const mobileView = isMobile();

  const runBoot = () => {
    setBootLines([]);
    setVisibleSections(0);
    let cumulative = 0;
    BOOT_LINES.forEach((line, i) => {
      cumulative += line.delay;
      setTimeout(() => {
        setBootLines((prev) => [...prev, { ...line, idx: i }]);
      }, cumulative);
    });
    const total = cumulative + 200;
    const numSections = 5;
    for (let i = 0; i < numSections; i += 1) {
      setTimeout(() => setVisibleSections((prev) => prev + 1), total + i * 220);
    }
  };

  useEffect(() => {
    runBoot();
    const tick = () => {
      const d = new Date();
      setClock([d.getHours(), d.getMinutes(), d.getSeconds()]
        .map((n) => String(n).padStart(2, "0")).join(":"));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const c = SCHEMES[scheme];

  const pageStyle = {
    ...cssVars(scheme),
    background: c.bg,
    color: c.fg,
    fontFamily: "'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace",
    fontSize: "clamp(18px, 1.8vw, 26px)",
    lineHeight: 1.6,
    minHeight: "100vh",
    position: "relative",
    WebkitFontSmoothing: "antialiased",
  };

  const wrapStyle = {
    maxWidth: "1600px",
    margin: "0 auto",
    padding: mobileView ? "32px 18px 80px" : "64px 80px 140px",
  };

  const sectionStyle = (visible) => ({
    margin: "28px 0 8px",
    borderLeft: `2px solid ${c.accent}`,
    padding: "14px 0 14px 22px",
    opacity: visible ? 1 : 0,
    transition: "opacity 0.3s ease",
  });

  return (
    <div style={pageStyle}>
      {/* scanline + vignette overlay */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 100, mixBlendMode: "overlay",
        background: "repeating-linear-gradient(to bottom, rgba(255,255,255,0.012) 0 1px, transparent 1px 3px), radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.45) 100%)",
      }} />

      <div style={wrapStyle}>
        {/* topbar */}
        <header style={{
          display: "flex", alignItems: "center", gap: "12px", fontSize: "15px",
          color: c.dim, letterSpacing: "0.5px", marginBottom: "36px",
          borderBottom: `1px dashed ${c.rule}`, paddingBottom: "10px",
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: c.ok, boxShadow: `0 0 8px ${c.ok}`, display: "inline-block", flexShrink: 0, animation: "pulse 2s ease-in-out infinite" }} />
          <span style={{ color: c.fgSoft }}>/dev/tty1</span>
          <span style={{ flex: 1 }} />
          <span>tty · 80×24</span>
          <span>·</span>
          <span>{clock}</span>
        </header>

        {/* boot sequence */}
        <div style={{ marginBottom: "8px" }}>
          {bootLines.map((line) => (
            <div key={line.idx} style={{ color: c.dim, fontSize: "13px", margin: "2px 0" }}>
              <span style={{ color: c.dim, marginRight: "8px" }}>{ts(line.idx + 1)}</span>
              <span style={{ color: line.tag === "OK" ? c.ok : c.warn, fontWeight: 700 }}>
                {"[ "}{line.tag.padEnd(4, " ")}{" ]"}
              </span>
              {" "}
              <span style={{ color: c.fgSoft }}>{line.text}</span>
            </div>
          ))}
        </div>

        {/* identity */}
        <section style={sectionStyle(visibleSections >= 1)}>
          <div style={{ color: c.accent, fontSize: "15px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "14px", fontWeight: 700 }}>
            ▌ identity
          </div>
          <h1 style={{ fontSize: "clamp(56px, 9vw, 110px)", fontWeight: 700, letterSpacing: "-1.5px", lineHeight: 0.95, textTransform: "uppercase", color: c.fg, margin: 0 }}>
            paul joe<br /><span style={{ color: c.accent }}>george</span>
          </h1>
          <div style={{ color: c.fgSoft, fontSize: "22px", marginTop: "14px", letterSpacing: "0.5px" }}>
            <span>product lead</span>
            <span style={{ color: c.dim, margin: "0 8px" }}>/</span>
            <span>full stack developer</span>
          </div>
          <p style={{ color: c.fgSoft, fontSize: "20px", marginTop: "18px", maxWidth: "80ch" }}>
            I bridge engineering and product strategy — from system design to roadmaps
            to shipped features. Currently leading products at{" "}
            <a href="https://receptionist.jp" target="_blank" rel="noreferrer" style={{ color: c.accent, textDecoration: "none", borderBottom: `1px dashed ${c.accent}` }}>
              RECEPTIONIST Inc.
            </a>
            {" "}in Tokyo and building{" "}
            <a href="/dashboard" style={{ color: c.accent, textDecoration: "none", borderBottom: `1px dashed ${c.accent}` }}>
              MoneyProphet
            </a>
            {" "}on the side.
          </p>
          <dl style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: "4px 16px", marginTop: "24px", fontSize: "18px" }}>
            <dt style={{ color: c.dim }}>uptime</dt>     <dd style={{ margin: 0, color: c.fg }}>~8 yrs in tech</dd>
            <dt style={{ color: c.dim }}>location</dt>   <dd style={{ margin: 0, color: c.fg }}>Tokyo, Japan</dd>
            <dt style={{ color: c.dim }}>stack</dt>      <dd style={{ margin: 0, color: c.fg }}>rails · react · b2b saas</dd>
            <dt style={{ color: c.dim }}>status</dt>     <dd style={{ margin: 0 }}><span style={{ color: c.ok }}>●</span> open to opportunities</dd>
          </dl>
        </section>

        {/* about */}
        <section style={sectionStyle(visibleSections >= 2)}>
          <div style={{ color: c.accent, fontSize: "15px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "14px", fontWeight: 700 }}>▌ about</div>
          <p style={{ color: c.fgSoft, margin: "0 0 12px", maxWidth: "80ch", fontSize: "20px" }}>
            Product Lead with a foundation in full-stack engineering. I specialise in
            bridging technical architecture with user experience — fluent with both
            the codebase and the boardroom conversation about retention and LTV.
          </p>
          <p style={{ color: c.fgSoft, margin: "0 0 12px", maxWidth: "80ch", fontSize: "20px" }}>
            At RECEPTIONIST Inc. in Tokyo, I&apos;ve taken products from 0→1, owned full
            lifecycles across B2B SaaS, and mentored engineers while staying close
            to the code. 8 years across B2B SaaS and analytics.
          </p>
          <p style={{ color: c.fgSoft, margin: 0, maxWidth: "80ch", fontSize: "20px" }}>
            Outside of work: long walks, learning Japanese, and building tiny tools nobody asked for.
          </p>
        </section>

        {/* selected work */}
        <section style={sectionStyle(visibleSections >= 3)}>
          <div style={{ color: c.accent, fontSize: "15px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "14px", fontWeight: 700 }}>▌ selected_work</div>
          {PROJECTS.map((p) => (
            <a
              key={p.num}
              href={p.href}
              style={{
                display: "grid", gridTemplateColumns: "32px 1fr auto", gap: "18px",
                alignItems: "baseline", padding: "14px 0",
                borderBottom: `1px dashed ${c.rule}`, color: c.fg, textDecoration: "none",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.paddingLeft = "8px"; e.currentTarget.style.background = `linear-gradient(to right, ${c.accent}10, transparent 50%)`; }}
              onMouseLeave={(e) => { e.currentTarget.style.paddingLeft = "0"; e.currentTarget.style.background = "none"; }}
            >
              <span style={{ color: c.dim, fontSize: "18px", fontWeight: 500, letterSpacing: "1px" }}>{p.num}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{ color: c.fg, fontSize: "clamp(20px, 2vw, 28px)", fontWeight: 700, letterSpacing: "-0.2px" }}>
                  {p.name}
                  <span style={{ color: c.dim, margin: "0 6px", fontWeight: 400 }}>/</span>
                  <span style={{ color: c.fgSoft, fontWeight: 400, fontSize: "16px" }}>{p.domain}</span>
                </div>
                <div style={{ color: c.fgSoft, fontSize: "18px", marginTop: "4px", maxWidth: "80ch" }}>{p.desc}</div>
                <div style={{ marginTop: "8px", color: c.dim, fontSize: "15px", letterSpacing: "0.5px" }}>
                  {p.stack.map((s, i) => (
                    <span key={s}>{i > 0 && <span style={{ margin: "0 6px", color: c.rule }}>·</span>}{s}</span>
                  ))}
                </div>
              </div>
              <span style={{ color: c.dim, fontSize: "18px" }}>→</span>
            </a>
          ))}
        </section>

        {/* stack */}
        <section style={sectionStyle(visibleSections >= 4)}>
          <div style={{ color: c.accent, fontSize: "15px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "14px", fontWeight: 700 }}>▌ stack</div>
          <dl style={{ display: "grid", gridTemplateColumns: mobileView ? "1fr" : "140px 1fr", gap: "12px 18px", alignItems: "baseline" }}>
            {[
              ["frontend",  ["react", "javascript", "typescript", "tailwind", "vite"]],
              ["backend",   ["ruby on rails", "python", "postgresql", "redis", "sidekiq"]],
              ["infra",     ["aws", "gcp", "railway", "heroku", "docker", "ci/cd"]],
              ["product",   ["roadmaps", "0→1 launches", "retention · ltv", "data-driven specs"]],
              ["languages", ["english · fluent", "japanese · business fluent", "malayalam · native", "tamil · movies only"]],
            ].map(([label, items]) => (
              <React.Fragment key={label}>
                <dt style={{ color: c.accent, fontSize: "18px", textTransform: "lowercase" }}>
                  <span style={{ color: c.dim }}>$ </span>{label}
                </dt>
                <dd style={{ margin: mobileView ? "0 0 8px" : 0, color: c.fgSoft, fontSize: "18px", display: "flex", flexWrap: "wrap", gap: "6px 10px" }}>
                  {items.map((item, i) => (
                    <span key={item}>{i > 0 && <span style={{ marginRight: "10px", color: c.rule }}>·</span>}{item}</span>
                  ))}
                </dd>
              </React.Fragment>
            ))}
          </dl>
        </section>

        {/* contact */}
        <section id="contact" style={sectionStyle(visibleSections >= 5)}>
          <div style={{ color: c.accent, fontSize: "15px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "14px", fontWeight: 700 }}>▌ contact</div>
          <dl style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "6px 20px", fontSize: "18px" }}>
<dt style={{ color: c.dim }}>github</dt>
            <dd style={{ margin: 0 }}><a href={GithubUrl} target="_blank" rel="noreferrer" style={{ color: c.fg, textDecoration: "none" }}>github.com/pauljoegeorge</a></dd>
            <dt style={{ color: c.dim }}>linkedin</dt>
            <dd style={{ margin: 0 }}><a href={LinkedinUrl} target="_blank" rel="noreferrer" style={{ color: c.fg, textDecoration: "none" }}>in/pauljoegeorge</a></dd>
            <dt style={{ color: c.dim }}>twitter</dt>
            <dd style={{ margin: 0 }}><a href={TwitterUrl} target="_blank" rel="noreferrer" style={{ color: c.fg, textDecoration: "none" }}>@pauljoegeorge</a></dd>
            <dt style={{ color: c.dim }}>instagram</dt>
            <dd style={{ margin: 0 }}><a href="https://www.instagram.com/explore___japan/" target="_blank" rel="noreferrer" style={{ color: c.fg, textDecoration: "none" }}>@explore___japan</a></dd>
            <dt style={{ color: c.dim }}>jarit</dt>
            <dd style={{ margin: 0 }}><a href="https://apps.apple.com/jp/app/jarit/id6758780320?l=en-US" target="_blank" rel="noreferrer" style={{ color: c.accent, textDecoration: "none", borderBottom: `1px dashed ${c.accent}` }}>app store ↗</a></dd>
            <dt style={{ color: c.dim }}>moneyprophet</dt>
            <dd style={{ margin: 0 }}><a href="/dashboard" style={{ color: c.accent, textDecoration: "none", borderBottom: `1px dashed ${c.accent}` }}>open app →</a></dd>
          </dl>
        </section>

        {/* footer */}
        <footer style={{ marginTop: "32px", color: c.dim, fontSize: "16px" }}>
          {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
          <div>// last login on this terminal: just now</div>
          <div style={{ marginTop: "10px", fontSize: "18px", color: c.fg }}>
            <span style={{ color: c.ok }}>paul</span>
            <span style={{ color: c.dim }}>@</span>
            <span style={{ color: c.accent }}>portfolio</span>
            <span style={{ color: c.dim }}>:</span>
            <span style={{ color: c.fgSoft }}>~</span>
            <span style={{ color: c.accent, marginRight: "6px" }}>$</span>
            <span style={{ display: "inline-block", width: "8px", height: "14px", background: c.fg, verticalAlign: "-2px", marginLeft: "4px", animation: "blink 1s steps(2) infinite" }} />
          </div>
        </footer>
      </div>

      {/* tweaks panel */}
      <div style={{ position: "fixed", bottom: "16px", right: "16px", zIndex: 50 }}>
        {panelOpen ? (
          <div style={{ background: c.bgSoft, border: `1px solid ${c.rule}`, color: c.fg, fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", padding: "14px 16px", minWidth: "220px", boxShadow: "0 8px 24px rgba(0,0,0,0.6)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ color: c.accent, letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 700, fontSize: "11px" }}>▌ Tweaks</span>
              <button type="button" onClick={() => setPanelOpen(false)} style={{ background: "none", border: "none", color: c.dim, cursor: "pointer", fontFamily: "inherit", fontSize: "14px" }}>✕</button>
            </div>
            <div style={{ marginBottom: "12px" }}>
              <div style={{ color: c.dim, marginBottom: "6px" }}>scheme</div>
              <div style={{ display: "flex", gap: "6px" }}>
                {["amber", "green", "mono"].map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setScheme(s)}
                    style={{ flex: 1, padding: "6px 8px", background: scheme === s ? c.accent : "transparent", color: scheme === s ? c.bg : c.fgSoft, border: `1px solid ${c.rule}`, fontFamily: "inherit", fontSize: "11px", cursor: "pointer" }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => { runBoot(); setPanelOpen(false); }}
              style={{ width: "100%", padding: "7px 10px", background: "transparent", color: c.accent, border: `1px dashed ${c.accent}`, fontFamily: "inherit", fontSize: "11px", cursor: "pointer", letterSpacing: "1px" }}
            >
              ↻ replay boot
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setPanelOpen(true)}
            style={{ background: c.bgSoft, border: `1px solid ${c.rule}`, color: c.dim, fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", padding: "6px 10px", cursor: "pointer", letterSpacing: "1px" }}
          >
            ⚙ tweaks
          </button>
        )}
      </div>

      <style>{`
        @keyframes pulse { 50% { opacity: 0.4; } }
        @keyframes blink { 50% { opacity: 0; } }
        a:hover { opacity: 0.85; }
      `}</style>
    </div>
  );
}
