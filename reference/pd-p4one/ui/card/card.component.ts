import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/card (radix-force-ui style).
 *
 * Attribute selectors — each sub-component decorates whatever host element the
 * caller writes with the registry class string plus the `data-slot` attribute
 * that Force UI's selector-based theming and the cross-framework test suites
 * rely on for parity with the React/Vue/Svelte siblings.
 *
 * Usage:
 *   <div uiCard>
 *     <div uiCardHeader>
 *       <div uiCardTitle>Project settings</div>
 *       <div uiCardDescription>Manage how this workspace syncs.</div>
 *       <div uiCardAction><button uiButton size="sm">Edit</button></div>
 *     </div>
 *     <div uiCardContent>…</div>
 *     <div uiCardFooter><button uiButton>Save changes</button></div>
 *   </div>
 *
 * The card is purely presentational — no variant prop, no interactive/focus
 * behavior (matches the registry source). `size` is the only knob; it sets
 * `data-size` on the root and the child slots respond via the
 * `group-data-[size=sm]/card:` selectors baked into their class strings.
 *
 * Accessibility: a non-interactive card is a plain container — no role, no
 * tabindex. Make the title a real heading element for the surrounding
 * hierarchy (e.g. `<h3 uiCardTitle>`); the attribute selector keeps the host
 * tag, so the semantic heading is the caller's choice. When the action slot
 * holds a control whose purpose isn't obvious from its own label, give it an
 * `aria-label` that names the card (e.g. `aria-label="Edit project settings"`)
 * so it reads in context.
 */

/** Card size — drives `data-size` and the child group-data selectors. */
export type CardSize = 'default' | 'sm';

@Component({
  selector: '[uiCard]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'card',
    '[attr.data-size]': 'size()',
    '[class]': 'classes()',
  },
})
export class CardComponent {
  readonly size = input<CardSize>('default');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'group/card flex flex-col gap-4 overflow-hidden rounded-xl bg-card py-4 text-sm text-card-foreground ring-1 ring-foreground/10 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl',
      this.className(),
    ),
  );
}

@Component({
  selector: '[uiCardHeader]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'card-header',
    '[class]': 'classes()',
  },
})
export class CardHeaderComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-4 group-data-[size=sm]/card:px-3 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3',
      this.className(),
    ),
  );
}

@Component({
  selector: '[uiCardTitle]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'card-title',
    '[class]': 'classes()',
  },
})
export class CardTitleComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      // `text-card-foreground` is an app-compat addition to the registry string
      // (like the §8 border-border fix): this app ships a global heading
      // typography (@vex) that colors a bare <h3>/<h4> light, so a semantic
      // heading host (recommended for a11y) would otherwise lose the card's
      // text color. Pinning it to card-foreground keeps the title correct on
      // any host tag — and equals the registry's inherited color anyway.
      'cn-font-heading text-base leading-snug font-medium text-card-foreground group-data-[size=sm]/card:text-sm',
      this.className(),
    ),
  );
}

@Component({
  selector: '[uiCardDescription]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'card-description',
    '[class]': 'classes()',
  },
})
export class CardDescriptionComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn('text-sm text-muted-foreground', this.className()),
  );
}

@Component({
  selector: '[uiCardAction]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'card-action',
    '[class]': 'classes()',
  },
})
export class CardActionComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
      this.className(),
    ),
  );
}

@Component({
  selector: '[uiCardContent]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'card-content',
    '[class]': 'classes()',
  },
})
export class CardContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn('px-4 group-data-[size=sm]/card:px-3', this.className()),
  );
}

@Component({
  selector: '[uiCardFooter]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'card-footer',
    '[class]': 'classes()',
  },
})
export class CardFooterComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    // `border-border` added to the registry's bare `border-t`: this app has no
    // global `* { border-color: var(--border) }`, so under Tailwind v4 a bare
    // border falls back to currentColor (text color). Documented §8 deviation.
    cn(
      'flex items-center rounded-b-xl border-t border-border bg-muted/50 p-4 group-data-[size=sm]/card:p-3',
      this.className(),
    ),
  );
}
