import { cva } from "class-variance-authority"

// Positioning (data-[side=…] inset/border/size classes) lives in the
// `cn-sheet-content` token in style-force-ui.css and fires off the `data-side`
// attribute bound from the `side` input — not off a class variant.
//
// This base carries what the React SheetContent adds on top of the token: the
// open/closed slide + fade animations, keyed per side via data-[side] selectors.
export const sheetVariants = cva(
  "cn-sheet-content data-open:animate-in data-open:fade-in-0 data-[side=bottom]:data-open:slide-in-from-bottom-10 data-[side=left]:data-open:slide-in-from-left-10 data-[side=right]:data-open:slide-in-from-right-10 data-[side=top]:data-open:slide-in-from-top-10 data-closed:animate-out data-closed:fade-out-0 data-[side=bottom]:data-closed:slide-out-to-bottom-10 data-[side=left]:data-closed:slide-out-to-left-10 data-[side=right]:data-closed:slide-out-to-right-10 data-[side=top]:data-closed:slide-out-to-top-10"
)
