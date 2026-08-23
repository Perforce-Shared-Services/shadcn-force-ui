<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { BubbleVariants, BubbleReactionsSide, BubbleReactionsAlign } from "."
import { cn } from "@/lib/utils"
import { bubbleVariants } from "."

const props = withDefaults(
  defineProps<{
    variant?: BubbleVariants["variant"]
    align?: "start" | "end"
    class?: HTMLAttributes["class"]
  }>(),
  {
    variant: "default",
    align: "start",
  },
)
</script>

<template>
  <div
    data-slot="bubble"
    :data-variant="props.variant"
    :data-align="props.align"
    :class="cn(bubbleVariants({ variant: props.variant }), props.class)"
  >
    <slot />
  </div>
</template>
