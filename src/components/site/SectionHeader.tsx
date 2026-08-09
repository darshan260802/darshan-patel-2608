interface SectionHeaderProps {
  label: string;
  readout: string;
  id?: string;
}

export function SectionHeader({ label, readout, id }: SectionHeaderProps) {
  return (
    <div id={id} className="flex items-baseline justify-between gap-4 border-b border-line pb-4 scroll-mt-24">
      <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-paper">{label}</span>
      <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-ink text-right">
        {readout}
      </span>
    </div>
  );
}
