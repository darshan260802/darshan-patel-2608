import { useReducedMotion } from '@/hooks/use-reduced-motion';
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
  const motionEnabled = !reducedMotion;
  useSmoothScroll(motionEnabled);

  return (
    <div className="min-h-screen bg-ink">
      <Header />
      <main>
        <Hero motionEnabled={motionEnabled} />
        <StackMarquee motionEnabled={motionEnabled} />
        <Summary motionEnabled={motionEnabled} />
        <TrackRecord motionEnabled={motionEnabled} />
        <Systems motionEnabled={motionEnabled} />
        <Stack motionEnabled={motionEnabled} />
      </main>
      <Contact motionEnabled={motionEnabled} />
    </div>
  );
}

export default App;
