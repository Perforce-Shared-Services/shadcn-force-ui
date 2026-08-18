import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  OnDestroy,
  signal,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

import type { ResizablePanelGroupComponent } from './resizable-panel-group.component';
import type { ResizablePanelComponent } from './resizable-panel.component';

const KEYBOARD_STEP = 10;

/**
 * Registry base class string, with two intentional Force UI deviations
 * (documented, both use only pre-existing tokens — no new values invented):
 * - `focus-visible:ring-1 focus-visible:ring-ring` → `ring-3 ring-ring/50` +
 *   `transition-colors motion-reduce:transition-none`, matching the focus
 *   treatment every other interactive `ui/*` component uses (button, input,
 *   slider, switch, …) — the registry's bare `ring-1` was the only outlier
 *   in the whole design system (audit-component finding, H4 consistency).
 * - `cursor-col-resize` / `aria-[orientation=horizontal]:cursor-row-resize` +
 *   `touch-none` added — pure interaction affordance (cursor icon, touch
 *   gesture ownership), no visual/token change, not modeled in Figma's static
 *   variants (same category as the interaction-motion transition itself).
 * - Dropped the dead `ring-offset-background` (no `ring-offset-*` width is
 *   ever applied in this file — inert leftover from the registry source).
 */
const RESIZABLE_HANDLE_CLASS =
  'relative flex w-px items-center justify-center bg-border cursor-col-resize touch-none after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 transition-colors motion-reduce:transition-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-hidden aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:cursor-row-resize aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0 aria-[orientation=horizontal]:after:-translate-y-1/2 [&[aria-orientation=horizontal]>div]:rotate-90';

/**
 * Angular port of @force-ui/resizable's `ResizableHandle`.
 *
 * Owns all drag (pointer) and keyboard resize behaviour — the group only
 * wires this instance to its adjacent `[uiResizablePanel]`s via `attach()`
 * (see `resizable-panel-group.component.ts` for why this is hand-rolled
 * rather than built on a radix-ng/CDK primitive).
 *
 * `aria-orientation` follows the WAI-ARIA separator convention: it describes
 * the separator's OWN visual axis, which is the opposite of the group's
 * `direction` — a `direction="horizontal"` group (panels side by side) is
 * divided by a *vertical* line (`aria-orientation="vertical"`, the base/
 * unset styling), and a `direction="vertical"` group (stacked panels) is
 * divided by a *horizontal* line (`aria-orientation="horizontal"`, the
 * flipped styling the registry's `aria-[orientation=horizontal]:` variants
 * target).
 *
 * Keyboard: Arrow key toward the next panel grows it by 10% (shrinking the
 * previous panel) and vice versa; Home/End jump to the adjacent panels'
 * min/max, matching `react-resizable-panels`' keyboard resize behaviour.
 * Escape cancels an in-progress pointer drag, reverting both panels to their
 * pre-drag sizes (WCAG 2.1.2 / NN/g "user control and freedom" — a hand-rolled
 * drag has no other undo path).
 *
 * `elementRef.nativeElement.focus()` is called on pointerdown so a
 * mouse-driven resize gets the same live `aria-valuenow` announcement a
 * keyboard-driven one gets for free (WAI-ARIA separator pattern relies on
 * the focused element's value changing, not a live region) — this doubles
 * as the visible "currently dragging" state (focus-visible ring) without
 * inventing a separate active-state color.
 */
