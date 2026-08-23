<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import { Bubble, BubbleContent, BubbleGroup } from '@/ui/bubble'
import {
  Message,
  MessageAvatar,
  MessageContent,
} from '@/ui/message'
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6 py-12">
    <Message>
      <MessageAvatar>
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf757676?w=96&auto=format&fit=crop" alt="@avatar" />
          <AvatarFallback>R</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <Bubble variant="muted">
          <BubbleContent>
            The build failed during dependency installation.
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
    <Message align="end">
      <MessageAvatar>
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=96&auto=format&fit=crop" alt="@avatar" />
          <AvatarFallback>R</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <Bubble>
          <BubbleContent>Can you share the exact error?</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
    <Message>
      <MessageAvatar>
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf757676?w=96&auto=format&fit=crop" alt="@avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <BubbleGroup>
          <Bubble variant="muted">
            <BubbleContent>Here's the error from the logs</BubbleContent>
          </Bubble>
          <Bubble variant="muted">
            <BubbleContent>
              Something went wrong with the build. The libraries are not
              installed correctly. Try running the build again.
            </BubbleContent>
          </Bubble>
        </BubbleGroup>
      </MessageContent>
    </Message>
  </div>
</template>
