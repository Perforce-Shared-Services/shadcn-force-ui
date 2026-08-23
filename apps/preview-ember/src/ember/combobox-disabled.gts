// [FORCE-UI] Ember port of examples/base/combobox-disabled.tsx.
import { fn } from '@ember/helper';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Button } from '@/ember-ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/ember-ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/ember-ui/popover';

import ChevronsUpDownIcon from '~icons/ms/unfold_more';

const frameworks = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro'];

export default class ComboboxDisabled extends Component {
  @tracked open = false;

  handleSelect = () => {
    this.open = false;
  };

  <template>
    <Popover @open={{this.open}} @onOpenChange={{fn (mut this.open)}}>
      <PopoverTrigger disabled={{true}}>
        <Button
          aria-expanded={{this.open}}
          disabled={{true}}
          role="combobox"
          @class="w-[200px] justify-between"
          @variant="outline"
        >
          Select a framework
          <ChevronsUpDownIcon class="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent @class="w-[200px] p-0">
        <Command>
          <CommandInput @placeholder="Select a framework" />
          <CommandList>
            <CommandEmpty>No items found.</CommandEmpty>
            <CommandGroup>
              {{#each frameworks as |framework|}}
                <CommandItem
                  @onSelect={{this.handleSelect}}
                  @value={{framework}}
                >{{framework}}</CommandItem>
              {{/each}}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </template>
}
