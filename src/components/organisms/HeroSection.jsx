import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight, Clock, Award, Code2, Database, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const [activeFeatureIdx, setActiveFeatureIdx] = useState(0);
  const scrollRef = useRef(null);

  const features = [
    {
      id: 1,
      icon: Award,
      accent: 'var(--prussian-blue)',
      iconBg: '#EEF4FF',
      title: 'Dokumen SRS & SDD IEEE',
      desc: 'Dilengkapi pemodelan UML lengkap & basis data terstruktur siap sidang skripsi atau operasional korporat.'
    },
    {
      id: 2,
      icon: Clock,
      accent: '#D97706',
      iconBg: '#FFF9E6',
      title: 'Kuota Revisi Max 3x Mutlak',
      desc: 'Kepastian alur kerja transparan pasca preview 1 demi kedisiplinan jadwal rilis proyek Anda.'
    },
    {
      id: 3,
      icon: Shield,
      accent: '#059669',
      iconBg: '#ECFDF5',
      title: '100% Confidentiality',
      desc: 'Jaminan kerahasiaan identitas dan Data Cleansing Policy berkala setelah proyek dinyatakan lunas.'
    },
    {
      id: 4,
      icon: Database,
      accent: 'var(--prussian-blue)',
      iconBg: '#EEF4FF',
      title: 'Maintenance Koding Rp 50rb',
      desc: 'Pemeliharaan koding harian, perbaikan bug kode, dan refactoring tanpa jebakan sewa server berulang.'
    }
  ];

  const scrollFeature = (direction) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth * 0.85;
      scrollRef.current.scrollBy({
        left: direction === 'next' ? cardWidth : -cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPos = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.offsetWidth * 0.85;
      const index = Math.round(scrollPos / cardWidth);
      setActiveFeatureIdx(Math.min(Math.max(index, 0), features.length - 1));
    }
  };

  return (
    <section id="beranda" className="hero-section" style={{ position: 'relative', overflow: 'hidden', paddingTop: '52px', paddingBottom: '72px', background: 'transparent' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        
        {/* Top Floating Badge Bar - Responsive Neo-Brutalist Pill */}
        <div className="hero-badge-bar">
          <div className="hero-top-chip">
            <span className="live-dot" />
            <span className="chip-text">Slot Terbuka • Supreme Edition 2026</span>
          </div>
          <div className="hero-price-chip">
            <Shield size={13} style={{ color: '#D97706' }} />
            <span>Plafon Resmi Max Rp 650.000</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="hero-headline">
          Rekayasa Perangkat Lunak &amp; Sistem Web Berstandar{' '}
          <span className="hero-highlight">
            Enterprise
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          Aksara Tech melayani penulisan source code fungsional, arsitektur database relasional MySQL, dokumen rekayasa <strong style={{ color: '#0F172A' }}>IEEE (SRS &amp; SDD)</strong>, dan pemodelan <strong style={{ color: '#0F172A' }}>UML lengkap</strong>. Transparan tanpa biaya siluman, kuota revisi 3x mutlak, dan garansi kerahasiaan 100%.
        </p>

        {/* Call to Actions (Neo-Brutalist Buttons) */}
        <div className="hero-cta">
          <Link to="/pesan" className="btn btn-primary hero-btn-main">
            <span>Isi Brief Kebutuhan Proyek</span>
            <ArrowRight size={18} />
          </Link>
          <Link to="/paket" className="btn btn-secondary hero-btn-sub">
            <Code2 size={18} style={{ color: 'var(--prussian-blue)' }} />
            <span>Lihat 5 Paket &amp; Tarif Resmi</span>
          </Link>
        </div>

        {/* Key Features Container: Desktop Grid / Mobile Horizontal Swipe Carousel */}
        <div className="hero-features-wrapper">
          {/* Mobile Swipe Header with navigation hint & arrows */}
          <div className="hero-features-mobile-header">
            <div className="swipe-hint">
              <Sparkles size={14} style={{ color: '#D97706' }} />
              <span>Geser ke samping untuk melihat 4 pilar utama</span>
            </div>
            <div className="hero-features-arrows">
              <button 
                type="button"
                onClick={() => scrollFeature('prev')}
                disabled={activeFeatureIdx === 0}
                className="mini-nav-btn"
                aria-label="Fitur Sebelumnya"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="mini-step-text">{activeFeatureIdx + 1} / {features.length}</span>
              <button 
                type="button"
                onClick={() => scrollFeature('next')}
                disabled={activeFeatureIdx === features.length - 1}
                className="mini-nav-btn"
                aria-label="Fitur Berikutnya"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Features Track */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="hero-features-track"
          >
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="neo-card hero-feature-card">
                  <div style={{
                    background: item.iconBg,
                    border: '2px solid #0F172A',
                    padding: '10px',
                    borderRadius: '8px',
                    color: item.accent,
                    boxShadow: '2px 2px 0px #0F172A',
                    flexShrink: 0
                  }}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '800', color: '#0F172A', marginBottom: '4px', fontSize: '1.02rem' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.86rem', color: '#475569', lineHeight: '1.5' }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Pagination Dots */}
          <div className="hero-features-dots">
            {features.map((_, i) => (
              <span 
                key={i} 
                className={`hero-dot ${activeFeatureIdx === i ? 'active' : ''}`}
                onClick={() => {
                  if (scrollRef.current) {
                    const cardWidth = scrollRef.current.offsetWidth * 0.85;
                    scrollRef.current.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
                  }
                }}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Embedded Responsive Styles */}
      <style>{`
        .hero-badge-bar {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
          background: #FFFFFF;
          padding: 6px 14px;
          border-radius: 9999px;
          border: 2px solid #0F172A;
          box-shadow: 3px 3px 0px #0F172A;
        }

        .hero-top-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 800;
          color: #0F172A;
        }

        .live-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10B981;
          display: inline-block;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.3);
          animation: pulseDot 2s infinite;
        }

        @keyframes pulseDot {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
          70% { transform: scale(1.1); box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }

        .hero-price-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #FFFBEB;
          border: 1.5px solid #0F172A;
          padding: 2px 10px;
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 800;
          color: #92400E;
        }

        .hero-headline {
          font-size: clamp(2.2rem, 5vw, 4.2rem);
          font-weight: 900;
          line-height: 1.15;
          max-width: 1020px;
          margin: 0 auto 20px auto;
          letter-spacing: -0.03em;
          color: #0F172A;
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
        }

        .hero-subtitle {
          font-size: clamp(0.96rem, 1.8vw, 1.2rem);
          color: #334155;
          max-width: 840px;
          margin: 0 auto 36px auto;
          line-height: 1.7;
          font-weight: 500;
        }

        .hero-cta {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 56px;
        }

        .hero-btn-main {
          padding: 14px 32px;
          font-size: 1.02rem;
        }

        .hero-btn-sub {
          padding: 14px 28px;
          font-size: 1.02rem;
        }

        /* Features Track on Desktop */
        .hero-features-wrapper {
          max-width: 1140px;
          margin: 0 auto;
        }

        .hero-features-mobile-header {
          display: none;
        }

        .hero-features-track {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .hero-feature-card {
          padding: 22px;
          text-align: left;
          display: flex;
          gap: 14px;
          align-items: flex-start;
          background: #FFFFFF;
        }

        .hero-features-dots {
          display: none;
        }

        /* Responsive Mobile & Tablet */
        @media (max-width: 1024px) {
          .hero-features-track {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding-top: 36px !important;
            padding-bottom: 48px !important;
          }

          .hero-badge-bar {
            flex-direction: column;
            gap: 6px;
            padding: 8px 16px;
            border-radius: 12px;
            margin-bottom: 18px;
          }

          .hero-headline {
            font-size: 1.95rem;
            line-height: 1.25;
            margin-bottom: 16px;
          }

          .hero-highlight {
            transform: rotate(0deg);
            padding: 2px 10px;
            box-shadow: 3px 3px 0px var(--prussian-blue);
          }

          .hero-subtitle {
            font-size: 0.92rem;
            line-height: 1.6;
            margin-bottom: 28px;
            padding: 0 4px;
          }

          .hero-cta {
            flex-direction: column;
            gap: 12px;
            margin-bottom: 40px;
          }

          .hero-btn-main, .hero-btn-sub {
            width: 100%;
            justify-content: center;
            padding: 13px 20px;
            font-size: 0.95rem;
          }

          /* Mobile Horizontal Swipe Track */
          .hero-features-mobile-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 12px;
            padding: 0 4px;
          }

          .swipe-hint {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 0.78rem;
            color: #475569;
            font-weight: 700;
          }

          .hero-features-arrows {
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .mini-nav-btn {
            background: #FFFFFF;
            border: 1.5px solid #0F172A;
            border-radius: 4px;
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 1.5px 1.5px 0px #0F172A;
            color: #0F172A;
          }

          .mini-nav-btn:disabled {
            opacity: 0.35;
            cursor: not-allowed;
          }

          .mini-step-text {
            font-size: 0.75rem;
            font-weight: 800;
            color: #0F172A;
            font-family: var(--font-mono);
          }

          .hero-features-track {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            gap: 14px;
            padding-bottom: 12px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }

          .hero-features-track::-webkit-scrollbar {
            display: none;
          }

          .hero-feature-card {
            flex: 0 0 85%;
            scroll-snap-align: start;
            padding: 18px;
            box-shadow: 3px 3px 0px #0F172A !important;
          }

          .hero-features-dots {
            display: flex;
            justify-content: center;
            gap: 6px;
            margin-top: 8px;
          }

          .hero-dot {
            width: 8px;
            height: 8px;
            border-radius: 9999px;
            background: #CBD5E1;
            border: 1px solid #0F172A;
            transition: all 0.2s ease;
            cursor: pointer;
          }

          .hero-dot.active {
            width: 24px;
            background: var(--kuning);
            box-shadow: 1px 1px 0px #0F172A;
          }
        }
      `}</style>
    </section>
  );
}
