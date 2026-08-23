<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="message-scroller-content"
    :class="
      cn('cn-message-scroller-content flex h-max min-h-full flex-col', props.class)
    "
  >
    <slot />
  </div>
</template>
