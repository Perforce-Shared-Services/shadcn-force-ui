import { cva, type VariantProps } from "class-variance-authority"

// Force UI original — no React/radix registry stepper exists to mirror, so
// there are no cn-stepper* tokens in style-force-ui.css and the class strings
// live here inline (AGENT-PORTING-GUIDE: styles not covered by tokens are
// inlined at component level). Anatomy/base classes come from the shadcn-vue
// stepper; completed-state colour uses the force-ui status pair
// `success-solid`/`on-success` (same pairing as badge's success-solid).
//
// p4one used shorthand `data-vertical:` / `data-horizontal:` variants, which
// have no Tailwind definition here — resolved to explicit
// `data-[orientation=…]:` variants against each host's own data-orientation
// attribute (same approach as ui/item-separator).

export const stepperVariants = cva(
  "flex gap-2 data-[orientation=vertical]:flex-col"
)
export type StepperVariants = VariantProps<typeof stepperVariants>

export const stepperItemVariants = cva(
  // Dimming lives HERE once — not on trigger AND indicator (opacity would
  // compound across nested elements). Always a row; only the ROOT stacks rows
  // into a column for vertical mode.
  "group flex items-center gap-2 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
)
export type StepperItemVariants = VariantProps<typeof stepperItemVariants>

export const stepperTriggerVariants = cva(
  "flex flex-col items-center gap-1 rounded-md p-1 text-center outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none motion-reduce:transition-none data-[orientation=vertical]:flex-row data-[orientation=vertical]:items-center data-[orientation=vertical]:gap-2 data-[orientation=vertical]:text-left [&_svg]:pointer-events-none [&_svg]:fill-current"
)
export type StepperTriggerVariants = VariantProps<typeof stepperTriggerVariants>

export const stepperIndicatorVariants = cva(
  "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-sm font-medium text-muted-foreground transition-colors motion-reduce:transition-none data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=completed]:border-success-solid data-[state=completed]:bg-success-solid data-[state=completed]:text-on-success [&_svg]:size-4 [&_svg]:fill-current",
)
export type StepperIndicatorVariants = VariantProps<typeof stepperIndicatorVariants>

export const stepperTitleVariants = cva(
  "text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors motion-reduce:transition-none group-data-[state=active]:font-semibold group-data-[state=active]:text-foreground group-data-[state=completed]:text-foreground"
)
export type StepperTitleVariants = VariantProps<typeof stepperTitleVariants>

export const stepperDescriptionVariants = cva("text-xs text-muted-foreground")
export type StepperDescriptionVariants = VariantProps<typeof stepperDescriptionVariants>

export const stepperSeparatorVariants = cva(
  "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:flex-1 data-[orientation=horizontal]:mt-4 data-[orientation=vertical]:h-4 data-[orientation=vertical]:w-px data-[orientation=vertical]:ml-4"
)
export type StepperSeparatorVariants = VariantProps<typeof stepperSeparatorVariants>
