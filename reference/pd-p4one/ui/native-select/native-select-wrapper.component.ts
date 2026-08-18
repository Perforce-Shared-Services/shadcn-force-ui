import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { cn } from '@/app/lib/utils';

import { NATIVE_SELECT_ICON_SVG } from './native-select.icons';
import type { NativeSelectSize } from './native-select.variants';

/**
 * Angular port of @force-ui/native-select — the WRAPPER half.
 *
 * The registry's single `NativeSelect` React component renders both the
 * outer positioning `<div>` AND the inner `<select>` (spreading all select
 * props onto it). An Angular attribute-selector component can't render
 * markup outside its own host, so the port splits into two directives —
 * a P4 One extension mirroring the existing `input-group` compound, not a
 * registry name:
 *
 *   <div uiNativeSelectWrapper>
 *     <select uiNativeSelect [disabled]="isDisabled" (change)="onChange($event)">
 *       <option uiNativeSelectOption value="1">One</option>
 *     </select>
 *   </div>
 *
 * Keeping `<select>` as the real host (see native-select.component.ts) means
 * ngModel / formControlName / (change) / [disabled] all bind natively — no
 * input/output forwarding needed.
 *
 * The chevron is purely decorative (`aria-hidden`) — the native `<select>`
 * already announces itself and its options to assistive tech.
 *
 * Disabled dimming lives here (`has-[select:disabled]:opacity-50`), not on
 * the field, because the chevron must dim along with the select — matches
 * `input`/`select-trigger` visually even though the opacity is applied one
 * level up the tree.
 */
@Component({
  selector: '[uiNativeSelectWrapper]',
  standalone: true,
  template:
    '<ng-content /><span class="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground select-none [&>svg]:size-4 [&>svg]:fill-current" data-slot="native-select-icon" aria-hidden="true" [innerHTML]="icon"></span>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'native-select-wrapper',
    '[attr.data-size]': 'size()',
    '[class]': 'classes()',
  },
})
export class NativeSelectWrapperComponent {
  readonly size = input<NativeSelectSize>('default');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly icon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    NATIVE_SELECT_ICON_SVG,
  );

  protected readonly classes = computed(() =>
    cn(
      'group/native-select relative w-fit has-[select:disabled]:opacity-50',
      this.className(),
    ),
  );
}
