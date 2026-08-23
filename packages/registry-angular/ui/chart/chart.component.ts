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

import { cn } from '@/lib/utils';

import {
  buildChartStyleText,
  collectSeriesOrder,
  getConfigEntry,
} from './chart.helpers';
import type {
  ChartConfig,
  ChartConfigEntry,
  ChartIndicator,
  ChartTooltipPayloadItem,
} from './chart.types';
import { chartContainerVariants, chartLegendVariants, chartTooltipVariants } from './chart.variants';

let chartIdSeq = 0;

/**
 * Angular port of the registry `ChartContainer`
 * (`apps/v4/registry/bases/radix/ui/chart.tsx`).
 *
 * ngx-charts chart components size themselves off their containing box via
 * their own resize observer, so — unlike the registry source — this does not
 * wrap a `ResponsiveContainer`; the sized host div is enough. The component
 * establishes the per-series `--color-{key}` CSS variables (config-driven,
 * same as the registry `ChartStyle`) under the `[data-chart]` scope. The
 * style text is applied via an imperatively created `<style>` element: a
 * template-authored `<style>` is treated as a static stylesheet declaration
 * and strips runtime bindings.
 */
@Component({
  selector: 'div[uiChartContainer]',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
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

  protected readonly classes = computed(() =>
    cn(chartContainerVariants(), this.className()),
  );

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
 * ngx-charts reports one item per hovered element, so the recharts
 * shared-axis grouping (and with it the registry's `nestLabel` behavior) has
 * no equivalent here.
 */
@Component({
  selector: '[uiChartTooltipContent]',
  standalone: true,
  imports: [],
  templateUrl: './chart-tooltip-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'chart-tooltip',
    '[class]': 'classes()',
  },
})
export class ChartTooltipContentComponent {
  readonly config = input.required<ChartConfig>();
  readonly active = input(false, { transform: booleanAttribute });
  readonly item = input<ChartTooltipPayloadItem | undefined>(undefined);
  readonly indicator = input<ChartIndicator>('dot');
  readonly hideLabel = input(false, { transform: booleanAttribute });
  readonly hideIndicator = input(false, { transform: booleanAttribute });
  /** Hides the row's name span, leaving only the value — for single-series charts where the label row already names the one series. */
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

  protected readonly resolvedName = computed(
    () => this.nameEntry()?.label ?? this.item()?.name ?? '',
  );

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
    cn(chartTooltipVariants(), this.className()),
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
 * the way recharts' `<Legend content>` does). `keys` picks the order/subset;
 * omitted, it falls back to every `config` entry in declared order.
 */
@Component({
  selector: 'div[uiChartLegendContent]',
  standalone: true,
  imports: [],
  templateUrl: './chart-legend-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'chart-legend',
    '[class]': 'classes()',
  },
})
export class ChartLegendContentComponent {
  readonly config = input.required<ChartConfig>();
  readonly keys = input<string[]>([]);
  readonly hideIcon = input(false, { transform: booleanAttribute });
  readonly verticalAlign = input<'top' | 'bottom'>('bottom');
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
    cn('flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:fill-current [&>svg]:text-muted-foreground'),
  );

  protected readonly swatchClasses = computed(() => cn('h-2 w-2 shrink-0 rounded-[2px]'));

  protected iconHtml(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  protected readonly classes = computed(() =>
    cn(chartLegendVariants({ verticalAlign: this.verticalAlign() }), this.className()),
  );
}

/** Re-exported for consumers composing custom chart types. */
export { collectSeriesOrder };
