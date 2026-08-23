import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/angular-ui/accordion"
import { Component } from "@angular/core"

@Component({
  selector: "preview-accordion-borders",
  standalone: true,
  imports: [Accordion, AccordionItem, AccordionTrigger, AccordionContent],
  template: ` <div
    uiAccordion
    class="max-w-lg rounded-lg border"
    [defaultValue]="['billing']"
  >
    <div uiAccordionItem value="billing" class="border-b px-4 last:border-b-0">
      <div uiAccordionTrigger>How does billing work?</div>
      <div uiAccordionContent>
        We offer monthly and annual subscription plans. Billing is charged at
        the beginning of each cycle, and you can cancel anytime. All plans
        include automatic backups, 24/7 support, and unlimited team members.
      </div>
    </div>
    <div
      uiAccordionItem
      value="security"
      class="border-b px-4 last:border-b-0"
    >
      <div uiAccordionTrigger>Is my data secure?</div>
      <div uiAccordionContent>
        Yes. We use end-to-end encryption, SOC 2 Type II compliance, and regular
        third-party security audits. All data is encrypted at rest and in
        transit using industry-standard protocols.
      </div>
    </div>
    <div
      uiAccordionItem
      value="integration"
      class="border-b px-4 last:border-b-0"
    >
      <div uiAccordionTrigger>What integrations do you support?</div>
      <div uiAccordionContent>
        We integrate with 500+ popular tools including Slack, Zapier,
        Salesforce, HubSpot, and more. You can also build custom integrations
        using our REST API and webhooks.
      </div>
    </div>
  </div>`,
})
export class AccordionBordersComponent {}

export default AccordionBordersComponent
