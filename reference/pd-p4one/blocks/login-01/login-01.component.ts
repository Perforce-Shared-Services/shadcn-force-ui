import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Button } from '@/app/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/app/ui/field';
import { Input } from '@/app/ui/input';

/**
 * Angular port of the shadcn/Force UI Block `login-01` — "A simple login
 * form."
 *
 * Pure composition of already-ported `ui/*` primitives (card, field, input,
 * button) — no new cva, no new tokens, no component-level SCSS. Structural
 * reference: the upstream registry's `LoginForm` (single-column card, email +
 * password fields, primary submit, secondary OAuth button, sign-up footnote).
 *
 * This is reference/demo code: `submit()` is a stand-in for real auth wiring
 * and intentionally does nothing beyond a log line — a consuming app owns its
 * own submit handler.
 */
@Component({
  selector: 'app-block-login-01',
  standalone: true,
  imports: [
    Button,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    Field,
    FieldGroup,
    FieldLabel,
    FieldDescription,
    Input,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div class="flex w-full max-w-sm flex-col gap-6">
      <div uiCard>
        <div uiCardHeader>
          <h3 uiCardTitle>Login to your account</h3>
          <div uiCardDescription>Enter your email below to login to your account</div>
        </div>
        <div uiCardContent>
          <form (submit)="onSubmit($event)">
            <div uiFieldGroup>
              <div uiField>
                <label uiFieldLabel for="login-01-email">Email</label>
                <input
                  uiInput
                  id="login-01-email"
                  type="email"
                  placeholder="m@example.com"
                  autocomplete="email"
                  required />
              </div>
              <div uiField>
                <div class="flex items-center">
                  <label uiFieldLabel for="login-01-password">Password</label>
                  <a
                    href="#"
                    class="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >Forgot your password?</a
                  >
                </div>
                <input
                  uiInput
                  id="login-01-password"
                  type="password"
                  autocomplete="current-password"
                  required />
              </div>
              <div uiField>
                <button uiButton type="submit">Login</button>
                <button uiButton variant="outline" type="button" (click)="onGoogleLogin()">
                  Login with Google
                </button>
                <p uiFieldDescription class="text-center">
                  Don't have an account? <a href="#">Sign up</a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class LoginForm01 {
  onSubmit(event: Event): void {
    event.preventDefault();
    // Reference/demo only — a consuming app wires its own auth flow here.
    console.log('login-01: submit');
  }

  onGoogleLogin(): void {
    // Reference/demo only — a consuming app wires its own OAuth flow here.
    console.log('login-01: login with Google');
  }
}
