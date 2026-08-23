<script setup lang="ts">
import CheckIcon from "@material-symbols/svg-400/rounded/check.svg?component"
import {
  Bubble,
  BubbleContent,
  BubbleReactions,
} from '@/ui/bubble'
import { Button } from '@/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/ui/tooltip'
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-4 py-12">
    <Bubble variant="secondary">
      <BubbleContent>Did you remove the stale route?</BubbleContent>
    </Bubble>
    <Bubble align="end">
      <BubbleContent>Yes, removed it from the registry.</BubbleContent>
      <BubbleReactions>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost" size="icon-xs">
              <CheckIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Read on Jan 5, 2026 at 4:32 PM</TooltipContent>
        </Tooltip>
      </BubbleReactions>
    </Bubble>
  </div>
</template>
