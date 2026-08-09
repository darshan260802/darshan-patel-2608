import Magnet from '@/components/Magnet';
import { SectionHeader } from './SectionHeader';
import { stack } from '@/content/profile';

interface StackProps {
  motionEnabled: boolean;
}

const totalTools = stack.reduce((sum, group) => sum + group.items.length, 0);

export function Stack({ motionEnabled }: StackProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
      <SectionHeader id="stack" label="Stack" readout={`${totalTools} TOOLS`} />

      <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2">
        {stack.map(group => (
          <div key={group.label}>
            <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted-ink">{group.label}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map(item =>
                motionEnabled ? (
                  <Magnet key={item} padding={40} magnetStrength={6}>
                    <span className="block cursor-default border border-line px-3 py-1.5 font-sans text-sm text-paper transition-colors hover:border-line-hi hover:text-signal">
                      {item}
                    </span>
                  </Magnet>
                ) : (
                  <span
                    key={item}
                    className="border border-line px-3 py-1.5 font-sans text-sm text-paper"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
