import { Component, signal } from "@angular/core"

import { Badge } from "@/angular-ui/badge"
import { Button } from "@/angular-ui/button"
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/angular-ui/drawer"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/angular-ui/field"
import { RadioGroup, RadioGroupItem } from "@/angular-ui/radio-group"

// apps/v4/examples/base/drawer-demo.tsx — delivery-time picker. The React
// version toasts "Delivery time confirmed" via sonner; the sonner port is
// pending, so confirming just closes the drawer.
const DELIVERY_TIMES = [
  {
    value: "asap",
    id: "delivery-asap",
    label: "Standard delivery",
    description: "25–35 min · Driver assigned now",
    badge: "Fastest",
  },
  {
    value: "5-00",
    id: "delivery-5-00",
    label: "5:00 PM – 5:15 PM",
    description: "Prep starts at 4:45 PM",
    badge: "",
  },
  {
    value: "5-30",
    id: "delivery-5-30",
    label: "5:30 PM – 5:45 PM",
    description: "Good if you're heading home",
    badge: "",
  },
  {
    value: "6-00",
    id: "delivery-6-00",
    label: "6:00 PM – 6:15 PM",
    description: "Most popular · High demand",
    badge: "",
  },
  {
    value: "6-30",
    id: "delivery-6-30",
    label: "6:30 PM – 6:45 PM",
    description: "Last slot before kitchen closes",
    badge: "",
  },
]

@Component({
  selector: "preview-drawer-demo",
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
    DrawerFooter,
    DrawerClose,
    Button,
    RadioGroup,
    RadioGroupItem,
    Field,
    FieldLabel,
    FieldContent,
    FieldTitle,
    FieldDescription,
    Badge,
  ],
  template: `<div uiDrawerRoot [(open)]="open">
  <button uiButton variant="secondary" uiDrawerTrigger>Open Drawer</button>
  <ng-template uiDrawerPortal>
    <div uiDrawerOverlay></div>
    <div uiDrawerContent direction="bottom">
      <div uiDrawerHeader>
        <h2 uiDrawerTitle>Pick a delivery time</h2>
        <p uiDrawerDescription>We'll prepare your order as soon as possible.</p>
      </div>
      <div class="flex-1 overflow-y-auto p-4">
        <div uiRadioGroup [value]="deliveryTime()" (valueChange)="deliveryTime.set($event)" class="gap-2">
          @for (time of deliveryTimes; track time.value) {
            <label uiFieldLabel [for]="time.id">
              <div uiField orientation="horizontal">
                <div uiFieldContent>
                  <span uiFieldTitle class="flex items-center gap-2">
                    {{ time.label }}
                    @if (time.badge) {
                      <span uiBadge variant="secondary">{{ time.badge }}</span>
                    }
                  </span>
                  <p uiFieldDescription>{{ time.description }}</p>
                </div>
                <button uiRadioGroupItem [value]="time.value" [id]="time.id"></button>
              </div>
            </label>
          }
        </div>
      </div>
      <div uiDrawerFooter>
        <button uiButton class="h-[34px]" (click)="confirm()">Confirm Delivery Time</button>
        <button uiButton variant="outline" uiDrawerClose>Cancel</button>
      </div>
    </div>
  </ng-template>
</div>`,
})
export class DrawerDemoComponent {
  protected readonly deliveryTimes = DELIVERY_TIMES
  protected readonly deliveryTime = signal("asap")
  protected readonly open = signal(false)

  // sonner toast pending the angular sonner port; close only.
  protected confirm(): void {
    this.open.set(false)
  }
}

export default DrawerDemoComponent
