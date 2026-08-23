import { cva } from 'class-variance-authority';

/**
 * Chart CVA definitions. `cn-chart-tooltip` is the only chart token in
 * `style-force-ui.css` — the container/legend bases are inline here because
 * no token covers them (the registry React source also carries them inline).
 *
 * The registry container's `[&_.recharts-*]` descendant overrides target
 * recharts class names and have no ngx-charts equivalent; the ngx-specific
 * tick-text fix is emitted by `buildChartStyleText` instead.
 */

export const chartContainerVariants = cva('flex aspect-video justify-center text-xs', {
  variants: {},
  defaultVariants: {},
});

export const chartTooltipVariants = cva('cn-chart-tooltip grid min-w-32 items-start');

export const chartLegendVariants = cva('flex items-center justify-center gap-4', {
  variants: {
    verticalAlign: {
      top: 'pb-3',
      bottom: 'pt-3',
    },
  },
  defaultVariants: {
    verticalAlign: 'bottom',
  },
});
