import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  signal,
  viewChild,
  AfterViewInit,
} from "@angular/core"

import { cn } from "@/lib/utils"
import { Separator } from "../separator"

import {
  fieldVariants,
  type FieldOrientation,
} from "./field.variants"

/**
 * Angular port of @force-ui/field (radix-force-ui style).
 *
 * All sub-components live in this one file (registry convention for multi-part
 * components). Each uses an attribute selector on a native element so the
 * host keeps its semantics:
 *
 *   <fieldset uiFieldSet>
 *     <legend uiFieldLegend>Payment</legend>
 *     <div uiFieldGroup>
 *       <div uiField>
 *         <label uiFieldLabel for="name">Name</label>
 *         <input uiInput id="name" />
 *         <p uiFieldDescription>Shown in the timeline.</p>
 *         <div uiFieldError [errors]="errors"></div>
 *       </div>
 *     </div>
 *   </fieldset>
 */

@Component({
  selector: "fieldset[uiFieldSet]",
  standalone: true,
  templateUrl: "./field.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "field-set",
    "[class]": "classes()",
  },
})
export class FieldSetComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-field-set flex flex-col", this.className())
  )
}

@Component({
  selector: "legend[uiFieldLegend]",
  standalone: true,
  templateUrl: "./field.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "field-legend",
    "[attr.data-variant]": "variant()",
    "[class]": "classes()",
  },
})
export class FieldLegendComponent {
  readonly variant = input<FieldLegendVariant>("legend")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-field-legend", this.className())
  )
}

export type FieldLegendVariant = "legend" | "label"

@Component({
  selector: "[uiFieldGroup]",
  standalone: true,
  templateUrl: "./field.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[attr.data-slot]": "dataSlot()",
    "[class]": "classes()",
  },
})
export class FieldGroupComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  // Overridable like React's props spread — e.g. data-slot="checkbox-group"
  // switches the cn-field-group token to its tighter checkbox-group gap.
  readonly dataSlot = input("field-group", { alias: "data-slot" })

  protected readonly classes = computed(() =>
    cn(
      "cn-field-group group/field-group @container/field-group flex w-full flex-col",
      this.className()
    )
  )
}

@Component({
  selector: "[uiField]",
  standalone: true,
  templateUrl: "./field.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: "group",
    "data-slot": "field",
    "[attr.data-orientation]": "orientation()",
    "[attr.data-invalid]": "invalid() ? true : null",
    "[class]": "classes()",
  },
})
export class FieldComponent {
  readonly orientation = input<FieldOrientation>("vertical")
  /**
   * Marks the whole field invalid — turns the label/title text destructive via
   * the cn-field token's `data-[invalid=true]:text-destructive`. Pair with the
   * control's own `aria-invalid` and a FieldError for the announced message.
   */
  readonly invalid = input(false, { transform: booleanAttribute })
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(fieldVariants({ orientation: this.orientation() }), this.className())
  )
}

@Component({
  selector: "[uiFieldContent]",
  standalone: true,
  templateUrl: "./field.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "field-content",
    "[class]": "classes()",
  },
})
export class FieldContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(
      "cn-field-content group/field-content flex flex-1 flex-col leading-snug",
      this.className()
    )
  )
}

// Label base kept in sync with the Label primitive (label/label.component.ts):
// cn-label carries text-sm font-medium leading-none + disabled handling; the
// structural classes below mirror what React's Field composes onto <Label>.
const LABEL_BASE =
  "flex w-fit items-center gap-2 select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50"

@Component({
  selector: "label[uiFieldLabel]",
  standalone: true,
  templateUrl: "./field.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "field-label",
    "[class]": "classes()",
  },
})
export class FieldLabelComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(
      LABEL_BASE,
      "cn-label leading-snug",
      "cn-field-label group/field-label peer/field-label",
      "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
      this.className()
    )
  )
}

@Component({
  selector: "[uiFieldTitle]",
  standalone: true,
  templateUrl: "./field.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "field-label",
    "[class]": "classes()",
  },
})
export class FieldTitleComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-field-title flex w-fit items-center", this.className())
  )
}

@Component({
  selector: "p[uiFieldDescription]",
  standalone: true,
  templateUrl: "./field.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "field-description",
    "[class]": "classes()",
  },
})
export class FieldDescriptionComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(
      "cn-field-description leading-normal font-normal group-has-data-horizontal/field:text-balance",
      "last:mt-0 nth-last-2:-mt-1",
      "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
      this.className()
    )
  )
}

@Component({
  selector: "[uiFieldSeparator]",
  standalone: true,
  imports: [Separator],
  templateUrl: "./field-separator.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "field-separator",
    "[attr.data-content]": "hasContent()",
    "[class]": "classes()",
  },
})
export class FieldSeparatorComponent implements AfterViewInit {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  private readonly content = viewChild<ElementRef<HTMLElement>>("content")
  protected readonly hasContent = signal(false)

  ngAfterViewInit(): void {
    const el = this.content()?.nativeElement
    this.hasContent.set((el?.textContent ?? "").trim().length > 0)
  }

  protected readonly classes = computed(() =>
    cn("cn-field-separator relative", this.className())
  )
}

@Component({
  selector: "[uiFieldError]",
  standalone: true,
  templateUrl: "./field-error.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: "alert",
    "data-slot": "field-error",
    // Hide the host while it has nothing to show, so an unguarded
    // role="alert" never sits empty in the DOM (NVDA/JAWS announce an empty
    // alert on mount — WCAG 4.1.3). Unhides the instant errors/content appear.
    "[hidden]": "!hasAnyContent()",
    "[class]": "classes()",
  },
})
export class FieldErrorComponent implements AfterViewInit {
  readonly errors = input<FieldErrorItem[] | undefined>(undefined)
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  private readonly content = viewChild<ElementRef<HTMLElement>>("content")
  private readonly hasProjectedContent = signal(false)

  ngAfterViewInit(): void {
    const el = this.content()?.nativeElement
    this.hasProjectedContent.set((el?.textContent ?? "").trim().length > 0)
  }

  /** Deduped, non-empty error messages (matches the React useMemo dedup). */
  protected readonly errorMessages = computed(() => {
    const errors = this.errors()
    if (!errors?.length) {
      return []
    }
    const unique = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ]
    return unique
      .map((error) => error?.message)
      .filter((message): message is string => !!message)
  })

  /** Show the errors list only when there's no projected content (children win). */
  protected readonly showErrors = computed(
    () => this.errorMessages().length > 0 && !this.hasProjectedContent()
  )

  /** True once there's anything to announce — drives the empty-alert guard. */
  protected readonly hasAnyContent = computed(
    () => this.showErrors() || this.hasProjectedContent()
  )

  protected readonly classes = computed(() =>
    cn("cn-field-error font-normal", this.className())
  )
}

export interface FieldErrorItem {
  message?: string
}
