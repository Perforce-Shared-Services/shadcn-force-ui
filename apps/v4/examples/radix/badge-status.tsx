import { Badge } from "@/registry/bases/radix/ui/badge"

export function BadgeStatus() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">Success</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="warning">Warning</Badge>
    </div>
  )
}
