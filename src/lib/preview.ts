import type { PackageEntry, ProjectEntry, ProjectLink } from '@/content/profile';

export type PreviewTarget =
  | { mode: 'embed'; id: string; title: string; url: string; links: ProjectLink[] }
  | {
      mode: 'datasheet';
      id: string;
      title: string;
      subtitle?: string;
      install?: string;
      version?: string;
      points?: string[];
      stack?: string[];
      links: ProjectLink[];
    };

export function projectToPreviewTarget(project: ProjectEntry): PreviewTarget {
  if (project.preview) {
    return {
      mode: 'embed',
      id: project.id,
      title: project.preview.title,
      url: project.preview.url,
      links: project.links,
    };
  }

  return {
    mode: 'datasheet',
    id: project.id,
    title: project.name,
    subtitle: project.tagline,
    install: project.install,
    version: project.version,
    points: project.points,
    stack: project.stack,
    links: project.links,
  };
}

export function packageToPreviewTarget(pkg: PackageEntry): PreviewTarget {
  return {
    mode: 'datasheet',
    id: pkg.name,
    title: pkg.name,
    install: pkg.install,
    version: pkg.version,
    links: [
      { label: 'npm', href: pkg.href, kind: 'npm' },
      { label: 'Source', href: pkg.repo, kind: 'repo' },
    ],
  };
}
