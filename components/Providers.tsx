"use client";

import gsap from "gsap";
import { TransitionRouter } from "next-transition-router";
import type { ReactNode } from "react";

const MAX_BLUR = 14;

function focusEls() {
  return {
    page: document.querySelector<HTMLElement>("[data-focus-page]"),
    flare: document.querySelector<HTMLElement>("[data-focus-flare]"),
  };
}

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function resetFocus(page: HTMLElement | null, flare: HTMLElement | null) {
  gsap.set(page, { clearProps: "filter,transform,opacity" });
  gsap.set(flare, { clearProps: "opacity" });
  page?.removeAttribute("data-focus");
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <TransitionRouter
      auto
      leave={(next) => {
        if (reducedMotion()) {
          next();
          return;
        }

        const { page, flare } = focusEls();
        if (!page) {
          next();
          return;
        }

        page.dataset.focus = "leave";
        gsap.set(page, {
          filter: "blur(0px) brightness(1)",
          scale: 1,
          opacity: 1,
          transformOrigin: "50% 45%",
          force3D: true,
        });
        gsap.set(flare, { opacity: 0 });

        const tl = gsap.timeline({ onComplete: next });
        tl.to(
          page,
          {
            filter: `blur(${MAX_BLUR}px) brightness(1.06)`,
            scale: 1.03,
            opacity: 0,
            duration: 0.92,
            ease: "sine.inOut",
          },
          0,
        ).to(
          flare,
          { opacity: 0.85, duration: 0.55, ease: "sine.out" },
          0.2,
        );
        return () => tl.kill();
      }}
      enter={(next) => {
        if (reducedMotion()) {
          next();
          return;
        }

        const { page, flare } = focusEls();
        if (!page) {
          next();
          return;
        }

        page.dataset.focus = "enter";
        gsap.set(page, {
          filter: `blur(${MAX_BLUR}px) brightness(1.08)`,
          scale: 1.02,
          opacity: 0,
          transformOrigin: "50% 45%",
          force3D: true,
        });
        gsap.set(flare, { opacity: 0.85 });

        const tl = gsap.timeline({
          onComplete: () => {
            resetFocus(page, flare);
            next();
          },
        });
        tl.to(page, {
          filter: "blur(0px) brightness(1)",
          scale: 1,
          opacity: 1,
          duration: 1.08,
          ease: "sine.out",
        }).to(
          flare,
          { opacity: 0, duration: 0.62, ease: "sine.inOut" },
          0.28,
        );
        return () => tl.kill();
      }}
    >
      {children}
    </TransitionRouter>
  );
}
