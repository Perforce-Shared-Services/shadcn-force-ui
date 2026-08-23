import Component from '@glimmer/component';

import { Button } from '@/ui/button';
import { cn } from '@/lib/utils';

import type { TOC } from '@ember/component/template-only';

type AttachmentState = 'idle' | 'uploading' | 'processing' | 'error' | 'done';
type AttachmentSize = 'default' | 'sm' | 'xs';
type AttachmentOrientation = 'horizontal' | 'vertical';

function attachmentVariants(
  size: AttachmentSize,
  orientation: AttachmentOrientation,
  className?: string
): string {
  const baseClasses =
    'cn-attachment group/attachment relative flex max-w-full min-w-0 shrink-0 flex-wrap border bg-card text-card-foreground transition-colors has-[>a,>button]:hover:bg-muted/50 data-[state=error]:border-destructive/30 data-[state=idle]:border-dashed';

  const sizeClasses: Record<AttachmentSize, string> = {
    default: 'cn-attachment-size-default',
    sm: 'cn-attachment-size-sm',
    xs: 'cn-attachment-size-xs',
  };

  const orientationClasses: Record<AttachmentOrientation, string> = {
    horizontal: 'cn-attachment-orientation-horizontal items-center',
    vertical: 'cn-attachment-orientation-vertical flex-col',
  };

  return cn(baseClasses, sizeClasses[size], orientationClasses[orientation], className);
}

interface AttachmentSignature {
  Element: HTMLDivElement;
  Args: {
    class?: string;
    orientation?: AttachmentOrientation;
    size?: AttachmentSize;
    state?: AttachmentState;
  };
  Blocks: {
    default: [];
  };
}

class Attachment extends Component<AttachmentSignature> {
  get state(): AttachmentState {
    return this.args.state ?? 'done';
  }

  get size(): AttachmentSize {
    return this.args.size ?? 'default';
  }

  get orientation(): AttachmentOrientation {
    return this.args.orientation ?? 'horizontal';
  }

  get classes(): string {
    return attachmentVariants(this.size, this.orientation, this.args.class);
  }

  <template>
    <div
      class={{this.classes}}
      data-orientation={{this.orientation}}
      data-size={{this.size}}
      data-slot="attachment"
      data-state={{this.state}}
      ...attributes
    >
      {{yield}}
    </div>
  </template>
}

type MediaVariant = 'icon' | 'image';

function attachmentMediaVariants(variant: MediaVariant = 'icon', className?: string): string {
  const baseClasses =
    'cn-attachment-media relative flex aspect-square shrink-0 items-center justify-center overflow-hidden group-data-[state=error]/attachment:bg-destructive/10 group-data-[state=error]/attachment:text-destructive [&_svg]:pointer-events-none';

  const variantClasses: Record<MediaVariant, string> = {
    icon: 'cn-attachment-media-variant-icon',
    image:
      'cn-attachment-media-variant-image *:[img]:aspect-square *:[img]:w-full *:[img]:object-cover',
  };

  return cn(baseClasses, variantClasses[variant], className);
}

interface AttachmentMediaSignature {
  Element: HTMLDivElement;
  Args: {
    class?: string;
    variant?: MediaVariant;
  };
  Blocks: {
    default: [];
  };
}

class AttachmentMedia extends Component<AttachmentMediaSignature> {
  get variant(): MediaVariant {
    return this.args.variant ?? 'icon';
  }

  get classes(): string {
    return attachmentMediaVariants(this.variant, this.args.class);
  }

  <template>
    <div
      class={{this.classes}}
      data-slot="attachment-media"
      data-variant={{this.variant}}
      ...attributes
    >
      {{yield}}
    </div>
  </template>
}

interface AttachmentSubSignature {
  Element: HTMLDivElement;
  Args: {
    class?: string;
  };
  Blocks: {
    default: [];
  };
}

const AttachmentContent: TOC<AttachmentSubSignature> = <template>
  <div
    class={{cn "cn-attachment-content max-w-full min-w-0 flex-1" @class}}
    data-slot="attachment-content"
    ...attributes
  >
    {{yield}}
  </div>
</template>;

interface AttachmentTitleSignature {
  Element: HTMLSpanElement;
  Args: {
    class?: string;
  };
  Blocks: {
    default: [];
  };
}

const AttachmentTitle: TOC<AttachmentTitleSignature> = <template>
  <span
    class={{cn
      "cn-attachment-title block max-w-full min-w-0 truncate group-data-[state=processing]/attachment:shimmer group-data-[state=uploading]/attachment:shimmer"
      @class
    }}
    data-slot="attachment-title"
    ...attributes
  >
    {{yield}}
  </span>
</template>;

const AttachmentDescription: TOC<AttachmentTitleSignature> = <template>
  <span
    class={{cn
      "cn-attachment-description block min-w-0 truncate text-muted-foreground group-data-[state=error]/attachment:text-destructive/80 max-w-full"
      @class
    }}
    data-slot="attachment-description"
    ...attributes
  >
    {{yield}}
  </span>
</template>;

const AttachmentActions: TOC<AttachmentSubSignature> = <template>
  <div
    class={{cn "cn-attachment-actions flex shrink-0 items-center" @class}}
    data-slot="attachment-actions"
    ...attributes
  >
    {{yield}}
  </div>
</template>;

interface AttachmentActionSignature {
  Element: HTMLButtonElement;
  Args: {
    class?: string;
    size?: 'icon-xs' | 'icon-sm' | 'icon' | 'icon-lg' | 'icon-lg';
    variant?: 'ghost' | 'default' | 'destructive' | 'outline' | 'secondary' | 'link';
  };
  Blocks: {
    default: [];
  };
}

// [FORCE-UI] wraps Button so actions inherit button variants; defaults mirror React AttachmentAction (ghost / icon-xs)
class AttachmentAction extends Component<AttachmentActionSignature> {
  get classes(): string {
    return cn('cn-attachment-action', this.args.class);
  }

  <template>
    <Button
      @class={{this.classes}}
      @size={{(if @size @size "icon-xs")}}
      @variant={{(if @variant @variant "ghost")}}
      data-slot="attachment-action"
      ...attributes
    >
      {{yield}}
    </Button>
  </template>
}

interface AttachmentTriggerSignature {
  Element: HTMLButtonElement;
  Args: {
    class?: string;
    type?: 'button' | 'submit' | 'reset';
  };
  Blocks: {
    default: [];
  };
}

const AttachmentTrigger: TOC<AttachmentTriggerSignature> = <template>
  <button
    class={{cn "cn-attachment-trigger absolute inset-0 z-10 outline-none" @class}}
    data-slot="attachment-trigger"
    type={{(if @type @type "button")}}
    ...attributes
  >
    {{yield}}
  </button>
</template>;

interface AttachmentGroupSignature {
  Element: HTMLDivElement;
  Args: {
    class?: string;
  };
  Blocks: {
    default: [];
  };
}

const AttachmentGroup: TOC<AttachmentGroupSignature> = <template>
  <div
    class={{cn
      "cn-attachment-group flex min-w-0 scroll-fade-x snap-x snap-mandatory scrollbar-none overflow-x-auto overscroll-x-contain *:data-[slot=attachment]:flex-none *:data-[slot=attachment]:snap-start"
      @class
    }}
    data-slot="attachment-group"
    ...attributes
  >
    {{yield}}
  </div>
</template>;

export {
  Attachment,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
  AttachmentTrigger,
};
