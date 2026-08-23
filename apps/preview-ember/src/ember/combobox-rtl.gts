// [FORCE-UI] Ember port of examples/base/combobox-rtl.tsx. Fixed rtl dir per
// the ember RTL demo convention.
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

export default class ComboboxRtl extends Component {
  @tracked open = false;

  handleSelect = () => {
    this.open = false;
  };

  <template>
    <div dir="rtl">
      <Popover @open={{this.open}} @onOpenChange={{fn (mut this.open)}}>
        <PopoverTrigger>
          {{! template-lint-disable require-mandatory-role-attributes }}
          <Button
            aria-expanded={{this.open}}
            role="combobox"
            @class="w-[200px] justify-between"
            @variant="outline"
          >
            اختر إطار عمل
            <ChevronsUpDownIcon class="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent @class="w-[200px] p-0" dir="rtl">
          <Command dir="rtl">
            <CommandInput @placeholder="اختر إطار عمل" />
            <CommandList>
              <CommandEmpty>لم يتم العثور على عناصر.</CommandEmpty>
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
    </div>
  </template>
}
