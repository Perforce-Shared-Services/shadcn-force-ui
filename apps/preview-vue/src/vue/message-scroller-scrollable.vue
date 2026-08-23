<script setup lang="ts">
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/ui/message-scroller"

interface Msg {
  id: number
  role: "user" | "assistant"
  text: string
}

let nextId = 0
function msg(role: Msg["role"], text: string): Msg {
  return { id: nextId++, role, text }
}

const messages: Msg[] = Array.from({ length: 12 }, (_, i) =>
  msg(i % 2 === 0 ? "user" : "assistant", `Message ${i + 1}`)
)
</script>

<template>
  <MessageScrollerProvider>
    <div class="relative h-80 w-full max-w-sm">
      <MessageScroller>
        <MessageScrollerViewport>
          <MessageScrollerContent class="gap-2 p-4">
            <MessageScrollerItem
              v-for="message in messages"
              :key="message.id"
              class="w-full"
            >
              <span
                class="inline-block max-w-[85%] rounded-lg px-3 py-2"
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
  </MessageScrollerProvider>
</template>
