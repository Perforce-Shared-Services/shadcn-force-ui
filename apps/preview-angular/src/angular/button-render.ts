import { Component } from "@angular/core"

import { buttonVariants } from "@/angular-ui/button"

// apps/v4/examples/base/button-render.tsx — anchor styled through the
// variants function directly (no component class needed on the host).
@Component({
  selector: "preview-button-render",
  standalone: true,
  template: `<a href="#" [class]="variants">Login</a>`,
})
export class ButtonRenderComponent {
  readonly variants = buttonVariants({ variant: "secondary", size: "sm" })
}

export default ButtonRenderComponent
