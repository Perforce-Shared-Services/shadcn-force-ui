import { Badge } from "@/angular-ui/badge"
import { Component } from "@angular/core"

// Material Symbols glyphs matching the React RTL example (BadgeCheck /
// BookmarkIcon via apps/v4/examples/material-symbols-map.ts).
const VERIFIED_SVG = `<svg data-icon="inline-start" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m437-433-73-76q-9-10-22-10t-23 9q-10 10-10 23t10 23l97 96q9 9 21 9t21-9l183-182q9-9 9-22t-10-22q-9-8-21.5-7.5T598-593L437-433ZM332-84l-62-106-124-25q-11-2-18.5-12t-5.5-21l14-120-79-92q-8-8-8-20t8-20l79-91-14-120q-2-11 5.5-21t18.5-12l124-25 62-107q6-10 17-14t22 1l109 51 109-51q11-5 22-1.5t17 13.5l63 108 123 25q11 2 18.5 12t5.5 21l-14 120 79 91q8 8 8 20t-8 20l-79 92 14 120q2 11-5.5 21T814-215l-123 25-63 107q-6 10-17 13.5T589-71l-109-51-109 51q-11 5-22 1t-17-14Zm41-55 107-45 110 45 67-100 117-30-12-119 81-92-81-94 12-119-117-28-69-100-108 45-110-45-67 100-117 28 12 119-81 94 81 92-12 121 117 28 70 100Z"/></svg>`
const BOOKMARK_SVG = `<svg data-icon="inline-end" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m480-240-196 84q-30 13-57-4.76-27-17.75-27-50.24v-574q0-24 18-42t42-18h440q24 0 42 18t18 42v574q0 32.49-27 50.24Q706-143 676-156l-196-84Zm0-64 220 93v-574H260v574l220-93Zm0-481H260h440-220Z"/></svg>`

// The React example drives dir/labels from the language-selector translations
// (ar). Static Arabic labels + dir="rtl" render the same visual state.
// apps/v4/examples/base/badge-rtl.tsx
@Component({
  selector: "preview-badge-rtl",
  standalone: true,
  imports: [Badge],
  template: `<div class="flex w-full flex-wrap justify-center gap-2" dir="rtl">
    <span uiBadge>شارة</span>
    <span uiBadge variant="secondary">ثانوي</span>
    <span uiBadge variant="destructive">مدمر</span>
    <span uiBadge variant="outline">مخطط</span>
    <span uiBadge variant="secondary"
      ><span [innerHTML]="verifiedSvg"></span>متحقق</span
    >
    <span uiBadge variant="outline"
      >إشارة مرجعية<span [innerHTML]="bookmarkSvg"></span></span
    >
  </div>`,
})
export class BadgeRtlComponent {
  protected readonly verifiedSvg = VERIFIED_SVG
  protected readonly bookmarkSvg = BOOKMARK_SVG
}

export default BadgeRtlComponent
