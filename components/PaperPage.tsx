import type { ReactNode } from "react";

export function PaperPage({ children }: { children: ReactNode }) {
  return (
    <div data-focus-stage className="focus-stage flex h-dvh flex-col">
      <div
        data-focus-page
        className="focus-page flex min-h-0 flex-1 flex-col"
      >
        {children}
      </div>
      <div data-focus-flare className="focus-flare" aria-hidden="true">
        <span className="focus-flare-bloom" />
        <span className="focus-flare-streak" />
        <span className="focus-flare-speck focus-flare-speck-a" />
        <span className="focus-flare-speck focus-flare-speck-b" />
      </div>
    </div>
  );
}
