import React, { useEffect, useRef, useState } from "react";
import { GithubUrl, LinkedinUrl } from "./constants/constants";

/* =================================================================
   Paul Joe George — cinematic scroll portfolio
   "told by seeing, not reading"
   Ported from the "Portfolio Cinematic" design.
   ================================================================= */

const RUNTIME = 180; // fake film runtime, seconds

const ACCENTS = ["vermilion", "gold", "indigo", "pine"];
const SWATCH = {
  vermilion: "oklch(0.62 0.19 28)",
  gold: "oklch(0.76 0.13 78)",
  indigo: "oklch(0.6 0.15 258)",
  pine: "oklch(0.6 0.11 165)",
};

const CSS = `
  .cine {
    --bg:     #0c0b0f;
    --ink:    #f3ede1;
    --soft:   #b3ab9b;
    --muted:  #6f685c;
    --line:   #2a2731;
    --accent: oklch(0.62 0.19 28);   /* vermilion sun */
    --gold:   oklch(0.78 0.12 78);
    --indigo: oklch(0.55 0.13 258);
    --bar:    7vh;

    color: var(--ink);
    font-family: 'IBM Plex Mono', monospace;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
    background: #000;
  }
  .cine[data-accent="indigo"] { --accent: oklch(0.6 0.15 258); }
  .cine[data-accent="gold"]   { --accent: oklch(0.76 0.13 78); }
  .cine[data-accent="pine"]   { --accent: oklch(0.6 0.11 165); }

  .cine * { box-sizing: border-box; }
  html.cine-scroll { background: #000; scroll-snap-type: y proximity; scroll-behavior: smooth; }
  .cine ::selection { background: var(--accent); color: #000; }
  .cine a { color: inherit; text-decoration: none; }

  /* ---------- cinematic frame ---------- */
  .cine .letterbox {
    position: fixed; left: 0; right: 0; height: var(--bar);
    background: #000; z-index: 50; pointer-events: none;
    transition: height 0.4s ease;
  }
  .cine .letterbox.top { top: 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
  .cine .letterbox.bot { bottom: 0; border-top: 1px solid rgba(255,255,255,0.04); }
  .cine[data-letterbox="off"] .letterbox { height: 0; }

  .cine .grain {
    position: fixed; inset: 0; z-index: 48; pointer-events: none;
    opacity: 0.05; mix-blend-mode: screen;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    animation: cine-grain 0.5s steps(3) infinite;
  }
  .cine[data-grain="off"] .grain { display: none; }
  @keyframes cine-grain { 0%{transform:translate(0,0)} 33%{transform:translate(-3%,2%)} 66%{transform:translate(2%,-3%)} 100%{transform:translate(0,0)} }

  /* ---------- film UI ---------- */
  .cine .film-ui {
    position: fixed; left: 0; right: 0; z-index: 52;
    pointer-events: none;
    font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--soft);
  }
  .cine .ui-top { top: calc(var(--bar) + 18px); display: flex; padding: 0 28px; align-items: center; }
  .cine .ui-top .rec { display: flex; align-items: center; gap: 8px; }
  .cine .ui-top .rec .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); animation: cine-blink 1.4s steps(2) infinite; }
  @keyframes cine-blink { 50% { opacity: 0.2; } }
  .cine .ui-top .tc { margin-left: auto; color: var(--muted); font-variant-numeric: tabular-nums; }

  .cine .ui-chapter {
    bottom: calc(var(--bar) + 40px);
    padding: 0 28px;
    display: flex; align-items: baseline; gap: 14px;
  }
  .cine .ui-chapter .ch-no { color: var(--accent); }
  .cine .ui-chapter .ch-name { color: var(--soft); }

  /* scrubber */
  .cine .scrubber {
    position: fixed; left: 28px; right: 28px;
    bottom: calc(var(--bar) + 20px);
    height: 2px; background: var(--line); z-index: 52; pointer-events: none;
  }
  .cine .scrubber .fill { height: 100%; width: 0; background: var(--accent); transition: width 0.2s ease; }
  .cine .scrubber .ticks { position: absolute; inset: 0; display: flex; }
  .cine .scrubber .ticks i { flex: 1; border-right: 1px solid var(--bg); }

  /* ---------- reel ---------- */
  .cine .reel { position: relative; }
  .cine .scene {
    position: relative;
    height: 100vh; height: 100dvh;
    scroll-snap-align: start;
    display: grid; place-items: center;
    overflow: hidden;
    padding: var(--bar) 28px;
  }
  .cine .scene-inner { position: relative; z-index: 4; text-align: center; width: 100%; max-width: 1000px; }

  /* kinetic text */
  .cine .kin { display: block; overflow: hidden; white-space: nowrap; padding: 0.04em 0.12em 0.18em; margin: 0 -0.12em -0.16em; }
  .cine .kin > span {
    display: inline-block;
    transform: translateY(115%);
  }
  .cine .scene.is-active .kin > span { animation: cine-kinUp 0.9s cubic-bezier(.16,1,.3,1) both; }
  @keyframes cine-kinUp { from { transform: translateY(115%); } to { transform: translateY(0); } }
  .cine .fade { opacity: 0; }
  .cine .scene.is-active .fade { animation: cine-fadeIn 1s ease 0.4s both; }
  @keyframes cine-fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @media (prefers-reduced-motion: reduce) {
    .cine .kin > span { transform: none; }
    .cine .fade { opacity: 1; }
  }

  .cine .eyebrow {
    font-size: 12px; letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 28px;
  }
  .cine .display {
    font-family: 'Instrument Serif', serif;
    font-weight: 400;
    font-size: clamp(44px, 8.5vw, 132px);
    line-height: 0.98; letter-spacing: -0.02em;
    margin: 0;
  }
  .cine .display .it { font-style: italic; color: var(--accent); }
  .cine .caption {
    margin-top: 30px; font-size: 14px; letter-spacing: 0.04em;
    color: var(--soft); line-height: 1.7; max-width: 46ch;
    margin-left: auto; margin-right: auto;
  }

  /* ---------- SCENE 0 · title ---------- */
  .cine #s0 { background: radial-gradient(120% 90% at 50% 40%, #16141b 0%, #08070a 70%); }
  .cine #s0 .credit { font-size: 12px; letter-spacing: 0.34em; text-transform: uppercase; color: var(--muted); margin-bottom: 34px; }
  .cine #s0 .name { font-family: 'Instrument Serif', serif; font-size: clamp(52px, 11vw, 168px); line-height: 0.9; letter-spacing: -0.02em; margin: 0; }
  .cine #s0 .name .row2 { display: block; font-style: italic; color: var(--accent); }
  .cine #s0 .tagline { margin-top: 30px; font-size: 13px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--soft); }
  .cine .scroll-hint {
    position: absolute; left: 50%; transform: translateX(-50%);
    bottom: calc(var(--bar) + 40px);
    font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--muted);
    display: flex; flex-direction: column; align-items: center; gap: 8px; z-index: 6;
  }
  .cine .scroll-hint .line { width: 1px; height: 30px; background: linear-gradient(var(--accent), transparent); animation: cine-drip 1.8s ease-in-out infinite; transform-origin: top; }
  @keyframes cine-drip { 0%,100%{ transform: scaleY(0.3); opacity: 0.4 } 50%{ transform: scaleY(1); opacity: 1 } }
  @media (max-height: 640px) { .cine .scroll-hint { display: none; } }

  /* ---------- SCENE 1 · departure ---------- */
  .cine #s1 { background: linear-gradient(180deg, #1a1117 0%, #0c0b0f 60%); }
  .cine .runway {
    position: absolute; left: 0; right: 0; bottom: 18%;
    height: 1px; background: linear-gradient(90deg, transparent, var(--soft) 30%, var(--soft) 70%, transparent);
    opacity: 0; transition: opacity 1.2s ease 0.3s;
  }
  .cine .scene.is-active .runway { opacity: 0.35; }
  .cine .runway::after {
    content: ""; position: absolute; left: 10%; right: 10%; top: 0;
    border-top: 1px dashed var(--accent); opacity: 0.5;
  }

  /* ---------- SCENE 2 · the crossing ---------- */
  .cine #s2 { background: radial-gradient(140% 120% at 20% 90%, #15131c, #08070b 70%); }
  .cine .map-wrap { position: absolute; inset: 0; display: grid; place-items: center; z-index: 1; }
  .cine .map { width: min(94vw, 1040px); height: auto; }
  .cine .arc-path { fill: none; stroke: var(--line); stroke-width: 1.5; }
  .cine .arc-draw {
    fill: none; stroke: var(--accent); stroke-width: 2;
    stroke-dasharray: 1; stroke-dashoffset: 1;
    transition: stroke-dashoffset 2.6s cubic-bezier(.5,0,.2,1) 0.3s;
  }
  .cine .scene.is-active .arc-draw { stroke-dashoffset: 0; }
  .cine .pin { fill: var(--ink); }
  .cine .pin-label { fill: var(--soft); font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.1em; }
  .cine .plane {
    offset-path: path('M150,330 Q520,70 880,250');
    offset-rotate: auto;
    offset-distance: 0%;
    transition: offset-distance 2.6s cubic-bezier(.5,0,.2,1) 0.3s;
    fill: var(--ink);
  }
  .cine .scene.is-active .plane { offset-distance: 100%; }
  .cine .km {
    position: absolute; bottom: 16%; left: 50%; transform: translateX(-50%);
    font-size: 12px; letter-spacing: 0.2em; color: var(--soft); z-index: 4;
  }
  .cine .km b { color: var(--accent); font-weight: 500; font-size: 16px; }

  /* ---------- SCENE 3 · arrival / shimane ---------- */
  .cine #s3 { background: linear-gradient(180deg, #2a1620 0%, #140a12 45%, #0a0710 100%); }
  .cine .sun {
    position: absolute; left: 50%; bottom: 30%;
    width: min(46vw, 420px); aspect-ratio: 1; border-radius: 50%;
    background: radial-gradient(circle at 50% 50%, var(--accent), color-mix(in oklab, var(--accent) 60%, #3a0d12));
    transform: translate(-50%, 60%) scale(0.6); opacity: 0;
    transition: transform 1.8s cubic-bezier(.16,1,.3,1) 0.2s, opacity 1.4s ease 0.2s;
    box-shadow: 0 0 120px 30px color-mix(in oklab, var(--accent) 40%, transparent);
    z-index: 1;
  }
  .cine .scene.is-active .sun { transform: translate(-50%, 12%) scale(1); opacity: 1; }
  .cine .sea {
    position: absolute; left: 0; right: 0; bottom: 0; height: 30%;
    background: linear-gradient(180deg, color-mix(in oklab, var(--accent) 14%, #0a0710), #06040a);
    z-index: 2;
  }
  .cine .sea::before {
    content: ""; position: absolute; left: 0; right: 0; top: 0; height: 1px;
    background: color-mix(in oklab, var(--accent) 60%, transparent);
  }
  .cine #s3 .kanji {
    position: absolute; top: 14%; left: 50%; transform: translateX(-50%);
    font-family: 'Noto Serif JP', serif; font-weight: 700;
    font-size: clamp(60px, 13vw, 200px); color: var(--ink);
    opacity: 0; transition: opacity 1.4s ease 0.6s; z-index: 3; letter-spacing: 0.1em;
  }
  .cine #s3.is-active .kanji { opacity: 0.92; }
  .cine #s3 .scene-inner { z-index: 4; margin-top: auto; align-self: end; padding-bottom: 6vh; }

  /* ---------- SCENE 4 · the craft / ruby ---------- */
  .cine #s4 { background: radial-gradient(120% 100% at 80% 30%, #1b1016, #09070b 70%); }
  .cine .gem {
    width: 128px; height: auto; margin: 0 auto 34px; display: block;
    transform: translateY(24px) scale(0.6); opacity: 0;
    transition: transform 1.2s cubic-bezier(.16,1,.3,1), opacity 0.9s ease;
    filter: drop-shadow(0 10px 40px color-mix(in oklab, var(--accent) 55%, transparent));
  }
  .cine .scene.is-active .gem { transform: translateY(0) scale(1); opacity: 1; }
  .cine .gem .shine { animation: cine-shimmer 3.4s ease-in-out infinite; transform-origin: center; }
  @keyframes cine-shimmer { 50% { opacity: 0.55; } }

  /* ---------- SCENE 5 · the stage ---------- */
  .cine #s5 { background: #060509; }
  .cine .spot {
    position: absolute; top: -10%; left: 50%; transform: translateX(-50%);
    width: 0; height: 0;
    border-left: 28vw solid transparent; border-right: 28vw solid transparent;
    border-bottom: 92vh solid color-mix(in oklab, var(--gold) 16%, transparent);
    filter: blur(28px); opacity: 0;
    transition: opacity 1.4s ease 0.2s; z-index: 1;
  }
  .cine .scene.is-active .spot { opacity: 1; }
  .cine .stage-floor {
    position: absolute; bottom: 0; left: 0; right: 0; height: 22%;
    background: radial-gradient(60% 120% at 50% 0%, color-mix(in oklab, var(--gold) 18%, transparent), transparent 70%);
    z-index: 1;
  }
  .cine .talks-line { display: flex; gap: 40px; justify-content: center; margin-top: 30px; flex-wrap: wrap; }
  .cine .talk-item { text-align: center; }
  .cine .talk-item .yr { font-family: 'Instrument Serif', serif; font-style: italic; font-size: 40px; color: var(--gold); line-height: 1; }
  .cine .talk-item .pl { font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--soft); margin-top: 8px; }

  /* ---------- SCENE 6 · now ---------- */
  .cine #s6 { background: radial-gradient(120% 110% at 50% 120%, #161019, #08070b 70%); }
  .cine .stack-row { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 36px; }
  .cine .stack-row .chip {
    font-size: 12px; letter-spacing: 0.08em; color: var(--soft);
    padding: 7px 16px; border: 1px solid var(--line); border-radius: 100px;
  }
  .cine .stack-row .chip.hl { color: var(--accent); border-color: color-mix(in oklab, var(--accent) 45%, var(--line)); }

  /* ---------- SCENE 7 · selected work ---------- */
  .cine #s7 { background: radial-gradient(120% 100% at 50% 0%, #141019, #08070b 70%); }
  .cine #s7 .scene-inner { max-width: 820px; }
  .cine .work-list { margin-top: 30px; text-align: left; }
  .cine .work-item {
    display: grid; grid-template-columns: 34px 1fr auto; gap: 18px;
    align-items: baseline; padding: 16px 6px; border-top: 1px solid var(--line);
    transition: background 0.25s ease, padding-left 0.25s ease;
  }
  .cine .work-item:last-child { border-bottom: 1px solid var(--line); }
  .cine .work-item:hover { background: linear-gradient(90deg, color-mix(in oklab, var(--accent) 9%, transparent), transparent 60%); padding-left: 14px; }
  .cine .work-num { color: var(--muted); font-size: 12px; letter-spacing: 0.1em; }
  .cine .work-main { min-width: 0; }
  .cine .work-title {
    font-family: 'Instrument Serif', serif; font-size: clamp(22px, 3vw, 34px);
    color: var(--ink); line-height: 1.05;
  }
  .cine .work-title .dom { color: var(--muted); font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.06em; margin-left: 10px; }
  .cine .work-desc { color: var(--soft); font-size: 13px; line-height: 1.6; margin-top: 8px; }
  .cine .work-stack { margin-top: 10px; color: var(--muted); font-size: 11px; letter-spacing: 0.06em; }
  .cine .work-stack i { color: var(--line); font-style: normal; margin: 0 7px; }
  .cine .work-arrow { color: var(--muted); font-size: 16px; align-self: center; transition: color 0.25s, transform 0.25s; }
  .cine .work-item:hover .work-arrow { color: var(--accent); transform: translateX(3px); }
  @media (max-width: 640px) {
    .cine .work-item { grid-template-columns: 24px 1fr; }
    .cine .work-arrow { display: none; }
  }

  /* ---------- SCENE 8 · end credits ---------- */
  .cine #s8 { background: #050407; }
  .cine .credits { text-align: center; }
  .cine .credits .fin {
    font-family: 'Instrument Serif', serif; font-style: italic;
    font-size: clamp(60px, 12vw, 160px); color: var(--ink); margin-bottom: 8px;
  }
  .cine .credits .sub { font-size: 12px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--muted); margin-bottom: 48px; }
  .cine .credits-links { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
  .cine .credits-links a {
    font-size: 13px; letter-spacing: 0.1em; color: var(--soft);
    padding: 12px 22px; border: 1px solid var(--line); border-radius: 100px;
    transition: border-color 0.2s, color 0.2s, background 0.2s;
  }
  .cine .credits-links a:hover { color: #000; background: var(--accent); border-color: var(--accent); }
  .cine .credits .roll { margin-top: 44px; font-size: 11px; letter-spacing: 0.14em; color: var(--muted); line-height: 2.2; text-transform: uppercase; }
  .cine .credits .roll b { color: var(--soft); font-weight: 400; }

  /* replay */
  .cine .replay {
    margin-top: 40px; display: inline-flex; align-items: center; gap: 10px;
    font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted);
    cursor: pointer; pointer-events: auto; background: none; border: none; font-family: inherit;
    transition: color 0.2s;
  }
  .cine .replay:hover { color: var(--accent); }

  @media (max-width: 640px) {
    .cine { --bar: 5vh; }
    .cine .ui-top, .cine .ui-chapter, .cine .scrubber { padding-left: 16px; padding-right: 16px; }
    .cine .scrubber { left: 16px; right: 16px; }
    .cine .km { bottom: 12%; }
  }

  /* tweaks panel */
  .cine .tweaks-host { position: fixed; bottom: calc(var(--bar) + 16px); right: 16px; z-index: 60; }
  .cine .tw-panel {
    background: #0e0d12; border: 1px solid #2a2731; color: #f3ede1;
    font-family: 'IBM Plex Mono', monospace; font-size: 12px; padding: 16px 18px;
    min-width: 236px; box-shadow: 0 16px 40px rgba(0,0,0,0.6);
  }
  .cine .tw-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
  .cine .tw-label { letter-spacing: 0.12em; text-transform: uppercase; color: #6f685c; font-size: 11px; }
  .cine .tw-close { background: none; border: none; color: #6f685c; cursor: pointer; font-family: inherit; font-size: 14px; }
  .cine .tw-sub { color: #6f685c; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 8px; }
  .cine .tw-swatches { display: flex; gap: 8px; }
  .cine .tw-swatch { flex: 1; aspect-ratio: 1; outline: 1px solid #2a2731; cursor: pointer; padding: 0; }
  .cine .tw-toggles { display: flex; gap: 8px; }
  .cine .tw-toggle { flex: 1; padding: 8px; border: 1px solid #2a2731; font-family: inherit; font-size: 11px; cursor: pointer; letter-spacing: 0.06em; }
  .cine .tw-open {
    background: #0e0d12; border: 1px solid #2a2731; color: #b3ab9b;
    font-family: 'IBM Plex Mono', monospace; font-size: 11px; padding: 8px 12px;
    cursor: pointer; letter-spacing: 0.12em; text-transform: uppercase;
  }
`;

