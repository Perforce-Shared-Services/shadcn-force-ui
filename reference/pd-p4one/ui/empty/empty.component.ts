import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

import {
  emptyMediaVariants,
  type EmptyMediaVariant,
} from './empty.variants';

/**
 * Angular port of @force-ui/empty (radix-force-ui style).
 *
 * Attribute selectors — each sub-component decorates whatever host element the
 * caller writes with the registry class string plus the `data-slot` attribute
 * that Force UI's selector-based theming and the cross-framework test suites
 * rely on for parity with the React/Vue/Svelte siblings.
 *
 * Usage:
 *   <div uiEmpty class="border border-border">
 *     <div uiEmptyHeader>
 *       <div uiEmptyMedia variant="icon"><svg ...></svg></div>
 *       <div uiEmptyTitle>No versions yet</div>
 *       <div uiEmptyDescription>
 *         Versions you create show up here. Start by tracking a few files.
 *       </div>
 *     </div>
 *     <div uiEmptyContent>
 *       <button uiButton>Create version</button>
 *     </div>
 *   </div>
 *
 * The empty state is purely presentational — no interactive/focus behavior
 * (matches the registry source). Only `EmptyMedia` carries a variant.
 *
 * Use this ONLY for a *confirmed* empty state (the user genuinely has no
 * versions / no files / no matches). While content is still loading, show a
 * skeleton or spinner instead — rendering `[uiEmpty]` during load flashes a
 * misleading "nothing here" before the data arrives.
 *
 * Border: the root ships `border-dashed` (style only, no width) — a dashed
 * outline is OPT-IN, exactly as the registry leaves it. Callers that want the
 * framed look add `border border-border` on the host (border-border because
 * this app has no global `* { border-color: var(--border) }`, so a bare
 * `border` would fall back to currentColor — see port skill §8).
 *
 * Accessibility:
 * - A non-interactive empty state is a plain container — no role, no tabindex.
 * - Make the title a real heading element (e.g. `<h2 uiEmptyTitle>`); the
 *   attribute selector keeps the host tag, so the semantic level is the
 *   caller's choice. Pick the level from the surrounding outline — `<h2>` at
 *   the top of a page region, `<h3>` when the empty state sits inside a section
 *   that already has its own heading. Don't duplicate the page `<h1>`.
 * - Decorative media carries `aria-hidden="true"` on its svg. Media that
 *   conveys meaning (a branded illustration the copy refers to) instead needs
 *   an `aria-label` / `role="img"` so it is not silently dropped (WCAG 1.1.1).
 * - Links inside `uiEmptyDescription` must use descriptive text ("View the
 *   sync guide"), never "Click here" / "here" (WCAG 2.4.4).
 */
@Component({
  selector: '[uiEmpty]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'empty',
    '[class]': 'classes()',
  },
})
export class EmptyComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-xl border-dashed p-6 text-center text-balance',
      this.className(),
    ),
  );
}

@Component({
  selector: '[uiEmptyHeader]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'empty-header',
    '[class]': 'classes()',
  },
})
export class EmptyHeaderComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn('flex max-w-sm flex-col items-center gap-2', this.className()),
  );
}

@Component({
  selector: '[uiEmptyMedia]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'empty-icon',
    '[attr.data-variant]': 'variant()',
    '[class]': 'classes()',
  },
})
export class EmptyMediaComponent {
  readonly variant = input<EmptyMediaVariant>('default');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(emptyMediaVariants({ variant: this.variant() }), this.className()),
  );
}

@Component({
  selector: '[uiEmptyTitle]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'empty-title',
    '[class]': 'classes()',
  },
})
export class EmptyTitleComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      // `text-foreground` is an app-compat addition to the registry string
      // (same rationale as the card title): this app ships a global heading
      // typography (@vex) that recolors a bare <h2>/<h3>, so a semantic heading
      // host (recommended for a11y) would otherwise lose the title color.
      // Pinning to foreground keeps it correct on any host tag and equals the
      // registry's inherited color anyway.
      'cn-font-heading text-sm font-medium tracking-tight text-foreground',
      this.className(),
    ),
  );
}

@Component({
  selector: '[uiEmptyDescription]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'empty-description',
    '[class]': 'classes()',
  },
})
export class EmptyDescriptionComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary',
      this.className(),
    ),
  );
}

@Component({
  selector: '[uiEmptyContent]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'empty-content',
    '[class]': 'classes()',
  },
})
export class EmptyContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'flex w-full max-w-sm min-w-0 flex-col items-center gap-2.5 text-sm text-balance',
      this.className(),
    ),
  );
}
