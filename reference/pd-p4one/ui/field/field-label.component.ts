import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/field — `FieldLabel`.
 *
 * The label for a field's control. In the React registry this is the `Label`
 * primitive re-skinned (`<Label data-slot="field-label" className=…>`), so the
 * final class set is the Label base FIRST then the field-label additions — and
 * because `cn`/`twMerge` keeps the later of any conflict, `leading-snug`
 * overrides Label's `leading-none`, while `text-sm`/`font-medium` carry through.
 * This port reproduces that by composing both strings here rather than nesting a
 * `[uiLabel]` host (two component selectors can't share one element), so the
 * label keeps its native `<label for>`/nesting association (WCAG 1.3.1 / 4.1.2).
 *
 * It also doubles as the selectable-card label: when it directly wraps a nested
 * `[data-slot=field]` (the checkbox/radio card pattern) it gains a rounded
 * border and tints when the inner control is checked (`has-data-checked:*`).
 *
 *   <label uiFieldLabel for="name">Version name</label>
 */
@Component({
  selector: 'label[uiFieldLabel]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'field-label',
    '[class]': 'classes()',
  },
})
export class FieldLabelComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      // Label primitive base (kept in sync with label.component.ts — see JSDoc).
      'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
      // field-label additions (registry-verbatim) — note `border-border` is
      // added to the conditional `has-[>[data-slot=field]]:border`: this app has
      // no global `* { border-color: var(--border) }`, so under Tailwind v4 a
      // bare `border` would paint in the text colour (see CLAUDE.md §8).
      'group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-data-checked:border-primary/30 has-data-checked:bg-primary/5 has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border has-[>[data-slot=field]]:border-border *:data-[slot=field]:p-2.5 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10',
      'has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col',
      this.className(),
    ),
  );
}