const SCENES = [
  { id: "s0", ch: "CH·00", name: "Title" },
  { id: "s1", ch: "CH·01", name: "Departure" },
  { id: "s2", ch: "CH·01", name: "The Crossing" },
  { id: "s3", ch: "CH·01", name: "Arrival" },
  { id: "s4", ch: "CH·02", name: "The Craft" },
  { id: "s5", ch: "CH·03", name: "The Stage" },
  { id: "s6", ch: "CH·04", name: "Now" },
  { id: "s7", ch: "CH·05", name: "Selected Work" },
  { id: "s8", ch: "CH·06", name: "Fin" },
];

const PROJECTS = [
  {
    num: "01",
    name: "MoneyProphet",
    domain: "fintech · side project",
    desc: "AI-powered personal finance app. Budget tracking, expense forecasting, and spending insights. Built end-to-end — Rails backend, React frontend, and ML pipeline.",
    stack: ["ruby on rails", "react", "mysql", "google ai"],
    href: "/dashboard",
    external: false,
  },
  {
    num: "02",
    name: "Jarit",
    domain: "ios · side project",
    desc: "A reverse expense tracker — instead of logging what you spent, you log what you saved. Flips the mental model of budgeting.",
    stack: ["react native", "firebase"],
    href: "https://apps.apple.com/jp/app/jarit/id6758780320?l=en-US",
    external: true,
  },
  {
    num: "03",
    name: "JNews",
    domain: "edtech · side project",
    desc: "News content for JLPT learners under 200 words. Real Japanese news, simplified and annotated for language learners.",
    stack: ["react", "firebase", "google ai"],
    href: "https://jnews.site",
    external: true,
  },
];

