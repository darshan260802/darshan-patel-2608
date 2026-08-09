import { ScrollVelocity } from '@/components/ScrollVelocity';
import { marqueeTerms } from '@/content/profile';

interface StackMarqueeProps {
  motionEnabled: boolean;
}

const row = marqueeTerms.map(term => `${term} —`).join(' ');

export function StackMarquee({ motionEnabled }: StackMarqueeProps) {
  return (
    <section className="border-y border-line bg-ink py-8 md:py-10" aria-label="Technologies">
      {motionEnabled ? (
        <ScrollVelocity
          texts={[row, row]}
          velocity={40}
          numCopies={4}
          className="font-display text-2xl font-bold uppercase text-paper md:text-4xl"
        />
      ) : (
        <div className="overflow-hidden whitespace-nowrap font-display text-2xl font-bold uppercase text-paper md:text-4xl">
          {row} {row}
        </div>
      )}
    </section>
  );
}
