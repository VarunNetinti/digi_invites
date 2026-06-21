"use client";
import { useEffect, useRef, RefObject } from "react";

/**
 * Attaches IntersectionObserver to a ref — adds "visible" class when element
 * enters viewport. Works with .reveal / .reveal-left / .reveal-right CSS classes.
 */
export function useReveal<T extends HTMLElement>(
  threshold = 0.12,
  rootMargin = "0px 0px -40px 0px"
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    // Observe the element itself and all .reveal children inside it
    observer.observe(el);
    el.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale")
      .forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}
