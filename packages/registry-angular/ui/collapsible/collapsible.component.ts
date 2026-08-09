import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core"
import {
  RdxCollapsiblePanelDirective,
  RdxCollapsibleRootDirective,
  RdxCollapsibleTriggerDirective,
} from "@radix-ng/primitives/collapsible"

import { cn } from "@/lib/utils"

/**
 * Angular port of @force-ui/collapsible (radix-force-ui style).
 * Uses @radix-ng/primitives v1.x API (RdxCollapsiblePanelDirective).
 *
 * Usage:
 *   <div uiCollapsible [(open)]="open">
 *     <button uiCollapsibleTrigger>Toggle</button>
 *     <div uiCollapsibleContent>Collapsible content</div>
 *   </div>
 */
@Component({
  selector: "[uiCollapsible]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxCollapsibleRootDirective,
      inputs: ["open", "disabled"],
      outputs: ["openChange", "onOpenChange"],
    },
  ],
  host: {
    "data-slot": "collapsible",
    "[class]": "classes()",
  },
})
export class CollapsibleComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() => cn(this.className()))
}

@Component({
  selector: "[uiCollapsibleTrigger]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [RdxCollapsibleTriggerDirective],
  host: {
    "data-slot": "collapsible-trigger",
    "[class]": "classes()",
  },
})
export class CollapsibleTriggerComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() => cn(this.className()))
}

@Component({
  selector: "[uiCollapsibleContent]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [RdxCollapsiblePanelDirective],
  host: {
    "data-slot": "collapsible-content",
    "[class]": "classes()",
  },
})
export class CollapsibleContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() => cn(this.className()))
}
