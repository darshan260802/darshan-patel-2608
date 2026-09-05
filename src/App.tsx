import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';
import { Header } from '@/components/site/Header';
import { Hero } from '@/components/site/Hero';
import { StackMarquee } from '@/components/site/StackMarquee';
import { Summary } from '@/components/site/Summary';
import { TrackRecord } from '@/components/site/TrackRecord';
import { Systems } from '@/components/site/Systems';
import { Stack } from '@/components/site/Stack';
import { Contact } from '@/components/site/Contact';

function App() {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const motionEnabled = !reducedMotion;
  // Lenis's rAF-driven smooth-scroll fights touch scrolling rather than
  // helping it — real browsers already handle momentum scroll natively.
  useSmoothScroll(motionEnabled && !isMobile);

  return (
    <div className="min-h-screen bg-ink">
      <Header />
      <main>
        <Hero motionEnabled={motionEnabled} isMobile={isMobile} />
        <StackMarquee motionEnabled={motionEnabled} />
        <Summary motionEnabled={motionEnabled} isMobile={isMobile} />
        <TrackRecord motionEnabled={motionEnabled} />
        <Systems motionEnabled={motionEnabled} isMobile={isMobile} />
        <Stack motionEnabled={motionEnabled} />
      </main>
      <Contact motionEnabled={motionEnabled} />
    </div>
  );
}

export default App;
