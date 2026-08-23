// [FORCE-UI] Ember port of examples/base/input-group-textarea-examples.tsx.
import ArrowUpIcon from '~icons/ms/north';
import CodeIcon from '~icons/ms/code';
import CopyIcon from '~icons/ms/content_copy';
import InfoIcon from '~icons/ms/info';
import RefreshIcon from '~icons/ms/refresh';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/ui/field';
import { Textarea } from '@/ui/textarea';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from '@/ui/input-group';

<template>
  <FieldGroup>
    <Field>
      <FieldLabel @for="textarea-header-footer-12">
        Default Textarea (No Input Group)
      </FieldLabel>
      <Textarea
        id="textarea-header-footer-12"
        placeholder="Enter your text here..."
      />
    </Field>
    <Field>
      <FieldLabel @for="textarea-header-footer-13">Input Group</FieldLabel>
      <InputGroup>
        <InputGroupTextarea
          id="textarea-header-footer-13"
          placeholder="Enter your text here..."
        />
      </InputGroup>
      <FieldDescription>
        This is a description of the input group.
      </FieldDescription>
    </Field>
    <Field data-invalid="true">
      <FieldLabel @for="textarea-header-footer-14">Invalid</FieldLabel>
      <InputGroup>
        <InputGroupTextarea
          aria-invalid="true"
          id="textarea-header-footer-14"
          placeholder="Enter your text here..."
        />
      </InputGroup>
      <FieldDescription>Please enter a valid message.</FieldDescription>
    </Field>
    <Field>
      <FieldLabel @for="textarea-header-footer-15">
        With Header and Footer Addons
      </FieldLabel>
      <InputGroup>
        <InputGroupTextarea
          id="textarea-header-footer-15"
          placeholder="Ask, Learn, Iterate..."
        />
        <InputGroupAddon @align="block-start">
          <InputGroupText class="text-muted-foreground">Prompt</InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon @align="block-end">
          <InputGroupText class="text-muted-foreground">0/280</InputGroupText>
          <InputGroupButton @size="icon-xs">
            <CodeIcon />
          </InputGroupButton>
          <InputGroupButton @size="icon-xs">
            <InfoIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Field>
    <Field>
      <FieldLabel @for="textarea-actions-16">
        Footer Actions (inline-end)
      </FieldLabel>
      <InputGroup>
        <InputGroupTextarea
          id="textarea-actions-16"
          placeholder="Write a comment..."
        />
        <InputGroupAddon @align="block-end">
          <InputGroupText class="text-muted-foreground">0/280</InputGroupText>
          <InputGroupButton class="ml-auto" @size="icon-xs">
            <CopyIcon />
          </InputGroupButton>
          <InputGroupButton @size="icon-xs">
            <RefreshIcon />
          </InputGroupButton>
          <InputGroupButton class="rounded-full" @size="icon-xs">
            <ArrowUpIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  </FieldGroup>
</template>