@Component({
  selector: '[uiResizableHandle]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (withHandle()) {
      <div class="z-10 flex h-6 w-1 shrink-0 rounded-lg bg-border"></div>
    }
  `,
  host: {
    'data-slot': 'resizable-handle',
    role: 'separator',
    '[attr.tabindex]': "unattached() ? '-1' : '0'",
    '[attr.aria-disabled]': "unattached() ? 'true' : null",
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.aria-controls]': 'ariaControls()',
    '[attr.aria-orientation]': 'ariaOrientation()',
    '[attr.aria-valuenow]': 'ariaValueNow()',
    '[attr.aria-valuemin]': 'ariaValueMin()',
    '[attr.aria-valuemax]': 'ariaValueMax()',
    '[attr.data-resize-handle-active]': "active() ? 'pointer' : null",
    '[class]': 'classes()',
    '(pointerdown)': 'onPointerDown($event)',
    '(keydown)': 'onKeyDown($event)',
  },
})
export class ResizableHandleComponent implements OnDestroy {
  readonly withHandle = input(false, { transform: booleanAttribute });
  /** Accessible name. Default is generic — pass a specific one where the adjacent panels have names, e.g. "Resize file list". */
  readonly ariaLabel = input('Resize panels');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  readonly elementRef = inject(ElementRef<HTMLElement>);

  private readonly group = signal<ResizablePanelGroupComponent | null>(null);
  private readonly prevPanel = signal<ResizablePanelComponent | null>(null);
  private readonly nextPanel = signal<ResizablePanelComponent | null>(null);

  protected readonly active = signal(false);
  protected readonly unattached = computed(() => !this.prevPanel() || !this.nextPanel());

  protected readonly groupDirection = computed(() => this.group()?.direction() ?? 'horizontal');
  protected readonly ariaOrientation = computed(() =>
    this.groupDirection() === 'horizontal' ? 'vertical' : 'horizontal',
  );
  protected readonly ariaValueNow = computed(() => this.prevPanel()?.getSize() ?? null);
  protected readonly ariaValueMin = computed(() => this.prevPanel()?.minSize() ?? null);
  protected readonly ariaValueMax = computed(() => this.prevPanel()?.maxSize() ?? null);
  protected readonly ariaControls = computed(() => {
    const ids = [this.prevPanel(), this.nextPanel()]
      .map((panel) => panel?.elementRef.nativeElement.id)
      .filter((id): id is string => !!id);
    return ids.length > 0 ? ids.join(' ') : null;
  });
  protected readonly classes = computed(() => cn(RESIZABLE_HANDLE_CLASS, this.className()));

  private dragPointerId: number | null = null;
  private dragStartPos = 0;
  private dragStartPrevSize = 0;
  private dragStartNextSize = 0;
  private dragAxisSize = 0;

  /** Called by the group once panels/handles are queried, on every change. */
  attach(
    group: ResizablePanelGroupComponent | null,
    prevPanel: ResizablePanelComponent | null,
    nextPanel: ResizablePanelComponent | null,
  ): void {
    this.group.set(group);
    this.prevPanel.set(prevPanel);
    this.nextPanel.set(nextPanel);
  }

  protected onPointerDown(event: PointerEvent): void {
    const prevPanel = this.prevPanel();
    const nextPanel = this.nextPanel();
    const group = this.group();
    if (!prevPanel || !nextPanel || !group) return;

    event.preventDefault();
    this.active.set(true);
    this.dragPointerId = event.pointerId;
    // Focus the handle so this drag gets the same `aria-valuenow` live
    // announcement + visible focus-ring the keyboard path gets for free.
    this.elementRef.nativeElement.focus();
    // Guarantees pointerup/pointercancel delivery to this element even if
    // the pointer leaves the window mid-drag (alt-tab, OS dialog, etc.).
    // Best-effort: an invalid/inactive pointerId (synthetic events, some
    // a11y tooling) throws — the drag still works via the window listeners
    // below, just without the capture guarantee.
    try {
      this.elementRef.nativeElement.setPointerCapture(event.pointerId);
    } catch {
      // Ignored — see comment above.
    }

    const horizontal = this.groupDirection() === 'horizontal';
    this.dragStartPos = horizontal ? event.clientX : event.clientY;
    this.dragStartPrevSize = prevPanel.getSize();
    this.dragStartNextSize = nextPanel.getSize();
    const rect = group.elementRef.nativeElement.getBoundingClientRect();
    this.dragAxisSize = horizontal ? rect.width : rect.height;

    document.body.style.cursor = horizontal ? 'col-resize' : 'row-resize';
    document.body.style.userSelect = 'none';
    window.addEventListener('pointermove', this.onPointerMove);
    window.addEventListener('pointerup', this.onPointerUp);
    window.addEventListener('pointercancel', this.onPointerUp);
    window.addEventListener('blur', this.onPointerUp);
  }

  private onPointerMove = (event: PointerEvent): void => {
    if (!this.dragAxisSize) return;
    const horizontal = this.groupDirection() === 'horizontal';
    const pos = horizontal ? event.clientX : event.clientY;
    const deltaPercent = ((pos - this.dragStartPos) / this.dragAxisSize) * 100;
    this.applyDelta(deltaPercent, this.dragStartPrevSize, this.dragStartNextSize);
  };

  private onPointerUp = (): void => {
    if (this.dragPointerId !== null && this.elementRef.nativeElement.hasPointerCapture(this.dragPointerId)) {
      this.elementRef.nativeElement.releasePointerCapture(this.dragPointerId);
    }
    this.dragPointerId = null;
    this.active.set(false);
    this.dragAxisSize = 0;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerup', this.onPointerUp);
    window.removeEventListener('pointercancel', this.onPointerUp);
    window.removeEventListener('blur', this.onPointerUp);
  };

  protected onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.active()) {
      event.preventDefault();
      this.prevPanel()?.setSize(this.dragStartPrevSize);
      this.nextPanel()?.setSize(this.dragStartNextSize);
      this.onPointerUp();
      return;
    }

    const prevPanel = this.prevPanel();
    const nextPanel = this.nextPanel();
    if (!prevPanel || !nextPanel) return;

    const horizontal = this.groupDirection() === 'horizontal';
    const increaseKey = horizontal ? 'ArrowRight' : 'ArrowDown';
    const decreaseKey = horizontal ? 'ArrowLeft' : 'ArrowUp';

    let delta: number;
    if (event.key === increaseKey) delta = KEYBOARD_STEP;
    else if (event.key === decreaseKey) delta = -KEYBOARD_STEP;
    else if (event.key === 'Home') delta = -100;
    else if (event.key === 'End') delta = 100;
    else return;

    event.preventDefault();
    this.applyDelta(delta, prevPanel.getSize(), nextPanel.getSize());
  }

  private applyDelta(deltaPercent: number, baseStartPrev: number, baseStartNext: number): void {
    const prevPanel = this.prevPanel();
    const nextPanel = this.nextPanel();
    if (!prevPanel || !nextPanel) return;

    const combined = baseStartPrev + baseStartNext;
    let nextPrevSize = Math.min(
      prevPanel.maxSize(),
      Math.max(prevPanel.minSize(), baseStartPrev + deltaPercent),
    );
    let nextNextSize = Math.min(
      nextPanel.maxSize(),
      Math.max(nextPanel.minSize(), combined - nextPrevSize),
    );
    nextPrevSize = combined - nextNextSize;

    prevPanel.setSize(nextPrevSize);
    nextPanel.setSize(nextNextSize);
  }

  ngOnDestroy(): void {
    this.onPointerUp();
  }
}
