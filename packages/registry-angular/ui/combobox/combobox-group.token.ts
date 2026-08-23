import { InjectionToken, type WritableSignal } from '@angular/core';

/**
 * DI handle a `ComboboxGroup` exposes so a `ComboboxItem` nested inside it can
 * report its `groupId` to the root (which drives group hiding when the group has
 * no visible items), and so a `ComboboxLabel` can register its id for the group's
 * `aria-labelledby`. Items/labels rendered outside any group inject nothing.
 */
export interface ComboboxGroupContext {
  readonly groupId: string;
  /** The child `ComboboxLabel`'s element id (for `aria-labelledby`). */
  readonly labelId: WritableSignal<string | null>;
}

export const COMBOBOX_GROUP = new InjectionToken<ComboboxGroupContext>('COMBOBOX_GROUP');
