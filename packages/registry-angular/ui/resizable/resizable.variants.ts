import { cva } from "class-variance-authority"

/**
 * Resizable has no visual variant axes (the React registry source ships no
 * cva map either) — these are base class strings exposed as one-arm cva so
 * consumers get the same `xxxVariants()` call shape as every other part.
 *
 * `.cn-resizable-panel-group` and `.cn-resizable-handle` are not defined in
 * style-force-ui.css (only `.cn-resizable-handle-icon` is); the expanded
 * utilities here mirror the React registry source exactly.
 */

// [FORCE-UI] aria-orientation is only valid on separator/slider/tablist roles —
// this plain div had none (axe-core aria-allowed-attr), so the vertical flip is
// keyed on data-panel-group-direction instead.
export const resizablePanelGroupVariants = cva(
  "cn-resizable-panel-group flex h-full w-full data-[panel-group-direction=vertical]:flex-col"
)

// [FORCE-UI] ring-3/ring-ring/50 + transition-colors matches button/input/slider/switch
// focus treatment; cursor-col-resize/row-resize + touch-none for interaction affordance.
export const resizableHandleVariants = cva(
  "cn-resizable-handle relative flex w-px cursor-col-resize touch-none items-center justify-center bg-border transition-colors after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-hidden aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:cursor-row-resize aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0 aria-[orientation=horizontal]:after:-translate-y-1/2 motion-reduce:transition-none [&[aria-orientation=horizontal]>div]:rotate-90"
)

// The grip pill rendered when `withHandle` is set. Token from style-force-ui.css.
export const resizableHandleIconVariants = cva("cn-resizable-handle-icon z-10 flex shrink-0")

export type ResizablePanelGroupVariant = ReturnType<typeof resizablePanelGroupVariants>
export type ResizableHandleVariant = ReturnType<typeof resizableHandleVariants>
export type ResizableHandleIconVariant = ReturnType<typeof resizableHandleIconVariants>
