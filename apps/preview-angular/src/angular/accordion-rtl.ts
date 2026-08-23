import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/angular-ui/accordion"
import { Component } from "@angular/core"

@Component({
  selector: "preview-accordion-rtl",
  standalone: true,
  imports: [Accordion, AccordionItem, AccordionTrigger, AccordionContent],
  template: ` <div dir="rtl">
    <div
      uiAccordion
      type="single"
      collapsible
      class="w-full max-w-sm"
      [defaultValue]="['item-1']"
    >
      <div uiAccordionItem value="item-1">
        <div uiAccordionTrigger>ما هي الميزات الرئيسية؟</div>
        <div uiAccordionContent>
          يتضمن منتجنا كل ما تحتاجه للبدء، مع دعم كامل للغات متعددة وإعدادات
          قابلة للتخصيص بالكامل.
        </div>
      </div>
      <div uiAccordionItem value="item-2">
        <div uiAccordionTrigger>هل هو متوافق مع الأجهزة المحمولة؟</div>
        <div uiAccordionContent>
          نعم، يعمل بشكل كامل على جميع الأجهزة المحمولة وأحجام الشاشات المختلفة.
        </div>
      </div>
    </div>
  </div>`,
})
export class AccordionRtlComponent {}

export default AccordionRtlComponent
