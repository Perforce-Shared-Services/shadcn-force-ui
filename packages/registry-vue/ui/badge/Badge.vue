<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { BadgeVariants } from "."
import { reactiveOmit } from "@vueuse/core"
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"
import { badgeVariants } from "."

const props = defineProps<PrimitiveProps & {
  variant?: BadgeVariants["variant"]
  class?: HTMLAttributes["class"]
  /**
   * [FORCE-UI] Visually-hidden text prefix announced before the badge's
   * content. Status is otherwise conveyed only through color, which a
   * screen reader can't perceive — set this on count- or glyph-only
   * badges (e.g. `srLabel="Synced versions:"` on a bare "42").
   */
  srLabel?: string
}>()

const delegatedProps = reactiveOmit(props, "class", "srLabel")
</script>

<template>
  <Primitive
    data-slot="badge"
    :data-variant="variant"
    :class="cn(badgeVariants({ variant }), props.class)"
    v-bind="delegatedProps"
  >
    <span v-if="srLabel" class="sr-only">{{ srLabel + ' ' }}</span>
    <slot />
  </Primitive>
</template>
