import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import chevronRightIcon from '@material-symbols/svg-400/rounded/chevron_right.svg?raw';
import descriptionIcon from '@material-symbols/svg-400/rounded/description.svg?raw';
import descriptionFillIcon from '@material-symbols/svg-400/rounded/description-fill.svg?raw';
import folderIcon from '@material-symbols/svg-400/rounded/folder.svg?raw';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/app/ui/breadcrumb';
import { RdxCollapsibleTriggerDirective } from '@radix-ng/primitives/collapsible';

import { Collapsible, CollapsibleContent } from '@/app/ui/collapsible';
import { Separator } from '@/app/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/app/ui/sidebar';

interface FileTreeNode {
  name: string;
  children?: FileTreeNode[];
  defaultOpen?: boolean;
  isActive?: boolean;
}

interface ChangedFile {
  file: string;
  state: string;
}

const deco = (svg: string) => svg.replace('<svg', '<svg aria-hidden="true" focusable="false"');

/**
 * Port of `@force-ui/sidebar-11` — a sidebar with an uncommitted-changes list
 * and a collapsible file tree. Composed entirely from `ui/sidebar` +
 * `ui/collapsible` — no new primitives, no new tokens.
 *
 * The file tree is recursive UI. Rather than a self-referencing standalone
 * component (valid in Angular, but a second `@Component` can't share a host
 * element with `SidebarMenuItemComponent`'s own `li[uiSidebarMenuItem]`), this
 * uses a self-referencing `<ng-template #treeNode>` + `*ngTemplateOutlet` —
 * `NgTemplateOutlet` is a directive, not a component, so it composes freely
 * alongside `uiSidebarMenuItem` on the same `<li>`. Solved once here for the
 * `sidebar-*` category's only recursive block.
 *
 * Registry deviation: the upstream `Tree()` renders a leaf's
 * `SidebarMenuButton` as a direct child of a `<ul>` with no `<li>` wrapper —
 * invalid list markup. Every row here is wrapped in `<li uiSidebarMenuItem>`,
 * matching `sidebar-01`'s own convention.
 *
 * Registry deviation 2: the chevron rotation
 * (`[&[data-state=open]>button>svg:first-child]:rotate-90`) targeted an
 * ancestor class string `ui/collapsible`'s root doesn't carry. Since
 * `data-state` lives on the trigger button itself, the button carries a local
 * `group/tree-toggle` marker and the chevron reads
 * `group-data-[state=open]/tree-toggle:rotate-90` instead — same visual
 * result, no extra JS-tracked boolean needed.
 *
 * The folder-row trigger applies the raw `[rdxCollapsibleTrigger]` (from
 * `@radix-ng/primitives/collapsible`) directly, not `ui/collapsible`'s own
 * `[uiCollapsibleTrigger]` wrapper — that wrapper is a `@Component`, and
 * stacking it with `uiSidebarMenuButton` (also a `@Component`) on one host
 * element is the same conflict two sibling porting agents independently hit
 * and fixed the same way while building `sidebar-02`/`sidebar-08` in this
 * batch. `data-state`/`aria-expanded`/the click toggle all still resolve via
 * DI against the ancestor `[uiCollapsible]` root regardless of which trigger
 * directive is used. `ui/sidebar/sidebar.stories.ts` still has the two-component
 * form (`<button uiSidebarMenuButton uiCollapsibleTrigger>`) — flagged as
 * follow-up debt for that file's owner, not fixed here (out of scope for a
 * block-porting branch).
 */
