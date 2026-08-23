<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { MarkerVariants } from "."
import { cn } from "@/lib/utils"
import { markerVariants } from "."

const props = withDefaults(
  defineProps<{
    /** [FORCE-UI] element to render, e.g. `"a"` or `"button"` for interactive markers (defaults to `"div"`) */
    as?: string
    variant?: MarkerVariants["variant"]
    class?: HTMLAttributes["class"]
  }>(),
  {
    as: "div",
    variant: "default",
  },
)
</script>

<template>
  <component
    :is="props.as"
    data-slot="marker"
    :data-variant="props.variant"
    :class="cn(markerVariants({ variant: props.variant }), props.class)"
  >
    <slot />
  </component>
</template>
