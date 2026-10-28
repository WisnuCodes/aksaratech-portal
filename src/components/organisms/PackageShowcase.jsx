import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PACKAGES } from '../../data/catalogData';
import { formatRupiah } from '../../utils/documentEngine';
import { Clock, FileCode2, Layers, CheckCircle2, ChevronDown, ChevronUp, Star, ArrowRight, Package, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import Button from '../atoms/Button';

export default function PackageShowcase({ onSelectPackage }) {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const trackRef = useRef(null);

  const toggleExpand = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
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
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
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
      const scrollLeft = trackRef.current.scrollLeft;
      const cardWidth = trackRef.current.children[0]?.offsetWidth || 300;
      const newIndex = Math.round(scrollLeft / (cardWidth + 16));
      if (newIndex >= 0 && newIndex < PACKAGES.length && newIndex !== activeSlide) {
        setActiveSlide(newIndex);
      }
    }
  };

  return (
    <section id="paket" className="section-padding package-showcase-section" style={{ background: '#FFFFFF' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="package-section-header">
          <div>
            <div className="section-badge">
              <Package size={14} /> Katalog Paket Resmi
            </div>
            <h2 className="section-title" style={{ marginBottom: '8px' }}>
              5 Paket Layanan <span style={{ color: 'var(--prussian-blue)' }}>Enterprise</span>
            </h2>
            <p className="section-desc" style={{ maxWidth: '640px', margin: 0 }}>
              Dilengkapi kuota revisi 3x mutlak, estimasi 3–10 hari kerja, dan tarif transparan dengan plafon resmi maksimal Rp 650.000.
            </p>
          </div>

          {/* Mobile-Only Carousel Controls (Hidden on Desktop) */}
          <div className="package-mobile-nav-controls">
            <div className="package-counter-badge">
              <span className="current-num">0{activeSlide + 1}</span>
              <span className="sep">/</span>
              <span className="total-num">0{PACKAGES.length}</span>
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
            const isExpanded = expandedId === pkg.id;
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
                      <div className={`badge ${isFeatured ? 'badge-kuning' : 'badge-blue'}`}>
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
                    {formatRupiah(pkg.minPrice)} – {formatRupiah(pkg.maxPrice)}
                  </div>
                  <div className="timeline-row">
                    <Clock size={14} style={{ color: '#D97706' }} />
                    <span>{pkg.minDays}–{pkg.maxDays} Hari Kerja</span>
                    <span className="bullet">&bull;</span>
                    <span style={{ color: '#059669', fontWeight: '800' }}>Max 3x Revisi</span>
                  </div>
                </div>

                {/* Technical Specs Accordion (Safeguarded against crashes) */}
                <div className="package-details-box">
                  <div className="system-type-row">
                    <span className="system-type-label">Karakteristik Sistem:</span>
                    <div className="system-type-value">
                      <Layers size={14} style={{ color: 'var(--prussian-blue)', flexShrink: 0, marginTop: '2px' }} />
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
                            <CheckCircle2 size={14} style={{ color: '#059669', flexShrink: 0, marginTop: '2px' }} />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      <div className="expanded-section-title" style={{ marginTop: '14px' }}>Deliverables Termasuk:</div>
                      <div className="deliverables-checklist">
                        {deliverableList.map((del, dIdx) => (
                          <div key={dIdx} className="deliverable-check-item">
                            <FileCode2 size={14} style={{ color: 'var(--prussian-blue)', flexShrink: 0, marginTop: '2px' }} />
                            <span>{del}</span>
                          </div>
                        ))}
                      </div>

                      {/* SRS / SDD document badge */}
                      <div className={`docs-badge ${pkg.includeDocs ? 'docs-included' : 'docs-addon'}`}>
                        {pkg.docsSummary}
                      </div>
                    </div>
                  )}
                </div>

                {/* Select Package CTA Button */}
                <div className="package-card-footer">
                  <Button
                    variant={pkg.number === 5 ? 'amber' : 'primary'}
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => handleSelect(pkg.id)}
                    icon={ArrowRight}
                    iconPosition="right"
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
            <Sparkles size={13} style={{ color: '#D97706' }} />
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
          border: 2px solid #0F172A;
          border-radius: var(--radius-md);
          box-shadow: 4px 4px 0px #0F172A;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .package-card-item.is-featured-package {
          box-shadow: 6px 6px 0px var(--kuning);
          border-color: #0F172A;
        }

        .package-card-header {
          padding: 22px 24px 18px;
          border-bottom: 2px solid #0F172A;
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
          border-bottom: 2px solid #0F172A;
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
          text-transform: uppercase;
          letter-spacing: 0.05em;
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
          border-top: 1.5px dashed #CBD5E1;
        }

        .expanded-section-title {
          font-size: 0.78rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
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
          border-top: 2px solid #0F172A;
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

          /* Card 4 (E-Commerce) sits in row 2, col 1 */
          .package-card-item:nth-child(4) {
            grid-column: 1 / 2;
          }

          /* Card 5 (Skripsi/Tugas Akhir) sits in row 2, col 2 with equal width to Card 4 */
          .package-card-item:nth-child(5) {
            grid-column: 2 / 3;
          }

          .package-card-item:hover {
            transform: translateY(-4px);
            box-shadow: 6px 6px 0px #0F172A;
          }

          .package-card-item.is-featured-package:hover {
            box-shadow: 8px 8px 0px var(--kuning);
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
            border: 1.5px solid #0F172A;
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 0.8rem;
            font-weight: 900;
            color: #0F172A;
            font-family: var(--font-mono);
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
            border: 2px solid #0F172A;
            border-radius: 8px;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 2px 2px 0px #0F172A;
            color: #0F172A;
            transition: all 0.15s ease;
          }

          .carousel-btn:hover:not(:disabled) {
            background: var(--kuning);
            transform: translate(-1px, -1px);
          }

          .carousel-btn:disabled {
            opacity: 0.35;
            cursor: not-allowed;
            box-shadow: 1px 1px 0px #CBD5E1;
          }

          /* Swipe Track on Mobile */
          .package-display-track {
            display: flex;
            gap: 16px;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            padding: 8px 4px 18px 4px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }

          .package-display-track::-webkit-scrollbar {
            display: none;
          }

          .package-card-item {
            flex: 0 0 86%;
            max-width: 360px;
            scroll-snap-align: start;
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
            border: 1.5px solid #0F172A;
            padding: 5px 10px;
            border-radius: 6px;
            font-size: 0.74rem;
            font-weight: 800;
            cursor: pointer;
            color: #475569;
            box-shadow: 1.5px 1.5px 0px #CBD5E1;
            transition: all 0.15s ease;
          }

          .package-page-dot.active {
            background: var(--kuning);
            color: #0F172A;
            box-shadow: 2px 2px 0px #0F172A;
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
