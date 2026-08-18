import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { cn } from '@/app/lib/utils';

import { inputVariants } from '../input';

/**
 * Angular port of @force-ui/sidebar's `SidebarInput`.
 *
 * The registry composes `<Input>` directly with fixed extra classes
 * (`h-8 w-full bg-background shadow-none`) — same "fixed composition, not a
 * co-applied behavior directive" shape as `SidebarTrigger`, and the same
 * dual-`[class]`-host-binding conflict `ui/input`'s attribute-selector
 * directive would hit if stacked via `hostDirectives`. Reuses the exported
 * `inputVariants()` builder directly instead (`outline`, the registry's only
 * style) rather than composing `[uiInput]`.
 */
@Component({
  selector: 'input[uiSidebarInput]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'sidebar-input',
    'data-sidebar': 'input',
    '[class]': 'classes()',
  },
  template: '',
})
export class SidebarInputComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(inputVariants({ variant: 'outline' }), 'bg-background shadow-none', this.className()),
  );
}
