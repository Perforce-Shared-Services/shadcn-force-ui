// [FORCE-UI] Ember port of examples/base/input-group-with-tooltip.tsx. The
// React demo wires sonner toasts; buttons here are visual (no toast dep).
import ChevronDownIcon from '~icons/ms/keyboard_arrow_down';
import InfoIcon from '~icons/ms/info';
import StarIcon from '~icons/ms/star';
import { Button } from '@/ember-ui/button';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/ember-ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/ember-ui/input-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/ember-ui/tooltip';

<template>
  <FieldGroup>
    <Field>
      <FieldLabel @for="input-tooltip-30">With Tooltip</FieldLabel>
      <Tooltip>
        <TooltipTrigger asChild={{true}}>
          <span class="w-full" tabindex="0">
            <InputGroup>
              <InputGroupInput id="input-tooltip-30" placeholder="Enter API key" />
              <InputGroupAddon @align="inline-end">
                <InfoIcon class="text-muted-foreground" />
              </InputGroupAddon>
            </InputGroup>
          </span>
        </TooltipTrigger>
        <TooltipContent>Your API key is stored securely.</TooltipContent>
      </Tooltip>
      <FieldDescription>Hover or focus the field for details.</FieldDescription>
    </Field>
    <Field>
      <FieldLabel @for="input-rating-31">Rating</FieldLabel>
      <InputGroup>
        <InputGroupInput id="input-rating-31" placeholder="Rate this item" />
        <InputGroupAddon @align="inline-end">
          <InputGroupButton @size="icon-xs" aria-label="Star">
            <StarIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Field>
    <Field>
      <FieldLabel @for="input-dropdown-32">With Dropdown</FieldLabel>
      <InputGroup>
        <InputGroupInput id="input-dropdown-32" placeholder="Select option" />
        <InputGroupAddon @align="inline-end">
          <Button
            aria-label="Options"
            class="h-6 w-6 p-0"
            size="xs"
            variant="ghost"
          >
            <ChevronDownIcon />
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  </FieldGroup>
</template>
