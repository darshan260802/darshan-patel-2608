import { useEffect, useRef, useState, useId } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Copy, Check } from 'lucide-react';
import { BrowserChrome, type Viewport } from './BrowserChrome';
import { useModalBehavior } from '@/hooks/use-modal-behavior';
import type { PreviewTarget } from '@/lib/preview';
import type { ProjectLink } from '@/content/profile';

interface ProjectModalProps {
  target: PreviewTarget | null;
  /** Gates the shared-layout (`layoutId`) scale-out transition only — every
   * other affordance in this modal (focus trap, Escape, fallback panels)
   * works identically whether this is true or false. */
  useLayoutTransition: boolean;
  onClose: () => void;
}

// Just past the panel spring's settle time (stiffness 300, damping 32, mass
// 0.9) — the ceiling on how long the "Establishing…" state may ever show
// once the layout transition genuinely runs.
const LAYOUT_SETTLE_FALLBACK_MS = 420;

// If the embedded site hasn't fired `onLoad` by here, either it refused to
// be framed (X-Frame-Options/CSP) or it's genuinely too slow — either way,
// stop showing a spinner and offer the real link instead.
const IFRAME_LOAD_TIMEOUT_MS = 8000;

const VIEWPORT_WIDTH: Record<Viewport, string> = {
  desktop: '100%',
  tablet: '834px',
  phone: '390px',
};

function linkKindLabel(kind: ProjectLink['kind']) {
  if (kind === 'npm') return 'Open on npm';
  if (kind === 'repo') return 'View source';
  return 'Open live';
}

function LinkRow({ links }: { links: ProjectLink[] }) {
  return (
    <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6">
      {links.map(link => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs uppercase tracking-[0.1em] text-muted-ink transition-colors hover:text-signal"
        >
          {link.kind === 'repo' && link.label !== 'Source' ? link.label : linkKindLabel(link.kind)} ↗
        </a>
      ))}
    </div>
  );
}

function CopyInstall({ install }: { install: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(install);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard API unavailable — the command is still selectable as plain text.
    }
  };

  return (
    <div>
      <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-ink">Install</span>
      <button
        type="button"
        onClick={copy}
        className="mt-2 flex w-full items-center justify-between gap-3 border border-line bg-ink px-4 py-3 text-left transition-colors hover:border-line-hi"
      >
        <code className="truncate font-mono text-sm text-paper">{install}</code>
        <span className="flex shrink-0 items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-muted-ink">
          {copied ? (
            <>
              <Check size={13} strokeWidth={2} /> Copied
            </>
          ) : (
            <>
              <Copy size={13} strokeWidth={1.75} /> Copy
            </>
          )}
        </span>
      </button>
    </div>
  );
}

function DatasheetBody({ target }: { target: Extract<PreviewTarget, { mode: 'datasheet' }> }) {
  return (
    <div className="flex flex-col gap-8 p-6 md:p-10">
      <div>
        <h3 className="font-display text-2xl font-bold text-signal md:text-3xl">{target.title}</h3>
        {target.subtitle && <p className="mt-2 max-w-xl font-sans text-sm text-muted-ink">{target.subtitle}</p>}
        {target.version && (
          <span className="mt-3 inline-block font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-ink">
            v{target.version}
          </span>
        )}
      </div>

      {target.install && <CopyInstall install={target.install} />}

      {target.points && (
        <ul className="flex flex-col gap-3">
          {target.points.map(point => (
            <li key={point} className="flex gap-3 font-sans text-[0.95rem] leading-relaxed text-paper">
              <span aria-hidden className="mt-[0.6em] h-px w-4 shrink-0 bg-line-hi" />
              {point}
            </li>
          ))}
        </ul>
      )}

      {target.stack && (
        <div className="flex flex-wrap gap-2">
          {target.stack.map(tech => (
            <span key={tech} className="border border-line px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-muted-ink">
              {tech}
            </span>
          ))}
        </div>
      )}

      <LinkRow links={target.links} />
    </div>
  );
}

