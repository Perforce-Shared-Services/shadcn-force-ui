// Angular port of @force-ui/sonner (radix-force-ui style). Wraps `ngx-sonner`
// (no radix-ng equivalent — `sonner` isn't a Radix pattern) — see
// `sonner.component.ts` for the theme/style/toastOptions parity notes.
//
// Render `<ui-sonner-toaster />` once (e.g. in the app shell); call `toast()`
// from anywhere, re-exported from `ngx-sonner` directly (behavior-only, same
// treatment as `RdxDialogService` in `ui/dialog`).
export { SonnerToasterComponent as Toaster } from './sonner.component';
export { toast } from 'ngx-sonner';
