import { Component, Type } from "@angular/core"
import { Badge } from "@/angular-ui/badge"
import {
  Button,
} from "@/angular-ui/button"
import {
  Card, CardHeader, CardTitle, CardDescription,
  CardAction, CardContent, CardFooter,
} from "@/angular-ui/card"
import { Kbd, KbdGroup } from "@/angular-ui/kbd"
import { Label } from "@/angular-ui/label"
import { Separator } from "@/angular-ui/separator"
import { Skeleton } from "@/angular-ui/skeleton"
import { Spinner } from "@/angular-ui/spinner"

// ---------------------------------------------------------------------------
// Badge
// ---------------------------------------------------------------------------

@Component({
  selector: "preview-badge-demo",
  standalone: true,
  imports: [Badge],
  template: `
    <div class="flex flex-col items-center gap-2">
      <div class="flex w-full flex-wrap gap-2">
        <span uiBadge>Badge</span>
        <span uiBadge variant="secondary">Secondary</span>
        <span uiBadge variant="destructive">Destructive</span>
        <span uiBadge variant="outline">Outline</span>
      </div>
      <div class="flex w-full flex-wrap gap-2">
        <span uiBadge class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">8</span>
        <span uiBadge variant="destructive" class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">99</span>
        <span uiBadge variant="outline" class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">20+</span>
      </div>
    </div>`,
})
export class BadgeDemoComponent {}

@Component({
  selector: "preview-badge-variants",
  standalone: true,
  imports: [Badge],
  template: `
    <div class="flex flex-wrap gap-2">
      <span uiBadge>Default</span>
      <span uiBadge variant="secondary">Secondary</span>
      <span uiBadge variant="destructive">Destructive</span>
      <span uiBadge variant="outline">Outline</span>
      <span uiBadge variant="ghost">Ghost</span>
      <span uiBadge variant="link">Link</span>
    </div>`,
})
export class BadgeVariantsComponent {}

@Component({
  selector: "preview-badge-status",
  standalone: true,
  imports: [Badge],
  template: `
    <div class="flex flex-wrap gap-2">
      <span uiBadge variant="success">Success</span>
      <span uiBadge variant="warning">Warning</span>
      <span uiBadge variant="destructive">Error</span>
      <span uiBadge variant="info">Info</span>
    </div>`,
})
export class BadgeStatusComponent {}

@Component({
  selector: "preview-badge-solid",
  standalone: true,
  imports: [Badge],
  template: `
    <div class="flex flex-wrap gap-2">
      <span uiBadge variant="success-solid">Deployed</span>
      <span uiBadge variant="warning-solid">Expiring</span>
      <span uiBadge variant="info-solid">Beta</span>
      <span uiBadge variant="error-solid">Failed</span>
    </div>`,
})
export class BadgeSolidComponent {}

@Component({
  selector: "preview-badge-icon",
  standalone: true,
  imports: [Badge],
  template: `
    <div class="flex flex-wrap gap-2">
      <span uiBadge variant="success">
        <svg data-icon="inline-start" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
          <path d="M421-380 319-482q-7-7-17-7t-17 7q-7 7-7 17t7 17l115 116q9 9 20 9t20-9l232-232q7-7 7-17t-7-17q-7-7-17-7t-17 7L421-380ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/>
        </svg>
        Synced
      </span>
    </div>`,
})
export class BadgeIconComponent {}

// ---------------------------------------------------------------------------
// Button
// ---------------------------------------------------------------------------

@Component({
  selector: "preview-button-demo",
  standalone: true,
  imports: [Button],
  template: `
    <div class="flex flex-wrap items-center gap-2">
      <button uiButton variant="outline">Button</button>
      <button uiButton variant="outline" size="icon" aria-label="Submit">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
          <path d="M440-80v-647L256-543l-56-57 280-280 280 280-56 57-184-184v647h-80Z"/>
        </svg>
      </button>
    </div>`,
})
export class ButtonDemoComponent {}

@Component({ selector: "preview-button-default", standalone: true, imports: [Button],
  template: `<button uiButton>Default</button>` })
export class ButtonDefaultComponent {}

@Component({ selector: "preview-button-outline", standalone: true, imports: [Button],
  template: `<button uiButton variant="outline">Outline</button>` })
export class ButtonOutlineComponent {}

