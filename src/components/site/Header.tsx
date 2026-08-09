import { useEffect, useState } from 'react';
import { StaggeredMenu } from '@/components/StaggeredMenu';
import { navItems, contact } from '@/content/profile';

export function Header() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const max = scrollHeight - clientHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, scrollTop / max)) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 z-30 flex w-full items-center justify-between border-b border-line bg-ink/80 px-6 py-4 backdrop-blur-sm md:px-10">
        <a href="#top" aria-label="Darshan Patel — home" className="block transition-opacity hover:opacity-80">
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
            className="h-full bg-signal transition-[width] duration-150 ease-out"
            style={{ width: `${progress * 100}%` }}
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
