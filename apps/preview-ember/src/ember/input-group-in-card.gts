// [FORCE-UI] Ember port of examples/base/input-group-in-card.tsx.
import ExternalLinkIcon from '~icons/ms/open_in_new';
import MailIcon from '~icons/ms/mail';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ember-ui/card';
import { Button } from '@/ember-ui/button';
import { Field, FieldGroup, FieldLabel } from '@/ember-ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '@/ember-ui/input-group';

<template>
  <Card class="w-full">
    <CardHeader>
      <CardTitle>Card with Input Group</CardTitle>
      <CardDescription>This is a card with an input group.</CardDescription>
    </CardHeader>
    <CardContent>
      <FieldGroup>
        <Field>
          <FieldLabel @for="email-input">Email Address</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="email-input"
              placeholder="you@example.com"
              type="email"
            />
            <InputGroupAddon @align="inline-end">
              <MailIcon />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel @for="website-input">Website URL</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>https://</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput id="website-input" placeholder="example.com" />
            <InputGroupAddon @align="inline-end">
              <ExternalLinkIcon />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel @for="feedback-textarea">Feedback &amp; Comments</FieldLabel>
          <InputGroup>
            <InputGroupTextarea
              id="feedback-textarea"
              placeholder="Enter your feedback..."
            />
            <InputGroupAddon @align="inline-end">
              <InputGroupText>0/280</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </FieldGroup>
    </CardContent>
    <CardFooter>
      <Button type="submit">Submit</Button>
    </CardFooter>
  </Card>
</template>
