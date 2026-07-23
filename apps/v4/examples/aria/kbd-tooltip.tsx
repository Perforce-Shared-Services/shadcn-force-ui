import { Button } from "@/styles/aria-force-ui/ui/button"
import { ButtonGroup } from "@/styles/aria-force-ui/ui/button-group"
import { Kbd, KbdGroup } from "@/styles/aria-force-ui/ui/kbd"
import { Tooltip, TooltipTrigger } from "@/styles/aria-force-ui/ui/tooltip"

export default function KbdTooltip() {
  return (
    <div className="flex flex-wrap gap-4">
      <ButtonGroup>
        <TooltipTrigger>
          <Button variant="outline">Save</Button>
          <Tooltip>
            Save Changes <Kbd>S</Kbd>
          </Tooltip>
        </TooltipTrigger>
        <TooltipTrigger>
          <Button variant="outline">Print</Button>
          <Tooltip>
            Print Document{" "}
            <KbdGroup>
              <Kbd>Ctrl</Kbd>
              <Kbd>P</Kbd>
            </KbdGroup>
          </Tooltip>
        </TooltipTrigger>
      </ButtonGroup>
    </div>
  )
}
