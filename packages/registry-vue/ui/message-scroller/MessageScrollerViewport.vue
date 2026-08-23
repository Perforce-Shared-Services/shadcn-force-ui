<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue"
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import {
  useMessageScrollerContext,
  useMessageScrollerController,
} from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const scroller = useMessageScrollerContext("MessageScrollerViewport")
const controller = useMessageScrollerController()

const viewportEl = ref<HTMLDivElement | null>(null)

function distanceFromEdges(el: HTMLDivElement) {
  return {
    start: el.scrollTop,
    end: el.scrollHeight - el.clientHeight - el.scrollTop,
  }
}

function updateEdges() {
  const el = viewportEl.value
  if (!el || !controller) return
  const { start, end } = distanceFromEdges(el)
  controller.setEdges(
    start <= scroller.scrollEdgeThreshold,
    end <= scroller.scrollEdgeThreshold
  )
}

function scrollTo(direction: "start" | "end") {
  const el = viewportEl.value
  if (!el) return
  el.scrollTo({
    top: direction === "end" ? el.scrollHeight : 0,
    behavior: "smooth",
  })
}

function followToEnd() {
  const el = viewportEl.value
  if (!el || !scroller.autoScroll) return
  const { end } = distanceFromEdges(el)
  // follow appends only while the user is already near the bottom
  if (end <= Math.max(scroller.scrollEdgeThreshold, 160)) {
    el.scrollTo({ top: el.scrollHeight })
  }
}

let observer: MutationObserver | null = null

onMounted(() => {
  const el = viewportEl.value
  if (!el) return
  controller?.registerScrollTo(scrollTo)
  updateEdges()
  // auto-follow: react to appended items / growing content
  observer = new MutationObserver(() => {
    requestAnimationFrame(() => {
      followToEnd()
      updateEdges()
    })
  })
  observer.observe(el, {
    childList: true,
    subtree: true,
    characterData: true,
  })
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div
    ref="viewportEl"
    data-slot="message-scroller-viewport"
    @scroll="updateEdges"
    :class="
      cn(
        'cn-message-scroller-viewport size-full min-h-0 min-w-0 scroll-fade-b scrollbar-thin scrollbar-gutter-stable overflow-y-auto overscroll-contain contain-content data-autoscrolling:scrollbar-thumb-transparent data-autoscrolling:scrollbar-track-transparent',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
