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
import { Component } from "@angular/core"

@Component({
  selector: "preview-card-demo",
  standalone: true,
  imports: [
    Button,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardAction,
    CardContent,
    CardFooter,
  ],
  template: ` <div uiCard class="w-full max-w-sm">
    <div uiCardHeader>
      <h3 uiCardTitle>Login to your account</h3>
      <p uiCardDescription>Enter your email below to login</p>
      <div uiCardAction><button uiButton variant="link">Sign Up</button></div>
    </div>
    <div uiCardContent>
      <div class="grid w-full items-center gap-4">
        <div class="flex flex-col space-y-1.5">
          <label class="text-sm font-medium" for="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="m@example.com"
            class="flex h-8 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground"
          />
        </div>
      </div>
    </div>
    <div uiCardFooter class="flex-col gap-2">
      <button uiButton class="w-full">Login</button>
      <button uiButton variant="outline" class="w-full">
        Login with Google
      </button>
    </div>
  </div>`,
})
export class CardDemoComponent {}

export default CardDemoComponent
