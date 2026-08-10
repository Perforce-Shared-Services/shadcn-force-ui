<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { SpinnerVariants } from "."
import { cn } from "@/lib/utils"
import { IconPlaceholder } from "@/components/icon-placeholder"
import { spinnerVariants } from "."

const props = defineProps<{
  color?: SpinnerVariants["color"]
  size?: SpinnerVariants["size"]
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <IconPlaceholder
    lucide="Loader2Icon"
      materialSymbols="progress_activity"
    tabler="IconLoader2"
    hugeicons="Loading03Icon"
    phosphor="SpinnerGapIcon"
    remixicon="RiLoader4Line"
    role="status"
    aria-label="Loading"
    :class="cn(spinnerVariants({ color, size }), props.class)"
  />
</template>
