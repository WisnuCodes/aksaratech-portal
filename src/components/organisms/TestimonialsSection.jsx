import React, { useState, useEffect, useRef } from 'react';
import { Star, MessageSquare, ChevronLeft, ChevronRight, CheckCircle2, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../../data/catalogData';

export default function TestimonialsSection() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef(null);

  const categories = ['Semua', 'Akademik & Skripsi', 'UMKM & Ritel', 'Korporat & B2B'];

  const filteredTestimonials = activeCategory === 'Semua'
    ? TESTIMONIALS
    : TESTIMONIALS.filter(t => t.tag === activeCategory);

  // Reset scroll when filter changes
  useEffect(() => {
    setCurrentIndex(0);
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activeCategory]);

  const scrollToSlide = (index) => {
    if (trackRef.current) {
      const slideWidth = trackRef.current.offsetWidth;
      trackRef.current.scrollTo({
        left: index * slideWidth,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const handlePrev = () => {
    const prevIdx = Math.max(0, currentIndex - 1);
    scrollToSlide(prevIdx);
  };

  const handleNext = () => {
    const nextIdx = Math.min(filteredTestimonials.length - 1, currentIndex + 1);
    scrollToSlide(nextIdx);
  };

  const handleScroll = () => {
    if (trackRef.current) {
      const scrollLeft = trackRef.current.scrollLeft;
      const slideWidth = trackRef.current.offsetWidth;
      if (slideWidth > 0) {
        const newIndex = Math.round(scrollLeft / slideWidth);
        if (newIndex >= 0 && newIndex < filteredTestimonials.length && newIndex !== currentIndex) {
          setCurrentIndex(newIndex);
        }
      }
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <section id="testimoni" className="section-padding testimonials-carousel-section" style={{ position: 'relative', background: '#F8FAFC', borderTop: '2px solid #0F172A' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <MessageSquare size={14} /> Testimoni Klien &amp; Rekam Jejak
          </div>
          <h2 className="section-title">
            Kepuasan Nyata dari <span style={{ color: 'var(--prussian-blue)' }}>Klien Aksara Tech</span>
          </h2>
          <p className="section-desc">
            Dari mahasiswa teknik informatika yang sukses sidang skripsi hingga pengusaha UMKM dan korporat, berikut ulasan nyata rekam jejak kerja kami.
          </p>
        </div>

        {/* Category Filters */}
        <div className="testi-filter-bar">
          {categories.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`testi-filter-btn ${isActive ? 'active' : ''}`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Testimonial Showcase Box */}
        <div className="testi-stage-container">
          
          {/* Pinned Vertical Yellow Ribbon */}
          <div className="testi-vertical-ribbon">
            <span className="vertical-text">
              ★ TESTIMONI RESMI KLIEN AKSARA TECH ★
            </span>
          </div>

          {/* Carousel Track */}
          <div 
            ref={trackRef}
            onScroll={handleScroll}
            className="testi-carousel-scroll-track"
          >
            {filteredTestimonials.map((item, idx) => (
              <div key={item.id} className="testi-slide-item">
                
                {/* Top Meta Bar */}
                <div className="testi-meta-row">
                  <div className="testi-stars-group">
                    <div className="testi-stars">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={17} fill="#F59E0B" color="#F59E0B" />
                      ))}
                    </div>
                    <span className="testi-rating-text">5.0 / 5.0</span>
                  </div>

                  <div className="testi-badges-group">
                    <span className="testi-cat-badge">{item.tag}</span>
                    <span className="testi-verified-badge">
                      <CheckCircle2 size={13} style={{ color: '#059669' }} />
                      <span>Terverifikasi</span>
                    </span>
                  </div>
                </div>

                {/* Quote Body */}
                <div className="testi-quote-wrap">
                  <div className="testi-quote-mark">“</div>
                  <p className="testi-quote-text">
                    "{item.quote.replace(/^["“\s]+|["”\s]+$/g, '')}"
                  </p>
                </div>

                {/* Author Info & Interactive Carousel Controls */}
                <div className="testi-footer-row">
                  
                  {/* Author Details */}
                  <div className="testi-author-info">
                    <div className="testi-avatar-box">
                      <span>{getInitials(item.name)}</span>
                    </div>
                    <div>
                      <div className="testi-author-name">{item.name}</div>
                      <div className="testi-author-role">
                        {item.role} &bull; <span className="testi-org">{item.organization}</span>
                      </div>
                      <div className="testi-package-tag">
                        <Sparkles size={12} style={{ color: '#D97706' }} />
                        <span>Paket Digunakan: <strong>{item.packageUsed}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Carousel Controls */}
                  <div className="testi-controls-group">
                    <div className="testi-slide-index">
                      <span className="index-active">0{idx + 1}</span>
                      <span className="index-divider">/</span>
                      <span className="index-total">0{filteredTestimonials.length}</span>
                    </div>

                    <div className="testi-nav-arrows">
                      <button
                        type="button"
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="testi-arrow-btn"
                        title="Ulasan Sebelumnya"
                        aria-label="Ulasan Sebelumnya"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={currentIndex === filteredTestimonials.length - 1}
                        className="testi-arrow-btn"
                        title="Ulasan Berikutnya"
                        aria-label="Ulasan Berikutnya"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>

        </div>

        {/* Mobile-Only Pagination Dots (Hidden on Desktop) */}
        <div className="testi-mobile-dots">
          {filteredTestimonials.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => scrollToSlide(dotIdx)}
              className={`testi-dot ${currentIndex === dotIdx ? 'active' : ''}`}
              title={`Lompat ke Testimoni ${dotIdx + 1}`}
              aria-label={`Lompat ke Testimoni ${dotIdx + 1}`}
            />
          ))}
        </div>

        {/* Mobile-Only Swipe Hint (Hidden on Desktop) */}
        <div className="testi-mobile-hint">
          <Sparkles size={13} style={{ color: '#D97706' }} />
          <span>Geser kartu ke kanan atau kiri untuk membaca ulasan lainnya</span>
        </div>

      </div>

      {/* Embedded CSS with Strict Desktop vs Mobile Separation */}
      <style>{`
        /* =======================================================
           COMMON TESTIMONIAL STYLES
           ======================================================= */
        /* Mobile Elements default to hidden (Strict desktop protection) */
        .testi-mobile-dots,
        .testi-mobile-hint {
          display: none;
        }

        .testi-filter-bar {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 32px;
        }

        .testi-filter-btn {
          padding: 8px 18px;
          border-radius: 6px;
          font-size: 0.84rem;
          font-weight: 800;
          background: #FFFFFF;
          color: #334155;
          border: 1.5px solid #CBD5E1;
          box-shadow: 1.5px 1.5px 0px #E2E8F0;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .testi-filter-btn:hover {
          border-color: #0F172A;
          color: #0F172A;
          transform: translateY(-1px);
        }

        .testi-filter-btn.active {
          background: var(--prussian-blue);
          color: #FFFFFF;
          border-color: #0F172A;
          box-shadow: 2px 2px 0px #0F172A;
        }

        .testi-stage-container {
          max-width: 940px;
          margin: 0 auto;
          background: #FFFFFF;
          border: 2px solid #0F172A;
          border-radius: var(--radius-md);
          box-shadow: 6px 6px 0px var(--prussian-blue);
          display: flex;
          overflow: hidden;
          position: relative;
          align-items: stretch;
        }

        /* Pinned Vertical Yellow Ribbon */
        .testi-vertical-ribbon {
          background: var(--kuning);
          border-right: 2px solid #0F172A;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          user-select: none;
          z-index: 10;
        }

        .vertical-text {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-family: var(--font-heading);
          font-weight: 900;
          text-transform: uppercase;
          color: #0F172A;
          white-space: nowrap;
        }

        .testi-carousel-scroll-track {
          flex: 1;
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          position: relative;
          align-items: stretch;
        }

        .testi-carousel-scroll-track::-webkit-scrollbar {
          display: none;
        }

        .testi-slide-item {
          flex: 0 0 100%;
          min-width: 100%;
          scroll-snap-align: start;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: #FFFFFF;
          box-sizing: border-box;
        }

        .testi-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .testi-stars-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .testi-stars {
          display: flex;
          gap: 3px;
        }

        .testi-rating-text {
          font-size: 0.82rem;
          font-weight: 900;
          color: #0F172A;
          font-family: var(--font-mono);
        }

        .testi-badges-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .testi-cat-badge {
          background: #F1F5F9;
          border: 1.5px solid #0F172A;
          padding: 3px 10px;
          border-radius: 4px;
          font-size: 0.72rem;
          font-weight: 800;
          color: #0F172A;
        }

        .testi-verified-badge {
          background: #ECFDF5;
          border: 1.5px solid #10B981;
          padding: 3px 10px;
          border-radius: 4px;
          font-size: 0.72rem;
          font-weight: 800;
          color: #065F46;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .testi-quote-wrap {
          position: relative;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .testi-quote-mark {
          font-size: 3.8rem;
          font-family: Georgia, serif;
          color: var(--kuning);
          position: absolute;
          top: -24px;
          left: -10px;
          opacity: 0.55;
          pointer-events: none;
          line-height: 1;
        }

        .testi-quote-text {
          line-height: 1.68;
          color: #0F172A;
          font-weight: 600;
          font-style: italic;
          position: relative;
          z-index: 1;
          margin: 0;
        }

        .testi-footer-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          border-top: 2px solid #E2E8F0;
        }

        .testi-author-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .testi-avatar-box {
          width: 44px;
          height: 44px;
          border-radius: 8px;
          background: var(--prussian-blue);
          border: 2px solid #0F172A;
          box-shadow: 2px 2px 0px var(--kuning);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          font-weight: 900;
          font-size: 1rem;
          font-family: var(--font-heading);
          flex-shrink: 0;
        }

        .testi-author-name {
          font-size: 1rem;
          font-weight: 900;
          color: #0F172A;
          line-height: 1.25;
        }

        .testi-author-role {
          font-size: 0.8rem;
          color: #475569;
          font-weight: 500;
          margin-top: 2px;
        }

        .testi-org {
          color: #0F172A;
          font-weight: 700;
        }

        .testi-package-tag {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 5px;
          font-size: 0.76rem;
          color: #64748B;
        }

        .testi-package-tag strong {
          color: var(--prussian-blue);
        }

        .testi-controls-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .testi-slide-index {
          background: #F1F5F9;
          border: 1.5px solid #0F172A;
          padding: 5px 10px;
          border-radius: 4px;
          font-family: var(--font-mono);
          font-weight: 900;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.82rem;
        }

        .index-active {
          color: var(--prussian-blue);
        }

        .index-divider {
          color: #94A3B8;
        }

        .index-total {
          color: #475569;
        }

        .testi-nav-arrows {
          display: flex;
          gap: 8px;
        }

        .testi-arrow-btn {
          width: 38px;
          height: 38px;
          border-radius: 6px;
          background: #FFFFFF;
          border: 2px solid #0F172A;
          color: #0F172A;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 2px 2px 0px #0F172A;
          transition: all 0.15s ease;
        }

        .testi-arrow-btn:hover:not(:disabled) {
          background: var(--kuning);
          transform: translate(-1px, -1px);
        }

        .testi-arrow-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
          box-shadow: 1px 1px 0px #CBD5E1;
        }

        /* =======================================================
           DESKTOP VIEW (Breakpoints: >= 1024px)
           Compact, Balanced, NO Giant Empty Voids, NO Mobile Swipe Dots
           ======================================================= */
        @media (min-width: 1024px) {
          .testi-stage-container {
            min-height: 360px;
          }

          .testi-vertical-ribbon {
            width: 56px;
            padding: 20px 0;
          }

          .vertical-text {
            font-size: 0.95rem;
            letter-spacing: 0.14em;
          }

          .testi-slide-item {
            padding: 30px 36px;
            min-height: 360px;
          }

          .testi-quote-wrap {
            margin: 14px 0 20px 0;
            min-height: 100px;
          }

          .testi-quote-text {
            font-size: 1.15rem;
          }

          .testi-footer-row {
            padding-top: 18px;
          }

          /* Hide Mobile Swipe Dots & Hint on Desktop */
          .testi-mobile-dots,
          .testi-mobile-hint {
            display: none !important;
          }
        }

        /* =======================================================
           MOBILE & TABLET VIEW (Breakpoints: < 1024px)
           Strict Consistent Height, Touch-Optimized
           ======================================================= */
        @media (max-width: 1023px) {
          .testi-stage-container {
            min-height: 540px;
            height: 540px;
          }

          .testi-vertical-ribbon {
            width: 48px;
            padding: 16px 0;
            height: 100%;
          }

          .vertical-text {
            font-size: 0.85rem;
            letter-spacing: 0.1em;
          }

          .testi-carousel-scroll-track {
            height: 100%;
          }

          .testi-slide-item {
            min-height: 540px;
            height: 100%;
            padding: 22px 16px 18px 16px;
          }

          .testi-quote-wrap {
            margin: 12px 0 16px 0;
            min-height: 160px;
          }

          .testi-quote-text {
            font-size: 0.92rem;
            line-height: 1.6;
          }

          .testi-footer-row {
            flex-direction: column;
            align-items: stretch;
            gap: 14px;
            padding-top: 14px;
          }

          .testi-controls-group {
            justify-content: space-between;
          }

          /* Mobile Dots Track */
          .testi-mobile-dots {
            display: flex !important;
            justify-content: center;
            gap: 8px;
            margin-top: 20px;
          }

          .testi-dot {
            width: 9px;
            height: 9px;
            border-radius: 9999px;
            background: #CBD5E1;
            border: 1.5px solid #0F172A;
            cursor: pointer;
            transition: all 0.2s ease;
            padding: 0;
          }

          .testi-dot.active {
            width: 24px;
            background: var(--kuning);
            box-shadow: 1px 1px 0px #0F172A;
          }

          .testi-mobile-hint {
            display: flex !important;
            align-items: center;
            justify-content: center;
            gap: 6px;
            font-size: 0.78rem;
            color: #64748B;
            font-weight: 600;
            margin-top: 10px;
          }
        }
      `}</style>
    </section>
  );
}
