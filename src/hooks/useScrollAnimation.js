import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Aksara Tech - Executive Scroll Reveal Observer
 * Uses high-performance IntersectionObserver with GPU-accelerated CSS classes.
 * Automatically scans and reveals elements marked with .reveal-on-scroll, .reveal-stagger, or .reveal-scale.
 */
export function useScrollAnimation() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const selector = '.reveal-on-scroll, .reveal-stagger, .reveal-fade, .reveal-scale';
    const elements = document.querySelectorAll(selector);

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target); // Unobserve to retain state and avoid re-trigger jitter
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    // Initial check: immediately reveal elements already visible in viewport
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('is-revealed');
      } else {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [location.pathname]);
}
