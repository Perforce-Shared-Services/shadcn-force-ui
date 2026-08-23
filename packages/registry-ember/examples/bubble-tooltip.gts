import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from '@/ui/bubble';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/ui/tooltip';

<template>
  <div class="flex w-full max-w-sm flex-col gap-8 py-12">
    <BubbleGroup>
      <Bubble @variant="muted">
        <BubbleContent>The deploy finished two minutes ago.</BubbleContent>
      </Bubble>
      <Bubble @align="end">
        <BubbleContent>Any errors in the logs?</BubbleContent>
        <BubbleReactions>
          <Tooltip>
            <TooltipTrigger>
              <span
                aria-label="Reaction: eyes, 2 people"
                class="cursor-default"
                role="img"
              >👀</span>
            </TooltipTrigger>
            <TooltipContent>Seen by 2 people</TooltipContent>
          </Tooltip>
        </BubbleReactions>
      </Bubble>
    </BubbleGroup>
  </div>
</template>
