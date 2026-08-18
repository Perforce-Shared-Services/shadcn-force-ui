import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { cn } from '@/app/lib/utils';

import { buttonVariants } from '../button';
import { injectSidebar } from './sidebar-provider.component';
import { SIDEBAR_TRIGGER_SVG } from './sidebar.icons';

/**
 * Angular port of @force-ui/sidebar's `SidebarTrigger`.
 *
 * The registry composes `<Button variant="ghost" size="icon-sm">` with a
 * fixed, non-overridable variant/size — that's a "fully self-contained
 * button" shape, not the "co-apply `[uiButton]` alongside a behavior
 * directive" pattern the rest of this codebase uses for triggers (dialog,
 * sheet, alert-dialog), where variant/size stay caller-configurable. Since
 * this trigger's whole point is a fixed default look, it renders its own
 * `<button>` (element selector) and reuses `buttonVariants()` directly for
 * the classes — the same escape hatch documented for the roving-tabindex
 * case in the port skill (bypass `[uiButton]`'s host bindings, reuse the
 * exported class-builder instead).
 */
@Component({
  selector: 'button[uiSidebarTrigger]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    type: 'button',
    'data-sidebar': 'trigger',
    'data-slot': 'sidebar-trigger',
    'aria-keyshortcuts': 'Meta+B Control+B',
    '[class]': 'classes()',
    '(click)': 'onClick()',
  },
  template: `
    <span class="inline-flex cn-rtl-flip [&>svg]:fill-current" aria-hidden="true" [innerHTML]="icon"></span>
    <span class="sr-only">Toggle sidebar</span>
  `,
})
export class SidebarTriggerComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly ctx = injectSidebar();
  protected readonly icon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(SIDEBAR_TRIGGER_SVG);
  protected readonly classes = computed(() =>
    cn(buttonVariants({ variant: 'ghost', size: 'icon-sm' }), this.className()),
  );

  protected onClick(): void {
    this.ctx.toggleSidebar();
  }
}
