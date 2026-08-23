import { registryItemSchema, type Registry } from "shadcn/schema"
import { z } from "zod"

import { FORCE_UI_STYLE_BASE } from "../registry-shared/style"
import { blocks } from "./blocks/_registry"
import { examples } from "./examples/_registry"
import { lib } from "./lib/_registry"
import { ui } from "./ui/_registry"

const EMBER_STYLE = {
  ...FORCE_UI_STYLE_BASE,
  dependencies: [
    "@glimmer/component",
    "@glimmer/tracking",
    "ember-modifier",
    "ember-provide-consume-context",
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
  ],
}

export const registry = {
  name: "force-ui/ember",
  homepage: "https://force-ui.com",
  items: z.array(registryItemSchema).parse([
    {
      name: "index",
      ...EMBER_STYLE,
    },
    {
      name: "style",
      ...EMBER_STYLE,
    },
    ...ui,
    ...examples,
    ...blocks,
    ...lib,
  ]),
} satisfies Registry
