import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  output,
  Renderer2,
  signal,
  viewChild,
} from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { cn } from '@/app/lib/utils';
import { Button } from '@/app/ui/button';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/ui/dropdown-menu';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/app/ui/empty';
import { Skeleton } from '@/app/ui/skeleton';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/ui/table';

import { ChartAreaComponent } from './chart-area.component';
import { ChartBarComponent } from './chart-bar.component';
import { CHART_WIDGET_ICONS } from './chart-widget.icons';
import {
  abbreviateNumber,
  buildAriaSummary,
  buildChartBarStyleOverrides,
  buildCsv,
  capCategoryCount,
  capSeriesCount,
  collectSeriesOrder,
  findChartBarDataError,
  hasMissingRequiredFields,
  sortCategories,
  toNgxSingleResults,
} from './chart-bar.helpers';
import type { ChartBarReferenceLine, ChartBarVariant } from './chart-bar.types';
import { ChartDonutComponent } from './chart-donut.component';
import { ChartRadarComponent } from './chart-radar.component';
import { ChartRadialComponent } from './chart-radial.component';
import { ChartLineComponent } from './chart-line.component';
import { ChartContainerComponent, ChartLegendContentComponent, ChartTooltipContentComponent } from './chart.component';
import {
  ChartLoadState,
  type ChartConfig,
  type ChartSeriesDatum,
  type ChartSortBy,
  type ChartTooltipPayloadItem,
  type ChartWidgetDensity,
  type ChartWidgetHeadlineMetric,
  type ChartWidgetLegendMode,
  type ChartWidgetType,
} from './chart.types';

let chartWidgetIdSeq = 0;

/** Internal render-state resolution (not part of the public API) — see `renderState`. */
enum WidgetRenderState {
  NoPermission = 'no-permission',
  Loading = 'loading',
  Error = 'error',
  SinglePoint = 'single-point',
  Empty = 'empty',
  Ready = 'ready',
}

interface NgxBarModel {
  name: string;
  value: number;
  series?: string;
}

