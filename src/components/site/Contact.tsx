import ShinyText from '@/components/ShinyText';
import { SectionHeader } from './SectionHeader';
import { contact, identity } from '@/content/profile';

interface ContactProps {
  motionEnabled: boolean;
}

const links = [
  { label: 'GitHub', href: contact.github },
  { label: 'LinkedIn', href: contact.linkedin },
  { label: 'Résumé (PDF)', href: contact.resumeHref, download: true },
];

export function Contact({ motionEnabled }: ContactProps) {
  return (
    <section id="contact" className="border-t border-line bg-ink px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader label="Contact" readout={identity.location} />

        <a
          href={`mailto:${contact.email}`}
          className="mt-12 block break-all font-display font-bold leading-[0.95] text-signal transition-opacity hover:opacity-80"
          style={{ fontSize: 'clamp(2rem, 7vw, 6rem)', letterSpacing: '-0.03em' }}
        >
          {motionEnabled ? <ShinyText text={contact.email} speed={3.5} /> : contact.email}
        </a>

        <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-8">
          {links.map(link => (
            <a
              key={link.label}
              href={link.href}
              target={link.download ? undefined : '_blank'}
              rel={link.download ? undefined : 'noopener noreferrer'}
              download={link.download}
              className="font-mono text-sm uppercase tracking-[0.1em] text-muted-ink transition-colors hover:text-signal"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-20 flex max-w-6xl flex-col gap-2 border-t border-line pt-6 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-ink sm:flex-row sm:items-center sm:justify-between">
        <span>{identity.name} — {identity.role}</span>
        <span>Built with React · GSAP · WebGL</span>
      </div>
    </section>
  );
}
