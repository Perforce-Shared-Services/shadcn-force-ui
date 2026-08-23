<script setup lang="ts">
import { Button } from "@/ui/button"
import {
  Card,
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
import ChevronUpIcon from "@material-symbols/svg-400/rounded/keyboard_arrow_up.svg?component"
import { computed, ref } from "vue"

interface Msg {
  id: number
  role: "user" | "assistant"
  text: string
}

const previousContext: Msg[] = [
  {
    id: -2,
    role: "user",
    text: "Earlier today we discussed the migration plan.",
  },
  {
    id: -1,
    role: "assistant",
    text: "Right — phase one ships behind a flag, phase two flips the default.",
  },
]

const current: Msg[] = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  role: i % 2 === 0 ? "user" : "assistant",
  text: `Current conversation line ${i + 1}.`,
}))

const showContext = ref(false)
const messages = computed(() =>
  showContext.value ? [...previousContext, ...current] : current
)
</script>

<template>
  <Card class="mx-auto flex h-[28rem] w-full max-w-sm flex-col gap-0">
    <CardHeader class="border-b">
      <CardTitle>Previous Context</CardTitle>
      <CardDescription
        >Bring the earlier conversation back above the live
        one.</CardDescription
      >
    </CardHeader>
    <CardContent class="min-h-0 flex-1 overflow-hidden p-0">
      <MessageScrollerProvider>
        <MessageScroller class="h-full">
          <MessageScrollerViewport>
            <MessageScrollerContent class="gap-2 p-4">
              <Button
                v-if="!showContext"
                variant="outline"
                size="sm"
                class="mx-auto mb-2"
                @click="showContext = true"
              >
                <ChevronUpIcon /> Show previous context
              </Button>
              <MessageScrollerItem v-for="m in messages" :key="m.id">
                <span
                  class="inline-block max-w-[85%] rounded-lg px-3 py-2 text-sm"
                  :class="[
                    m.role === 'user'
                      ? 'ml-auto bg-primary text-primary-foreground'
                      : 'bg-muted',
                    m.id < 0 ? 'opacity-60' : '',
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
  </Card>
</template>
