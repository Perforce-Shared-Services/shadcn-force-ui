<script setup lang="ts">
import { reactive, ref } from "vue"
import {
  provideMessageScrollerContext,
  provideMessageScrollerController,
  type MessageScrollerState,
  type MessageScrollerProviderProps,
} from "./context"

const props = withDefaults(defineProps<MessageScrollerProviderProps>(), {
  autoScroll: true,
  scrollEdgeThreshold: 80,
})

let viewportScrollTo: (direction: "start" | "end") => void = () => {}

const atStart = ref(false)
const atEnd = ref(false)

provideMessageScrollerController({
  setEdges(start: boolean, end: boolean) {
    atStart.value = start
    atEnd.value = end
  },
  registerScrollTo(fn: (direction: "start" | "end") => void) {
    viewportScrollTo = fn
  },
})

const state: MessageScrollerState = reactive({
  get autoScroll() {
    return props.autoScroll
  },
  get scrollEdgeThreshold() {
    return props.scrollEdgeThreshold
  },
  get atStart() {
    return atStart.value
  },
  get atEnd() {
    return atEnd.value
  },
  scrollTo: (direction) => viewportScrollTo(direction),
})
provideMessageScrollerContext(state)
</script>

<template>
  <slot />
</template>
