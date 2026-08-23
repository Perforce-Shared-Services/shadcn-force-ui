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
import { computed, ref } from "vue"

interface Msg {
  id: number
  role: "user" | "assistant"
  text: string
}

const history: Msg[] = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  role: i % 2 === 0 ? "user" : "assistant",
  text: `Historical message ${i + 1}.`,
}))

const INITIAL_VISIBLE = 8
const visibleCount = ref(INITIAL_VISIBLE)
const demoKey = ref(0)

const visibleMessages = computed(() => history.slice(-visibleCount.value))
const canLoadHistory = computed(() => visibleCount.value < history.length)

function loadEarlier() {
  visibleCount.value = Math.min(visibleCount.value + 8, history.length)
}

function reset() {
  visibleCount.value = INITIAL_VISIBLE
  demoKey.value++
}
</script>

<template>
  <Card class="mx-auto flex h-[28rem] w-full max-w-sm flex-col gap-0">
    <CardHeader class="border-b">
      <CardTitle>Load History</CardTitle>
      <CardDescription>Prepended messages keep your place.</CardDescription>
      <CardAction>
        <Button
          variant="outline"
          size="icon"
          aria-label="Reset loaded messages"
          :disabled="visibleCount === INITIAL_VISIBLE"
          @click="reset"
        >
          <RotateCwIcon />
        </Button>
      </CardAction>
    </CardHeader>
    <CardContent class="min-h-0 flex-1 overflow-hidden p-0">
      <MessageScrollerProvider :key="demoKey">
        <MessageScroller class="h-full">
          <MessageScrollerViewport>
            <MessageScrollerContent class="gap-2 p-4">
              <button
                v-if="canLoadHistory"
                class="mx-auto mb-2 rounded-md border px-3 py-1 text-xs text-muted-foreground hover:bg-muted"
                @click="loadEarlier"
              >
                Load earlier messages ({{ history.length - visibleCount }} left)
              </button>
              <MessageScrollerItem v-for="m in visibleMessages" :key="m.id">
                <span
                  class="inline-block max-w-[85%] rounded-lg px-3 py-2 text-sm"
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
  </Card>
</template>
