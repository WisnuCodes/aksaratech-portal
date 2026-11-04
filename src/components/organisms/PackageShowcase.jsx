import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PACKAGES } from '../../data/catalogData';
import { formatRupiah } from '../../utils/documentEngine';
import { Clock, FileCode2, Layers, CheckCircle2, ChevronDown, ChevronUp, Star, ArrowRight, Package, ChevronLeft, ChevronRight, Sparkles, ShieldCheck } from 'lucide-react';
import Button from '../atoms/Button';

export default function PackageShowcase({ onSelectPackage }) {
  const navigate = useNavigate();
  const [expandedIds, setExpandedIds] = useState({});
  const [activeSlide, setActiveSlide] = useState(0);
  const trackRef = useRef(null);

  const toggleExpand = (id) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelect = (pkgId) => {
    if (onSelectPackage) {
      onSelectPackage(pkgId);
    }
    navigate('/pesan');
  };

  const scrollToSlide = (index) => {
    if (trackRef.current) {
      const card = trackRef.current.children[index];
      if (card) {
        const trackRect = trackRef.current.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        const scrollOffset = cardRect.left - trackRect.left + trackRef.current.scrollLeft - 16;
        trackRef.current.scrollTo({ left: scrollOffset, behavior: 'smooth' });
        setActiveSlide(index);
      }
    }
  };

  const handlePrev = () => {
    const nextIdx = Math.max(0, activeSlide - 1);
    scrollToSlide(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = Math.min(PACKAGES.length - 1, activeSlide + 1);
    scrollToSlide(nextIdx);
  };

  const handleScroll = () => {
    if (trackRef.current && window.innerWidth < 1024) {
      const track = trackRef.current;
      const scrollLeft = track.scrollLeft;
      const gap = 16;
      let closest = 0;
      let minDist = Infinity;
      Array.from(track.children).forEach((child, i) => {
        const dist = Math.abs(child.offsetLeft - scrollLeft - 16);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      if (closest !== activeSlide) {
        setActiveSlide(closest);
      }
    }
  };

  return (
    <section id="paket" className="section-padding package-showcase-section" style={{ background: '#FFFFFF' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="package-section-header">
          <div>
            
            <h2 className="section-title" style={{ marginBottom: '8px' }}>
              6 Klasifikasi Paket <span style={{ color: 'var(--prussian-blue)' }}>Layanan Resmi</span>
            </h2>
            <p className="section-desc" style={{ maxWidth: '640px', margin: 0 }}>
              Dilengkapi kuota revisi 3x mutlak, garansi bug 1 minggu, estimasi 1–10 hari kerja, dan tarif transparan dengan plafon resmi maksimal Rp 500.000.
            </p>
          </div>

          {/* Mobile-Only Carousel Controls (Hidden on Desktop) */}
          <div className="package-mobile-nav-controls">
            <div className="package-counter-badge">
              <span className="current-num">{activeSlide + 1}</span>
              <span className="sep">/</span>
              <span className="total-num">{PACKAGES.length}</span>
            </div>

            <div className="carousel-arrow-group">
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeSlide === 0}
                className="carousel-btn"
                aria-label="Paket Sebelumnya"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={activeSlide === PACKAGES.length - 1}
                className="carousel-btn"
                aria-label="Paket Berikutnya"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Packages Track (Desktop: 3-Col Grid | Mobile: Swipeable Carousel) */}
        <div 
          ref={trackRef}
          onScroll={handleScroll}
          className="package-display-track"
        >
          {PACKAGES.map((pkg, idx) => {
            const isExpanded = !!expandedIds[pkg.id];
            const isFeatured = pkg.number === 5; // Tugas akhir / Skripsi
            const isCurrent = activeSlide === idx;
            const featureList = pkg.features || pkg.sections || [];
            const deliverableList = pkg.deliverables || [];

            return (
              <div
                key={pkg.id}
                className={`neo-card package-card-item ${isFeatured ? 'is-featured-package' : ''} ${isCurrent ? 'active-slide' : ''}`}
              >
                {/* Card Header with Category & Badge */}
                <div className="package-card-header">
                  <div className="package-meta-row">
                    <div className="category-pill">
                      <span className="package-num">PAKET {pkg.number}</span>
                      <span className="divider">/</span>
                      <span className="cat-name">{pkg.category}</span>
                    </div>

                    {pkg.badge && (
                      <div className="badge badge-neutral">
                        <Star size={11} fill="currentColor" />
                        <span>{pkg.badge}</span>
                      </div>
                    )}
                  </div>

                  <h3 className="package-card-title">
                    {pkg.name}
                  </h3>
                  <p className="package-card-desc">
                    {pkg.description}
                  </p>
                </div>

                {/* Price and Timeline */}
                <div className="package-price-box">
                  <div className="price-label">Tarif Transparan:</div>
                  <div className="price-value">
                    {pkg.minPrice === pkg.maxPrice ? (
                      <span>{formatRupiah(pkg.minPrice)} <span style={{ fontSize: '0.82rem', color: '#0F172A', fontWeight: '800' }}>(Tarif Tetap)</span></span>
                    ) : (
                      <>{formatRupiah(pkg.minPrice)} – {formatRupiah(pkg.maxPrice)}</>
                    )}
                  </div>
                  <div className="timeline-row">
                    <Clock size={14} style={{ color: '#0F172A' }} />
                    <span>{pkg.minDays}–{pkg.maxDays} Hari Kerja</span>
                    <span className="bullet">&bull;</span>
                    <span style={{ color: '#0F172A', fontWeight: '800' }}>Max 3x Revisi</span>
                  </div>
                </div>

                {/* Technical Specs Accordion (Safeguarded against crashes) */}
                <div className="package-details-box">
                  <div className="system-type-row">
                    <span className="system-type-label">Karakteristik Sistem:</span>
                    <div className="system-type-value">
                      <Layers size={14} style={{ color: '#0F172A', flexShrink: 0, marginTop: '2px' }} />
                      <span>{pkg.systemType}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleExpand(pkg.id)}
                    className="package-accordion-btn"
                  >
                    <span>{isExpanded ? 'Tutup Detail Modul' : 'Lihat Detail Modul & Deliverables'}</span>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {isExpanded && (
                    <div className="package-expanded-content">
                      <div className="expanded-section-title">Komponen &amp; Fitur Utama:</div>
                      <div className="features-checklist">
                        {featureList.map((feat, fIdx) => (
                          <div key={fIdx} className="feature-check-item">
                            <CheckCircle2 size={14} style={{ color: '#0F172A', flexShrink: 0, marginTop: '2px' }} />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      <div className="expanded-section-title" style={{ marginTop: '14px' }}>Deliverables Termasuk:</div>
                      <div className="deliverables-checklist">
                        {deliverableList.map((del, dIdx) => (
                          <div key={dIdx} className="deliverable-check-item">
                            <FileCode2 size={14} style={{ color: '#0F172A', flexShrink: 0, marginTop: '2px' }} />
                            <span>{del}</span>
                          </div>
                        ))}
                      </div>

                      {/* SRS / SDD document badge */}
                      <div className={`docs-badge ${pkg.includeDocs ? 'docs-included' : 'docs-addon'}`}>
                        {pkg.docsSummary}
                      </div>

                      {/* 1-Week Warranty Badge */}
                      <div style={{
                        marginTop: '8px',
                        background: '#F8FAFC',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '6px',
                        padding: '6px 10px',
                        fontSize: '0.78rem',
                        color: '#0F172A',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <ShieldCheck size={13} style={{ color: '#0F172A', flexShrink: 0 }} />
                        <span>Include Garansi Bug Kode 1 Minggu (7 Hari)</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Select Package CTA Button */}
                <div className="package-card-footer">
                  <Button
                    variant="primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => handleSelect(pkg.id)}
                  >
                    Pilih Paket Ini
                  </Button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Mobile Pagination Indicator Dots (Hidden on Desktop) */}
        <div className="package-mobile-pagination">
          <div className="package-dots-track">
            {PACKAGES.map((pkg, i) => (
              <button
                key={pkg.id}
                type="button"
                onClick={() => scrollToSlide(i)}
                className={`package-page-dot ${activeSlide === i ? 'active' : ''}`}
                title={`Lompat ke Paket ${pkg.number}`}
                aria-label={`Lompat ke Paket ${pkg.number}`}
              >
                <span className="dot-num">P{pkg.number}</span>
              </button>
            ))}
          </div>

          <div className="swipe-guidance">
            <ChevronRight size={13} style={{ color: '#64748B' }} />
            <span>Geser kartu ke samping untuk paket lainnya</span>
          </div>
        </div>

      </div>

      {/* Embedded CSS with Strict Desktop vs Mobile Breakpoint Separation */}
      <style>{`
        /* =======================================================
           COMMON CARD STYLES
           ======================================================= */
        /* Mobile-only elements hidden by default (Desktop protection) */
        .package-mobile-nav-controls,
        .package-mobile-pagination {
          display: none;
        }

        .package-card-item {
          padding: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          position: relative;
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .package-card-item.is-featured-package {
          border-color: #0F172A;
        }

        .package-card-header {
          padding: 22px 24px 18px;
          /* border separated by tone */
        }

        .package-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 14px;
        }

        .package-card-title {
          font-size: 1.3rem;
          font-weight: 900;
          color: #0F172A;
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .package-card-desc {
          font-size: 0.88rem;
          color: #475569;
          line-height: 1.6;
          min-height: 48px;
        }

        .package-price-box {
          padding: 16px 24px;
          background: #F8FAFC;
          /* border separated by tone */
        }

        .price-label {
          font-size: 0.76rem;
          color: #64748B;
          margin-bottom: 2px;
          font-weight: 700;
        }

        .price-value {
          font-size: 1.45rem;
          font-weight: 900;
          color: var(--prussian-blue);
          margin-bottom: 6px;
        }

        .timeline-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          color: #475569;
          font-weight: 700;
        }

        .timeline-row .bullet {
          color: #94A3B8;
        }

        .package-details-box {
          padding: 18px 24px;
          flex: 1;
        }

        .system-type-row {
          margin-bottom: 12px;
        }

        .system-type-label {
          font-size: 0.74rem;
          text-transform: none; letter-spacing: -0.01em;
          color: #64748B;
          font-weight: 800;
          display: block;
          margin-bottom: 4px;
        }

        .system-type-value {
          font-size: 0.85rem;
          color: #0F172A;
          font-weight: 600;
          line-height: 1.45;
          display: flex;
          gap: 6px;
        }

        .package-accordion-btn {
          background: none;
          border: none;
          color: var(--prussian-blue);
          font-weight: 800;
          font-size: 0.84rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 0;
          transition: color 0.15s ease;
        }

        .package-accordion-btn:hover {
          color: var(--prussian-blue-dark);
        }

        .package-expanded-content {
          margin-top: 14px;
          padding-top: 14px;
          /* border separated by tone */
        }

        .expanded-section-title {
          font-size: 0.78rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 8px;
          text-transform: none; letter-spacing: -0.01em;
        }

        .features-checklist, .deliverables-checklist {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 12px;
        }

        .feature-check-item, .deliverable-check-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.84rem;
          color: #334155;
          line-height: 1.45;
          font-weight: 600;
        }

        .docs-badge {
          margin-top: 10px;
          border-radius: 6px;
          padding: 8px 12px;
          font-size: 0.78rem;
          font-weight: 800;
        }

        .docs-included {
          background: #ECFDF5;
          border: 1.5px solid #10B981;
          color: #065F46;
        }

        .docs-addon {
          background: #FFF9E6;
          border: 1.5px solid #F59E0B;
          color: #92400E;
        }

        .package-card-footer {
          padding: 16px 24px;
          /* border separated by tone */
          background: #F8FAFC;
        }

        /* =======================================================
           DESKTOP VIEW (Breakpoints: >= 1024px)
           Strictly Grid Layout: Spacious, Expansive, NO Forced Carousel
           ======================================================= */
        @media (min-width: 1024px) {
          .package-section-header {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            margin-bottom: 44px;
          }

          /* Hide Mobile Controls on Desktop */
          .package-mobile-nav-controls,
          .package-mobile-pagination {
            display: none !important;
          }

          /* Expansive 3-Column Desktop Grid with Uniform Alignment */
          .package-display-track {
            display: grid !important;
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 28px !important;
            align-items: start !important; /* CRITICAL: Prevents neighboring cards from stretching */
            overflow: visible !important;
            scroll-snap-type: none !important;
            padding: 0 !important;
          }

          .package-card-item {
            width: 100% !important;
            flex: none !important;
          }

          .package-card-item:hover {
            transform: translateY(-2px);
            border-color: var(--border-main);
          }

          .package-card-item.is-featured-package:hover {
            transform: translateY(-2px);
            border-color: var(--prussian-blue);
          }
        }

        /* =======================================================
           MOBILE & TABLET VIEW (Breakpoints: < 1024px)
           Touch-Optimized Horizontal Swipe Carousel
           ======================================================= */
        @media (max-width: 1023px) {
          .package-section-header {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            margin-bottom: 20px;
          }

          .package-mobile-nav-controls {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
          }

          .package-counter-badge {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            background: #F1F5F9;
            border: 1px solid var(--border-subtle);
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 0.8rem;
            font-weight: 900;
            color: #0F172A;
            
          }

          .package-counter-badge .current-num {
            color: var(--prussian-blue);
          }

          .package-counter-badge .sep {
            color: #94A3B8;
          }

          .carousel-arrow-group {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .carousel-btn {
            background: #FFFFFF;
            border: 1px solid var(--border-subtle);
            border-radius: 8px;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: #0F172A;
            transition: transform 0.18s ease, opacity 0.18s ease, background-color 0.18s ease;
          }

          .carousel-btn:hover:not(:disabled) {
            background: var(--kuning);
            transform: translate(-1px, -1px);
          }

          .carousel-btn:disabled {
            opacity: 0.35;
            cursor: not-allowed;
          }

          /* Swipe Track on Mobile with Independent Card Heights */
          .package-display-track {
            display: flex;
            align-items: flex-start !important;
            gap: 16px;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scroll-padding-left: 16px;
            padding: 8px 16px 18px 16px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }

          .package-display-track::-webkit-scrollbar {
            display: none;
          }

          .package-card-item {
            flex: 0 0 calc(100vw - 64px);
            max-width: 420px;
            scroll-snap-align: start;
            align-self: flex-start !important;
            height: fit-content !important;
            min-height: unset !important;
            max-height: unset !important;
          }

          .package-card-item > * {
            flex-shrink: 0 !important;
          }

          .package-details-box {
            flex: 0 0 auto !important;
            flex-grow: 0 !important;
          }

          /* Mobile Pagination Dots Track */
          .package-mobile-pagination {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            margin-top: 18px;
          }

          .package-dots-track {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .package-page-dot {
            background: #FFFFFF;
            border: 1px solid var(--border-subtle);
            padding: 5px 10px;
            border-radius: 6px;
            font-size: 0.74rem;
            font-weight: 800;
            cursor: pointer;
            color: #475569;
            transition: transform 0.18s ease, opacity 0.18s ease, background-color 0.18s ease;
          }

          .package-page-dot.active {
            background: var(--kuning);
            color: #0F172A;
            transform: translateY(-2px);
          }

          .swipe-guidance {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 0.8rem;
            color: #64748B;
            font-weight: 600;
          }
        }
      `}</style>
    </section>
  );
}