@Component({
  selector: 'app-block-sidebar-11',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    Collapsible,
    CollapsibleContent,
    RdxCollapsibleTriggerDirective,
    Separator,
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarInset,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
  ],
  template: `
    <div uiSidebarProvider class="h-screen overflow-hidden">
      <a
        href="#sidebar-11-main"
        class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:border focus:border-border focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >Skip to main content</a
      >
      <nav uiSidebar aria-label="File explorer">
        <div uiSidebarContent>
          <div uiSidebarGroup>
            <div uiSidebarGroupLabel [id]="'sidebar-11-changes-label'">Changes</div>
            <div uiSidebarGroupContent>
              <ul uiSidebarMenu [attr.aria-labelledby]="'sidebar-11-changes-label'">
                <li uiSidebarMenuItem *ngFor="let change of changes">
                  <button uiSidebarMenuButton>
                    <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="file"></span>
                    <span>{{ change.file }}</span>
                  </button>
                  <div uiSidebarMenuBadge>{{ change.state }}</div>
                </li>
              </ul>
            </div>
          </div>

          <div uiSidebarGroup>
            <div uiSidebarGroupLabel [id]="'sidebar-11-files-label'">Files</div>
            <div uiSidebarGroupContent>
              <ul uiSidebarMenu [attr.aria-labelledby]="'sidebar-11-files-label'">
                <li
                  uiSidebarMenuItem
                  *ngFor="let node of fileTree"
                  [ngTemplateOutlet]="treeNode"
                  [ngTemplateOutletContext]="{ $implicit: node }"
                ></li>
              </ul>
            </div>
          </div>
        </div>

        <button uiSidebarRail></button>
      </nav>

      <main uiSidebarInset id="sidebar-11-main">
        <header class="flex h-16 shrink-0 items-center gap-2 border-b border-border px-4">
          <button uiSidebarTrigger class="-ml-1"></button>
          <div uiSeparator orientation="vertical" class="mr-2 h-4 self-auto!"></div>
          <nav uiBreadcrumb>
            <ol uiBreadcrumbList>
              <li uiBreadcrumbItem class="hidden md:block">
                <a uiBreadcrumbLink href="javascript:void(0)">components</a>
              </li>
              <li uiBreadcrumbSeparator class="hidden md:block"></li>
              <li uiBreadcrumbItem class="hidden md:block">
                <a uiBreadcrumbLink href="javascript:void(0)">ui</a>
              </li>
              <li uiBreadcrumbSeparator class="hidden md:block"></li>
              <li uiBreadcrumbItem>
                <span uiBreadcrumbPage>button.tsx</span>
              </li>
            </ol>
          </nav>
        </header>
        <div class="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4">
          <div class="grid auto-rows-min gap-4 md:grid-cols-3">
            <div class="aspect-video rounded-xl bg-muted/50"></div>
            <div class="aspect-video rounded-xl bg-muted/50"></div>
            <div class="aspect-video rounded-xl bg-muted/50"></div>
          </div>
          <div class="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min"></div>
        </div>
      </main>
    </div>

    <ng-template #treeNode let-node>
      <ng-container *ngIf="node.children?.length; else leafTpl">
        <div uiCollapsible [open]="!!node.defaultOpen" class="contents">
          <button uiSidebarMenuButton rdxCollapsibleTrigger class="group/tree-toggle">
            <span
              class="transition-transform motion-reduce:transition-none group-data-[state=open]/tree-toggle:rotate-90 [&_svg]:size-4 [&_svg]:fill-current"
              [innerHTML]="chevronRight"
            ></span>
            <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="folder"></span>
            <span>{{ node.name }}</span>
          </button>
          <div
            uiCollapsibleContent
            class="overflow-hidden data-open:animate-collapsible-down data-closed:animate-collapsible-up motion-reduce:animate-none"
          >
            <ul uiSidebarMenuSub>
              <li
                uiSidebarMenuItem
                *ngFor="let child of node.children"
                [ngTemplateOutlet]="treeNode"
                [ngTemplateOutletContext]="{ $implicit: child }"
              ></li>
            </ul>
          </div>
        </div>
      </ng-container>
      <ng-template #leafTpl>
        <button uiSidebarMenuButton [isActive]="!!node.isActive">
          <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="node.isActive ? fileFill : file"></span>
          <span>{{ node.name }}</span>
        </button>
      </ng-template>
    </ng-template>
  `,
})
export class Sidebar11Block {
  private readonly sanitizer = inject(DomSanitizer);
  protected readonly chevronRight: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(chevronRightIcon));
  protected readonly folder: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(folderIcon));
  protected readonly file: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(descriptionIcon));
  protected readonly fileFill: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(descriptionFillIcon));

  protected readonly changes: ChangedFile[] = [
    { file: 'README.md', state: 'M' },
    { file: 'api/hello/route.ts', state: 'U' },
    { file: 'app/layout.tsx', state: 'M' },
  ];

  protected readonly fileTree: FileTreeNode[] = [
    {
      name: 'app',
      children: [
        {
          name: 'api',
          children: [
            { name: 'hello', children: [{ name: 'route.ts' }] },
            { name: 'page.tsx' },
            { name: 'layout.tsx' },
            { name: 'blog', children: [{ name: 'page.tsx' }] },
          ],
        },
      ],
    },
    {
      name: 'components',
      defaultOpen: true,
      children: [
        {
          name: 'ui',
          defaultOpen: true,
          children: [
            { name: 'button.tsx', isActive: true },
            { name: 'card.tsx' },
          ],
        },
        { name: 'header.tsx' },
        { name: 'footer.tsx' },
      ],
    },
    { name: 'lib', children: [{ name: 'util.ts' }] },
    { name: 'public', children: [{ name: 'favicon.ico' }, { name: 'vercel.svg' }] },
    { name: '.eslintrc.json' },
    { name: '.gitignore' },
    { name: 'next.config.js' },
    { name: 'tailwind.config.js' },
    { name: 'package.json' },
    { name: 'README.md' },
  ];
}
