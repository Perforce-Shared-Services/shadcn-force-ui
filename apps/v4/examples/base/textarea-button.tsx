import { Button } from "@/registry/bases/base/ui/button"
import { Textarea } from "@/registry/bases/base/ui/textarea"

export function TextareaButton() {
  return (
    <div className="grid w-full gap-2">
      <Textarea placeholder="Type your message here." />
      <Button>Send message</Button>
    </div>
  )
}
