// [FORCE-UI] Ember port of examples/base/combobox-invalid.tsx.
import { fn } from '@ember/helper';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { eq } from 'ember-truth-helpers';
import { Button } from '@/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import { cn } from '@/lib/utils';

import CheckIcon from '~icons/ms/check';
import ChevronsUpDownIcon from '~icons/ms/unfold_more';

const frameworks = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro'];

export default class ComboboxInvalid extends Component {
  @tracked open = false;
  @tracked value = '';

  handleSelect = (currentValue: string) => {
    this.value = currentValue === this.value ? '' : currentValue;
    this.open = false;
  };

  <template>
    <Popover @open={{this.open}} @onOpenChange={{fn (mut this.open)}}>
      <PopoverTrigger>
        {{! template-lint-disable require-mandatory-role-attributes }}
        <Button
          aria-expanded={{this.open}}
          aria-invalid="true"
          role="combobox"
          @class="w-[200px] justify-between"
          @variant="outline"
        >
          {{if this.value this.value "Select a framework"}}
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
                >
                  {{framework}}
                  <CheckIcon
                    class={{cn
                      "ml-auto size-4"
                      (if (eq this.value framework) "opacity-100" "opacity-0")
                    }}
                  />
                </CommandItem>
              {{/each}}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </template>
}
