import { Item, ItemContent, ItemMedia, ItemTitle } from "@/angular-ui/item"
import { Spinner } from "@/angular-ui/spinner"
import { Component } from "@angular/core"

// RTL convention for Angular previews: static Arabic labels + dir="rtl".
@Component({
  selector: "preview-spinner-rtl",
  standalone: true,
  imports: [Item, ItemMedia, ItemContent, ItemTitle, Spinner],
  template: `<div class="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]" dir="rtl">
    <div uiItem variant="muted" dir="rtl">
      <div uiItemMedia><span uiSpinner></span></div>
      <div uiItemContent><div uiItemTitle class="line-clamp-1">جارٍ التحميل…</div></div>
      <div uiItemContent class="flex-none justify-end">
        <span class="text-sm tabular-nums">٤٫٩٩</span>
      </div>
    </div>
  </div>`,
})
export class SpinnerRtlComponent {}

export default SpinnerRtlComponent
