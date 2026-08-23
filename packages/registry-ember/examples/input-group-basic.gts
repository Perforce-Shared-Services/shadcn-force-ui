// [FORCE-UI] Ember port of examples/base/input-group-basic.tsx.
import { Field, FieldGroup, FieldLabel } from '@/ui/field';
import { Input } from '@/ui/input';
import { InputGroup, InputGroupInput } from '@/ui/input-group';

<template>
  <FieldGroup>
    <Field>
      <FieldLabel @for="input-default-01">Default (No Input Group)</FieldLabel>
      <Input id="input-default-01" placeholder="Placeholder" />
    </Field>
    <Field>
      <FieldLabel @for="input-group-02">Input Group</FieldLabel>
      <InputGroup>
        <InputGroupInput id="input-group-02" placeholder="Placeholder" />
      </InputGroup>
    </Field>
    <Field data-disabled="true">
      <FieldLabel @for="input-disabled-03">Disabled</FieldLabel>
      <InputGroup>
        <InputGroupInput
          disabled={{true}}
          id="input-disabled-03"
          placeholder="This field is disabled"
        />
      </InputGroup>
    </Field>
    <Field data-invalid="true">
      <FieldLabel @for="input-invalid-04">Invalid</FieldLabel>
      <InputGroup>
        <InputGroupInput
          aria-invalid="true"
          id="input-invalid-04"
          placeholder="This field is invalid"
        />
      </InputGroup>
    </Field>
  </FieldGroup>
</template>