function EmbedBody({
  target,
  onLoaded,
  ready,
  failed,
}: {
  target: Extract<PreviewTarget, { mode: 'embed' }>;
  onLoaded: () => void;
  ready: boolean;
  failed: boolean;
}) {
  if (failed) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-ink">
            Preview didn't load
          </span>
          <a
            href={target.url}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-line-hi px-4 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-signal transition-colors hover:bg-signal hover:text-ink"
          >
            Open {target.url.replace(/^https?:\/\//, '')} ↗
          </a>
        </div>
        <div className="shrink-0 border-t border-line px-4 py-3 md:px-5">
          <LinkRow links={target.links} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="relative flex-1">
        {ready && (
          <motion.iframe
            key={target.url}
            src={target.url}
            title={target.title}
            onLoad={onLoaded}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full border-0 bg-paper"
          />
        )}
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-ink">
              Establishing…
            </span>
          </div>
        )}
      </div>
      <div className="shrink-0 border-t border-line px-4 py-3 md:px-5">
        <LinkRow links={target.links} />
      </div>
    </div>
  );
}

export function ProjectModal({ target, useLayoutTransition, onClose }: ProjectModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [viewport, setViewport] = useState<Viewport>('desktop');
  const [iframeReady, setIframeReady] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeFailed, setIframeFailed] = useState(false);
  const titleId = useId();

  const open = target !== null;
  useModalBehavior(open, onClose, panelRef);

  // `onLayoutAnimationComplete` below is a fast path, not a dependency: if
  // Motion's shared-layout transition doesn't fire — a click mid-scroll, a
  // measurement disrupted by the scroll-lock reflow, or simply
  // `useLayoutTransition` being false — this fallback still opens the panel.
  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => setIframeReady(true), LAYOUT_SETTLE_FALLBACK_MS);
    return () => window.clearTimeout(timer);
  }, [open]);

  // If the embed hasn't loaded within a generous window, stop showing
  // "Establishing…" forever and offer the real link instead.
  useEffect(() => {
    if (!open || target?.mode !== 'embed' || iframeLoaded) return;
    const timer = window.setTimeout(() => setIframeFailed(true), IFRAME_LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [open, target, iframeLoaded]);

  const handleExitComplete = () => {
    setViewport('desktop');
    setIframeReady(false);
    setIframeLoaded(false);
    setIframeFailed(false);
  };

  return createPortal(
    <AnimatePresence onExitComplete={handleExitComplete}>
      {target && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-8">
          <motion.div
            key="backdrop"
            aria-hidden
            onClick={onClose}
            className="absolute inset-0 bg-ink/85 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          <motion.div
            key="panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            layoutId={useLayoutTransition ? `panel-${target.id}` : undefined}
            initial={useLayoutTransition ? undefined : { opacity: 0, scale: 0.98 }}
            animate={useLayoutTransition ? undefined : { opacity: 1, scale: 1 }}
            exit={useLayoutTransition ? undefined : { opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 32, mass: 0.9 }}
            onLayoutAnimationComplete={() => setIframeReady(true)}
            style={!useLayoutTransition ? { width: 'min(100%, 72rem)', height: 'min(100%, 46rem)' } : undefined}
            className="relative z-10 h-full w-full outline-none md:h-[46rem] md:max-h-[calc(100vh-4rem)] md:w-[min(100%,72rem)]"
          >
            <BrowserChrome
              titleId={titleId}
              url={target.mode === 'embed' ? target.url.replace(/^https?:\/\//, '') : `package · ${target.title}`}
              loading={target.mode === 'embed' && !iframeLoaded}
              viewport={target.mode === 'embed' ? viewport : undefined}
              onViewportChange={target.mode === 'embed' ? setViewport : undefined}
              showViewportToggle={target.mode === 'embed'}
              onClose={onClose}
              closeButtonRef={closeButtonRef}
            >
              {target.mode === 'embed' ? (
                <div className="flex h-full items-stretch justify-center bg-ink">
                  <div
                    className="flex h-full min-w-0 flex-col border-line"
                    style={{
                      width: VIEWPORT_WIDTH[viewport],
                      borderLeftWidth: viewport === 'desktop' ? 0 : 1,
                      borderRightWidth: viewport === 'desktop' ? 0 : 1,
                    }}
                  >
                    <EmbedBody
                      target={target}
                      ready={iframeReady || !useLayoutTransition}
                      failed={iframeFailed}
                      onLoaded={() => setIframeLoaded(true)}
                    />
                  </div>
                </div>
              ) : (
                <DatasheetBody target={target} />
              )}
            </BrowserChrome>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
