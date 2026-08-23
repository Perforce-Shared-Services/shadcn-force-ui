<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = withDefaults(
  defineProps<{
    /** [FORCE-UI] element to render, e.g. `"button"` for quick-reply bubbles (defaults to `"div"`) */
    as?: string
    class?: HTMLAttributes["class"]
  }>(),
  {
    as: "div",
  },
)
</script>

<template>
  <component
    :is="props.as"
    data-slot="bubble-content"
    :class="
      cn(
        'cn-bubble-content w-fit max-w-full min-w-0 overflow-hidden wrap-break-word [button]:text-left [button,a]:transition-colors',
        props.class,
      )
    "
  >
    <slot />
  </component>
</template>
