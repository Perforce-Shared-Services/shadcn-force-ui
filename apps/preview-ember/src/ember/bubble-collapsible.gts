import { fn } from '@ember/helper';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { Bubble, BubbleContent } from '@/ember-ui/bubble';
import { Collapsible, CollapsibleTrigger } from '@/ember-ui/collapsible';

import ChevronDown from '~icons/ms/keyboard_arrow_down';

const text = `The accessibility review found two focus states that were visually too subtle in dark mode.

I checked the dialog, menu, and drawer paths because each one renders focusable controls inside a layered surface.

The dialog and drawer are fine. The menu needs the hover and focus tokens split so keyboard focus stays visible when the pointer is not involved.

I also recommend keeping the change in the style file instead of the primitive so the other themes can choose their own focus treatment later.`;

const previewLength = 180;
const preview = `${text.slice(0, previewLength)}...`;

export default class BubbleCollapsible extends Component {
  @tracked open = false;

  get isLong() {
    return text.length > previewLength;
  }

  get showFull() {
    return this.open || !this.isLong;
  }

  <template>
    <div class="flex w-full max-w-sm flex-col gap-8 py-12">
      <Bubble @variant="muted">
        <BubbleContent>How can I help you today?</BubbleContent>
      </Bubble>

      <Bubble @align="end" @variant="muted">
        <BubbleContent @class="whitespace-pre-line">
          <Collapsible @onOpenChange={{fn (mut this.open)}} @open={{this.open}}>
            <div>{{#if this.showFull}}{{text}}{{else}}{{preview}}{{/if}}</div>
            {{#if this.isLong}}
              <CollapsibleTrigger
                @class="flex w-fit items-center gap-1 p-0 text-muted-foreground transition-colors hover:text-foreground"
              >
                {{#if this.open}}Show less{{else}}Show more{{/if}}
                <ChevronDown class="size-4" />
              </CollapsibleTrigger>
            {{/if}}
          </Collapsible>
        </BubbleContent>
      </Bubble>
    </div>
  </template>
}
