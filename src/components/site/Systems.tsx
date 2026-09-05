import { useState, type MouseEvent } from 'react';
import { motion } from 'motion/react';
import SpotlightCard from '@/components/SpotlightCard';
import CountUp from '@/components/CountUp';
import { SectionHeader } from './SectionHeader';
import { ProjectModal } from './ProjectModal';
import { projects, packages, type ProjectEntry, type PackageEntry } from '@/content/profile';
import { projectToPreviewTarget, packageToPreviewTarget, type PreviewTarget } from '@/lib/preview';

interface SystemsProps {
  motionEnabled: boolean;
  isMobile: boolean;
}

function shouldOpenInline(e: MouseEvent) {
  return !(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0);
}

function ProjectCard({
  project,
  motionEnabled,
  useLayoutTransition,
  onLaunch,
}: {
  project: ProjectEntry;
  motionEnabled: boolean;
  useLayoutTransition: boolean;
  onLaunch: (e: MouseEvent<HTMLAnchorElement>, project: ProjectEntry) => void;
}) {
  const [primary, ...secondary] = project.links;
  const launchLabel = project.preview ? 'Open preview' : 'View package';

  return (
    <SpotlightCard spotlightColor="rgba(255, 255, 255, 0.08)" className="flex flex-col gap-6">
      <div>
        <h3 className="font-display text-2xl font-bold text-signal md:text-3xl">{project.name}</h3>
        <p className="mt-2 max-w-xl font-sans text-sm text-muted-ink">{project.tagline}</p>
      </div>

      {project.metrics && (
        <div className="flex flex-wrap gap-x-10 gap-y-4 border-y border-line py-5">
          {project.metrics.map(metric => (
            <div key={metric.label} className="flex flex-col gap-1">
              <span className="font-display text-3xl font-bold text-signal md:text-4xl">
                {metric.prefix}
                {motionEnabled ? (
                  <CountUp to={metric.value} duration={1.4} />
                ) : (
                  metric.value
                )}
                {metric.suffix}
              </span>
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-ink">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      )}

      <ul className="flex flex-col gap-3">
        {project.points.map(point => (
          <li key={point} className="flex gap-3 font-sans text-[0.95rem] leading-relaxed text-paper">
            <span aria-hidden className="mt-[0.6em] h-px w-4 shrink-0 bg-line-hi" />
            {point}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2">
        {project.stack.map(tech => (
          <span
            key={tech}
            className="border border-line px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-muted-ink"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-6">
        {primary && (
          <motion.a
            href={primary.href}
            onClick={e => onLaunch(e, project)}
            layoutId={useLayoutTransition ? `panel-${project.id}` : undefined}
            className="border border-line-hi px-4 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-signal transition-colors hover:bg-signal hover:text-ink"
          >
            {launchLabel} ↗
          </motion.a>
        )}
        {secondary.map(link => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-[0.1em] text-muted-ink transition-colors hover:text-signal"
          >
            {link.label} ↗
          </a>
        ))}
      </div>
    </SpotlightCard>
  );
}

export function Systems({ motionEnabled, isMobile }: SystemsProps) {
  const [target, setTarget] = useState<PreviewTarget | null>(null);
  // The shared-layout scale-out (small button → fullscreen panel) is the
  // surface where the modal-open race lived, and it's an expensive layout
  // animation to run on a touch viewport regardless. Skip it on mobile; the
  // modal still opens via the plain fade/scale fallback.
  const useLayoutTransition = motionEnabled && !isMobile;

  const openProject = (e: MouseEvent<HTMLAnchorElement>, project: ProjectEntry) => {
    if (!shouldOpenInline(e)) return;
    e.preventDefault();
    setTarget(projectToPreviewTarget(project));
  };

  const openPackage = (e: MouseEvent<HTMLAnchorElement>, pkg: PackageEntry) => {
    if (!shouldOpenInline(e)) return;
    e.preventDefault();
    setTarget(packageToPreviewTarget(pkg));
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
      <SectionHeader id="systems" label="Systems" readout={`${projects.length + packages.length} SHIPPED`} />

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {projects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            motionEnabled={motionEnabled}
            useLayoutTransition={useLayoutTransition}
            onLaunch={openProject}
          />
        ))}
      </div>

      <div className="mt-6 border border-line bg-surface p-8">
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-ink">
          Published packages
        </span>
        <ul className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-8">
          {packages.map(pkg => (
            <li key={pkg.name}>
              <motion.a
                href={pkg.href}
                onClick={e => openPackage(e, pkg)}
                layoutId={useLayoutTransition ? `panel-${pkg.name}` : undefined}
                className="font-mono text-sm text-paper underline decoration-line-hi decoration-1 underline-offset-4 transition-colors hover:text-signal hover:decoration-signal"
              >
                {pkg.name} ↗
              </motion.a>
            </li>
          ))}
        </ul>
      </div>

      <ProjectModal target={target} useLayoutTransition={useLayoutTransition} onClose={() => setTarget(null)} />
    </section>
  );
}
