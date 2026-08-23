<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  useMessageScrollerContext,
} from "@/ui/message-scroller"
import { Tabs, TabsList, TabsTrigger } from "@/ui/tabs"
import { defineComponent, h, nextTick, ref, watch } from "vue"

const messages = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  text: `Saved transcript line ${i + 1}.`,
}))

type Position = "start" | "end" | "last-anchor"
const position = ref<Position>("end")
const positionKey = ref(0)

function setPosition(value: string | number) {
  position.value = value as Position
  positionKey.value++
}

// lives inside the provider so it can drive the scroller imperatively
const ScrollOnMount = defineComponent({
  props: {
    position: { type: String, required: true },
    positionKey: { type: Number, required: true },
  },
  setup(innerProps) {
    const state = useMessageScrollerContext("ScrollOnMount")
    watch(
      () => innerProps.positionKey,
      async () => {
        await nextTick()
        if (!state) return
        // ponytail: the React demo's "last-anchor" uses turn anchoring APIs the
        // compact port does not expose; bottom is the closest supported opening.
        state.scrollTo(innerProps.position === "start" ? "start" : "end")
      },
      { immediate: true }
    )
    return () => null
  },
})
</script>

<template>
  <Card class="mx-auto flex h-[24rem] w-full max-w-sm flex-col gap-0">
    <CardHeader class="gap-1 border-b">
      <CardTitle>Opening Position</CardTitle>
      <CardDescription>Choose where a saved transcript opens.</CardDescription>
    </CardHeader>
    <CardContent class="min-h-0 flex-1 overflow-hidden p-0">
      <MessageScrollerProvider>
        <MessageScroller class="h-full">
          <MessageScrollerViewport>
            <MessageScrollerContent class="gap-2 p-4">
              <MessageScrollerItem
                v-for="m in messages"
                :key="m.id"
                class="text-sm text-muted-foreground"
              >
                {{ m.text }}
              </MessageScrollerItem>
            </MessageScrollerContent>
          </MessageScrollerViewport>
        </MessageScroller>
        <ScrollOnMount :position="position" :position-key="positionKey" />
      </MessageScrollerProvider>
    </CardContent>
    <CardFooter class="justify-center border-t">
      <Tabs :model-value="position" @update:model-value="setPosition">
        <TabsList>
          <TabsTrigger value="start">Top</TabsTrigger>
          <TabsTrigger value="end">Bottom</TabsTrigger>
          <TabsTrigger value="last-anchor">Last turn</TabsTrigger>
        </TabsList>
      </Tabs>
    </CardFooter>
  </Card>
</template>
