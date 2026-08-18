import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/input-otp's `InputOTPGroup` — a visual cluster of
 * slots (e.g. 3 digits before a separator). Byte-identical class string to
 * the registry.
 *
 * Usage: nest `[uiInputOtpSlot]` children inside; must sit inside `[uiInputOtp]`.
 */
@Component({
  selector: '[uiInputOtpGroup]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'input-otp-group',
    '[class]': 'classes()',
  },
  template: '<ng-content />',
})
export class InputOtpGroupComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'flex items-center rounded-lg has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40',
      this.className(),
    ),
  );
}
