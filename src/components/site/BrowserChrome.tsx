import type { ReactNode } from 'react';
import { X } from 'lucide-react';

export type Viewport = 'desktop' | 'tablet' | 'phone';

const VIEWPORTS: { id: Viewport; label: string; glyph: string }[] = [
  { id: 'desktop', label: 'Desktop', glyph: '▭' },
  { id: 'tablet', label: 'Tablet', glyph: '▯' },
  { id: 'phone', label: 'Phone', glyph: '▮' },
];

interface BrowserChromeProps {
  titleId: string;
  url: string;
  loading?: boolean;
  viewport?: Viewport;
  onViewportChange?: (viewport: Viewport) => void;
  showViewportToggle?: boolean;
  onClose: () => void;
  closeButtonRef?: React.RefObject<HTMLButtonElement | null>;
  children: ReactNode;
}

export function BrowserChrome({
  titleId,
  url,
  loading = false,
  viewport,
  onViewportChange,
  showViewportToggle = false,
  onClose,
  closeButtonRef,
  children,
}: BrowserChromeProps) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-line bg-surface">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-line px-4 py-3 md:px-5">
        <div className="flex min-w-0 items-center gap-2">
          <span aria-hidden className="font-mono text-[0.625rem] text-muted-ink">
            ▸
          </span>
          <span
            id={titleId}
            className="truncate font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-paper"
          >
            {url}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-3 md:gap-4">
          {showViewportToggle && onViewportChange && (
            <div className="hidden items-center gap-1 border border-line sm:flex" role="group" aria-label="Preview viewport">
              {VIEWPORTS.map(v => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => onViewportChange(v.id)}
                  aria-pressed={viewport === v.id}
                  aria-label={v.label}
                  title={v.label}
                  className={`px-2.5 py-1.5 font-mono text-xs transition-colors ${
                    viewport === v.id ? 'bg-signal text-ink' : 'text-muted-ink hover:text-paper'
                  }`}
                >
                  {v.glyph}
                </button>
              ))}
            </div>
          )}

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="text-muted-ink transition-colors hover:text-signal"
          >
            <X size={16} strokeWidth={1.75} />
          </button>
        </div>
      </div>

      <div aria-hidden className="relative h-px shrink-0 bg-line">
        <div
          className="h-full bg-signal transition-[width,opacity] duration-300 ease-out"
          style={{ width: loading ? '70%' : '100%', opacity: loading ? 1 : 0 }}
        />
      </div>

      <div className="relative flex-1 overflow-auto bg-ink">{children}</div>
    </div>
  );
}
