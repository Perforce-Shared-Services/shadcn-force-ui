// [FORCE-UI] cn-message-scroller* tokens from style-force-ui.css — never expanded Tailwind.
// The scroller parts have fixed (non-variant) styling, so these are plain class
// strings rather than cva maps; the cn-* token names stay the single spelling
// shared with the React registry.
//
// Viewport deviation from the registry string: `scrollbar-thin
// scrollbar-gutter-stable data-autoscrolling:scrollbar-thumb-transparent
// data-autoscrolling:scrollbar-track-transparent` → `scrollbar-overlay
// [scrollbar-gutter:stable]` — this build has no tailwind-scrollbar plugin;
// same substitution as dropdown-menu/select/command/combobox panels. The
// focus-visible ring is a component-level a11y addition (tabbable scroll
// region, WCAG 2.1.1/2.4.7).
export const messageScrollerRootClass =
  "cn-message-scroller group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden"

export const messageScrollerViewportClass =
  "cn-message-scroller-viewport size-full min-h-0 min-w-0 scroll-fade-b scrollbar-overlay [scrollbar-gutter:stable] overflow-y-auto overscroll-contain contain-content outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 motion-reduce:transition-none"

export const messageScrollerContentClass =
  "cn-message-scroller-content flex h-max min-h-full flex-col"

export const messageScrollerItemClass =
  "cn-message-scroller-item min-w-0 shrink-0 [contain-intrinsic-size:auto_10rem] [content-visibility:auto]"

// [&_svg]:fill-current — Material Symbols are fill-based (DIVERGENCES.md §button-2).
// The border/background/hover overrides on top of buttonVariants are registry-verbatim
// (they turn "secondary" into the floating outline look); shadow-sm is a
// component-level elevation token matching every other detached control here.
export const messageScrollerButtonClass =
  "[&_svg]:fill-current start-1/2 absolute -translate-x-1/2 border-border bg-background text-foreground shadow-sm transition-[translate,scale,opacity] duration-200 hover:bg-muted hover:text-foreground motion-reduce:transition-none data-[active=false]:pointer-events-none data-[active=false]:scale-95 data-[active=false]:opacity-0 data-[active=false]:duration-400 data-[active=false]:ease-[cubic-bezier(0.7,0,0.84,0)] data-[active=true]:translate-y-0 data-[active=true]:scale-100 data-[active=true]:opacity-100 data-[active=true]:ease-[cubic-bezier(0.23,1,0.32,1)] data-[direction=end]:bottom-4 data-[direction=end]:data-[active=false]:translate-y-full data-[direction=start]:top-4 data-[direction=start]:data-[active=false]:-translate-y-full rtl:translate-x-1/2 data-[direction=start]:[&_svg]:rotate-180"
