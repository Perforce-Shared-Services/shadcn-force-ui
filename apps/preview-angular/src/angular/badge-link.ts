import { Badge } from "@/angular-ui/badge"
import { Component } from "@angular/core"

// Material Symbols glyph matching the React example's ArrowUpRightIcon.
const ARROW_UP_RIGHT_SVG = `<svg data-icon="inline-end" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M654-658 263-267q-9 9-21 9t-21-9q-9-9-9-21t9-21l391-391H264q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h420q12.75 0 21.38 8.62Q714-742.75 714-730v420q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37v-247Z"/></svg>`

// React wraps the badge in an anchor via `render={<a href="#link" />}`;
// the attribute-selector badge rides the native element directly.
// apps/v4/examples/base/badge-link.tsx
@Component({
  selector: "preview-badge-link",
  standalone: true,
  imports: [Badge],
  template: `<a uiBadge href="#link"
    >Open Link<span [innerHTML]="arrowSvg"></span></a
  >`,
})
export class BadgeAsLinkComponent {
  protected readonly arrowSvg = ARROW_UP_RIGHT_SVG
}

export default BadgeAsLinkComponent
