import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock, 
  Code2, 
  FileCode2, 
  ShieldCheck, 
  Layers, 
  CheckCircle2
} from 'lucide-react';

/* ─────────────────────────────────────────────
   Flat SVG Illustration — Engineering Workspace
   Clean developer workstation with natural human animations:
   typing hands, nodding focus, coffee steam, swaying plant,
   and live monitor screen activity.
   ───────────────────────────────────────────── */
function WorkspaceIllustration() {
  return (
    <svg
      viewBox="0 0 520 395"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="hero-illustration"
      aria-hidden="true"
    >
      {/* ── Background Ambient Geometric Shapes ── */}
      <circle className="bg-shape-1" cx="440" cy="72" r="64" fill="#F1F5F9" />
      <circle className="bg-shape-2" cx="60" cy="350" r="44" fill="#F8FAFC" />
      <rect className="bg-shape-3" x="20" y="100" width="28" height="28" rx="6" fill="#F1F5F9" opacity="0.7" transform="rotate(12 34 114)" />
      <rect className="bg-shape-4" x="475" y="300" width="20" height="20" rx="4" fill="#F1F5F9" opacity="0.6" transform="rotate(-8 485 310)" />

      {/* ── Desk Structure ── */}
      <rect x="60" y="295" width="400" height="14" rx="5" fill="#003153" />
      <rect x="90" y="309" width="12" height="70" rx="3" fill="#003153" />
      <rect x="418" y="309" width="12" height="70" rx="3" fill="#003153" />
      <rect x="96" y="355" width="328" height="6" rx="3" fill="#002240" />

      {/* ── Main Monitor Display ── */}
      <rect x="155" y="130" width="210" height="150" rx="10" fill="#0F172A" />
      <rect x="163" y="138" width="194" height="126" rx="6" fill="#F8FAFC" />
      {/* Stand */}
      <rect x="240" y="280" width="40" height="18" rx="2" fill="#0F172A" />
      <rect x="222" y="290" width="76" height="8" rx="4" fill="#0F172A" />

      {/* ── Screen UI Content ── */}
      {/* Top window bar */}
      <rect x="171" y="146" width="178" height="14" rx="3" fill="#003153" />
      {/* Live build ping indicator on monitor */}
      <circle className="screen-live-ping" cx="182" cy="153" r="3" fill="#10B981" />
      <rect x="192" y="151" width="28" height="4" rx="1" fill="#FFFFFF" opacity="0.6" />
      <rect x="226" y="151" width="20" height="4" rx="1" fill="#FFFFFF" opacity="0.4" />
      <rect x="252" y="151" width="24" height="4" rx="1" fill="#FFFFFF" opacity="0.4" />

      {/* Screen Sidebar */}
      <rect x="171" y="164" width="44" height="92" rx="3" fill="#F1F5F9" />
      <rect x="178" y="172" width="30" height="4" rx="1" fill="#003153" opacity="0.7" />
      <rect x="178" y="182" width="24" height="3" rx="1" fill="#94A3B8" />
      <rect x="178" y="190" width="28" height="3" rx="1" fill="#94A3B8" />
      <rect x="178" y="198" width="20" height="3" rx="1" fill="#94A3B8" />
      <rect x="178" y="210" width="30" height="4" rx="1" fill="#003153" opacity="0.7" />
      <rect x="178" y="220" width="26" height="3" rx="1" fill="#94A3B8" />
      <rect x="178" y="228" width="22" height="3" rx="1" fill="#94A3B8" />
      <rect x="178" y="240" width="18" height="3" rx="1" fill="#059669" opacity="0.7" />

      {/* Main Screen Panels / Cards */}
      <rect x="222" y="168" width="66" height="42" rx="5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
      <rect x="230" y="176" width="32" height="4" rx="1" fill="#003153" />
      <rect x="230" y="184" width="50" height="3" rx="1" fill="#CBD5E1" />
      <rect x="230" y="191" width="42" height="3" rx="1" fill="#CBD5E1" />
      <rect x="230" y="199" width="22" height="7" rx="2.5" fill="#F59E0B" />

      <rect x="294" y="168" width="56" height="42" rx="5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
      <rect x="302" y="176" width="28" height="4" rx="1" fill="#003153" />
      <rect x="302" y="184" width="40" height="3" rx="1" fill="#CBD5E1" />
      <rect x="302" y="191" width="32" height="3" rx="1" fill="#CBD5E1" />
      <rect x="302" y="199" width="24" height="7" rx="2.5" fill="#059669" />

      {/* Screen Analytics / Code Execution Chart */}
      <rect x="222" y="216" width="128" height="36" rx="5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
      <rect x="230" y="222" width="38" height="4" rx="1" fill="#003153" />
      {/* Animated Activity Bars */}
      <rect x="234" y="238" width="8" height="8" rx="1.5" fill="#003153" opacity="0.7" />
      <rect x="246" y="234" width="8" height="12" rx="1.5" fill="#003153" opacity="0.7" />
      <rect className="chart-bar-accent" x="258" y="230" width="8" height="16" rx="1.5" fill="#F59E0B" />
      <rect x="270" y="236" width="8" height="10" rx="1.5" fill="#003153" opacity="0.7" />
      <rect className="chart-bar-accent-3" x="282" y="232" width="8" height="14" rx="1.5" fill="#1D63FF" />
      <rect className="chart-bar-accent-2" x="294" y="228" width="8" height="18" rx="1.5" fill="#059669" />
      <rect x="306" y="233" width="8" height="13" rx="1.5" fill="#003153" opacity="0.7" />
      <rect x="318" y="236" width="8" height="10" rx="1.5" fill="#003153" opacity="0.5" />
      <rect x="330" y="231" width="8" height="15" rx="1.5" fill="#003153" opacity="0.7" />

      {/* Screen Cursor (Typing Blink) */}
      <rect className="screen-cursor" x="338" y="151" width="2" height="8" rx="0.5" fill="#38BDF8" />

      {/* ── Person: Professional Software Architect ── */}
      {/* Ergonomic Chair */}
      <rect x="380" y="198" width="56" height="12" rx="6" fill="#475569" />
      <rect x="382" y="210" width="4" height="48" rx="2" fill="#475569" />
      <rect x="430" y="210" width="4" height="48" rx="2" fill="#475569" />
      <rect x="386" y="255" width="44" height="12" rx="5" fill="#334155" />
      <rect x="404" y="267" width="8" height="30" rx="2" fill="#64748B" />
      <circle cx="396" cy="300" r="5" fill="#475569" />
      <circle cx="420" cy="300" r="5" fill="#475569" />

      {/* Developer Body / Torso */}
      <rect x="392" y="210" width="32" height="48" rx="10" fill="#003153" />
      <path d="M404 210 L408 220 L412 210" fill="#002240" />

      {/* Developer Head with Focus Nod Motion */}
      <g className="dev-head-nod">
        {/* Head */}
        <circle cx="408" cy="188" r="24" fill="#F0C8A0" />
        {/* Hair */}
        <path d="M384 180 Q392 155 408 152 Q424 155 432 180" fill="#1E293B" />
        <ellipse cx="408" cy="170" rx="19" ry="7" fill="#1E293B" />
        {/* Ear */}
        <ellipse cx="384" cy="190" rx="4" ry="6" fill="#E8B090" />
        {/* Glasses */}
        <rect x="395" y="184" width="11" height="9" rx="3.5" fill="none" stroke="#334155" strokeWidth="1.5" />
        <rect x="410" y="184" width="11" height="9" rx="3.5" fill="none" stroke="#334155" strokeWidth="1.5" />
        <line x1="406" y1="188" x2="410" y2="188" stroke="#334155" strokeWidth="1" />
        <line x1="395" y1="188" x2="389" y2="186" stroke="#334155" strokeWidth="1" />
        {/* Smile */}
        <path d="M402 197 Q408 201 414 197" stroke="#C08060" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      </g>

      {/* Arms & Sleeves */}
      <path d="M392 224 Q374 244 368 270 Q366 280 372 282" stroke="#F0C8A0" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M424 224 Q436 244 436 270 Q435 280 428 282" stroke="#F0C8A0" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M392 224 Q380 236 376 244" stroke="#003153" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M424 224 Q432 236 434 244" stroke="#003153" strokeWidth="9" strokeLinecap="round" fill="none" />

      {/* Hands with Typing Motion on Keyboard */}
      <g className="dev-typing-hands">
        <circle className="hand-left" cx="372" cy="283" r="6" fill="#F0C8A0" />
        <circle className="hand-right" cx="428" cy="283" r="6" fill="#F0C8A0" />
      </g>

      {/* Keyboard on Desk */}
      <rect x="350" y="284" width="100" height="10" rx="3" fill="#334155" />
      <rect x="355" y="286" width="90" height="6" rx="2" fill="#475569" />
      {/* Key rows */}
      <rect x="358" y="287" width="4" height="3" rx="0.5" fill="#64748B" />
      <rect x="364" y="287" width="4" height="3" rx="0.5" fill="#64748B" />
      <rect x="370" y="287" width="4" height="3" rx="0.5" fill="#64748B" />
      <rect x="376" y="287" width="4" height="3" rx="0.5" fill="#64748B" />
      <rect x="382" y="287" width="4" height="3" rx="0.5" fill="#64748B" />
      <rect x="388" y="287" width="4" height="3" rx="0.5" fill="#64748B" />
      <rect x="394" y="287" width="16" height="3" rx="0.5" fill="#64748B" />
      <rect x="412" y="287" width="4" height="3" rx="0.5" fill="#64748B" />
      <rect x="418" y="287" width="4" height="3" rx="0.5" fill="#64748B" />
      <rect x="424" y="287" width="4" height="3" rx="0.5" fill="#64748B" />
      <rect x="430" y="287" width="4" height="3" rx="0.5" fill="#64748B" />
      <rect x="436" y="287" width="4" height="3" rx="0.5" fill="#64748B" />

      {/* Mouse on Desk */}
      <ellipse cx="462" cy="288" rx="6" ry="8" fill="#334155" stroke="#475569" strokeWidth="1" />
      <line x1="462" y1="282" x2="462" y2="286" stroke="#64748B" strokeWidth="1" />

      {/* ── Document Architecture Stack ── */}
      <rect x="78" y="256" width="56" height="40" rx="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" transform="rotate(-3 106 276)" />
      <rect x="82" y="252" width="56" height="40" rx="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" transform="rotate(2 110 272)" />
      <rect x="80" y="250" width="56" height="40" rx="4" fill="#FFFFFF" stroke="#003153" strokeWidth="1.5" />
      <rect x="88" y="258" width="32" height="4" rx="1" fill="#003153" />
      <rect x="88" y="266" width="40" height="2.5" rx="1" fill="#CBD5E1" />
      <rect x="88" y="272" width="34" height="2.5" rx="1" fill="#CBD5E1" />
      <rect x="88" y="278" width="26" height="2.5" rx="1" fill="#CBD5E1" />
      {/* SRS Spec Tag */}
      <rect x="98" y="282" width="32" height="8" rx="2" fill="#F59E0B" stroke="#0F172A" strokeWidth="0.8" />
      <text x="114" y="288.5" textAnchor="middle" fill="#0F172A" fontSize="5.5" fontWeight="800">SRS SPEC</text>

      {/* ── Hot Coffee Cup with Rising Steam ── */}
      <rect x="148" y="270" width="22" height="24" rx="5" fill="#FFFFFF" stroke="#003153" strokeWidth="1.5" />
      <path d="M170 276 Q180 282 170 288" stroke="#003153" strokeWidth="1.5" fill="none" />
      <rect x="151" y="280" width="16" height="11" rx="3" fill="#92400E" opacity="0.5" />
      {/* Dynamic Animated Steam */}
      <path className="steam steam-1" d="M155 267 Q157 258 159 267" stroke="#94A3B8" strokeWidth="1.3" fill="none" />
      <path className="steam steam-2" d="M161 265 Q163 256 165 265" stroke="#94A3B8" strokeWidth="1.3" fill="none" />
      <path className="steam steam-3" d="M158 262 Q160 253 162 262" stroke="#94A3B8" strokeWidth="1.1" fill="none" />

      {/* ── Desk Plant with Swaying Leaves ── */}
      <rect x="68" y="272" width="16" height="22" rx="4" fill="#D97706" />
      <rect x="68" y="272" width="16" height="6" rx="3" fill="#92400E" />
      <line x1="76" y1="272" x2="76" y2="252" stroke="#047857" strokeWidth="2" />
      <ellipse className="leaf leaf-1" cx="76" cy="254" rx="10" ry="6" fill="#059669" transform="rotate(-15 76 254)" />
      <ellipse className="leaf leaf-2" cx="70" cy="262" rx="8" ry="5" fill="#10B981" transform="rotate(10 70 262)" />
      <ellipse className="leaf leaf-3" cx="84" cy="260" rx="8" ry="5" fill="#10B981" transform="rotate(-10 84 260)" />

      {/* ── Floating Quality & Architecture Badges ── */}
      {/* Verified Quality Check Badge (Gentle Float) */}
      <g className="float-el float-check">
        <circle cx="108" cy="148" r="16" fill="#FFFFFF" stroke="#059669" strokeWidth="1.8" />
        <path d="M101 148 L106 153 L116 143" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* Code Architecture Badge (Smooth Float) */}
      <g className="float-el float-code">
        <circle cx="460" cy="126" r="17" fill="#FFFFFF" stroke="#1D63FF" strokeWidth="1.8" />
        <path d="M453 122 L449 126 L453 130" stroke="#1D63FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M467 122 L471 126 L467 130" stroke="#1D63FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <line x1="462" y1="120" x2="458" y2="132" stroke="#1D63FF" strokeWidth="1.8" strokeLinecap="round" />
      </g>

      {/* Diamond Accent */}
      <rect className="float-el float-diamond" x="486" y="240" width="12" height="12" rx="2" fill="#F59E0B" opacity="0.8" transform="rotate(45 492 246)" />

      {/* Subtle Dot Matrix Accent */}
      <circle cx="30" cy="275" r="2.5" fill="#003153" opacity="0.12" />
      <circle cx="42" cy="275" r="2.5" fill="#003153" opacity="0.12" />
      <circle cx="54" cy="275" r="2.5" fill="#003153" opacity="0.12" />
      <circle cx="30" cy="287" r="2.5" fill="#003153" opacity="0.12" />
      <circle cx="42" cy="287" r="2.5" fill="#003153" opacity="0.12" />
      <circle cx="54" cy="287" r="2.5" fill="#003153" opacity="0.12" />
    </svg>
  );
}

