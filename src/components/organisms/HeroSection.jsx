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

export default function HeroSection() {
  const pillars = [
    {
      id: 1,
      icon: FileCode2,
      accent: 'var(--prussian-blue)',
      iconBg: '#EEF4FF',
      title: 'Dokumen SRS & SDD IEEE',
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
        
        {/* Top Professional Status & Credibility Badges */}
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
            <span>Standar Rekayasa IEEE &amp; UML Formal</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="hero-headline">
          <span className="headline-segment">Rekayasa Perangkat Lunak</span>{' '}
          <span className="headline-segment">&amp; Sistem Web Berstandar</span>{' '}
          <span className="headline-highlight-wrap">
            <span className="hero-highlight">Enterprise</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          Aksara Tech melayani pengembangan source code fungsional, arsitektur basis data relasional, dan dokumen rekayasa formal (SRS &amp; SDD) berstandar IEEE. Transparan, terstruktur, serta dilengkapi kuota revisi 3x mutlak demi kepastian target rilis Anda.
        </p>

        {/* Call to Actions (Neo-Brutalist Buttons) */}
        <div className="hero-cta-group">
          <Link to="/pesan" className="btn btn-primary hero-btn hero-btn-main">
            <span>Isi Brief Kebutuhan Proyek</span>
            <ArrowRight size={18} />
          </Link>
          <Link to="/paket" className="btn btn-secondary hero-btn hero-btn-sub">
            <Code2 size={18} style={{ color: 'var(--prussian-blue)' }} />
            <span>Katalog 5 Paket &amp; Tarif Resmi</span>
          </Link>
        </div>

        {/* Micro-Trust Proof Row */}
        <div className="hero-trust-bar">
          <div className="trust-item">
            <CheckCircle2 size={14} className="trust-icon" />
            <span>Kuota Revisi 3x Mutlak</span>
          </div>
          <span className="trust-divider" aria-hidden="true">•</span>
          <div className="trust-item">
            <CheckCircle2 size={14} className="trust-icon" />
            <span>Master Source Code Penuh</span>
          </div>
          <span className="trust-divider" aria-hidden="true">•</span>
          <div className="trust-item">
            <CheckCircle2 size={14} className="trust-icon" />
            <span>Tarif Transparan Mulai Rp 120.000</span>
          </div>
        </div>

        {/* 4 Pillars Section Header & Grid */}
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

      {/* Embedded Responsive Styles */}
      <style>{`
        /* =======================================================
           HERO SECTION BASE STYLES
           ======================================================= */
        .hero-section {
          position: relative;
          overflow: hidden;
          padding-top: 56px;
          padding-bottom: 76px;
          background: transparent;
        }

        .hero-container {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        /* Top Badges */
        .hero-badge-group {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 26px;
        }

        .hero-status-pill,
        .hero-standard-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #FFFFFF;
          border: 2px solid #0F172A;
          border-radius: 9999px;
          padding: 6px 14px;
          box-shadow: 2.5px 2.5px 0px #0F172A;
          font-size: 0.82rem;
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

        /* Headline & Highlight */
        .hero-headline {
          font-size: clamp(2.3rem, 5.2vw, 4.2rem);
          font-weight: 900;
          line-height: 1.16;
          max-width: 1040px;
          margin: 0 auto 20px auto;
          letter-spacing: -0.035em;
          color: #0F172A;
          text-wrap: balance;
          word-break: keep-all;
          overflow-wrap: break-word;
          hyphens: none;
        }

        .headline-segment {
          display: inline;
        }

        .headline-highlight-wrap {
          display: inline-block;
        }

        .hero-highlight {
          background: var(--kuning);
          color: #0F172A;
          padding: 2px 14px;
          border-radius: 8px;
          border: 2px solid #0F172A;
          box-shadow: 4px 4px 0px var(--prussian-blue);
          display: inline-block;
          transform: rotate(-1.5deg);
          white-space: nowrap;
        }

        /* Subtitle */
        .hero-subtitle {
          font-size: clamp(1rem, 1.8vw, 1.18rem);
          color: #334155;
          max-width: 820px;
          margin: 0 auto 34px auto;
          line-height: 1.7;
          font-weight: 500;
        }

        /* CTAs */
        .hero-cta-group {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 22px;
          width: 100%;
        }

        .hero-btn {
          font-family: var(--font-heading);
          letter-spacing: 0.01em;
          font-weight: 800;
          transition: all 0.15s ease;
        }

        .hero-btn-main {
          padding: 14px 32px;
          font-size: 1.02rem;
        }

        .hero-btn-sub {
          padding: 14px 28px;
          font-size: 1.02rem;
        }

        /* Micro-Trust Row */
        .hero-trust-bar {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 14px;
          margin-bottom: 54px;
          padding: 8px 18px;
          background: #F8FAFC;
          border: 1.5px solid #E2E8F0;
          border-radius: 9999px;
        }

        .trust-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          font-weight: 700;
          color: #475569;
        }

        .trust-icon {
          color: #059669;
          flex-shrink: 0;
        }

        .trust-divider {
          color: #CBD5E1;
          font-size: 0.8rem;
        }

        /* =======================================================
           PILLARS (4 PILAR MUTU)
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

        .pillar-content {
          flex: 1;
          min-width: 0;
        }

        .pillar-card-title {
          font-size: 0.98rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 6px;
          line-height: 1.35;
        }

        .pillar-card-desc {
          font-size: 0.84rem;
          color: #475569;
          line-height: 1.55;
          margin: 0;
          font-weight: 500;
        }

        /* =======================================================
           TABLET RESPONSIVENESS (max-width: 1023px)
           ======================================================= */
        @media (max-width: 1023px) {
          .hero-pillars-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }

          .hero-trust-bar {
            margin-bottom: 44px;
          }
        }

        /* =======================================================
           MOBILE RESPONSIVENESS (max-width: 767px)
           ======================================================= */
        @media (max-width: 767px) {
          .hero-section {
            padding-top: 32px !important;
            padding-bottom: 48px !important;
          }

          .hero-badge-group {
            flex-direction: column;
            gap: 8px;
            width: 100%;
            max-width: 340px;
            margin-bottom: 20px;
          }

          .hero-status-pill,
          .hero-standard-pill {
            width: 100%;
            justify-content: center;
            font-size: 0.78rem;
            padding: 7px 12px;
            box-shadow: 2px 2px 0px #0F172A;
          }

          .headline-segment {
            display: block;
          }

          .headline-highlight-wrap {
            display: block;
            margin-top: 6px;
          }

          .hero-headline {
            font-size: clamp(1.48rem, 5.8vw, 1.85rem);
            line-height: 1.28;
            margin-bottom: 16px;
            letter-spacing: -0.025em;
          }

          .hero-highlight {
            transform: rotate(-1deg);
            padding: 3px 12px;
            box-shadow: 3px 3px 0px var(--prussian-blue);
          }

          .hero-subtitle {
            font-size: 0.92rem;
            line-height: 1.62;
            margin-bottom: 26px;
            padding: 0 4px;
          }

          .hero-cta-group {
            flex-direction: column;
            gap: 12px;
            margin-bottom: 18px;
          }

          .hero-btn-main, 
          .hero-btn-sub {
            width: 100%;
            justify-content: center;
            padding: 13px 20px;
            font-size: 0.95rem;
          }

          .hero-trust-bar {
            flex-direction: column;
            gap: 8px;
            border-radius: 12px;
            padding: 10px 14px;
            width: 100%;
            max-width: 340px;
            margin-bottom: 36px;
          }

          .trust-divider {
            display: none;
          }

          .trust-item {
            font-size: 0.78rem;
          }

          .hero-pillars-header {
            margin-bottom: 16px;
          }

          .pillars-title {
            font-size: 1.15rem;
          }

          /* Clean, robust vertical stack on mobile: effortless scrolling */
          .hero-pillars-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .hero-pillar-card {
            padding: 16px;
            box-shadow: 3px 3px 0px #0F172A !important;
          }

          .pillar-card-title {
            font-size: 0.94rem;
          }

          .pillar-card-desc {
            font-size: 0.82rem;
          }
        }
      `}</style>
    </section>
  );
}
