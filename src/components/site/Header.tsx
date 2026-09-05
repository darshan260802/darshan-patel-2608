import { useEffect, useRef } from 'react';
import { StaggeredMenu } from '@/components/StaggeredMenu';
import { navItems, contact } from '@/content/profile';

export function Header() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Writes straight to the DOM instead of `setState` — the original drove
    // a React re-render of the whole header (and an animated, non-composited
    // `width`) on every scroll event, which is exactly the kind of per-frame
    // main-thread work that reads as stutter on a phone. rAF-batched so a
    // burst of scroll events collapses to one write per frame, and
    // `transform: scaleX` is compositor-only.
    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        const max = scrollHeight - clientHeight;
        const progress = max > 0 ? Math.min(1, Math.max(0, scrollTop / max)) : 0;
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 z-30 flex w-full items-center justify-between border-b border-line bg-ink/95 px-6 py-4 md:bg-ink/80 md:px-10 md:backdrop-blur-sm">
        <a
          href="#top"
          aria-label="Darshan Patel — home"
          className="hidden transition-opacity hover:opacity-80 md:block"
        >
          <img src="/logo1.png" alt="" className="h-8 w-8" width={32} height={32} />
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map(item => (
            <a
              key={item.link}
              href={item.link}
              className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-ink transition-colors hover:text-signal"
            >
              {item.label}
            </a>
          ))}
          <a
            href={contact.resumeHref}
            download
            className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-paper transition-colors hover:text-signal"
          >
            Résumé ↓
          </a>
        </nav>
        <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-line">
          <div
            ref={progressRef}
            className="h-full w-full origin-left bg-signal"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </header>

      <div className="md:hidden">
        <StaggeredMenu
          isFixed
          position="right"
          logoUrl="/logo1.png"
          items={[...navItems]}
          socialItems={[
            { label: 'GitHub', link: contact.github },
            { label: 'LinkedIn', link: contact.linkedin },
            { label: 'Résumé', link: contact.resumeHref },
          ]}
          displaySocials
          displayItemNumbering
          colors={['#0a0a0a', '#1c1c1c']}
          accentColor="#737373"
          menuButtonColor="#ffffff"
          openMenuButtonColor="#000000"
        />
      </div>
    </>
  );
}
