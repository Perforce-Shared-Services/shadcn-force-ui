import { hash } from '@ember/helper';
import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';
import { consume, provide } from 'ember-provide-consume-context';

import X from '~icons/ms/close';

import { cn } from '@/lib/utils';

import type { TOC } from '@ember/component/template-only';

type Side = 'top' | 'bottom' | 'left' | 'right';

const DrawerContext = 'drawer-context' as const;

interface DrawerContextValue {
  open: boolean;
  isRendered: boolean;
  setOpen: (open: boolean) => void;
  finishClose: () => void;
}

interface ContextRegistry {
  [DrawerContext]: DrawerContextValue;
}

// [FORCE-UI] Ember port of the React drawer (bases/radix + bases/base).
// ponytail: no drag-to-dismiss gestures and no snap points (vaul features) —
// open/close is click/overlay/Esc driven; add pointer-drag if mobile UX needs it.
class Drawer extends Component<DrawerSignature> {
  @tracked isOpen = false;
  @tracked isOpenOrClosing = false;

  get open() {
    return this.args.open ?? this.isOpen;
  }

  get isRendered() {
    return this.open || this.isOpenOrClosing;
  }

  setOpen = (open: boolean) => {
    if (open) {
      this.isOpenOrClosing = true;
      this.isOpen = true;
    } else {
      this.isOpen = false;
    }
    this.args.onOpenChange?.(open);
  };

  finishClose = () => {
    if (!this.open) {
      this.isOpenOrClosing = false;
    }
  };

  @provide(DrawerContext)
  get context(): DrawerContextValue {
    return {
      open: this.open,
      isRendered: this.isRendered,
      setOpen: this.setOpen,
      finishClose: this.finishClose,
    };
  }

  <template>
    <div data-slot="drawer">
      {{yield}}
    </div>
  </template>
}

interface DrawerSignature {
  Args: {
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    open?: boolean;
  };
  Blocks: {
    default: [];
  };
}

interface DrawerTriggerSignature {
  Element: HTMLButtonElement;
  Args: {
    class?: string;
    asChild?: boolean;
  };
  Blocks: {
    default: [];
  };
}

class DrawerTrigger extends Component<DrawerTriggerSignature> {
  @consume(DrawerContext) context!: ContextRegistry[typeof DrawerContext];

  handleClick = () => {
    this.context.setOpen(true);
  };

