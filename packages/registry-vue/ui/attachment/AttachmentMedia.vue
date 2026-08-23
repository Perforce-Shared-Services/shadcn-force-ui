<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { AttachmentMediaVariants } from "."
import { cn } from "@/lib/utils"
import { attachmentMediaVariants } from "."

const props = withDefaults(
  defineProps<{
    variant?: AttachmentMediaVariants["variant"]
    class?: HTMLAttributes["class"]
  }>(),
  {
    variant: "icon",
  },
)
</script>

<template>
  <div
    data-slot="attachment-media"
    :data-variant="props.variant"
    :class="
      cn(attachmentMediaVariants({ variant: props.variant }), props.class)
    "
  >
    <slot />
  </div>
</template>
