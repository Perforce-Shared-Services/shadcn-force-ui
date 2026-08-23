import { Component, signal } from "@angular/core"

import { Button } from "@/angular-ui/button"
import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/angular-ui/drawer"
import { Input } from "@/angular-ui/input"
import { Label } from "@/angular-ui/label"

// apps/v4/examples/base/drawer-dialog.tsx — responsive dialog pattern: the
// React version renders a Dialog on desktop (md+) and this Drawer on mobile.
// The angular dialog port is pending, so the preview shows the drawer half;
// the Callout on the docs page documents the deviation.
@Component({
  selector: "preview-drawer-dialog",
  standalone: true,
  imports: [
    DrawerRoot,
    DrawerTrigger,
    DrawerPortal,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    Button,
    Input,
    Label,
  ],
  template: `<div uiDrawerRoot [(open)]="open">
  <button uiButton variant="outline" uiDrawerTrigger>Edit Profile</button>
  <ng-template uiDrawerPortal>
    <div uiDrawerOverlay></div>
    <div uiDrawerContent direction="bottom">
      <div uiDrawerHeader class="text-left">
        <h2 uiDrawerTitle>Edit profile</h2>
        <p uiDrawerDescription>Make changes to your profile here. Click save when you're done.</p>
      </div>
      <form class="grid items-start gap-6 p-4" (submit)="submit($event)">
        <div class="grid gap-3">
          <label uiLabel for="drawer-dialog-email">Email</label>
          <input uiInput type="email" id="drawer-dialog-email" value="shadcn@example.com" />
        </div>
        <div class="grid gap-3">
          <label uiLabel for="drawer-dialog-username">Username</label>
          <input uiInput id="drawer-dialog-username" value="@shadcn" />
        </div>
        <button uiButton type="submit">Save changes</button>
      </form>
    </div>
  </ng-template>
</div>`,
})
export class DrawerDialogComponent {
  protected readonly open = signal(false)

  protected submit(event: Event): void {
    event.preventDefault()
    this.open.set(false)
  }
}

export default DrawerDialogComponent
