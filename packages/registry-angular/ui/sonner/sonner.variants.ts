import { cva, type VariantProps } from "class-variance-authority"

// No `cn-sonner*` tokens exist in style-force-ui.css today (the registry's
// React sonner.tsx styles exclusively through CSS custom properties and
// toastOptions class strings, not a CVA map). This file keeps the standard
// variants-file shape with the toaster base class only; if global
// `cn-sonner` tokens are promoted later (see DIVERGENCES.md), swap the base
// string for the token here.
export const sonnerVariants = cva("toaster group")

export type SonnerVariants = VariantProps<typeof sonnerVariants>
