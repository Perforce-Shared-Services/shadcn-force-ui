import { Component } from "@angular/core"
import { Field, FieldContent, FieldDescription, FieldLabel } from "@/angular-ui/field"
import { Switch } from "@/angular-ui/switch"

@Component({
  selector: "preview-switch-rtl",
  standalone: true,
  imports: [Field, FieldContent, FieldLabel, FieldDescription, Switch],
  template: ` <div uiField orientation="horizontal" dir="rtl" class="max-w-sm">
    <div uiFieldContent>
      <label uiFieldLabel for="switch-focus-mode-rtl">
        المشاركة عبر الأجهزة
      </label>
      <p uiFieldDescription>
        يتم مشاركة التركيز عبر الأجهزة، ويتم إيقاف تشغيله عند مغادرة التطبيق.
      </p>
    </div>
    <button uiSwitch id="switch-focus-mode-rtl"></button>
  </div>`,
})
export class SwitchRtlComponent {}

export default SwitchRtlComponent
