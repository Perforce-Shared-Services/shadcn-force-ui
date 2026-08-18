import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RdxTabsTriggerDirective } from '@radix-ng/primitives/tabs';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/tabs (radix-force-ui style) — trigger.
 *
 * The React source renders `TabsPrimitive.Trigger` as a `<button>`; the host
 * element here is that button (write `<button uiTabsTrigger value="…">`).
 * `RdxTabsTriggerDirective` wires the required `value`, optional `disabled`,
 * selection on click/Enter/Space, roving focus, and the `role=tab` /
 * `aria-selected` / `data-state` / `data-orientation` attributes the class
 * string keys off. Class string copied verbatim from the registry JSON.
 */
@Component({
  selector: '[uiTabsTrigger]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxTabsTriggerDirective,
      inputs: ['value', 'disabled'],
    },
  ],
  host: {
    'data-slot': 'tabs-trigger',
    '[class]': 'classes()',
  },
})
export class TabsTriggerComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      "relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:fill-current",
      'group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent',
      'data-active:bg-background data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground',
      // DELIBERATE DS DIVERGENCE (maintainer 2026-06-11, synced to Figma): the
      // line-variant active underline is `after:bg-primary` (brand indigo), not
      // the registry/Figma `after:bg-foreground` (neutral). Ties the active
      // signal to the brand colour. The `after` underline is only visible in the
      // line variant (default variant keeps after:opacity-0), so this changes
      // only the line indicator. Token-only (`--primary`); Figma line-active
      // underline rebound to base/primary to match.
      'after:absolute after:bg-primary after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100 motion-reduce:transition-none motion-reduce:after:transition-none',
      this.className(),
    ),
  );
}
