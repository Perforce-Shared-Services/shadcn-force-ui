import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { provideRdxDialog, type RdxDialogRef } from '@radix-ng/primitives/dialog';

import { cn } from '@/app/lib/utils';

import { SheetContent, SheetDescription, SheetHeader, SheetService, SheetTitle } from '../sheet';
import { injectSidebar, SIDEBAR_WIDTH_MOBILE } from './sidebar-provider.component';

export type SidebarSide = 'left' | 'right';
export type SidebarVariant = 'sidebar' | 'floating' | 'inset';
export type SidebarCollapsible = 'offcanvas' | 'icon' | 'none';

/**
 * Angular port of @force-ui/sidebar's `Sidebar`.
 *
 * The registry component RETURNS a different root element per branch
 * (`collapsible="none"` → a plain div; mobile → a `<Sheet>`; desktop → the
 * three-layer gap/container/inner div stack) — React can swap its whole
 * return value, but an Angular attribute-selector host is a single fixed
 * element (`<div uiSidebar>`). Reconciled as:
 * - `collapsible="none"` and desktop branches size/attribute the SAME host
 *   div differently (via computed host bindings) — this matches the registry
 *   1:1 since both of those branches really are "one div" in the source too.
 * - The mobile branch is architecturally different: `[rdxSheetContent]` can
 *   only exist inside a CDK-Dialog-portaled view (see `ui/sheet`), so it
 *   cannot be a static child of our host div. Instead the host div renders
 *   empty/hidden and an `effect()` opens/closes a Sheet imperatively via
 *   `SheetService`, whose content is the `<ng-template #mobileContent>`
 *   below.
 *
 *   Getting the projected children INTO that template took a real fix:
 *   `<ng-content>` occurring directly in three mutually-exclusive `@switch`
 *   branches does NOT survive a branch switch. The projected DOM nodes
 *   physically attach to whichever `<ng-content>` renders first (e.g. the
 *   desktop branch on initial load); when `@switch` later destroys that
 *   branch's view to render a different case, the projected nodes are
 *   destroyed along with it — they do NOT "follow" to the newly active
 *   `<ng-content>` occurrence. Confirmed live in Storybook (not from reading
 *   the source): resizing from desktop to mobile width opened the Sheet with
 *   a completely empty panel. Fixed by projecting into `<ng-content>` in
 *   exactly ONE place — the always-declared (never conditionally destroyed)
 *   `<ng-template #projected>` below — and using `[ngTemplateOutlet]` in each
 *   branch to re-render THAT template's content on demand. An outlet creates
 *   a fresh embedded view from the same `TemplateRef` each time, and the
 *   projected-node association lives on this component's own view (not on
 *   whichever branch happens to be instantiating the outlet), so it survives
 *   any number of branch switches.
 *
 * Integration note — landmark role: this attribute selector works today on
 * `<nav uiSidebar>` for real navigation content (desktop renders the tag as
 * declared). But on mobile the SAME content is relocated into the Sheet's
 * `[rdxSheetContent]`, which is `role="dialog"` — so a consumer who tags the
 * host `<nav>` gets a "navigation" landmark on desktop and a "dialog" on
 * mobile for identical content. There is no way to fix this inside the
 * primitive (the mobile branch's root element belongs to `ui/sheet`, not
 * here). If landmark identity must stay stable across breakpoints, don't
 * rely on host tag choice — apply `role="navigation"` + `aria-label`
 * explicitly to whatever is inside `SidebarContent` instead.
 */
