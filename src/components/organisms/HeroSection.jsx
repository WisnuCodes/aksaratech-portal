import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Clock, 
  Code2, 
  FileCode2, 
  ShieldCheck, 
  Layers, 
  CheckCircle2
} from 'lucide-react';

/* ─────────────────────────────────────────────
   Flat SVG Illustration — Engineering Workspace
   With subtle, natural CSS animations.
   ───────────────────────────────────────────── */
function WorkspaceIllustration() {
  return (
    <svg
      viewBox="0 0 520 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="hero-illustration"
      aria-hidden="true"
    >
      {/* ── Background Decorative Shapes ── */}
      <circle className="bg-shape-1" cx="440" cy="72" r="64" fill="#EEF4FF" />
      <circle className="bg-shape-2" cx="60" cy="360" r="44" fill="#FFF9E6" />
      <rect className="bg-shape-3" x="20" y="100" width="28" height="28" rx="6" fill="#ECFDF5" opacity="0.7" transform="rotate(12 34 114)" />
      <rect className="bg-shape-4" x="475" y="300" width="20" height="20" rx="4" fill="#EEF4FF" opacity="0.6" transform="rotate(-8 485 310)" />

      {/* ── Desk ── */}
      <rect x="60" y="295" width="400" height="14" rx="5" fill="#003153" />
      <rect x="90" y="309" width="12" height="70" rx="3" fill="#003153" />
      <rect x="418" y="309" width="12" height="70" rx="3" fill="#003153" />
      <rect x="96" y="355" width="328" height="6" rx="3" fill="#002240" />

      {/* ── Monitor ── */}
      <rect x="155" y="130" width="210" height="150" rx="10" fill="#0F172A" />
      <rect x="163" y="138" width="194" height="126" rx="6" fill="#F8FAFC" />
      {/* Monitor stand */}
      <rect x="240" y="280" width="40" height="18" rx="2" fill="#0F172A" />
      <rect x="222" y="290" width="76" height="8" rx="4" fill="#0F172A" />

      {/* ── Screen Content ── */}
      {/* Top nav bar */}
      <rect x="171" y="146" width="178" height="14" rx="3" fill="#003153" />
      <circle cx="182" cy="153" r="3" fill="#38BDF8" />
      <rect x="192" y="151" width="28" height="4" rx="1" fill="#FFFFFF" opacity="0.5" />
      <rect x="226" y="151" width="20" height="4" rx="1" fill="#FFFFFF" opacity="0.3" />
      <rect x="252" y="151" width="24" height="4" rx="1" fill="#FFFFFF" opacity="0.3" />
      {/* Sidebar */}
      <rect x="171" y="164" width="44" height="92" rx="3" fill="#EEF4FF" />
      <rect x="178" y="172" width="30" height="4" rx="1" fill="#003153" opacity="0.6" />
      <rect x="178" y="182" width="24" height="3" rx="1" fill="#94A3B8" />
      <rect x="178" y="190" width="28" height="3" rx="1" fill="#94A3B8" />
      <rect x="178" y="198" width="20" height="3" rx="1" fill="#94A3B8" />
      <rect x="178" y="210" width="30" height="4" rx="1" fill="#003153" opacity="0.6" />
      <rect x="178" y="220" width="26" height="3" rx="1" fill="#94A3B8" />
      <rect x="178" y="228" width="22" height="3" rx="1" fill="#94A3B8" />
      <rect x="178" y="240" width="18" height="3" rx="1" fill="#059669" opacity="0.6" />

      {/* Main content area - cards */}
      <rect x="222" y="168" width="66" height="42" rx="5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
      <rect x="230" y="176" width="32" height="4" rx="1" fill="#003153" />
      <rect x="230" y="184" width="50" height="3" rx="1" fill="#CBD5E1" />
      <rect x="230" y="191" width="42" height="3" rx="1" fill="#CBD5E1" />
      <rect x="230" y="199" width="22" height="7" rx="2.5" fill="#FFC107" />

      <rect x="294" y="168" width="56" height="42" rx="5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
      <rect x="302" y="176" width="28" height="4" rx="1" fill="#003153" />
      <rect x="302" y="184" width="40" height="3" rx="1" fill="#CBD5E1" />
      <rect x="302" y="191" width="32" height="3" rx="1" fill="#CBD5E1" />
      <rect x="302" y="199" width="24" height="7" rx="2.5" fill="#059669" />

      {/* Chart area */}
      <rect x="222" y="216" width="128" height="36" rx="5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
      <rect x="230" y="222" width="38" height="4" rx="1" fill="#003153" />
      {/* Mini bar chart */}
      <rect x="234" y="238" width="8" height="8" rx="1.5" fill="#003153" opacity="0.7" />
      <rect x="246" y="234" width="8" height="12" rx="1.5" fill="#003153" opacity="0.7" />
      <rect className="chart-bar-accent" x="258" y="230" width="8" height="16" rx="1.5" fill="#FFC107" />
      <rect x="270" y="236" width="8" height="10" rx="1.5" fill="#003153" opacity="0.7" />
      <rect x="282" y="232" width="8" height="14" rx="1.5" fill="#003153" opacity="0.7" />
      <rect className="chart-bar-accent-2" x="294" y="228" width="8" height="18" rx="1.5" fill="#059669" />
      <rect x="306" y="233" width="8" height="13" rx="1.5" fill="#003153" opacity="0.7" />
      <rect x="318" y="236" width="8" height="10" rx="1.5" fill="#003153" opacity="0.5" />
      <rect x="330" y="231" width="8" height="15" rx="1.5" fill="#003153" opacity="0.7" />

      {/* Blinking cursor on screen */}
      <rect className="screen-cursor" x="338" y="151" width="2" height="8" rx="0.5" fill="#38BDF8" />

      {/* ── Person (Geometric, Professional) ── */}
      {/* Chair back */}
      <rect x="380" y="198" width="56" height="12" rx="6" fill="#475569" />
      <rect x="382" y="210" width="4" height="48" rx="2" fill="#475569" />
      <rect x="430" y="210" width="4" height="48" rx="2" fill="#475569" />
      {/* Chair seat */}
      <rect x="386" y="255" width="44" height="12" rx="5" fill="#334155" />
      <rect x="404" y="267" width="8" height="30" rx="2" fill="#64748B" />
      <circle cx="396" cy="300" r="5" fill="#475569" />
      <circle cx="420" cy="300" r="5" fill="#475569" />

      {/* Body / Torso */}
      <rect x="392" y="210" width="32" height="48" rx="10" fill="#003153" />
      {/* Collar */}
      <path d="M404 210 L408 220 L412 210" fill="#002240" />

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

      {/* Arms (reaching toward desk) */}
      <path d="M392 224 Q374 244 368 270 Q366 280 372 282" stroke="#F0C8A0" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M424 224 Q436 244 436 270 Q435 280 428 282" stroke="#F0C8A0" strokeWidth="9" strokeLinecap="round" fill="none" />
      {/* Sleeves */}
      <path d="M392 224 Q380 236 376 244" stroke="#003153" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M424 224 Q432 236 434 244" stroke="#003153" strokeWidth="9" strokeLinecap="round" fill="none" />
      {/* Hands */}
      <circle cx="372" cy="283" r="6" fill="#F0C8A0" />
      <circle cx="428" cy="283" r="6" fill="#F0C8A0" />

      {/* ── Keyboard on desk ── */}
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

      {/* ── Mouse ── */}
      <ellipse cx="462" cy="288" r="6" ry="8" fill="#334155" stroke="#475569" strokeWidth="1" />
      <line x1="462" y1="282" x2="462" y2="286" stroke="#64748B" strokeWidth="1" />

      {/* ── Documents Stack (left side of desk) ── */}
      <rect x="78" y="256" width="56" height="40" rx="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" transform="rotate(-3 106 276)" />
      <rect x="82" y="252" width="56" height="40" rx="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" transform="rotate(2 110 272)" />
      <rect x="80" y="250" width="56" height="40" rx="4" fill="#FFFFFF" stroke="#003153" strokeWidth="1.5" />
      <rect x="88" y="258" width="32" height="4" rx="1" fill="#003153" />
      <rect x="88" y="266" width="40" height="2.5" rx="1" fill="#CBD5E1" />
      <rect x="88" y="272" width="34" height="2.5" rx="1" fill="#CBD5E1" />
      <rect x="88" y="278" width="26" height="2.5" rx="1" fill="#CBD5E1" />
      {/* DOCS Stamp */}
      <rect x="100" y="282" width="28" height="8" rx="2" fill="#FFC107" stroke="#0F172A" strokeWidth="0.8" />
      <text x="114" y="288.5" textAnchor="middle" fill="#0F172A" fontSize="5" fontWeight="800" fontFamily="monospace">DOCS</text>

      {/* ── Coffee Cup ── */}
      <rect x="148" y="270" width="22" height="24" rx="5" fill="#FFFFFF" stroke="#003153" strokeWidth="1.5" />
      <path d="M170 276 Q180 282 170 288" stroke="#003153" strokeWidth="1.5" fill="none" />
      <rect x="151" y="280" width="16" height="11" rx="3" fill="#92400E" opacity="0.5" />
      {/* Steam (animated) */}
      <path className="steam steam-1" d="M155 267 Q157 258 159 267" stroke="#94A3B8" strokeWidth="1.2" fill="none" />
      <path className="steam steam-2" d="M161 265 Q163 256 165 265" stroke="#94A3B8" strokeWidth="1.2" fill="none" />
      <path className="steam steam-3" d="M158 262 Q160 253 162 262" stroke="#94A3B8" strokeWidth="1" fill="none" />

      {/* ── Plant (small desk plant) ── */}
      <rect x="68" y="272" width="16" height="22" rx="4" fill="#D97706" />
      <rect x="68" y="272" width="16" height="6" rx="3" fill="#92400E" />
      <line x1="76" y1="272" x2="76" y2="252" stroke="#047857" strokeWidth="2" />
      <ellipse className="leaf leaf-1" cx="76" cy="254" rx="10" ry="6" fill="#059669" transform="rotate(-15 76 254)" />
      <ellipse className="leaf leaf-2" cx="70" cy="262" rx="8" ry="5" fill="#10B981" transform="rotate(10 70 262)" />
      <ellipse className="leaf leaf-3" cx="84" cy="260" rx="8" ry="5" fill="#10B981" transform="rotate(-10 84 260)" />

      {/* ── Floating Accent Elements ── */}
      {/* Checkmark badge (gentle float) */}
      <g className="float-el float-check">
        <circle cx="108" cy="148" r="16" fill="#ECFDF5" stroke="#059669" strokeWidth="1.8" />
        <path d="M101 148 L106 153 L116 143" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* Gear icon (slow spin) */}
      <g className="float-el float-gear" style={{ transformOrigin: '460px 126px' }}>
        <circle cx="460" cy="126" r="16" fill="#EEF4FF" stroke="#003153" strokeWidth="1.8" />
        <circle cx="460" cy="126" r="5.5" fill="none" stroke="#003153" strokeWidth="1.5" />
        <line x1="460" y1="112" x2="460" y2="117" stroke="#003153" strokeWidth="2" strokeLinecap="round" />
        <line x1="460" y1="135" x2="460" y2="140" stroke="#003153" strokeWidth="2" strokeLinecap="round" />
        <line x1="446" y1="126" x2="451" y2="126" stroke="#003153" strokeWidth="2" strokeLinecap="round" />
        <line x1="469" y1="126" x2="474" y2="126" stroke="#003153" strokeWidth="2" strokeLinecap="round" />
        <line x1="450" y1="116" x2="454" y2="120" stroke="#003153" strokeWidth="2" strokeLinecap="round" />
        <line x1="466" y1="132" x2="470" y2="136" stroke="#003153" strokeWidth="2" strokeLinecap="round" />
        <line x1="470" y1="116" x2="466" y2="120" stroke="#003153" strokeWidth="2" strokeLinecap="round" />
        <line x1="454" y1="132" x2="450" y2="136" stroke="#003153" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Small diamond accent */}
      <rect className="float-el float-diamond" x="486" y="240" width="12" height="12" rx="2" fill="#FFC107" opacity="0.6" transform="rotate(45 492 246)" />

      {/* Small dots pattern */}
      <circle cx="30" cy="275" r="2.5" fill="#003153" opacity="0.1" />
      <circle cx="42" cy="275" r="2.5" fill="#003153" opacity="0.1" />
      <circle cx="54" cy="275" r="2.5" fill="#003153" opacity="0.1" />
      <circle cx="30" cy="287" r="2.5" fill="#003153" opacity="0.1" />
      <circle cx="42" cy="287" r="2.5" fill="#003153" opacity="0.1" />
      <circle cx="54" cy="287" r="2.5" fill="#003153" opacity="0.1" />
      <circle cx="30" cy="299" r="2.5" fill="#003153" opacity="0.1" />
      <circle cx="42" cy="299" r="2.5" fill="#003153" opacity="0.1" />
      <circle cx="54" cy="299" r="2.5" fill="#003153" opacity="0.1" />

      {/* Bracket accent (subtle) */}
      <text x="480" y="380" fontFamily="monospace" fontSize="18" fill="#003153" opacity="0.08" fontWeight="700">&lt;/&gt;</text>
    </svg>
  );
}

