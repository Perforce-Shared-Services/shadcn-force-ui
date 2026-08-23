// [FORCE-UI] Ember port of examples/base/input-group-with-buttons.tsx.
import CopyIcon from '~icons/ms/content_copy';
import TrashIcon from '~icons/ms/delete';
import { Field, FieldGroup, FieldLabel } from '@/ember-ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/ember-ui/input-group';

<template>
  <FieldGroup>
    <Field>
      <FieldLabel @for="input-button-13">Button</FieldLabel>
      <InputGroup>
        <InputGroupInput id="input-button-13" />
        <InputGroupAddon>
          <InputGroupButton>Default</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput id="input-button-14" />
        <InputGroupAddon>
          <InputGroupButton @variant="outline">Outline</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput id="input-button-15" />
        <InputGroupAddon>
          <InputGroupButton @variant="secondary">Secondary</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput id="input-button-16" />
        <InputGroupAddon @align="inline-end">
          <InputGroupButton @variant="secondary">Button</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput id="input-button-17" />
        <InputGroupAddon @align="inline-end">
          <InputGroupButton @size="icon-xs">
            <CopyIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput id="input-button-18" />
        <InputGroupAddon @align="inline-end">
          <InputGroupButton @variant="secondary" @size="icon-xs">
            <TrashIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  </FieldGroup>
</template>
