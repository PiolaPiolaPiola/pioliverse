import { useEffect } from 'react';

const NAV_OFFSET = 80;
const MIN_DURATION_MS = 500;
const MAX_DURATION_MS = 1400;
const MS_PER_PIXEL = 0.15;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function useSmoothAnchors() {
  useEffect(() => {
    let frame = 0;

    const stop = () => cancelAnimationFrame(frame);

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;

      const id = decodeURIComponent(link.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (!target) return;

      e.preventDefault();
      history.pushState(null, '', `#${id}`);

      const start = window.scrollY;
      const end = Math.max(0, target.getBoundingClientRect().top + start - NAV_OFFSET);
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.scrollTo(0, end);
        return;
      }

      const distance = Math.abs(end - start);
      const duration = Math.min(MAX_DURATION_MS, MIN_DURATION_MS + distance * MS_PER_PIXEL);
      const begin = performance.now();

      stop();
      const step = (now: number) => {
        const progress = Math.min(1, (now - begin) / duration);
        window.scrollTo(0, start + (end - start) * easeInOutCubic(progress));
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    document.addEventListener('click', onClick);
    window.addEventListener('wheel', stop, { passive: true });
    window.addEventListener('touchstart', stop, { passive: true });
    window.addEventListener('keydown', stop);
    return () => {
      stop();
      document.removeEventListener('click', onClick);
      window.removeEventListener('wheel', stop);
      window.removeEventListener('touchstart', stop);
      window.removeEventListener('keydown', stop);
    };
  }, []);
}
