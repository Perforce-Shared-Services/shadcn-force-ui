import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';
import { consume, provide } from 'ember-provide-consume-context';

import ArrowDown from '~icons/ms/arrow_downward';

import { cn } from '@/lib/utils';

import type { TOC } from '@ember/component/template-only';

type Direction = 'start' | 'end';
type ScrollDirection = Direction | 'up' | 'down';

const ScrollerContext = 'message-scroller-context' as const;

interface ScrollerContextValue {
  atStart: boolean;
  atEnd: boolean;
  handleScroll: (distanceToStart: number, distanceToEnd: number) => void;
  registerViewport: (el: HTMLElement) => void;
  scrollTo: (direction: Direction) => void;
}

interface ContextRegistry {
  [ScrollerContext]: ScrollerContextValue;
}

const NEAR_THRESHOLD = 40; // px distance still considered "at" an edge

// [FORCE-UI] Replaces React's @shadcn/react/message-scroller primitives.
// ponytail: no virtualization / content-visibility measurement — items render eagerly;
// add windowed rendering if message lists grow past a few hundred nodes.
class MessageScroller extends Component<ScrollerSignature> {
  @tracked atStart = true;
  // start optimistic so the "scroll to end" button stays hidden before first scroll event
  @tracked atEnd = true;

  private viewport: HTMLElement | null = null;
  private observer: ResizeObserver | null = null;

  get stickToEnd(): boolean {
    return this.args.autoScroll !== false ? this.atEnd : false;
  }

  handleScroll = (distanceToStart: number, distanceToEnd: number) => {
    this.atStart = distanceToStart <= NEAR_THRESHOLD;
    this.atEnd = distanceToEnd <= NEAR_THRESHOLD;
  };

  registerViewport = (el: HTMLElement) => {
    this.viewport = el;
    this.observer?.disconnect();
    this.observer = new ResizeObserver(() => {
      // content grew (new messages) — keep pinned to the end while the user
      // hasn't scrolled away from it
      if (this.viewport && this.stickToEnd) {
        this.viewport.scrollTop = this.viewport.scrollHeight;
      }
    });
    const content = el.firstElementChild;
    if (content) {
      this.observer.observe(content);
    }
    if (this.args.autoScroll !== false && el.scrollHeight > el.clientHeight) {
      el.scrollTop = el.scrollHeight;
    }
  };

  scrollTo = (direction: Direction) => {
    if (!this.viewport) return;
    const target =
      direction === 'end'
        ? this.viewport.scrollHeight - this.viewport.clientHeight
        : 0;
    this.viewport.scrollTo({ behavior: 'smooth', top: target });
  };

  willDestroy(): void {
    super.willDestroy();
    this.observer?.disconnect();
  }

  @provide(ScrollerContext)
  get context(): ScrollerContextValue {
    return {
      atStart: this.atStart,
      atEnd: this.atEnd,
      handleScroll: this.handleScroll,
      registerViewport: this.registerViewport,
      scrollTo: this.scrollTo,
    };
  }

  <template>
    <div
      class={{cn
        "cn-message-scroller group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden"
        @class
      }}
      data-slot="message-scroller"
      ...attributes
    >
      {{yield}}
    </div>
  </template>
}

interface ScrollerSignature {
  Element: HTMLDivElement;
  Args: {
    class?: string;
    /** Jump to the newest message on mount and when new content arrives while already at the end. Default true. */
    autoScroll?: boolean;
  };
  Blocks: {
    default: [];
  };
}

interface ViewportSignature {
  Element: HTMLDivElement;
  Args: {
    class?: string;
  };
  Blocks: {
    default: [];
  };
}

class MessageScrollerViewport extends Component<ViewportSignature> {
  @consume(ScrollerContext) context!: ContextRegistry[typeof ScrollerContext];

  viewportModifier = modifier(
    (element: HTMLDivElement) => {
      this.context.registerViewport(element);

      const onScroll = () => {
        this.context.handleScroll(
          element.scrollTop,
          element.scrollHeight - element.scrollTop - element.clientHeight
        );
      };
      element.addEventListener('scroll', onScroll, { passive: true });

      return () => {
        element.removeEventListener('scroll', onScroll);
      };
    }
  );

  <template>
    <div
      class={{cn
        "cn-message-scroller-viewport size-full min-h-0 min-w-0 scroll-fade-b scrollbar-thin scrollbar-gutter-stable overflow-y-auto overscroll-contain contain-content"
        @class
      }}
      data-slot="message-scroller-viewport"
      {{this.viewportModifier}}
      ...attributes
    >
      {{yield}}
    </div>
  </template>
}

interface ContentSignature {
  Element: HTMLDivElement;
  Args: {
    class?: string;
  };
  Blocks: {
    default: [];
  };
}

const MessageScrollerContent: TOC<ContentSignature> = <template>
  <div
    class={{cn "cn-message-scroller-content flex h-max min-h-full flex-col" @class}}
    data-slot="message-scroller-content"
    ...attributes
  >
    {{yield}}
  </div>
</template>;

interface ItemSignature {
  Element: HTMLDivElement;
  Args: {
    class?: string;
  };
  Blocks: {
    default: [];
  };
}

const MessageScrollerItem: TOC<ItemSignature> = <template>
  <div
    class={{cn
      "cn-message-scroller-item min-w-0 shrink-0 [contain-intrinsic-size:auto_10rem] [content-visibility:auto]"
      @class
    }}
    data-slot="message-scroller-item"
    ...attributes
  >
    {{yield}}
  </div>
</template>;

interface ButtonSignature {
  Element: HTMLButtonElement;
  Args: {
    class?: string;
    /** Which edge this button targets. Default "end". */
    direction?: Direction;
    variant?: 'secondary' | 'outline' | 'ghost';
  };
  Blocks: {
    default: [];
  };
}

class MessageScrollerButton extends Component<ButtonSignature> {
  @consume(ScrollerContext) context!: ContextRegistry[typeof ScrollerContext];

  get direction(): Direction {
    return this.args.direction ?? 'end';
  }

  get active(): boolean {
    return this.direction === 'end' ? !this.context.atEnd : !this.context.atStart;
  }

  get label(): string {
    return this.direction === 'end' ? 'Scroll to end' : 'Scroll to start';
  }

  <template>
    <button
      aria-label={{this.label}}
      class={{cn
        "cn-message-scroller-button absolute inset-s-1/2 -translate-x-1/2 border-border bg-background text-foreground transition-[translate,scale,opacity] duration-200 hover:bg-muted hover:text-foreground data-[active=false]:pointer-events-none data-[active=false]:scale-95 data-[active=false]:opacity-0 data-[active=false]:duration-400 data-[active=true]:translate-y-0 data-[active=true]:scale-100 data-[active=true]:opacity-100 rtl:translate-x-1/2 data-[direction=start]:[&_svg]:rotate-180"
        @class
      }}
      data-active={{if this.active "true" "false"}}
      data-direction={{this.direction}}
      data-slot="message-scroller-button"
      {{on "click" (fn this.context.scrollTo this.direction)}}
      ...attributes
    >
      <ArrowDown class="size-4" />
      {{yield}}
    </button>
  </template>
}

export {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerViewport,
};