  <template>
    {{#if @asChild}}
      <span
        class="contents"
        data-slot="drawer-trigger"
        role="button"
        tabindex="0"
        {{on "click" this.handleClick}}
        {{on "keydown" this.handleClick}}
        ...attributes
      >
        {{yield (hash)}}
      </span>
    {{else}}
      <button
        class={{cn @class}}
        data-slot="drawer-trigger"
        type="button"
        {{on "click" this.handleClick}}
        ...attributes
      >
        {{yield}}
      </button>
    {{/if}}
  </template>
}

interface DrawerCloseSignature {
  Element: HTMLButtonElement;
  Args: {
    class?: string;
    asChild?: boolean;
  };
  Blocks: {
    default: [];
  };
}

class DrawerClose extends Component<DrawerCloseSignature> {
  @consume(DrawerContext) context!: ContextRegistry[typeof DrawerContext];

  handleClick = () => {
    this.context.setOpen(false);
  };

  <template>
    {{#if @asChild}}
      <span
        class="contents"
        data-slot="drawer-close"
        role="button"
        tabindex="0"
        {{on "click" this.handleClick}}
        {{on "keydown" this.handleClick}}
        ...attributes
      >
        {{yield (hash)}}
      </span>
    {{else}}
      <button
        class={{cn @class}}
        data-slot="drawer-close"
        type="button"
        {{on "click" this.handleClick}}
        ...attributes
      >
        {{yield}}
      </button>
    {{/if}}
  </template>
}

interface DrawerPortalSignature {
  Blocks: {
    default: [];
  };
}

const DrawerPortal: TOC<DrawerPortalSignature> = <template>
  <div data-slot="drawer-portal">
    {{yield}}
  </div>
</template>;

interface DrawerOverlaySignature {
  Element: HTMLDivElement;
  Args: {
    class?: string;
  };
  Blocks: {
    default: [];
  };
}

class DrawerOverlay extends Component<DrawerOverlaySignature> {
  @consume(DrawerContext) context!: ContextRegistry[typeof DrawerContext];

  handleClick = () => {
    this.context.setOpen(false);
  };

  handleAnimationEnd = (event: AnimationEvent) => {
    if (event.target === event.currentTarget && !this.context.open) {
      this.context.finishClose();
    }
  };

  <template>
    {{! template-lint-disable no-invalid-interactive }}
    <div
      class={{cn
        "cn-drawer-overlay fixed inset-0 z-50 duration-100 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"
        @class
      }}
      data-slot="drawer-overlay"
      data-state={{if this.context.open "open" "closed"}}
      {{on "animationend" this.handleAnimationEnd}}
      {{on "click" this.handleClick}}
      ...attributes
    ></div>
  </template>
}

interface DrawerContentSignature {
  Element: HTMLDivElement;
  Args: {
    class?: string;
    /** Edge the drawer slides in from. Default "bottom" (matches React/vaul default). */
    side?: Side;
  };
  Blocks: {
    default: [];
  };
}

class DrawerContent extends Component<DrawerContentSignature> {
  @consume(DrawerContext) context!: ContextRegistry[typeof DrawerContext];

  get destinationElement() {
    return document.body;
  }

  get side(): Side {
    return this.args.side ?? 'bottom';
  }

  get classes() {
    return cn(
      // [FORCE-UI] positioning classes mirror the React drawer-content per-direction utilities
      'cn-drawer-content group/drawer-content fixed z-50 data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:mt-24 data-[side=bottom]:max-h-[80vh] data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:w-3/4 data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:w-3/4 data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:mb-24 data-[side=top]:max-h-[80vh] data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm',
      this.args.class
    );
  }

  scrollLock = modifier(
    (_element, _positional, { enabled = true }: { enabled?: boolean } = {}) => {
      if (!enabled) {
        return;
      }

      document.body.classList.add('overflow-hidden');

      return () => {
        document.body.classList.remove('overflow-hidden');
      };
    }
  );

  handleAnimationEnd = (event: AnimationEvent) => {
    if (event.target === event.currentTarget && !this.context.open) {
      this.context.finishClose();
    }
  };

  handleCloseClick = () => {
    this.context.setOpen(false);
  };

  <template>
    {{#if this.context.isRendered}}
      {{#in-element this.destinationElement insertBefore=null}}
        <DrawerPortal>
          <DrawerOverlay />
          <div
            class={{this.classes}}
            data-side={{this.side}}
            data-slot="drawer-content"
            data-state={{if this.context.open "open" "closed"}}
            role="dialog"
            {{on "animationend" this.handleAnimationEnd}}
            {{this.scrollLock enabled=this.context.open}}
            ...attributes
          >
            {{! [FORCE-UI] decorative grab-handle affordance, shown only for bottom drawers }}
            <div
              aria-hidden="true"
              class="cn-drawer-handle mx-auto hidden shrink-0 group-data-[side=bottom]/drawer-content:block"
            />
            {{yield}}
          </div>
        </DrawerPortal>
      {{/in-element}}
    {{/if}}
  </template>
}

interface DrawerHeaderSignature {
  Element: HTMLDivElement;
  Args: {
    class?: string;
  };
  Blocks: {
    default: [];
  };
}

const DrawerHeader: TOC<DrawerHeaderSignature> = <template>
  <div
    class={{cn
      "cn-drawer-header flex flex-col group-data-[side=bottom]/drawer-content:text-center group-data-[side=top]/drawer-content:text-center"
      @class
    }}
    data-slot="drawer-header"
    ...attributes
  >
    {{yield}}
  </div>
</template>;

interface DrawerFooterSignature {
  Element: HTMLDivElement;
  Args: {
    class?: string;
  };
  Blocks: {
    default: [];
  };
}

const DrawerFooter: TOC<DrawerFooterSignature> = <template>
  <div
    class={{cn "cn-drawer-footer mt-auto flex flex-col" @class}}
    data-slot="drawer-footer"
    ...attributes
  >
    {{yield}}
  </div>
</template>;

interface DrawerTitleSignature {
  Element: HTMLHeadingElement;
  Args: {
    class?: string;
  };
  Blocks: {
    default: [];
  };
}

const DrawerTitle: TOC<DrawerTitleSignature> = <template>
  <h2
    class={{cn "cn-drawer-title cn-font-heading" @class}}
    data-slot="drawer-title"
    ...attributes
  >
    {{yield}}
  </h2>
</template>;

interface DrawerDescriptionSignature {
  Element: HTMLParagraphElement;
  Args: {
    class?: string;
  };
  Blocks: {
    default: [];
  };
}

const DrawerDescription: TOC<DrawerDescriptionSignature> = <template>
  <p
    class={{cn "cn-drawer-description" @class}}
    data-slot="drawer-description"
    ...attributes
  >
    {{yield}}
  </p>
</template>;

export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
