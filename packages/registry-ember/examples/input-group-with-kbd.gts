// [FORCE-UI] Ember port of examples/base/input-group-with-kbd.tsx.
import CheckIcon from '~icons/ms/check';
import InfoIcon from '~icons/ms/info';
import SearchIcon from '~icons/ms/search';
import SparklesIcon from '~icons/ms/auto_awesome_motion';
import Spinner from '~icons/ms/progress_activity';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/ui/input-group';
import { Kbd, KbdGroup } from '@/ui/kbd';

<template>
  <FieldGroup>
    <Field>
      <FieldLabel @for="input-kbd-22">Input Group with Kbd</FieldLabel>
      <InputGroup>
        <InputGroupInput id="input-kbd-22" />
        <InputGroupAddon>
          <Kbd>⌘K</Kbd>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput id="input-kbd-23" />
        <InputGroupAddon @align="inline-end">
          <Kbd>⌘K</Kbd>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput
          id="input-search-apps-24"
          placeholder="Search for Apps..."
        />
        <InputGroupAddon @align="inline-end">Ask AI</InputGroupAddon>
        <InputGroupAddon @align="inline-end">
          <Kbd>Tab</Kbd>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput
          id="input-search-type-25"
          placeholder="Type to search..."
        />
        <InputGroupAddon>
          <SparklesIcon />
        </InputGroupAddon>
        <InputGroupAddon @align="inline-end">
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>C</Kbd>
          </KbdGroup>
        </InputGroupAddon>
      </InputGroup>
    </Field>
    <Field>
      <FieldLabel @for="input-username-26">Username</FieldLabel>
      <InputGroup>
        <InputGroupInput id="input-username-26" value="shadcn" />
        <InputGroupAddon @align="inline-end">
          <div
            class="flex size-4 items-center justify-center rounded-full bg-green-500 dark:bg-green-800"
          >
            <CheckIcon class="size-3 text-white" />
          </div>
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription class="text-green-700">
        This username is available.
      </FieldDescription>
    </Field>
    <InputGroup>
      <InputGroupInput
        id="input-search-docs-27"
        placeholder="Search documentation..."
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupAddon @align="inline-end">12 results</InputGroupAddon>
    </InputGroup>
    <InputGroup data-disabled="true">
      <InputGroupInput
        disabled={{true}}
        id="input-search-disabled-28"
        placeholder="Search documentation..."
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupAddon @align="inline-end">Disabled</InputGroupAddon>
    </InputGroup>
    <FieldGroup class="grid grid-cols-2 gap-4">
      <Field>
        <FieldLabel @for="input-group-11">First Name</FieldLabel>
        <InputGroup>
          <InputGroupInput id="input-group-11" placeholder="First Name" />
          <InputGroupAddon @align="inline-end">
            <InfoIcon />
          </InputGroupAddon>
        </InputGroup>
      </Field>
      <Field>
        <FieldLabel @for="input-group-12">Last Name</FieldLabel>
        <InputGroup>
          <InputGroupInput id="input-group-12" placeholder="Last Name" />
          <InputGroupAddon @align="inline-end">
            <InfoIcon />
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </FieldGroup>
    <Field data-disabled="true">
      <FieldLabel @for="input-group-29">Loading</FieldLabel>
      <InputGroup>
        <InputGroupInput
          disabled={{true}}
          id="input-group-29"
          value="shadcn"
        />
        <InputGroupAddon @align="inline-end">
          <Spinner class="animate-spin" />
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription>
        This is a description of the input group.
      </FieldDescription>
    </Field>
  </FieldGroup>
</template>
