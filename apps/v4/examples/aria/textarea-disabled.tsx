import { Field, FieldLabel } from "@/styles/aria-force-ui/ui/field"
import { Textarea } from "@/styles/aria-force-ui/ui/textarea"

export function TextareaDisabled() {
  return (
    <Field data-disabled>
      <FieldLabel htmlFor="textarea-disabled">Message</FieldLabel>
      <Textarea
        id="textarea-disabled"
        placeholder="Type your message here."
        disabled
      />
    </Field>
  )
}
