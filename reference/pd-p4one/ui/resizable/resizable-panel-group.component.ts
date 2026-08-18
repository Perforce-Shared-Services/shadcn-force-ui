import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  ElementRef,
  forwardRef,
  inject,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

import { ResizableHandleComponent } from './resizable-handle.component';
import { ResizablePanelComponent } from './resizable-panel.component';

export type ResizableDirection = 'horizontal' | 'vertical';

/**
 * Base class string. The registry targets `aria-[orientation=vertical]`, but
 * this host has no ARIA role — `aria-orientation` is only an allowed
 * attribute on roles that support it (separator, slider, tablist, …), and
 * axe-core flags it as a critical `aria-allowed-attr` violation on a plain
 * `div` (audit-component, 2026-07-02). Retargeted to the existing
 * `data-panel-group-direction` attribute instead — same CSS effect, no
 * invalid ARIA usage. `aria-orientation` stays correctly scoped to the
 * `[uiResizableHandle]` host, which IS `role="separator"`.
 */
const RESIZABLE_PANEL_GROUP_CLASS =
  'flex h-full w-full data-[panel-group-direction=vertical]:flex-col';

/**
 * Angular port of @force-ui/resizable's `ResizablePanelGroup` (root).
 *
 * Usage:
 *   <div uiResizablePanelGroup direction="horizontal">
 *     <div uiResizablePanel [defaultSize]="50">…</div>
 *     <div uiResizableHandle></div>
 *     <div uiResizablePanel [defaultSize]="50">…</div>
 *   </div>
 *
 * No `@radix-ng/primitives` or Angular CDK primitive exists for a resizable
 * splitter (checked both) — the registry wraps `react-resizable-panels`
 * directly, which has no Angular port. This is a hand-rolled parity gap:
 * the group content-queries its direct-child `[uiResizablePanel]` and
 * `[uiResizableHandle]` instances, orders them by DOM position (they're
 * literal siblings, same as the JSX), and wires each handle to the two
 * panels it sits between. All drag/keyboard logic lives on the handle;
 * the group only performs this wiring.
 */
@Component({
  selector: '[uiResizablePanelGroup]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'resizable-panel-group',
    'data-panel-group': '',
    '[attr.data-panel-group-direction]': 'direction()',
    '[class]': 'classes()',
  },
})
export class ResizablePanelGroupComponent {
  readonly direction = input<ResizableDirection>('horizontal');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  readonly elementRef = inject(ElementRef<HTMLElement>);

  private readonly panels = contentChildren(forwardRef(() => ResizablePanelComponent), {
    descendants: false,
  });
  private readonly handles = contentChildren(forwardRef(() => ResizableHandleComponent), {
    descendants: false,
  });

  protected readonly classes = computed(() => cn(RESIZABLE_PANEL_GROUP_CLASS, this.className()));

  constructor() {
    effect(() => {
      this.wireHandles(this.panels(), this.handles());
    });
  }

  private wireHandles(
    panels: readonly ResizablePanelComponent[],
    handles: readonly ResizableHandleComponent[],
  ): void {
    const ordered: Array<ResizablePanelComponent | ResizableHandleComponent> = [
      ...panels,
      ...handles,
    ].sort((a, b) =>
      a.elementRef.nativeElement.compareDocumentPosition(b.elementRef.nativeElement) &
      Node.DOCUMENT_POSITION_FOLLOWING
        ? -1
        : 1,
    );

    for (let i = 0; i < ordered.length; i++) {
      const item = ordered[i];
      if (!(item instanceof ResizableHandleComponent)) continue;

      const prev = ordered[i - 1];
      const next = ordered[i + 1];
      if (prev instanceof ResizablePanelComponent && next instanceof ResizablePanelComponent) {
        item.attach(this, prev, next);
      } else {
        item.attach(null, null, null);
      }
    }
  }
}
