import AnimatedContent from '@/components/AnimatedContent';
import { SectionHeader } from './SectionHeader';
import { experience } from '@/content/profile';

interface TrackRecordProps {
  motionEnabled: boolean;
}

function Entry({ entry }: { entry: (typeof experience)[number] }) {
  return (
    <div className="grid grid-cols-1 gap-4 border-t border-line py-10 md:grid-cols-[220px_1fr] md:gap-10">
      <div className="flex flex-col gap-1">
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted-ink">
          {entry.period}
        </span>
        <h3 className="font-display text-xl font-bold text-signal">{entry.company}</h3>
        <span className="font-sans text-sm text-muted-ink">{entry.role}</span>
      </div>
      <ul className="flex flex-col gap-3">
        {entry.points.map(point => (
          <li key={point} className="flex gap-3 font-sans text-[0.95rem] leading-relaxed text-paper">
            <span aria-hidden className="mt-[0.6em] h-px w-4 shrink-0 bg-line-hi" />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TrackRecord({ motionEnabled }: TrackRecordProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
      <SectionHeader id="track-record" label="Track Record" readout="2023 — PRESENT" />
      <div>
        {experience.map((entry, i) =>
          motionEnabled ? (
            <AnimatedContent key={entry.company} distance={40} duration={0.7} delay={i * 0.1} threshold={0.15}>
              <Entry entry={entry} />
            </AnimatedContent>
          ) : (
            <Entry key={entry.company} entry={entry} />
          ),
        )}
      </div>
    </section>
  );
}
