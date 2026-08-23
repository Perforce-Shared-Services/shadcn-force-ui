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
import { onBeforeUnmount, ref } from "vue"

interface Msg {
  id: number
  role: "user" | "assistant"
  text: string
}

const scripted = [
  "Explain scroll anchoring like I am five.",
  "Imagine a comic strip taped to a wall. New panels appear at the bottom…",
  "…and the tape keeps the panel you are reading perfectly still.",
]
const tokens = scripted.flatMap((s) => s.split(" "))

const messages = ref<Msg[]>([{ id: 0, role: "user", text: scripted[0] }])
let nextId = 1
let cursor = scripted[1].split(" ").length + scripted[2].split(" ").length // skip echoed user msg words
let timer: ReturnType<typeof setInterval> | undefined

function startStream() {
  if (timer || cursor >= tokens.length) return
  messages.value.push({ id: nextId++, role: "assistant", text: "" })
  timer = setInterval(() => {
    const last = messages.value[messages.value.length - 1]
    last.text += `${tokens[cursor++]} `
    if (cursor >= tokens.length) {
      stop()
    }
  }, 120)
}

function stop() {
  if (timer) {
    clearInterval(timer)
    timer = undefined
  }
}

function reset() {
  stop()
  cursor = scripted[1].split(" ").length + scripted[2].split(" ").length
  messages.value = [{ id: 0, role: "user", text: scripted[0] }]
}

onBeforeUnmount(stop)
</script>

<template>
  <Card class="mx-auto flex h-[28rem] w-full max-w-sm flex-col gap-0">
    <CardHeader class="border-b">
      <CardTitle>Streaming Messages</CardTitle>
      <CardDescription
        >Auto-scroll follows the live edge of the conversation.</CardDescription
      >
      <CardAction>
        <Button
          variant="outline"
          size="icon"
          aria-label="Reset stream"
          @click="reset"
        >
          <RotateCwIcon />
        </Button>
      </CardAction>
    </CardHeader>
    <CardContent class="min-h-0 flex-1 overflow-hidden p-0">
      <MessageScrollerProvider auto-scroll>
        <MessageScroller class="h-full">
          <MessageScrollerViewport>
            <MessageScrollerContent class="gap-2 p-4">
              <MessageScrollerItem
                v-for="m in messages"
                :key="m.id"
                :scroll-anchor="true"
              >
                <span
                  class="inline-block max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap"
                  :class="
                    m.role === 'user'
                      ? 'ml-auto bg-primary text-primary-foreground'
                      : 'bg-muted'
                  "
                  >{{ m.text }}</span
                >
              </MessageScrollerItem>
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>
    </CardContent>
    <div class="border-t p-4">
      <Button size="sm" :disabled="!!timer" @click="startStream">
        {{ timer ? "Streaming…" : "Simulate stream" }}
      </Button>
    </div>
  </Card>
</template>
