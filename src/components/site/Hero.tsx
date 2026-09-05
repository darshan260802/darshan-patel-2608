import { useRef } from 'react';
import Threads from '@/components/Threads';
import SplitText from '@/components/SplitText';
import GradualBlur from '@/components/GradualBlur';
import { identity, readout } from '@/content/profile';

interface HeroProps {
  motionEnabled: boolean;
  isMobile: boolean;
}

export function Hero({ motionEnabled, isMobile }: HeroProps) {
  const nameParts = identity.name.toUpperCase().split(' ');
  const introDone = useRef(false);

  return (
    // `svh` (not `dvh`) — `dvh` tracks the mobile browser chrome collapsing
    // as the page scrolls, which resizes this section mid-scroll and forces
    // the WebGL canvas below to rebuild its render target while the user's
    // finger is still moving. `svh` is the smallest stable viewport height,
    // so it never moves once painted.
    <section id="top" className="relative flex h-[100svh] w-full flex-col justify-end overflow-hidden bg-ink">
      <div className="absolute inset-0">
        {motionEnabled ? (
          <Threads
            color={[1, 1, 1]}
            amplitude={1.1}
            distance={0.25}
            enableMouseInteraction={!isMobile}
            maxDpr={isMobile ? 1.5 : 2}
            lineCount={isMobile ? 22 : 40}
          />
        ) : (
          <div className="h-full w-full bg-[repeating-linear-gradient(90deg,var(--line)_0px,var(--line)_1px,transparent_1px,transparent_64px)]" />
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink" />

      {motionEnabled &&
        (isMobile ? (
          // Same visual read as the desktop blur stack — a soft fade into
          // the page ground — without 5 stacked `backdrop-filter` layers
          // sitting over a live WebGL canvas for the entire hero scroll.
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[14rem] bg-gradient-to-b from-transparent to-ink"
          />
        ) : (
          <GradualBlur preset="bottom" strength={2.5} height="14rem" target="parent" zIndex={1} />
        ))}

      <div className="relative z-10 px-6 pb-16 md:px-10 md:pb-24 max-md:translate-y-[-2.8rem]">
        <h1
          className="font-display font-bold uppercase leading-[0.85] text-signal"
          style={{
            fontSize: 'clamp(3.5rem, 12vw, 11rem)',
            fontVariationSettings: "'wdth' 125, 'wght' 700",
            letterSpacing: '-0.045em',
          }}
        >
          {motionEnabled ? (
            nameParts.map((part, i) => (
              <SplitText
                key={part}
                text={part}
                tag="span"
                className="block"
                textAlign="left"
                delay={30}
                duration={0.9}
                splitType="chars"
                from={{ opacity: 0, y: 60 }}
                to={{ opacity: 1, y: 0 }}
                onLetterAnimationComplete={i === nameParts.length - 1 ? () => (introDone.current = true) : undefined}
              />
            ))
          ) : (
            nameParts.map(part => (
              <span key={part} className="block">
                {part}
              </span>
            ))
          )}
        </h1>

        <p className="mt-6 max-w-xl font-sans text-lg text-paper md:text-2xl">
          {identity.role} <span className="text-muted-ink">·</span> {identity.focus}
        </p>

        <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6">
          {readout.map(item => (
            <div key={item.label} className="flex flex-col gap-1">
              <dt className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-ink">{item.label}</dt>
              <dd className="font-mono text-sm text-paper">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
