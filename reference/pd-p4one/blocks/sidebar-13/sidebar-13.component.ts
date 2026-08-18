import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import notificationsIconRaw from '@material-symbols/svg-400/rounded/notifications.svg?raw';
import notificationsFillIconRaw from '@material-symbols/svg-400/rounded/notifications-fill.svg?raw';
import menuIconRaw from '@material-symbols/svg-400/rounded/menu.svg?raw';
import menuFillIconRaw from '@material-symbols/svg-400/rounded/menu-fill.svg?raw';
import homeIconRaw from '@material-symbols/svg-400/rounded/home.svg?raw';
import homeFillIconRaw from '@material-symbols/svg-400/rounded/home-fill.svg?raw';
import brushIconRaw from '@material-symbols/svg-400/rounded/brush.svg?raw';
import brushFillIconRaw from '@material-symbols/svg-400/rounded/brush-fill.svg?raw';
import chatBubbleIconRaw from '@material-symbols/svg-400/rounded/chat_bubble.svg?raw';
import chatBubbleFillIconRaw from '@material-symbols/svg-400/rounded/chat_bubble-fill.svg?raw';
import globeIconRaw from '@material-symbols/svg-400/rounded/globe.svg?raw';
import globeFillIconRaw from '@material-symbols/svg-400/rounded/globe-fill.svg?raw';
import keyboardIconRaw from '@material-symbols/svg-400/rounded/keyboard.svg?raw';
import keyboardFillIconRaw from '@material-symbols/svg-400/rounded/keyboard-fill.svg?raw';
import checkIconRaw from '@material-symbols/svg-400/rounded/check.svg?raw';
import checkFillIconRaw from '@material-symbols/svg-400/rounded/check-fill.svg?raw';
import videocamIconRaw from '@material-symbols/svg-400/rounded/videocam.svg?raw';
import videocamFillIconRaw from '@material-symbols/svg-400/rounded/videocam-fill.svg?raw';
import linkIconRaw from '@material-symbols/svg-400/rounded/link.svg?raw';
import linkFillIconRaw from '@material-symbols/svg-400/rounded/link-fill.svg?raw';
import lockIconRaw from '@material-symbols/svg-400/rounded/lock.svg?raw';
import lockFillIconRaw from '@material-symbols/svg-400/rounded/lock-fill.svg?raw';
import settingsIconRaw from '@material-symbols/svg-400/rounded/settings.svg?raw';
import settingsFillIconRaw from '@material-symbols/svg-400/rounded/settings-fill.svg?raw';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/app/ui/breadcrumb';
import { Button } from '@/app/ui/button';
import { DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/app/ui/dialog';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/app/ui/sidebar';

interface SettingsNavItem {
  name: string;
  icon: SafeHtml;
  iconFill: SafeHtml;
}

// Decorative icons: sr-only labels/text already carry the accessible name.
const deco = (svg: string) => svg.replace('<svg', '<svg aria-hidden="true" focusable="false"');

/**
 * Port of `@force-ui/sidebar-13` — "A sidebar in a dialog". Unlike every
 * other sidebar-* block, this one is NOT a full-page shell: `page.tsx` is a
 * two-line wrapper around `settings-dialog.tsx`, whose real content is a
 * `ui/dialog` panel containing a `ui/sidebar` (`collapsible="none"`) as the
 * settings section list, plus a content pane with a breadcrumb.
 *
 * Because the composed content lives INSIDE the dialog's `<ng-template>`,
 * this component skips `sidebar-01`/`10`/`12`'s page-level a11y baseline
 * (skip-to-content link, `id`-linked main landmark) — those exist for a
 * top-level route, not a modal's internal content. The settings nav still
 * gets a `nav[uiSidebar]` landmark + `aria-label` so it's identifiable
 * within the dialog, and every row is a single `<button>` (no nested
 * anchor), matching the no-nested-interactive-elements rule.
 *
 * The registry source has NO click handler on the nav rows at all — the
 * `isActive` flag is a hardcoded `item.name === "Messages & media"` and the
 * `<a href="#">` does nothing. Reproducing that literally would ship a list
 * of dead buttons, which fails basic operability for no reason (this isn't
 * "inventing a fake backend call", it's local UI state a nav list should
 * always have). Kept minimal: a `activeSection` signal that a click updates,
 * driving both the row's `isActive` state and the breadcrumb's trailing
 * page label — same shape as the registry's static default ("Messages &
 * media" selected on open).
 *
 * `DialogContent`'s default close (X) button is left enabled (registry
 * doesn't override `showCloseButton`), and `DialogTitle`/`DialogDescription`
 * are `sr-only` exactly as in the registry — the dialog has no visible
 * heading, its name comes from the hidden title per `ui/dialog`'s
 * `aria-labelledby` wiring.
 */
@Component({
  selector: 'app-block-sidebar-13',
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
    Button,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
  ],
  template: `
    <div class="flex h-full items-center justify-center">
      <button uiButton size="sm" [rdxDialogTrigger]="settingsDialog" [rdxDialogConfig]="{ ariaLabel: 'Settings' }">
        Open Dialog
      </button>

      <ng-template #settingsDialog>
        <div rdxDialogContent class="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
          <h2 rdxDialogTitle class="sr-only">Settings</h2>
          <p rdxDialogDescription class="sr-only">Customize your settings here.</p>

          <div uiSidebarProvider class="items-start">
            <nav uiSidebar aria-label="Settings sections" collapsible="none" class="hidden md:flex">
              <div uiSidebarContent>
                <div uiSidebarGroup>
                  <div uiSidebarGroupContent>
                    <ul uiSidebarMenu>
                      <li uiSidebarMenuItem *ngFor="let item of navItems">
                        <button
                          uiSidebarMenuButton
                          [isActive]="item.name === activeSection()"
                          (click)="activeSection.set(item.name)"
                        >
                          <span
                            class="[&_svg]:size-4 [&_svg]:fill-current"
                            [innerHTML]="item.name === activeSection() ? item.iconFill : item.icon"
                          ></span>
                          <span>{{ item.name }}</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </nav>

            <main class="flex h-[480px] flex-1 flex-col overflow-hidden">
              <header class="flex h-16 shrink-0 items-center gap-2">
                <div class="flex items-center gap-2 px-4">
                  <nav uiBreadcrumb>
                    <ol uiBreadcrumbList>
                      <li uiBreadcrumbItem class="hidden md:block">
                        <a uiBreadcrumbLink href="javascript:void(0)">Settings</a>
                      </li>
                      <li uiBreadcrumbSeparator class="hidden md:block"></li>
                      <li uiBreadcrumbItem>
                        <span uiBreadcrumbPage>{{ activeSection() }}</span>
                      </li>
                    </ol>
                  </nav>
                </div>
              </header>
              <div class="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
                <div *ngFor="let cell of placeholderCells" class="aspect-video max-w-3xl rounded-xl bg-muted/50"></div>
              </div>
            </main>
          </div>
        </div>
      </ng-template>
    </div>
  `,
})
export class Sidebar13Block {
  private readonly sanitizer = inject(DomSanitizer);