/**
 * The P4 One dashboard-widget layer, generalized (2026-07-03, second pass)
 * across all six Force UI chart types: title/subtitle/headline metric/action
 * menu, 6 render states, an ARIA "view as table" fallback — per the Force UI
 * `bar-chart` pattern (`the-force-design-spec` MCP,
 * `patterns/components/bar-chart.md`), the only one of the six pattern docs
 * with a fully-specced dashboard-widget chrome to build from. `chartType`
 * picks which `ui-chart-*` card renders in the plot area; the surrounding
 * chrome (this file) stays identical across all of them.
 *
 * `chartType` deliberately excludes `gauge` and `sparkline` — gauge's
 * single-value/min/max shape doesn't fit a `data: ChartSeriesDatum[]`
 * categorical list, and sparkline is BY DEFINITION chrome-stripped (no
 * title/legend/table-fallback), so wrapping it in this chrome would defeat
 * its own purpose.
 *
 * This is deliberately a SEPARATE layer from the `ui-chart-*` cards (the
 * small Figma/shadcn-matched "chart type" cards), not a competing
 * implementation of any of them. `bar-chart.md` is a P4-specific dashboard
 * pattern with no Figma component behind it; the cards are what the actual
 * `Chart / <Type>` Figma components (and the other Force UI framework
 * variants) are built from. This widget composes a card for its plot area
 * instead of calling ngx-charts directly — see `.claude/branch-context.md`
 * for the full reasoning (maintainer-directed architecture, 2026-07-03; the
 * chartType generalization is a maintainer-directed follow-up, same day).
 *
 * Documented, deliberate deviations/gaps (each a genuine ngx-charts,
 * codebase, or scope-tradeoff gap, not an oversight):
 * - **Only `bar` gets the full bar-specific plot controls** —
 *   `orientation`/`stacked` (via `variant`), `referenceLines`, `mini`,
 *   roving-tabindex keyboard nav over individual marks. These concepts don't
 *   generalize cleanly across chart types (radar/donut/radial have no
 *   "orientation"; keyboard nav would need a different DOM query + grid math
 *   per type's own rendered SVG structure — circles for line/radar, arcs for
 *   donut/radial). Non-bar types render their card with a common, simpler
 *   prop set and NO roving-tabindex (the plot wrapper is still a focusable,
 *   ARIA-labeled `role="img"` region, so screen-reader/table-fallback access
 *   is unaffected — only the "arrow through individual marks" affordance is
 *   bar-only for now). Revisit per type against a real consumer, same as
 *   every other deferred variant in this chart set.
 * - **`area`'s `stacked` reuses the SAME `variant` input as bar** — setting
 *   `variant="vertical-stacked"`/`"horizontal-stacked"` toggles area's
 *   `stacked` flag too (via `isStackedVariant`), even though "vertical"/
 *   "horizontal" has no meaning for area. Reusing the existing input avoids
 *   a second `stacked` boolean with overlapping meaning; the naming looseness
 *   is a deliberate, bounded tradeoff, not a bug.
 * - **Tooltip is single-item, not shared-axis, for `bar`** — ngx-charts'
 *   `tooltipContext` is bound per rendered bar segment, not per
 *   category-group — there is no built-in mechanism for "one tooltip, one
 *   row per series." (Maintainer-confirmed tradeoff, 2026-07-03.) `line`/
 *   `area` get ngx-charts' own native shared-axis crosshair tooltip for
 *   free instead (a materially better fit for those two types anyway).
 * - **`referenceLines` only render on `bar`'s `vertical-single` /
 *   `horizontal-single`, and only when set** — `ui-chart-bar` doesn't expose
 *   a `referenceLines` input (no Figma/shadcn bar variant uses one), so this
 *   widget falls back to calling the underlying `ngx-charts-bar-vertical`/
 *   `-horizontal` tag directly for that one combination instead of composing
 *   the card. No equivalent exists yet for `line`/`area`.
 * - **`markClick` only fires for `bar`, `donut`, and `radar`** — `line`,
 *   `area`, and `radial`'s underlying ngx-charts components have no
 *   click/select output to forward (confirmed reading each card's own
 *   component).
 * - **Single data point falls back to an inline value/label block, not a KPI
 *   tile component** — `ui/kpi-tile` doesn't exist in this codebase yet.
 * - **Empty state doesn't render a "ghost" zero-baseline grid behind the
 *   message** — that would mean feeding ngx-charts a synthetic empty dataset
 *   purely for chrome; skipped as a nicety, not the substantive part of the
 *   requirement (message + optional CTA, which is implemented).
 * - **`theme="light"` cannot un-dark a chart nested inside an already-dark
 *   ancestor** — this app's dark mode is a single `.dark-theme` class whose
 *   `@custom-variant` matches ANY descendant; there's no "opt a subtree back
 *   out" mechanism to reuse. `theme="dark"` (forcing dark from a light
 *   ancestor) works by adding that same class locally.
 */
