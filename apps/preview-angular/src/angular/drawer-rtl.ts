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

// apps/v4/examples/base/drawer-rtl.tsx — the delivery-time drawer rendered
// under dir="rtl" with Arabic labels (React drives the labels from the
// language-selector translations; static strings render the same state).

const TIMES = [
  {
    value: "asap",
    id: "delivery-rtl-asap",
    label: "توصيل قياسي",
    description: "25–35 دقيقة · تم تعيين السائق الآن",
    badge: "الأسرع",
  },
  {
    value: "5-00",
    id: "delivery-rtl-5-00",
    label: "5:00 م – 5:15 م",
    description: "يبدأ التحضير في 4:45 م",
    badge: "",
  },
  {
    value: "5-30",
    id: "delivery-rtl-5-30",
    label: "5:30 م – 5:45 م",
    description: "مناسب إذا كنت في الطريق إلى المنزل",
    badge: "",
  },
]

@Component({
  selector: "preview-drawer-rtl",
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
  template: `<div uiDrawerRoot dir="rtl" [(open)]="open">
  <button uiButton variant="secondary" uiDrawerTrigger>فتح الدرج</button>
  <ng-template uiDrawerPortal>
    <div uiDrawerOverlay></div>
    <div uiDrawerContent direction="bottom">
      <div uiDrawerHeader>
        <h2 uiDrawerTitle>اختر وقت التوصيل</h2>
        <p uiDrawerDescription>سنجهز طلبك في أقرب وقت ممكن.</p>
      </div>
      <div class="flex-1 overflow-y-auto p-4">
        <div uiRadioGroup [value]="time()" (valueChange)="time.set($event)" class="gap-2">
          @for (t of times; track t.value) {
            <label uiFieldLabel [for]="t.id">
              <div uiField orientation="horizontal">
                <div uiFieldContent>
                  <span uiFieldTitle class="flex items-center gap-2">
                    {{ t.label }}
                    @if (t.badge) {
                      <span uiBadge variant="secondary">{{ t.badge }}</span>
                    }
                  </span>
                  <p uiFieldDescription>{{ t.description }}</p>
                </div>
                <button uiRadioGroupItem [value]="t.value" [id]="t.id"></button>
              </div>
            </label>
          }
        </div>
      </div>
      <div uiDrawerFooter>
        <button uiButton class="h-[34px]" (click)="open.set(false)">تأكيد وقت التوصيل</button>
        <button uiButton variant="outline" uiDrawerClose>إلغاء</button>
      </div>
    </div>
  </ng-template>
</div>`,
})
export class DrawerRtlComponent {
  protected readonly times = TIMES
  protected readonly time = signal("asap")
  protected readonly open = signal(false)
}

export default DrawerRtlComponent
