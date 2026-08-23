<script setup lang="ts">
import { computed } from "vue"
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import IconPlaceholder from "@/components/icon-placeholder/IconPlaceholder.vue"
import { Button, type ButtonVariants } from "@/ui/button"
import { useMessageScrollerContext } from "./context"

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    direction?: "start" | "end"
    variant?: ButtonVariants["variant"]
    size?: ButtonVariants["size"]
  }>(),
  {
    direction: "end",
    variant: "secondary",
    size: "icon-sm",
  }
)

const scroller = useMessageScrollerContext("MessageScrollerButton")

const active = computed(() =>
  props.direction === "end" ? !scroller.atEnd : !scroller.atStart
)
</script>

<template>
  <div
    data-slot="message-scroller-button"
    :data-direction="props.direction"
    :data-active="active"
    :class="
      cn(
        'cn-message-scroller-button absolute inset-s-1/2 -translate-x-1/2 border-border bg-background text-foreground transition-[translate,scale,opacity] duration-200 hover:bg-muted hover:text-foreground data-[active=false]:pointer-events-none data-[active=false]:scale-95 data-[active=false]:opacity-0 data-[active=false]:duration-400 data-[active=false]:ease-[cubic-bezier(0.7,0,0.84,0)] data-[active=true]:translate-y-0 data-[active=true]:scale-100 data-[active=true]:opacity-100 data-[active=true]:ease-[cubic-bezier(0.23,1,0.32,1)] data-[direction=end]:bottom-4 data-[direction=end]:data-[active=false]:translate-y-full data-[direction=start]:top-4 data-[direction=start]:data-[active=false]:-translate-y-full rtl:translate-x-1/2 data-[direction=start]:[&_svg]:rotate-180',
        props.class
      )
    "
  >
    <Button
      :variant="props.variant"
      :size="props.size"
      @click="scroller.scrollTo(props.direction)"
    >
      <slot>
        <IconPlaceholder
          lucide="ArrowDownIcon"
          materialSymbols="arrow_downward"
          tabler="IconArrowDown"
          hugeicons="ArrowDown02Icon"
          phosphor="ArrowDownIcon"
          remixicon="RiArrowDownLine"
        />
        <span class="sr-only">
          {{ props.direction === "end" ? "Scroll to end" : "Scroll to start" }}
        </span>
      </slot>
    </Button>
  </div>
</template>
