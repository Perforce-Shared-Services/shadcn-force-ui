import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

import { CommandRootService } from './command-root.service';

let listIdCounter = 0;

/**
 * `[uiCommandList]` — the scroll container for items, groups and the empty
 * state. One deviation from the registry: the registry's `no-scrollbar` (fully
 * hidden scrollbar) is swapped for the `scrollbar-overlay` `@utility` so the
 * palette matches the dropdown-menu + select panels (thin, token-styled overlay
 * scrollbar — a hidden scrollbar hurts discoverability of a long list).
 *
 * It is the `role="listbox"` that `CommandInput` (`role="combobox"`) controls
 * via `aria-controls`. A stable generated id is published to the root so the
 * input can reference it (the highlighted item scrolls itself into view). Give
 * it an `aria-label` describing the choices (WCAG 1.3.1) — falls back to
 * "Suggestions".
 */
@Component({
  selector: '[uiCommandList]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content />',
  host: {
    'data-slot': 'command-list',
    role: 'listbox',
    '[id]': 'id',
    '[attr.aria-label]': 'ariaLabel()',
    '[class]': 'classes()',
  },
})
export class CommandListComponent {
  private readonly root = inject(CommandRootService);

  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  readonly ariaLabel = input<string>('Suggestions', { alias: 'aria-label' });

  /** Stable generated listbox id (published to the root for aria-controls). */
  protected readonly id = `command-list-${listIdCounter++}`;

  protected readonly classes = computed(() =>
    cn(
      // registry ships `no-scrollbar` (fully hidden); this app aligns with the
      // dropdown-menu + select panels which use the token-styled `scrollbar-overlay`
      // @utility (thin overlay scrollbar) for a consistent, discoverable scroll.
      'scrollbar-overlay max-h-72 scroll-py-1 overflow-x-hidden overflow-y-auto outline-none',
      this.className(),
    ),
  );

  constructor() {
    // publish the listbox id so CommandInput's aria-controls can reference it
    this.root.listId.set(this.id);
  }
}
