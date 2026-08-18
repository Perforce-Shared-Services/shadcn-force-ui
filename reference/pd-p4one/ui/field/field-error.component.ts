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

export interface FieldErrorItem {
  message?: string;
}

/**
 * Angular port of @force-ui/field — `FieldError`.
 *
 * The error message for a field. `role="alert"` announces it when it appears.
 * Two ways to supply the message, projected content taking priority (matching
 * the React registry's `children`-wins precedence):
 *
 *   <div uiFieldError>Enter a name so you can find this version later.</div>
 *
 *   <div uiFieldError [errors]="form.errors"></div>   // [{ message }, …]
 *
 * With `errors`, duplicate messages are collapsed; a single message renders
 * inline, multiple render as a bulleted list. Mount this conditionally (e.g.
 * `@if (invalid)`) — like the React version it has nothing to show until there
 * is an error, but unlike React (which returns `null`) the host element is
 * always present, so an empty, unmounted-by-the-caller error is an empty
 * `role="alert"` (silent, but better to gate it).
 */
@Component({
  selector: '[uiFieldError]',
  standalone: true,
  template: `
    @if (showErrors()) {
      @if (errorMessages().length === 1) {
        {{ errorMessages()[0] }}
      } @else {
        <ul class="ml-4 flex list-disc flex-col gap-1">
          @for (message of errorMessages(); track message) {
            <li>{{ message }}</li>
          }
        </ul>
      }
    }
    <span #content [hidden]="showErrors()"><ng-content /></span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'alert',
    'data-slot': 'field-error',
    // Hide the host while it has nothing to show, so an unguarded
    // `role="alert"` never sits empty in the DOM (NVDA/JAWS announce an empty
    // alert on mount — WCAG 4.1.3). Unhides the instant errors/content appear.
    '[hidden]': '!hasContent()',
    '[class]': 'classes()',
  },
})
export class FieldErrorComponent implements AfterViewInit {
  readonly errors = input<FieldErrorItem[] | undefined>(undefined);
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  private readonly content = viewChild<ElementRef<HTMLElement>>('content');
  private readonly hasProjectedContent = signal(false);

  ngAfterViewInit(): void {
    const el = this.content()?.nativeElement;
    this.hasProjectedContent.set((el?.textContent ?? '').trim().length > 0);
  }

  /** Deduped, non-empty error messages (matches the React `useMemo` dedup). */
  protected readonly errorMessages = computed(() => {
    const errors = this.errors();
    if (!errors?.length) {
      return [];
    }
    const unique = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ];
    return unique
      .map((error) => error?.message)
      .filter((message): message is string => !!message);
  });

  /** Show the errors list only when there's no projected content (children win). */
  protected readonly showErrors = computed(
    () => this.errorMessages().length > 0 && !this.hasProjectedContent(),
  );

  /** True once there's anything to announce — drives the empty-alert guard. */
  protected readonly hasContent = computed(
    () => this.showErrors() || this.hasProjectedContent(),
  );

  protected readonly classes = computed(() =>
    cn('text-sm font-normal text-destructive', this.className()),
  );
}
