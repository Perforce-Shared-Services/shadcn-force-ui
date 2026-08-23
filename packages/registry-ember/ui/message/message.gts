import Component from '@glimmer/component';

import { cn } from '@/lib/utils';

import type { TOC } from '@ember/component/template-only';

interface MessageGroupSignature {
  Element: HTMLDivElement;
  Args: {
    class?: string;
  };
  Blocks: {
    default: [];
  };
}

const MessageGroup: TOC<MessageGroupSignature> = <template>
  <div
    class={{cn "cn-message-group flex min-w-0 flex-col" @class}}
    data-slot="message-group"
    ...attributes
  >
    {{yield}}
  </div>
</template>;

interface MessageSignature {
  Element: HTMLDivElement;
  Args: {
    align?: 'start' | 'end';
    class?: string;
  };
  Blocks: {
    default: [];
  };
}

interface MessageSubSignature {
  Element: HTMLDivElement;
  Args: {
    class?: string;
  };
  Blocks: {
    default: [];
  };
}

function messageClasses(align: 'start' | 'end', className?: string): string {
  return cn(
    'cn-message group/message relative flex w-full min-w-0 data-[align=end]:flex-row-reverse',
    className
  );
}

export class Message extends Component<MessageSignature> {
  get align(): 'start' | 'end' {
    return this.args.align ?? 'start';
  }

  get classes(): string {
    return messageClasses(this.align, this.args.class);
  }

  <template>
    <div class={{this.classes}} data-align={{this.align}} data-slot="message" ...attributes>
      {{yield}}
    </div>
  </template>
}

const MessageAvatar: TOC<MessageSubSignature> = <template>
  <div
    class={{cn
      "cn-message-avatar flex w-fit shrink-0 items-center justify-center self-end overflow-hidden rounded-full bg-muted"
      @class
    }}
    data-slot="message-avatar"
    ...attributes
  >
    {{yield}}
  </div>
</template>;

const MessageContent: TOC<MessageSubSignature> = <template>
  <div
    class={{cn "cn-message-content flex w-full min-w-0 flex-col wrap-break-word" @class}}
    data-slot="message-content"
    ...attributes
  >
    {{yield}}
  </div>
</template>;

const MessageHeader: TOC<MessageSubSignature> = <template>
  <div
    class={{cn "cn-message-header flex max-w-full min-w-0 items-center" @class}}
    data-slot="message-header"
    ...attributes
  >
    {{yield}}
  </div>
</template>;

const MessageFooter: TOC<MessageSubSignature> = <template>
  <div
    class={{cn
      "cn-message-footer flex max-w-full min-w-0 items-center group-data-[align=end]/message:justify-end"
      @class
    }}
    data-slot="message-footer"
    ...attributes
  >
    {{yield}}
  </div>
</template>;

export {
  MessageGroup,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
};
