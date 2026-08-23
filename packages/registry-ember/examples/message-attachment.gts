import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from '@/ui/attachment';
import { Bubble, BubbleContent } from '@/ui/bubble';
import { Message, MessageContent } from '@/ui/message';

import Download from '~icons/ms/download';
import FileText from '~icons/ms/description';

<template>
  <div class="flex w-full max-w-sm flex-col gap-8 py-12">
    <Message @align="end">
      <MessageContent>
        <Attachment @orientation="vertical">
          <AttachmentMedia @variant="image">
            <img
              alt="Workspace"
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
            />
          </AttachmentMedia>
        </Attachment>
        <Bubble>
          <BubbleContent>
            Here's the image. Can you add it to the PDF? Use it for the cover
            page.
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
    <Message>
      <MessageContent>
        <Bubble @variant="muted">
          <BubbleContent>
            Done. Here's the PDF with the image added as the cover page.
          </BubbleContent>
        </Bubble>
        <Attachment>
          <AttachmentMedia>
            <FileText />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
            <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Download" @size="icon-sm" @variant="secondary">
              <Download />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      </MessageContent>
    </Message>
    <Message @align="end">
      <MessageContent>
        <Bubble>
          <BubbleContent>Thanks. Looks good.</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  </div>
</template>
