import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';
import { Separator } from '@/app/ui/separator';

import { CommandRootService } from './command-root.service';

/**
 * `[uiCommandSeparator]` — a hairline between groups (registry
 * `CommandSeparator`). Reuses the shared `ui/separator` for the actual line
 * (role, `bg-border`, `h-px`) rather than re-declaring it; the host is a thin
 * marker that carries `data-slot="command-separator"` and the cmdk hide-on-search
 * behaviour (a re-sorted, filtered list has no stable group boundaries, so the
 * separator collapses while the search is non-empty).
 *
 * `-mx-1` on the inner separator bleeds the line to the panel edges (the panel
 * has `p-1`). The inner separator is left DECORATIVE (`ui/separator` default →
 * `role="none"`): `role="separator"` is NOT a permitted child of `role="listbox"`
 * (only `option` / `group` are), so a semantic separator here would be an ARIA
 * violation. The group `role="group"` + heading already convey structure; the
 * line is purely visual.
 */
@Component({
  selector: '[uiCommandSeparator]',
  standalone: true,
  imports: [Separator],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<div uiSeparator [class]="innerClass()"></div>',
  host: {
    'data-slot': 'command-separator',
    '[hidden]': 'searching()',
  },
})
export class CommandSeparatorComponent {
  private readonly root = inject(CommandRootService);

  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly innerClass = computed(() => cn('-mx-1', this.className()));

  protected readonly searching = computed(() => this.root.search().trim().length > 0);
}
