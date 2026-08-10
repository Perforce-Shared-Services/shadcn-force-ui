import { registryItemSchema, type Registry } from "shadcn/schema"
import { z } from "zod"

import { FORCE_UI_STYLE_BASE } from "../registry-shared/style"
import { examples } from "./examples/_registry"
import { lib } from "./lib/_registry"
import { ui } from "./ui/_registry"

const ANGULAR_STYLE = {
  ...FORCE_UI_STYLE_BASE,
  dependencies: [
    "@angular/core",
    "@angular/common",
    "@angular/platform-browser",
    "@radix-ng/primitives",
    "class-variance-authority",
  ],
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
    ...examples,
    ...lib,
  ]),
} satisfies Registry
