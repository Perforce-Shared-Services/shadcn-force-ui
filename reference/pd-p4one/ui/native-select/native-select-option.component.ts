import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/native-select `NativeSelectOption`.
 *
 * `bg-[Canvas] text-[CanvasText]` are CSS system-color keywords — the real
 * OS-native `<option>` popup ignores ordinary `background`/`color` values on
 * most platforms, so the registry targets the system listbox colors instead
 * of a Force UI token.
 *
 * KNOWN LIMITATION: because of that, the options popup itself can't be themed
 * to match Force UI's light/dark palette on platforms that honor the system
 * keywords — only the closed field (the `<select>`/wrapper) is themeable.
 * Pick `ui/select` instead when the open panel's appearance matters.
 */
@Component({
  selector: 'option[uiNativeSelectOption]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'native-select-option',
    '[class]': 'classes()',
  },
})
export class NativeSelectOptionComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn('bg-[Canvas] text-[CanvasText]', this.className()),
  );
}
