import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import Component from '@glimmer/component';

import { Bubble, BubbleContent, BubbleGroup } from '@/ember-ui/bubble';

export default class BubbleLinkButton extends Component {
  handleClick = (message: string) => {
    // eslint-disable-next-line no-console
    console.log(message);
  };

  <template>
    <div class="flex w-full max-w-sm flex-col gap-8 py-12">
      <Bubble @variant="muted">
        <BubbleContent>How can I help you today?</BubbleContent>
      </Bubble>
      <BubbleGroup>
        <Bubble @align="end" @variant="tinted">
          <BubbleContent>
            <button
              class="text-left transition-colors hover:underline"
              type="button"
              {{on "click" (fn this.handleClick "You clicked forgot password")}}
            >
              I forgot my password
            </button>
          </BubbleContent>
        </Bubble>
        <Bubble @align="end" @variant="tinted">
          <BubbleContent>
            <button
              class="text-left transition-colors hover:underline"
              type="button"
              {{on "click" (fn this.handleClick "You clicked help with subscription")}}
            >
              I need help with my subscription
            </button>
          </BubbleContent>
        </Bubble>
        <Bubble @align="end" @variant="tinted">
          <BubbleContent>
            <button
              class="text-left transition-colors hover:underline"
              type="button"
              {{on "click" (fn this.handleClick "You clicked something else. Talk to a human.")}}
            >
              Something else. Talk to a human.
            </button>
          </BubbleContent>
        </Bubble>
      </BubbleGroup>
    </div>
  </template>
}
