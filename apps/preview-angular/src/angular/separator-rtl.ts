import { Component } from "@angular/core"

import { Separator } from "@/angular-ui/separator"

// apps/v4/examples/base/separator-rtl.tsx — static Arabic labels + dir="rtl"
// render the same visual state as the React language-selector-driven example.
@Component({
  selector: "preview-separator-rtl",
  standalone: true,
  imports: [Separator],
  template: `<div class="flex max-w-sm flex-col gap-4 text-sm" dir="rtl">
    <div class="flex flex-col gap-1.5">
      <div class="leading-none font-medium">shadcn/ui</div>
      <div class="text-muted-foreground">الأساس لنظام التصميم الخاص بك</div>
    </div>
    <div uiSeparator></div>
    <div>مجموعة من المكونات المصممة بشكل جميل يمكنك تخصيصها وتوسيعها والبناء عليها.</div>
  </div>`,
})
export class SeparatorRtlComponent {}

export default SeparatorRtlComponent
