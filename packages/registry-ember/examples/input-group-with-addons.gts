// [FORCE-UI] Ember port of examples/base/input-group-with-addons.tsx.
// Toast-backed button actions replaced with plain buttons (no sonner wiring).
import CopyIcon from '~icons/ms/content_copy';
import EyeOffIcon from '~icons/ms/visibility_off';
import InfoIcon from '~icons/ms/info';
import MicIcon from '~icons/ms/mic';
import RadioIcon from '~icons/ms/radio_button_checked';
import SearchIcon from '~icons/ms/search';
import StarIcon from '~icons/ms/star';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from '@/ui/input-group';

<template>
  <FieldGroup>
    <Field>
      <FieldLabel @for="input-icon-left-05">Addon (inline-start)</FieldLabel>
      <InputGroup>
        <InputGroupInput id="input-icon-left-05" />
        <InputGroupAddon>
          <SearchIcon class="text-muted-foreground" />
        </InputGroupAddon>
      </InputGroup>
    </Field>
    <Field>
      <FieldLabel @for="input-icon-right-07">Addon (inline-end)</FieldLabel>
      <InputGroup>
        <InputGroupInput id="input-icon-right-07" />
        <InputGroupAddon @align="inline-end">
          <InfoIcon class="text-muted-foreground" />
        </InputGroupAddon>
      </InputGroup>
    </Field>
    <Field>
      <FieldLabel @for="input-text-08">Text addon</FieldLabel>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput id="input-text-08" placeholder="example.com" />
        <InputGroupAddon @align="inline-end">
          <InfoIcon class="text-muted-foreground" />
        </InputGroupAddon>
      </InputGroup>
    </Field>
    <Field>
      <FieldLabel @for="input-star-09">Rating</FieldLabel>
      <InputGroup>
        <InputGroupInput id="input-star-09" />
        <InputGroupAddon @align="inline-end">
          <InputGroupButton @size="icon-xs">
            <StarIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Field>
    <Field>
      <FieldLabel @for="input-password-10">Password</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id="input-password-10"
          type="password"
          placeholder="Enter password"
        />
        <InputGroupAddon @align="inline-end">
          <InputGroupButton @size="icon-xs">
            <EyeOffIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Field>
    <Field>
      <FieldLabel @for="input-mic-11">Voice search</FieldLabel>
      <InputGroup>
        <InputGroupInput id="input-mic-11" placeholder="Search..." />
        <InputGroupAddon @align="inline-end">
          <InputGroupButton @size="icon-xs">
            <MicIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Field>
    <Field>
      <FieldLabel @for="input-live-12">Live</FieldLabel>
      <InputGroup>
        <InputGroupInput id="input-live-12" placeholder="Live..." />
        <InputGroupAddon @align="inline-end">
          <RadioIcon class="text-destructive" />
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription>Live updates are on.</FieldDescription>
    </Field>
    <Field data-disabled="true">
      <FieldLabel @for="input-copy-14">Copy</FieldLabel>
      <InputGroup>
        <InputGroupInput disabled={{true}} id="input-copy-14" value="shadcn" />
        <InputGroupAddon @align="inline-end">
          <InputGroupButton disabled={{true}} @size="icon-xs">
            <CopyIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  </FieldGroup>
</template>
