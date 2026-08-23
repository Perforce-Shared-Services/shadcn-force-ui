import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentMedia,
} from '@/ember-ui/attachment';

import Close from '~icons/ms/close';

<template>
  <div class="mx-auto w-full max-w-sm py-12">
    <Attachment class="w-full" @orientation="vertical">
      <AttachmentMedia @variant="image">
        <img
          alt="Workspace"
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
        />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentAction class="absolute top-1 right-1 z-10 bg-background/80" aria-label="Remove workspace.png">
          <Close />
        </AttachmentAction>
      </AttachmentContent>
    </Attachment>
  </div>
</template>
