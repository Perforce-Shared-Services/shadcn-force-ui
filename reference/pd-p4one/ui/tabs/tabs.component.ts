import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RdxTabsRootDirective } from '@radix-ng/primitives/tabs';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/tabs (radix-force-ui style) — root.
 *
 * Attribute selector — usage:
 *   <div uiTabs defaultValue="account">
 *     <div uiTabsList>
 *       <button uiTabsTrigger value="account">Account</button>
 *       <button uiTabsTrigger value="password">Password</button>
 *     </div>
 *     <div uiTabsContent value="account">…</div>
 *     <div uiTabsContent value="password">…</div>
 *   </div>
 *
 * Behaviour (selection, roving-focus keyboard nav, automatic/manual activation,
 * aria wiring) comes from `@radix-ng/primitives` — the cross-framework analogue
 * of radix-ui that the React source builds on. Class strings are copied verbatim
 * from the published registry JSON; parity with the registry is the contract.
 *
 * PARITY: the registry drives layout off `data-horizontal:` / `data-vertical:`
 * and active styling off `data-active:`. radix-ng emits `data-orientation` (root,
 * list, trigger, content) and `data-state="active|inactive"` (trigger, content).
 * Both already resolve through the matching `@custom-variant` definitions in
 * `tailwind.css` (`data-horizontal`/`data-vertical` → `[data-orientation=…]`;
 * `data-active` → `[data-state="active"]`), so no bridge attribute is needed.
 */
@Component({
  selector: '[uiTabs]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxTabsRootDirective,
      inputs: ['value', 'defaultValue', 'activationMode', 'orientation', 'dir'],
      outputs: ['valueChange', 'onValueChange'],
    },
  ],
  host: {
    'data-slot': 'tabs',
    '[class]': 'classes()',
  },
})
export class TabsComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  constructor() {
    // radix-ng BUG WORKAROUND (WCAG 4.1.2 / aria-valid-attr-value): the upstream
    // `RdxTabsRootDirective.getBaseId()` returns `tabs-${Math.random()}` and is
    // NOT memoized — it is called separately by every trigger/content computed
    // (triggerId, contentId, aria-controls), so each gets a DIFFERENT random
    // base and a trigger's `aria-controls` points at an id no panel actually
    // has, breaking the tab↔panel association for screen readers (axe flags it
    // critical). Memoize the first value on this instance so all ids share one
    // stable base. The parent constructs before the children's computeds are
    // first read, so the patch is in place before any id is generated.
    const root = inject(RdxTabsRootDirective);
    const stableBaseId = root.getBaseId();
    root.getBaseId = () => stableBaseId;
  }

  protected readonly classes = computed(() =>
    cn('group/tabs flex gap-2 data-horizontal:flex-col', this.className()),
  );
}