@Component({ selector: "preview-button-secondary", standalone: true, imports: [Button],
  template: `<button uiButton variant="secondary">Secondary</button>` })
export class ButtonSecondaryComponent {}

@Component({ selector: "preview-button-ghost", standalone: true, imports: [Button],
  template: `<button uiButton variant="ghost">Ghost</button>` })
export class ButtonGhostComponent {}

@Component({ selector: "preview-button-destructive", standalone: true, imports: [Button],
  template: `<button uiButton variant="destructive">Delete</button>` })
export class ButtonDestructiveComponent {}

@Component({ selector: "preview-button-link", standalone: true, imports: [Button],
  template: `<button uiButton variant="link">Link</button>` })
export class ButtonLinkComponent {}

@Component({
  selector: "preview-button-size",
  standalone: true,
  imports: [Button],
  template: `
    <div class="flex flex-col items-start gap-8 sm:flex-row">
      <div class="flex items-start gap-2">
        <button uiButton size="sm" variant="outline">Small</button>
        <button uiButton size="icon-sm" variant="outline" aria-label="Submit">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path d="M440-80v-647L256-543l-56-57 280-280 280 280-56 57-184-184v647h-80Z"/>
          </svg>
        </button>
      </div>
      <div class="flex items-start gap-2">
        <button uiButton variant="outline">Default</button>
        <button uiButton size="icon" variant="outline" aria-label="Submit">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path d="M440-80v-647L256-543l-56-57 280-280 280 280-56 57-184-184v647h-80Z"/>
          </svg>
        </button>
      </div>
      <div class="flex items-start gap-2">
        <button uiButton size="lg" variant="outline">Large</button>
        <button uiButton size="icon-lg" variant="outline" aria-label="Submit">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path d="M440-80v-647L256-543l-56-57 280-280 280 280-56 57-184-184v647h-80Z"/>
          </svg>
        </button>
      </div>
    </div>`,
})
export class ButtonSizeComponent {}

@Component({
  selector: "preview-button-icon",
  standalone: true,
  imports: [Button],
  template: `
    <button uiButton size="icon" variant="outline" aria-label="Settings">
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path d="M370-80q-16 0-28-10t-15-26l-19-117q-26-9-51.5-23.5T210-289l-109 45q-15 6-30 1t-23-19L6-381q-8-14-5-30t16-26l95-74q-3-14-4.5-28.5T106-568q0-14 1.5-28.5T112-625L17-699q-13-10-16-26t5-30l52-109q8-14 23-19t30 1l109 45q23-20 48.5-34.5T320-895l19-117q3-16 15-26t28-10h104q16 0 28 10t15 26l19 117q26 9 51.5 23.5T600-847l109-45q15-6 30-1t23 19l52 109q8 14 5 30t-16 26l-95 74q3 14 4.5 28.5t1.5 28.5q0 14-1.5 28.5T758-551l95 74q13 10 16 26t-5 30L812-312q-8 14-23 19t-30-1l-109-45q-23 20-48.5 34.5T550-281l-19 117q-3 16-15 26t-28 10H370Z"/>
      </svg>
    </button>`,
})
export class ButtonIconComponent {}

@Component({
  selector: "preview-button-with-icon",
  standalone: true,
  imports: [Button],
  template: `
    <button uiButton>
      <svg data-icon="inline-start" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path d="M197.69-140q-23.61 0-40.65-17.04T140-197.69v-564.62q0-23.61 17.04-40.65T197.69-820h451.85q11.61 0 22.73 4.81 11.11 4.81 18.73 12.42L802.77-691q7.61 7.62 12.42 18.73 4.81 11.12 4.81 22.73v451.85q0 23.61-17.04 40.65T762.31-140H197.69Z"/>
      </svg>
      Save version
    </button>`,
})
export class ButtonWithIconComponent {}

@Component({
  selector: "preview-button-spinner",
  standalone: true,
  imports: [Button],
  template: `
    <div class="flex flex-wrap items-center gap-3">
      <button uiButton [loading]="true">Saving…</button>
      <button uiButton variant="outline" [loading]="true">Syncing…</button>
    </div>`,
})
export class ButtonSpinnerComponent {}

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

