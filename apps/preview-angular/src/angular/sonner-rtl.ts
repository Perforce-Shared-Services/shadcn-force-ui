import { Component } from "@angular/core"

import { toast, Toaster } from "@/angular-ui/sonner"
import { Button } from "@/angular-ui/button"

/** Right-to-left rendering: static Arabic labels with `dir="rtl"`. */
@Component({
  selector: "preview-sonner-rtl",
  standalone: true,
  imports: [Toaster, Button],
  template: `
    <div dir="rtl">
      <ui-sonner-toaster position="bottom-left" />
      <div class="flex flex-wrap gap-2">
        <button uiButton variant="outline" (click)="fire()">حفظ الإصدار</button>
      </div>
    </div>
  `,
})
export class SonnerRtlComponent {
  protected fire() {
    toast("تم حفظ الإصدار", {
      description: "الاثنين، ٣ يناير في ٦:٠٠ مساءً",
    })
  }
}

export default SonnerRtlComponent
