import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/native-select `NativeSelectOptGroup`. See
 * native-select-option.component.ts for why the option/optgroup classes
 * target CSS system-color keywords instead of a Force UI token.
 */
@Component({
  selector: 'optgroup[uiNativeSelectOptGroup]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'native-select-optgroup',
    '[class]': 'classes()',
  },
})
export class NativeSelectOptGroupComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn('bg-[Canvas] text-[CanvasText]', this.className()),
  );
}
