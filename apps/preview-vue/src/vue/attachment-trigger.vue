<script setup lang="ts">
import CloseIcon from "@material-symbols/svg-400/rounded/close.svg?component"
import ContentCopyIcon from "@material-symbols/svg-400/rounded/content_copy.svg?component"
import SearchIcon from "@material-symbols/svg-400/rounded/search.svg?component"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog'
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from '@/ui/attachment'
</script>

<template>
  <div class="mx-auto w-full max-w-sm py-12">
    <Dialog>
      <Attachment class="w-full">
        <AttachmentMedia>
          <SearchIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>research-summary.pdf</AttachmentTitle>
          <AttachmentDescription>Open preview dialog</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Copy link">
            <ContentCopyIcon />
          </AttachmentAction>
          <AttachmentAction aria-label="Remove research-summary.pdf">
            <CloseIcon />
          </AttachmentAction>
        </AttachmentActions>
        <DialogTrigger as-child>
          <AttachmentTrigger aria-label="Preview research-summary.pdf" />
        </DialogTrigger>
      </Attachment>
      <DialogContent class="sm:max-w-md">
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
