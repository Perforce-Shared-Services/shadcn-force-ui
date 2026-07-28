import { IconGitBranch } from "@/examples/material-symbols"

import { Button } from "@/registry/bases/radix/ui/button"

export default function ButtonWithIcon() {
  return (
    <Button variant="outline" size="sm">
      <IconGitBranch /> New Branch
    </Button>
  )
}
