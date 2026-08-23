<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import { Bubble, BubbleContent } from '@/ui/bubble'
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageGroup,
} from '@/ui/message'
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6 py-12">
    <MessageGroup>
      <Message>
        <MessageAvatar />
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>I checked the registry addresses.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message>
        <MessageAvatar>
          <Avatar>
            <AvatarImage src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=96&auto=format&fit=crop" alt="@avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>
              The component and example JSON now live under the UI registry.
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </MessageGroup>
  </div>
</template>
