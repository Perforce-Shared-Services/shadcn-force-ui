<script setup lang="ts">
import { defineComponent, h, ref } from 'vue'
import {
  MessageScrollerProvider,
  MessageScroller,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerButton,
  useMessageScrollerContext,
} from '@/ui/message-scroller'
import { Badge } from '@/ui/badge'

const messages = ref(
  Array.from({ length: 24 }, (_, i) => ({
    id: i,
    text: `Message ${i + 1} — scroll to watch the edge state change.`,
  })),
)

// reads atStart/atEnd from the provider and mirrors them into badges
const EdgeState = defineComponent({
  setup() {
    const state = useMessageScrollerContext('EdgeState')
    return () => [
      h(Badge, { variant: state.atStart ? 'default' : 'outline' }, () => 'at start'),
      h(Badge, { variant: state.atEnd ? 'default' : 'outline' }, () => 'at end'),
    ]
  },
})
</script>

<template>
  <MessageScrollerProvider>
    <div class="mx-auto flex w-full max-w-sm flex-col gap-4">
      <div class="flex items-center gap-2">
        <component :is="EdgeState" />
      </div>
      <MessageScroller class="h-96 rounded-xl border bg-card">
        <MessageScrollerViewport>
          <MessageScrollerContent class="gap-2 p-4">
            <MessageScrollerItem v-for="message in messages" :key="message.id" class="text-sm text-muted-foreground">
              {{ message.text }}
            </MessageScrollerItem>
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton />
      </MessageScroller>
    </div>
  </MessageScrollerProvider>
</template>
