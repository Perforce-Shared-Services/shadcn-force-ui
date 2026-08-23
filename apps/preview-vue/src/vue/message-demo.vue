<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from '@/ui/bubble'
import {
  Marker,
  MarkerContent,
} from '@/ui/marker'
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
} from '@/ui/message'
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6 py-12">
    <Message align="end">
      <MessageAvatar>
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf757676?w=96&auto=format&fit=crop" alt="@me" />
          <AvatarFallback>ME</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <Bubble>
          <BubbleContent>Deploying to prod real quick.</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
    <Message>
      <MessageAvatar>
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=96&auto=format&fit=crop" alt="@rabbit" />
          <AvatarFallback>R</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <Bubble variant="muted">
          <BubbleContent>It's 4:55 PM. On a Friday.</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
    <Message align="end">
      <MessageAvatar>
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf757676?w=96&auto=format&fit=crop" alt="@me" />
          <AvatarFallback>ME</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <Bubble>
          <BubbleContent>It's a one-line change.</BubbleContent>
        </Bubble>
        <MessageFooter>Delivered</MessageFooter>
      </MessageContent>
    </Message>
    <Message>
      <MessageAvatar>
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=96&auto=format&fit=crop" alt="@rabbit" />
          <AvatarFallback>R</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <BubbleGroup>
          <Bubble variant="muted">
            <BubbleContent>
              It's always a one-line change 😭.
            </BubbleContent>
          </Bubble>
          <Bubble variant="muted">
            <BubbleContent>Alright, let me take a look.</BubbleContent>
            <BubbleReactions aria-label="Reactions: thumbs up">
              <span>👍</span>
            </BubbleReactions>
          </Bubble>
        </BubbleGroup>
      </MessageContent>
    </Message>
    <Marker role="status">
      <MarkerContent class="shimmer">
        <span class="font-medium">Oliver</span> is typing...
      </MarkerContent>
    </Marker>
  </div>
</template>
