import { Bubble, BubbleContent } from '@/ember-ui/bubble';
import { Button } from '@/ember-ui/button';
import { Message, MessageContent, MessageFooter } from '@/ember-ui/message';

import ContentCopy from '~icons/ms/content_copy';
import RefreshCcw from '~icons/ms/refresh';
import ThumbDown from '~icons/ms/thumb_down';
import ThumbUp from '~icons/ms/thumb_up';
<template>
    <div class="flex w-full max-w-sm flex-col gap-8 py-12">
      <Message>
        <MessageContent>
          <Bubble @variant="muted">
            <BubbleContent>
              The install failure is coming from the workspace package.
            </BubbleContent>
          </Bubble>
          <MessageFooter>
            <Button aria-label="Copy" @size="icon" @variant="ghost">
              <ContentCopy />
            </Button>
            <Button aria-label="Like" @size="icon" @variant="ghost">
              <ThumbUp />
            </Button>
            <Button aria-label="Dislike" @size="icon" @variant="ghost">
              <ThumbDown />
            </Button>
          </MessageFooter>
        </MessageContent>
      </Message>
      <Message @align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>Okay drop me a link. Taking a look...</BubbleContent>
          </Bubble>
          <MessageFooter @class="gap-2">
            <span class="font-normal text-destructive">Failed to send</span>
            <Button aria-label="Retry" @size="icon-xs" @variant="ghost">
              <RefreshCcw />
            </Button>
          </MessageFooter>
        </MessageContent>
      </Message>
    </div>
  </template>