export default function HeroSection() {
  const pillars = [
    {
      id: 1,
      icon: FileCode2,
      accent: 'var(--prussian-blue)',
      iconBg: '#EEF4FF',
      title: 'Dokumen SRS & SDD Terstruktur',
      desc: 'Dilengkapi pemodelan UML lengkap & basis data terstruktur siap sidang akademik maupun operasional bisnis.'
    },
    {
      id: 2,
      icon: Clock,
      accent: '#D97706',
      iconBg: '#FFF9E6',
      title: 'Kuota Revisi 3x Mutlak',
      desc: 'Kepastian alur kerja transparan pasca tahap preview demi kedisiplinan dan ketepatan jadwal rilis proyek.'
    },
    {
      id: 3,
      icon: ShieldCheck,
      accent: '#059669',
      iconBg: '#ECFDF5',
      title: 'Kerahasiaan Data 100%',
      desc: 'Jaminan privasi identitas dan protokol pembersihan data berkala setelah serah terima proyek selesai.'
    },
    {
      id: 4,
      icon: Layers,
      accent: 'var(--prussian-blue)',
      iconBg: '#EEF4FF',
      title: 'Source Code Bersih & Modular',
      desc: 'Arsitektur kode mandiri dan database relasional tanpa ketergantungan sewa server pihak ketiga yang membebani.'
    }
  ];

  return (
    <section id="beranda" className="hero-section">
      <div className="container hero-container">
        
        <div className="hero-split-grid">
          
          {/* LEFT COLUMN */}
          <div className="hero-left-content">
            
            <div className="hero-badge-group">
              <div className="hero-status-pill">
                <span className="status-ping-wrap">
                  <span className="status-ping-ring" />
                  <span className="status-ping-dot" />
                </span>
                <span className="status-text">Kapasitas Pengerjaan Aktif</span>
              </div>

              <div className="hero-standard-pill">
                <FileCode2 size={13} className="pill-icon" />
                <span>Standar Rekayasa Formal &amp; UML Terstruktur</span>
              </div>
            </div>

            <h1 className="hero-headline">
              <span className="headline-segment">Rekayasa Perangkat Lunak</span>{' '}
              <span className="headline-segment">&amp; Sistem Web Berstandar</span>{' '}
              <span className="headline-highlight-wrap">
                <span className="hero-highlight">Enterprise</span>
              </span>
            </h1>

            <p className="hero-subtitle">
              Aksara Tech melayani pengembangan source code fungsional, arsitektur basis data relasional, dan dokumen rekayasa formal (SRS &amp; SDD) terstruktur. Transparan, terstruktur, serta dilengkapi kuota revisi 3x mutlak demi kepastian target rilis Anda.
            </p>

            <div className="hero-cta-group">
              <Link to="/pesan" className="btn btn-primary hero-btn hero-btn-main">
                <span>Isi Brief Kebutuhan Proyek</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/paket" className="btn btn-secondary hero-btn hero-btn-sub">
                <Code2 size={18} style={{ color: 'var(--prussian-blue)' }} />
                <span>Katalog 6 Paket &amp; Tarif Resmi</span>
              </Link>
            </div>

            <div className="hero-trust-bar">
              <div className="trust-item">
                <CheckCircle2 size={14} className="trust-icon" />
                <span>Kuota Revisi 3x Mutlak</span>
              </div>
              <span className="trust-divider" aria-hidden="true">•</span>
              <div className="trust-item">
                <CheckCircle2 size={14} className="trust-icon" />
                <span>Garansi Bug 1 Minggu</span>
              </div>
              <span className="trust-divider" aria-hidden="true">•</span>
              <div className="trust-item">
                <CheckCircle2 size={14} className="trust-icon" />
                <span>Master Source Code Penuh</span>
              </div>
              <span className="trust-divider" aria-hidden="true">•</span>
              <div className="trust-item">
                <CheckCircle2 size={14} className="trust-icon" />
                <span>Tarif Transparan Mulai Rp 100.000</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Animated Flat SVG Illustration */}
          <div className="hero-right-visual">
            <WorkspaceIllustration />
          </div>

        </div>

        {/* 4 PILLARS */}
        <div className="hero-pillars-wrapper">
          <div className="hero-pillars-header">
            <span className="pillars-pretitle">STANDAR PENGERJAAN AKSARA TECH</span>
            <h2 className="pillars-title">4 Pilar Jaminan Mutu Rekayasa</h2>
          </div>

          <div className="hero-pillars-grid">
            {pillars.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="neo-card hero-pillar-card">
                  <div 
                    className="pillar-icon-box"
                    style={{
                      background: item.iconBg,
                      color: item.accent
                    }}
                  >
                    <Icon size={20} />
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
           HERO SECTION BASE
           ======================================================= */
        .hero-section {
          position: relative;
          overflow: hidden;
          padding-top: 48px;
          padding-bottom: 72px;
          background: transparent;
        }

        .hero-container {
          position: relative;
          z-index: 1;
        }

        /* =======================================================
           DESKTOP SPLIT GRID (≥ 1024px)
           ======================================================= */
        @media (min-width: 1024px) {
          .hero-split-grid {
            display: grid;
            grid-template-columns: 1.1fr 0.9fr;
            gap: 40px;
            align-items: center;
            margin-bottom: 64px;
          }

          .hero-left-content {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
          }

          .hero-badge-group {
            display: inline-flex;
            align-items: center;
            justify-content: flex-start;
            gap: 10px;
            margin-bottom: 22px;
          }

          .hero-headline {
            font-size: clamp(2.4rem, 3.8vw, 3.6rem);
            font-weight: 900;
            line-height: 1.15;
            margin: 0 0 18px 0;
            letter-spacing: -0.035em;
            color: #0F172A;
            text-align: left;
            text-wrap: balance;
          }

          .hero-subtitle {
            font-size: 1.06rem;
            color: #334155;
            max-width: 580px;
            margin: 0 0 28px 0;
            line-height: 1.7;
            font-weight: 500;
            text-align: left;
          }

          .hero-cta-group {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap;
            gap: 16px;
            margin-bottom: 24px;
            width: 100%;
          }

          .hero-trust-bar {
            display: inline-flex;
            align-items: center;
            justify-content: flex-start;
            flex-wrap: wrap;
            gap: 12px;
            padding: 8px 16px;
            background: #F8FAFC;
            border: 1.5px solid #E2E8F0;
            border-radius: 9999px;
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
            gap: 36px;
            margin-bottom: 48px;
          }

          .hero-left-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .hero-badge-group {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 20px;
          }

          .hero-headline {
            font-size: clamp(2rem, 5vw, 2.7rem);
            font-weight: 900;
            line-height: 1.18;
            margin: 0 auto 16px auto;
            letter-spacing: -0.03em;
            color: #0F172A;
            text-align: center;
            text-wrap: balance;
          }

          .hero-subtitle {
            font-size: 0.98rem;
            color: #334155;
            max-width: 640px;
            margin: 0 auto 24px auto;
            line-height: 1.65;
            font-weight: 500;
            text-align: center;
          }

          .hero-cta-group {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            gap: 12px;
            margin-bottom: 20px;
            width: 100%;
          }

          .hero-trust-bar {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            gap: 10px;
            padding: 8px 14px;
            background: #F8FAFC;
            border: 1.5px solid #E2E8F0;
            border-radius: 9999px;
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

        @media (max-width: 480px) {
          .hero-right-visual {
            max-width: 320px;
          }
        }

        /* SVG Illustration */
        .hero-illustration {
          width: 100%;
          height: auto;
          max-width: 520px;
        }

        /* =======================================================
           SVG ANIMATIONS — Subtle & Natural
           ======================================================= */
        /* Blinking cursor on monitor */
        .screen-cursor {
          animation: cursorBlink 1.1s steps(2, start) infinite;
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* Coffee steam rising */
        .steam {
          opacity: 0;
          animation: steamRise 3s ease-in-out infinite;
        }
        .steam-1 { animation-delay: 0s; }
        .steam-2 { animation-delay: 1s; }
        .steam-3 { animation-delay: 2s; }
        @keyframes steamRise {
          0% { opacity: 0; transform: translateY(0); }
          30% { opacity: 0.5; }
          60% { opacity: 0.3; transform: translateY(-6px); }
          100% { opacity: 0; transform: translateY(-12px); }
        }

        /* Floating elements — gentle bob */
        .float-check {
          animation: floatGentle 5s ease-in-out infinite;
        }
        .float-gear {
          animation: spinSlow 20s linear infinite;
        }
        .float-diamond {
          animation: floatGentle2 6s ease-in-out infinite;
        }
        @keyframes floatGentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes floatGentle2 {
          0%, 100% { transform: rotate(45deg) translateY(0); }
          50% { transform: rotate(45deg) translateY(-5px); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Background shapes drift */
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

        /* Leaf sway */
        .leaf-1 {
          animation: leafSway1 4s ease-in-out infinite;
          transform-origin: 76px 260px;
        }
        .leaf-2 {
          animation: leafSway2 5s ease-in-out infinite;
          transform-origin: 74px 266px;
        }
        .leaf-3 {
          animation: leafSway2 4.5s ease-in-out infinite;
          transform-origin: 80px 264px;
        }
        @keyframes leafSway1 {
          0%, 100% { transform: rotate(-15deg); }
          50% { transform: rotate(-12deg); }
        }
        @keyframes leafSway2 {
          0%, 100% { transform: rotate(10deg); }
          50% { transform: rotate(6deg); }
        }

        /* Chart bar subtle pulse */
        .chart-bar-accent {
          animation: barPulse 3s ease-in-out infinite;
        }
        .chart-bar-accent-2 {
          animation: barPulse 3s ease-in-out infinite 1.5s;
        }
        @keyframes barPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.65; }
        }

        /* Prefers reduced motion */
        @media (prefers-reduced-motion: reduce), (max-width: 768px) {
          .screen-cursor,
          .steam,
          .float-check,
          .float-gear,
          .float-diamond,
          .bg-shape-1,
          .bg-shape-2,
          .leaf-1,
          .leaf-2,
          .leaf-3,
          .chart-bar-accent,
          .chart-bar-accent-2 {
            animation: none !important;
          }
        }

        /* =======================================================
           SHARED ELEMENT STYLES
           ======================================================= */
        .hero-status-pill,
        .hero-standard-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #FFFFFF;
          border: 2px solid #0F172A;
          border-radius: 9999px;
          padding: 6px 14px;
          box-shadow: 2px 2px 0px #0F172A;
          font-size: 0.8rem;
          font-weight: 800;
          color: #0F172A;
          white-space: nowrap;
        }

        .hero-standard-pill {
          background: #F8FAFC;
          color: #334155;
        }

        .hero-standard-pill .pill-icon {
          color: var(--prussian-blue);
          flex-shrink: 0;
        }

        .status-ping-wrap {
          position: relative;
          display: inline-flex;
          width: 9px;
          height: 9px;
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
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #059669;
        }

        @keyframes statusPing {
          75%, 100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }

        .headline-segment { display: inline; }
        .headline-highlight-wrap { display: inline-block; }

        .hero-highlight {
          background: var(--kuning);
          color: #0F172A;
          padding: 2px 12px;
          border-radius: 8px;
          border: 2px solid #0F172A;
          box-shadow: 3.5px 3.5px 0px var(--prussian-blue);
          display: inline-block;
          transform: rotate(-1.5deg);
          white-space: nowrap;
        }

        .hero-btn {
          font-family: var(--font-heading);
          letter-spacing: 0.01em;
          font-weight: 800;
          transition: all 0.15s ease;
        }
        .hero-btn-main { padding: 13px 28px; font-size: 0.98rem; }
        .hero-btn-sub { padding: 13px 24px; font-size: 0.98rem; }

        .trust-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #475569;
        }
        .trust-icon { color: #059669; flex-shrink: 0; }
        .trust-divider { color: #CBD5E1; font-size: 0.8rem; }

        /* =======================================================
           PILLARS
           ======================================================= */
        .hero-pillars-wrapper {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
        }

        .hero-pillars-header {
          margin-bottom: 24px;
          text-align: center;
        }

        .pillars-pretitle {
          font-size: 0.74rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          color: var(--prussian-blue);
          display: block;
          margin-bottom: 4px;
          font-family: var(--font-mono);
        }

        .pillars-title {
          font-size: 1.28rem;
          font-weight: 900;
          color: #0F172A;
          margin: 0;
        }

        .hero-pillars-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .hero-pillar-card {
          padding: 20px;
          text-align: left;
          display: flex;
          gap: 14px;
          align-items: flex-start;
          background: #FFFFFF;
          border: 2px solid #0F172A;
          border-radius: var(--radius-md);
          box-shadow: 4px 4px 0px #0F172A;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .hero-pillar-card:hover {
          transform: translateY(-3px);
          box-shadow: 6px 6px 0px var(--prussian-blue);
        }

        .pillar-icon-box {
          border: 2px solid #0F172A;
          padding: 9px;
          border-radius: 8px;
          box-shadow: 2px 2px 0px #0F172A;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pillar-content { flex: 1; min-width: 0; }

        .pillar-card-title {
          font-size: 0.98rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 6px;
          line-height: 1.35;
        }

        .pillar-card-desc {
          font-size: 0.85rem;
          color: #475569;
          line-height: 1.6;
          margin: 0;
          font-weight: 500;
          word-break: break-word;
        }

        @media (max-width: 1023px) {
          .hero-pillars-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }

        @media (max-width: 640px) {
          .hero-pillars-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .hero-pillar-card {
            padding: 16px 14px;
            box-shadow: 3px 3px 0px #0F172A !important;
            gap: 12px;
          }

          .pillar-card-title {
            font-size: 0.95rem;
            margin-bottom: 4px;
          }

          .pillar-card-desc {
            font-size: 0.82rem;
            line-height: 1.55;
          }
        }
      `}</style>
    </section>
  );
}
