import { registryItemSchema, type Registry } from "shadcn/schema"
import { z } from "zod"

import { FORCE_UI_STYLE_BASE } from "../registry-shared/style"
import { examples } from "./examples/_registry"
import { lib } from "./lib/_registry"
import { ui } from "./ui/_registry"

const SVELTE_STYLE = {
  ...FORCE_UI_STYLE_BASE,
  dependencies: ["class-variance-authority", "svelte", "bits-ui"],
}

export const registry = {
  name: "force-ui/svelte",
  homepage: "https://force-ui.com",
  items: z.array(registryItemSchema).parse([
    {
      name: "index",
      ...SVELTE_STYLE,
    },
    {
      name: "style",
      ...SVELTE_STYLE,
    },
    ...ui,
    ...examples,
    ...lib,
  ]),
} satisfies Registry
