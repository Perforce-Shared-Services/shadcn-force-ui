// [FORCE-UI] Ember port of examples/base/input-group-rtl.tsx. Fixed rtl dir
// per the ember RTL demo convention.
import SearchIcon from '~icons/ms/search';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '@/ui/input-group';

<template>
  <FieldGroup dir="rtl">
    <Field>
      <FieldLabel @for="input-group-rtl-search">بحث...</FieldLabel>
      <InputGroup dir="rtl">
        <InputGroupInput id="input-group-rtl-search" placeholder="بحث..." />
        <InputGroupAddon @align="inline-end">
          <SearchIcon class="text-muted-foreground" />
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription>12 نتائج</FieldDescription>
    </Field>
    <Field>
      <FieldLabel @for="input-group-rtl-textarea">منطقة النص</FieldLabel>
      <InputGroup dir="rtl">
        <InputGroupTextarea
          id="input-group-rtl-textarea"
          placeholder="اكتب تعليقًا..."
        />
        <InputGroupAddon @align="inline-end">
          <InputGroupText>٠/٢٨٠</InputGroupText>
          <InputGroupButton>نشر</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription>تذييل موضع أسفل منطقة النص.</FieldDescription>
    </Field>
  </FieldGroup>
</template>
