import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { cn } from '@/app/lib/utils';

import { buildChartStyleText, getConfigEntry } from './chart.helpers';
import type {
  ChartConfig,
  ChartConfigEntry,
  ChartIndicator,
  ChartTooltipPayloadItem,
} from './chart.types';

let chartIdSeq = 0;

/**
 * Angular port of @force-ui/chart's `ChartContainer` (radix-force-ui style),
 * re-targeted at `ngx-charts` instead of `recharts` (recharts is a React
 * renderer — no Angular-compatible escape hatch exists; see
 * `.claude/branch-context.md` for the reasoning).
 *
 * ngx-charts chart components size themselves off their containing box via
 * their own resize observer, so unlike the registry source this does not
 * wrap a `ResponsiveContainer` — the sized host div is enough.
 *
 * This component only establishes the per-series `--color-{key}` CSS
 * variables (config-driven, same as the registry `ChartStyle`) and the
 * `[data-chart]` scope they're bound under. It does not yet wire an actual
 * chart type: `ui/chart` ships wrapper pieces only until a real consumer
 * exists (see branch-context.md open questions). The registry's descendant
 * selector overrides (axis tick color, grid line color, tooltip cursor —
 * `[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground` etc.) target
 * recharts' own class names and have no ngx-charts equivalent; add the
 * ngx-charts-specific versions once a chart-type component exists to verify
 * against its actual rendered SVG structure.
 *
 * The `--color-{key}` rule text is applied via an imperatively created
 * `<style>` element (`Renderer2.createElement`), not a literal `<style>` tag
 * in the template — Angular's compiler treats a template-authored `<style>`
 * as a static, build-time component stylesheet declaration and strips any
 * runtime binding on it, so a templated `<style [innerHTML]>` silently never
 * reaches the DOM.
 */
@Component({
  selector: 'ui-chart-container',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'chart',
    '[attr.data-chart]': 'chartId()',
    '[class]': 'classes()',
  },
})
export class ChartContainerComponent implements OnDestroy {
  readonly config = input.required<ChartConfig>();
  readonly id = input<string | undefined>(undefined);
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  private readonly renderer = inject(Renderer2);
  private readonly hostEl = inject(ElementRef<HTMLElement>);
  private readonly autoId = `chart-${++chartIdSeq}`;
  private styleEl: HTMLStyleElement | null = null;

  protected readonly chartId = computed(() => this.id() ?? this.autoId);

  protected readonly classes = computed(() => cn('flex aspect-video justify-center text-xs', this.className()));

  constructor() {
    effect(() => {
      const css = buildChartStyleText(this.chartId(), this.config());
      if (!css) {
        this.removeStyleEl();
        return;
      }
      if (!this.styleEl) {
        this.styleEl = this.renderer.createElement('style');
        this.renderer.appendChild(this.hostEl.nativeElement, this.styleEl);
      }
      this.renderer.setProperty(this.styleEl, 'textContent', css);
    });
  }

  ngOnDestroy(): void {
    this.removeStyleEl();
  }

  private removeStyleEl(): void {
    if (this.styleEl) {
      this.renderer.removeChild(this.hostEl.nativeElement, this.styleEl);
      this.styleEl = null;
    }
  }
}

/**
 * Angular port of `ChartTooltipContent`. Renders exactly one hovered item —
 * see `ChartTooltipPayloadItem`'s doc comment for why this drops recharts'
 * shared-axis grouping (and with it, the registry's `nestLabel` behavior,
 * which only existed to fold a single-series payload's label into its own
 * row). `formatter`/`labelFormatter` render-prop overrides are also dropped
 * as unused escape hatches; add them back against a real consumer's need.
 */
