// [FORCE-UI] Angular port convention: static Arabic labels + dir="rtl"
// (the React example uses a client-side translation hook).
import { Field, FieldDescription, FieldLabel } from "@/angular-ui/field"
import { Textarea } from "@/angular-ui/textarea"
import { Component } from "@angular/core"

@Component({
  selector: "preview-textarea-rtl",
  standalone: true,
  imports: [Field, FieldDescription, FieldLabel, Textarea],
  template: `
    <div uiField class="w-full max-w-xs" dir="rtl">
      <label uiFieldLabel for="feedback" dir="rtl">التعليقات</label>
      <textarea
        uiTextarea
        id="feedback"
        placeholder="تعليقاتك تساعدنا على التحسين..."
        dir="rtl"
        rows="4"
      ></textarea>
      <p uiFieldDescription dir="rtl">شاركنا أفكارك حول خدمتنا.</p>
    </div>
  `,
})
export class TextareaRtlComponent {}

export default TextareaRtlComponent
