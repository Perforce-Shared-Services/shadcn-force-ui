import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  numberAttribute,
  OnInit,
  signal,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

/** Fallback DOM id so an adjacent `[uiResizableHandle]` can bind `aria-controls`. */
let resizablePanelIdCounter = 0;

/**
 * Angular port of @force-ui/resizable's `ResizablePanel`.
 *
 * The registry component wraps `react-resizable-panels`' `Panel`, which has
 * no Angular equivalent in `@radix-ng/primitives` or Angular CDK (checked —
 * neither ships a splitter/resizable-panel primitive). Sizing state and drag
 * behaviour are hand-rolled here (documented parity gap, see
 * `resizable-panel-group.component.ts` and `resizable-handle.component.ts`).
 *
 * Size is tracked as a percentage of the group's main-axis size, applied via
 * `flex-basis`. `defaultSize`/`minSize`/`maxSize` are read once — like the
 * upstream library, the panel is uncontrolled after mount; drag/keyboard
 * resize on an adjacent `[uiResizableHandle]` calls `setSize()` directly.
 */
@Component({
  selector: '[uiResizablePanel]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'resizable-panel',
    '[style.flexBasis.%]': 'currentSize()',
    '[style.flexGrow]': '0',
    '[style.flexShrink]': '0',
    '[style.overflow]': "'hidden'",
    '[class]': 'classes()',
  },
})
export class ResizablePanelComponent implements OnInit {
  readonly defaultSize = input(50, { transform: numberAttribute });
  readonly minSize = input(10, { transform: numberAttribute });
  readonly maxSize = input(100, { transform: numberAttribute });
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  readonly elementRef = inject(ElementRef<HTMLElement>);

  private readonly size = signal<number | null>(null);

  // Re-clamps on every read (not just at `setSize()` time) so a runtime
  // `minSize`/`maxSize` change re-applies to an already-committed size.
  protected readonly currentSize = computed(() => this.clamp(this.size() ?? this.defaultSize()));
  protected readonly classes = computed(() => cn(this.className()));

  ngOnInit(): void {
    const el = this.elementRef.nativeElement;
    if (!el.id) {
      el.id = `resizable-panel-${resizablePanelIdCounter++}`;
    }
  }

  getSize(): number {
    return this.currentSize();
  }

  setSize(next: number): void {
    this.size.set(this.clamp(next));
  }

  private clamp(value: number): number {
    return Math.min(this.maxSize(), Math.max(this.minSize(), value));
  }
}
