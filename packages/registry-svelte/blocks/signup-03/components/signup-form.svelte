<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/signup-03 -->
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
  import { cn, type WithElementRef } from "$lib/utils.js"
  import type { HTMLAttributes } from "svelte/elements"

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props()
</script>

<div
  bind:this={ref}
  class={cn("flex flex-col gap-6", className)}
  {...restProps}
>
  {@render children?.()}
  <Card.Root>
    <Card.Header class="text-center">
      <Card.Title class="text-xl">Create your account</Card.Title>
      <Card.Description>
        Enter your email below to create your account
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
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </Field>
          <Field>
            <Field class="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel for="password">Password</FieldLabel>
                <Input id="password" type="password" required />
              </Field>
              <Field>
                <FieldLabel for="confirm-password">Confirm Password</FieldLabel>
                <Input id="confirm-password" type="password" required />
              </Field>
            </Field>
            <FieldDescription
              >Must be at least 8 characters long.</FieldDescription
            >
          </Field>
          <Field>
            <Button type="submit">Create Account</Button>
            <FieldDescription class="text-center">
              Already have an account? <a href="#">Sign in</a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </Card.Content>
  </Card.Root>
  <FieldDescription class="px-6 text-center">
    By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
    and <a href="#">Privacy Policy</a>.
  </FieldDescription>
</div>
