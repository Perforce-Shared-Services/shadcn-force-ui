<script setup lang="ts">
import { Bubble, BubbleContent } from "@/ui/bubble"
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

interface Turn {
  id: number
  sender: string
  role: "me" | "them"
  text: string
}

let nextId = 0
function turn(sender: string, role: Turn["role"], text: string): Turn {
  return { id: nextId++, sender, role, text }
}

const initial: Turn[] = [
  turn(
    "Grace",
    "them",
    "@mary, the astrophage line keeps matching Venus energy output. Can you check my math?"
  ),
  turn(
    "Mary (Agent)",
    "them",
    "Checked — your exponent is off by one. The curve should be E ∝ L² not E ∝ L."
  ),
  turn("Grace", "them", "Fixed it. The residual drops to 0.3%."),
  turn("You", "me", "Nice. Pushing to the shared notebook now."),
]

const messages = ref([...initial])
const draft = ref("")

function send() {
  const text = draft.value.trim()
  if (!text) return
  messages.value.push(turn("You", "me", text))
  draft.value = ""
}
</script>

<template>
  <Card class="mx-auto flex h-[28rem] w-full max-w-sm flex-col gap-0">
    <CardHeader class="border-b">
      <CardTitle>Project Hail Mary</CardTitle>
      <CardDescription>Group chat turns with agent mentions.</CardDescription>
      <CardAction>
        <Button
          variant="outline"
          size="icon"
          aria-label="Reset chat"
          @click="messages = [...initial]"
        >
          <RotateCwIcon />
        </Button>
      </CardAction>
    </CardHeader>
    <CardContent class="min-h-0 flex-1 overflow-hidden p-0">
      <MessageScrollerProvider auto-scroll>
        <MessageScroller class="h-full">
          <MessageScrollerViewport>
            <MessageScrollerContent class="gap-3 p-4">
              <MessageScrollerItem
                v-for="m in messages"
                :key="m.id"
                :scroll-anchor="m.role === 'me'"
              >
                <p class="mb-1 text-xs font-medium text-muted-foreground">
                  {{ m.sender }}
                </p>
                <Bubble
                  :align="m.role === 'me' ? 'end' : 'start'"
                  :variant="m.role === 'me' ? 'tinted' : 'outline'"
                >
                  <BubbleContent>
                    <p class="text-sm">{{ m.text }}</p>
                  </BubbleContent>
                </Bubble>
              </MessageScrollerItem>
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>
    </CardContent>
    <form class="flex gap-2 border-t p-4" @submit.prevent="send">
      <input
        v-model="draft"
        placeholder="Reply to the group…"
        class="w-full rounded-md border bg-transparent px-3 py-1 text-sm outline-none"
      />
      <Button type="submit" size="sm">Send</Button>
    </form>
  </Card>
</template>
