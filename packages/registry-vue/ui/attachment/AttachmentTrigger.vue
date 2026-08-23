<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = withDefaults(
  defineProps<{
    /** [FORCE-UI] element to render, e.g. `"a"` for link triggers (defaults to `"button"`) */
    as?: string
    class?: HTMLAttributes["class"]
  }>(),
  {
    as: "button",
  },
)
</script>

<template>
  <component
    :is="props.as"
    data-slot="attachment-trigger"
    :type="props.as === 'button' ? 'button' : undefined"
    :class="
      cn('cn-attachment-trigger absolute inset-0 z-10 outline-none', props.class)
    "
  >
    <slot />
  </component>
</template>
