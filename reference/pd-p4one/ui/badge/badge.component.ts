import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

import { badgeVariants, type BadgeVariant } from './badge.variants';

/**
 * Angular port of @force-ui/badge (radix-force-ui style).
 *
 * Attribute selector — usage:
 *   <span uiBadge>Default</span>
 *   <span uiBadge variant="destructive">Error</span>
 *   <a uiBadge variant="link" href="...">Link badge</a>
 *   <span uiBadge variant="success" srLabel="Synced:">42</span>
 *
 * Using an attribute selector is Angular's idiomatic answer to React's
 * `asChild` / Radix `Slot`: the host element keeps its native semantics
 * (span, a, etc.) and the component just decorates it with the
 * variant-derived classes plus the data-* attributes that downstream theming
 * and tests rely on for parity with the React/Vue/Svelte siblings.
 *
 * Icons (registry parity — children-based, no icon input): project an inline
 * Material Symbols `<svg>` as content and tag it `data-icon="inline-start"`
 * (leading) or `data-icon="inline-end"` (trailing); the cva adds the matching
 * side padding and sizes the svg to 14px in `currentColor`. Import the glyph
 * from `@material-symbols/svg-400/rounded/<name>.svg?raw` and render it inline
 * (a `[innerHTML]` bound to a sanitizer-trusted string, or a literal `<svg>`).
 * Mark decorative icons `aria-hidden="true"`; for a meaningful icon-only badge
 * use `srLabel`.
 *   <span uiBadge variant="success">
 *     <svg data-icon="inline-start" aria-hidden="true" ...></svg> Synced
 *   </span>
 *
 * `srLabel` (a11y, /audit-component 2026-06-07): the badge's status is carried
 * only by colour, which a screen reader can't perceive. For count- or glyph-only
 * badges (e.g. `42`, an icon), pass `srLabel` to prepend a visually-hidden
 * prefix so the status is announced ("Synced: 42"). Omit it when the projected
 * text already conveys the meaning.
 */
@Component({
  selector: '[uiBadge]',
  standalone: true,
  template:
    '@if (srLabel()) {<span class="sr-only">{{ srLabel() }} </span>}<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'badge',
    '[attr.data-variant]': 'variant()',
    '[class]': 'classes()',
  },
})
export class BadgeComponent {
  readonly variant = input<BadgeVariant>('default');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  /** Visually-hidden status prefix for screen readers (see class JSDoc). */
  readonly srLabel = input<string | undefined>(undefined);

  protected readonly classes = computed(() =>
    cn(badgeVariants({ variant: this.variant() }), this.className()),
  );
}
