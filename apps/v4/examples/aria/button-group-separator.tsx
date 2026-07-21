import { Button } from "@/styles/aria-force-ui/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/styles/aria-force-ui/ui/button-group"

export default function ButtonGroupSeparatorDemo() {
  return (
    <ButtonGroup>
      <Button variant="secondary" size="sm">
        Copy
      </Button>
      <ButtonGroupSeparator />
      <Button variant="secondary" size="sm">
        Paste
      </Button>
    </ButtonGroup>
  )
}
