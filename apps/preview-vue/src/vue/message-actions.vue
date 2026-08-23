<script setup lang="ts">
import ContentCopyIcon from "@material-symbols/svg-400/rounded/content_copy.svg?component"
import ThumbDownIcon from "@material-symbols/svg-400/rounded/thumb_down.svg?component"
import ThumbUpIcon from "@material-symbols/svg-400/rounded/thumb_up.svg?component"
import RefreshIcon from "@material-symbols/svg-400/rounded/refresh.svg?component"
import { Bubble, BubbleContent } from '@/ui/bubble'
import { Button } from '@/ui/button'
import {
  Message,
  MessageContent,
  MessageFooter,
} from '@/ui/message'
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-8 py-12">
    <Message>
      <MessageContent>
        <Bubble variant="muted">
          <BubbleContent>
            The install failure is coming from the workspace package.
          </BubbleContent>
        </Bubble>
        <MessageFooter>
          <Button variant="ghost" size="icon" aria-label="Copy" title="Copy">
            <ContentCopyIcon />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Like" title="Like">
            <ThumbUpIcon />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Dislike" title="Dislike">
            <ThumbDownIcon />
          </Button>
        </MessageFooter>
      </MessageContent>
    </Message>
    <Message align="end">
      <MessageContent>
        <Bubble>
          <BubbleContent>Okay drop me a link. Taking a look...</BubbleContent>
        </Bubble>
        <MessageFooter class="gap-2">
          <span class="font-normal text-destructive">Failed to send</span>
          <Button
            variant="ghost"
            size="icon-xs"
            title="Retry"
            aria-label="Retry"
          >
            <RefreshIcon />
          </Button>
        </MessageFooter>
      </MessageContent>
    </Message>
  </div>
</template>
