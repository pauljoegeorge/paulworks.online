import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  TrendingUp,
  Sparkles,
  ShieldCheck,
  Lock,
  ArrowUpRight,
} from "lucide-react";
import GoogleAuth from "./GoogleAuth";
import { useOAuth } from "./hooks/useOAuth";
import MoneyProphetLogo from "../../assets/moneyProphet.png";

/* ─────────────────────────────────────────────────────────────────────────────
 * Static data
 * ────────────────────────────────────────────────────────────────────────── */
const FEATURES = [
  {
    Icon: TrendingUp,
    title: "Smart expense tracking",
    desc: "Categorise and visualise where every dollar goes.",
  },
  {
    Icon: Sparkles,
    title: "AI budget forecasts",
    desc: "Know what's coming before it hits your account.",
  },
  {
    Icon: ShieldCheck,
    title: "Private by design",
    desc: "Your data stays yours. No ads. No selling. Ever.",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
 * Styles — single block, replaces ~120 inline style props
 * ────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* Layout */
  .mp-login        { display: flex; min-height: 100vh; background: var(--background); }
  .mp-pane-left    { display: none; flex: 0 0 48%; position: relative; overflow: hidden;
                     background: #0b1020; padding: 44px 52px; flex-direction: column;
                     justify-content: space-between; color: #e2e8f0; }
  .mp-pane-right   { flex: 1; display: flex; align-items: center; justify-content: center;
                     padding: 32px 24px; position: relative; }
  @media (min-width: 900px) { .mp-pane-left { display: flex; } }

  /* Aurora background */
  .mp-aurora       { position: absolute; inset: -20%; pointer-events: none; filter: blur(60px);
                     opacity: 0.85; }
  .mp-aurora::before, .mp-aurora::after {
    content: ""; position: absolute; border-radius: 50%;
  }
  .mp-aurora::before {
    width: 560px; height: 560px; top: 5%; right: -8%;
    background: radial-gradient(circle, rgba(99,102,241,0.55) 0%, transparent 65%);
    animation: mp-float 14s ease-in-out infinite;
  }
  .mp-aurora::after {
    width: 420px; height: 420px; bottom: -8%; left: -6%;
    background: radial-gradient(circle, rgba(168,85,247,0.45) 0%, transparent 65%);
    animation: mp-float 18s ease-in-out infinite reverse;
  }
  .mp-grid {
    position: absolute; inset: 0; pointer-events: none; opacity: 0.4;
    background-image:
      linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px);
    background-size: 36px 36px;
    mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
  }
  @keyframes mp-float {
    0%,100% { transform: translate(0,0) scale(1); }
    50%     { transform: translate(-30px,20px) scale(1.08); }
  }

  /* Brand lockup */
  .mp-brand        { display: flex; align-items: center; gap: 10px; position: relative; z-index: 1; }
  .mp-brand-mark   { width: 34px; height: 34px; border-radius: 8px;
                     box-shadow: 0 4px 14px rgba(99,102,241,0.35); }
  .mp-brand-name   { font-size: 1.0625rem; font-weight: 700; letter-spacing: -0.02em; color: #f8fafc; }

  /* Hero */
  .mp-hero         { position: relative; z-index: 1; }
  .mp-badge        { display: inline-flex; align-items: center; gap: 6px;
                     padding: 5px 11px 5px 8px; border-radius: 999px; margin-bottom: 22px;
                     background: rgba(99,102,241,0.12);
                     border: 1px solid rgba(99,102,241,0.25);
                     color: #c7d2fe; font-size: 0.75rem; font-weight: 500;
                     letter-spacing: -0.005em; }
  .mp-badge-dot    { width: 6px; height: 6px; border-radius: 50%; background: #818cf8;
                     box-shadow: 0 0 0 3px rgba(129,140,248,0.25);
                     animation: mp-pulse 2s ease-in-out infinite; }
  @keyframes mp-pulse {
    0%,100% { box-shadow: 0 0 0 3px rgba(129,140,248,0.25); }
    50%     { box-shadow: 0 0 0 6px rgba(129,140,248,0.10); }
  }
  .mp-h1           { color: #f8fafc; font-size: clamp(1.9rem, 2.8vw, 2.5rem);
                     font-weight: 800; letter-spacing: -0.045em; line-height: 1.12;
                     margin: 0 0 14px; }
  .mp-h1-accent    { background: linear-gradient(135deg, #818cf8 0%, #c084fc 100%);
                     -webkit-background-clip: text; background-clip: text;
                     -webkit-text-fill-color: transparent; }
  .mp-sub          { color: #94a3b8; font-size: 0.9375rem; line-height: 1.65;
                     margin: 0 0 32px; max-width: 360px; }

  /* Features list */
  .mp-features     { display: flex; flex-direction: column; gap: 18px; }
  .mp-feat         { display: flex; gap: 14px; align-items: flex-start;
                     opacity: 0; transform: translateY(8px);
                     animation: mp-rise 0.6s ease forwards; }
  .mp-feat:nth-child(1) { animation-delay: 0.05s; }
  .mp-feat:nth-child(2) { animation-delay: 0.15s; }
  .mp-feat:nth-child(3) { animation-delay: 0.25s; }
  @keyframes mp-rise {
    to { opacity: 1; transform: translateY(0); }
  }
  .mp-feat-icon    { width: 36px; height: 36px; border-radius: 9px; flex-shrink: 0;
                     background: rgba(99,102,241,0.14);
                     border: 1px solid rgba(99,102,241,0.22);
                     display: flex; align-items: center; justify-content: center; }
  .mp-feat-title   { color: #e2e8f0; font-size: 0.875rem; font-weight: 600;
                     letter-spacing: -0.01em; margin-bottom: 2px; }
  .mp-feat-desc    { color: #64748b; font-size: 0.8125rem; line-height: 1.55; }

  /* Footer social-proof strip */
  .mp-foot         { position: relative; z-index: 1; display: flex;
                     align-items: center; justify-content: space-between; gap: 16px;
                     padding-top: 18px; border-top: 1px solid rgba(148,163,184,0.1); }
  .mp-foot-left    { color: #475569; font-size: 0.75rem; }
  .mp-stars        { display: flex; align-items: center; gap: 6px;
                     color: #cbd5e1; font-size: 0.75rem; font-weight: 500; }

  /* Right pane card */
  .mp-card-wrap    { width: 100%; max-width: 400px;
                     animation: mp-rise 0.5s ease forwards; opacity: 0; }
  .mp-mobile-brand { display: flex; align-items: center; justify-content: center;
                     gap: 10px; margin-bottom: 28px; }
  @media (min-width: 900px) { .mp-mobile-brand { display: none; } }
  .mp-mobile-brand img { width: 30px; height: 30px; border-radius: 7px; }
  .mp-mobile-brand span { font-size: 1rem; font-weight: 700;
                          color: var(--foreground); letter-spacing: -0.02em; }

  .mp-card         { background: var(--card); border: 1px solid var(--border);
                     border-radius: var(--radius-xl); padding: 38px 34px;
                     box-shadow: var(--shadow-md); }
  .mp-card-h2      { margin: 0 0 8px; font-size: 1.5rem; font-weight: 700;
                     color: var(--foreground); letter-spacing: -0.035em; }
  .mp-card-p       { margin: 0 0 26px; font-size: 0.875rem;
                     color: var(--muted-foreground); line-height: 1.55; }

  /* Trust row below button */
  .mp-trust        { display: flex; align-items: center; justify-content: center;
                     gap: 14px; margin-top: 18px; padding-top: 18px;
                     border-top: 1px solid var(--border); }
  .mp-trust-item   { display: inline-flex; align-items: center; gap: 6px;
                     color: var(--muted-foreground); font-size: 0.6875rem;
                     font-weight: 500; letter-spacing: 0.01em; }

  .mp-legal        { margin: 18px 0 0; font-size: 0.75rem;
                     color: var(--muted-foreground); text-align: center; line-height: 1.55; }
  .mp-legal a      { color: var(--primary); text-decoration: none; font-weight: 500; }
  .mp-legal a:hover{ text-decoration: underline; }

  /* Loading state */
  .mp-loading      { display: flex; flex-direction: column; align-items: center;
                     gap: 14px; padding: 32px 0 24px; }
  .mp-spin         { width: 30px; height: 30px; border-radius: 50%;
                     border: 3px solid var(--border);
                     border-top-color: var(--primary);
                     animation: mp-rot 0.75s linear infinite; }
  @keyframes mp-rot { to { transform: rotate(360deg); } }
  .mp-loading-text { font-size: 0.8125rem; color: var(--muted-foreground); }
  .mp-shimmer-row  { width: 100%; display: flex; flex-direction: column; gap: 10px;
                     margin-top: 18px; }
  .mp-shimmer-bar  { height: 10px; border-radius: 6px;
                     background: linear-gradient(90deg,
                                 var(--muted) 0%, var(--border) 50%, var(--muted) 100%);
                     background-size: 200% 100%;
                     animation: mp-shim 1.4s ease-in-out infinite; }
  .mp-shimmer-bar:nth-child(1) { width: 80%; }
  .mp-shimmer-bar:nth-child(2) { width: 60%; }
  @keyframes mp-shim {
    0%   { background-position: 100% 0; }
    100% { background-position: -100% 0; }
  }

  /* Preview card on left pane (mini dashboard glance) */
  .mp-preview      { position: relative; z-index: 1; margin-top: 32px;
                     padding: 16px 18px; border-radius: 14px;
                     background: rgba(15,23,42,0.55);
                     border: 1px solid rgba(148,163,184,0.12);
                     backdrop-filter: blur(8px);
                     -webkit-backdrop-filter: blur(8px);
                     max-width: 380px;
                     opacity: 0; animation: mp-rise 0.7s 0.35s ease forwards; }
  .mp-preview-row  { display: flex; align-items: center; justify-content: space-between;
                     margin-bottom: 12px; }
  .mp-preview-label{ font-size: 0.7rem; color: #64748b; text-transform: uppercase;
                     letter-spacing: 0.08em; font-weight: 600; }
  .mp-preview-pct  { display: inline-flex; align-items: center; gap: 3px;
                     padding: 3px 8px; border-radius: 999px;
                     background: rgba(16,185,129,0.12); color: #34d399;
                     font-size: 0.6875rem; font-weight: 600; }
  .mp-preview-val  { font-size: 1.5rem; font-weight: 700; color: #f1f5f9;
                     letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
  .mp-preview-bars { display: flex; align-items: flex-end; gap: 5px; height: 38px;
                     margin-top: 14px; }
  .mp-preview-bar  { flex: 1; border-radius: 3px;
                     background: linear-gradient(180deg, #6366f1 0%, #4338ca 100%);
                     opacity: 0.85;
                     animation: mp-grow 0.8s ease forwards;
                     transform-origin: bottom; transform: scaleY(0.1); }
  .mp-preview-bar:nth-child(1) { animation-delay: 0.45s; --h: 35%; }
  .mp-preview-bar:nth-child(2) { animation-delay: 0.50s; --h: 55%; }
  .mp-preview-bar:nth-child(3) { animation-delay: 0.55s; --h: 45%; }
  .mp-preview-bar:nth-child(4) { animation-delay: 0.60s; --h: 80%; }
  .mp-preview-bar:nth-child(5) { animation-delay: 0.65s; --h: 65%; }
  .mp-preview-bar:nth-child(6) { animation-delay: 0.70s; --h: 95%; }
  .mp-preview-bar:nth-child(7) { animation-delay: 0.75s; --h: 70%; }
  @keyframes mp-grow {
    to { transform: scaleY(1); height: var(--h); }
  }

  @media (prefers-reduced-motion: reduce) {
    .mp-aurora::before, .mp-aurora::after,
    .mp-feat, .mp-card-wrap, .mp-preview, .mp-preview-bar,
    .mp-spin, .mp-shimmer-bar, .mp-badge-dot {
      animation: none !important; opacity: 1 !important; transform: none !important;
    }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
 * Component
 * ────────────────────────────────────────────────────────────────────────── */
function LoginContainer({ history }) {
  const { isLoading, oauthUrl, userToken, actions } = useOAuth();

  const resetUrl = () => {
    history.replace({ search: new URLSearchParams().toString() });
  };

  useEffect(() => {
    if (userToken) {
      history.replace("/dashboard");
    } else {
      actions.getOAuthUrl();
    }
  }, [userToken]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("state") === "google") {
      const code = decodeURIComponent(query.get("code"));
      if (code) {
        actions.startOAuth(code);
        resetUrl();
      }
    }
  }, [window.location]);

  return (
    <>
      <style>{STYLES}</style>

      <div className="mp-login">
        {/* ── Left: brand · marketing · live preview ─────────────────────── */}
        <aside className="mp-pane-left">
          <div className="mp-aurora" aria-hidden="true" />
          <div className="mp-grid" aria-hidden="true" />

          <div className="mp-brand">
            <img
              src={MoneyProphetLogo}
              alt=""
              aria-hidden="true"
              className="mp-brand-mark"
            />
            <span className="mp-brand-name">Money Prophet</span>
          </div>

          <div className="mp-hero">
            <span className="mp-badge">
              <span className="mp-badge-dot" />
              New · AI forecasts for June
            </span>

            <h1 className="mp-h1">
              Your money,
              <br />
              <span className="mp-h1-accent">clearly understood.</span>
            </h1>
            <p className="mp-sub">
              A personal finance dashboard that shows you exactly where you
              stand — every single day.
            </p>

            <div className="mp-features">
              {FEATURES.map(({ Icon, title, desc }) => (
                <div key={title} className="mp-feat">
                  <div className="mp-feat-icon">
                    <Icon
                      size={17}
                      color="#818cf8"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <div className="mp-feat-title">{title}</div>
                    <div className="mp-feat-desc">{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mini dashboard preview — gives a taste of the product */}
            <div className="mp-preview" aria-hidden="true">
              <div className="mp-preview-row">
                <span className="mp-preview-label">This month</span>
                <span className="mp-preview-pct">
                  <ArrowUpRight size={11} strokeWidth={2.5} />
                  12.4%
                </span>
              </div>
              <div className="mp-preview-val">$3,284.10</div>
              <div className="mp-preview-bars">
                <span className="mp-preview-bar" />
                <span className="mp-preview-bar" />
                <span className="mp-preview-bar" />
                <span className="mp-preview-bar" />
                <span className="mp-preview-bar" />
                <span className="mp-preview-bar" />
                <span className="mp-preview-bar" />
              </div>
            </div>
          </div>

          <div className="mp-foot">
            <span className="mp-foot-left">
              © {new Date().getFullYear()} Money Prophet
            </span>
            <span className="mp-stars">★★★★★ &nbsp;Loved by early users</span>
          </div>
        </aside>

        {/* ── Right: auth card ───────────────────────────────────────────── */}
        <main className="mp-pane-right">
          <div className="mp-card-wrap">
            <div className="mp-mobile-brand">
              <img src={MoneyProphetLogo} alt="Money Prophet" />
              <span>Money Prophet</span>
            </div>

            <div className="mp-card">
              {isLoading ? (
                <div className="mp-loading" role="status" aria-live="polite">
                  <div className="mp-spin" aria-hidden="true" />
                  <span className="mp-loading-text">Signing you in…</span>
                  <div className="mp-shimmer-row" aria-hidden="true">
                    <div className="mp-shimmer-bar" />
                    <div className="mp-shimmer-bar" />
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="mp-card-h2">Welcome back</h2>
                  <p className="mp-card-p">
                    Sign in to your dashboard and take control of your finances.
                  </p>

                  <GoogleAuth oauthUrl={oauthUrl} />

                  <div className="mp-trust">
                    <span className="mp-trust-item">
                      <Lock size={11} strokeWidth={2.4} />
                      256-bit encryption
                    </span>
                    <span className="mp-trust-item">
                      <ShieldCheck size={11} strokeWidth={2.4} />
                      No data resold
                    </span>
                  </div>

                  <p className="mp-legal">
                    By continuing, you agree to our{" "}
                    <a href="/privacy">Privacy Policy</a>.
                  </p>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

LoginContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    goForward: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired,
  }).isRequired,
};

export default LoginContainer;
