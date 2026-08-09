import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core"
import { DomSanitizer, type SafeHtml } from "@angular/platform-browser"

import { cn } from "@/lib/utils"
import { type AlertIcon, ALERT_ICON_SVG, DEFAULT_VARIANT_ICON } from "./alert.icons"
import { alertVariants, type AlertVariant } from "./alert.variants"

/**
 * Angular port of @force-ui/alert (radix-force-ui style).
 *
 * Usage:
 *   <div uiAlert variant="warning">
 *     <div uiAlertTitle>Heads up</div>
 *     <div uiAlertDescription>Something happened.</div>
 *   </div>
 *
 * icon="auto" (default) picks the icon per variant. Pass an explicit icon name
 * or icon="none" to suppress it. The icon is aria-hidden — the title carries meaning.
 *
 * ARIA: destructive/warning variants are assertive (role=alert); all others polite (role=status).
 */
@Component({
  selector: "[uiAlert]",
  standalone: true,
  template: `@if (resolvedSafeSvg(); as svg) {
  <span
    class="shrink-0 [&>svg]:size-4 [&>svg]:fill-current"
    data-slot="alert-icon"
    aria-hidden="true"
    [innerHTML]="svg"
  ></span>
}
<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "alert",
    "[attr.role]": "resolvedRole()",
    "[attr.aria-live]": "resolvedLive()",
    "[attr.data-variant]": "variant()",
    "[class]": "classes()",
  },
})
export class AlertComponent {
  readonly variant = input<AlertVariant>("default")
  readonly icon = input<AlertIcon | "auto" | "none">("auto")
  readonly role = input<"auto" | "alert" | "status">("auto")
  readonly live = input<"auto" | "off" | "polite" | "assertive">("auto")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  private readonly isAssertive = computed(
    () => this.variant() === "destructive" || this.variant() === "warning"
  )

  protected readonly resolvedIcon = computed<AlertIcon | null>(() => {
    const icon = this.icon()
    if (icon === "none") return null
    if (icon === "auto") return DEFAULT_VARIANT_ICON[this.variant()]
    return icon
  })

  protected readonly resolvedSafeSvg = computed<SafeHtml | null>(() => {
    const icon = this.resolvedIcon()
    return icon
      ? inject(DomSanitizer).bypassSecurityTrustHtml(ALERT_ICON_SVG[icon])
      : null
  })

  protected readonly resolvedRole = computed(() => {
    const role = this.role()
    return role === "auto" ? (this.isAssertive() ? "alert" : "status") : role
  })

  protected readonly resolvedLive = computed(() => {
    const live = this.live()
    return live === "auto" ? (this.isAssertive() ? "assertive" : "polite") : live
  })

  protected readonly classes = computed(() =>
    cn(alertVariants({ variant: this.variant() }), this.className())
  )
}

@Component({
  selector: "[uiAlertTitle]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "alert-title",
    "[class]": "classes()",
  },
})
export class AlertTitleComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    cn("cn-alert-title cn-font-heading group-has-[>[data-slot=alert-icon]]/alert:col-start-2", this.className())
  )
}

@Component({
  selector: "[uiAlertDescription]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "alert-description",
    "[class]": "classes()",
  },
})
export class AlertDescriptionComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    cn("cn-alert-description group-has-[>[data-slot=alert-icon]]/alert:col-start-2", this.className())
  )
}

@Component({
  selector: "[uiAlertAction]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "alert-action",
    "[class]": "classes()",
  },
})
export class AlertActionComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    cn("cn-alert-action", this.className())
  )
}
