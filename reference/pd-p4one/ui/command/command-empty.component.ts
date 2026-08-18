import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

import { CommandRootService } from './command-root.service';

/**
 * `[uiCommandEmpty]` — the "no results" state (registry `CommandEmpty`).
 * Classes verbatim. cmdk only renders it when the filter yields zero items;
 * here it shows when the root reports no visible items AND a search is active
 * (an empty search shows the full list, not the empty state).
 *
 *   <div uiCommandEmpty>No matching versions or experiments.</div>
 *
 * a11y: `role="status"` (an `aria-live="polite"` region) so the no-results state
 * is announced with the caller's actual text when it appears — the root's
 * count-announcer stays silent at zero to avoid two strings for one state.
 * Follow the writing guide for the copy (what happened + what to do next).
 */
@Component({
  selector: '[uiCommandEmpty]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content />',
  host: {
    'data-slot': 'command-empty',
    role: 'status',
    '[hidden]': '!visible()',
    '[class]': 'classes()',
  },
})
export class CommandEmptyComponent {
  private readonly root = inject(CommandRootService);

  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly visible = computed(
    () => this.root.isEmpty() && this.root.search().trim().length > 0,
  );

  protected readonly classes = computed(() =>
    cn('py-6 text-center text-sm', this.className()),
  );
}
