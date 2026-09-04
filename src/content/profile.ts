export const identity = {
  name: 'Darshan Patel',
  role: 'Software Engineer',
  focus: 'React / TypeScript · Node.js',
  location: 'Ahmedabad, IN',
  yearsActive: '3.5+',
  summary:
    'I build interfaces that hold their frame budget under real load — dashboards syncing over sockets, forms that can’t afford to stutter, component libraries other teams build on. 3.5+ years turning React and Node.js into systems people trust.',
} as const;

export const contact = {
  email: 'darshanpatel2608ce@gmail.com',
  github: 'https://github.com/darshan260802',
  linkedin: 'https://www.linkedin.com/in/darshan-patel-2608',
  resumeHref: '/darshan-patel-resume.pdf',
} as const;

export const readout = [
  { label: 'Years active', value: '3.5+' },
  { label: 'Stack', value: 'React / TS' },
  { label: 'Discipline', value: 'Real-time UI' },
  { label: 'Base', value: 'Ahmedabad, IN' },
] as const;

export const marqueeTerms = [
  'React',
  'TypeScript',
  'Node.js',
  'NestJS',
  'Redux',
  'RxJS',
  'Socket.IO',
  'Angular',
] as const;

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  points: string[];
}

export const experience: ExperienceEntry[] = [
  {
    company: 'Anblicks Inc.',
    role: 'SDE-II, Engg. & AI',
    period: 'Dec 2024 — Present',
    points: [
      'Own end-to-end delivery of customer onboarding and document workflows in React/TypeScript for an enterprise dealership management system.',
      'Built an e-signature document preparation module that automated contract generation, cutting manual paperwork and turnaround time.',
      'Designed and shipped a Smart CRM dashboard that consolidates daily tasks into one actionable view.',
      'Integrated the React frontend with backend APIs and services for real-time dealership data sync and reliable document-workflow state.',
    ],
  },
  {
    company: 'WebOccult Technologies Pvt. Ltd.',
    role: 'Frontend Engineer',
    period: 'Jan 2023 — Nov 2024',
    points: [
      'Architected production Angular and React applications with TypeScript, Redux, and RxJS, improving reuse across products.',
      'Published internal and public NPM packages — angular-video-controller, @darshanpatel2608/human-body-react — standardizing UI patterns across teams.',
      'Translated Figma mockups into responsive, accessible, cross-browser interfaces alongside designers and PMs in agile sprints.',
      'Improved performance and maintainability through modular architecture, lazy loading, and efficient state management.',
    ],
  },
];

