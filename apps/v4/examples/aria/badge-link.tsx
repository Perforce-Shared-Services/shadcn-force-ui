import { ArrowUpRightIcon } from "lucide-react"

import { Badge } from "@/styles/aria-force-ui/ui/badge"

export function BadgeAsLink() {
  return (
    <Badge render={(props) => <a {...props} href="#link" />}>
      Open Link <ArrowUpRightIcon data-icon="inline-end" />
    </Badge>
  )
}
