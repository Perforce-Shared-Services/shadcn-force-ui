import Component from '@glimmer/component';

import { cn } from '@/lib/utils';

import type { TOC } from '@ember/component/template-only';

type BubbleVariant =
  | 'default'
  | 'secondary'
  | 'muted'
  | 'tinted'
  | 'outline'
  | 'ghost'
  | 'destructive';

function bubbleVariants(variant: BubbleVariant = 'default', className?: string): string {
  const baseClasses = 'cn-bubble group/bubble relative flex w-fit min-w-0 flex-col';

  const variantClasses: Record<BubbleVariant, string> = {
    default: 'cn-bubble-variant-default',
    secondary: 'cn-bubble-variant-secondary',
    muted: 'cn-bubble-variant-muted',
    tinted: 'cn-bubble-variant-tinted',
    outline: 'cn-bubble-variant-outline',
    ghost: 'cn-bubble-variant-ghost',
    destructive: 'cn-bubble-variant-destructive',
  };

  return cn(baseClasses, variantClasses[variant], className);
}

interface BubbleGroupSignature {
  Element: HTMLDivElement;
  Args: {
    class?: string;
  };
  Blocks: {
    default: [];
  };
}

const BubbleGroup: TOC<BubbleGroupSignature> = <template>
  <div
    class={{cn "cn-bubble-group flex min-w-0 flex-col" @class}}
    data-slot="bubble-group"
    ...attributes
  >
    {{yield}}
  </div>
</template>;

interface BubbleSignature {
  Element: HTMLDivElement;
  Args: {
    align?: 'start' | 'end';
    class?: string;
    variant?: BubbleVariant;
  };
  Blocks: {
    default: [];
  };
}

class Bubble extends Component<BubbleSignature> {
  get variant(): BubbleVariant {
    return this.args.variant ?? 'default';
  }

  get align(): 'start' | 'end' {
    return this.args.align ?? 'start';
  }

  get classes(): string {
    return bubbleVariants(this.variant, this.args.class);
  }

  <template>
    <div
      class={{this.classes}}
      data-align={{this.align}}
      data-slot="bubble"
      data-variant={{this.variant}}
      ...attributes
    >
      {{yield}}
    </div>
  </template>
}

interface BubbleContentSignature {
  Element: HTMLDivElement;
  Args: {
    class?: string;
  };
  Blocks: {
    default: [];
  };
}

const BubbleContent: TOC<BubbleContentSignature> = <template>
  <div
    class={{cn
      "cn-bubble-content w-fit max-w-full min-w-0 overflow-hidden wrap-break-word [button]:text-left [button,a]:transition-colors"
      @class
    }}
    data-slot="bubble-content"
    ...attributes
  >
    {{yield}}
  </div>
</template>;

interface BubbleReactionsSignature {
  Element: HTMLDivElement;
  Args: {
    align?: 'start' | 'end';
    class?: string;
    side?: 'top' | 'bottom';
  };
  Blocks: {
    default: [];
  };
}

function bubbleReactionsVariants(
  side: 'top' | 'bottom',
  align: 'start' | 'end',
  className?: string
): string {
  const baseClasses = 'cn-bubble-reactions absolute z-10 flex w-fit items-center justify-center';

  const sideClasses: Record<string, string> = {
    top: 'cn-bubble-reactions-side-top',
    bottom: 'cn-bubble-reactions-side-bottom',
  };

  const alignClasses: Record<string, string> = {
    start: 'cn-bubble-reactions-align-start',
    end: 'cn-bubble-reactions-align-end',
  };

  return cn(baseClasses, sideClasses[side], alignClasses[align], className);
}

class BubbleReactions extends Component<BubbleReactionsSignature> {
  get side(): 'top' | 'bottom' {
    return this.args.side ?? 'bottom';
  }

  get align(): 'start' | 'end' {
    return this.args.align ?? 'end';
  }

  get classes(): string {
    return bubbleReactionsVariants(this.side, this.align, this.args.class);
  }

  <template>
    <div
      class={{this.classes}}
      data-align={{this.align}}
      data-side={{this.side}}
      data-slot="bubble-reactions"
      ...attributes
    >
      {{yield}}
    </div>
  </template>
}

export { BubbleGroup, Bubble, BubbleContent, BubbleReactions, bubbleVariants };
