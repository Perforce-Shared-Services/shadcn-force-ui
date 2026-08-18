import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { cn } from '@/app/lib/utils';

import { markerVariants, type MarkerVariant } from './marker.variants';

/**
 * Angular port of @force-ui/marker (radix-force-ui style).
 *
 * A single-line meta row (a timestamp/status/breadcrumb-style marker) that
 * pairs an optional decorative icon with content. Attribute selectors — the
 * host stays whatever element the caller writes (a `<div>` for a static
 * marker, an `<a>` when the whole row is a link).
 *
 * Usage:
 *   <div uiMarker>
 *     <span uiMarkerIcon><svg ...></svg></span>
 *     <span uiMarkerContent>2 versions ago</span>
 *   </div>
 *
 *   <div uiMarker variant="separator">
 *     <span uiMarkerContent>Today</span>
 *   </div>
 *
 *   <div uiMarker variant="border">
 *     <span uiMarkerContent>Experiment started</span>
 *   </div>
 *
 * `variant="separator"` draws a flanking line on either side of the content
 * (a date-divider style row); `variant="border"` draws a bottom rule instead
 * (a section-header style row).
 *
 * Making the whole row a link — put `uiMarker` itself on the `<a>` (its
 * underline/hover classes are `&:is(a)`-scoped, i.e. they fire only when
 * the HOST it decorates is an anchor, not a nested one):
 *   <a uiMarker href="#">
 *     <span uiMarkerIcon><svg ...></svg></span>
 *     <span uiMarkerContent>View the full Timeline</span>
 *   </a>
 *
 * `MarkerContent`'s own underline/hover classes are scoped to its DIRECT
 * CHILD anchors (`*:[a]:...`) — for an inline link inside longer text:
 *   <span uiMarkerContent>See <a href="#">the full Timeline</a> for this version</span>
 *
 * Accessibility:
 * - `MarkerIcon` is always decorative (`aria-hidden`) — a marker's meaning
 *   must be carried by its text content, never by the icon alone (WCAG
 *   1.1.1). A consequence: never host `uiMarker` on an `<a>`/`<button>` with
 *   only `MarkerIcon` and no `MarkerContent` — the host would have no
 *   accessible name (WCAG 4.1.2). Always pair the icon with content, or add
 *   an explicit `aria-label` on the host if content genuinely can't be text.
 * - This primitive has no live-region behavior of its own (a static row).
 *   A caller binding a value that updates on its own (e.g. an
 *   auto-refreshing relative timestamp) is responsible for wrapping it in
 *   `aria-live`/`role="status"` — matching `bubble`'s equivalent guidance.
 */
@Component({
  selector: '[uiMarker]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'marker',
    '[attr.data-variant]': 'variant()',
    '[class]': 'classes()',
  },
})
export class MarkerComponent {
  readonly variant = input<MarkerVariant>('default');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(markerVariants({ variant: this.variant() }), this.className()),
  );
}

@Component({
  selector: '[uiMarkerIcon]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'marker-icon',
    'aria-hidden': 'true',
    '[class]': 'classes()',
  },
})
export class MarkerIconComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  // `[&_svg]:fill-current` is an audit-driven addition (2026-08-18, matches
  // `item`/`button`'s icon slots): the Material Symbols SVGs this app renders
  // carry no `fill` attribute of their own, so without this they paint black
  // regardless of theme — invisible against this app's dark-mode background.
  protected readonly classes = computed(() =>
    cn(
      "size-4 shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:fill-current",
      this.className(),
    ),
  );
}

@Component({
  selector: '[uiMarkerContent]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'marker-content',
    '[class]': 'classes()',
  },
})
export class MarkerContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'min-w-0 wrap-break-word group-data-[variant=separator]/marker:flex-none group-data-[variant=separator]/marker:text-center *:[a]:underline *:[a]:underline-offset-3 *:[a]:transition-colors *:[a]:motion-reduce:transition-none *:[a]:hover:text-foreground *:[a]:outline-none *:[a]:focus-visible:ring-3 *:[a]:focus-visible:ring-ring/50',
      this.className(),
    ),
  );
}
