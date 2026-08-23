// [FORCE-UI] Ember port of registry:block login-01 (React reference: apps/v4/registry/new-york-v4/blocks/login-01)
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

interface LoginFormSignature {
  Element: HTMLDivElement;
  Args: {
    class?: string;
  };
  Blocks: {
    default: [];
  };
}

const LoginForm: TOC<LoginFormSignature> = <template>
  <div class={{cn "flex flex-col gap-6" @class}} ...attributes>
    <Card>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel @for="email">Email</FieldLabel>
              <Input @type="email" id="email" placeholder="m@example.com" required />
            </Field>
            <Field>
              <div class="flex items-center">
                <FieldLabel @for="password">Password</FieldLabel>
                <a
                  href="#"
                  class="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >Forgot your password?</a>
              </div>
              <Input @type="password" id="password" required />
            </Field>
            <Field>
              <Button @type="submit">Login</Button>
              <Button @variant="outline" @type="button">Login with Google</Button>
              <FieldDescription @class="text-center">
                Don't have an account? <a href="#">Sign up</a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  </div>
</template>;

export { LoginForm };
