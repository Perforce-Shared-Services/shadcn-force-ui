import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/angular-ui/accordion"
import { Component } from "@angular/core"

@Component({
  selector: "preview-accordion-disabled",
  standalone: true,
  imports: [Accordion, AccordionItem, AccordionTrigger, AccordionContent],
  template: ` <div uiAccordion class="w-full">
    <div uiAccordionItem value="item-1">
      <div uiAccordionTrigger>Can I access my account history?</div>
      <div uiAccordionContent>
        Yes, you can view your complete account history including all
        transactions, plan changes, and support tickets in the Account History
        section of your dashboard.
      </div>
    </div>
    <div uiAccordionItem value="item-2" [disabled]="true">
      <div uiAccordionTrigger>Premium feature information</div>
      <div uiAccordionContent>
        This section contains information about premium features. Upgrade your
        plan to access this content.
      </div>
    </div>
    <div uiAccordionItem value="item-3">
      <div uiAccordionTrigger>How do I update my email address?</div>
      <div uiAccordionContent>
        You can update your email address in your account settings. You'll
        receive a verification email at your new address to confirm the change.
      </div>
    </div>
  </div>`,
})
export class AccordionDisabledComponent {}

export default AccordionDisabledComponent
