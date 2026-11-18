import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * Aksara Tech - Executive Scroll Enhancements
 * 1. Top Scroll Indicator Line with GPU scaleX
 * 2. Floating Circular Progress Ring & Smooth Back-to-Top Pill
 */
export default function ScrollEnhancements() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY || window.pageYOffset;
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

          if (totalHeight > 0) {
            const progress = Math.min(1, Math.max(0, currentY / totalHeight));
            setScrollProgress(progress);
          } else {
            setScrollProgress(0);
          }

          setShowBackToTop(currentY > 320);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Circular progress calculations (Radius = 14, Circumference ≈ 87.96)
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - scrollProgress * circumference;
  const progressPercent = Math.round(scrollProgress * 100);

  return (
    <>
      {/* 1. Hairline Top Scroll Progress Indicator */}
      <div
        className="scroll-progress-line"
        style={{
          transform: `scaleX(${scrollProgress})`
        }}
        aria-hidden="true"
      />

      {/* 2. Floating Circular Progress & Back-to-Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`back-to-top-control ${showBackToTop ? 'is-visible' : ''}`}
        aria-label={`Kembali ke atas halaman (${progressPercent}% dibaca)`}
        title={`Kembali ke bagian atas (${progressPercent}%)`}
      >
        <div className="back-to-top-ring-wrap" aria-hidden="true">
          <svg className="progress-ring-svg" width="34" height="34" viewBox="0 0 34 34">
            {/* Background subtle track */}
            <circle
              className="progress-ring-track"
              cx="17"
              cy="17"
              r={radius}
              stroke="#E2E8F0"
              strokeWidth="2.5"
              fill="none"
            />
            {/* Active filled progress stroke */}
            <circle
              className="progress-ring-fill"
              cx="17"
              cy="17"
              r={radius}
              stroke="#1D63FF"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              style={{
                strokeDashoffset: strokeDashoffset,
                transition: 'stroke-dashoffset 0.1s ease-out'
              }}
            />
          </svg>
          <div className="progress-ring-icon">
            <ArrowUp size={13} strokeWidth={2.5} style={{ color: '#0F172A' }} />
          </div>
        </div>

        <span className="back-to-top-label">Ke Atas</span>
        <span className="back-to-top-percentage">{progressPercent}%</span>
      </button>
    </>
  );
}