const TECH_PROTOCOLS_ROW1 = [
  { name: 'REACT', tag: 'UI Library' },
  { name: 'NEXT.JS', tag: 'Fullstack SSR' },
  { name: 'NODE.JS', tag: 'Runtime Engine' },
  { name: 'TYPESCRIPT', tag: 'Type-Safe 100%' },
  { name: 'POSTGRESQL', tag: 'Relational DB' },
  { name: 'TAILWIND', tag: 'CSS Architecture' },
  { name: 'DOCKER', tag: 'Container Isolation' },
  { name: 'CLOUDFLARE', tag: 'Edge Security' },
  { name: 'GITHUB', tag: 'CI/CD Pipelines' },
  { name: 'VERCEL', tag: 'Serverless Cloud' },
];

const TECH_PROTOCOLS_ROW2 = [
  { name: 'VERCEL', tag: 'Edge Production' },
  { name: 'GITHUB', tag: 'Version Control' },
  { name: 'CLOUDFLARE', tag: 'DDoS Protection' },
  { name: 'DOCKER', tag: 'Sandbox Environment' },
  { name: 'TAILWIND', tag: 'Design Tokens' },
  { name: 'POSTGRESQL', tag: 'ACID Transactions' },
  { name: 'TYPESCRIPT', tag: 'Strict Contract' },
  { name: 'NODE.JS', tag: 'High-Throughput' },
  { name: 'NEXT.JS', tag: 'App Router' },
  { name: 'REACT', tag: 'Virtual DOM' },
];

