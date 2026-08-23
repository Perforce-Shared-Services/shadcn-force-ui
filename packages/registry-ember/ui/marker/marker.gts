import Component from '@glimmer/component';

import { cn } from '@/lib/utils';

import type { TOC } from '@ember/component/template-only';

type MarkerVariant = 'default' | 'separator' | 'border';

function markerVariants(variant: MarkerVariant = 'default', className?: string): string {
  const baseClasses = 'cn-marker group/marker relative flex w-full items-center';

  const variantClasses: Record<MarkerVariant, string> = {
    default: 'cn-marker-variant-default',
    separator: 'cn-marker-variant-separator',
    border: 'cn-marker-variant-border',
  };

  return cn(baseClasses, variantClasses[variant], className);
}

interface MarkerSignature {
  Element: HTMLDivElement;
  Args: {
    asChild?: boolean;
    class?: string;
    variant?: MarkerVariant;
  };
  Blocks: {
    default: [
      {
        slot: string;
        variant: MarkerVariant;
        class: string;
      },
    ];
  };
}

class Marker extends Component<MarkerSignature> {
  get variant(): MarkerVariant {
    return this.args.variant ?? 'default';
  }

  get classes(): string {
    return markerVariants(this.variant, this.args.class);
  }

  get yieldedContext() {
    return {
      slot: 'marker',
      variant: this.variant,
      class: this.classes,
    };
  }

  <template>
    {{#if @asChild}}
      {{yield this.yieldedContext}}
    {{else}}
      <div
        class={{this.classes}}
        data-slot="marker"
        data-variant={{this.variant}}
        ...attributes
      >
        {{yield}}
      </div>
    {{/if}}
  </template>
}

interface MarkerIconSignature {
  Element: HTMLSpanElement;
  Args: {
    class?: string;
  };
  Blocks: {
    default: [];
  };
}

const MarkerIcon: TOC<MarkerIconSignature> = <template>
  <span
    aria-hidden="true"
    class={{cn "cn-marker-icon shrink-0" @class}}
    data-slot="marker-icon"
    ...attributes
  >
    {{yield}}
  </span>
</template>;

interface MarkerContentSignature {
  Element: HTMLSpanElement;
  Args: {
    class?: string;
  };
  Blocks: {
    default: [];
  };
}

const MarkerContent: TOC<MarkerContentSignature> = <template>
  <span
    class={{cn "cn-marker-content min-w-0 wrap-break-word" @class}}
    data-slot="marker-content"
    ...attributes
  >
    {{yield}}
  </span>
</template>;

export { Marker, MarkerIcon, MarkerContent, markerVariants };
