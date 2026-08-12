// Shared shape for the per-framework `{FW}_STYLE` registry entries. Every
// framework registry.ts spreads this and adds only its own `dependencies`.
export const FORCE_UI_STYLE_BASE = {
  type: "registry:style",
  devDependencies: ["tw-animate-css", "shadcn"],
  registryDependencies: ["utils"],
  css: {
    '@import "tw-animate-css"': {},
    '@import "shadcn/tailwind.css"': {},
    "@layer base": {
      "*": {
        "@apply border-border outline-ring/50": {},
      },
      body: {
        "@apply bg-background text-foreground": {},
      },
    },
  },
  cssVars: {},
  files: [],
} as const
