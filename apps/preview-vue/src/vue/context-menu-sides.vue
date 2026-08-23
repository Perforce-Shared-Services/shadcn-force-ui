<script setup lang="ts">
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/ui/context-menu"
import { ref } from "vue"

const side = ref("top")

// static classes so Tailwind's JIT keeps them
const zones = [
  { side: "top", zone: "col-start-1 col-span-3 row-start-1 items-start" },
  {
    side: "right",
    zone: "col-start-3 col-span-1 row-start-2 row-span-2 items-center justify-end",
  },
  { side: "bottom", zone: "col-start-1 col-span-3 row-start-4 items-end" },
  {
    side: "left",
    zone: "col-start-1 col-span-1 row-start-2 row-span-2 items-center justify-start",
  },
] as const
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="grid h-64 w-full max-w-md grid-cols-3 grid-rows-4 gap-1">
      <ContextMenu v-for="z in zones" :key="z.side">
        <ContextMenuTrigger as-child>
          <div
            class="flex cursor-default rounded-md border border-dashed p-2 text-sm text-muted-foreground"
            :class="z.zone"
          >
            Right click — {{ z.side }}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent :side="z.side">
          <ContextMenuItem @select="side = z.side">Undo</ContextMenuItem>
          <ContextMenuItem>Redo</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
    <p class="text-xs text-muted-foreground">
      Last opened from the {{ side }} side.
    </p>
  </div>
</template>
