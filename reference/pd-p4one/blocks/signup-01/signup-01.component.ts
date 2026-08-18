import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Button } from '@/app/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/app/ui/field';
import { Input } from '@/app/ui/input';

/**
 * Angular port of the shadcn/Force UI Block `signup-01` — "A simple signup
 * form."
 *
 * Pure composition of already-ported `ui/*` primitives (card, field, input,
 * button) — no new cva, no new tokens, no component-level SCSS. Structural
 * reference: the upstream registry's `SignupForm` (single-column card, full
 * name + email + password + confirm password fields, primary submit,
 * secondary OAuth button, sign-in footnote). Mirrors `login-01`'s shape
 * (same dependency set, same card wrapper) rather than the label-only
 * blocks like `login-05`.
 *
 * Copy deviation: the Figma frame (fileKey `jr1JErMIXt6T2BakbG2iBI`, node
 * `18748:247757`) shows the footer link as "Already have an account? Sign
 * up" — the same copy-paste artifact from a login-block template already
 * documented on `signup-02`, since a page for people who already have an
 * account should route to sign IN, not sign up again. Kept the upstream
 * registry's correct copy ("Sign in") rather than the Figma frame's literal
 * text.
 *
 * This is reference/demo code: `onSubmit()`/`onGoogleSignup()` are stand-ins
 * for real account-creation wiring and intentionally do nothing beyond a log
 * line — a consuming app owns its own submit handler.
 */
@Component({
  selector: 'app-block-signup-01',
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
          <h3 uiCardTitle>Create an account</h3>
          <div uiCardDescription>Enter your information below to create your account</div>
        </div>
        <div uiCardContent>
          <form (submit)="onSubmit($event)">
            <div uiFieldGroup>
              <div uiField>
                <label uiFieldLabel for="signup-01-name">Full name</label>
                <input
                  uiInput
                  id="signup-01-name"
                  type="text"
                  placeholder="John Doe"
                  autocomplete="name"
                  required />
              </div>
              <div uiField>
                <label uiFieldLabel for="signup-01-email">Email</label>
                <input
                  uiInput
                  id="signup-01-email"
                  type="email"
                  placeholder="m@example.com"
                  autocomplete="email"
                  required />
                <p uiFieldDescription>
                  We will use this to contact you. We will not share your email with anyone else.
                </p>
              </div>
              <div uiField>
                <label uiFieldLabel for="signup-01-password">Password</label>
                <input
                  uiInput
                  id="signup-01-password"
                  type="password"
                  autocomplete="new-password"
                  required />
                <p uiFieldDescription>Must be at least 8 characters long.</p>
              </div>
              <div uiField>
                <label uiFieldLabel for="signup-01-confirm-password">Confirm password</label>
                <input
                  uiInput
                  id="signup-01-confirm-password"
                  type="password"
                  autocomplete="new-password"
                  required />
                <p uiFieldDescription>Confirm your password.</p>
              </div>
              <div uiFieldGroup>
                <div uiField>
                  <button uiButton type="submit">Create account</button>
                  <button uiButton variant="outline" type="button" (click)="onGoogleSignup()">
                    Sign up with Google
                  </button>
                  <p uiFieldDescription class="px-6 text-center">
                    Already have an account? <a href="#">Sign in</a>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class SignupForm01 {
  onSubmit(event: Event): void {
    event.preventDefault();
    // Reference/demo only — a consuming app wires its own account-creation flow here.
    console.log('signup-01: submit');
  }

  onGoogleSignup(): void {
    // Reference/demo only — a consuming app wires its own OAuth flow here.
    console.log('signup-01: sign up with Google');
  }
}
