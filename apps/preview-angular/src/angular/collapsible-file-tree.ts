import { NgTemplateOutlet } from "@angular/common"
import { Button } from "@/angular-ui/button"
import { Card, CardContent, CardHeader } from "@/angular-ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/angular-ui/collapsible"
import { Tabs, TabsList, TabsTrigger } from "@/angular-ui/tabs"
import { Component, inject } from "@angular/core"
import { DomSanitizer, type SafeHtml } from "@angular/platform-browser"

type FileTreeItem = { name: string; items?: FileTreeItem[] }

const FILE_TREE: FileTreeItem[] = [
  {
    name: "components",
    items: [
      {
        name: "ui",
        items: [
          { name: "button.tsx" },
          { name: "card.tsx" },
          { name: "dialog.tsx" },
          { name: "input.tsx" },
          { name: "select.tsx" },
          { name: "table.tsx" },
        ],
      },
      { name: "login-form.tsx" },
      { name: "register-form.tsx" },
    ],
  },
  {
    name: "lib",
    items: [{ name: "utils.ts" }, { name: "cn.ts" }, { name: "api.ts" }],
  },
  {
    name: "hooks",
    items: [
      { name: "use-media-query.ts" },
      { name: "use-debounce.ts" },
      { name: "use-local-storage.ts" },
    ],
  },
  {
    name: "types",
    items: [{ name: "index.d.ts" }, { name: "api.d.ts" }],
  },
  {
    name: "public",
    items: [{ name: "favicon.ico" }, { name: "logo.svg" }, { name: "images" }],
  },
  { name: "app.tsx" },
  { name: "layout.tsx" },
  { name: "globals.css" },
  { name: "package.json" },
  { name: "tsconfig.json" },
  { name: "README.md" },
  { name: ".gitignore" },
]

// Material Symbols Rounded, inlined verbatim (trusted, static).
const CHEVRON_SVG = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m488-432 140-140q11-11 11-28t-11-28q-11-11-28-11t-28 11L432-568v-96q0-17-11.5-28.5T392-704q-17 0-28.5 11.5T352-664v192q0 17 11.5 28.5T392-432h192q17 0 28.5-11.5T624-472q0-17-11.5-28.5T584-512h-96Z"/></svg>`
const FOLDER_SVG = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h207q16 0 30.5 6t25.5 17l57 57h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Z"/></svg>`
const FILE_SVG = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520Z"/></svg>`

@Component({
  selector: "preview-collapsible-file-tree",
  standalone: true,
  imports: [
    Button,
    Card,
    CardHeader,
    CardContent,
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
    Tabs,
    TabsList,
    TabsTrigger,
    NgTemplateOutlet,
  ],
  template: `
    <div uiCard class="mx-auto w-full max-w-xs gap-2">
      <div uiCardHeader>
        <div uiTabs defaultValue="explorer">
          <div uiTabsList class="w-full">
            <button uiTabsTrigger value="explorer">Explorer</button>
            <button uiTabsTrigger value="outline">Outline</button>
          </div>
        </div>
      </div>
      <div uiCardContent>
        <div class="flex flex-col gap-1">
          <!-- Recursive renderer: folders become Collapsibles, files stay links.
               The template references itself, mirroring React's renderItem(). -->
          <ng-template #tree let-items>
            @for (item of items; track item.name) {
              @if (item.items) {
                <div uiCollapsible>
                  <button
                    uiButton
                    uiCollapsibleTrigger
                    variant="ghost"
                    size="sm"
                    class="group w-full justify-start transition-none hover:bg-accent hover:text-accent-foreground [&_svg]:fill-current [&_svg]:size-4"
                  >
                    <span class="[&_svg]:fill-current [&_svg]:size-4" [innerHTML]="chevronSvg"></span>
                    <span class="flex items-center gap-2 [&_svg]:fill-current [&_svg]:size-4" [innerHTML]="folderSvg"></span>
                    {{ item.name }}
                  </button>
                  <div uiCollapsibleContent class="mt-1 ml-5">
                    <div class="flex flex-col gap-1">
                      <ng-container
                        [ngTemplateOutlet]="tree"
                        [ngTemplateOutletContext]="{ $implicit: item.items }"
                      />
                    </div>
                  </div>
                </div>
              } @else {
                <button
                  uiButton
                  variant="link"
                  size="sm"
                  class="w-full justify-start gap-2 text-foreground [&_svg]:fill-current [&_svg]:size-4"
                >
                  <span class="[&_svg]:fill-current [&_svg]:size-4" [innerHTML]="fileSvg"></span>
                  <span>{{ item.name }}</span>
                </button>
              }
            }
          </ng-template>

          <ng-container
            [ngTemplateOutlet]="tree"
            [ngTemplateOutletContext]="{ $implicit: fileTree }"
          />
        </div>
      </div>
    </div>
  `,
})
export class CollapsibleFileTreeComponent {
  private readonly sanitizer = inject(DomSanitizer)

  readonly fileTree = FILE_TREE
  // Sanitizer-trusted inline SVGs — trusted, static markup bundled into the
  // demo, so bypassing is safe (Angular strips <svg> from raw [innerHTML]).
  readonly chevronSvg: SafeHtml =
    this.sanitizer.bypassSecurityTrustHtml(CHEVRON_SVG)
  readonly folderSvg: SafeHtml =
    this.sanitizer.bypassSecurityTrustHtml(FOLDER_SVG)
  readonly fileSvg: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(FILE_SVG)
}

export default CollapsibleFileTreeComponent
