import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RdxToggleGroupItemDirective } from '@radix-ng/primitives/toggle-group';

import { cn } from '@/app/lib/utils';

import {
  toggleVariants,
  type ToggleSize,
  type ToggleVariant,
} from '../toggle/toggle.variants';
import { ToggleGroupComponent } from './toggle-group.component';

/**
 * Connected-segment layout string — from the @force-ui/toggle-group registry
 * item (radix-force-ui style), copied verbatim. Kept SEPARATE from the reused
 * `toggleVariants` (shared with `ui/toggle`) — these classes only govern how
 * items join when the group sets `spacing="0"` (shared borders, collapsed
 * corners, focus z-index). At the default `spacing="2"` they are inert.
 */
const TOGGLE_GROUP_ITEM_CLASS =
  'shrink-0 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 focus:z-10 focus-visible:z-10 group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-lg group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-lg group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t';

export { TOGGLE_GROUP_ITEM_CLASS };

/**
 * Angular port of @force-ui/toggle-group's `ToggleGroupItem`.
 *
 * Attribute selector on a native `<button>` — the radix-ng
 * `RdxToggleGroupItemDirective` host directive makes it a member of the group's
 * roving focus and delegates the pressed state to `RdxToggleDirective` (which
 * sets `data-state="on"/"off"` and `aria-pressed`). MUST sit inside a
 * `[uiToggleGroup]`.
 *
 * The visual look reuses `ui/toggle`'s `toggleVariants` (reuse-first — the shared
 * toggle base + variant/size class strings, not a copy). Variant and size are
 * read from the parent group (mirrors the React `ToggleGroupContext`), so the
 * item's own `variant`/`size` inputs only apply if it is used outside a group.
 *
 * Usage:
 *   <button uiToggleGroupItem value="bold" aria-label="Bold">
 *     <svg aria-hidden="true">…</svg>
 *   </button>
 *
 * Inputs forwarded from the radix host directive:
 * - `value` — `string`, REQUIRED; the value this item contributes to the group.
 * - `disabled`.
 *
 * Accessibility: icon-only items MUST carry an `aria-label`. Selection is
 * conveyed by the filled `data-state=on` background plus `aria-pressed`, so it
 * never relies on colour alone.
 */
@Component({
  selector: 'button[uiToggleGroupItem]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxToggleGroupItemDirective,
      inputs: ['value', 'disabled'],
    },
  ],
  host: {
    'data-slot': 'toggle-group-item',
    '[attr.data-variant]': 'resolvedVariant()',
    '[attr.data-size]': 'resolvedSize()',
    '[attr.data-spacing]': 'group?.spacing()',
    '[class]': 'classes()',
  },
  template: '<ng-content />',
})
export class ToggleGroupItemComponent {
  readonly variant = input<ToggleVariant>('default');
  readonly size = input<ToggleSize>('default');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  /** Parent group — the source of truth for variant/size/spacing (React context). */
  protected readonly group = inject(ToggleGroupComponent, { optional: true });

  protected readonly resolvedVariant = computed<ToggleVariant>(
    () => this.group?.variant() ?? this.variant(),
  );
  protected readonly resolvedSize = computed<ToggleSize>(
    () => this.group?.size() ?? this.size(),
  );

  protected readonly classes = computed(() =>
    cn(
      TOGGLE_GROUP_ITEM_CLASS,
      toggleVariants({ variant: this.resolvedVariant(), size: this.resolvedSize() }),
      this.className(),
    ),
  );
}