@Component({
  selector: 'ui-chart-tooltip-content',
  standalone: true,
  template: `
    @if (active() && item(); as tooltipItem) {
      <div [class]="classes()">
        @if (resolvedLabel(); as chartLabel) {
          <div class="font-medium text-foreground">{{ chartLabel }}</div>
        }
        <div class="grid gap-1.5">
          <div [class]="rowClasses()">
            @if (!hideIndicator()) {
              <div
                [class]="indicatorClasses()"
                [style.--color-bg]="indicatorColor()"
                [style.--color-border]="indicatorColor()"
              ></div>
            }
            <div class="flex flex-1 items-center justify-between leading-none">
              @if (!hideName()) {
                <span class="text-muted-foreground">{{ resolvedName() }}</span>
              }
              @if (tooltipItem.value != null) {
                <span class="font-mono font-medium text-foreground tabular-nums">{{ formattedValue() }}</span>
              }
            </div>
          </div>
        </div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartTooltipContentComponent {
  readonly config = input.required<ChartConfig>();
  readonly active = input(false, { transform: booleanAttribute });
  readonly item = input<ChartTooltipPayloadItem | undefined>(undefined);
  readonly indicator = input<ChartIndicator>('dot');
  readonly hideLabel = input(false, { transform: booleanAttribute });
  readonly hideIndicator = input(false, { transform: booleanAttribute });
  /** Hides the row's name span, leaving only the value — for single-series charts, where the label row above already names the one series (bar-chart.md: "series name row is omitted"). */
  readonly hideName = input(false, { transform: booleanAttribute });
  readonly label = input<string | undefined>(undefined);
  readonly nameKey = input<string | undefined>(undefined);
  readonly labelKey = input<string | undefined>(undefined);
  readonly color = input<string | undefined>(undefined);
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  private readonly nameEntry = computed<ChartConfigEntry | undefined>(() => {
    const currentItem = this.item();
    if (!currentItem) {
      return undefined;
    }
    const key = this.nameKey() ?? currentItem.name ?? currentItem.dataKey ?? 'value';
    return getConfigEntry(this.config(), currentItem, key);
  });

  protected readonly resolvedLabel = computed<string | null>(() => {
    const currentItem = this.item();
    if (this.hideLabel() || !currentItem) {
      return null;
    }
    const explicitLabel = this.label();
    if (!this.labelKey() && explicitLabel) {
      return this.config()[explicitLabel]?.label ?? explicitLabel;
    }
    const key = this.labelKey() ?? currentItem.dataKey ?? currentItem.name ?? 'value';
    return getConfigEntry(this.config(), currentItem, key)?.label ?? null;
  });

  protected readonly resolvedName = computed(() => this.nameEntry()?.label ?? this.item()?.name ?? '');

  protected readonly formattedValue = computed(() => {
    const value = this.item()?.value;
    if (value == null) {
      return '';
    }
    return typeof value === 'number' ? value.toLocaleString() : String(value);
  });

  protected readonly indicatorColor = computed(
    () =>
      this.color() ??
      (this.item()?.payload?.['fill'] as string | undefined) ??
      this.item()?.color ??
      undefined,
  );

  protected readonly classes = computed(() =>
    cn(
      'grid min-w-32 items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl',
      this.className(),
    ),
  );

  protected readonly rowClasses = computed(() =>
    cn('flex w-full flex-wrap items-stretch gap-2', this.indicator() === 'dot' && 'items-center'),
  );

  protected readonly indicatorClasses = computed(() =>
    cn('shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)', {
      'h-2.5 w-2.5': this.indicator() === 'dot',
      'w-1': this.indicator() === 'line',
      'w-0 border-[1.5px] border-dashed bg-transparent': this.indicator() === 'dashed',
    }),
  );
}

/**
 * Angular port of `ChartLegendContent` — built directly from `ChartConfig`
 * rather than a chart-emitted legend payload (ngx-charts doesn't surface one
 * the way recharts' `<Legend content>` does). `keys` picks the order/subset
 * to render; omitted, it falls back to every `config` entry in declared
 * order.
 */
@Component({
  selector: 'ui-chart-legend-content',
  standalone: true,
  template: `
    <div [class]="classes()">
      @for (key of effectiveKeys(); track key) {
        @if (config()[key]; as entry) {
          <div [class]="itemClasses()">
            @if (entry.icon && !hideIcon()) {
              <span aria-hidden="true" [innerHTML]="iconHtml(entry.icon)"></span>
            } @else {
              <div [class]="swatchClasses()" [style.background-color]="colorFor(key, entry)"></div>
            }
            {{ entry.label ?? key }}
          </div>
        }
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartLegendContentComponent {
  readonly config = input.required<ChartConfig>();
  readonly keys = input<string[]>([]);
  readonly hideIcon = input(false, { transform: booleanAttribute });
  readonly verticalAlign = input<'top' | 'bottom'>('bottom');
  /** Swatch size: `sm` (8px, the registry-derived default) or `md` (14x14px, per bar-chart.md's Legend token spec). */
  readonly size = input<'sm' | 'md'>('sm');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  private readonly sanitizer = inject(DomSanitizer);

  protected readonly effectiveKeys = computed(() => {
    const explicit = this.keys();
    return explicit.length ? explicit : Object.keys(this.config());
  });

  protected colorFor(key: string, entry: ChartConfigEntry): string {
    return entry.color ?? `var(--color-${key})`;
  }

  protected readonly itemClasses = computed(() =>
    cn(
      'flex items-center gap-1.5 [&>svg]:text-muted-foreground',
      this.size() === 'md' ? 'text-muted-foreground [&>svg]:h-3.5 [&>svg]:w-3.5' : '[&>svg]:h-3 [&>svg]:w-3',
    ),
  );

  protected readonly swatchClasses = computed(() =>
    cn('shrink-0 rounded-[2px]', this.size() === 'md' ? 'h-3.5 w-3.5' : 'h-2 w-2'),
  );

  protected iconHtml(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  protected readonly classes = computed(() =>
    cn(
      'flex items-center justify-center gap-4',
      this.verticalAlign() === 'top' ? 'pb-3' : 'pt-3',
      this.className(),
    ),
  );
}
