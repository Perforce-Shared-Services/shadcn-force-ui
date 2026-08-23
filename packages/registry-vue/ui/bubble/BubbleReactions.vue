<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { BubbleReactionsSide, BubbleReactionsAlign } from "."
import { cn } from "@/lib/utils"
import { bubbleReactionsVariants } from "."

const props = withDefaults(
  defineProps<{
    side?: BubbleReactionsSide
    align?: BubbleReactionsAlign
    class?: HTMLAttributes["class"]
  }>(),
  {
    side: "bottom",
    align: "end",
  },
)
</script>

<template>
  <div
    data-slot="bubble-reactions"
    :data-align="props.align"
    :data-side="props.side"
    :class="
      cn(bubbleReactionsVariants({ side: props.side, align: props.align }), props.class)
    "
  >
    <slot />
  </div>
</template>
