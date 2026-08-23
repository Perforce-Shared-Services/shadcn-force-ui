<script setup lang="ts">
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/ui/message-scroller"
import { ref } from "vue"

interface Msg {
  id: number
  role: "user" | "assistant"
  text: string
}

const seed: [Msg["role"], string][] = [
  [
    "user",
    "I'm building a chat for our app and the scroll behavior is driving me nuts.",
  ],
  [
    "assistant",
    "That's the classic streaming scroll problem. Wrap your message list in MessageScroller and turn on autoScroll — the viewport pins to the bottom as tokens arrive.",
  ],
  [
    "user",
    "Okay, but when someone sends a new message the view still feels jarring.",
  ],
  [
    "assistant",
    "Auto-scroll only runs while the reader is already at the bottom. The moment they scroll up, their position is preserved. The scroll button appears when there is unseen content below.",
  ],
]

const messages = ref<Msg[]>(
  seed.map(([role, text], i) => ({ id: i, role, text }))
)
let nextId = seed.length
const draft = ref("")

function send() {
  const text = draft.value.trim()
  if (!text) return
  messages.value.push({ id: nextId++, role: "user", text })
  draft.value = ""
  // simulated reply exercises auto-follow
  setTimeout(() => {
    messages.value.push({
      id: nextId++,
      role: "assistant",
      text: `Got it — you said: "${text}"`,
    })
  }, 600)
}
</script>

<template>
  <MessageScrollerProvider>
    <div class="mx-auto flex w-full max-w-sm flex-col gap-4">
      <div class="rounded-xl border bg-card">
        <div class="gap-1 border-b p-4">
          <p class="font-medium">New Chat</p>
          <p class="text-sm text-muted-foreground">How can I help you today?</p>
        </div>
        <MessageScroller class="h-96">
          <MessageScrollerViewport>
            <MessageScrollerContent class="gap-2 p-4">
              <MessageScrollerItem
                v-for="message in messages"
                :key="message.id"
                :scroll-anchor="message.role === 'user'"
              >
                <span
                  class="inline-block max-w-[85%] rounded-lg px-3 py-2 text-sm"
                  :class="
                    message.role === 'user'
                      ? 'ml-auto bg-primary text-primary-foreground'
                      : 'bg-muted'
                  "
                >
                  {{ message.text }}
                </span>
              </MessageScrollerItem>
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </div>
      <form class="flex gap-2" @submit.prevent="send">
        <Input v-model="draft" placeholder="Type a message…" />
        <Button type="submit">Send</Button>
      </form>
    </div>
  </MessageScrollerProvider>
</template>
