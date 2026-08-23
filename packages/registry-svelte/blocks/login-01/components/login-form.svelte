<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/login-01 -->
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
    <Card.Header>
      <Card.Title>Login to your account</Card.Title>
      <Card.Description>
        Enter your email below to login to your account
      </Card.Description>
    </Card.Header>
    <Card.Content>
      <form>
        <FieldGroup>
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
            <div class="flex items-center">
              <FieldLabel for="password">Password</FieldLabel>
              <a
                href="#"
                class="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input id="password" type="password" required />
          </Field>
          <Field>
            <Button type="submit">Login</Button>
            <Button variant="outline" type="button">Login with Google</Button>
            <FieldDescription class="text-center">
              Don&apos;t have an account? <a href="#">Sign up</a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </Card.Content>
  </Card.Root>
</div>
