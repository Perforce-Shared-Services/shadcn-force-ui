import { booleanAttribute, ChangeDetectionStrategy, Component, computed, Directive, inject, input, output } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import {
  RdxMenuItemCheckboxDirective,
  RdxMenuItemIndicatorDirective,
  RdxMenuItemRadioDirective,
} from '@radix-ng/primitives/menu';
import { RdxMenubarRadioGroupDirective } from '@radix-ng/primitives/menubar';

import { cn } from '@/app/lib/utils';
import { MENUBAR_INDICATOR_SVG } from './menubar.icons';

/**
 * Checkbox / radio item class — LEFT-aligned indicator gutter (`pl-7 pr-1.5`
 * + `left-1.5` indicator span below), matching Figma (`Menubar / Item`, node
 * 419:6748, level-2 Checkbox/Radio variants: `pl-7`/`pl-8` gutter, icon at
 * `left-6px`) and the raw `@force-ui/menubar` registry (`pr-1.5 pl-7`,
 * indicator `left-1.5`) exactly.
 *
 * Maintainer correction (2026-07-01): the sibling dropdown-menu/context-menu
 * components ship a RIGHT-aligned indicator instead (`pr-8`/`right-2`), and
 * this component briefly matched them "for menu-family cohesion" — reverted
 * per maintainer decision; left-aligned is correct for menubar regardless of
 * what the siblings do. The dropdown-menu/context-menu right-vs-left
 * divergence from Figma is unaffected by this and still open (tracked in the
 * `.claude/figma-component-map.json` manifest) — this only decides menubar.
 *
 * Plus the standard subtle `transition-colors motion-reduce:transition-none`
 * token-fast (150ms) state fade (WCAG 2.3.3), and `[&_svg]:fill-current` for
 * the Material Symbols icon system (skill §9) — same documented deviations as
 * the sibling ports. CDK Menu items take real DOM focus, so `focus:` classes
 * paint for keyboard + pointer with no `data-highlighted` remap.
 */
const MENUBAR_SELECTABLE_ITEM_CLASS =
  "relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pl-7 pr-1.5 text-sm outline-hidden select-none transition-colors motion-reduce:transition-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:fill-current [&_svg:not([class*='size-'])]:size-4";

export { MENUBAR_SELECTABLE_ITEM_CLASS };

const INDICATOR_TEMPLATE = `
    <span
      class="pointer-events-none absolute left-1.5 flex items-center justify-center"
      data-slot="menubar-item-indicator"
      aria-hidden="true"
    >
      <span
        RdxMenuItemIndicator
        class="flex items-center justify-center [&>svg]:size-4 [&>svg]:fill-current"
        [innerHTML]="indicatorIcon"
      ></span>
    </span>
    <ng-content />
  `;

/**
 * Angular port of @force-ui/menubar's `MenubarCheckboxItem`.
 *
 * Unlike the sibling dropdown-menu/context-menu ports, this is built directly
 * against the GENERIC `@radix-ng/primitives/menu` `RdxMenuItemCheckboxDirective`
 * rather than `@radix-ng/primitives/menubar`'s own `RdxMenubarItemCheckboxDirective`.
 * That menubar-package wrapper only re-exposes `checked`/`disabled` — it drops
 * the underlying `onCheckedChange` output entirely (confirmed in the compiled
 * `ɵdir` metadata: no `outputs` key), which would make the item permanently
 * uncontrollable. Documented radix-ng 0.50 upstream gap, not patched upstream
 * — worked around here by composing the generic directive the same way the
 * menubar package itself does internally.
 *
 * SECOND upstream gap, found live in Storybook (not from reading code): the
 * generic directive's `onCheckedChange` is `outputFromObservable(this.
 * cdkMenuItemCheckbox.triggered)` — it forwards CDK's bare "triggered" signal
 * VERBATIM, which carries NO payload (`void`), not the new checked value the
 * name implies. Bound naively as `(checkedChange)="showGrid = $event"`,
 * every click sets `showGrid` to `undefined` (falsy) regardless of direction
 * — turning an item off "works" only by coincidence (undefined is falsy,
 * matching the off state), and turning it back on is permanently impossible
 * (undefined → undefined, no visible change). Compare the sibling `dropdown-
 * menu` package's OWN `RdxDropdownMenuItemCheckboxDirective`, a completely
 * different (older, non-CDK-signal) implementation that genuinely does
 * `this.checked = !this.checked; this.checkedChange.emit(this.checked)` —
 * that one is correct, so the sibling ports' checkbox stories were never
 * exposed to this bug. Not patchable in radix-ng itself, so worked around
 * here: the broken `onCheckedChange` is NOT re-exposed as this component's
 * public output at all (dropped from `hostDirectives.outputs` below); instead
 * this component defines its OWN `checkedChange` output and subscribes to the
 * host directive's `onCheckedChange` purely as a "the user activated this
 * item" signal, computing and emitting the correct toggled boolean itself
 * (`!checked()`) rather than trusting the (missing) event payload.
 *
 * `role="menuitemcheckbox"` / `aria-checked` / `data-state` come from the
 * generic directive. The check indicator is the registry's `ItemIndicator`: a
 * raw inline Material Symbols `<svg>` (swap-point in `menubar.icons.ts`)
 * injected via `[innerHTML]`, kept a direct-child `<svg>` and coloured by
 * `fill-current`. Its host attribute is `RdxMenuItemIndicator` (PascalCase —
 * the generic `menu` package's real selector, unlike the sibling packages'
 * camelCase `rdx*ItemIndicator`; verified against the compiled `ɵdir`
 * metadata, not just the `.d.ts`). It shows only when checked (`display`
 * toggle); selection is also conveyed by `aria-checked`, so it never relies
 * on the glyph alone.
 *
 * A checkbox item keeps the menu open across toggles (multi-select), per spec.
 *
 * Usage: `<button rdxMenubarCheckboxItem [checked]="showGrid" (checkedChange)="showGrid = $event">Show grid</button>`
 */
