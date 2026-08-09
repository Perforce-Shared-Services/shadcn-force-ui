import { registryItemSchema, type Registry } from "shadcn/schema"
import { z } from "zod"

import { FORCE_UI_STYLE_BASE } from "../registry-shared/style"
import { examples } from "./examples/_registry"
import { lib } from "./lib/_registry"
import { ui } from "./ui/_registry"

const VUE_STYLE = {
  ...FORCE_UI_STYLE_BASE,
  dependencies: ["class-variance-authority", "vue", "reka-ui", "@vueuse/core"],
}

export const registry = {
  name: "force-ui/vue",
  homepage: "https://force-ui.com",
  items: z.array(registryItemSchema).parse([
    {
      name: "index",
      ...VUE_STYLE,
    },
    {
      name: "style",
      ...VUE_STYLE,
    },
    ...ui,
    ...examples,
    ...lib,
  ]),
} satisfies Registry
