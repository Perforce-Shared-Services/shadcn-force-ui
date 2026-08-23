<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { AttachmentVariants, AttachmentState } from "."
import { cn } from "@/lib/utils"
import { attachmentVariants } from "."

const props = withDefaults(
  defineProps<{
    state?: AttachmentState
    size?: AttachmentVariants["size"]
    orientation?: AttachmentVariants["orientation"]
    class?: HTMLAttributes["class"]
  }>(),
  {
    state: "done",
    size: "default",
    orientation: "horizontal",
  },
)
</script>

<template>
  <div
    data-slot="attachment"
    :data-state="props.state"
    :data-size="props.size"
    :data-orientation="props.orientation"
    :class="
      cn(
        attachmentVariants({ size: props.size, orientation: props.orientation }),
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
