import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { cn } from '@/app/lib/utils';
import { buttonVariants, type ButtonSize, type ButtonVariant } from '../button/button.variants';

import { MESSAGE_SCROLLER_ARROW_SVG } from './message-scroller.icons';
import { injectMessageScroller } from './message-scroller-provider.component';

/** Which edge this button scrolls toward. Mirrors the registry's `direction` prop. */
export type MessageScrollerButtonDirection = 'start' | 'end';

/**
 * Angular port of @force-ui/message-scroller's `MessageScrollerButton`.
 *
 * Renders the real `ui/button` classes (registry default `variant="secondary"
 * size="icon-sm"`, per the reuse-existing-components rule) then layers the
 * primitive's own override string on top — that override (`border-border
 * bg-background text-foreground hover:bg-muted`) is what visually turns
 * "secondary" into an outline look; this is registry-verbatim, not a
 * deviation (confirmed against the Figma manifest note, which independently
 * traced the same thing and concluded Figma's "Variant=Outline" swatch is
 * correct output, not a mismatched binding).
 *
 * `data-active` drives the show/hide transition and is derived live from the
 * provider's `canScrollToEnd`/`canScrollToStart` — there's no registry-side
 * prop for it, the primitive computes it the same way internally.
 *
 * `shadow-sm` is an intentional, maintainer-approved deviation from both the
 * registry and the current Figma node (neither carries a shadow on this
 * button) — added on audit (2026-08-18) to match every other floating/
 * detached control in this design system (`popover`, `dropdown-menu`,
 * `tooltip`), which all carry an elevation token. Figma needs a follow-up
 * `sync-figma-component` pass to add the matching shadow effect so the two
 * stay reconciled.
 *
 * Usage: `<button uiMessageScrollerButton direction="start"></button>` (bare
 * — the default projected content below only renders when the caller leaves
 * `<ng-content>` empty, matching the registry's `children ?? <default>`).
 */
@Component({
  selector: '[uiMessageScrollerButton]',
  standalone: true,
  template: `
    <ng-content>
      <span aria-hidden="true" [innerHTML]="arrowIcon"></span>
      <span class="sr-only">{{ direction() === 'end' ? 'Scroll to latest' : 'Scroll to oldest' }}</span>
    </ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'message-scroller-button',
    '[attr.data-direction]': 'direction()',
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size()',
    '[attr.data-active]': "isActive() ? 'true' : 'false'",
    '[attr.tabindex]': "isActive() ? null : '-1'",
    '[attr.aria-hidden]': "isActive() ? null : 'true'",
    '[class]': 'classes()',
    '(click)': 'onClick()',
  },
})
export class MessageScrollerButtonComponent {
  readonly direction = input<MessageScrollerButtonDirection>('end');
  readonly variant = input<ButtonVariant>('secondary');
  readonly size = input<ButtonSize>('icon-sm');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  private readonly scroller = injectMessageScroller();

  protected readonly isActive = computed(() =>
    this.direction() === 'end' ? this.scroller.canScrollToEnd() : this.scroller.canScrollToStart(),
  );

  protected readonly arrowIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    MESSAGE_SCROLLER_ARROW_SVG,
  );

  protected readonly classes = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      "start-1/2 absolute -translate-x-1/2 border-border bg-background text-foreground shadow-sm transition-[translate,scale,opacity] duration-200 hover:bg-muted hover:text-foreground motion-reduce:transition-none data-[active=false]:pointer-events-none data-[active=false]:scale-95 data-[active=false]:opacity-0 data-[active=false]:duration-400 data-[active=false]:ease-[cubic-bezier(0.7,0,0.84,0)] data-[active=true]:translate-y-0 data-[active=true]:scale-100 data-[active=true]:opacity-100 data-[active=true]:ease-[cubic-bezier(0.23,1,0.32,1)] data-[direction=end]:bottom-4 data-[direction=end]:data-[active=false]:translate-y-full data-[direction=start]:top-4 data-[direction=start]:data-[active=false]:-translate-y-full rtl:translate-x-1/2 data-[direction=start]:[&_svg]:rotate-180",
      this.className(),
    ),
  );

  protected onClick(): void {
    if (this.direction() === 'end') {
      this.scroller.scrollToEnd();
    } else {
      this.scroller.scrollToStart();
    }
  }
}
