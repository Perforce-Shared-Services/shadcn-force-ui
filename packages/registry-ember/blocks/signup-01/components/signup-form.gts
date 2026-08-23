// [FORCE-UI] Ember port of registry:block signup-01 (React reference: apps/v4/registry/new-york-v4/blocks/signup-01)
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
  Args: { class?: string };
  Blocks: { default: [] };
}

const SignupForm: TOC<SignupFormSignature> = <template>
  <Card @class={{@class}} ...attributes>
    <CardHeader>
      <CardTitle>Create an account</CardTitle>
      <CardDescription>
        Enter your information below to create your account
      </CardDescription>
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
            <FieldDescription>
              We'll use this to contact you. We will not share your email with
              anyone else.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel @for="password">Password</FieldLabel>
            <Input @type="password" id="password" required />
            <FieldDescription>Must be at least 8 characters long.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel @for="confirm-password">Confirm Password</FieldLabel>
            <Input @type="password" id="confirm-password" required />
            <FieldDescription>Please confirm your password.</FieldDescription>
          </Field>
          <FieldGroup>
            <Field>
              <Button @type="submit">Create Account</Button>
              <Button @variant="outline" @type="button">Sign up with Google</Button>
              <FieldDescription @class="px-6 text-center">
                Already have an account? <a href="#">Sign in</a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldGroup>
      </form>
    </CardContent>
  </Card>
</template>;

export { SignupForm };
