import { Button } from "@/styles/aria-force-ui/ui/button"
import { Tooltip, TooltipTrigger } from "@/styles/aria-force-ui/ui/tooltip"

export function TooltipDemo() {
  return (
    <TooltipTrigger>
      <Button variant="outline">Hover</Button>
      <Tooltip>
        <p>Add to library</p>
      </Tooltip>
    </TooltipTrigger>
  )
}
