import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * Aksara Tech - Scroll Enhancements
 * 1. Top Scroll Progress Indicator (Hairline gradient line with GPU scaleX)
 * 2. Floating Back-to-Top Button (Refined executive pill with smooth scroll)
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

          setShowBackToTop(currentY > 380);
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

  return (
    <>
      {/* 1. Slim Top Scroll Progress Line (GPU accelerated transform) */}
      <div
        className="scroll-progress-line"
        style={{
          transform: `scaleX(${scrollProgress})`
        }}
        aria-hidden="true"
      />

      {/* 2. Floating Back-to-Top Pill Button */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`back-to-top-btn ${showBackToTop ? 'is-visible' : ''}`}
        aria-label="Kembali ke atas halaman"
        title="Kembali ke bagian atas"
      >
        <ArrowUp size={15} style={{ color: '#0F172A' }} />
        <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>Ke Atas</span>
      </button>
    </>
  );
}
