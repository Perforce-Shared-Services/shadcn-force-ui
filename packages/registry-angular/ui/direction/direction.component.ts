import { Directive, effect, inject, input } from '@angular/core'
import { Dir, Directionality, type Direction } from '@angular/cdk/bidi'

export type { Direction }

/**
 * [FORCE-UI] Angular port of @force-ui/direction.
 *
 * The upstream component is a thin wrapper around radix-ui's
 * `Direction.DirectionProvider` / `useDirection` — a scoped RTL/LTR context,
 * not a themed widget (no cva, no variants, no visual output).
 *
 * Angular CDK already ships the exact same primitive: `Dir` (selector
 * `[dir]`) provides a scoped `Directionality` to descendants, which is what
 * @radix-ng/primitives itself injects (see select) for direction-aware
 * behavior. This wraps `Dir` via hostDirectives instead of reimplementing
 * direction propagation — the parity gap vs. upstream is naming only
 * (`direction` input mirrors the registry's `direction ?? dir` precedence).
 *
 * Usage:
 *   <div uiDirectionProvider direction="rtl"> ... </div>
 *   <div uiDirectionProvider dir="rtl"> ... </div>
 *
 * Apply as close to the content root as the RTL/LTR boundary actually is.
 * `Dir`/`Directionality` are DI-scoped to the nearest ancestor host, so a
 * nested `uiDirectionProvider` further down the tree overrides this one for
 * its own subtree only — matching radix-ui's nesting semantics.
 */
@Directive({
  selector: '[uiDirectionProvider]',
  standalone: true,
  hostDirectives: [
    {
      directive: Dir,
      inputs: ['dir'],
    },
  ],
})
export class DirectionProviderDirective {
  private readonly hostDir = inject(Dir, { self: true });

  readonly direction = input<Direction | undefined>(undefined);

  constructor() {
    effect(() => {
      const direction = this.direction();
      if (direction !== undefined) {
        this.hostDir.dir = direction;
      }
    });
  }
}

/** [FORCE-UI] Angular equivalent of the registry's `useDirection` hook. */
export function injectDirection(): Directionality {
  return inject(Directionality)
}
