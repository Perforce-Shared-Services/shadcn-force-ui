<script setup lang="ts">
import { Bubble, BubbleContent, BubbleGroup } from '@/ui/bubble'

function forgotPassword() {
  // eslint-disable-next-line no-console
  console.log("You clicked forgot password")
}
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-8 py-12">
    <Bubble variant="muted">
      <BubbleContent>How can I help you today?</BubbleContent>
    </Bubble>
    <BubbleGroup>
      <Bubble variant="tinted" align="end">
        <BubbleContent as="button" @click="forgotPassword">
          I forgot my password
        </BubbleContent>
      </Bubble>
      <Bubble variant="tinted" align="end">
        <BubbleContent as="button" @click="forgotPassword">
          Send me a magic link instead
        </BubbleContent>
      </Bubble>
    </BubbleGroup>
  </div>
</template>
