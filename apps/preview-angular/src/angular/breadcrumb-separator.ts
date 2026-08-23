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

// Material Symbols `fiber_manual_record` — the glyph behind the React
// example's DotIcon (apps/v4/examples/material-symbols-map.ts).
const DOT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M478-478ZM281.5-281.5Q200-363 200-480t81.5-198.5Q363-760 480-760t198.5 81.5Q760-597 760-480t-81.5 198.5Q597-200 480-200t-198.5-81.5Z"/></svg>`

@Component({
  selector: "preview-breadcrumb-separator",
  standalone: true,
  imports: [Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage],
  template: `<nav uiBreadcrumb>
    <ol uiBreadcrumbList>
      <li uiBreadcrumbItem>
        <a uiBreadcrumbLink href="/">Home</a>
      </li>
      <li uiBreadcrumbSeparator><span [innerHTML]="safeDot"></span></li>
      <li uiBreadcrumbItem>
        <a uiBreadcrumbLink href="/components">Components</a>
      </li>
      <li uiBreadcrumbSeparator><span [innerHTML]="safeDot"></span></li>
      <li uiBreadcrumbItem>
        <span uiBreadcrumbPage>Breadcrumb</span>
      </li>
    </ol>
  </nav>`,
})
export class BreadcrumbSeparatorDemoComponent {
  // Static bundled string — safe to bypass the sanitizer.
  protected readonly safeDot: SafeHtml =
    inject(DomSanitizer).bypassSecurityTrustHtml(DOT_SVG)
}

export default BreadcrumbSeparatorDemoComponent