@Component({
  selector: "preview-card-demo",
  standalone: true,
  imports: [Button, Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter],
  template: `
    <div uiCard class="w-full max-w-sm">
      <div uiCardHeader>
        <h3 uiCardTitle>Login to your account</h3>
        <p uiCardDescription>Enter your email below to login</p>
        <div uiCardAction><button uiButton variant="link">Sign Up</button></div>
      </div>
      <div uiCardContent>
        <div class="grid w-full items-center gap-4">
          <div class="flex flex-col space-y-1.5">
            <label class="text-sm font-medium" for="email">Email</label>
            <input id="email" type="email" placeholder="m@example.com"
              class="border-input bg-background placeholder:text-muted-foreground flex h-8 w-full rounded-md border px-3 py-1 text-sm shadow-sm" />
          </div>
          <div class="flex flex-col space-y-1.5">
            <label class="text-sm font-medium" for="password">Password</label>
            <input id="password" type="password"
              class="border-input bg-background flex h-8 w-full rounded-md border px-3 py-1 text-sm shadow-sm" />
          </div>
        </div>
      </div>
      <div uiCardFooter class="flex-col gap-2">
        <button uiButton class="w-full">Login</button>
        <button uiButton variant="outline" class="w-full">Login with Google</button>
      </div>
    </div>`,
})
export class CardDemoComponent {}

@Component({
  selector: "preview-card-small",
  standalone: true,
  imports: [Card, CardHeader, CardTitle, CardDescription, CardContent],
  template: `
    <div uiCard size="sm" class="w-full max-w-sm">
      <div uiCardHeader>
        <h3 uiCardTitle>Workspace settings</h3>
        <p uiCardDescription>Manage how this workspace syncs.</p>
      </div>
      <div uiCardContent>
        <p class="text-muted-foreground text-sm">Compact size card with reduced spacing.</p>
      </div>
    </div>`,
})
export class CardSmallComponent {}

// ---------------------------------------------------------------------------
// Separator
// ---------------------------------------------------------------------------

@Component({
  selector: "preview-separator-demo",
  standalone: true,
  imports: [Separator],
  template: `
    <div>
      <div class="space-y-1">
        <h4 class="text-sm font-medium leading-none">Radix Primitives</h4>
        <p class="text-muted-foreground text-sm">An open-source UI component library.</p>
      </div>
      <div uiSeparator class="my-4"></div>
      <div class="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <div uiSeparator orientation="vertical"></div>
        <div>Docs</div>
        <div uiSeparator orientation="vertical"></div>
        <div>Source</div>
      </div>
    </div>`,
})
export class SeparatorDemoComponent {}

@Component({
  selector: "preview-separator-vertical",
  standalone: true,
  imports: [Separator],
  template: `
    <div class="flex h-5 items-center space-x-4 text-sm">
      <div>Blog</div>
      <div uiSeparator orientation="vertical"></div>
      <div>Docs</div>
      <div uiSeparator orientation="vertical"></div>
      <div>Source</div>
    </div>`,
})
export class SeparatorVerticalComponent {}

// ---------------------------------------------------------------------------
// Skeleton
// ---------------------------------------------------------------------------

@Component({
  selector: "preview-skeleton-demo",
  standalone: true,
  imports: [Skeleton],
  template: `
    <div class="flex items-center space-x-4">
      <div uiSkeleton class="size-12 rounded-full"></div>
      <div class="space-y-2">
        <div uiSkeleton class="h-4 w-[250px]"></div>
        <div uiSkeleton class="h-4 w-[200px]"></div>
      </div>
    </div>`,
})
export class SkeletonDemoComponent {}

// ---------------------------------------------------------------------------
// Label
// ---------------------------------------------------------------------------

@Component({
  selector: "preview-label-demo",
  standalone: true,
  imports: [Label],
  template: `
    <div class="flex items-center space-x-2">
      <input id="terms" type="checkbox" class="size-4 rounded border" />
      <label uiLabel for="terms">Accept terms and conditions</label>
    </div>`,
})
export class LabelDemoComponent {}

// ---------------------------------------------------------------------------
// Kbd
// ---------------------------------------------------------------------------

@Component({
  selector: "preview-kbd-demo",
  standalone: true,
  imports: [Kbd],
  template: `
    <div class="flex items-center gap-2">
      <kbd uiKbd>Ctrl</kbd>
      <kbd uiKbd>⌘K</kbd>
      <kbd uiKbd>Ctrl + B</kbd>
    </div>`,
})
export class KbdDemoComponent {}

