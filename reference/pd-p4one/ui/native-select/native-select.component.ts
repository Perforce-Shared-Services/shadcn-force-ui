import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

import {
  nativeSelectVariants,
  type NativeSelectSize,
} from './native-select.variants';

/**
 * Angular port of @force-ui/native-select — the FIELD half (see
 * native-select-wrapper.component.ts for the split rationale).
 *
 * Attribute selector on the native `<select>` — usage:
 *   <select uiNativeSelect>...</select>
 *   <select uiNativeSelect size="sm">...</select>
 *   <select uiNativeSelect aria-invalid="true">...</select>
 *
 * Always nest inside `<div uiNativeSelectWrapper>` for the chevron overlay
 * and disabled-opacity chrome — see that component's JSDoc.
 *
 * Accessibility: pair with a programmatic `<label for>` (WCAG 1.3.1 / 4.1.2);
 * error state needs native `aria-invalid="true"` PLUS a visible message
 * linked via `aria-describedby` (WCAG 1.4.1 / 3.3.1) — colour alone isn't a
 * sufficient signal.
 */
@Component({
  selector: 'select[uiNativeSelect]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'native-select',
    '[attr.data-size]': 'size()',
    '[class]': 'classes()',
  },
})
export class NativeSelectComponent {
  /**
   * NOTE: this shadows the native `<select size>` content attribute (visible
   * row count / listbox-vs-dropdown rendering) — it's a styling-only prop,
   * never reflected via `[attr.size]`, so it doesn't collide today. Don't add
   * an `[attr.size]` host binding without renaming this; doing so would turn
   * `size="sm"` into a literal 2-row native listbox.
   */
  readonly size = input<NativeSelectSize>('default');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(nativeSelectVariants({ size: this.size() }), this.className()),
  );
}
