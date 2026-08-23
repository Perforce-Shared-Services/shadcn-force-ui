import { Badge } from "@/angular-ui/badge"
import { Component } from "@angular/core"

// apps/v4/examples/base/badge-colors.tsx
@Component({
  selector: "preview-badge-colors",
  standalone: true,
  imports: [Badge],
  template: `<div class="flex flex-wrap gap-2">
    <span uiBadge class="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
      >Blue</span
    ><span
      uiBadge
      class="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
      >Green</span
    ><span uiBadge class="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300"
      >Sky</span
    ><span
      uiBadge
      class="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
      >Purple</span
    ><span uiBadge class="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
      >Red</span
    >
  </div>`,
})
export class BadgeCustomColorsComponent {}

export default BadgeCustomColorsComponent
