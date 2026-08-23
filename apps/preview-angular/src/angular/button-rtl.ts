import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"

// apps/v4/examples/base/button-rtl.tsx — the React example drives dir/labels
// from the language-selector translations (ar). Static Arabic labels +
// dir="rtl" render the same visual state. ArrowRightIcon = arrow_right,
// mirrored in RTL via rtl:rotate-180; PlusIcon = add.
@Component({
  selector: "preview-button-rtl",
  standalone: true,
  imports: [Button],
  template: `<div class="flex flex-wrap items-center gap-2 md:flex-row" dir="rtl">
    <button uiButton variant="outline">زر</button>
    <button uiButton variant="destructive">حذف</button>
    <button uiButton variant="outline">
      إرسال
      <svg
        data-icon="inline-end"
        aria-hidden="true"
        class="rtl:rotate-180"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
      >
        <path
          d="M415.32-301q-6.32 0-10.82-4.13-4.5-4.12-4.5-10.87v-328q0-6.75 4.64-10.88 4.63-4.12 10.81-4.12 1.55 0 10.55 5l158 158q3 3 5 7.06t2 8.94q0 4.87-2 8.94-2 4.06-5 7.06L426-306q-2 2-4.76 3.5-2.77 1.5-5.92 1.5Z"
        />
      </svg>
    </button>
    <button uiButton variant="outline" size="icon" aria-label="Add">
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
      >
        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
      </svg>
    </button>
    <button uiButton variant="secondary" [loading]="true">جاري التحميل</button>
  </div>`,
})
export class ButtonRtlComponent {}

export default ButtonRtlComponent
