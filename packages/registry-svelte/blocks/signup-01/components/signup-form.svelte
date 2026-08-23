<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/signup-01 -->
<script lang="ts">
  import { Button } from "$lib/registry/ui/button/index.js"
  import * as Card from "$lib/registry/ui/card/index.js"
  import {
    Field,
    Description as FieldDescription,
    Group as FieldGroup,
    Label as FieldLabel,
    Separator as FieldSeparator,
  } from "$lib/registry/ui/field/index.js"
  import { Input } from "$lib/registry/ui/input/index.js"

  let {
    class: className,
    children,
  }: { class?: string; children?: import("svelte").Snippet } = $props()
</script>

<Card.Root class={className}>
  {@render children?.()}
  <Card.Header>
    <Card.Title>Create an account</Card.Title>
    <Card.Description>
      Enter your information below to create your account
    </Card.Description>
  </Card.Header>
  <Card.Content>
    <form>
      <FieldGroup>
        <Field>
          <FieldLabel for="name">Full Name</FieldLabel>
          <Input id="name" type="text" placeholder="John Doe" required />
        </Field>
        <Field>
          <FieldLabel for="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="m@example.com" required />
          <FieldDescription>
            We&apos;ll use this to contact you. We will not share your email
            with anyone else.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel for="password">Password</FieldLabel>
          <Input id="password" type="password" required />
          <FieldDescription
            >Must be at least 8 characters long.</FieldDescription
          >
        </Field>
        <Field>
          <FieldLabel for="confirm-password">Confirm Password</FieldLabel>
          <Input id="confirm-password" type="password" required />
          <FieldDescription>Please confirm your password.</FieldDescription>
        </Field>
        <FieldGroup>
          <Field>
            <Button type="submit">Create Account</Button>
            <Button variant="outline" type="button">Sign up with Google</Button>
            <FieldDescription class="px-6 text-center">
              Already have an account? <a href="#">Sign in</a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  </Card.Content>
</Card.Root>
