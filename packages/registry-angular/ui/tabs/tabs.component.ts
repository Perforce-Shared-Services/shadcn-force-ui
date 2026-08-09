import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core"
import { RdxTabsList, RdxTabsPanel, RdxTabsRoot, RdxTabsTab } from "@radix-ng/primitives/tabs"

import { cn } from "@/lib/utils"
import { tabsListVariants, type TabsListVariant } from "./tabs.variants"

/**
 * Angular port of @force-ui/tabs (radix-force-ui style).
 *
 * Usage:
 *   <div uiTabs defaultValue="account">
 *     <div uiTabsList>
 *       <button uiTabsTrigger value="account">Account</button>
 *       <button uiTabsTrigger value="password">Password</button>
 *     </div>
 *     <div uiTabsContent value="account">Account content.</div>
 *     <div uiTabsContent value="password">Password content.</div>
 *   </div>
 *
 * Uses @radix-ng/primitives v1.x API (RdxTabsRoot/List/Tab/Panel).
 * Panels hide via the `hidden` attribute — no getBaseId() needed.
 */
@Component({
  selector: "[uiTabs]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxTabsRoot,
      inputs: ["value", "defaultValue", "orientation"],
      outputs: ["valueChange", "onValueChange"],
    },
  ],
  host: {
    "data-slot": "tabs",
    "[class]": "classes()",
  },
})
export class TabsComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    cn("cn-tabs group/tabs flex gap-2 data-horizontal:flex-col", this.className())
  )
}

@Component({
  selector: "[uiTabsList]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [RdxTabsList],
  host: {
    "data-slot": "tabs-list",
    "[attr.data-variant]": "variant()",
    "[class]": "classes()",
  },
})
export class TabsListComponent {
  readonly variant = input<TabsListVariant>("default")
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    cn(tabsListVariants({ variant: this.variant() }), this.className())
  )
}

@Component({
  selector: "[uiTabsTrigger]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxTabsTab,
      inputs: ["value", "disabled"],
    },
  ],
  host: {
    "data-slot": "tabs-trigger",
    "nativeButton": "true",
    "[class]": "classes()",
  },
})
export class TabsTriggerComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    cn(
      "cn-tabs-trigger relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center whitespace-nowrap text-foreground/60 transition-all motion-reduce:transition-none group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground focus-visible:ring-[3px] focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-background data-[active]:text-foreground data-[active]:shadow-sm dark:text-muted-foreground dark:hover:text-foreground dark:data-[active]:border-input dark:data-[active]:bg-input/30 dark:data-[active]:text-foreground after:absolute after:bg-primary after:opacity-0 after:transition-opacity motion-reduce:after:transition-none group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[active]:after:opacity-100 [&_svg]:fill-current",
      this.className()
    )
  )
}

@Component({
  selector: "[uiTabsContent]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxTabsPanel,
      inputs: ["value"],
    },
  ],
  host: {
    "data-slot": "tabs-content",
    "[class]": "classes()",
  },
})
export class TabsContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    cn("cn-tabs-content flex-1 outline-none", this.className())
  )
}
