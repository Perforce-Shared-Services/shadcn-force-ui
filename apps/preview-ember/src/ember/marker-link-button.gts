import { concat } from '@ember/helper';
import { on } from '@ember/modifier';
import Component from '@glimmer/component';

import { Marker, MarkerContent, MarkerIcon } from '@/ember-ui/marker';

import GitBranch from '~icons/ms/account_tree';
import RotateCcw from '~icons/ms/refresh';

export default class MarkerLinkButton extends Component {
  handleRevert = () => {
    // eslint-disable-next-line no-console
    console.log('Revert clicked');
  };

  <template>
    <div class="flex w-full max-w-sm flex-col gap-8 py-12">
      <Marker @asChild={{true}} as |marker|>
        <a class={{marker.class}} data-slot={{marker.slot}} href="#links-and-buttons">
          <MarkerIcon>
            <GitBranch />
          </MarkerIcon>
          <MarkerContent>View the pull request</MarkerContent>
        </a>
      </Marker>
      <Marker @asChild={{true}} as |marker|>
        <button
          class={{concat marker.class " transition-colors hover:text-foreground"}}
          type="button"
          {{on "click" this.handleRevert}}
        >
          <MarkerIcon>
            <RotateCcw />
          </MarkerIcon>
          <MarkerContent>Revert this change</MarkerContent>
        </button>
      </Marker>
    </div>
  </template>
}
