<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "@/ui/button"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/ui/button"

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariants["variant"]
    size?: ButtonVariants["size"]
    class?: HTMLAttributes["class"]
  }>(),
  {
    variant: "ghost",
    size: "icon-xs",
  },
)
</script>

<template>
  <button
    data-slot="attachment-action"
    :class="
      cn(
        buttonVariants({ variant: props.variant, size: props.size }),
        'cn-attachment-action',
        props.class,
      )
    "
    type="button"
  >
    <slot />
  </button>
</template>
