import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from '@/ember-ui/bubble';

<template>
  <div class="flex w-full max-w-sm flex-col gap-8 py-12">
    <BubbleGroup>
      <Bubble @variant="muted">
        <BubbleContent>Ship it?</BubbleContent>
      </Bubble>
      <Bubble @align="end">
        <BubbleContent>Shipping it.</BubbleContent>
      </Bubble>
      <Bubble @variant="muted">
        <BubbleContent>Nice.</BubbleContent>
        <BubbleReactions role="img" aria-label="Reactions: thumbs up and fire">
          <span>👍</span>
          <span>🔥</span>
        </BubbleReactions>
      </Bubble>
      <Bubble @align="end">
        <BubbleContent>Told you the tests would pass.</BubbleContent>
        <BubbleReactions aria-label="Reaction: eyes" @side="top">
          <span>👀</span>
        </BubbleReactions>
      </Bubble>
    </BubbleGroup>
  </div>
</template>
