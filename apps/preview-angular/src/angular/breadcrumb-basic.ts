import { Component } from "@angular/core"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/angular-ui/breadcrumb"

@Component({
  selector: "preview-breadcrumb-basic",
  standalone: true,
  imports: [Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage],
  template: `<nav uiBreadcrumb>
    <ol uiBreadcrumbList>
      <li uiBreadcrumbItem>
        <a uiBreadcrumbLink href="#">Home</a>
      </li>
      <li uiBreadcrumbSeparator></li>
      <li uiBreadcrumbItem>
        <a uiBreadcrumbLink href="#">Components</a>
      </li>
      <li uiBreadcrumbSeparator></li>
      <li uiBreadcrumbItem>
        <span uiBreadcrumbPage>Breadcrumb</span>
      </li>
    </ol>
  </nav>`,
})
export class BreadcrumbBasicComponent {}

export default BreadcrumbBasicComponent
