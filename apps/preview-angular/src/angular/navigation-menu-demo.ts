import { Component } from "@angular/core"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuContentAnchor,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/angular-ui/navigation-menu"

// Material Symbols icons for the "With Icon" panel
// (React example's CircleAlertIcon / CircleDashedIcon / CircleCheckIcon).
const CIRCLE_ALERT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>`
const CIRCLE_DASHED_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M356-173q-41-15-76.5-39.5T216-268l59-43q21 24 47.5 42t53.5 29l-20 67Zm148 22v-68q102-14 169-90t67-175q0-105-70-180t-174-76q-104 1-174 76t-70 179H84q0-81 31.5-153T199-759q52-52 124-83t157-31q82 0 155 31t127 84q54 53 85 126t31 155q0 133-86 231T504-151ZM120-400q0-75 28.5-140.5T227-753l48 48q-41 41-64 94t-23 111h-68Z"/></svg>`
const CIRCLE_CHECK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-635L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z"/></svg>`

// apps/v4/examples/base/navigation-menu-demo.tsx — 1:1 translation. The JSX
// maps are written out explicitly; the shared ListItem shape becomes a small
// template snippet per entry (same classes: title `leading-none font-medium`,
// description `line-clamp-2 text-muted-foreground`).
@Component({
  selector: "preview-navigation-menu-demo",
  standalone: true,
  imports: [
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContentAnchor,
    NavigationMenuContent,
    NavigationMenuLink,
    NavigationMenuViewport,
  ],
  template: `<div uiNavigationMenu>
  <ul uiNavigationMenuList>
    <li uiNavigationMenuItem value="getting-started">
      <button uiNavigationMenuTrigger>Getting started</button>
      <ng-template uiNavigationMenuContent>
        <div uiNavigationMenuContent>
          <ul class="w-96">
            <li>
              <a uiNavigationMenuLink href="/docs">
                <div class="flex flex-col gap-1 text-sm">
                  <div class="leading-none font-medium">Introduction</div>
                  <div class="line-clamp-2 text-muted-foreground">Re-usable components built with Tailwind CSS.</div>
                </div>
              </a>
            </li>
            <li>
              <a uiNavigationMenuLink href="/docs/installation">
                <div class="flex flex-col gap-1 text-sm">
                  <div class="leading-none font-medium">Installation</div>
                  <div class="line-clamp-2 text-muted-foreground">How to install dependencies and structure your app.</div>
                </div>
              </a>
            </li>
            <li>
              <a uiNavigationMenuLink href="/docs/primitives/typography">
                <div class="flex flex-col gap-1 text-sm">
                  <div class="leading-none font-medium">Typography</div>
                  <div class="line-clamp-2 text-muted-foreground">Styles for headings, paragraphs, lists...etc</div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </ng-template>
    </li>

    <li uiNavigationMenuItem value="components" class="hidden md:flex">
      <button uiNavigationMenuTrigger>Components</button>
      <ng-template uiNavigationMenuContent>
        <div uiNavigationMenuContent>
          <ul class="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
            <li>
              <a uiNavigationMenuLink href="/docs/primitives/alert-dialog">
                <div class="flex flex-col gap-1 text-sm">
                  <div class="leading-none font-medium">Alert Dialog</div>
                  <div class="line-clamp-2 text-muted-foreground">A modal dialog that interrupts the user with important content and expects a response.</div>
                </div>
              </a>
            </li>
            <li>
              <a uiNavigationMenuLink href="/docs/primitives/hover-card">
                <div class="flex flex-col gap-1 text-sm">
                  <div class="leading-none font-medium">Hover Card</div>
                  <div class="line-clamp-2 text-muted-foreground">For sighted users to preview content available behind a link.</div>
                </div>
              </a>
            </li>
            <li>
              <a uiNavigationMenuLink href="/docs/primitives/progress">
                <div class="flex flex-col gap-1 text-sm">
                  <div class="leading-none font-medium">Progress</div>
                  <div class="line-clamp-2 text-muted-foreground">Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.</div>
                </div>
              </a>
            </li>
            <li>
              <a uiNavigationMenuLink href="/docs/primitives/scroll-area">
                <div class="flex flex-col gap-1 text-sm">
                  <div class="leading-none font-medium">Scroll-area</div>
                  <div class="line-clamp-2 text-muted-foreground">Visually or semantically separates content.</div>
                </div>
              </a>
            </li>
            <li>
              <a uiNavigationMenuLink href="/docs/primitives/tabs">
                <div class="flex flex-col gap-1 text-sm">
                  <div class="leading-none font-medium">Tabs</div>
                  <div class="line-clamp-2 text-muted-foreground">A set of layered sections of content—known as tab panels—that are displayed one at a time.</div>
                </div>
              </a>
            </li>
            <li>
              <a uiNavigationMenuLink href="/docs/primitives/tooltip">
                <div class="flex flex-col gap-1 text-sm">
                  <div class="leading-none font-medium">Tooltip</div>
                  <div class="line-clamp-2 text-muted-foreground">A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.</div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </ng-template>
    </li>

    <li uiNavigationMenuItem value="with-icon">
      <button uiNavigationMenuTrigger>With Icon</button>
      <ng-template uiNavigationMenuContent>
        <div uiNavigationMenuContent>
          <ul class="grid w-[200px]">
            <li>
              <a uiNavigationMenuLink href="#" class="flex-row items-center gap-2 [&_svg]:fill-current">
                <svg aria-hidden="true" class="size-4" [innerHTML]="circleAlert"></svg>
                Backlog
              </a>
              <a uiNavigationMenuLink href="#" class="flex-row items-center gap-2 [&_svg]:fill-current">
                <svg aria-hidden="true" class="size-4" [innerHTML]="circleDashed"></svg>
                To Do
              </a>
              <a uiNavigationMenuLink href="#" class="flex-row items-center gap-2 [&_svg]:fill-current">
                <svg aria-hidden="true" class="size-4" [innerHTML]="circleCheck"></svg>
                Done
              </a>
            </li>
          </ul>
        </div>
      </ng-template>
    </li>

    <li uiNavigationMenuItem value="docs">
      <a uiNavigationMenuLink href="/docs" [class]="triggerStyle">Docs</a>
    </li>
  </ul>
  <div uiNavigationMenuViewport></div>
</div>`,
})
export class NavigationMenuDemoComponent {
  protected readonly circleAlert = CIRCLE_ALERT_SVG
  protected readonly circleDashed = CIRCLE_DASHED_SVG
  protected readonly circleCheck = CIRCLE_CHECK_SVG
  // navigationMenuTriggerStyle() — style a plain link like a trigger.
  protected readonly triggerStyle = navigationMenuTriggerStyle()
}

export default NavigationMenuDemoComponent
