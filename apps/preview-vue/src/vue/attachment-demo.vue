<script setup lang="ts">
import CloseIcon from "@material-symbols/svg-400/rounded/close.svg?component"
import CodeIcon from "@material-symbols/svg-400/rounded/code.svg?component"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from '@/ui/attachment'
import { Spinner } from '@/ui/spinner'

const images = [
  {
    name: "workspace.png",
    meta: "PNG · 820 KB",
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80",
    alt: "Workspace",
  },
  {
    name: "desk-reference.jpg",
    meta: "JPG · 1.1 MB",
    src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80",
    alt: "Desk",
  },
  {
    name: "office-reference.jpg",
    meta: "JPG · 940 KB",
    src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80",
    alt: "Office",
  },
]
</script>

<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-3 py-12">
    <AttachmentGroup>
      <Attachment v-for="image in images" :key="image.name" orientation="vertical">
        <AttachmentMedia variant="image">
          <img :src="image.src" :alt="image.alt" />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>{{ image.name }}</AttachmentTitle>
          <AttachmentDescription>{{ image.meta }}</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
    </AttachmentGroup>
    <Attachment state="uploading" class="w-full">
      <AttachmentMedia>
        <Spinner />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
        <AttachmentDescription>Uploading · 64%</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Cancel upload">
          <CloseIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
    <Attachment class="w-full">
      <AttachmentMedia>
        <CodeIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>message-renderer.ts</AttachmentTitle>
        <AttachmentDescription>TypeScript · 12 KB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove message-renderer.ts">
          <CloseIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  </div>
</template>
