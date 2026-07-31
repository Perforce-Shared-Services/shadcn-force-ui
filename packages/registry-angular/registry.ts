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
    "class-variance-authority",
  ],
  registryDependencies: ["utils"],
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
