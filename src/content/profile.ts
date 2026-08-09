export const identity = {
  name: 'Darshan Patel',
  role: 'Frontend Engineer',
  focus: 'Real-time UI · Angular / TypeScript',
  location: 'Ahmedabad, IN',
  yearsActive: 4,
  summary:
    "I build interfaces that hold their frame budget under real load — POS terminals mid-rush, dashboards syncing over sockets, forms that can't afford to stutter. Four years turning Angular and React into systems people trust at the counter.",
} as const;

export const contact = {
  email: 'darshanpatel2608ce@gmail.com',
  github: 'https://github.com/darshan260802',
  linkedin: 'https://www.linkedin.com/in/darshan-patel-2608',
  resumeHref: '/darshan-patel-resume.pdf',
} as const;

export const readout = [
  { label: 'Years active', value: '04' },
  { label: 'Stack', value: 'Angular / TS' },
  { label: 'Discipline', value: 'Real-time UI' },
  { label: 'Base', value: 'Ahmedabad, IN' },
] as const;

export const marqueeTerms = [
  'Angular',
  'TypeScript',
  'React',
  'RxJS',
  'Socket.IO',
  'NestJS',
  'Electron',
  'Redux',
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
      'Own end-to-end delivery of customer onboarding and document workflows in Angular/TypeScript for an enterprise dealership management system.',
      'Built an e-signature document preparation module that automated contract generation, cutting manual paperwork and turnaround time.',
      'Designed and shipped a Smart CRM dashboard that consolidates daily tasks into one actionable view.',
      'Integrated the Angular frontend with backend APIs for real-time dealership data sync and reliable document-workflow state.',
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

export interface ProjectEntry {
  name: string;
  tagline: string;
  stack: string[];
  metrics?: MetricEntry[];
  points: string[];
}

export const projects: ProjectEntry[] = [
  {
    name: 'EatCard',
    tagline: 'Hospitality management system — POS and kiosk ordering at full restaurant volume.',
    stack: ['Angular', 'TypeScript', 'RxJS', 'Socket.IO', 'Electron'],
    metrics: [
      { value: 8, suffix: '+', label: 'Modules shipped' },
      { value: 98, prefix: '−', suffix: '%', label: 'UI re-renders' },
      { value: 34, prefix: '−', suffix: '%', label: 'API call volume' },
    ],
    points: [
      'Built 8+ modules including POS and kiosk ordering, covering order, reservation, and integrated payment flows end to end.',
      'Rebuilt Product Availability and Pricing checks, cutting UI re-renders by 98% and API call volume by roughly 34% during live POS operations.',
      'Shipped infinite scrolling, protocol/SQS printing, dynamic taxation, multi-currency, and i18n, all synced live over sockets.',
      'Launched a desktop POS on Electron for native printing and steadier reliability at the counter.',
    ],
  },
  {
    name: 'Learning Management System',
    tagline: 'Task-based training platform built from scratch for IT education.',
    stack: ['Angular', 'Sass', 'TypeScript', 'Socket.IO', 'PWA'],
    points: [
      'Built a task-based learning platform from the ground up — video lessons, file submissions, multiple-choice assessments.',
      'Wrote a custom Angular video player with fast-forward and seek, reused across the platform for consistent playback.',
      'Added PWA support for offline access and a consistent cross-browser experience on desktop and mobile.',
    ],
  },
];

export interface PackageEntry {
  name: string;
  href: string;
}

export const packages: PackageEntry[] = [
  { name: 'angular-video-controller', href: 'https://www.npmjs.com/package/angular-video-controller' },
  { name: '@darshanpatel2608/human-body-react', href: 'https://www.npmjs.com/package/@darshanpatel2608/human-body-react' },
];

export interface StackGroup {
  label: string;
  items: string[];
}

export const stack: StackGroup[] = [
  { label: 'Frontend', items: ['Angular', 'React', 'JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'Redux', 'RxJS', 'Electron'] },
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
