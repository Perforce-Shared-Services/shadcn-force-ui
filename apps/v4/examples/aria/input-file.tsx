import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/styles/aria-force-ui/ui/field"
import { Input } from "@/styles/aria-force-ui/ui/input"

export function InputFile() {
  return (
    <Field>
      <FieldLabel htmlFor="picture">Picture</FieldLabel>
      <Input id="picture" type="file" />
      <FieldDescription>Select a picture to upload.</FieldDescription>
    </Field>
  )
}
