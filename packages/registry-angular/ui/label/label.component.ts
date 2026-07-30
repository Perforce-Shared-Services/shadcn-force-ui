import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core"

import { cn } from "@/lib/utils"

/**
 * Angular port of @force-ui/label (radix-force-ui style).
 *
 * Attribute selector on a native <label> — usage:
 *   <label uiLabel for="email">Email</label>
 *
 * Keeping the host as a native <label> gives the browser implicit
 * label→control association via for/id or nesting for free (WCAG 1.3.1).
 *
 * Disabled styling is driven by peer-disabled:* / group-data-[disabled=true]:*
 * classes: place the label as a sibling after a `peer` control, or inside a
 * group carrying data-disabled="true".
 *
 * peer-disabled:cursor-not-allowed is kept in the component — it is not
 * included in the cn-label CSS token. See DIVERGENCES.md §label-1.
 */
@Component({
  selector: "[uiLabel]",
  standalone: true,
  templateUrl: "./label.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "label",
    "[class]": "classes()",
  },
})
export class LabelComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(
      "cn-label flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed",
      this.className()
    )
  )
}
