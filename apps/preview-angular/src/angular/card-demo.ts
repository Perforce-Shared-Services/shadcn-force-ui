import { Component } from "@angular/core"
import { ButtonComponent } from "@/angular-ui/button"
import {
  CardActionComponent,
  CardComponent,
  CardContentComponent,
  CardDescriptionComponent,
  CardFooterComponent,
  CardHeaderComponent,
  CardTitleComponent,
} from "@/angular-ui/card"

@Component({
  selector: "preview-card-demo",
  standalone: true,
  imports: [
    ButtonComponent,
    CardComponent, CardHeaderComponent, CardTitleComponent,
    CardDescriptionComponent, CardActionComponent,
    CardContentComponent, CardFooterComponent,
  ],
  template: `
    <div uiCard class="w-full max-w-sm">
      <div uiCardHeader>
        <h3 uiCardTitle>Login to your account</h3>
        <p uiCardDescription>Enter your email below to login</p>
        <div uiCardAction>
          <button uiButton variant="link">Sign Up</button>
        </div>
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
    </div>
  `,
})
export default class CardDemoComponent {}
