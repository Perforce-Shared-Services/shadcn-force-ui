import { ItalicIcon } from "@/examples/material-symbols"

import { Toggle } from "@/registry/bases/base/ui/toggle"

export function ToggleText() {
  return (
    <Toggle aria-label="Toggle italic">
      <ItalicIcon />
      Italic
    </Toggle>
  )
}
