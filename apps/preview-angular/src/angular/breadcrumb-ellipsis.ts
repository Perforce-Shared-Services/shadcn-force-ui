import { Component } from "@angular/core"

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/angular-ui/breadcrumb"

@Component({
  selector: "preview-breadcrumb-ellipsis",
  standalone: true,
  imports: [
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
    BreadcrumbEllipsis,
  ],
  template: `<nav uiBreadcrumb>
    <ol uiBreadcrumbList>
      <li uiBreadcrumbItem>
        <a uiBreadcrumbLink href="/">Home</a>
      </li>
      <li uiBreadcrumbSeparator></li>
      <li uiBreadcrumbItem>
        <span uiBreadcrumbEllipsis></span>
      </li>
      <li uiBreadcrumbSeparator></li>
      <li uiBreadcrumbItem>
        <a uiBreadcrumbLink href="/docs/components">Components</a>
      </li>
      <li uiBreadcrumbSeparator></li>
      <li uiBreadcrumbItem>
        <span uiBreadcrumbPage>Breadcrumb</span>
      </li>
    </ol>
  </nav>`,
})
export class BreadcrumbEllipsisDemoComponent {}

export default BreadcrumbEllipsisDemoComponent
