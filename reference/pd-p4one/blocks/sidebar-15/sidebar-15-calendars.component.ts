import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import chevronRightIcon from '@material-symbols/svg-400/rounded/chevron_right.svg?raw';

import { RdxCollapsibleTriggerDirective } from '@radix-ng/primitives/collapsible';

import { Checkbox } from '@/app/ui/checkbox';
import { Collapsible, CollapsibleContent } from '@/app/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/app/ui/sidebar';

export interface CalendarGroupConfig {
  name: string;
  items: string[];
}

// Decorative icon: sr-only labels/text already carry the accessible name.
const deco = (svg: string) => svg.replace('<svg', '<svg aria-hidden="true" focusable="false"');

/**
 * `sidebar-15`'s "Calendars" list — split out of the main block component
 * because it's the one genuinely substantial sub-piece (per the port skill's
 * judgment call): a collapsible group per calendar category, each containing
 * a list of individually-toggleable calendar rows.
 *
 * Registry deviation (real, not cosmetic): the upstream `Calendars()` marks
 * the first two items per group `data-active={index < 2}` and NEVER WIRES A
 * CLICK HANDLER — it's static decoration with no way to actually toggle a
 * calendar on/off, which would fail as a real control. This port makes each
 * row a genuine toggle, seeded from the same `index < 2` default the registry
 * uses, so the visual is unchanged but the control is now real.
 *
 * Second deviation: the upstream color-swatch square is hand-rolled markup
 * (a `<div>` with conditional border/bg classes) rather than the registry's
 * own real `Checkbox` component — reproducing that hand-rolled div here
 * duplicated `ui/checkbox`'s exact visual spec (16px, `rounded-[4px]`, check
 * glyph) via ad-hoc classes and got the icon's centering wrong (no
 * `grid place-content-center`, unlike the primitive's own indicator). Swapped
 * to the real `button[uiCheckbox]` wrapped in a `<label>` (the established
 * card-composition pattern from `ui/checkbox`'s own `BoxCard` story) — a
 * `<button>` is a labelable element, so clicking the row text also toggles
 * the checkbox, and the primitive's own audited styling/a11y (real
 * `aria-checked`, focus ring, icon centering) comes for free instead of
 * being re-derived.
 *
 * Collapsible pattern reused from `sidebar-05`/`sidebar-11`: `data-state`
 * lives on the trigger element itself, so the trigger carries its own
 * `group/cal-toggle` marker and the chevron reads
 * `group-data-[state=open]/cal-toggle:rotate-90` — no separate open-tracking
 * boolean needed.
 *
 * The trigger button applies `uiSidebarGroupLabel` (a `@Component`, for the
 * label styling) together with the RAW `[rdxCollapsibleTrigger]` directive
 * from `@radix-ng/primitives/collapsible` — NOT `ui/collapsible`'s own
 * `CollapsibleTrigger` wrapper, which is also a `@Component`. Angular allows
 * only one Component per host element, so two `@Component`-decorated
 * attribute selectors can't both match the same button; the raw directive has
 * no template and composes freely. Behaviourally identical either way (the
 * wrapper is a thin `hostDirectives: [RdxCollapsibleTriggerDirective]` pass-
 * through with no base classes of its own), and it still finds the
 * surrounding `<div uiCollapsible>`'s root context via DI (injector-tree
 * lookup, not component-identity based) — matches the registry's
 * `SidebarGroupLabel asChild` wrapping a `CollapsibleTrigger`.
 */
@Component({
  selector: 'app-block-sidebar-15-calendars',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    Checkbox,
    Collapsible,
    CollapsibleContent,
    RdxCollapsibleTriggerDirective,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
  ],
  template: `
    <div uiSidebarGroup *ngFor="let group of calendars(); let gi = index">
      <div uiCollapsible [open]="gi === 0" class="contents">
        <button
          uiSidebarGroupLabel
          rdxCollapsibleTrigger
          [id]="'sidebar-15-cal-group-' + gi + '-label'"
          class="group/cal-toggle w-full text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <span>{{ group.name }}</span>
          <span
            class="ml-auto transition-transform motion-reduce:transition-none group-data-[state=open]/cal-toggle:rotate-90 [&_svg]:size-4 [&_svg]:fill-current"
            [innerHTML]="chevronRight"
          ></span>
        </button>
        <div
          uiCollapsibleContent
          class="overflow-hidden data-open:animate-collapsible-down data-closed:animate-collapsible-up motion-reduce:animate-none"
        >
          <div uiSidebarGroupContent>
            <ul uiSidebarMenu [attr.aria-labelledby]="'sidebar-15-cal-group-' + gi + '-label'">
              <li uiSidebarMenuItem *ngFor="let item of group.items; let ii = index">
                <label
                  [for]="'sidebar-15-cal-' + gi + '-' + ii"
                  class="flex w-full cursor-pointer items-center gap-2 overflow-hidden rounded-md p-2 text-sm text-sidebar-foreground select-none hover:bg-sidebar-accent hover:text-sidebar-accent-foreground has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-sidebar-ring"
                >
                  <button
                    uiCheckbox
                    [id]="'sidebar-15-cal-' + gi + '-' + ii"
                    [checked]="isActive(gi, ii)"
                    (checkedChange)="toggle(gi, ii)"
                  ></button>
                  <span>{{ item }}</span>
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div uiSidebarSeparator class="mx-0"></div>
    </div>
  `,
})
export class Sidebar15CalendarsComponent {
  readonly calendars = input.required<CalendarGroupConfig[]>();

  private readonly sanitizer = inject(DomSanitizer);
  protected readonly chevronRight: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(chevronRightIcon));

  /** Per-row toggle state, keyed `${groupIndex}-${itemIndex}`. Absent = default (first two rows per group start active, matching the registry's static `index < 2`). */
  private readonly overrides = signal<Record<string, boolean>>({});

  protected isActive(groupIndex: number, itemIndex: number): boolean {
    const key = `${groupIndex}-${itemIndex}`;
    const state = this.overrides();
    return key in state ? state[key] : itemIndex < 2;
  }

  protected toggle(groupIndex: number, itemIndex: number): void {
    const key = `${groupIndex}-${itemIndex}`;
    this.overrides.update((state) => ({ ...state, [key]: !this.isActive(groupIndex, itemIndex) }));
  }
}
