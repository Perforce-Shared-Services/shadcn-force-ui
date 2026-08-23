<script setup lang="ts">
import CloseIcon from "@material-symbols/svg-400/rounded/close.svg?component"
import DescriptionIcon from "@material-symbols/svg-400/rounded/description.svg?component"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from '@/ui/attachment'
import { Bubble, BubbleContent } from '@/ui/bubble'
import { Message, MessageContent } from '@/ui/message'
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-8 py-12">
    <Message align="end">
      <MessageContent>
        <Attachment orientation="vertical">
          <AttachmentMedia variant="image">
            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
              alt="Workspace"
            />
          </AttachmentMedia>
        </Attachment>
        <Bubble>
          <BubbleContent>
            Here's the image. Can you add it to the PDF? Use it for the
            cover page.
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
    <Message>
      <MessageContent>
        <Bubble variant="muted">
          <BubbleContent>
            Done. Here's the PDF with the image added as the cover page.
          </BubbleContent>
        </Bubble>
        <Attachment>
          <AttachmentMedia>
            <DescriptionIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
            <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Remove sales-dashboard.pdf">
              <CloseIcon />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      </MessageContent>
    </Message>
  </div>
</template>
