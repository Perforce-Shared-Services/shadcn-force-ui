// Angular port of @force-ui/sonner (force-ui style). Wraps `ngx-sonner`
// (no radix-ng equivalent — `sonner` isn't a Radix pattern) — see
// `sonner.component.ts` for the theme/style/toastOptions parity notes.
//
// Render `<ui-sonner-toaster />` once (e.g. in the app shell); call `toast()`
// from anywhere, re-exported from `ngx-sonner` directly.
export { SonnerToasterComponent as Toaster } from "./sonner.component"
export { sonnerVariants, type SonnerVariants } from "./sonner.variants"
export { toast } from "ngx-sonner"
