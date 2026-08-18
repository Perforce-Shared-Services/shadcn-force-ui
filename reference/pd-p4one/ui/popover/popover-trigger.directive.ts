import { Directive, effect, ElementRef, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RdxPopoverRootDirective, RdxPopoverTriggerDirective } from '@radix-ng/primitives/popover';

/**
 * Angular port of @force-ui/popover's `PopoverTrigger`.
 *
 * Applied to whatever element opens the popover — usually a `[uiButton]`.
 * `RdxPopoverTriggerDirective` (host directive, built on `CdkOverlayOrigin`)
 * owns the click-to-toggle behaviour and is the overlay's positioning origin. It
 * stamps `aria-expanded` / `aria-controls` / `data-state` (open/closed), so the
 * trigger is keyboard-operable and announces its expanded state (WCAG 4.1.2).
 *
 * Unlike the tooltip trigger (opens on hover/focus), the popover trigger opens on
 * CLICK — the content is interactive, so it must be deliberately summoned and
 * focus moves into it.
 *
 * Focus return (WCAG 2.4.3): radix-ng's popover is built on `CdkConnectedOverlay`,
 * which — unlike the `CdkDialog` the dialog port rides on — does NOT restore focus
 * to the trigger when the overlay closes. On Escape, outside-click, or a
 * `[rdxPopoverClose]` button the focus-trapped content is detached and the
 * keyboard user is dumped on `document.body`. This directive watches the root's
 * open→closed transition and returns focus to the trigger, but ONLY when focus
 * was actually lost (active element is `body` or gone) — if the user clicked
 * another focusable control to dismiss, focus already moved there and we leave it
 * alone (Radix's `onCloseAutoFocus` heuristic).
 *
 * Valid `aria-controls` (WCAG 4.1.2): radix-ng's trigger always stamps
 * `aria-controls="<content-id>"`, but the content is portalled into the overlay
 * only while open — when closed the referenced element is absent, so axe's
 * `aria-valid-attr-value` flags a dangling IDREF. This wrapper overrides the
 * binding to emit `aria-controls` ONLY while the popover is open (host bindings
 * take precedence over a host directive's, so this wins cleanly). `aria-expanded`
 * (also on the radix trigger) already conveys the collapsed state.
 *
 * This wrapper otherwise only adds the registry `data-slot="popover-trigger"`;
 * the selector stays the native `[rdxPopoverTrigger]` so the radix root's
 * `contentChild` query and the directive's overlay-origin wiring resolve.
 */
@Directive({
  selector: '[rdxPopoverTrigger]',
  standalone: true,
  hostDirectives: [RdxPopoverTriggerDirective],
  host: {
    'data-slot': 'popover-trigger',
    '[attr.aria-controls]': 'popoverRoot.isOpen() ? popoverRoot.popoverContentDirective()?.name() : null',
  },
})
export class PopoverTriggerDirective {
  private readonly popoverRoot = inject(RdxPopoverRootDirective);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly document = inject(DOCUMENT);
  private wasOpen = false;

  constructor() {
    effect(() => {
      const open = this.popoverRoot.isOpen();
      if (this.wasOpen && !open) {
        const active = this.document.activeElement;
        // Only reclaim focus if it was lost to the page body (Escape / close
        // button / outside-click on a non-focusable area). If focus already
        // moved to another control, leave it — the user chose that target.
        if (!active || active === this.document.body) {
          this.elementRef.nativeElement.focus();
        }
      }
      this.wasOpen = open;
    });
  }
}
