import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/message-scroller's `MessageScroller` (Root).
 *
 * Purely a layout container — the behavioral state lives on
 * `MessageScrollerProvider` (see that file's doc comment for the full
 * hand-port rationale). Usage:
 *
 *   <div uiMessageScrollerProvider>
 *     <div uiMessageScroller class="h-96">
 *       <div uiMessageScrollerViewport>
 *         <div uiMessageScrollerContent>
 *           <div uiMessageScrollerItem [messageId]="m.id" [scrollAnchor]="m.startsNewTurn">…</div>
 *         </div>
 *       </div>
 *       <button uiMessageScrollerButton direction="end"></button>
 *     </div>
 *   </div>
 *
 * The host MUST be height-constrained (registry requirement, reproduced in
 * this doc comment rather than enforced in code) — `size-full` only resolves
 * against an ancestor with a real height.
 */
@Component({
  selector: '[uiMessageScroller]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'message-scroller',
    '[class]': 'classes()',
  },
})
export class MessageScrollerComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn('group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden', this.className()),
  );
}
