import { registryItemSchema, type Registry } from "shadcn/schema"
import { z } from "zod"

import { lib } from "./lib/_registry"
import { ui } from "./ui/_registry"

const ANGULAR_STYLE = {
  type: "registry:style",
  dependencies: [
    "@angular/core",
    "@angular/common",
    "@angular/platform-browser",
    "@radix-ng/primitives",
    "class-variance-authority",
  ],
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
}

export const registry = {
  name: "force-ui-angular",
  homepage: "https://forceui.public.prd.shared.perforce.com",
  items: z.array(registryItemSchema).parse([
    {
      name: "index",
      ...ANGULAR_STYLE,
    },
    {
      name: "style",
      ...ANGULAR_STYLE,
    },
    ...ui,
    ...lib,
  ]),
} satisfies Registry
