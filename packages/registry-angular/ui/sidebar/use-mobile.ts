import { effect, inject, signal, type Signal } from "@angular/core"

const MOBILE_BREAKPOINT = 768

/**
 * Reactive `isMobile` breakpoint signal — Angular's answer to the registry's
 * `useIsMobile` hook (matchMedia listener torn down with the injecting
 * component's DestroyRef via `effect`).
 */
export function injectIsMobile(): Signal<boolean> {
  const isMobile = signal<boolean>(false)

  effect((onCleanup) => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    isMobile.set(mql.matches)
    const onChange = (event: MediaQueryListEvent) => isMobile.set(event.matches)
    mql.addEventListener("change", onChange)
    onCleanup(() => mql.removeEventListener("change", onChange))
  })

  return isMobile.asReadonly()
}
