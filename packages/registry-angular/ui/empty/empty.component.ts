import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core"

import { cn } from "@/lib/utils"
import { emptyMediaVariants, type EmptyMediaVariant } from "./empty.variants"

/**
 * Angular port of @force-ui/empty (radix-force-ui style).
 *
 * Usage:
 *   <div uiEmpty>
 *     <div uiEmptyHeader>
 *       <div uiEmptyMedia variant="icon">
 *         <svg>…</svg>
 *       </div>
 *       <h3 uiEmptyTitle>No files found</h3>
 *       <p uiEmptyDescription>Upload a file to get started.</p>
 *     </div>
 *     <div uiEmptyContent>
 *       <button uiButton>Upload file</button>
 *     </div>
 *   </div>
 */
@Component({
  selector: "[uiEmpty]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "empty",
    "[class]": "classes()",
  },
})
export class EmptyComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    cn("cn-empty flex w-full min-w-0 flex-1 flex-col items-center justify-center border-dashed text-center text-balance", this.className())
  )
}

@Component({
  selector: "[uiEmptyHeader]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "empty-header",
    "[class]": "classes()",
  },
})
export class EmptyHeaderComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    cn("cn-empty-header flex max-w-sm flex-col items-center", this.className())
  )
}

@Component({
  selector: "[uiEmptyMedia]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "empty-media",
    "[attr.data-variant]": "variant()",
    "[class]": "classes()",
  },
})
export class EmptyMediaComponent {
  readonly variant = input<EmptyMediaVariant>("default")
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    cn(emptyMediaVariants({ variant: this.variant() }), this.className())
  )
}

@Component({
  selector: "[uiEmptyTitle]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "empty-title",
    "[class]": "classes()",
  },
})
export class EmptyTitleComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    cn("cn-empty-title cn-font-heading", this.className())
  )
}

@Component({
  selector: "[uiEmptyDescription]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "empty-description",
    "[class]": "classes()",
  },
})
export class EmptyDescriptionComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    cn("cn-empty-description [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary", this.className())
  )
}

@Component({
  selector: "[uiEmptyContent]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "empty-content",
    "[class]": "classes()",
  },
})
export class EmptyContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    cn("cn-empty-content flex w-full max-w-sm min-w-0 flex-col items-center text-balance", this.className())
  )
}
