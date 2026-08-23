<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    messageId?: string
    scrollAnchor?: boolean
  }>(),
  {
    scrollAnchor: false,
  }
)
</script>

<template>
  <div
    data-slot="message-scroller-item"
    :data-message-id="props.messageId"
    :data-scroll-anchor="props.scrollAnchor ? 'true' : undefined"
    :class="
      cn(
        'cn-message-scroller-item min-w-0 shrink-0 [contain-intrinsic-size:auto_10rem] [content-visibility:auto]',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
