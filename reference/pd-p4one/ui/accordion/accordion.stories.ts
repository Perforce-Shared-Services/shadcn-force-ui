import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './';

interface AccordionStoryArgs {
  type: 'single' | 'multiple';
  collapsible: boolean;
  disabled: boolean;
  orientation: 'vertical' | 'horizontal';
  defaultValue: string;
}

/**
 * `[uiAccordion]` is the Angular port of the Force UI (radix-force-ui)
 * accordion. The set is attribute-selector based and composes
 * `@radix-ng/primitives` for open/close, single/multiple, keyboard nav, and
 * aria. Stories render the real compound markup.
 */
const meta: Meta<AccordionStoryArgs> = {
  title: 'UI/Accordion',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [Accordion, AccordionItem, AccordionTrigger, AccordionContent] }),
  ],
  argTypes: {
    type: {
      control: 'inline-radio',
      options: ['single', 'multiple'],
      description: 'Whether one item or many can be open at once',
    },
    collapsible: {
      control: 'boolean',
      description: 'When type=single, allow closing the open item by clicking it',
    },
    disabled: { control: 'boolean', description: 'Disable the whole accordion' },
    orientation: {
      control: 'inline-radio',
      options: ['vertical', 'horizontal'],
      description: 'Arrow-key navigation axis',
    },
    defaultValue: {
      control: 'text',
      description: 'Item value open on load (single mode)',
    },
  },
  args: {
    type: 'single',
    collapsible: true,
    disabled: false,
    orientation: 'vertical',
    defaultValue: 'item-1',
  },
};

export default meta;
type Story = StoryObj<AccordionStoryArgs>;

/**
 * Args-driven playground — flip `type`, `collapsible`, `disabled`,
 * `orientation`, and `defaultValue` in the Controls panel.
 */
export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div
        uiAccordion
        [type]="type"
        [collapsible]="collapsible"
        [disabled]="disabled"
        [orientation]="orientation"
        [defaultValue]="defaultValue"
        class="w-[400px]"
      >
        <div uiAccordionItem value="item-1">
          <h3 uiAccordionTrigger>Where do my changes live?</h3>
          <div uiAccordionContent>
            Saved versions stay on your machine until you submit them.
          </div>
        </div>
        <div uiAccordionItem value="item-2">
          <h3 uiAccordionTrigger>Can I work without affecting the main version?</h3>
          <div uiAccordionContent>
            Yes. Start an experiment to try ideas in an isolated sandbox.
          </div>
        </div>
        <div uiAccordionItem value="item-3">
          <h3 uiAccordionTrigger>How do I share work in progress?</h3>
          <div uiAccordionContent>
            Save it for later or share it for feedback without submitting.
          </div>
        </div>
      </div>
    `,
  }),
};

/** Single-open accordion, collapsible — the canonical example. */
export const Default: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiAccordion type="single" collapsible defaultValue="item-1" class="w-[400px]">
        <div uiAccordionItem value="item-1">
          <h3 uiAccordionTrigger>Where do my changes live?</h3>
          <div uiAccordionContent>Saved versions stay on your machine until you submit them.</div>
        </div>
        <div uiAccordionItem value="item-2">
          <h3 uiAccordionTrigger>Can I work without affecting the main version?</h3>
          <div uiAccordionContent>
            Yes. Start an experiment to try ideas in an isolated sandbox.
          </div>
        </div>
        <div uiAccordionItem value="item-3">
          <h3 uiAccordionTrigger>How do I share work in progress?</h3>
          <div uiAccordionContent>
            Save it for later or share it for feedback without submitting.
          </div>
        </div>
      </div>
    `,
  }),
};

/** Multiple items open at once. */
export const Multiple: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiAccordion type="multiple" class="w-[400px]">
        <div uiAccordionItem value="item-1">
          <h3 uiAccordionTrigger>First section</h3>
          <div uiAccordionContent>Open me and the others stay open too.</div>
        </div>
        <div uiAccordionItem value="item-2">
          <h3 uiAccordionTrigger>Second section</h3>
          <div uiAccordionContent>Independent open state per item.</div>
        </div>
      </div>
    `,
  }),
};

/** A disabled item cannot be toggled (native `disabled` from radix-ng). */
export const DisabledItem: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiAccordion type="single" collapsible class="w-[400px]">
        <div uiAccordionItem value="item-1">
          <h3 uiAccordionTrigger>Enabled</h3>
          <div uiAccordionContent>This one opens.</div>
        </div>
        <div uiAccordionItem value="item-2" disabled>
          <h3 uiAccordionTrigger>Disabled</h3>
          <div uiAccordionContent>This one is locked.</div>
        </div>
      </div>
    `,
  }),
};
