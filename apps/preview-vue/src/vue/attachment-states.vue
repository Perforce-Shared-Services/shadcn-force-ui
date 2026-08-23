<script setup lang="ts">
import CheckIcon from "@material-symbols/svg-400/rounded/check.svg?component"
import CloseIcon from "@material-symbols/svg-400/rounded/close.svg?component"
import DescriptionIcon from "@material-symbols/svg-400/rounded/description.svg?component"
import RefreshIcon from "@material-symbols/svg-400/rounded/refresh.svg?component"
import ScheduleIcon from "@material-symbols/svg-400/rounded/schedule.svg?component"
import WarningIcon from "@material-symbols/svg-400/rounded/warning.svg?component"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from '@/ui/attachment'
import { Spinner } from '@/ui/spinner'
</script>

<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-2 py-12">
    <Attachment state="idle" class="w-full">
      <AttachmentMedia>
        <ScheduleIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>selected-file.pdf</AttachmentTitle>
        <AttachmentDescription>Ready to upload</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove selected-file.pdf">
          <CloseIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
    <Attachment state="uploading" class="w-full">
      <AttachmentMedia>
        <Spinner />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>design-system.zip</AttachmentTitle>
        <AttachmentDescription>Uploading · 64%</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Cancel upload">
          <CloseIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
    <Attachment state="processing" class="w-full">
      <AttachmentMedia>
        <DescriptionIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>market-research.pdf</AttachmentTitle>
        <AttachmentDescription>Processing document</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove market-research.pdf">
          <CloseIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
    <Attachment state="error" class="w-full">
      <AttachmentMedia>
        <WarningIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>financial-model.xlsx</AttachmentTitle>
        <AttachmentDescription>Upload failed. Try again.</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Retry upload">
          <RefreshIcon />
        </AttachmentAction>
        <AttachmentAction aria-label="Remove financial-model.xlsx">
          <CloseIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
    <Attachment state="done" class="w-full">
      <AttachmentMedia>
        <CheckIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>quarterly-report.pdf</AttachmentTitle>
        <AttachmentDescription>Uploaded just now</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove quarterly-report.pdf">
          <CloseIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  </div>
</template>
