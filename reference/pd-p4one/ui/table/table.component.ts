import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/table (radix-force-ui style).
 *
 * Attribute selectors — each sub-component decorates the real HTML table
 * element the caller writes (`<table>`, `<thead>`, `<tr>`, `<th>`, `<td>`, …)
 * with the registry class string plus the `data-slot` attribute that Force
 * UI's selector-based theming and the cross-framework test suites rely on for
 * parity with the React/Vue/Svelte siblings. Keeping the native elements is
 * mandatory here: a screen reader's table semantics (row/column headers,
 * navigation) come from the real `<table>` DOM, not from styling.
 *
 * Usage:
 *   <div uiTableContainer>
 *     <table uiTable>
 *       <caption uiTableCaption>Recent versions</caption>
 *       <thead uiTableHeader>
 *         <tr uiTableRow>
 *           <th uiTableHead>Version</th>
 *           <th uiTableHead>Author</th>
 *           <th uiTableHead class="text-right">Size</th>
 *         </tr>
 *       </thead>
 *       <tbody uiTableBody>
 *         <tr uiTableRow>
 *           <td uiTableCell>v12</td>
 *           <td uiTableCell>Ada</td>
 *           <td uiTableCell class="text-right">4.2 MB</td>
 *         </tr>
 *       </tbody>
 *     </table>
 *   </div>
 *
 * The table is purely presentational — no variant prop. Row selection is
 * surfaced via `data-state="selected"` on a `<tr uiTableRow>` (set it from the
 * caller's selection model); the row's class string tints accordingly.
 *
 * `[uiTableContainer]` is an Angular-specific split of the registry's internal
 * wrapper `<div data-slot="table-container">`. The React/Vue sources auto-wrap
 * the `<table>` in that overflow-x scroller; an attribute selector can't wrap
 * its own host, so the container is exposed as a separate opt-in directive.
 * Wrap with it whenever a table can be wider than its column (the common case)
 * so it scrolls horizontally instead of breaking the layout.
 *
 * Accessibility: keep the host elements native (`<table>`/`<thead>`/`<tr>`/
 * `<th>`/`<td>`) so assistive tech gets real table semantics. Give column
 * headers `scope="col"` and row headers `scope="row"`. Name the table for
 * screen readers with `<caption uiTableCaption>`; when a visible caption would
 * be redundant (e.g. a heading sits right above it), put `aria-label` straight
 * on the host instead — `<table uiTable aria-label="…">` works natively since
 * the selector keeps the real `<table>` element. For a selected row, pair
 * `data-state="selected"` with `aria-selected="true"` on the same `<tr>` so the
 * selection is announced, not just tinted. `[uiTableHead]` is `whitespace-nowrap`
 * by default (dense tables); override with `class="whitespace-normal"` on a
 * header that should wrap rather than force horizontal scroll.
 */

@Component({
  selector: '[uiTableContainer]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'table-container',
    '[class]': 'classes()',
  },
})
export class TableContainerComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    // Force data-table spec: the container is a bordered, rounded frame (no
    // shadow — containers use borders only) that scrolls horizontally when the
    // columns outgrow the viewport. `rounded-md` == the spec's radius-card (8px)
    // in this app's radius scale. (Registry default was a bare `overflow-x-auto`
    // with no frame — this is the agreed spec-alignment delta.)
    cn(
      'relative w-full overflow-x-auto rounded-md border border-border',
      this.className(),
    ),
  );
}

@Component({
  selector: '[uiTable]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'table',
    '[class]': 'classes()',
  },
})
export class TableComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn('w-full caption-bottom text-sm', this.className()),
  );
}

@Component({
  selector: '[uiTableHeader]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'table-header',
    '[class]': 'classes()',
  },
})
export class TableHeaderComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    // Force data-table spec: the header row sits on `bg-muted` (neutral-50).
    // `border-border` added to the registry's bare `[&_tr]:border-b`: this app
    // has no global `* { border-color: var(--border) }`, so under Tailwind v4 a
    // bare border falls back to currentColor (text color). Documented §8
    // deviation; mirrors the same fix on the row/footer.
    cn('bg-muted [&_tr]:border-b [&_tr]:border-border', this.className()),
  );
}

@Component({
  selector: '[uiTableBody]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'table-body',
    '[class]': 'classes()',
  },
})
export class TableBodyComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn('[&_tr:last-child]:border-0', this.className()),
  );
}

@Component({
  selector: '[uiTableFooter]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'table-footer',
    '[class]': 'classes()',
  },
})
export class TableFooterComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    // `border-border` added to the registry's bare `border-t` (see §8 / header).
    cn(
      'border-t border-border bg-muted/50 font-medium [&>tr]:last:border-b-0',
      this.className(),
    ),
  );
}

@Component({
  selector: '[uiTableRow]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'table-row',
    '[class]': 'classes()',
  },
})
export class TableRowComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    // Row states. selected → bg-interactive-active (indigo-50 == our
    // `primary-subtle`), per the agreed Force data-table spec delta. hover stays
    // the REGISTRY `bg-muted/50`, NOT the spec's bg-interactive-hover: that
    // token (== our `accent`) collapses to the surface colour in dark mode
    // (--accent dark == --background == rgb(38 38 46)) so the hover would be
    // invisible — the spec's own interactive-hover==surface collision. muted/50
    // darkens visibly in both themes (audit M1, maintainer decision 2026-06-15).
    // The colour-alone selected signal (<3:1, WCAG 1.4.11) is tracked in the
    // DS-wide systemic a11y backlog, not fixed per-component (audit M2).
    // `border-border` added to the registry's bare `border-b` (see §8 / header).
    // `motion-reduce:transition-none` added to the registry's `transition-colors`
    // per the skill's WCAG 2.3.3 rule — the hover/selected tint fade is guarded
    // for `prefers-reduced-motion`.
    cn(
      'border-b border-border transition-colors motion-reduce:transition-none hover:bg-muted/50 data-[state=selected]:bg-primary-subtle',
      this.className(),
    ),
  );
}

@Component({
  selector: '[uiTableHead]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'table-head',
    '[class]': 'classes()',
  },
})
export class TableHeadComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    // Force data-table spec header cell: uppercase, 12px (text-xs), medium,
    // wide tracking (tracking-wide == 0.025em), tertiary text. Registry default
    // was 14px medium foreground, normal case — agreed spec-alignment delta.
    // `text-tertiary` is the dedicated spec text.tertiary token (tailwind.css
    // --tertiary -> Figma 3.Mode base/tertiary -> 6.FUI text/tertiary -> neutral
    // 600/400). Currently equal in value to --muted-foreground, but a distinct
    // token so a future spec change to text.tertiary updates only the header.
    cn(
      'h-10 px-2 text-left align-middle text-xs font-medium uppercase tracking-wide whitespace-nowrap text-tertiary [&:has([role=checkbox])]:pr-0',
      this.className(),
    ),
  );
}

@Component({
  selector: '[uiTableCell]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'table-cell',
    '[class]': 'classes()',
  },
})
export class TableCellComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0',
      this.className(),
    ),
  );
}

@Component({
  selector: '[uiTableCaption]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'table-caption',
    '[class]': 'classes()',
  },
})
export class TableCaptionComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    // `pb-3` added to the registry's `mt-4` so the caption isn't flush against
    // the bordered container's bottom edge (polish delta; mirrored in Figma).
    cn('mt-4 pb-3 text-sm text-muted-foreground', this.className()),
  );
}
