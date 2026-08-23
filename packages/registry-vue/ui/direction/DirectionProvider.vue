<script setup lang="ts">
import { ConfigProvider } from "reka-ui"

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  dir?: "ltr" | "rtl"
  /** [FORCE-UI] alias so the Vue port matches the React `direction` prop name */
  direction?: "ltr" | "rtl"
}>()
</script>

<template>
  <ConfigProvider :dir="props.direction ?? props.dir">
    <slot />
  </ConfigProvider>
</template>
