// [FORCE-UI] Ember port of registry:block signup-03 (React reference: apps/v4/registry/new-york-v4/blocks/signup-03)
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import type { TOC } from '@ember/component/template-only';

interface SignupFormSignature {
  Element: HTMLDivElement;
  Args: { class?: string };
  Blocks: { default: [] };
}

const SignupForm: TOC<SignupFormSignature> = <template>
  <div class={{cn "flex flex-col gap-6" @class}} ...attributes>
    <Card>
      <CardHeader @class="text-center">
        <CardTitle @class="text-xl">Create your account</CardTitle>
        <CardDescription>Enter your email below to create your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel @for="name">Full Name</FieldLabel>
              <Input @type="text" id="name" placeholder="John Doe" required />
            </Field>
            <Field>
              <FieldLabel @for="email">Email</FieldLabel>
              <Input @type="email" id="email" placeholder="m@example.com" required />
            </Field>
            <Field>
              <Field @class="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel @for="password">Password</FieldLabel>
                  <Input @type="password" id="password" required />
                </Field>
                <Field>
                  <FieldLabel @for="confirm-password">Confirm Password</FieldLabel>
                  <Input @type="password" id="confirm-password" required />
                </Field>
              </Field>
              <FieldDescription>Must be at least 8 characters long.</FieldDescription>
            </Field>
            <Field>
              <Button @type="submit">Create Account</Button>
              <FieldDescription @class="text-center">
                Already have an account? <a href="#">Sign in</a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
    <FieldDescription @class="px-6 text-center">
      By clicking continue, you agree to our
      <a href="#">Terms of Service</a>
      and
      <a href="#">Privacy Policy</a>.
    </FieldDescription>
  </div>
</template>;

export { SignupForm };
