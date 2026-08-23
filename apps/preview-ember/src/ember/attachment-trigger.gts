import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from '@/ember-ui/attachment';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/ember-ui/dialog';

import Copy from '~icons/ms/content_copy';
import FileSearch from '~icons/ms/plagiarism';
import Close from '~icons/ms/close';

<template>
  <div class="mx-auto w-full max-w-sm py-12">
    <Dialog>
      <Attachment class="w-full">
        <AttachmentMedia>
          <FileSearch />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>research-summary.pdf</AttachmentTitle>
          <AttachmentDescription>Open preview dialog</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Copy link">
            <Copy />
          </AttachmentAction>
          <AttachmentAction aria-label="Remove research-summary.pdf">
            <Close />
          </AttachmentAction>
        </AttachmentActions>
        {{! [FORCE-UI] the trigger fills the card; actions stay independently clickable above it }}
        <AttachmentTrigger aria-label="Preview research-summary.pdf" />
      </Attachment>
      <DialogContent @class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>research-summary.pdf</DialogTitle>
          <DialogDescription>
            The attachment trigger fills the card and opens the dialog, while
            the actions stay independently clickable above it.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  </div>
</template>
