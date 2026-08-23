import { Bubble, BubbleContent, BubbleReactions } from '@/ui/bubble';
import { Button } from '@/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/ui/popover';

import Info from '~icons/ms/info';

<template>
  <div class="flex w-full max-w-sm flex-col gap-4 py-12">
    <Bubble @align="end">
      <BubbleContent>Run the build script.</BubbleContent>
    </Bubble>
    <Bubble @variant="destructive">
      <BubbleContent>Failed to run the command.</BubbleContent>
      <BubbleReactions>
        <Popover>
          <PopoverTrigger>
            <Button
              @class="aria-expanded:text-destructive"
              aria-label="Show error details"
              @size="icon-xs"
              @variant="ghost"
            >
              <Info class="size-3.5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent @class="w-64 text-sm">
            <p class="font-medium">Build failed</p>
            <p class="mt-1 text-muted-foreground">
              Exit code 1 — check that dependencies are installed and try again.
            </p>
          </PopoverContent>
        </Popover>
      </BubbleReactions>
    </Bubble>
    <Bubble @align="end">
      <BubbleContent>Checking the logs now.</BubbleContent>
    </Bubble>
  </div>
</template>
