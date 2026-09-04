import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Module-scoped so a modal (outside App's render tree) can pause/resume the
// same Lenis instance without needing React context plumbing.
let activeLenis: Lenis | null = null;
let activeTick: ((time: number) => void) | null = null;

/** Stop Lenis's RAF loop, e.g. while a modal with its own scroll is open. */
export function stopSmoothScroll() {
  if (activeLenis && activeTick) {
    gsap.ticker.remove(activeTick);
    activeLenis.stop();
  }
}

/** Resume Lenis after `stopSmoothScroll`. */
export function startSmoothScroll() {
  if (activeLenis && activeTick) {
    activeLenis.start();
    gsap.ticker.add(activeTick);
  }
}

export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({ lerp: 0.09, anchors: true });
    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    activeLenis = lenis;
    activeTick = tick;

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      activeLenis = null;
      activeTick = null;
    };
  }, [enabled]);
}
