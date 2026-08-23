import { cva, type VariantProps } from "class-variance-authority"

// Force UI original — no React/radix registry questionnaire exists to mirror
// (p4one sourced it from shadcn's private "Base" registry), so there are no
// cn-questionnaire* tokens in style-force-ui.css and the class strings live
// here inline (AGENT-PORTING-GUIDE: styles not covered by tokens are inlined
// at component level).
//
// Style normalisation vs p4one (documented for DIVERGENCES.md):
// - Title uses the force-ui heading convention (`text-sm font-medium`) instead
//   of p4one's `cn-font-heading text-[1rem]` (no cn-font-heading token here).
// - Choice checked wash uses the force-ui pair `bg-primary/5 dark:bg-primary/10`
//   + `border-primary/30 dark:border-primary/20` (same as cn-field-label)
//   instead of p4one's app-private `bg-control-primary-wash` token.
// - Invalid ring matches cn-checkbox/cn-radio-group: `ring-destructive/20
//   dark:ring-destructive/40`.

export const questionnaireVariants = cva("flex w-full min-w-0 flex-col gap-2")
export type QuestionnaireVariants = VariantProps<typeof questionnaireVariants>

export const questionnaireProgressVariants = cva(
  // Text mode: "Question X of Y" counter. Steps mode (`steps` input) swaps to
  // a full-width row of bars rendered by questionnaire-progress.component.html.
  "min-w-[14ch] w-fit text-xs font-medium text-muted-foreground tabular-nums data-[steps]:flex data-[steps]:w-full data-[steps]:min-w-0 data-[steps]:items-center data-[steps]:gap-1.5"
)
export type QuestionnaireProgressVariants = VariantProps<typeof questionnaireProgressVariants>

export const questionnaireItemVariants = cva(
  "flex min-w-0 flex-col gap-4 border-0 p-0 outline-none"
)
export type QuestionnaireItemVariants = VariantProps<typeof questionnaireItemVariants>

export const questionnaireTitleVariants = cva(
  "text-pretty text-sm font-medium leading-snug text-foreground"
)
export type QuestionnaireTitleVariants = VariantProps<typeof questionnaireTitleVariants>

export const questionnaireDescriptionVariants = cva(
  "text-pretty text-sm text-muted-foreground"
)
export type QuestionnaireDescriptionVariants = VariantProps<
  typeof questionnaireDescriptionVariants
>

export const questionnaireChoicesVariants = cva(
  "group/questionnaire-choices grid min-w-0 gap-2"
)
export type QuestionnaireChoicesVariants = VariantProps<typeof questionnaireChoicesVariants>

export const questionnaireChoiceVariants = cva(
  "group/questionnaire-choice relative flex w-full cursor-pointer items-start gap-2.5 rounded-lg border border-border px-3 py-2.5 text-start outline-none select-none transition-colors motion-reduce:transition-none" +
    " not-data-disabled:not-data-checked:hover:bg-muted" +
    " has-[:focus-visible]:border-ring has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50" +
    " data-checked:border-primary/30 data-checked:bg-primary/5 dark:data-checked:border-primary/20 dark:data-checked:bg-primary/10" +
    " data-invalid:border-destructive data-invalid:ring-3 data-invalid:ring-destructive/20 dark:data-invalid:ring-destructive/40" +
    " data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50"
)
export type QuestionnaireChoiceVariants = VariantProps<typeof questionnaireChoiceVariants>

export const questionnaireChoiceDescriptionVariants = cva(
  "text-sm font-normal text-muted-foreground"
)
export type QuestionnaireChoiceDescriptionVariants = VariantProps<
  typeof questionnaireChoiceDescriptionVariants
>

export const questionnaireErrorVariants = cva("text-sm text-destructive")
export type QuestionnaireErrorVariants = VariantProps<typeof questionnaireErrorVariants>

export const questionnaireActionsVariants = cva(
  // Upstream grid layout kept verbatim from p4one: Previous (start), Skip
  // (middle), Next/Submit (end) overlap the same cells via col-start/row-start.
  "grid min-h-11 w-full grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2"
)
export type QuestionnaireActionsVariants = VariantProps<typeof questionnaireActionsVariants>

export const questionnaireActionBase =
  "min-h-11 sm:min-h-0 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:fill-current"

export const questionnaireInputBase = "min-h-11 sm:min-h-0"
