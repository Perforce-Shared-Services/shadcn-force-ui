import { Button } from "@/angular-ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/angular-ui/card"
import { Input } from "@/angular-ui/input"
import { Label } from "@/angular-ui/label"
import { ToggleGroup, ToggleGroupItem } from "@/angular-ui/toggle-group"
import { Component, signal } from "@angular/core"

// apps/v4/examples/base/card-spacing.tsx
@Component({
  selector: "preview-card-spacing",
  standalone: true,
  imports: [Button, Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label, ToggleGroup, ToggleGroupItem],
  template: `<div class="mx-auto grid w-full max-w-sm gap-4">
    <div uiToggleGroup type="single" [value]="spacing()" variant="outline" size="sm" class="justify-center" (valueChange)="onSpacing($event)">
      <button uiToggleGroupItem value="4">16px</button>
      <button uiToggleGroupItem value="5">20px</button>
      <button uiToggleGroupItem value="6">24px</button>
      <button uiToggleGroupItem value="8">32px</button>
    </div>
    <div uiCard class="w-full max-w-sm" [style.--card-spacing.px]="cardSpacingPx()">
      <div uiCardHeader>
        <h3 uiCardTitle>Login to your account</h3>
        <p uiCardDescription>Enter your email below to login to your account</p>
        <div uiCardAction><button uiButton variant="link">Sign Up</button></div>
      </div>
      <div uiCardContent>
        <form>
          <div class="flex flex-col gap-6">
            <div class="grid gap-2">
              <label uiLabel for="email-spacing">Email</label>
              <input uiInput id="email-spacing" type="email" placeholder="m@example.com" required />
            </div>
            <div class="grid gap-2">
              <div class="flex items-center">
                <label uiLabel for="password-spacing">Password</label>
                <a href="#" class="ms-auto inline-block text-sm underline-offset-4 hover:underline">Forgot your password?</a>
              </div>
              <input uiInput id="password-spacing" type="password" required />
            </div>
          </div>
        </form>
      </div>
      <div uiCardFooter class="flex-col gap-2">
        <button uiButton type="submit" class="w-full">Login</button>
        <button uiButton variant="outline" class="w-full">Login with Google</button>
      </div>
    </div>
  </div>`,
})
export class CardSpacingComponent {
  readonly spacing = signal("4")
  // Tailwind's --spacing(4) == 0.25rem per unit; drive the CSS var directly.
  readonly cardSpacingPx = signal(16)

  onSpacing(value: unknown): void {
    const first = Array.isArray(value) ? (value[0] as string | undefined) : (value as string | undefined)
    if (!first) return
    this.spacing.set(first)
    this.cardSpacingPx.set(Number(first) * 4)
  }
}

export default CardSpacingComponent
