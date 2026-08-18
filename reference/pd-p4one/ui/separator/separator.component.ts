import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

export type SeparatorOrientation = 'horizontal' | 'vertical';

/**
 * Registry-verbatim base class string, exported so `ui/button-group`'s
 * ButtonGroupSeparator (which wraps this primitive in the registry source)
 * can reuse it directly — Angular attribute selectors can't nest one
 * `@Component` inside another the way React's `<Separator>` children
 * composition does, so the shared class string is the reuse point (same
 * pattern as `toggle-group-item` reusing `toggleVariants`).
 */
export const SEPARATOR_BASE_CLASS =
  'shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch';

/**
 * Angular port of @force-ui/separator (radix-force-ui style).
 *
 * A leaf primitive — a thin divider line. Attribute selector on a native
 * `<div>`:
 *
 *   <div uiSeparator></div>                          horizontal (default)
 *   <div uiSeparator orientation="vertical"></div>   vertical
 *
 * The base class string is registry-verbatim:
 *   shrink-0 bg-border
 *   data-horizontal:h-px data-horizontal:w-full
 *   data-vertical:w-px data-vertical:self-stretch
 * The `data-horizontal:` / `data-vertical:` custom variants (tailwind.css)
 * match `[data-orientation="…"]`, so the host must emit `data-orientation`.
 *
 * RADIX-NG DIVERGENCE (documented, intentional): `@radix-ng/primitives/separator`
 * exists (`RdxSeparatorRootDirective`) and emits the same three attributes, but
 * its `decorative` input defaults to `false` whereas the Force UI registry
 * defaults it to `true`. To keep registry parity (a divider is decorative by
 * default — role `none`, out of the a11y tree) the three attributes are
 * hand-rolled here, reproducing radix's logic exactly:
 *   - role            → 'none' when decorative, else 'separator'
 *   - aria-orientation → 'vertical' only when NOT decorative AND vertical
 *                        (horizontal is the implicit default, so omitted)
 *   - data-orientation → the orientation, drives the width/height variants
 * Pass `decorative="false"` for a semantic separator (e.g. between landmark
 * regions) so it's announced with role `separator`.
 */
@Component({
  selector: '[uiSeparator]',
  standalone: true,
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'separator',
    '[attr.role]': "decorative() ? 'none' : 'separator'",
    '[attr.aria-orientation]':
      "!decorative() && orientation() === 'vertical' ? 'vertical' : null",
    '[attr.data-orientation]': 'orientation()',
    '[class]': 'classes()',
  },
})
export class SeparatorComponent {
  readonly orientation = input<SeparatorOrientation>('horizontal');
  readonly decorative = input(true, { transform: booleanAttribute });
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() => cn(SEPARATOR_BASE_CLASS, this.className()));
}
