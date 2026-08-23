<script setup lang="ts">
import InfoIcon from "@material-symbols/svg-400/rounded/info.svg?component"
import {
  Bubble,
  BubbleContent,
  BubbleReactions,
} from '@/ui/bubble'
import { Button } from '@/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/ui/popover'
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-4 py-12">
    <Bubble align="end">
      <BubbleContent>Run the build script.</BubbleContent>
    </Bubble>
    <Bubble variant="destructive">
      <BubbleContent>Failed to run the command.</BubbleContent>
      <BubbleReactions>
        <Popover>
          <PopoverTrigger as-child>
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label="Show error details"
              class="aria-expanded:text-destructive"
            >
              <InfoIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle class="text-sm">
                Command failed with exit code 1
              </PopoverTitle>
              <PopoverDescription class="text-sm">
                ENOENT: no such file or directory, open pnpm-lock.yaml
              </PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      </BubbleReactions>
    </Bubble>
  </div>
</template>
