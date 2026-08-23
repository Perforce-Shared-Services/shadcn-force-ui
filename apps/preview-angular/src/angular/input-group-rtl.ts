import { Component } from "@angular/core"

import { Label } from "@/angular-ui/label"
import { Spinner } from "@/angular-ui/spinner"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea } from "@/angular-ui/input-group"

// Static Arabic content matching the React example's "ar" translation; the
// preview's direction="rtl" flips the layout. Field wrappers are inlined
// (Field not yet ported).
@Component({
  selector: "preview-input-group-rtl",
  standalone: true,
  imports: [Label, Spinner, InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea],
  template: `
    <div class="grid w-full max-w-sm gap-6">
      <div uiInputGroup class="max-w-xs">
        <input uiInputGroupInput placeholder="بحث..." />
        <div uiInputGroupAddon>
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path d="M378-329q-108.16 0-183.08-75Q120-479 120-585t75-181q75-75 181.5-75t181 75Q632-691 632-584.85 632-542 618-502q-14 40-42 75l242 240q9 8.56 9 21.78T818-143q-9 9-22.22 9-13.22 0-21.78-9L533-384q-30 26-69.96 40.5Q423.08-329 378-329Zm-1-60q81.25 0 138.13-57.5Q572-504 572-585t-56.87-138.5Q458.25-781 377-781q-82.08 0-139.54 57.5Q180-666 180-585t57.46 138.5Q294.92-389 377-389Z" />
          </svg>
        </div>
        <div uiInputGroupAddon align="inline-end">١٢ نتيجة</div>
      </div>
      <div uiInputGroup>
        <input uiInputGroupInput placeholder="جاري البحث..." />
        <div uiInputGroupAddon align="inline-end">
          <span uiSpinner></span>
        </div>
      </div>
      <div uiInputGroup>
        <input uiInputGroupInput placeholder="جاري حفظ التغييرات..." />
        <div uiInputGroupAddon align="inline-end">
          <span uiInputGroupText>جاري البحث...</span>
          <span uiSpinner></span>
        </div>
      </div>
      <div data-slot="field-group" class="max-w-sm flex w-full flex-col gap-5">
        <div data-slot="field" role="group" class="flex w-full flex-col gap-2">
          <label uiLabel for="rtl-textarea">منطقة النص</label>
          <div uiInputGroup>
            <textarea uiInputGroupTextarea id="rtl-textarea" placeholder="اكتب تعليقًا..."></textarea>
            <div uiInputGroupAddon align="block-end">
              <span uiInputGroupText>٠/٢٨٠</span>
              <button uiInputGroupButton variant="default" size="sm" class="ms-auto">نشر</button>
            </div>
          </div>
          <p class="text-muted-foreground text-left text-sm leading-normal font-normal">
            تذييل موضع أسفل منطقة النص.
          </p>
        </div>
      </div>
    </div>
  `,
})
export class InputGroupRtlComponent {}

export default InputGroupRtlComponent
