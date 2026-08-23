<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="message-scroller"
    :class="
      cn(
        'cn-message-scroller group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
