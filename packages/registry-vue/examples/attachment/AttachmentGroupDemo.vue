<script setup lang="ts">
import CloseIcon from "@material-symbols/svg-400/rounded/close.svg?component"
import CodeIcon from "@material-symbols/svg-400/rounded/code.svg?component"
import DescriptionIcon from "@material-symbols/svg-400/rounded/description.svg?component"
import TableIcon from "@material-symbols/svg-400/rounded/table.svg?component"
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

const items = [
  { name: "briefing-notes.pdf", meta: "PDF · 1.4 MB", icon: DescriptionIcon },
  {
    name: "workspace.png",
    meta: "PNG · 820 KB",
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80",
  },
  { name: "customers.csv", meta: "CSV · 18 KB", icon: TableIcon },
  { name: "renderer.tsx", meta: "TSX · 12 KB", icon: CodeIcon },
]
</script>

<template>
  <div class="mx-auto w-full max-w-sm py-12">
    <AttachmentGroup class="w-full">
      <Attachment
        v-for="item in items"
        :key="item.name"
        class="w-64"
      >
        <AttachmentMedia v-if="item.src" variant="image">
          <img :src="item.src" :alt="item.name" />
        </AttachmentMedia>
        <AttachmentMedia v-else-if="item.icon">
          <component :is="item.icon" />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>{{ item.name }}</AttachmentTitle>
          <AttachmentDescription>{{ item.meta }}</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction :aria-label="`Remove ${item.name}`">
            <CloseIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
    </AttachmentGroup>
  </div>
</template>
