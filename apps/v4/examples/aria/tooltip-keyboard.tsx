import { SaveIcon } from "lucide-react"

import { Button } from "@/styles/aria-force-ui/ui/button"
import { Kbd } from "@/styles/aria-force-ui/ui/kbd"
import { Tooltip, TooltipTrigger } from "@/styles/aria-force-ui/ui/tooltip"

export function TooltipKeyboard() {
  return (
    <TooltipTrigger>
      <Button variant="outline" size="icon-sm">
        <SaveIcon />
      </Button>
      <Tooltip>
        Save Changes <Kbd>S</Kbd>
      </Tooltip>
    </TooltipTrigger>
  )
}
