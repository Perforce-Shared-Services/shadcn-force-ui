import { NgTemplateOutlet } from '@angular/common';
import {
  ConnectedPosition,
  Overlay,
  OverlayRef,
  type ConnectedOverlayPositionChange,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  DestroyRef,
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

import { ComboboxRootService } from './combobox-root.service';

/** bottom-start preferred, top-start fallback — a downward-opening listbox. */
const POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 6 },
  { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -6 },
];

/**
 * Popup chrome rendered inside the CDK overlay — base-ui's `Combobox.Popup`,
 * minus the base-ui-only CSS vars (`--anchor-width`, `--available-height`,
 * `--transform-origin`) that CDK doesn't set (CDK owns sizing/positioning; the
 * open/closed animation covers the zoom). The registry class string is otherwise
 * verbatim (incl. `cn-menu-*` — real published Force utilities per skill §7,
 * no-op if undefined; `*:data-[slot=input-group]:*` styles a chips input placed
 * inside the popup). A bare-`ring-1` edge (not `border`) so the §8 gotcha doesn't
 * apply; `motion-reduce:animate-none` for WCAG 2.3.3.
 */
@Component({
  selector: 'ui-combobox-popup',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  template: '@if (template(); as tpl) { <ng-container [ngTemplateOutlet]="tpl" /> }',
  host: {
    'data-slot': 'combobox-content',
    '[attr.data-open]': "open() ? '' : null",
    '[attr.data-closed]': "!open() ? '' : null",
    '[attr.data-side]': 'side()',
    '[class]': 'classes',
  },
})
export class ComboboxPopupComponent {
  readonly template = input<TemplateRef<unknown> | null>(null);
  readonly open = input(true);
  readonly side = input<'top' | 'bottom'>('bottom');

  protected readonly classes = cn(
    'cn-menu-target cn-menu-translucent group/combobox-content relative flex max-h-[24rem] w-full min-w-[8rem] flex-col overflow-hidden rounded-lg bg-popover p-0 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-hidden',
    'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',
    'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 motion-reduce:animate-none',
    '*:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8',
  );
}

/**
 * `[uiComboboxContent]` — the anchored, NON-MODAL popup, applied to an
 * `<ng-template>` (positioning lives outside the component tree, like popover's
 * split content):
 *
 *   <ng-template uiComboboxContent>
 *     <div uiComboboxList>…</div>
 *   </ng-template>
 *
 * base-ui's `Combobox.Portal` + `Positioner` + `Popup` collapsed into one CDK
 * overlay. Unlike `ui/popover` (radix-ng, traps focus) and `ui/select` (radix-ng,
 * no free text), the combobox popup keeps DOM focus in the input while the
 * listbox is driven by `aria-activedescendant` — so it uses the CDK `Overlay`
 * service directly with NO focus trap. It anchors to the chips container when one
 * is present (`COMBOBOX_ANCHOR`, base-ui `useComboboxAnchor`), else to the input.
 * Opens/closes off `root.open()`; outside-press (excluding the anchor) and the
 * root's Escape handler close it.
 *
 * Focus contract (WCAG 2.4.7): DOM focus never leaves the input while the popup is
 * open (the listbox is driven by `aria-activedescendant`), so closing via Escape
 * leaves focus already on the input — no focus-return step is needed (unlike the
 * modal dialog port). Closing via outside-press is an intentional focus move by
 * the user (they clicked elsewhere); we deliberately do NOT force focus back to
 * the input in that case, per the APG combobox norm.
 */
@Directive({
  selector: 'ng-template[uiComboboxContent]',
  standalone: true,
})
export class ComboboxContentDirective {
  private readonly template = inject(TemplateRef<unknown>);
  private readonly overlay = inject(Overlay);
  private readonly root = inject(ComboboxRootService);
  private readonly destroyRef = inject(DestroyRef);

  /** Preferred side (base-ui `side`); align is always start for a listbox. */
  readonly side = input<'top' | 'bottom'>('bottom');

  private overlayRef: OverlayRef | null = null;
  private popupRef: ComponentRef<ComboboxPopupComponent> | null = null;

  constructor() {
    effect(() => (this.root.open() ? this.attach() : this.detach()));
    this.destroyRef.onDestroy(() => this.overlayRef?.dispose());
  }

  private anchorEl(): HTMLElement | null {
    // The popup anchors to the chips container when present, else the input —
    // both publish themselves to `root.anchorEl` (base-ui `useComboboxAnchor`).
    return this.root.anchorEl();
  }

  private attach(): void {
    const anchor = this.anchorEl();
    if (!anchor || this.overlayRef?.hasAttached()) {
      return;
    }

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(anchor)
      .withPositions(this.side() === 'top' ? [...POSITIONS].reverse() : POSITIONS)
      .withPush(false)
      .withFlexibleDimensions(false);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      minWidth: anchor.offsetWidth,
      hasBackdrop: false,
      panelClass: 'ui-combobox-overlay-pane',
    });

    // outside-press closes — but ignore presses on the anchor itself (they toggle
    // via the input's own handler; treating them as "outside" would flicker).
    this.overlayRef.outsidePointerEvents().subscribe((event) => {
      const target = event.target as Node | null;
      if (!(target && anchor.contains(target))) {
        this.root.open.set(false);
      }
    });

    this.popupRef = this.overlayRef.attach(new ComponentPortal(ComboboxPopupComponent));
    this.popupRef.setInput('template', this.template);
    this.popupRef.setInput('open', true);

    positionStrategy.positionChanges.subscribe((change: ConnectedOverlayPositionChange) => {
      this.popupRef?.setInput(
        'side',
        change.connectionPair.originY === 'top' ? 'top' : 'bottom',
      );
    });
  }

  private detach(): void {
    this.overlayRef?.detach();
    this.popupRef = null;
  }
}
