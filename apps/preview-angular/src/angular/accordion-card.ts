import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/angular-ui/accordion"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/angular-ui/card"
import { Component } from "@angular/core"

@Component({
  selector: "preview-accordion-card",
  standalone: true,
  imports: [
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
  ],
  template: ` <div uiCard class="w-full max-w-sm">
    <div uiCardHeader>
      <div uiCardTitle>Subscription & Billing</div>
      <div uiCardDescription>
        Common questions about your account, plans, payments and cancellations.
      </div>
    </div>
    <div uiCardContent>
      <div uiAccordion [defaultValue]="['plans']">
        <div uiAccordionItem value="plans">
          <div uiAccordionTrigger>
            What subscription plans do you offer?
          </div>
          <div uiAccordionContent>
            We offer three subscription tiers: Starter ($9/month),
            Professional ($29/month), and Enterprise ($99/month). Each plan
            includes increasing storage limits, API access, priority support,
            and team collaboration features.
          </div>
        </div>
        <div uiAccordionItem value="billing">
          <div uiAccordionTrigger>How does billing work?</div>
          <div uiAccordionContent>
            Billing occurs automatically at the start of each billing cycle. We
            accept all major credit cards, PayPal, and ACH transfers for
            enterprise customers. You'll receive an invoice via email after
            each payment.
          </div>
        </div>
        <div uiAccordionItem value="cancel">
          <div uiAccordionTrigger>How do I cancel my subscription?</div>
          <div uiAccordionContent>
            You can cancel your subscription anytime from your account
            settings. There are no cancellation fees or penalties. Your access
            will continue until the end of your current billing period.
          </div>
        </div>
      </div>
    </div>
  </div>`,
})
export class AccordionCardComponent {}

export default AccordionCardComponent
