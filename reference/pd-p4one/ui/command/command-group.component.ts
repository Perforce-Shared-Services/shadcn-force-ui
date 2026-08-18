import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

import { CommandRootService } from './command-root.service';
import { COMMAND_GROUP } from './command-group.token';

let groupIdCounter = 0;

/**
 * `[uiCommandGroup]` — a labelled cluster of items (registry `CommandGroup`).
 * Classes verbatim; the `**:[[cmdk-group-heading]]:*` rules style the heading,
 * so the heading element carries the `cmdk-group-heading` attribute the
 * registry keys off.
 *
 *   <div uiCommandGroup heading="Recent">
 *     <div uiCommandItem>…</div>
 *   </div>
 *
 * It provides `COMMAND_GROUP` so nested items report their `groupId` to the
 * root; when the fuzzy filter leaves the group with no visible items the whole
 * group is hidden (cmdk behaviour). a11y: `role="group"` named by its heading
 * via `aria-labelledby` (WCAG 1.3.1) — a bare group is nameless to SRs.
 */
@Component({
  selector: '[uiCommandGroup]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: COMMAND_GROUP, useFactory: () => ({ groupId: `command-group-${groupIdCounter++}` }) },
  ],
  template: `
    @if (heading()) {
      <div cmdk-group-heading [id]="headingId">{{ heading() }}</div>
    }
    <ng-content />
  `,
  host: {
    'data-slot': 'command-group',
    role: 'group',
    '[attr.aria-labelledby]': 'heading() ? headingId : null',
    '[hidden]': '!visible()',
    '[class]': 'classes()',
  },
})
export class CommandGroupComponent {
  private readonly root = inject(CommandRootService);
  private readonly ctx = inject(COMMAND_GROUP);

  readonly heading = input<string>('');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly headingId = `${this.ctx.groupId}-heading`;

  protected readonly visible = computed(() => this.root.isGroupVisible(this.ctx.groupId));

  protected readonly classes = computed(() =>
    cn(
      "overflow-hidden p-1 text-foreground **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground",
      this.className(),
    ),
  );
}
