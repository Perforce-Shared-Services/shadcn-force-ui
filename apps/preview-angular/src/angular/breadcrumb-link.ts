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
  selector: "preview-breadcrumb-link",
  standalone: true,
  imports: [Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage],
  // The React example renders BreadcrumbLink through a routing Link component;
  // the attribute selector keeps the host a plain <a>, which is the idiomatic
  // Angular equivalent (swap in RouterLink via the host as needed).
  template: `<nav uiBreadcrumb>
    <ol uiBreadcrumbList>
      <li uiBreadcrumbItem>
        <a uiBreadcrumbLink href="#link-component">Home</a>
      </li>
      <li uiBreadcrumbSeparator></li>
      <li uiBreadcrumbItem>
        <a uiBreadcrumbLink href="#link-component">Components</a>
      </li>
      <li uiBreadcrumbSeparator></li>
      <li uiBreadcrumbItem>
        <span uiBreadcrumbPage>Breadcrumb</span>
      </li>
    </ol>
  </nav>`,
})
export class BreadcrumbLinkDemoComponent {}

export default BreadcrumbLinkDemoComponent
