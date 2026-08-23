import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/angular-ui/accordion"
import { Component } from "@angular/core"

@Component({
  selector: "preview-accordion-basic",
  standalone: true,
  imports: [Accordion, AccordionItem, AccordionTrigger, AccordionContent],
  template: ` <div uiAccordion class="w-full max-w-lg" [defaultValue]="['item-1']">
    <div uiAccordionItem value="item-1">
      <div uiAccordionTrigger>How do I reset my password?</div>
      <div uiAccordionContent>
        Click on 'Forgot Password' on the login page, enter your email address,
        and we'll send you a link to reset your password. The link will expire
        in 24 hours.
      </div>
    </div>
    <div uiAccordionItem value="item-2">
      <div uiAccordionTrigger>Can I change my subscription plan?</div>
      <div uiAccordionContent>
        Yes, you can upgrade or downgrade your plan at any time from your
        account settings. Changes will be reflected in your next billing cycle.
      </div>
    </div>
    <div uiAccordionItem value="item-3">
      <div uiAccordionTrigger>What payment methods do you accept?</div>
      <div uiAccordionContent>
        We accept all major credit cards, PayPal, and bank transfers. All
        payments are processed securely through our payment partners.
      </div>
    </div>
  </div>`,
})
export class AccordionBasicComponent {}

export default AccordionBasicComponent
