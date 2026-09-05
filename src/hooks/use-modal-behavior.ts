import { useEffect, useRef, type RefObject } from 'react';
import { startSmoothScroll, stopSmoothScroll } from '@/hooks/use-smooth-scroll';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Owns the behavior a modal dialog needs but doesn't get for free from a
 * plain <div>: scroll lock (Lenis + native fallback), inert-ing the rest of
 * the page, a focus trap, Escape-to-close, and focus restoration on close.
 */
export function useModalBehavior(open: boolean, onClose: () => void, panelRef: RefObject<HTMLElement | null>) {
  const restoreFocusTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    restoreFocusTo.current = document.activeElement as HTMLElement | null;

    const root = document.getElementById('root');
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPaddingRight = document.body.style.paddingRight;

    // Locking scroll removes the scrollbar, which widens the viewport and
    // shifts every measured rect on the page. Motion's shared-layout
    // transition (the panel's `layoutId`) measures its source and
    // destination elements right as this effect runs, so an uncompensated
    // shift here is what made the preview modal's "Establishing…" state
    // intermittent — the fallback timer in ProjectModal is the structural
    // fix, but padding out the lost scrollbar width keeps the page's total
    // width constant, so the lock causes no reflow for Motion to race against.
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = 'hidden';
    stopSmoothScroll();
    if (root) root.inert = true;

    const panel = panelRef.current;
    const firstFocusable = panel?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    (firstFocusable ?? panel)?.focus({ preventScroll: true });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }

      if (e.key !== 'Tab' || !panel) return;

      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        el => el.offsetParent !== null,
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown, true);

    return () => {
      document.removeEventListener('keydown', onKeyDown, true);
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.paddingRight = previousBodyPaddingRight;
      startSmoothScroll();
      if (root) root.inert = false;
      restoreFocusTo.current?.focus({ preventScroll: true });
    };
  }, [open, onClose, panelRef]);
}
