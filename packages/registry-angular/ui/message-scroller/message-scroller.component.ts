import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core"

import { cn } from "../../lib/utils"

import { messageScrollerRootClass } from "./message-scroller.variants"

/**
 * Root layout container — behavioral state lives on
 * `MessageScrollerProvider` ([uiMessageScrollerProvider]).
 *
 * The host MUST be height-constrained by the consumer (`size-full` only
 * resolves against an ancestor with a real height).
 */
@Component({
  selector: "[uiMessageScroller]",
  standalone: true,
  templateUrl: "./message-scroller.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "message-scroller",
    "[class]": "classes()",
  },
})
export class MessageScrollerComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(messageScrollerRootClass, this.className())
  )
}
