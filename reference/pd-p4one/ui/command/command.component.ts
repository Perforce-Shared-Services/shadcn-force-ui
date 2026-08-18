import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

import { CommandRootService } from './command-root.service';

/**
 * Angular port of @force-ui/command (radix-force-ui style) — the root of the
 * command palette. The registry component is built on **cmdk**, for which there
 * is no radix-ng or CDK primitive, so the fuzzy filter, keyboard navigation and
 * highlight state are reimplemented in `CommandRootService` (provided here) and
 * consumed by the child parts. See `command.score.ts` for the ported cmdk
 * scorer and the index barrel for the parity map.
 *
 * Attribute selector so the host stays a plain element:
 *   <div uiCommand>
 *     <div uiCommandInput placeholder="Search versions and experiments"></div>
 *     <div uiCommandList>
 *       <div uiCommandEmpty>No results found.</div>
 *       <div uiCommandGroup heading="Recent">
 *         <div uiCommandItem (select)="run('open')">Open latest…</div>
 *       </div>
 *     </div>
 *   </div>
 *
 * Keyboard model (cmdk parity, WCAG 2.1.1): the root owns keydown so the same
 * bindings work whether focus is in the input or on the list. ArrowUp/Down move
 * the highlight over selectable, visible items with wrap-around; Home/End jump
 * to the first/last; Enter activates the highlighted item. The highlighted item
 * carries `data-selected` (paints via the registry class) and is referenced by
 * the input's `aria-activedescendant`.
 *
 * a11y: the standalone root is a plain container (cmdk only marks the root
 * `role="dialog"` inside `CommandDialog`). `CommandList` is the `role="listbox"`
 * and `CommandInput` the `role="combobox"` that owns it. Give the root an
 * `aria-label`/`aria-labelledby` when it needs an announced name (e.g. embedded
 * in a page region). The root also renders an off-screen `role="status"`
 * live region that announces the filtered result count (and "No results") as the
 * user types (WCAG 4.1.3) — screen-reader users get the same feedback sighted
 * users get from the list shrinking.
 */
@Component({
  selector: '[uiCommand]',
  standalone: true,
  template: `
    <ng-content />
    <span class="sr-only" role="status" aria-live="polite">{{ announcement() }}</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CommandRootService],
  host: {
    'data-slot': 'command',
    '[class]': 'classes()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class CommandComponent {
  private readonly root = inject(CommandRootService);

  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  /** cmdk `shouldFilter` — when false, the caller supplies a filtered list. */
  readonly shouldFilter = input(true, { transform: booleanAttribute });

  /** cmdk `filter` — override the fuzzy scorer (value, search, keywords) → score. */
  readonly filter = input<
    ((value: string, search: string, keywords?: string[]) => number) | undefined
  >(undefined);

  protected readonly classes = computed(() =>
    cn(
      'flex size-full flex-col overflow-hidden rounded-xl! bg-popover p-1 text-popover-foreground',
      this.className(),
    ),
  );

  /** Off-screen result-count announcement for the `role="status"` live region. */
  protected readonly announcement = this.root.resultsAnnouncement;

  constructor() {
    effect(() => this.root.shouldFilter.set(this.shouldFilter()));
    effect(() => {
      const fn = this.filter();
      if (fn) {
        this.root.setFilter(fn);
      }
    });
  }

  protected onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.root.move(1);
        this.root.scrollActiveIntoView();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.root.move(-1);
        this.root.scrollActiveIntoView();
        break;
      case 'Home':
        event.preventDefault();
        this.root.first();
        this.root.scrollActiveIntoView();
        break;
      case 'End':
        event.preventDefault();
        this.root.last();
        this.root.scrollActiveIntoView();
        break;
      case 'Enter':
        if (this.root.selectActive()) {
          event.preventDefault();
        }
        break;
      default:
        break;
    }
  }
}
