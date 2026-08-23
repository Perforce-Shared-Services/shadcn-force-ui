import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from '@/ember-ui/attachment';
import { Spinner } from '@/ember-ui/spinner';

import Check from '~icons/ms/check';
import FileText from '~icons/ms/description';
import Refresh from '~icons/ms/refresh';
import Schedule from '~icons/ms/schedule';
import Warning from '~icons/ms/warning';
import Close from '~icons/ms/close';

<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-2 py-12">
    <Attachment @state="idle" class="w-full">
      <AttachmentMedia>
        <Schedule />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>selected-file.pdf</AttachmentTitle>
        <AttachmentDescription>Ready to upload</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove selected-file.pdf">
          <Close />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
    <Attachment @state="uploading" class="w-full">
      <AttachmentMedia>
        <Spinner />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>design-system.zip</AttachmentTitle>
        <AttachmentDescription>Uploading · 64%</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Cancel upload">
          <Close />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
    <Attachment @state="processing" class="w-full">
      <AttachmentMedia>
        <FileText />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>market-research.pdf</AttachmentTitle>
        <AttachmentDescription>Processing document</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove market-research.pdf">
          <Close />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
    <Attachment @state="error" class="w-full">
      <AttachmentMedia>
        <Warning />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>financial-model.xlsx</AttachmentTitle>
        <AttachmentDescription>Upload failed. Try again.</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Retry upload">
          <Refresh />
        </AttachmentAction>
        <AttachmentAction aria-label="Remove financial-model.xlsx">
          <Close />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
    <Attachment @state="done" class="w-full">
      <AttachmentMedia>
        <Check />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>uploaded-report.pdf</AttachmentTitle>
        <AttachmentDescription>Uploaded · 1.8 MB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove uploaded-report.pdf">
          <Close />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  </div>
</template>
