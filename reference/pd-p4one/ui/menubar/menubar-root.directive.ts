import { computed, Directive, input } from '@angular/core';
import { RdxMenuBarRootDirective } from '@radix-ng/primitives/menubar';

import { cn } from '@/app/lib/utils';

/**
 * Bar class — corrected against Figma (`Menubar`, node 216:1522) rather than
 * kept verbatim from the `@force-ui/menubar` registry string, which doesn't
 * match: Figma specifies `bg-base/background` (missing from the registry
 * string entirely), `rounded-md` (registry: `rounded-lg`), `p-1`/4px
 * (registry: `p-[3px]`), and `gap-1`/4px (registry: `gap-0.5`/2px). `h-8` is
 * kept explicit (not in Figma, which doesn't set an explicit height) because
 * it equals Figma's own computed height (`p-1` 4px + trigger `py-[2px]`×2 +
 * `text-sm` 20px line-height = 32px = `h-8`), so keeping it guards a
 * consistent bar height for icon-only or empty-label triggers. `border-border`
 * (registry ships a bare `border`; this app has no global
 * `* { border-color: var(--border) }`, so an unqualified `border` resolves to
 * `currentColor` — skill §8, same fix as `card`'s footer border-t) — the
 * border COLOR matches Figma's `base/border`.
 */
const MENUBAR_ROOT_CLASS = 'flex h-8 items-center gap-1 rounded-md border border-border bg-background p-1';

export { MENUBAR_ROOT_CLASS };

/**
 * Angular port of @force-ui/menubar's `Menubar` — the horizontal bar that
 * hosts one trigger per top-level menu (File, Edit, View, ...).
 *
 * `RdxMenuBarRootDirective` (host directive, built on CDK `CdkMenuBar`)
 * supplies `tabindex="0"` and `data-orientation="horizontal"`, and gives the
 * bar's `[rdxMenubarTrigger]` children roving-tabindex left/right arrow-key
 * navigation (WAI-ARIA menubar pattern) — this is the piece dropdown-menu and
 * context-menu don't need, since they have only ever one trigger per instance.
 *
 * Unlike the sibling menu family, there is no separate root/portal parity gap
 * to document here — the bar genuinely IS the root, and it renders inline
 * (no overlay of its own); only each trigger's dropdown panel portals.
 *
 * Usage:
 *   <div rdxMenubar>
 *     <button rdxMenubarTrigger [menuTriggerFor]="fileMenu">File</button>
 *     <ng-template #fileMenu>
 *       <div rdxMenubarContent>
 *         <button rdxMenubarItem (onSelect)="save()">Save</button>
 *       </div>
 *     </ng-template>
 *   </div>
 */
@Directive({
  selector: '[rdxMenubar]',
  standalone: true,
  hostDirectives: [RdxMenuBarRootDirective],
  host: {
    'data-slot': 'menubar',
    '[class]': 'classes()',
  },
})
export class MenubarRootDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() => cn(MENUBAR_ROOT_CLASS, this.className()));
}
