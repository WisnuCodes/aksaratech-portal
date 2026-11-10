import React from 'react';
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

export default function HeroSection() {
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
          
          {/* LEFT COLUMN: Authority Headline, Value Proposition, & Symmetrical 2x2 Trust Chips */}
          <div className="hero-left-content">
            
            <h1 className="hero-headline">
              Rekayasa Perangkat Lunak <span className="hero-highlight">&amp; Solusi Web Enterprise</span>
            </h1>

            <p className="hero-subtitle">
              Aksara Tech melayani rekayasa software fungsional, arsitektur basis data relasional, dan dokumen rekayasa formal (SRS &amp; SDD). Transparan, terstruktur, serta dilengkapi kuota revisi 3x mutlak demi kepastian target rilis Anda.
            </p>

            <div className="hero-cta-group">
              <Link to="/pesan" className="btn btn-primary hero-btn hero-btn-main">
                <span>Isi Brief Kebutuhan Proyek</span>
              </Link>
              <Link to="/paket" className="btn btn-secondary hero-btn hero-btn-sub">
                <Code2 size={18} style={{ color: '#0F172A' }} />
                <span>Katalog 6 Paket &amp; Tarif Resmi</span>
              </Link>
            </div>

            {/* Symmetrical 2x2 Trust Chips (Never Wraps Unevenly) */}
            <div className="hero-trust-chips-wrap">
              <div className="trust-chip trust-chip-status">
                <span className="status-ping-wrap" aria-hidden="true">
                  <span className="status-ping-ring" />
                  <span className="status-ping-dot" />
                </span>
                <span>Kapasitas Pengerjaan Aktif</span>
              </div>
              <div className="trust-chip">
                <CheckCircle2 size={13} className="trust-icon" />
                <span>Kuota Revisi 3x Mutlak</span>
              </div>
              <div className="trust-chip">
                <CheckCircle2 size={13} className="trust-icon" />
                <span>Garansi Bug 1 Minggu</span>
              </div>
              <div className="trust-chip">
                <CheckCircle2 size={13} className="trust-icon" />
                <span>Tarif Mulai Rp 100.000</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Enhanced Animated Workspace Illustration */}
          <div className="hero-right-visual">
            <WorkspaceIllustration />
          </div>

        </div>

        {/* 4 PILLARS OF ENGINEERING QUALITY (TIGHT, COMPACT, & FULLY VISIBLE IN FOLD) */}
        <div className="hero-pillars-wrapper">
          <div className="hero-pillars-header">
            <h2 className="pillars-title">4 Pilar Jaminan Mutu Rekayasa</h2>
          </div>

          <div className="hero-pillars-grid">
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
           HERO SECTION BASE (TIGHT & BALANCED VERTICAL RHYTHM)
           ======================================================= */
        .hero-section {
          position: relative;
          overflow: hidden;
          padding-top: 24px;
          padding-bottom: 48px;
          background: transparent;
        }

        .hero-container {
          position: relative;
          z-index: 1;
        }

        /* =======================================================
           DESKTOP SPLIT GRID (>= 1024px)
           ======================================================= */
        @media (min-width: 1024px) {
          .hero-split-grid {
            display: grid;
            grid-template-columns: 1.05fr 0.95fr;
            gap: 36px;
            align-items: center;
            margin-bottom: 28px;
          }

          .hero-left-content {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
          }

          .hero-headline {
            font-size: clamp(2.2rem, 3.4vw, 3.2rem);
            font-weight: 800;
            line-height: 1.15;
            margin: 0 0 16px 0;
            letter-spacing: -0.03em;
            color: var(--ink);
            text-align: left;
            text-wrap: balance;
          }

          .hero-subtitle {
            font-size: 1.02rem;
            color: #334155;
            max-width: 560px;
            margin: 0 0 24px 0;
            line-height: 1.65;
            font-weight: 500;
            text-align: left;
          }

          .hero-cta-group {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap;
            gap: 14px;
            margin-bottom: 20px;
            width: 100%;
          }

          .hero-trust-chips-wrap {
            display: inline-grid;
            grid-template-columns: auto auto;
            gap: 8px 10px;
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
          }

          .hero-headline {
            font-size: clamp(1.85rem, 5vw, 2.3rem);
            font-weight: 900;
            line-height: 1.18;
            margin: 0 auto 14px auto;
            letter-spacing: -0.03em;
            color: #0F172A;
            text-align: center;
            text-wrap: balance;
          }

          .hero-subtitle {
            font-size: 0.95rem;
            color: #334155;
            max-width: 620px;
            margin: 0 auto 20px auto;
            line-height: 1.6;
            font-weight: 500;
            text-align: center;
          }

          .hero-cta-group {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            gap: 12px;
            margin-bottom: 18px;
            width: 100%;
          }

          .hero-trust-chips-wrap {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            gap: 8px;
          }

          .hero-right-visual {
            position: relative;
            width: 100%;
            max-width: 440px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        @media (max-width: 640px) {
          .hero-trust-chips-wrap {
            display: flex;
            flex-direction: column;
            width: 100%;
            align-items: stretch;
            gap: 6px;
          }
          .trust-chip {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .hero-headline {
            font-size: clamp(1.48rem, 6.4vw, 1.78rem) !important;
            line-height: 1.18 !important;
            letter-spacing: -0.025em !important;
          }
          .hero-right-visual {
            max-width: 320px;
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
          border: 1.5px solid #CBD5E1;
          border-radius: var(--radius-md);
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .hero-pillar-card:hover {
          transform: translateY(-2px);
          border-color: #0F172A;
        }

        .pillar-icon-box {
          border: 1.5px solid #CBD5E1;
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
          .hero-pillars-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .hero-pillar-card {
            padding: 12px 14px;
            gap: 10px;
          }

          .pillar-card-title {
            font-size: 0.86rem;
            margin-bottom: 3px;
          }

          .pillar-card-desc {
            font-size: 0.76rem;
            line-height: 1.45;
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
