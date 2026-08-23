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
import { Button } from "@/angular-ui/button"
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "@/angular-ui/dropdown-menu"

// apps/v4/examples/base/breadcrumb-demo.tsx
@Component({
  selector: "preview-breadcrumb-demo",
  standalone: true,
  imports: [
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
    BreadcrumbEllipsis,
    Button,
    DropdownMenuRoot,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
  ],
  template: `<nav uiBreadcrumb>
    <ol uiBreadcrumbList>
      <li uiBreadcrumbItem>
        <a uiBreadcrumbLink href="#">Home</a>
      </li>
      <li uiBreadcrumbSeparator></li>
      <li uiBreadcrumbItem>
        <div uiDropdownMenuRoot>
          <button uiButton variant="ghost" size="icon-sm" uiDropdownMenuTrigger type="button">
            <span uiBreadcrumbEllipsis></span>
            <span class="sr-only">Toggle menu</span>
          </button>
          <div uiDropdownMenuContent>
            <div uiDropdownMenuGroup>
              <button uiDropdownMenuItem>Documentation</button>
              <button uiDropdownMenuItem>Themes</button>
              <button uiDropdownMenuItem>GitHub</button>
            </div>
          </div>
        </div>
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
export class BreadcrumbDemoComponent {}

export default BreadcrumbDemoComponent
