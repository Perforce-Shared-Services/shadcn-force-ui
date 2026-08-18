import { InjectionToken } from '@angular/core';

/**
 * DI handle a `CommandGroup` exposes so a `CommandItem` nested inside it can
 * report its `groupId` to the root (which drives group hiding when the group
 * has no visible items). Items rendered outside any group inject nothing.
 */
export interface CommandGroupContext {
  readonly groupId: string;
}

export const COMMAND_GROUP = new InjectionToken<CommandGroupContext>('COMMAND_GROUP');
