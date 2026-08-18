import { ChangeDetectionStrategy, Component, Directive, computed, inject, input } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import { RdxSelectTriggerDirective } from '@radix-ng/primitives/select';

import { cn } from '@/app/lib/utils';
import { SELECT_TRIGGER_ICON_SVG } from './select.icons';

/**
 * Angular port of @force-ui/select's `SelectValue` — the styling layer.
 *
 * radix-ng's `RdxSelectValueDirective` is a *component* that renders the selected
 * label / placeholder, and the trigger reads it through a
 * `contentChild.required(RdxSelectValueDirective)` query. A query only sees the
 * trigger's CONTENT — NOT the view of a child component — so the value can't be
 * hidden inside a wrapper component's template (doing so left the query empty and
 * threw NG0951). Instead the raw `RdxSelectValueDirective` is re-exported as
 * `SelectValue` and used directly; this `[rdxSelectValue]` directive co-applies on
 * the same element to stamp the registry's `data-slot="select-value"` (so the
 * trigger's `*:data-[slot=select-value]` layout rules target it) and the
 * `pointer-events-none` it shipped with. Mirrors `SelectRootDirective`.
 *
 * Usage: `<span rdxSelectValue placeholder="Select a theme"></span>`
 *   (import both `SelectValue` and `SelectValueDirective`).
 */
@Directive({
  selector: '[rdxSelectValue]',
  standalone: true,
  host: {
    'data-slot': 'select-value',
    class: 'pointer-events-none',
  },
})
export class SelectValueDirective {}

/**
 * Base trigger class string — from the @force-ui/select registry item
 * (radix-force-ui style), with the maintainer-approved BORDER TIER that aligns
 * the trigger with the Input component (2026-06-10): resting `border-border`
 * (light neutral) -> `hover:border-input` (stronger neutral) -> focus
 * `border-ring` (indigo). The registry shipped a flat resting `border-input`; the
 * tiered border matches Input's outline variant and gives the trigger a real
 * hover state (closes the audit's missing-hover finding). Both are explicit border
 * colours, so the bare-`border` currentColor gotcha does not apply. (Dropped the
 * registry's `dark:hover:bg-input/50` so hover = border reinforcement only, like
 * Input.) The `role="combobox"`, `type="button"`, `aria-expanded`, `disabled`,
 * `data-state` and `data-placeholder` attributes are supplied by radix-ng's
 * `RdxSelectTriggerDirective` (host directive) — only `data-slot` and `data-size`
 * (the size axis the registry drives off `data-[size=...]`) are added here.
 */
const SELECT_TRIGGER_CLASS =
  "group/select-trigger flex w-fit items-center justify-between gap-1.5 rounded-lg border border-border hover:border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 motion-reduce:transition-none";

export { SELECT_TRIGGER_CLASS };

/**
 * Angular port of @force-ui/select's `SelectTrigger`.
 *
 * Attribute selector on a native `<button>` — radix-ng's `RdxSelectTriggerDirective`
 * (host directive) makes it the accessible combobox trigger (opens the panel,
 * observes its own size to drive the overlay width, projects the chosen value).
 * MUST contain a `[rdxSelectValue]`. The down chevron is the registry's
 * `SelectPrimitive.Icon`: a raw inline Material Symbols `<svg>` (swap-point in
 * `select.icons.ts`) injected via `[innerHTML]`, kept a direct-child of its
 * span and coloured `text-muted-foreground` + `[&>svg]:fill-current` (the
 * Material Symbols SVGs carry no `fill` attribute). `aria-hidden` — decorative.
 * Post-audit enhancement: the chevron rotates 180deg while the panel is open
 * (`group-data-[state=open]/select-trigger:rotate-180`, off radix-ng's
 * `data-state` on the trigger), giving the trigger an open-state status signal
 * the registry lacked (spec: "chevron rotates 180 degrees" when open). Motion
 * only, `motion-reduce`-guarded; code-only (Figma models it as a static up
 * chevron, no delta — like the accordion).
 *
 * The `size` input (`'default' | 'sm'`) drives the registry's `data-[size=...]`
 * height axis via `data-size`, defaulted to `'default'` to match the registry.
 */
@Component({
  // Selector is the native `[rdxSelectTrigger]` — the radix-ng root projects via
  // `<ng-content select="[rdxSelectTrigger]">`, and `ng-content [select]` matches
  // the element's LITERAL template attribute, not host-added ones, so the part
  // must wear the radix attribute itself. This styled component applies the
  // Force UI classes + chevron and brings the behaviour via `hostDirectives`;
  // the raw `RdxSelectTriggerDirective` is never imported by consumers, so there
  // is no double instance. (See SelectRootDirective for why the select family
  // keeps radix's `rdxSelect*` names instead of the usual `ui*`.)
  selector: 'button[rdxSelectTrigger]',
  standalone: true,
  imports: [RdxSelectTriggerDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [RdxSelectTriggerDirective],
  host: {
    'data-slot': 'select-trigger',
    '[attr.data-size]': 'size()',
    '[class]': 'classes()',
  },
  template: `
    <ng-content />
    <span
      data-slot="select-icon"
      aria-hidden="true"
      class="pointer-events-none flex shrink-0 items-center justify-center text-muted-foreground transition-transform motion-reduce:transition-none group-data-[state=open]/select-trigger:rotate-180 [&>svg]:size-4 [&>svg]:fill-current"
      [innerHTML]="triggerIcon"
    ></span>
  `,
})
export class SelectTriggerComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  readonly size = input<'default' | 'sm'>('default');

  /**
   * Sanitizer-trusted inline SVG chevron — bundled from `@material-symbols/svg-400`
   * at build time (static + trusted), so bypassing the sanitizer is safe and
   * necessary (Angular strips `<svg>` from a raw `[innerHTML]` string).
   */
  protected readonly triggerIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    SELECT_TRIGGER_ICON_SVG,
  );

  protected readonly classes = computed(() => cn(SELECT_TRIGGER_CLASS, this.className()));
}