@Component({
  selector: 'button[rdxMenubarCheckboxItem]',
  standalone: true,
  imports: [RdxMenuItemIndicatorDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxMenuItemCheckboxDirective,
      inputs: ['checked', 'disabled'],
    },
  ],
  host: {
    'data-slot': 'menubar-checkbox-item',
    '[attr.data-inset]': 'inset() ? "" : null',
    '[class]': 'classes()',
  },
  template: INDICATOR_TEMPLATE,
})
export class MenubarCheckboxItemComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  readonly inset = input(false, { transform: booleanAttribute });
  /** Fires the actual toggled value — see the class doc comment for why the
   * host directive's own `onCheckedChange` can't be trusted/re-exposed directly. */
  readonly checkedChange = output<boolean>();
  /** Sanitizer-trusted inline check SVG (bundled, static — bypass is safe + required). */
  protected readonly indicatorIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    MENUBAR_INDICATOR_SVG,
  );
  /** `checked` stays exposed via `hostDirectives.inputs` (below) — read here
   * only to compute the toggled value, never re-declared as our own input. */
  private readonly hostCheckbox = inject(RdxMenuItemCheckboxDirective, { self: true });

  constructor() {
    this.hostCheckbox.onCheckedChange.subscribe(() =>
      this.checkedChange.emit(!this.hostCheckbox.checked()),
    );
  }
  protected readonly classes = computed(() => cn(MENUBAR_SELECTABLE_ITEM_CLASS, this.className()));
}

/**
 * Angular port of `MenubarRadioGroup` — groups a set of radio items under
 * `role="group"` (via CDK `CdkMenuGroup`, applied through the menubar
 * package's `RdxMenubarRadioGroupDirective`).
 *
 * Documented parity gap vs the sibling dropdown-menu/context-menu ports:
 * those families ship a DEDICATED radio-group directive with `value` /
 * `(valueChange)` that coordinates children through a
 * `UniqueSelectionDispatcher`. `@radix-ng/primitives/menubar` (and the generic
 * `menu` package it builds on) ships no such abstraction for the radio group
 * itself — it's bare `CdkMenuGroup` semantics only, confirmed in the compiled
 * `ɵdir` metadata (no inputs/outputs). Consumers must track the selected
 * value themselves: bind `[checked]` per `[rdxMenubarRadioItem]` against their
 * own state and update it from each item's own `(onValueChange)` (see below).
 * Not patched here — same documented-not-patched precedent as the slider
 * port's upstream gaps.
 */
@Directive({
  selector: '[rdxMenubarRadioGroup]',
  standalone: true,
  hostDirectives: [RdxMenubarRadioGroupDirective],
  host: {
    'data-slot': 'menubar-radio-group',
  },
})
export class MenubarRadioGroupDirective {}

/**
 * Angular port of `MenubarRadioItem`. Built directly against the GENERIC
 * `@radix-ng/primitives/menu` `RdxMenuItemRadioDirective` for the same reason
 * as the checkbox item above — the menubar package's own
 * `RdxMenubarItemRadioDirective` wrapper drops the `onValueChange` output.
 *
 * `role="menuitemradio"` / `aria-checked` / `data-state` come from the
 * generic directive. Because `[rdxMenubarRadioGroup]` provides no aggregate
 * value (see above), `(onValueChange)` is exposed per-item here — fires when
 * THIS item is selected — instead of the sibling ports' group-level
 * `(valueChange)`. The consumer sets this item's own `[checked]` in response.
 * Same check indicator as the checkbox item. MUST sit inside a
 * `[rdxMenubarRadioGroup]`.
 *
 * Usage:
 *   <button rdxMenubarRadioItem [checked]="zoom === '100'" (onValueChange)="zoom = '100'">100%</button>
 */
@Component({
  selector: 'button[rdxMenubarRadioItem]',
  standalone: true,
  imports: [RdxMenuItemIndicatorDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxMenuItemRadioDirective,
      inputs: ['checked', 'disabled'],
      outputs: ['onValueChange'],
    },
  ],
  host: {
    'data-slot': 'menubar-radio-item',
    '[attr.data-inset]': 'inset() ? "" : null',
    '[class]': 'classes()',
  },
  template: INDICATOR_TEMPLATE,
})
export class MenubarRadioItemComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  readonly inset = input(false, { transform: booleanAttribute });
  /** Sanitizer-trusted inline check SVG (bundled, static — bypass is safe + required). */
  protected readonly indicatorIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    MENUBAR_INDICATOR_SVG,
  );
  protected readonly classes = computed(() => cn(MENUBAR_SELECTABLE_ITEM_CLASS, this.className()));
}
