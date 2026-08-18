import { computed, Directive, input } from '@angular/core';
import { RdxMenuBarTriggerDirective } from '@radix-ng/primitives/menubar';

import { cn } from '@/app/lib/utils';

/**
 * Trigger class — the `@force-ui/menubar` registry item's `hover:bg-muted
 * aria-expanded:bg-muted` was first corrected to `bg-accent` to match Figma
 * (`Menubar / Trigger/Yes/Top`, node 301:3825: `bg-base/accent` +
 * `text-base/accent-foreground`), then reverted back to `bg-muted` after the
 * audit found `--accent` and `--background` are the IDENTICAL colour in dark
 * mode (`rgb(38 38 46)` both) — a Figma-vs-tokens mismatch, not a mistake in
 * reading Figma. Painting the trigger's own hover/open fill in `accent` made
 * it invisible against the bar (`bg-background`) in dark mode: a 1.0:1 WCAG
 * 1.4.11 non-text-contrast failure, since that fill is the ONLY signal of
 * open/hover state. `--muted` is a real, already-approved Force UI token that
 * IS distinct from `--background` in both themes, and is exactly what the
 * sibling `toggle` component already uses for the identical problem
 * (`hover:bg-muted`, `data-[state=on]:bg-muted` on `toggle.variants.ts`,
 * itself an already-shipped/audited component sitting on plain background) —
 * followed here for established precedent rather than inventing a new token
 * pairing. `text-accent-foreground` is kept (matches Figma's named token
 * exactly) since `--accent-foreground` and `--foreground` are identical
 * values in both themes, so there's no functional tradeoff in keeping the
 * Figma-cited name.
 *
 * `focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50`
 * added per audit finding — the trigger had `outline-hidden` (suppresses the
 * default focus outline) with NO replacement, so a keyboard user tabbing
 * between closed triggers got no focus signal at all (WCAG 2.4.7). Copied
 * verbatim from the sibling `toggle` component's own focus-visible treatment
 * (`toggle.variants.ts`) — same "small pill-shaped, borderless, sits on plain
 * background" shape as this trigger, already audited.
 *
 * Plus the standard subtle `transition-colors motion-reduce:transition-none`
 * token-fast (150ms) state fade, reduced-motion guarded (WCAG 2.3.3). Unlike
 * the sibling dropdown-menu/context-menu triggers (unstyled — they compose
 * with a separate `[uiButton]`), a menubar trigger IS its own lightweight
 * text label and always carries this class directly, so it needs the
 * transition (and now the focus-visible ring) added here rather than
 * inheriting them from a composed button.
 */
const MENUBAR_TRIGGER_CLASS =
  'flex items-center rounded-sm px-1.5 py-[2px] text-sm font-medium outline-hidden select-none transition-colors motion-reduce:transition-none hover:bg-muted hover:text-accent-foreground aria-expanded:bg-muted aria-expanded:text-accent-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50';

export { MENUBAR_TRIGGER_CLASS };

/**
 * Angular port of @force-ui/menubar's `MenubarTrigger`.
 *
 * `RdxMenuBarTriggerDirective` (host directive, wrapping the generic
 * `@radix-ng/primitives/menu` `RdxMenuTriggerDirective` over CDK `CdkMenuTrigger`)
 * gives it `role="menuitem"`, `aria-haspopup="menu"`, `aria-expanded`, and
 * `data-state=open|closed`; MUST sit inside a `[rdxMenubar]`, which arbitrates
 * roving focus and single-open-at-a-time between sibling triggers.
 *
 * Usage difference from dropdown-menu/context-menu: those triggers take the
 * panel `TemplateRef` through the SAME attribute that also serves as the
 * selector (`[rdxDropdownMenuTrigger]="menu"`). radix-ng's menubar trigger
 * splits this into two: apply `rdxMenubarTrigger` to select the directive, and
 * pass the panel separately via `[menuTriggerFor]`.
 *
 * Usage: `<button rdxMenubarTrigger [menuTriggerFor]="fileMenu">File</button>`
 */
@Directive({
  selector: '[rdxMenubarTrigger]',
  standalone: true,
  hostDirectives: [
    {
      directive: RdxMenuBarTriggerDirective,
      inputs: ['menuTriggerFor', 'disabled', 'side', 'align', 'sideOffset', 'alignOffset'],
    },
  ],
  host: {
    'data-slot': 'menubar-trigger',
    '[class]': 'classes()',
  },
})
export class MenubarTriggerDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() => cn(MENUBAR_TRIGGER_CLASS, this.className()));
}
