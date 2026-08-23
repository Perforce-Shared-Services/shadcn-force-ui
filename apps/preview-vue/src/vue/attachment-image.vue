<script setup lang="ts">
import CloseIcon from "@material-symbols/svg-400/rounded/close.svg?component"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from '@/ui/attachment'

const images = [
  {
    name: "workspace.png",
    meta: "PNG · 820 KB",
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80",
  },
  {
    name: "desk-reference.jpg",
    meta: "JPG · 1.1 MB",
    src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80",
  },
]
</script>

<template>
  <div class="mx-auto w-full max-w-sm py-12">
    <AttachmentGroup class="w-full">
      <Attachment
        v-for="image in images"
        :key="image.name"
        orientation="vertical"
      >
        <AttachmentMedia variant="image">
          <img :src="image.src" :alt="image.name" />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>{{ image.name }}</AttachmentTitle>
          <AttachmentDescription>{{ image.meta }}</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction :aria-label="`Remove ${image.name}`">
            <CloseIcon />
          </AttachmentAction>
        </AttachmentActions>
        <AttachmentTrigger :aria-label="`Open ${image.name}`" as="a" :href="image.src" target="_blank" rel="noreferrer" />
      </Attachment>
    </AttachmentGroup>
  </div>
</template>
