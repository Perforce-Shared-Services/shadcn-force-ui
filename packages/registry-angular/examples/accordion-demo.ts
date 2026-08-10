import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/accordion"
import { Component } from "@angular/core"

@Component({
  selector: "preview-accordion-demo",
  standalone: true,
  imports: [Accordion, AccordionItem, AccordionTrigger, AccordionContent],
  template: ` <div
    uiAccordion
    type="single"
    collapsible
    class="w-full max-w-sm"
  >
    <div uiAccordionItem value="item-1">
      <div uiAccordionTrigger>Is it accessible?</div>
      <div uiAccordionContent>
        Yes. It adheres to the WAI-ARIA design pattern.
      </div>
    </div>
    <div uiAccordionItem value="item-2">
      <div uiAccordionTrigger>Is it styled?</div>
      <div uiAccordionContent>
        Yes. It comes with default styles that match the other components.
      </div>
    </div>
    <div uiAccordionItem value="item-3">
      <div uiAccordionTrigger>Is it animated?</div>
      <div uiAccordionContent>
        Yes. It's animated by default, but you can disable it if you prefer.
      </div>
    </div>
  </div>`,
})
export class AccordionDemoComponent {}

export default AccordionDemoComponent