@Component({
  selector: "preview-kbd-group",
  standalone: true,
  imports: [Kbd, KbdGroup],
  template: `
    <span uiKbdGroup>
      <kbd uiKbd>Ctrl</kbd>
      <kbd uiKbd>Shift</kbd>
      <kbd uiKbd>P</kbd>
    </span>`,
})
export class KbdGroupPreviewComponent {}

@Component({
  selector: "preview-kbd-primary",
  standalone: true,
  imports: [Button, Kbd, KbdGroup],
  template: `
    <div class="flex items-center gap-4">
      <kbd uiKbd variant="default">⌘K</kbd>
      <button uiButton>
        Open palette
        <span uiKbdGroup data-icon="inline-end">
          <kbd uiKbd variant="primary">⌘</kbd>
          <kbd uiKbd variant="primary">K</kbd>
        </span>
      </button>
    </div>`,
})
export class KbdPrimaryComponent {}

// ---------------------------------------------------------------------------
// Spinner
// ---------------------------------------------------------------------------

@Component({
  selector: "preview-spinner-demo",
  standalone: true,
  imports: [Spinner],
  template: `<span uiSpinner></span>`,
})
export class SpinnerDemoComponent {}

@Component({
  selector: "preview-spinner-colors",
  standalone: true,
  imports: [Spinner],
  template: `
    <div class="flex items-center gap-4">
      <span uiSpinner color="default" size="md"></span>
      <span uiSpinner color="primary" size="md"></span>
      <div class="rounded-lg bg-primary p-2">
        <span uiSpinner color="onPrimary" size="md"></span>
      </div>
    </div>`,
})
export class SpinnerColorsComponent {}

@Component({
  selector: "preview-spinner-sizes",
  standalone: true,
  imports: [Spinner],
  template: `
    <div class="flex items-center gap-4">
      <span uiSpinner color="primary" size="xs"></span>
      <span uiSpinner color="primary" size="sm"></span>
      <span uiSpinner color="primary" size="md"></span>
      <span uiSpinner color="primary" size="lg"></span>
    </div>`,
})
export class SpinnerSizesComponent {}

@Component({
  selector: "preview-spinner-button",
  standalone: true,
  imports: [Button, Spinner],
  template: `
    <div class="flex flex-wrap items-center gap-3">
      <button uiButton [loading]="true">Submitting…</button>
      <button uiButton variant="outline" [loading]="true">Syncing…</button>
      <button uiButton variant="ghost">
        <span uiSpinner color="inherit" data-icon="inline-start"></span>
        Loading
      </button>
    </div>`,
})
export class SpinnerButtonComponent {}

// ---------------------------------------------------------------------------
// Registry map
// ---------------------------------------------------------------------------

export const EXAMPLES: Record<string, Type<unknown>> = {
  "badge-demo": BadgeDemoComponent,
  "badge-icon": BadgeIconComponent,
  "badge-solid": BadgeSolidComponent,
  "badge-status": BadgeStatusComponent,
  "badge-variants": BadgeVariantsComponent,
  "button-default": ButtonDefaultComponent,
  "button-demo": ButtonDemoComponent,
  "button-destructive": ButtonDestructiveComponent,
  "button-ghost": ButtonGhostComponent,
  "button-icon": ButtonIconComponent,
  "button-link": ButtonLinkComponent,
  "button-outline": ButtonOutlineComponent,
  "button-secondary": ButtonSecondaryComponent,
  "button-size": ButtonSizeComponent,
  "button-spinner": ButtonSpinnerComponent,
  "button-with-icon": ButtonWithIconComponent,
  "card-demo": CardDemoComponent,
  "card-small": CardSmallComponent,
  "kbd-demo": KbdDemoComponent,
  "kbd-group": KbdGroupPreviewComponent,
  "kbd-primary": KbdPrimaryComponent,
  "label-demo": LabelDemoComponent,
  "separator-demo": SeparatorDemoComponent,
  "separator-vertical": SeparatorVerticalComponent,
  "skeleton-demo": SkeletonDemoComponent,
  "spinner-button": SpinnerButtonComponent,
  "spinner-colors": SpinnerColorsComponent,
  "spinner-demo": SpinnerDemoComponent,
  "spinner-sizes": SpinnerSizesComponent,
}
