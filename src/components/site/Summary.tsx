import ScrollReveal from '@/components/ScrollReveal';
import { SectionHeader } from './SectionHeader';
import { identity, education } from '@/content/profile';

interface SummaryProps {
  motionEnabled: boolean;
  isMobile: boolean;
}

export function Summary({ motionEnabled, isMobile }: SummaryProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
      <SectionHeader id="summary" label="Summary" readout={`${identity.yearsActive} YRS ACTIVE`} />

      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto]">
        {motionEnabled ? (
          <ScrollReveal
            baseOpacity={0.08}
            baseRotation={2}
            blurStrength={3}
            enableBlur={!isMobile}
            containerClassName="max-w-3xl"
            textClassName="font-display text-2xl font-medium leading-[1.15] text-paper md:text-4xl"
          >
            {identity.summary}
          </ScrollReveal>
        ) : (
          <p className="max-w-3xl font-display text-2xl font-medium leading-[1.15] text-paper md:text-4xl">
            {identity.summary}
          </p>
        )}

        <dl className="flex shrink-0 flex-col gap-4 self-start border-l border-line pl-6 font-mono text-sm">
          <div>
            <dt className="text-[0.625rem] uppercase tracking-[0.16em] text-muted-ink">Education</dt>
            <dd className="mt-1 text-paper">{education.degree}</dd>
          </div>
          <div>
            <dt className="text-[0.625rem] uppercase tracking-[0.16em] text-muted-ink">School</dt>
            <dd className="mt-1 text-paper">{education.school}</dd>
          </div>
          <div>
            <dt className="text-[0.625rem] uppercase tracking-[0.16em] text-muted-ink">Graduated</dt>
            <dd className="mt-1 text-paper">{education.date}</dd>
          </div>
          <div>
            <dt className="text-[0.625rem] uppercase tracking-[0.16em] text-muted-ink">CGPA</dt>
            <dd className="mt-1 text-paper">{education.cgpa}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
