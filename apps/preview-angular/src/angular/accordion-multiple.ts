import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/angular-ui/accordion"
import { Component } from "@angular/core"

@Component({
  selector: "preview-accordion-multiple",
  standalone: true,
  imports: [Accordion, AccordionItem, AccordionTrigger, AccordionContent],
  template: ` <div uiAccordion [multiple]="true" class="w-full max-w-lg">
    <div uiAccordionItem value="item-1">
      <div uiAccordionTrigger>Product information</div>
      <div uiAccordionContent>
        Our flagship product combines cutting-edge features with an intuitive
        interface. It's designed for teams of all sizes and scales with your
        needs.
      </div>
    </div>
    <div uiAccordionItem value="item-2">
      <div uiAccordionTrigger>Shipping options</div>
      <div uiAccordionContent>
        We offer worldwide shipping through trusted partners. Standard shipping
        takes 5-7 business days, while express delivery arrives within 2-3
        business days.
      </div>
    </div>
    <div uiAccordionItem value="item-3">
      <div uiAccordionTrigger>Return policy</div>
      <div uiAccordionContent>
        We offer a 30-day money-back guarantee on all purchases. If you're not
        satisfied, contact our support team for a hassle-free return process.
      </div>
    </div>
  </div>`,
})
export class AccordionMultipleComponent {}

export default AccordionMultipleComponent
