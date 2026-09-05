import { useEffect, useState } from 'react';

// Matches the Tailwind `md:` breakpoint (768px) used everywhere else in the
// design system, so "mobile" here means the same thing it means in every
// className in this codebase.
const QUERY = '(max-width: 767px)';

/**
 * True below the `md:` breakpoint. Used to gate expensive scroll-driven
 * machinery (Lenis, WebGL tuning, layout-shared-element transitions) that
 * has no place on a touch viewport — separate from `useReducedMotion`,
 * which reflects an explicit accessibility preference rather than device class.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return isMobile;
}
