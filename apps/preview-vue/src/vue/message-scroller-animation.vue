<script setup lang="ts">
import { Button } from "@/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/ui/message-scroller"
import RotateCwIcon from "@material-symbols/svg-400/rounded/refresh.svg?component"
import { ref } from "vue"

interface Msg {
  id: number
  role: "user" | "assistant"
  text: string
}

const presets = {
  fade: "opacity-0",
  "slide-up": "-translate-y-2 opacity-0",
  scale: "scale-95 opacity-0",
} as const
type Preset = keyof typeof presets

const presetId = ref<Preset>("fade")
const messages = ref<Msg[]>([])
let nextId = 0

function send() {
  messages.value.push({
    id: nextId++,
    role: nextId % 2 === 1 ? "user" : "assistant",
    text: `Animated message #${nextId}`,
  })
}

function reset() {
  messages.value = []
}
</script>

<template>
  <Card class="mx-auto flex h-[28rem] w-full max-w-sm flex-col gap-0">
    <CardHeader class="border-b">
      <CardTitle>Animation</CardTitle>
      <CardDescription
        >Choose how new messages enter the conversation.</CardDescription
      >
      <CardAction>
        <Button
          variant="outline"
          size="icon"
          aria-label="Reset animated messages"
          :disabled="messages.length === 0"
          @click="reset"
        >
          <RotateCwIcon />
        </Button>
      </CardAction>
    </CardHeader>
    <CardContent class="min-h-0 flex-1 overflow-hidden p-0">
      <div
        v-if="messages.length === 0"
        class="grid h-full place-items-center p-6 text-center text-sm text-muted-foreground"
      >
        Click send below to see the animation.
      </div>
      <MessageScrollerProvider v-else auto-scroll>
        <MessageScroller class="h-full">
          <MessageScrollerViewport>
            <MessageScrollerContent class="gap-2 p-4">
              <MessageScrollerItem
                v-for="m in messages"
                :key="m.id"
                :scroll-anchor="m.role === 'user'"
              >
                <span
                  class="inline-block max-w-[85%] rounded-lg px-3 py-2 text-sm transition-all duration-300"
                  :class="[
                    presets[presetId],
                    m.role === 'user'
                      ? 'ml-auto bg-primary text-primary-foreground'
                      : 'bg-muted',
                  ]"
                  >{{ m.text }}</span
                >
              </MessageScrollerItem>
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>
    </CardContent>
    <div class="flex items-center gap-2 border-t p-4">
      <select
        v-model="presetId"
        class="rounded-md border bg-transparent px-2 py-1 text-sm"
        aria-label="Animation preset"
      >
        <option value="fade">fade</option>
        <option value="slide-up">slide-up</option>
        <option value="scale">scale</option>
      </select>
      <Button size="sm" class="ml-auto" @click="send">Send</Button>
    </div>
  </Card>
</template>
