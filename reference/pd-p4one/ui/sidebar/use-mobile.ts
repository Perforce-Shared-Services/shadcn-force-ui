import { DestroyRef, inject, signal, type Signal } from '@angular/core';

/**
 * Angular port of @force-ui/use-mobile's `useIsMobile` hook.
 *
 * Registry-verbatim breakpoint (768px). Unlike the React hook, this app has no
 * SSR pass to reconcile against, so the signal starts at the real
 * `window.innerWidth` reading immediately (no `undefined` → `!!isMobile`
 * two-step the React version needs for hydration safety) — Electron's renderer
 * always has a real `window` at construction time.
 *
 * Must be called from an injection context (a component/directive field
 * initializer or constructor) — it uses `DestroyRef` to remove the
 * `matchMedia` listener when the caller is destroyed.
 */
const MOBILE_BREAKPOINT = 768;

export function injectIsMobile(): Signal<boolean> {
  const isMobile = signal(window.innerWidth < MOBILE_BREAKPOINT);
  const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

  const onChange = () => isMobile.set(window.innerWidth < MOBILE_BREAKPOINT);
  mql.addEventListener('change', onChange);
  inject(DestroyRef).onDestroy(() => mql.removeEventListener('change', onChange));

  return isMobile.asReadonly();
}