@Component({
  selector: 'ui-chart-widget',
  standalone: true,
  imports: [
    NgxChartsModule,
    Button,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    Skeleton,
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableContainer,
    TableHead,
    TableHeader,
    TableRow,
    ChartAreaComponent,
    ChartBarComponent,
    ChartDonutComponent,
    ChartLineComponent,
    ChartRadarComponent,
    ChartRadialComponent,
    ChartContainerComponent,
    ChartLegendContentComponent,
    ChartTooltipContentComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'chart-widget',
    '[class]': 'hostClasses()',
    '[class.dark-theme]': "theme() === 'dark'",
  },
  template: `
    @if (isMini()) {
      <!--
        Mini (inline) variant, bar-only: no axes, no legend, no title, no
        padding — bar-chart.md's "Mini bar" variant. Height is capped at
        64px, not the spec's literal 32px: BarHorizontalComponent hardcodes a
        fixed 10px top+bottom margin (this.margin = [10, 20, 10, 20] in the
        installed ngx-charts source) regardless of xAxis/yAxis visibility,
        with no public @Input to override it — at a true 32px container that
        leaves ~12px for the plot area, rendering bars as near-invisible
        hairlines for anything past 1-2 categories (confirmed visually, not
        assumed). 64px keeps "mini" meaningfully more compact than the full
        widget while leaving enough of the fixed-margin-adjusted plot area
        for bars to actually read as bars. Kept as a raw ngx-charts call (not
        the ui-chart-bar card) purely for the barPadding override, which the
        card doesn't expose — no other Figma bar variant needs it.
      -->
      <ngx-charts-bar-horizontal
        class="block max-h-16 w-full"
        [results]="ngxSingleResults()"
        [xAxis]="false"
        [yAxis]="false"
        [legend]="false"
        [roundEdges]="true"
        [customColors]="customColorsFn()"
        [animations]="true"
        [barPadding]="1"
      />
    } @else if (renderState() === WidgetRenderState.NoPermission) {
      <!-- bar-chart.md: "No permission" replaces the ENTIRE chart, including the title — unlike every other state, which keeps the header visible. -->
      <div uiEmpty>
        <div uiEmptyHeader>
          <div uiEmptyMedia variant="icon">
            <span aria-hidden="true" [innerHTML]="iconHtml(icons.lock)"></span>
          </div>
          <h4 uiEmptyTitle>You do not have access to this data</h4>
          <div uiEmptyDescription>Contact an administrator for access.</div>
        </div>
      </div>
    } @else {
      <div class="flex items-start justify-between gap-4">
        <div class="min-w-0">
          <h3 class="truncate text-xl font-semibold text-foreground" [class.line-clamp-2]="true">{{ title() }}</h3>
          @if (subtitle()) {
            <p class="truncate text-sm text-muted-foreground">{{ subtitle() }}</p>
          }
        </div>
        <div class="flex shrink-0 items-center gap-4">
          @if (headlineMetric(); as metric) {
            <div class="flex flex-col items-end border-r border-border pr-4">
              <span class="text-2xl font-semibold text-foreground">{{ metric.value }}</span>
              <span class="text-xs text-muted-foreground">{{ metric.label }}</span>
              @if (metric.delta; as delta) {
                <span [class]="deltaClasses(delta.direction)">{{ delta.value }}</span>
              }
            </div>
          }
          <button
            uiButton
            variant="ghost"
            size="icon"
            aria-label="Chart actions"
            [rdxDropdownMenuTrigger]="actionsMenu"
          >
            <span aria-hidden="true" focusable="false" [innerHTML]="iconHtml(icons.moreVert)"></span>
          </button>
        </div>
      </div>
      <ng-template #actionsMenu>
        <div rdxDropdownMenuContent class="w-40">
          @if (exportable()) {
            <button rdxDropdownMenuItem (onSelect)="onExport()">
              <span aria-hidden="true" [innerHTML]="iconHtml(icons.download)"></span>
              Export CSV
            </button>
          }
          <button rdxDropdownMenuItem (onSelect)="refresh.emit()">
            <span aria-hidden="true" [innerHTML]="iconHtml(icons.refresh)"></span>
            Refresh
          </button>
        </div>
      </ng-template>

      @switch (renderState()) {
        @case (WidgetRenderState.Loading) {
          <div class="mt-2 flex h-40 items-end gap-3 px-2 pb-2" aria-busy="true" aria-label="Loading chart">
            @for (barHeight of loadingBarHeights; track $index) {
              <div uiSkeleton class="w-8 rounded-t-md" [style.height.%]="barHeight"></div>
            }
          </div>
        }
        @case (WidgetRenderState.Error) {
          <div uiEmpty class="mt-2">
            <div uiEmptyHeader>
              <div uiEmptyMedia variant="icon">
                <span aria-hidden="true" [innerHTML]="iconHtml(icons.error)"></span>
              </div>
              <h4 uiEmptyTitle>Couldn't load this chart</h4>
              <div uiEmptyDescription>{{ errorText() }}</div>
            </div>
            <div uiEmptyContent>
              <button uiButton variant="outline" (click)="onRetry()">Retry</button>
            </div>
          </div>
        }
        @case (WidgetRenderState.SinglePoint) {
          <div class="mt-2 flex flex-col items-center justify-center gap-1 py-8">
            <span class="text-3xl font-semibold text-foreground">{{ singlePointValue() }}</span>
            <span class="text-sm text-muted-foreground">{{ singlePointCategory() }}</span>
          </div>
        }
        @case (WidgetRenderState.Empty) {
          <div uiEmpty class="mt-2">
            <div uiEmptyHeader>
              <h4 uiEmptyTitle>No data for the selected period</h4>
              <div uiEmptyDescription>Try widening the date range or filters.</div>
            </div>
          </div>
        }
        @default {
          @if (partialDataMessage()) {
            <p class="mt-2 rounded-md bg-muted px-3 py-1.5 text-xs text-muted-foreground">{{ partialDataMessage() }}</p>
          }
          @if (truncated()) {
            <p class="mt-2 rounded-md bg-muted px-3 py-1.5 text-xs text-muted-foreground">
              Showing the top {{ categoryLimit() - 1 }} categories; the rest are grouped into "Other".
            </p>
          }

          @if (showAsTable()) {
            <div uiTableContainer class="mt-2">
              <table uiTable [attr.aria-label]="ariaLabel()">
                <caption uiTableCaption>{{ ariaDescription() }}</caption>
                <thead uiTableHeader>
                  <tr uiTableRow>
                    <th uiTableHead scope="col">Category</th>
                    @if (isMultiSeries()) {
                      <th uiTableHead scope="col">Series</th>
                    }
                    <th uiTableHead scope="col">Value</th>
                  </tr>
                </thead>
                <tbody uiTableBody>
                  @for (row of preparedData(); track row.category + (row.series ?? '')) {
                    <tr uiTableRow>
                      <td uiTableCell>{{ row.category }}</td>
                      @if (isMultiSeries()) {
                        <td uiTableCell>{{ effectiveConfig()[row.series ?? '']?.label ?? row.series }}</td>
                      }
                      <td uiTableCell>{{ row.value.toLocaleString() }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          } @else {
            <div
              #plotWrapper
              class="mt-2 outline-none"
              tabindex="0"
              role="img"
              [attr.aria-label]="ariaLabel()"
              [attr.aria-description]="ariaDescription()"
              (keydown)="onPlotKeydown($event)"
            >
              @if (chartType() === 'bar') {
                @if (hasReferenceLines()) {
                  <!-- ui-chart-bar has no referenceLines input (no Figma bar variant needs one) — fall back to the raw ngx-charts tag for this one combination. -->
                  <ui-chart-container [id]="chartWidgetId" [config]="effectiveConfig()" [class]="plotClasses()">
                    @if (isHorizontal()) {
                      <ngx-charts-bar-horizontal
                        [results]="ngxSingleResults()"
                        [xAxis]="true"
                        [yAxis]="true"
                        [showGridLines]="true"
                        [legend]="false"
                        [tooltipDisabled]="!tooltip()"
                        [customColors]="customColorsFn()"
                        [roundEdges]="true"
                        [trimYAxisTicks]="true"
                        [maxYAxisTickLength]="maxCategoryTickLength()"
                        [xAxisTickFormatting]="valueTickFormatting()"
                        [referenceLines]="referenceLines()"
                        [showRefLines]="true"
                        [showRefLabels]="true"
                        (select)="markClick.emit(toMarkClickDatum($event))"
                      >
                        <ng-template #tooltipTemplate let-model="model">
                          <ui-chart-tooltip-content
                            [config]="effectiveConfig()"
                            [active]="true"
                            [item]="toTooltipItem(model)"
                            [label]="tooltipCategoryLabel(model)"
                            [hideName]="true"
                            indicator="dashed"
                          />
                        </ng-template>
                      </ngx-charts-bar-horizontal>
                    } @else {
                      <ngx-charts-bar-vertical
                        [results]="ngxSingleResults()"
                        [xAxis]="true"
                        [yAxis]="true"
                        [showGridLines]="true"
                        [legend]="false"
                        [tooltipDisabled]="!tooltip()"
                        [customColors]="customColorsFn()"
                        [roundEdges]="true"
                        [trimXAxisTicks]="true"
                        [maxXAxisTickLength]="maxCategoryTickLength()"
                        [yAxisTickFormatting]="valueTickFormatting()"
                        [referenceLines]="referenceLines()"
                        [showRefLines]="true"
                        [showRefLabels]="true"
                        (select)="markClick.emit(toMarkClickDatum($event))"
                      >
                        <ng-template #tooltipTemplate let-model="model">
                          <ui-chart-tooltip-content
                            [config]="effectiveConfig()"
                            [active]="true"
                            [item]="toTooltipItem(model)"
                            [label]="tooltipCategoryLabel(model)"
                            [hideName]="true"
                            indicator="dashed"
                          />
                        </ng-template>
                      </ngx-charts-bar-vertical>
                    }
                  </ui-chart-container>
                } @else {
                  <ui-chart-bar
                    [data]="preparedData()"
                    [colorMapping]="colorMapping()"
                    [orientation]="isHorizontal() ? 'horizontal' : 'vertical'"
                    [stacked]="isStackedVariant()"
                    [showGrid]="true"
                    [showXAxis]="true"
                    [showYAxis]="true"
                    [legend]="false"
                    [tooltip]="tooltip()"
                    class="block"
                    (markClick)="markClick.emit($event)"
                  />
                }
              } @else if (chartType() === 'line') {
                <ui-chart-line
                  [data]="preparedData()"
                  [colorMapping]="colorMapping()"
                  [showGrid]="true"
                  [showXAxis]="true"
                  [showYAxis]="true"
                  [legend]="false"
                  [tooltip]="tooltip()"
                  class="block"
                />
              } @else if (chartType() === 'area') {
                <ui-chart-area
                  [data]="preparedData()"
                  [colorMapping]="colorMapping()"
                  [stacked]="isStackedVariant()"
                  [showGrid]="true"
                  [showXAxis]="true"
                  [showYAxis]="true"
                  [legend]="false"
                  [tooltip]="tooltip()"
                  class="block"
                />
              } @else if (chartType() === 'donut') {
                <ui-chart-donut
                  [data]="preparedData()"
                  [colorMapping]="colorMapping()"
                  [legend]="false"
                  [tooltip]="tooltip()"
                  class="mx-auto block"
                  (markClick)="markClick.emit($event)"
                />
              } @else if (chartType() === 'radar') {
                <ui-chart-radar
                  [data]="preparedData()"
                  [colorMapping]="colorMapping()"
                  [legend]="false"
                  [tooltip]="tooltip()"
                  class="block"
                />
              } @else {
                <ui-chart-radial
                  [data]="preparedData()"
                  [colorMapping]="colorMapping()"
                  [legend]="false"
                  [tooltip]="tooltip()"
                  class="mx-auto block"
                />
              }
            </div>
            @if (effectiveLegend() === 'bottom') {
              <ui-chart-legend-content [config]="effectiveConfig()" size="md" />
            }
          }

          <button
            type="button"
            class="mt-1 text-xs text-muted-foreground underline decoration-dotted underline-offset-2 hover:text-foreground"
            (click)="showAsTable.set(!showAsTable())"
          >
            {{ showAsTable() ? 'View as chart' : 'View as table' }}
          </button>
        }
      }
    }
  `,
})
export class ChartWidgetComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string | undefined>(undefined);
  readonly headlineMetric = input<ChartWidgetHeadlineMetric | undefined>(undefined);
  readonly data = input.required<ChartSeriesDatum[]>();
  readonly chartType = input<ChartWidgetType>('bar');
  /** Bar-only: reference lines fall back to a raw ngx-charts render — see the class doc comment. */
  readonly referenceLines = input<ChartBarReferenceLine[]>([]);
  /** Drives bar's orientation/stacked AND area's stacked (`vertical-stacked`/`horizontal-stacked` → `stacked=true`, orientation ignored for area) — see the class doc comment. Ignored by donut/radar/radial. */
  readonly variant = input<ChartBarVariant>('vertical-single');
  readonly colorMapping = input<ChartConfig | undefined>(undefined);
  readonly density = input<ChartWidgetDensity>('md');
  readonly theme = input<'light' | 'dark' | 'auto'>('auto');
  readonly sortBy = input<ChartSortBy>('as-provided');
  readonly legend = input<ChartWidgetLegendMode>('auto');
  readonly normalized = input(false, { transform: booleanAttribute });
  readonly tooltip = input(true, { transform: booleanAttribute });
  readonly exportable = input(true, { transform: booleanAttribute });
  readonly loadState = input<ChartLoadState>(ChartLoadState.Idle);
  readonly errorMessage = input<string | undefined>(undefined);
  readonly partialDataMessage = input<string | undefined>(undefined);
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  readonly markClick = output<ChartSeriesDatum>();
  readonly refresh = output<void>();

  protected readonly WidgetRenderState = WidgetRenderState;
  protected readonly icons = CHART_WIDGET_ICONS;
  protected readonly showAsTable = signal(false);
  protected readonly loadingBarHeights = [55, 85, 40, 95, 65, 75, 50] as const;

  private readonly sanitizer = inject(DomSanitizer);
  private readonly renderer = inject(Renderer2);
  private readonly hostEl = inject(ElementRef<HTMLElement>);
  private readonly plotWrapper = viewChild<ElementRef<HTMLElement>>('plotWrapper');
  protected readonly chartWidgetId = `chart-widget-${++chartWidgetIdSeq}`;
  private hoverDimStyleEl: HTMLStyleElement | null = null;
  private focusedBarIndex = -1;

  private readonly isBar = computed(() => this.chartType() === 'bar');
  protected readonly isMini = computed(() => this.isBar() && this.variant() === 'mini');
  protected readonly isHorizontal = computed(
    () => this.isBar() && (this.variant() === 'horizontal-single' || this.variant() === 'horizontal-stacked'),
  );
  protected readonly isStackedVariant = computed(
    () => this.variant() === 'vertical-stacked' || this.variant() === 'horizontal-stacked',
  );
  /**
   * Bar: grouped or stacked (from `variant`). Line/area/radar: derived from
   * the RAW `data()` input (any `series` set) — deliberately not
   * `preparedData()`, which would create a circular dependency
   * (`preparedData` → `categoryCapped` → `seriesCappedData` → `isMultiSeries`
   * → `preparedData`, an actual Angular signals cycle-detection crash hit
   * once and fixed, not a hypothetical). Donut/radial: never multi-series.
   */
  protected readonly isMultiSeries = computed(() => {
    if (this.isBar()) return this.isStackedVariant() || this.variant() === 'vertical-grouped';
    if (this.chartType() === 'donut' || this.chartType() === 'radial') return false;
    return this.data().some((d) => d.series != null);
  });
  protected readonly hasReferenceLines = computed(
    () => this.isBar() && !this.isMultiSeries() && !this.isMini() && this.referenceLines().length > 0,
  );

  private readonly dataHasMissingFields = computed(() => hasMissingRequiredFields(this.data()));
  protected readonly isEmpty = computed(() => this.data().length === 0 || this.dataHasMissingFields());
  /** Bar-only structural validation (mixed category types, duplicate rows, negative values in a stacked variant) — `findChartBarDataError` reasons about `ChartBarVariant`, which only bar sets meaningfully. */
  protected readonly dataError = computed(() =>
    this.isEmpty() || !this.isBar() ? null : findChartBarDataError(this.data(), this.variant()),
  );
  private readonly uniqueCategoryCount = computed(() => new Set(this.data().map((d) => d.category)).size);
  protected readonly isSinglePoint = computed(
    () => !this.isEmpty() && !this.dataError() && this.uniqueCategoryCount() === 1,
  );

  protected readonly renderState = computed<WidgetRenderState>(() => {
    if (this.loadState() === ChartLoadState.NoPermission) return WidgetRenderState.NoPermission;
    if (this.loadState() === ChartLoadState.Loading) return WidgetRenderState.Loading;
    if (this.loadState() === ChartLoadState.Error || this.dataError()) return WidgetRenderState.Error;
    if (this.isEmpty()) return WidgetRenderState.Empty;
    if (this.isSinglePoint()) return WidgetRenderState.SinglePoint;
    return WidgetRenderState.Ready;
  });

  protected readonly errorText = computed(
    () => this.errorMessage() ?? this.dataError() ?? 'Something went wrong loading this chart.',
  );

  protected readonly singlePointValue = computed(() => this.data()[0]?.value.toLocaleString() ?? '');
  protected readonly singlePointCategory = computed(() => this.data()[0]?.category ?? '');

  private readonly seriesLimit = computed(() => (this.isStackedVariant() ? 5 : 4));
  protected readonly categoryLimit = computed(() => (this.isHorizontal() && this.density() === 'lg' ? 50 : 20));

  private readonly seriesCappedData = computed(() =>
    this.isMultiSeries() ? capSeriesCount(this.data(), this.seriesLimit()) : this.data(),
  );
  private readonly categoryCapped = computed(() => capCategoryCount(this.seriesCappedData(), this.categoryLimit()));
  protected readonly preparedData = computed(() => this.categoryCapped().data);
  protected readonly truncated = computed(() => this.categoryCapped().truncated);

  protected readonly categoryOrder = computed(() => sortCategories(this.preparedData(), this.sortBy()));
  protected readonly seriesOrder = computed(() => collectSeriesOrder(this.preparedData()));

  protected readonly ngxSingleResults = computed(() => toNgxSingleResults(this.preparedData(), this.categoryOrder()));

  /** Single source of truth for color + label per domain key (series for grouped/stacked, category for single — matching ngx-charts' own `colors.getColor(label)` call convention). Drives `ChartContainer`, `ChartLegendContent`, and tooltip resolution. */
  protected readonly effectiveConfig = computed<ChartConfig>(() => {
    const keys = this.isMultiSeries() ? this.seriesOrder() : this.categoryOrder();
    const provided = this.colorMapping() ?? {};
    const fallbackRamp = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)'];
    const merged: ChartConfig = {};
    keys.forEach((key, index) => {
      merged[key] = {
        label: provided[key]?.label ?? key,
        color: provided[key]?.color ?? fallbackRamp[index % fallbackRamp.length],
      };
    });
    return merged;
  });

  protected readonly customColorsFn = computed(() => {
    const config = this.effectiveConfig();
    return (name: string) => config[name]?.color ?? 'var(--chart-1)';
  });

  /** Multi-series (bar/line/area/radar): bottom legend keyed by series. Single-series donut/radial: bottom legend keyed by category (they have no series concept, but still need a legend to name their segments/rings). Everything else: bar's original series-only "auto" heuristic, unchanged. */
  protected readonly effectiveLegend = computed<ChartWidgetLegendMode>(() => {
    if (this.isMultiSeries()) return 'bottom';
    const mode = this.legend();
    if (mode !== 'auto') return mode;
    if (this.chartType() === 'donut' || this.chartType() === 'radial') {
      return this.categoryOrder().length > 1 ? 'bottom' : 'none';
    }
    return this.seriesOrder().length > 1 ? 'bottom' : 'none';
  });

  protected readonly valueTickFormatting = computed(() => {
    const isLarge = this.density() === 'lg';
    return (value: number) => (isLarge ? value.toLocaleString() : abbreviateNumber(value));
  });

  protected readonly maxCategoryTickLength = computed(() => {
    switch (this.density()) {
      case 'sm':
        return 14;
      case 'lg':
        return 28;
      default:
        return 23;
    }
  });

  protected readonly ariaLabel = computed(() => `${chartTypeLabel(this.chartType())} chart: ${this.title()}`);
  protected readonly ariaDescription = computed(() => buildAriaSummary(this.categoryOrder(), this.preparedData()));

  protected readonly hostClasses = computed(() => cn('block', this.className()));
  protected readonly plotClasses = computed(() => cn('w-full', this.isHorizontal() ? 'aspect-square' : 'aspect-video'));

  constructor() {
    this.hoverDimStyleEl = this.renderer.createElement('style');
    this.renderer.setProperty(this.hoverDimStyleEl, 'textContent', buildChartBarStyleOverrides(this.chartWidgetId));
    this.renderer.appendChild(this.hostEl.nativeElement, this.hoverDimStyleEl);
  }

  protected iconHtml(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  protected deltaClasses(direction: 'up' | 'down' | 'flat'): string {
    return cn('text-xs font-medium', {
      'text-success': direction === 'up',
      'text-destructive': direction === 'down',
      'text-muted-foreground': direction === 'flat',
    });
  }

  protected toTooltipItem(model: NgxBarModel): ChartTooltipPayloadItem {
    const key = model.name;
    const entry = this.effectiveConfig()[key];
    return {
      name: entry?.label ?? key,
      dataKey: key,
      value: model.value,
      color: entry?.color,
    };
  }

  protected tooltipCategoryLabel(model: NgxBarModel): string {
    return model.series ?? model.name;
  }

  /** ngx-charts' `(select)` payload is `bar.data` (`{name, value, series?}`) — remap to the public `ChartSeriesDatum` shape for `markClick`. */
  protected toMarkClickDatum(model: NgxBarModel): ChartSeriesDatum {
    if (model.series) {
      return { category: model.series, series: model.name, value: model.value };
    }
    return { category: model.name, value: model.value };
  }

  protected onRetry(): void {
    this.refresh.emit();
  }

  protected onExport(): void {
    const csv = buildCsv(this.preparedData());
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const anchor = this.renderer.createElement('a') as HTMLAnchorElement;
    anchor.href = url;
    anchor.download = `${this.title().toLowerCase().replace(/\s+/g, '-')}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Roving-tabindex keyboard nav across the rendered `.bar` elements
   * (`path.bar`, per the installed ngx-charts source — see the class-level
   * doc comment), bar-only. Grouped/stacked bars are laid out one
   * `SeriesVerticalComponent` per category with `seriesOrder().length` bars
   * each, in that nested order (verified against source, not assumed) — so a
   * flat DOM index maps onto a (category, series) grid via simple div/mod
   * math, no per-bar data attributes needed. Moving focus onto a bar fires
   * its native `focus` event, which ngx-charts' own `TooltipDirective`
   * already listens for (`tooltipShowEvent` defaults to `all` = hover +
   * focus) — so the tooltip shows for free, no extra wiring. For non-bar
   * chart types `queryBarElements()` finds nothing (`path.bar` doesn't exist
   * in their rendered SVG) and this silently no-ops — the wrapper stays
   * focusable and ARIA-labeled either way, just without per-mark arrow nav.
   */
  protected onPlotKeydown(event: KeyboardEvent): void {
    const bars = this.queryBarElements();
    if (!bars.length) {
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.focusedBarIndex = -1;
      this.plotWrapper()?.nativeElement.focus();
      return;
    }

    const seriesCount = this.isMultiSeries() ? Math.max(this.seriesOrder().length, 1) : 1;
    const current = this.focusedBarIndex === -1 ? 0 : this.focusedBarIndex;
    let next = current;

    const horizontal = this.isHorizontal();
    const categoryKey = horizontal ? 'ArrowUp' : 'ArrowLeft';
    const categoryKeyForward = horizontal ? 'ArrowDown' : 'ArrowRight';
    const seriesKey = horizontal ? 'ArrowLeft' : 'ArrowUp';
    const seriesKeyForward = horizontal ? 'ArrowRight' : 'ArrowDown';

    switch (event.key) {
      case categoryKey:
        next = Math.max(current - seriesCount, current % seriesCount);
        break;
      case categoryKeyForward:
        next = Math.min(current + seriesCount, bars.length - 1);
        break;
      case seriesKey:
        next = current % seriesCount === 0 ? current : current - 1;
        break;
      case seriesKeyForward:
        next = current % seriesCount === seriesCount - 1 ? current : current + 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    this.focusBar(bars, next);
  }

  private queryBarElements(): HTMLElement[] {
    const wrapper = this.plotWrapper()?.nativeElement;
    return wrapper ? Array.from(wrapper.querySelectorAll<HTMLElement>('path.bar')) : [];
  }

  private focusBar(bars: HTMLElement[], index: number): void {
    const clamped = Math.max(0, Math.min(index, bars.length - 1));
    bars.forEach((bar, i) => this.renderer.setAttribute(bar, 'tabindex', i === clamped ? '0' : '-1'));
    this.focusedBarIndex = clamped;
    bars[clamped]?.focus();
  }
}

function chartTypeLabel(chartType: ChartWidgetType): string {
  switch (chartType) {
    case 'bar':
      return 'Bar';
    case 'line':
      return 'Line';
    case 'area':
      return 'Area';
    case 'donut':
      return 'Donut';
    case 'radar':
      return 'Radar';
    case 'radial':
      return 'Radial';
  }
}