  private icon(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(deco(svg));
  }

  protected readonly navItems: SettingsNavItem[] = [
    { name: 'Notifications', icon: this.icon(notificationsIconRaw), iconFill: this.icon(notificationsFillIconRaw) },
    { name: 'Navigation', icon: this.icon(menuIconRaw), iconFill: this.icon(menuFillIconRaw) },
    { name: 'Home', icon: this.icon(homeIconRaw), iconFill: this.icon(homeFillIconRaw) },
    { name: 'Appearance', icon: this.icon(brushIconRaw), iconFill: this.icon(brushFillIconRaw) },
    { name: 'Messages & media', icon: this.icon(chatBubbleIconRaw), iconFill: this.icon(chatBubbleFillIconRaw) },
    { name: 'Language & region', icon: this.icon(globeIconRaw), iconFill: this.icon(globeFillIconRaw) },
    { name: 'Accessibility', icon: this.icon(keyboardIconRaw), iconFill: this.icon(keyboardFillIconRaw) },
    { name: 'Mark as read', icon: this.icon(checkIconRaw), iconFill: this.icon(checkFillIconRaw) },
    { name: 'Audio & video', icon: this.icon(videocamIconRaw), iconFill: this.icon(videocamFillIconRaw) },
    { name: 'Connected accounts', icon: this.icon(linkIconRaw), iconFill: this.icon(linkFillIconRaw) },
    { name: 'Privacy & visibility', icon: this.icon(lockIconRaw), iconFill: this.icon(lockFillIconRaw) },
    { name: 'Advanced', icon: this.icon(settingsIconRaw), iconFill: this.icon(settingsFillIconRaw) },
  ];

  protected readonly activeSection = signal('Messages & media');
  protected readonly placeholderCells = Array.from({ length: 10 });
}
