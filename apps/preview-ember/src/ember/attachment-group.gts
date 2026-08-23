import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentGroup,
  AttachmentMedia,
} from '@/ember-ui/attachment';

import Close from '~icons/ms/close';

const images = [
  {
    name: 'workspace.png',
    src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80',
    alt: 'Workspace',
  },
  {
    name: 'desk-reference.jpg',
    src: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80',
    alt: 'Desk',
  },
  {
    name: 'office-reference.jpg',
    src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80',
    alt: 'Office',
  },
];

<template>
  <div class="mx-auto w-full max-w-md py-12">
    <AttachmentGroup>
      {{#each images as |image|}}
        <Attachment @orientation="vertical">
          <AttachmentMedia @variant="image">
            <img alt={{image.alt}} src={{image.src}} />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentActions>
              <AttachmentAction
                aria-label="Remove {{image.name}}"
                class="absolute top-1 right-1 z-10 bg-background/80"
              >
                <Close />
              </AttachmentAction>
            </AttachmentActions>
          </AttachmentContent>
        </Attachment>
      {{/each}}
    </AttachmentGroup>
  </div>
</template>
