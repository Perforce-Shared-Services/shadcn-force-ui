import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/app/ui/breadcrumb';
import { Button } from '@/app/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectRootDirective,
  SelectTrigger,
  SelectValue,
  SelectValueDirective,
} from '@/app/ui/select';
import { Separator } from '@/app/ui/separator';
import { SidebarTrigger } from '@/app/ui/sidebar';

import { DASHBOARD01_ICONS } from './dashboard-01.icons';

/**
 * The `dashboard-01` block's site header: sidebar trigger + breadcrumb, a
 * GitHub link button, and a "Select a theme" control on the far right.
 *
 * The theme select is a demo stub (single "Default" option, no-op) — same
 * no-op-control convention as the sidebar's dark-mode switch. It exists in
 * the real Figma frame as a placeholder for a theming feature this Block
 * doesn't implement.
 */
@Component({
  selector: 'app-block-dashboard-01-site-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    Button,
    Select,
    SelectContent,
    SelectItem,
    SelectRootDirective,
    SelectTrigger,
    SelectValue,
    SelectValueDirective,
    Separator,
    SidebarTrigger,
  ],
  template: `
    <header class="flex h-16 shrink-0 items-center gap-2 border-b border-border px-4">
      <button uiSidebarTrigger class="-ml-1"></button>
      <div uiSeparator orientation="vertical" class="mr-2 h-4 self-auto!"></div>
      <nav uiBreadcrumb>
        <ol uiBreadcrumbList>
          <li uiBreadcrumbItem class="hidden md:block">
            <a uiBreadcrumbLink href="javascript:void(0)">Building Your Application</a>
          </li>
          <li uiBreadcrumbSeparator class="hidden md:block"></li>
          <li uiBreadcrumbItem>
            <span uiBreadcrumbPage>Documents</span>
          </li>
        </ol>
      </nav>
      <div class="ml-auto flex items-center gap-2">
        <a
          uiButton
          variant="ghost"
          size="sm"
          class="hidden sm:flex"
          href="https://github.com/Perforce-Shared-Services/pd-p4one"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View this project on GitHub"
        >
          <span aria-hidden="true" focusable="false" [innerHTML]="githubIcon"></span>
          GitHub
        </a>
        <div rdxSelect defaultValue="default" (onValueChange)="theme.set($event)" [matchTriggerWidth]="true">
          <button rdxSelectTrigger size="sm" aria-label="Select a theme" class="w-32">
            <span rdxSelectValue placeholder="Select a theme"></span>
          </button>
          <div rdxSelectContent>
            <button rdxSelectItem value="default">Default</button>
          </div>
        </div>
      </div>
    </header>
  `,
})
export class Dashboard01SiteHeaderComponent {
  private readonly sanitizer = inject(DomSanitizer);

  /** Demo-only theme value — this control has no real theming logic to drive (see class doc comment). */
  protected readonly theme = signal('default');

  protected readonly githubIcon: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(DASHBOARD01_ICONS.github);
}
