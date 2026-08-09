import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core"
import { DomSanitizer, type SafeHtml } from "@angular/platform-browser"
import {
  injectAccordionItemContext,
  RdxAccordionHeaderDirective,
  RdxAccordionItemDirective,
  RdxAccordionPanelDirective,
  RdxAccordionRootDirective,
  RdxAccordionTriggerDirective,
} from "@radix-ng/primitives/accordion"

import { cn } from "@/lib/utils"

const CHEVRON_DOWN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"/></svg>`

/**
 * Angular port of @force-ui/accordion (radix-force-ui style).
 * Uses @radix-ng/primitives v1.x API.
 *
 * Usage:
 *   <div uiAccordion [multiple]="false">
 *     <div uiAccordionItem value="item-1">
 *       <div uiAccordionTrigger>Is it accessible?</div>
 *       <div uiAccordionContent>Yes. It uses WAI-ARIA design patterns.</div>
 *     </div>
 *   </div>
 *
 * Note: v1.x uses [multiple] instead of type="single"|"multiple" + collapsible.
 */
@Component({
  selector: "[uiAccordion]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxAccordionRootDirective,
      inputs: ["value", "defaultValue", "multiple", "disabled", "orientation"],
      outputs: ["valueChange", "onValueChange"],
    },
  ],
  host: {
    "data-slot": "accordion",
    "[class]": "classes()",
  },
})
export class AccordionComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() => cn("flex w-full flex-col", this.className()))
}

@Component({
  selector: "[uiAccordionItem]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxAccordionItemDirective,
      inputs: ["value", "disabled"],
      outputs: ["onOpenChange"],
    },
  ],
  host: {
    "data-slot": "accordion-item",
    "[class]": "classes()",
  },
})
export class AccordionItemComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() => cn("cn-accordion-item border-border", this.className()))
}

@Component({
  selector: "[uiAccordionTrigger]",
  standalone: true,
  imports: [RdxAccordionTriggerDirective],
  template: `<button
  rdxAccordionTrigger
  type="button"
  data-slot="accordion-trigger"
  [class]="classes()"
>
  <span class="group-hover/accordion-trigger:underline"><ng-content /></span>
  <span
    class="pointer-events-none inline-flex shrink-0 text-muted-foreground transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-180 group-aria-expanded/accordion-trigger:text-foreground motion-reduce:transition-none [&>svg]:size-5 [&>svg]:fill-current"
    data-slot="accordion-trigger-icon"
    aria-hidden="true"
    [innerHTML]="chevronIcon"
  ></span>
</button>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [RdxAccordionHeaderDirective],
  host: {
    "data-slot": "accordion-header",
    "class": "flex",
  },
})
export class AccordionTriggerComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly chevronIcon: SafeHtml =
    inject(DomSanitizer).bypassSecurityTrustHtml(CHEVRON_DOWN_SVG)

  protected readonly classes = computed(() =>
    cn("cn-accordion-trigger flex flex-1 items-center justify-between font-medium outline-none", this.className())
  )
}

@Component({
  selector: "[uiAccordionContent]",
  standalone: true,
  template: `<div class="cn-accordion-content-inner [&_a]:underline [&_a]:underline-offset-3">
  <ng-content />
</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [RdxAccordionPanelDirective],
  host: {
    "data-slot": "accordion-content",
    "class": "cn-accordion-content overflow-hidden",
  },
})
export class AccordionContentComponent {}
