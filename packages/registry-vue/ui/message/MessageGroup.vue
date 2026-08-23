<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="message-group"
    :class="cn('cn-message-group flex min-w-0 flex-col', props.class)"
  >
    <slot />
  </div>
</template>
