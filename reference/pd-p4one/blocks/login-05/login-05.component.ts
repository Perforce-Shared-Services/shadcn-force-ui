import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { Button } from '@/app/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/app/ui/field';
import { Input } from '@/app/ui/input';

import { LOGIN_05_LOGO_SVG } from './login-05.icons';

/**
 * Angular port of the Force UI Block `login-05` ("A simple email-only login
 * page").
 *
 * Composition only — every visual decision (color, spacing, radius, focus
 * ring) already lives in the `ui/field` / `ui/input` / `ui/button` primitives
 * this template composes; nothing here introduces a new class string beyond
 * plain layout (flex/grid/gap) utilities, matching the registry source.
 *
 * Reference/demo code: the block is not wired to a real auth backend. Submit
 * and the two OAuth buttons just log — a consuming product wires its own
 * handlers when it copies this file (same philosophy shadcn itself uses for
 * Blocks: you own the code, you don't import a library).
 */
@Component({
  selector: 'app-block-login-05',
  standalone: true,
  imports: [Button, Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator, Input],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div class="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div class="flex w-full max-w-sm flex-col gap-6">
        <form (submit)="onSubmit($event)">
          <div uiFieldGroup>
            <div class="flex flex-col items-center gap-2 text-center">
              <a href="#" class="flex flex-col items-center gap-2 font-medium">
                <div
                  class="flex size-8 items-center justify-center rounded-md [&_svg]:h-6 [&_svg]:w-auto [&_svg]:fill-current"
                  aria-hidden="true"
                  [innerHTML]="logoIcon"
                ></div>
                <span class="sr-only">Perforce</span>
              </a>
              <h1 class="text-xl font-bold">Welcome to Perforce</h1>
              <p uiFieldDescription>
                Don't have an account? <a href="#">Sign up</a>
              </p>
            </div>

            <div uiField>
              <label uiFieldLabel for="login-05-email">Email</label>
              <input
                uiInput
                id="login-05-email"
                type="email"
                placeholder="m@example.com"
                autocomplete="email"
                required
              />
            </div>

            <div uiField>
              <button uiButton type="submit">Login</button>
            </div>

            <div uiFieldSeparator>Or</div>

            <div uiField class="grid gap-4 sm:grid-cols-2">
              <button uiButton variant="outline" type="button" (click)="onContinueWithApple()">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="size-4 fill-current"
                  aria-hidden="true"
                >
                  <path
                    d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                  />
                </svg>
                Continue with Apple
              </button>
              <button uiButton variant="outline" type="button" (click)="onContinueWithGoogle()">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="size-4 fill-current"
                  aria-hidden="true"
                >
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  />
                </svg>
                Continue with Google
              </button>
            </div>
          </div>
        </form>
        <p uiFieldDescription class="px-6 text-center">
          By clicking continue, you agree to our <a href="#">Terms of Service</a> and
          <a href="#">Privacy Policy</a>.
        </p>
      </div>
    </div>
  `,
})
export class LoginBlock05Component {
  /**
   * Sanitizer-trusted inline SVG — bundled at build time from
   * `@material-symbols/svg-400` (trusted, static), same swap-point pattern as
   * every other ported icon in this app.
   */
  protected readonly logoIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    LOGIN_05_LOGO_SVG,
  );

  protected onSubmit(event: Event): void {
    event.preventDefault();
    // Reference/demo block — a real product wires its own submit handler here.
    console.log('[login-05] submit');
  }

  protected onContinueWithApple(): void {
    console.log('[login-05] continue with Apple');
  }

  protected onContinueWithGoogle(): void {
    console.log('[login-05] continue with Google');
  }
}
