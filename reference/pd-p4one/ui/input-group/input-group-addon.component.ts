import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

import {
  inputGroupAddonVariants,
  type InputGroupAddonAlign,
} from './input-group-addon.variants';

/**
 * `[uiInputGroupAddon]` — a slot inside `[uiInputGroup]` for icons, buttons,
 * text, or kbd. `align` positions it (inline-start/end = left/right of the
 * field; block-start/end = stacked above/below). Clicking the addon focuses
 * the group's input (unless the click landed on a button), so the whole
 * affordance behaves like one field.
 *
 * Icon convention: the ADDON cva sizes its direct-child icons to `size-4`
 * (16px, matching the Figma design). An icon is an inline Material Symbols
 * `<svg>` (imported from `@material-symbols/svg-400/rounded/<name>.svg?raw` —
 * code uses Google Material Symbols, mapped by meaning to Figma's Lucide set).
 * Consumers do NOT size icons per-element — drop the `<svg>` in and the addon
 * handles it. `[&>svg]:fill-current` makes the glyph inherit the addon's
 * `text-muted-foreground` colour (the Material Symbols SVGs carry no `fill`
 * attribute; same tone as a ghost `[uiInputGroupButton]` like "Show"); status
 * icons add `text-destructive`. Decorative
 * icons get `aria-hidden`. A block addon needs NO divider by default (cleaner,
 * matches Figma); if a consumer adds one it must be `border-border` (bare
 * `border-t`/`border-b` resolves to currentColor in this app).
 *
 * a11y deviation from the registry: the registry puts `role="group"` on every
 * addon; we drop it — an addon is a presentational slot, not a named set of
 * controls, and nested unnamed groups are screen-reader noise. The outer
 * `[uiInputGroup]` keeps `role="group"`. Click-to-focus targets the inner
 * input OR textarea (pointer-only convenience; keyboard users tab straight in).
 */
@Component({
  selector: '[uiInputGroupAddon]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'input-group-addon',
    '[attr.data-align]': 'align()',
    '[class]': 'classes()',
    '(click)': 'onClick($event)',
  },
})
export class InputGroupAddonComponent {
  private readonly el = inject(ElementRef<HTMLElement>);

  readonly align = input<InputGroupAddonAlign>('inline-start');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(inputGroupAddonVariants({ align: this.align() }), this.className()),
  );

  protected onClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).closest('button')) {
      return;
    }
    const host = this.el.nativeElement as HTMLElement;
    const control = host.parentElement?.querySelector<HTMLElement>('input, textarea');
    control?.focus();
  }
}