@Component({
  selector: '[uiSidebar]',
  standalone: true,
  imports: [NgTemplateOutlet, SheetContent, SheetHeader, SheetTitle, SheetDescription],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideRdxDialog()],
  host: {
    'data-slot': 'sidebar',
    '[attr.data-state]': 'hostState()',
    '[attr.data-collapsible]': 'hostCollapsible()',
    '[attr.data-variant]': 'hostVariant()',
    '[attr.data-side]': 'hostSide()',
    '[class]': 'hostClasses()',
  },
  template: `
    <ng-template #projected><ng-content /></ng-template>
    @switch (branch()) {
      @case ('none') {
        <ng-container [ngTemplateOutlet]="projected"></ng-container>
      }
      @case ('mobile') {
        <ng-template #mobileContent>
          <div
            rdxSheetContent
            [side]="side()"
            data-sidebar="sidebar"
            data-mobile="true"
            class="w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
            [style.--sidebar-width]="mobileWidth"
          >
            <div rdxSheetHeader class="sr-only">
              <h2 rdxSheetTitle>Sidebar</h2>
              <p rdxSheetDescription>Displays the mobile sidebar.</p>
            </div>
            <div class="flex h-full w-full flex-col">
              <ng-container [ngTemplateOutlet]="projected"></ng-container>
            </div>
          </div>
        </ng-template>
      }
      @default {
        <div data-slot="sidebar-gap" [class]="gapClasses()"></div>
        <div data-slot="sidebar-container" [attr.data-side]="side()" [class]="containerClasses()">
          <div data-sidebar="sidebar" data-slot="sidebar-inner" [class]="innerClasses()">
            <ng-container [ngTemplateOutlet]="projected"></ng-container>
          </div>
        </div>
      }
    }
  `,
})
export class SidebarComponent {
  readonly side = input<SidebarSide>('left');
  readonly variant = input<SidebarVariant>('sidebar');
  readonly collapsible = input<SidebarCollapsible>('offcanvas');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly ctx = injectSidebar();
  protected readonly mobileWidth = SIDEBAR_WIDTH_MOBILE;

  protected readonly branch = computed<'none' | 'mobile' | 'desktop'>(() => {
    if (this.collapsible() === 'none') return 'none';
    return this.ctx.isMobile() ? 'mobile' : 'desktop';
  });

  protected readonly hostState = computed(() => (this.branch() === 'desktop' ? this.ctx.state() : null));
  protected readonly hostCollapsible = computed(() =>
    this.branch() === 'desktop' ? (this.ctx.state() === 'collapsed' ? this.collapsible() : '') : null,
  );
  protected readonly hostVariant = computed(() => (this.branch() === 'desktop' ? this.variant() : null));
  protected readonly hostSide = computed(() => (this.branch() === 'desktop' ? this.side() : null));

  protected readonly hostClasses = computed(() => {
    if (this.branch() === 'none') {
      return cn(
        'flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground',
        this.className(),
      );
    }
    if (this.branch() === 'mobile') {
      return 'hidden';
    }
    return cn('group peer hidden text-sidebar-foreground md:block', this.className());
  });

  protected readonly gapClasses = computed(() =>
    cn(
      'relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear motion-reduce:transition-none',
      'group-data-[collapsible=offcanvas]:w-0',
      'group-data-[side=right]:rotate-180',
      this.variant() === 'floating' || this.variant() === 'inset'
        ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
        : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)',
    ),
  );

  /**
   * DEVIATION FROM REGISTRY-VERBATIM: added `border-sidebar-border` — the
   * registry's bare `border-r`/`border-l` (width only) relies on shadcn's
   * global `* { border-color: var(--border) }`, which this app doesn't
   * declare (same fix already applied in `ui/sheet`'s panel border, see its
   * own doc comment). Without it the edge renders in `currentColor` (black
   * in light mode) instead of the token — found by the maintainer eyeballing
   * a live Storybook screenshot, not from reading the class string.
   */
  protected readonly containerClasses = computed(() =>
    cn(
      "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear motion-reduce:transition-none data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)] md:flex",
      this.variant() === 'floating' || this.variant() === 'inset'
        ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]'
        : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon) border-sidebar-border group-data-[side=left]:border-r group-data-[side=right]:border-l',
    ),
  );

  protected readonly innerClasses = computed(() =>
    'flex size-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1 group-data-[variant=floating]:ring-sidebar-border',
  );

  private readonly mobileContentTpl = viewChild<TemplateRef<void>>('mobileContent');
  private readonly sheetService = inject(SheetService);
  private readonly destroyRef = inject(DestroyRef);
  private dialogRef: RdxDialogRef<void> | null = null;

  constructor() {
    effect(() => {
      const shouldShow = this.branch() === 'mobile' && this.ctx.openMobile();
      const tpl = this.mobileContentTpl();

      if (shouldShow && tpl && !this.dialogRef) {
        const ref = this.sheetService.open<void>({
          content: tpl,
          ariaLabel: 'Sidebar',
        });
        this.dialogRef = ref;
        ref.closed$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
          this.dialogRef = null;
          this.ctx.setOpenMobile(false);
        });
      } else if (!shouldShow && this.dialogRef) {
        this.dialogRef.dismiss();
      }
    });
  }
}
