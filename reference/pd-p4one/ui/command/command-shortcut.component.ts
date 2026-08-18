import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * `[uiCommandShortcut]` — the right-aligned keyboard hint on an item (registry
 * `CommandShortcut`). Classes verbatim. Its presence hides the item's trailing
 * check (the item's `group-has-data-[slot=command-shortcut]` rule), so an item
 * is either "selectable value with a check" or "action with a shortcut", not
 * both.
 *
 * Render the keycaps with the shared `ui/kbd` component (reuse, not a bespoke
 * pill): each key is a `<kbd uiKbd>`, grouped in the shortcut container:
 *
 *   <div uiCommandItem>New experiment
 *     <span uiCommandShortcut><kbd uiKbd>⌘</kbd><kbd uiKbd>E</kbd></span>
 *   </div>
 *
 * The container is `inline-flex … gap-1` so the caps line up; the registry's
 * `text-xs tracking-widest text-muted-foreground` remain as the fallback style
 * for plain-text shortcuts. `data-slot="command-shortcut"` is preserved — the
 * item's `group-has-data-[slot=command-shortcut]` rule hides its trailing check
 * when a shortcut is present.
 *
 * a11y: decorative hint — the real activation is Enter/click on the item. If the
 * shortcut is a live global binding, add `aria-keyshortcuts` on the item.
 */
@Component({
  selector: '[uiCommandShortcut]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content />',
  host: {
    'data-slot': 'command-shortcut',
    'aria-hidden': 'true',
    '[class]': 'classes()',
  },
})
export class CommandShortcutComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'ml-auto inline-flex items-center gap-1 text-xs tracking-widest text-muted-foreground group-data-selected/command-item:text-foreground',
      this.className(),
    ),
  );
}
