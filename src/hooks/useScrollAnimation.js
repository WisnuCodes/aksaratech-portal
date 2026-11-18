import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Aksara Tech - Executive Scroll Reveal & Kinetic Counter Observer
 * Features:
 * 1. Defocus-to-Sharp Optical Reveal (blur -> crisp, scale 0.97 -> 1, translateY)
 * 2. Cascading Micro-Stagger for Cards and Grids
 * 3. Kinetic Smooth Number Counters for metrics & telemetry
 */
export function useScrollAnimation() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const selector = '.reveal-on-scroll, .reveal-stagger, .reveal-fade, .reveal-scale, .counter-tick';
    const elements = document.querySelectorAll(selector);

    const animateCounter = (el) => {
      if (el.dataset.animated === 'true') return;
      el.dataset.animated = 'true';

      const target = parseFloat(el.getAttribute('data-target') || '0');
      const duration = parseInt(el.getAttribute('data-duration') || '1100', 10);
      const prefix = el.getAttribute('data-prefix') || '';
      const suffix = el.getAttribute('data-suffix') || '';
      const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      const isCurrency = el.getAttribute('data-format') === 'currency';

      let start = null;
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // Strong ease-out cubic
        const current = progress === 1 ? target : target * ease;

        let formatted = decimals > 0 ? current.toFixed(decimals) : Math.round(current).toString();
        if (isCurrency) {
          formatted = Math.round(current).toLocaleString('id-ID');
        }
        el.textContent = `${prefix}${formatted}${suffix}`;

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach(el => {
        el.classList.add('is-revealed');
        if (el.classList.contains('counter-tick')) {
          const target = el.getAttribute('data-target') || '0';
          const prefix = el.getAttribute('data-prefix') || '';
          const suffix = el.getAttribute('data-suffix') || '';
          const isCurrency = el.getAttribute('data-format') === 'currency';
          const formatted = isCurrency ? parseFloat(target).toLocaleString('id-ID') : target;
          el.textContent = `${prefix}${formatted}${suffix}`;
        }
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');

            // Trigger counter animation if element or child has .counter-tick
            if (entry.target.classList.contains('counter-tick')) {
              animateCounter(entry.target);
            }
            const innerCounters = entry.target.querySelectorAll('.counter-tick');
            innerCounters.forEach(c => animateCounter(c));

            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('is-revealed');
        if (el.classList.contains('counter-tick')) {
          animateCounter(el);
        }
      } else {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [location.pathname]);
}
