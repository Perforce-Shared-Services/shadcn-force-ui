<script setup lang="ts">
import { ref } from 'vue'
import RotateCwIcon from "@material-symbols/svg-400/rounded/refresh.svg?component"
import { Bubble, BubbleContent } from '@/ui/bubble'
import { Button } from '@/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card'
import {
  MessageScrollerProvider,
  MessageScroller,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerButton,
} from '@/ui/message-scroller'

interface Msg { id: number; role: 'user' | 'assistant'; text: string }

const anchorRole = ref<'user' | 'assistant'>('user')
const messages = ref<Msg[]>([])
let nextId = 0
const scripted = [
  ['user', 'Anchor my turns to the top edge.'],
  ['assistant', 'Done — each of your messages settles near the top as the transcript grows.'],
  ['user', 'Now switch anchoring to your replies.'],
  ['assistant', 'Switching the anchor role moves the settled edge to assistant turns.'],
  ['user', 'Add a few more lines so I can see it.'],
  ['assistant', 'Sure — here are several more lines to make the viewport scroll and demonstrate the anchored edge behavior clearly.'],
] as const

function addNext() {
  if (nextId >= scripted.length)
    return
  const [role, text] = scripted[nextId++]
  messages.value.push({ id: nextId, role, text })
}

function reset() {
  messages.value = []
  nextId = 0
}
</script>

<template>
  <Card class="mx-auto flex h-[28rem] w-full max-w-sm flex-col gap-0">
    <CardHeader class="border-b">
      <CardTitle>Anchoring Turns</CardTitle>
      <CardDescription>Choose which role settles near the top edge.</CardDescription>
      <CardAction>
        <Button variant="outline" size="icon" aria-label="Reset anchored turns" :disabled="messages.length === 0" @click="reset">
          <RotateCwIcon />
        </Button>
      </CardAction>
    </CardHeader>
    <CardContent class="min-h-0 flex-1 overflow-hidden p-0">
      <div v-if="messages.length === 0" class="grid h-full place-items-center p-6 text-center text-sm text-muted-foreground">
        Send the first message to see the selected role anchor.
      </div>
      <MessageScrollerProvider v-else>
        <MessageScroller class="h-full">
          <MessageScrollerViewport>
            <MessageScrollerContent class="gap-3 p-4">
              <MessageScrollerItem v-for="m in messages" :key="m.id" :scroll-anchor="m.role === anchorRole">
                <Bubble :align="m.role === 'user' ? 'end' : 'start'" :variant="m.role === 'user' ? 'tinted' : 'outline'">
                  <BubbleContent>
                    <p class="text-xs font-medium opacity-60">{{ m.role }}</p>
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
    <div class="flex items-center gap-2 border-t p-4">
      <label class="flex items-center gap-2 text-sm">
        Anchor role:
        <select v-model="anchorRole" class="rounded-md border bg-transparent px-2 py-1 text-sm">
          <option value="user">user</option>
          <option value="assistant">assistant</option>
        </select>
      </label>
      <Button size="sm" class="ml-auto" @click="addNext">Add turn</Button>
    </div>
  </Card>
</template>
