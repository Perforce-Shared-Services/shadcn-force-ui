import { ArrowUpRightIcon } from "@/examples/material-symbols"

import { Badge } from "@/registry/bases/radix/ui/badge"

export function BadgeAsLink() {
  return (
    <Badge asChild>
      <a href="#link">
        Open Link <ArrowUpRightIcon data-icon="inline-end" />
      </a>
    </Badge>
  )
}
