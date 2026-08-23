<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "."
import { computed } from "vue"
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"
import IconPlaceholder from "@/components/icon-placeholder/IconPlaceholder.vue"
import { buttonVariants } from "."

interface Props extends PrimitiveProps {
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  class?: HTMLAttributes["class"]
  /** [FORCE-UI] shows a spinner and blocks interaction, for async actions — mirrors the Figma `State=Loading` variant */
  loading?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
  loading: false,
})

// [FORCE-UI] loading buttons are inert while the async action runs
const disabled = computed(() => props.disabled || props.loading || undefined)
</script>

<template>
  <Primitive
    data-slot="button"
    :data-variant="variant"
    :data-size="size"
    :data-loading="props.loading ? '' : undefined"
    :aria-busy="props.loading || undefined"
    :disabled="disabled"
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <span v-if="props.loading" data-slot="button-spinner" aria-hidden="true" class="inline-flex animate-spin">
      <IconPlaceholder
        lucide="Loader2Icon"
        materialSymbols="progress_activity"
        tabler="IconLoader"
        hugeicons="Loading03Icon"
        phosphor="SpinnerIcon"
        remixicon="RiLoaderLine"
      />
    </span>
    <slot />
  </Primitive>
</template>