export default function HomeContainer() {
  const rootRef = useRef(null);
  const fillRef = useRef(null);
  const idxRef = useRef(0);

  const [accent, setAccent] = useState("vermilion");
  const [grain, setGrain] = useState("on");
  const [letterbox, setLetterbox] = useState("on");
  const [panelOpen, setPanelOpen] = useState(false);
  const [tc, setTc] = useState("00:00:00");
  const [chapter, setChapter] = useState(SCENES[0]);

  // load the design's web fonts once
  useEffect(() => {
    const id = "cine-fonts";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400;500&family=Noto+Serif+JP:wght@400;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  // scroll-driven scene activation (document-level scroll)
  useEffect(() => {
    document.documentElement.classList.add("cine-scroll");
    const scroller = document.scrollingElement || document.documentElement;
    const scenes = () => Array.from(rootRef.current?.querySelectorAll(".scene") || []);

    const activeIndex = () => {
      const h = window.innerHeight || 1;
      const i = Math.round((scroller.scrollTop || 0) / h);
      return Math.max(0, Math.min(SCENES.length - 1, Number.isFinite(i) ? i : 0));
    };

    const updateUI = () => {
      const max = scroller.scrollHeight - (window.innerHeight || 0);
      const p = max > 0 ? (scroller.scrollTop || 0) / max : 0;
      const active = activeIndex();
      idxRef.current = active;
      setChapter(SCENES[active]);
      if (fillRef.current) fillRef.current.style.width = `${(p * 100).toFixed(1)}%`;
      const t = Math.round(p * RUNTIME);
      const mm = String(Math.floor(t / 60)).padStart(2, "0");
      const ss = String(t % 60).padStart(2, "0");
      setTc(`00:${mm}:${ss}`);
    };

    const activateUpTo = (i) => {
      const list = scenes();
      for (let k = 0; k <= i; k += 1) {
        if (list[k]) list[k].classList.add("is-active");
      }
    };

    const onScroll = () => {
      updateUI();
      activateUpTo(activeIndex());
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateUI, { passive: true });

    const onKey = (e) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goTo(idxRef.current + 1);
      }
      if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goTo(idxRef.current - 1);
      }
    };
    const goTo = (i) => {
      idxRef.current = Math.max(0, Math.min(SCENES.length - 1, i));
      window.scrollTo({ top: idxRef.current * window.innerHeight, behavior: "smooth" });
    };
    window.addEventListener("keydown", onKey);

    // Initial paint shows the hidden state; activate scene 0 on a later tick so its
    // entrance animation starts from a committed frame.
    updateUI();
    const first = setTimeout(() => {
      const list = scenes();
      if (list[0]) list[0].classList.add("is-active");
    }, 90);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateUI);
      window.removeEventListener("keydown", onKey);
      clearTimeout(first);
      document.documentElement.classList.remove("cine-scroll");
    };
  }, []);

  const replay = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div
      className="cine"
      ref={rootRef}
      data-accent={accent === "vermilion" ? "" : accent}
      data-grain={grain}
      data-letterbox={letterbox}
    >
      <style>{CSS}</style>

      {/* cinematic frame */}
      <div className="grain" aria-hidden="true" />
      <div className="letterbox top" />
      <div className="letterbox bot" />

      {/* film UI */}
      <div className="film-ui ui-top">
        <span className="rec">
          <span className="dot" /> Rec
        </span>
        <span className="tc">{tc}</span>
      </div>
      <div className="film-ui ui-chapter">
        <span className="ch-no">{chapter.ch}</span>
        <span className="ch-name">{chapter.name}</span>
      </div>
      <div className="scrubber">
        <div className="fill" ref={fillRef} />
        <div className="ticks">
          {SCENES.map((s) => (
            <i key={s.id} />
          ))}
        </div>
      </div>

      {/* reel */}
      <main className="reel">
        {/* 0 · TITLE */}
        <section className="scene" id="s0" data-ch="CH·00" data-name="Title">
          <div className="scene-inner">
            <div className="credit fade">Developer &nbsp;·&nbsp; Product Lead</div>
            <h1 className="name">
              <span className="kin">
                <span>Paul Joe</span>
              </span>
              <span className="kin row2">
                <span>George</span>
              </span>
            </h1>
            <div className="tagline fade">Kochi, India &nbsp;→&nbsp; Tokyo, Japan</div>
          </div>
          <div className="scroll-hint fade">
            Scroll
            <div className="line" />
          </div>
        </section>

        {/* 1 · DEPARTURE */}
        <section className="scene" id="s1" data-ch="CH·01" data-name="Departure">
          <div className="runway" />
          <div className="scene-inner">
            <div className="eyebrow fade">Chapter One — Departure</div>
            <h2 className="display">
              <span className="kin">
                <span>It started</span>
              </span>
              <span className="kin">
                <span>
                  in <em className="it">India</em>.
                </span>
              </span>
            </h2>
            <p className="caption fade">
              A B.Tech student in Information Technology from Kochi, Kerala — one two-week
              internship offer, and a one-way curiosity about a country on the other side of the
              map.
            </p>
          </div>
        </section>

        {/* 2 · THE CROSSING */}
        <section className="scene" id="s2" data-ch="CH·01" data-name="The Crossing">
          <div className="map-wrap">
            <svg className="map" viewBox="0 0 1000 420" fill="none" aria-hidden="true">
              <path className="arc-path" d="M150,330 Q520,70 880,250" />
              <path className="arc-draw" d="M150,330 Q520,70 880,250" pathLength="1" />
              <circle className="pin" cx="150" cy="330" r="5" />
              <text className="pin-label" x="150" y="360" textAnchor="middle">
                KOCHI
              </text>
              <circle className="pin" cx="880" cy="250" r="5" />
              <text className="pin-label" x="880" y="280" textAnchor="middle">
                SHIMANE
              </text>
              <path className="plane" d="M0,-9 L11,7 L0,3 L-11,7 Z" />
            </svg>
          </div>
          <div className="scene-inner">
            <h2 className="display" style={{ fontSize: "clamp(32px,5.5vw,76px)" }}>
              <span className="kin">
                <span>An ocean,</span>
              </span>
              <span className="kin">
                <span>
                  <em className="it">crossed</em>.
                </span>
              </span>
            </h2>
          </div>
          <div className="km fade">
            ≈ <b>7,000 km</b> &nbsp;·&nbsp; Kochi, India to Shimane, Japan
          </div>
        </section>

        {/* 3 · ARRIVAL */}
        <section className="scene" id="s3" data-ch="CH·01" data-name="Arrival">
          <div className="kanji" aria-hidden="true">
            島根
          </div>
          <div className="sun" />
          <div className="sea" />
          <div className="scene-inner">
            <div className="eyebrow fade" style={{ color: "var(--gold)" }}>
              Shimane, Japan
            </div>
            <h2 className="display" style={{ fontSize: "clamp(36px,6vw,84px)" }}>
              <span className="kin">
                <span>Arrival.</span>
              </span>
            </h2>
            <p className="caption fade">Just two weeks as an intern — enough to know I&rsquo;d be back.</p>
          </div>
        </section>

        {/* 4 · THE CRAFT */}
        <section className="scene" id="s4" data-ch="CH·02" data-name="The Craft">
          <div className="scene-inner">
            <svg className="gem" viewBox="0 0 128 116" aria-hidden="true">
              <defs>
                <linearGradient id="rubyG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#ff8174" />
                  <stop offset="0.45" stopColor="#d61f2b" />
                  <stop offset="1" stopColor="#7d0f17" />
                </linearGradient>
              </defs>
              <polygon points="6,44 36,6 92,6 122,44 64,110" fill="url(#rubyG)" />
              <polygon className="shine" points="36,6 64,6 46,44" fill="#fff" opacity="0.3" />
              <g fill="none" stroke="rgba(255,255,255,0.42)" strokeWidth="1.4" strokeLinejoin="round">
                <path d="M6,44 H122" />
                <path d="M36,6 L46,44 M92,6 L82,44 M64,6 L46,44 M64,6 L82,44" />
                <path d="M6,44 L64,110 M122,44 L64,110 M46,44 L64,110 M82,44 L64,110" />
              </g>
              <polygon
                points="6,44 36,6 92,6 122,44 64,110"
                fill="none"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
            <div className="eyebrow fade">Chapter Two — The Craft</div>
            <h2 className="display" style={{ fontSize: "clamp(34px,5.5vw,80px)" }}>
              <span className="kin">
                <span>Backend engineer,</span>
              </span>
              <span className="kin">
                <span>
                  built in <em className="it">Ruby</em>.
                </span>
              </span>
            </h2>
            <p className="caption fade">
              After graduating I returned to Japan and joined{" "}
              <a
                href="https://monstar-lab.com/jp_en"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--ink)", fontWeight: 500, borderBottom: "1px solid var(--line)" }}
              >
                Monstar Lab Inc.
              </a>{" "}
              — shipping
              several Ruby projects, training university students, and learning Japanese along the
              way.
            </p>
            <div className="stack-row fade">
              <span className="chip hl">Ruby</span>
              <span className="chip">Ruby on Rails</span>
              <span className="chip">mruby/c</span>
              <span className="chip">JavaScript</span>
              <span className="chip">AWS</span>
              <span className="chip">Mentoring</span>
              <span className="chip">日本語</span>
            </div>
          </div>
        </section>

        {/* 5 · THE STAGE */}
        <section className="scene" id="s5" data-ch="CH·03" data-name="The Stage">
          <div className="spot" />
          <div className="stage-floor" />
          <div className="scene-inner">
            <div className="eyebrow fade" style={{ color: "var(--gold)" }}>
              Chapter Three — The Stage
            </div>
            <h2 className="display" style={{ fontSize: "clamp(34px,5.5vw,80px)" }}>
              <span className="kin">
                <span>Then I took it</span>
              </span>
              <span className="kin">
                <span>
                  to the{" "}
                  <em className="it" style={{ color: "var(--gold)" }}>
                    stage
                  </em>
                  .
                </span>
              </span>
            </h2>
            <div className="talks-line fade">
              <a
                className="talk-item"
                href="https://ruby.id/conf/2019/index.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="yr">’19</div>
                <div className="pl">RubyConf · Indonesia</div>
              </a>
              <a
                className="talk-item"
                href="https://www.rubyconf.org.au/2020"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="yr">’20</div>
                <div className="pl">RubyConf · Australia</div>
              </a>
            </div>
          </div>
        </section>

        {/* 6 · NOW */}
        <section className="scene" id="s6" data-ch="CH·04" data-name="Now">
          <div className="scene-inner">
            <div className="eyebrow fade">Chapter Four — Tokyo, Now</div>
            <h2 className="display" style={{ fontSize: "clamp(34px,6vw,92px)" }}>
              <span className="kin">
                <span>Full-stack.</span>
              </span>
              <span className="kin">
                <span>
                  <em className="it">Leading</em> products.
                </span>
              </span>
            </h2>
            <p className="caption fade">
              Moved to Tokyo and joined{" "}
              <a
                href="https://receptionist.co.jp/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--ink)", fontWeight: 500, borderBottom: "1px solid var(--line)" }}
              >
                RECEPTIONIST Inc.
              </a>{" "}
              as a full-stack developer. Today I lead{" "}
              <b style={{ color: "var(--ink)", fontWeight: 500 }}>4 products</b> — 3 of them built
              from{" "}
              <em className="it" style={{ color: "var(--accent)" }}>
                0&nbsp;→&nbsp;1
              </em>
              .
            </p>
            <div className="stack-row fade">
              <span className="chip hl">Ruby on Rails</span>
              <span className="chip">React</span>
              <span className="chip">TypeScript</span>
              <span className="chip">AWS</span>
              <span className="chip">OpenID</span>
              <span className="chip">AI</span>
              <span className="chip hl">Product Lead</span>
              <span className="chip">0 → 1</span>
              <span className="chip">Team Management</span>
            </div>
          </div>
        </section>

        {/* 7 · SELECTED WORK */}
        <section className="scene" id="s7" data-ch="CH·05" data-name="Selected Work">
          <div className="scene-inner">
            <div className="eyebrow fade">Chapter Five — On the Side</div>
            <h2 className="display" style={{ fontSize: "clamp(30px,5vw,68px)" }}>
              <span className="kin">
                <span>
                  Selected <em className="it">work</em>.
                </span>
              </span>
            </h2>
            <div className="work-list fade">
              {PROJECTS.map((p) => (
                <a
                  key={p.num}
                  className="work-item"
                  href={p.href}
                  {...(p.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <span className="work-num">{p.num}</span>
                  <div className="work-main">
                    <div className="work-title">
                      {p.name}
                      <span className="dom">{p.domain}</span>
                    </div>
                    <div className="work-desc">{p.desc}</div>
                    <div className="work-stack">
                      {p.stack.map((s, i) => (
                        <span key={s}>
                          {i > 0 && <i>·</i>}
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="work-arrow">→</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 8 · CREDITS */}
        <section className="scene" id="s8" data-ch="CH·06" data-name="Fin">
          <div className="scene-inner credits">
            <div className="kin fin">
              <span>fin.</span>
            </div>
            <div className="sub fade">Let&rsquo;s build something together</div>
            <div className="credits-links fade">
              <a href={LinkedinUrl} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={GithubUrl} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href="https://x.com/pauljoegeorge" target="_blank" rel="noopener noreferrer">
                X
              </a>
            </div>
            <div className="roll fade">
              <div>
                <b>Written &amp; engineered by</b> &nbsp;Paul Joe George
              </div>
              <div>
                <b>On location</b> &nbsp;Kochi · Shimane · Tokyo
              </div>
              <div>
                <b>Featuring</b> &nbsp;Ruby on Rails · React · TypeScript · AWS · Product Management
              </div>
              <div>
                <b>Runtime</b> &nbsp;2017 — present
              </div>
            </div>
            <button type="button" className="replay fade" onClick={replay}>
              ↺ Replay from the top
            </button>
          </div>
        </section>
      </main>

      {/* tweaks panel */}
      <div className="tweaks-host">
        {panelOpen ? (
          <div className="tw-panel">
            <div className="tw-row">
              <span className="tw-label">Tweaks</span>
              <button type="button" className="tw-close" onClick={() => setPanelOpen(false)}>
                ✕
              </button>
            </div>
            <div style={{ marginBottom: "14px" }}>
              <div className="tw-sub">accent</div>
              <div className="tw-swatches">
                {ACCENTS.map((a) => (
                  <button
                    type="button"
                    key={a}
                    title={a}
                    aria-label={`Accent ${a}`}
                    className="tw-swatch"
                    onClick={() => setAccent(a)}
                    style={{
                      background: SWATCH[a],
                      border: `2px solid ${accent === a ? "#f3ede1" : "transparent"}`,
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="tw-toggles">
              <button
                type="button"
                className="tw-toggle"
                onClick={() => setGrain((g) => (g === "on" ? "off" : "on"))}
                style={{
                  background: grain === "on" ? "#f3ede1" : "transparent",
                  color: grain === "on" ? "#0e0d12" : "#b3ab9b",
                }}
              >
                GRAIN
              </button>
              <button
                type="button"
                className="tw-toggle"
                onClick={() => setLetterbox((l) => (l === "on" ? "off" : "on"))}
                style={{
                  background: letterbox === "on" ? "#f3ede1" : "transparent",
                  color: letterbox === "on" ? "#0e0d12" : "#b3ab9b",
                }}
              >
                BARS
              </button>
            </div>
          </div>
        ) : (
          <button type="button" className="tw-open" onClick={() => setPanelOpen(true)}>
            ⚙ Tweaks
          </button>
        )}
      </div>
    </div>
  );
}
