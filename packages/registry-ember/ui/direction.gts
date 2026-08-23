import Component from '@glimmer/component';
import { provide } from 'ember-provide-consume-context';

type Direction = 'ltr' | 'rtl';

const DirectionContext = 'direction-context' as const;

interface ContextRegistry {
  [DirectionContext]: { direction: Direction };
}

interface DirectionProviderSignature {
  Element: HTMLDivElement;
  Args: {
    class?: string;
    /** Text direction applied to the subtree via the `dir` attribute and provided to descendants. */
    direction?: Direction;
  };
  Blocks: {
    default: [];
  };
}

/**
 * Provides text direction to descendant components and sets `dir` on its
 * element — mirrors React's DirectionProvider (bases/radix + bases/base).
 * Components that need programmatic access can consume
 * `direction-context` via ember-provide-consume-context.
 */
class DirectionProvider extends Component<DirectionProviderSignature> {
  // [FORCE-UI] default direction matches React defaultVariants (ltr)
  get direction(): Direction {
    return this.args.direction ?? 'ltr';
  }

  @provide(DirectionContext)
  get context(): ContextRegistry[typeof DirectionContext] {
    return { direction: this.direction };
  }

  <template>
    <div
      class={{@class}}
      dir={{this.direction}}
      data-slot="direction-provider"
      ...attributes
    >
      {{yield}}
    </div>
  </template>
}

export { DirectionProvider };
