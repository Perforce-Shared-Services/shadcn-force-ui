import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  signal,
  viewChild,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

import { SeparatorComponent } from '../separator/separator.component';

/**
 * Angular port of @force-ui/field — `FieldSeparator`.
 *
 * A `Separator` (the divider line) with optional centered content (an "Or"
 * label) sitting on top of it. Projected content goes into the centered span;
 * when nothing is projected the span collapses (`empty:hidden`) so only the
 * line shows.
 *
 *   <div uiFieldSeparator></div>            just a line
 *   <div uiFieldSeparator>Or</div>          line with a centered "Or"
 *
 * `data-content` reflects whether labelled content is present (registry parity —
 * it is informational, no style keys off it). The inner divider uses the ported
 * `[uiSeparator]` so its colour/orientation stays design-system driven.
 */
@Component({
  selector: '[uiFieldSeparator]',
  standalone: true,
  imports: [SeparatorComponent],
  template: `
    <div uiSeparator class="absolute inset-0 top-1/2"></div>
    <span
      #content
      data-slot="field-separator-content"
      class="relative mx-auto block w-fit bg-background px-2 text-muted-foreground empty:hidden"
    >
      <ng-content />
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'field-separator',
    '[attr.data-content]': 'hasContent()',
    '[class]': 'classes()',
  },
})
export class FieldSeparatorComponent implements AfterViewInit {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  private readonly content =
    viewChild<ElementRef<HTMLElement>>('content');
  protected readonly hasContent = signal(false);

  ngAfterViewInit(): void {
    const el = this.content()?.nativeElement;
    this.hasContent.set((el?.textContent ?? '').trim().length > 0);
  }

  protected readonly classes = computed(() =>
    cn(
      'relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2',
      this.className(),
    ),
  );
}
