import { Component, inject } from "@angular/core"
import { DomSanitizer, type SafeHtml } from "@angular/platform-browser"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/angular-ui/breadcrumb"
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "@/angular-ui/dropdown-menu"

// Material Symbols glyphs matching the React RTL example (DotIcon /
// ChevronDownIcon via apps/v4/examples/material-symbols-map.ts).
const DOT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M478-478ZM281.5-281.5Q200-363 200-480t81.5-198.5Q363-760 480-760t198.5 81.5Q760-597 760-480t-81.5 198.5Q597-200 480-200t-198.5-81.5Z"/></svg>`
const CHEVRON_DOWN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M469-358q-5-2-10-7L261-563q-9-9-8.5-21.5T262-606q9-9 21.5-9t21.5 9l175 176 176-176q9-9 21-8.5t21 9.5q9 9 9 21.5t-9 21.5L501-365q-5 5-10 7t-11 2q-6 0-11-2Z"/></svg>`

// The React example drives dir/labels from the language-selector translations
// (ar). Static Arabic labels + dir="rtl" render the same visual state.
@Component({
  selector: "preview-breadcrumb-rtl",
  standalone: true,
  imports: [
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
    DropdownMenuRoot,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
  ],
  template: `<nav uiBreadcrumb dir="rtl">
    <ol uiBreadcrumbList>
      <li uiBreadcrumbItem>
        <a uiBreadcrumbLink href="/">الرئيسية</a>
      </li>
      <li uiBreadcrumbSeparator><span [innerHTML]="safeDot"></span></li>
      <li uiBreadcrumbItem>
        <div uiDropdownMenuRoot>
          <button class="flex items-center gap-1" uiDropdownMenuTrigger type="button">
            المكونات
            <span data-icon="inline-end" aria-hidden="true" class="inline-flex size-3.5"><span [innerHTML]="safeChevronDown"></span></span>
          </button>
          <div uiDropdownMenuContent>
            <div uiDropdownMenuGroup>
              <button uiDropdownMenuItem>التوثيق</button>
              <button uiDropdownMenuItem>السمات</button>
              <button uiDropdownMenuItem>GitHub</button>
            </div>
          </div>
        </div>
      </li>
      <li uiBreadcrumbSeparator><span [innerHTML]="safeDot"></span></li>
      <li uiBreadcrumbItem>
        <span uiBreadcrumbPage>مسار التنقل</span>
      </li>
    </ol>
  </nav>`,
})
export class BreadcrumbRtlComponent {
  protected readonly safeDot: SafeHtml =
    inject(DomSanitizer).bypassSecurityTrustHtml(DOT_SVG)
  protected readonly safeChevronDown: SafeHtml =
    inject(DomSanitizer).bypassSecurityTrustHtml(CHEVRON_DOWN_SVG)
}