export interface MetricEntry {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface ProjectLink {
  label: string;
  href: string;
  kind: 'live' | 'npm' | 'repo';
}

export interface ProjectPreview {
  url: string;
  title: string;
}

export interface ProjectEntry {
  id: string;
  name: string;
  tagline: string;
  stack: string[];
  metrics?: MetricEntry[];
  points: string[];
  links: ProjectLink[];
  /** Present only when the target is known to allow framing — drives embed mode. */
  preview?: ProjectPreview;
  install?: string;
  version?: string;
}

export const projects: ProjectEntry[] = [
  {
    id: 'dev-presence',
    name: 'Dev Presence',
    tagline: 'Hosted portfolio builder — template gallery to a live, publicly deployed product.',
    stack: ['React', 'TypeScript', 'Prisma', 'PostgreSQL', 'Bun / Hono', 'Nginx'],
    preview: { url: 'https://devpresence.dev', title: 'Dev Presence' },
    metrics: [
      { value: 3, label: 'Repos, solo' },
      { value: 5, label: 'Wizard steps' },
      { value: 5, label: 'Animated templates' },
    ],
    points: [
      'Designed and built Dev Presence end-to-end across three repos — a React web app, a Bun/Hono API, and a shared template package — solo, live at devpresence.dev.',
      'Built a 5-step wizard (Basics, Experience, Projects, Skills, Review) with a live-preview panel across desktop, tablet, and phone widths, backed by 5 fully animated templates.',
      'Shipped a one-click publish flow to a hosted subdomain via a server-side Vite build and atomic deployment, plus a ZIP export with no lock-in.',
      'Added subdomain renaming, template switching, content-validated resume/photo uploads, and Google/GitHub/email sign-in with password-reset emails.',
    ],
    links: [
      { label: 'devpresence.dev', href: 'https://devpresence.dev', kind: 'live' },
      { label: 'portfolio-ui', href: 'https://github.com/darshan260802/portfolio-ui', kind: 'repo' },
      { label: 'portfolio-api', href: 'https://github.com/darshan260802/portfolio-api', kind: 'repo' },
      { label: 'portfolio-templates', href: 'https://github.com/darshan260802/portfolio-templates', kind: 'repo' },
    ],
  },
  {
    id: 'claude-dash',
    name: 'Claude Dash',
    tagline: 'Local-first usage dashboard for Claude Code — cost, tokens, and a full session replay.',
    stack: ['React 19', 'TypeScript', 'Node.js', 'Hono'],
    install: 'npx @darshanpatel2608/claude-dash',
    version: '2.1.3',
    metrics: [{ value: 12, label: 'Pages shipped' }],
    points: [
      'Built a local-first dashboard turning Claude Code’s own session logs into live cost, token, and usage analytics, published solo as an installable npm CLI.',
      'Shipped a 12-page React app spanning dashboard, project/session browsers, live activity, and full-text search, plus a transcript viewer for every message, diff, and tool call.',
      'Built secure sharing over a Cloudflare tunnel with an 8-character access code — no account or install required on the visitor’s side.',
      'Built the Hono API backend with a chokidar-based indexer tailing local JSONL logs in near real time, and a pricing service syncing live model costs.',
    ],
    links: [
      { label: 'npm', href: 'https://www.npmjs.com/package/@darshanpatel2608/claude-dash', kind: 'npm' },
      { label: 'Source', href: 'https://github.com/darshan260802/claude-dash', kind: 'repo' },
    ],
  },
];

export interface PackageEntry {
  name: string;
  href: string;
  repo: string;
  install: string;
  version: string;
}

export const packages: PackageEntry[] = [
  {
    name: 'angular-video-controller',
    href: 'https://www.npmjs.com/package/angular-video-controller',
    repo: 'https://github.com/darshan260802/angular-video-controller',
    install: 'npm install angular-video-controller',
    version: '1.1.7',
  },
  {
    name: '@darshanpatel2608/human-body-react',
    href: 'https://www.npmjs.com/package/@darshanpatel2608/human-body-react',
    repo: 'https://github.com/darshan260802/human-body-react',
    install: 'npm install @darshanpatel2608/human-body-react',
    version: '1.2.9',
  },
];

export interface StackGroup {
  label: string;
  items: string[];
}

export const stack: StackGroup[] = [
  { label: 'Frontend', items: ['React', 'Angular', 'JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'Redux', 'RxJS', 'Electron'] },
  { label: 'Backend / APIs', items: ['Node.js', 'NestJS', 'REST APIs', 'Socket.IO'] },
  { label: 'UI / Styling', items: ['SASS/SCSS', 'Tailwind CSS', 'Bootstrap', 'Angular Material', 'Taiga UI', 'Quill Editor'] },
  { label: 'Tools', items: ['Git/GitHub', 'VS Code', 'WebStorm', 'Vite', 'Angular CLI'] },
];

export const education = {
  school: 'Gujarat Technological University',
  degree: 'B.Tech in Computer Engineering',
  date: 'June 2023',
  cgpa: '8.29 / 10',
} as const;

export const navItems = [
  { label: 'Summary', ariaLabel: 'Go to summary', link: '#summary' },
  { label: 'Track Record', ariaLabel: 'Go to track record', link: '#track-record' },
  { label: 'Systems', ariaLabel: 'Go to systems', link: '#systems' },
  { label: 'Stack', ariaLabel: 'Go to stack', link: '#stack' },
  { label: 'Contact', ariaLabel: 'Go to contact', link: '#contact' },
] as const;