export default function HeroSection() {
  const trackLeftRef = useRef(null);
  const trackRightRef = useRef(null);

  // Kinetic dual-direction scroll velocity loop
  useEffect(() => {
    let animId;
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    let currentXLeft = 0;
    let currentXRight = -1200;
    let scrollVelocity = 0;

    const handleScroll = () => {
      const newScrollY = window.scrollY;
      const delta = newScrollY - lastScrollY;
      lastScrollY = newScrollY;
      const clampedDelta = Math.max(-45, Math.min(45, delta));
      scrollVelocity += clampedDelta * 0.45;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const loop = () => {
      scrollVelocity *= 0.92;
      const baseSpeed = 0.55;

      // Track 1 moves leftward on scroll down
      currentXLeft -= (baseSpeed + scrollVelocity);

      // Track 2 moves rightward on scroll down
      currentXRight += (baseSpeed + scrollVelocity);

      if (trackLeftRef.current) {
        const fullWidth = trackLeftRef.current.scrollWidth;
        const setWidth = fullWidth / 3;
        if (setWidth > 0) {
          while (currentXLeft <= -setWidth) currentXLeft += setWidth;
          while (currentXLeft > 0) currentXLeft -= setWidth;
          trackLeftRef.current.style.transform = `translate3d(${currentXLeft}px, 0, 0)`;
        }
      }

      if (trackRightRef.current) {
        const fullWidth = trackRightRef.current.scrollWidth;
        const setWidth = fullWidth / 3;
        if (setWidth > 0) {
          while (currentXRight >= 0) currentXRight -= setWidth;
          while (currentXRight < -setWidth) currentXRight += setWidth;
          trackRightRef.current.style.transform = `translate3d(${currentXRight}px, 0, 0)`;
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  const pillars = [
    {
      id: 'srs',
      icon: FileCode2,
      title: 'Dokumen SRS & SDD Terstruktur',
      desc: 'Dilengkapi pemodelan UML lengkap & basis data terstruktur siap sidang akademik maupun operasional bisnis.'
    },
    {
      id: 'revisi',
      icon: Clock,
      title: 'Kuota Revisi 3x Mutlak',
      desc: 'Kepastian alur kerja transparan pasca tahap preview demi kedisiplinan dan ketepatan jadwal rilis proyek.'
    },
    {
      id: 'privasi',
      icon: ShieldCheck,
      title: 'Kerahasiaan Data 100%',
      desc: 'Jaminan privasi identitas dan protokol pembersihan data berkala setelah serah terima proyek selesai.'
    },
    {
      id: 'modular',
      icon: Layers,
      title: 'Source Code Bersih & Modular',
      desc: 'Arsitektur kode mandiri dan database relasional tanpa ketergantungan sewa server pihak ketiga yang membebani.'
    }
  ];

  return (
    <section id="beranda" className="hero-section">
      <div className="container hero-container">
        
        <div className="hero-split-grid">
          
          {/* LEFT COLUMN: Brass Hands Editorial Column */}
          <div className="hero-left-content">
            
            <div className="hero-disciplines-track">
              REKAYASA, DOKUMENTASI, MAINTENANCE
            </div>

            <h1 className="hero-editorial-headline">
              <span className="headline-serif-line">Rekayasa software</span>
              <span className="headline-serif-line">dan solusi sistem</span>
              <span className="headline-grotesk-line">bebas sewa server</span>
            </h1>

            <p className="hero-editorial-subtitle">
              Aksara Tech melayani rekayasa software fungsional, arsitektur basis data relasional, dan dokumen spesifikasi formal (SRS &amp; SDD). Transparan, tanpa beban sewa server berkala, serta bergaransi resmi dengan kuota revisi 3x mutlak.
            </p>

            {/* Brass Hands Metrics Strip with Vertical Dividers */}
            <div className="hero-metrics-strip">
              <div className="metric-item">
                <span className="metric-number">100%</span>
                <span className="metric-label">Hak Milik<br />Source Code</span>
              </div>
              <div className="metric-divider" aria-hidden="true" />
              <div className="metric-item">
                <span className="metric-number">Rp 500rb</span>
                <span className="metric-label">Plafon Maksimal<br />Tarif Resmi</span>
              </div>
              <div className="metric-divider" aria-hidden="true" />
              <div className="metric-item">
                <span className="metric-number">3x</span>
                <span className="metric-label">Kuota Revisi<br />SOP Mutlak</span>
              </div>
              <div className="metric-divider" aria-hidden="true" />
              <div className="metric-item">
                <span className="metric-number">7 Hari</span>
                <span className="metric-label">Garansi Bug<br />Pasca Rilis</span>
              </div>
            </div>

            {/* CTA Group with Canary Yellow Button & WA Outline Button */}
            <div className="hero-cta-group">
              <Link to="/pesan" className="hero-btn-canary">
                <span>Isi Brief Kebutuhan Proyek</span>
                <span className="cta-arrow" aria-hidden="true">&rarr;</span>
              </Link>
              <a 
                href="https://wa.me/6285600386692?text=Halo%20Aksara%20Tech,%20saya%20ingin%20berkonsultasi%20mengenai%20layanan%20rekayasa%20website."
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn-outline"
              >
                <span>Konsultasi WA Resmi</span>
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: Industrial Subway Billboard Kiosk Frame */}
          <div className="hero-right-visual">
            <div className="subway-billboard-kiosk">
              {/* Kiosk Bezel Header */}
              <div className="kiosk-top-bezel">
                <div className="kiosk-brand-tag">
                  <span className="kiosk-dot" aria-hidden="true" />
                  <span>AKSARA TECH &bull; WORKSPACE PRODUCTION</span>
                </div>
                <div className="kiosk-meta-tag">
                  <span>STANDBY &bull; 09:30 WIB</span>
                </div>
              </div>

              {/* Kiosk Screen Frame */}
              <div className="kiosk-screen-display">
                <WorkspaceIllustration />
              </div>

              {/* Kiosk Legs / Pedestal */}
              <div className="kiosk-pedestal">
                <div className="kiosk-leg kiosk-leg-left" />
                <div className="kiosk-leg kiosk-leg-right" />
              </div>
            </div>
          </div>

        </div>

        {/* DUAL-TRACK SCROLL-LINKED KINETIC TECH MARQUEE */}
        <div className="hero-scroll-marquee-section">
          <div className="marquee-header-bar">
            <div className="marquee-badge-tag">
              <span className="marquee-status-dot" aria-hidden="true" />
              <span>STACK REKAYASA &amp; PROTOKOL RESMI</span>
            </div>
            <div className="marquee-scroll-indicator">
              <span>GERAKAN KINETIK KIRI &amp; KANAN PADA SCROLL</span>
            </div>
          </div>

          <div className="marquee-viewport-mask">
            {/* Track 1: Glides Leftward on scroll down */}
            <div className="marquee-track-row marquee-row-1">
              <div className="marquee-track" ref={trackLeftRef}>
                {[...TECH_PROTOCOLS_ROW1, ...TECH_PROTOCOLS_ROW1, ...TECH_PROTOCOLS_ROW1].map((tech, idx) => (
                  <div key={`tech-r1-${idx}`} className="marquee-tech-chip">
                    <span className="chip-code-name">{tech.name}</span>
                    <span className="chip-tag-spec">{tech.tag}</span>
                    <span className="chip-separator" aria-hidden="true" />
                  </div>
                ))}
              </div>
            </div>

            {/* Track 2: Glides Rightward on scroll down */}
            <div className="marquee-track-row marquee-row-2">
              <div className="marquee-track" ref={trackRightRef}>
                {[...TECH_PROTOCOLS_ROW2, ...TECH_PROTOCOLS_ROW2, ...TECH_PROTOCOLS_ROW2].map((tech, idx) => (
                  <div key={`tech-r2-${idx}`} className="marquee-tech-chip">
                    <span className="chip-code-name">{tech.name}</span>
                    <span className="chip-tag-spec">{tech.tag}</span>
                    <span className="chip-separator" aria-hidden="true" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4 PILLARS OF ENGINEERING QUALITY */}
        <div className="hero-pillars-wrapper reveal-on-scroll">
          <div className="hero-pillars-header">
            <h2 className="pillars-title">4 Pilar Jaminan Mutu Rekayasa</h2>
          </div>

          <div className="hero-pillars-grid reveal-stagger">
            {pillars.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="neo-card hero-pillar-card">
                  <div className="pillar-icon-box">
                    <Icon size={18} />
                  </div>
                  <div className="pillar-content">
                    <h3 className="pillar-card-title">
                      {item.title}
                    </h3>
                    <p className="pillar-card-desc">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <style>{`
        /* =======================================================
           HERO SECTION BASE (Brass Hands Editorial Style)
           ======================================================= */
        .hero-section {
          position: relative;
          overflow: hidden;
          padding-top: 36px;
          padding-bottom: 48px;
          background: transparent;
        }

        .hero-container {
          position: relative;
          z-index: 1;
        }

        .hero-disciplines-track {
          font-family: var(--font-heading);
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #475569;
          margin-bottom: 20px;
        }

        .hero-editorial-headline {
          margin: 0 0 20px 0;
          text-align: left;
        }

        .headline-serif-line {
          display: block;
          font-family: var(--font-serif), 'Instrument Serif', Georgia, serif;
          font-style: normal;
          font-weight: 400;
          font-size: clamp(2.8rem, 5.2vw, 4.8rem);
          line-height: 1.04;
          letter-spacing: -0.015em;
          color: #0F172A;
        }

        .headline-grotesk-line {
          display: block;
          font-family: var(--font-heading), 'Space Grotesk', -apple-system, sans-serif;
          font-weight: 900;
          font-size: clamp(2.5rem, 4.8vw, 4.3rem);
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #0F172A;
          margin-top: 4px;
        }

        .hero-editorial-subtitle {
          font-family: var(--font-body);
          font-size: 1.02rem;
          color: #334155;
          line-height: 1.65;
          max-width: 580px;
          margin: 0 0 24px 0;
          font-weight: 500;
          text-align: left;
        }

        /* Brass Hands Metrics Strip */
        .hero-metrics-strip {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }

        .metric-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .metric-number {
          font-family: var(--font-heading);
          font-size: clamp(1.4rem, 2.2vw, 1.85rem);
          font-weight: 800;
          color: #0F172A;
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .metric-label {
          font-family: var(--font-body);
          font-size: 0.72rem;
          line-height: 1.25;
          color: #475569;
          font-weight: 600;
        }

        .metric-divider {
          width: 2px;
          height: 32px;
          background: #0F172A;
        }

        /* Primary Canary Yellow & Outline WA Buttons */
        .hero-cta-group {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }

        .hero-btn-canary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #FFCE32;
          color: #0F172A !important;
          border: 2px solid #0F172A;
          border-radius: 4px;
          padding: 13px 26px;
          font-family: var(--font-heading);
          font-size: 0.94rem;
          font-weight: 800;
          text-decoration: none;
          letter-spacing: -0.01em;
          transition: background-color 0.18s ease, transform 0.18s cubic-bezier(0.16, 1, 0.3, 1);
          user-select: none;
        }

        .hero-btn-canary:hover {
          background: #F5C026;
          transform: translateY(-1px);
        }

        .cta-arrow {
          font-size: 1.1rem;
          line-height: 1;
        }

        .hero-btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #FFFFFF;
          color: #0F172A !important;
          border: 2px solid #0F172A;
          border-radius: 4px;
          padding: 13px 22px;
          font-family: var(--font-heading);
          font-size: 0.88rem;
          font-weight: 700;
          text-decoration: none;
          transition: border-color 0.18s ease, background-color 0.18s ease, transform 0.18s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-btn-outline:hover {
          background: #F4F0EA;
          transform: translateY(-1px);
        }

        /* Subway Billboard Kiosk Frame */
        .subway-billboard-kiosk {
          width: 100%;
          max-width: 520px;
          background: #0F172A;
          border: 2.5px solid #0F172A;
          border-radius: 12px;
          padding: 14px 14px 20px 14px;
          box-sizing: border-box;
          position: relative;
        }
        }

        .kiosk-top-bezel {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 10px;
          margin-bottom: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12); /* taste-skill-ignore */
        }

        .kiosk-brand-tag {
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: var(--font-heading);
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #F8FAFC;
          text-transform: uppercase;
        }

        .kiosk-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10B981;
          border: 1px solid #059669;
        }

        .kiosk-meta-tag {
          font-family: var(--font-heading);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #94A3B8;
        }

        .kiosk-screen-display {
          background: #FFFFFF;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .kiosk-pedestal {
          display: flex;
          justify-content: space-between;
          padding: 0 48px;
          margin-top: 0;
          position: relative;
        }

        .kiosk-leg {
          width: 16px;
          height: 28px;
          background: #0F172A;
          border-radius: 0 0 3px 3px;
        }

        /* =======================================================
           DUAL-TRACK KINETIC SCROLL MARQUEE (Brass Hands Style)
           ======================================================= */
        .hero-scroll-marquee-section {
          margin-top: 44px;
          margin-bottom: 40px;
          background: #FFFFFF;
          border-top: 2px solid #0F172A; /* taste-skill-ignore */
          border-bottom: 2px solid #0F172A; /* taste-skill-ignore */
          border-radius: 6px;
          padding: 16px 0 18px 0;
          overflow: hidden;
          position: relative;
        }

        .marquee-header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px 14px 24px;
          border-bottom: 2px solid #0F172A; /* taste-skill-ignore */
          margin-bottom: 14px;
        }

        .marquee-badge-tag {
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: var(--font-heading);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: #0F172A;
          text-transform: uppercase;
        }

        .marquee-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #FFCE32;
          border: 1px solid #D97706;
          flex-shrink: 0;
        }

        .marquee-scroll-indicator {
          font-family: var(--font-heading);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #64748B;
          text-transform: uppercase;
        }

        .marquee-viewport-mask {
          position: relative;
          width: 100%;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%); /* taste-skill-ignore */
          mask-image: linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%); /* taste-skill-ignore */
        }

        .marquee-track-row {
          width: 100%;
          overflow: hidden;
          display: flex;
          white-space: nowrap;
        }

        .marquee-row-1 {
          margin-bottom: 10px;
        }

        .marquee-track {
          display: inline-flex;
          align-items: center;
          will-change: transform;
          flex-shrink: 0;
        }

        .marquee-tech-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #F4F0EA;
          border: 2px solid #0F172A;
          border-radius: 4px;
          padding: 7px 14px;
          margin-right: 12px;
          user-select: none;
          transition: background-color 0.16s ease, border-color 0.16s ease, transform 0.16s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .marquee-tech-chip:hover {
          background: #FFCE32;
          border-color: #0F172A;
          transform: translateY(-1px);
        }

        .chip-code-name {
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          color: #0F172A;
          text-transform: uppercase;
        }

        .chip-tag-spec {
          font-family: var(--font-body);
          font-size: 0.64rem;
          font-weight: 600;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        .chip-separator {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #CBD5E1;
          margin-left: 4px;
        }

        .marquee-tech-chip:hover .chip-code-name,
        .marquee-tech-chip:hover .chip-tag-spec {
          color: #0F172A;
        }

        .marquee-tech-chip:hover .chip-separator {
          background: #0F172A;
        }

        @media (max-width: 768px) {
          .marquee-header-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
            padding: 0 16px 10px 16px;
          }

          .marquee-scroll-indicator {
            font-size: 0.6rem;
          }

          .marquee-tech-chip {
            padding: 6px 11px;
            margin-right: 8px;
          }

          .chip-code-name {
            font-size: 0.74rem;
          }

          .chip-tag-spec {
            font-size: 0.6rem;
          }
        }

        /* =======================================================
           DESKTOP SPLIT GRID (>= 1024px)
           ======================================================= */
        @media (min-width: 1024px) {
          .hero-split-grid {
            display: grid;
            grid-template-columns: 1.12fr 0.88fr;
            gap: 40px;
            align-items: center;
            margin-bottom: 28px;
          }

          .hero-left-content {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
            padding-right: 32px;
            border-right: 2px solid #0F172A; /* taste-skill-ignore */
          }

          .hero-right-visual {
            position: relative;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        /* =======================================================
           MOBILE / TABLET (< 1024px)
           ======================================================= */
        @media (max-width: 1023px) {
          .hero-split-grid {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 28px;
            margin-bottom: 32px;
          }

          .hero-left-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            border-right: none;
            padding-right: 0;
          }

          .hero-editorial-headline {
            text-align: center;
          }

          .headline-serif-line {
            font-size: clamp(2.1rem, 7vw, 2.9rem);
          }

          .headline-grotesk-line {
            font-size: clamp(1.9rem, 6.2vw, 2.6rem);
          }

          .hero-editorial-subtitle {
            text-align: center;
            font-size: 0.95rem;
            max-width: 620px;
          }

          .hero-metrics-strip {
            justify-content: center;
          }

          .hero-cta-group {
            justify-content: center;
          }

          .hero-right-visual {
            position: relative;
            width: 100%;
            max-width: 460px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .hero-scroll-marquee-section {
            margin-top: 28px;
            margin-bottom: 24px;
          }
        }

        @media (max-width: 640px) {
          .hero-section {
            padding-top: 18px;
            padding-bottom: 28px;
          }

          .headline-serif-line {
            font-size: clamp(1.8rem, 7.8vw, 2.2rem) !important;
          }

          .headline-grotesk-line {
            font-size: clamp(1.6rem, 7vw, 2rem) !important;
          }

          .hero-cta-group {
            flex-direction: column;
            width: 100%;
            max-width: 360px;
            margin: 0 auto 16px auto;
            gap: 10px;
          }

          .hero-btn-canary,
          .hero-btn-outline {
            width: 100% !important;
            justify-content: center !important;
            padding: 13px 20px !important;
            min-height: 48px !important;
          }

          .hero-metrics-strip {
            gap: 12px;
          }

          .metric-number {
            font-size: 1.35rem;
          }
        }

        /* SVG Illustration Base */
        .hero-illustration {
          width: 100%;
          height: auto;
          max-width: 480px;
        }

        /* Highlight word */
        .hero-highlight {
          color: var(--prussian-blue);
          display: inline;
          font-weight: 800;
        }

        /* Buttons */
        .hero-btn {
          font-family: var(--font-heading);
          letter-spacing: 0.01em;
          font-weight: 800;
          transition: transform 0.18s ease, opacity 0.18s ease, background-color 0.18s ease;
        }
        .hero-btn-main { padding: 12px 26px; font-size: 0.95rem; }
        .hero-btn-sub { padding: 12px 22px; font-size: 0.95rem; }

        /* Trust Chips (Modular 2x2 Clean Balance) */
        .trust-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.76rem;
          font-weight: 700;
          color: #334155;
          background: #F8FAFC;
          border: 1.5px solid #CBD5E1;
          border-radius: 9999px;
          padding: 5px 11px;
          white-space: nowrap;
          transition: border-color 0.15s ease, background-color 0.15s ease;
        }

        .trust-chip:hover {
          border-color: #0F172A;
          background: #FFFFFF;
        }

        .trust-chip-status {
          background: #FFFFFF;
          border-color: #0F172A;
          color: #0F172A;
        }

        .trust-icon { color: #0F172A; flex-shrink: 0; }

        .status-ping-wrap {
          position: relative;
          display: inline-flex;
          width: 8px;
          height: 8px;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .status-ping-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #10B981;
          opacity: 0.75;
          animation: statusPing 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .status-ping-dot {
          position: relative;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #059669;
        }

        @keyframes statusPing {
          75%, 100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }

        /* =======================================================
           RICH, HUMAN-CRAFTED SVG ANIMATIONS
           ======================================================= */
        
        /* 1. Developer Head Subtle Focus Nod */
        .dev-head-nod {
          animation: devHeadNod 6s ease-in-out infinite;
          transform-origin: 408px 210px;
        }
        @keyframes devHeadNod {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(1.4deg) translateY(-0.8px); }
          65% { transform: rotate(-0.8deg) translateY(0.4px); }
        }

        /* 2. Developer Hands Active Typing Motion */
        .hand-left {
          animation: handTapLeft 0.75s ease-in-out infinite alternate;
        }
        .hand-right {
          animation: handTapRight 0.75s ease-in-out infinite 0.35s alternate;
        }
        @keyframes handTapLeft {
          0% { transform: translateY(0); }
          100% { transform: translateY(-2.5px); }
        }
        @keyframes handTapRight {
          0% { transform: translateY(0); }
          100% { transform: translateY(-2.5px); }
        }

        /* 3. Screen Typing Cursor */
        .screen-cursor {
          animation: cursorBlink 1.1s steps(2, start) infinite;
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* 4. Monitor Live Ping */
        .screen-live-ping {
          animation: livePingPulse 2.5s ease-in-out infinite;
        }
        @keyframes livePingPulse {
          0%, 100% { opacity: 1; r: 3; }
          50% { opacity: 0.45; r: 3.5; }
        }

        /* 5. Chart Bar Pulses (Dynamic Analytics Activity) */
        .chart-bar-accent {
          animation: barPulse 2.8s ease-in-out infinite;
        }
        .chart-bar-accent-2 {
          animation: barPulse 2.8s ease-in-out infinite 1.4s;
        }
        .chart-bar-accent-3 {
          animation: barPulse 2.8s ease-in-out infinite 0.7s;
        }
        @keyframes barPulse {
          0%, 100% { opacity: 1; transform: scaleY(1); }
          50% { opacity: 0.6; transform: scaleY(0.85); }
        }

        /* 6. Coffee Steam Rising Naturally */
        .steam {
          opacity: 0;
          animation: steamRise 3.2s ease-in-out infinite;
        }
        .steam-1 { animation-delay: 0s; }
        .steam-2 { animation-delay: 1.1s; }
        .steam-3 { animation-delay: 2.2s; }
        @keyframes steamRise {
          0% { opacity: 0; transform: translateY(0); }
          30% { opacity: 0.55; }
          60% { opacity: 0.3; transform: translateY(-7px); }
          100% { opacity: 0; transform: translateY(-14px); }
        }

        /* 7. Desk Plant Leaves Swaying in Breeze */
        .leaf-1 {
          animation: leafSway1 4.2s ease-in-out infinite;
          transform-origin: 76px 260px;
        }
        .leaf-2 {
          animation: leafSway2 5s ease-in-out infinite;
          transform-origin: 74px 266px;
        }
        .leaf-3 {
          animation: leafSway2 4.6s ease-in-out infinite 1s;
          transform-origin: 80px 264px;
        }
        @keyframes leafSway1 {
          0%, 100% { transform: rotate(-15deg); }
          50% { transform: rotate(-11deg); }
        }
        @keyframes leafSway2 {
          0%, 100% { transform: rotate(10deg); }
          50% { transform: rotate(5deg); }
        }

        /* 8. Floating Quality & Code Badges */
        .float-check {
          animation: floatGentle 5s ease-in-out infinite;
        }
        .float-code {
          animation: floatGentle2 5.5s ease-in-out infinite;
        }
        .float-diamond {
          animation: floatGentle 6s ease-in-out infinite 0.5s;
        }
        @keyframes floatGentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes floatGentle2 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }

        /* 9. Background Shapes Drift */
        .bg-shape-1 {
          animation: bgDrift1 8s ease-in-out infinite;
        }
        .bg-shape-2 {
          animation: bgDrift2 9s ease-in-out infinite;
        }
        @keyframes bgDrift1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-4px, 3px); }
        }
        @keyframes bgDrift2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(3px, -4px); }
        }

        /* =======================================================
           PILLARS OF QUALITY (TIGHT & HARMONIOUS IN FOLD)
           ======================================================= */
        .hero-pillars-wrapper {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
        }

        .hero-pillars-header {
          margin-bottom: 14px;
          text-align: center;
        }

        .pillars-title {
          font-size: 1.15rem;
          font-weight: 900;
          color: #0F172A;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .hero-pillars-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }

        .hero-pillar-card {
          padding: 14px 16px;
          text-align: left;
          display: flex;
          gap: 12px;
          align-items: flex-start;
          background: #FFFFFF;
          border: 2px solid #0F172A;
          border-radius: var(--radius-md);
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .hero-pillar-card:hover {
          transform: translateY(-2px);
          border-color: #0F172A;
        }

        .pillar-icon-box {
          border: 2px solid #0F172A;
          padding: 8px;
          border-radius: 6px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #F1F5F9;
          color: #0F172A;
        }

        .pillar-content { flex: 1; min-width: 0; }

        .pillar-card-title {
          font-size: 0.88rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 4px;
          line-height: 1.3;
        }

        .pillar-card-desc {
          font-size: 0.78rem;
          color: #475569;
          line-height: 1.5;
          margin: 0;
          font-weight: 500;
          word-break: break-word;
        }

        @media (max-width: 1023px) {
          .hero-pillars-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }

        @media (max-width: 640px) {
          .hero-pillars-wrapper {
            margin-top: 28px;
            padding-top: 0;
          }

          .hero-pillars-header {
            margin-bottom: 12px;
          }

          .pillars-title {
            font-size: 1.05rem;
          }

          .hero-pillars-grid {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .hero-pillar-card {
            padding: 11px 14px;
            gap: 12px;
            align-items: center;
            background: #FFFFFF;
            border: 1.5px solid #CBD5E1;
            border-radius: 8px;
          }

          .pillar-icon-box {
            width: 36px;
            height: 36px;
            padding: 7px;
            border-radius: 6px;
            flex-shrink: 0;
          }

          .pillar-card-title {
            font-size: 0.85rem;
            margin-bottom: 2px;
          }

          .pillar-card-desc {
            font-size: 0.75rem;
            line-height: 1.4;
          }
        }

        /* Prefers reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .status-ping-ring,
          .dev-head-nod,
          .hand-left,
          .hand-right,
          .screen-cursor,
          .screen-live-ping,
          .chart-bar-accent,
          .chart-bar-accent-2,
          .chart-bar-accent-3,
          .steam,
          .leaf-1,
          .leaf-2,
          .leaf-3,
          .float-check,
          .float-code,
          .float-diamond,
          .bg-shape-1,
          .bg-shape-2 {
            animation: none !important;
          }
          .hero-pillar-card {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
