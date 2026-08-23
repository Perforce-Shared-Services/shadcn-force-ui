import { inject, provide, type InjectionKey } from "vue"

/**
 * [FORCE-UI] Compact Vue port of @shadcn/react/message-scroller.
 * ponytail: covers auto-follow on append, edge tracking, and jump buttons;
 * no scroll-margin/peek tuning, prepend preservation, visibility tracking,
 * or programmatic commands yet — port packages/react/src/message-scroller
 * geometry/stores wholesale if transcripts need those behaviors.
 */

export interface MessageScrollerProviderProps {
  autoScroll?: boolean
  /** distance (px) from an edge within which the scroller counts as "at" it */
  scrollEdgeThreshold?: number
}

export interface MessageScrollerState {
  readonly autoScroll: boolean
  readonly scrollEdgeThreshold: number
  readonly atStart: boolean
  readonly atEnd: boolean
  scrollTo: (direction: "start" | "end") => void
}

export interface MessageScrollerController {
  setEdges: (atStart: boolean, atEnd: boolean) => void
  registerScrollTo: (fn: (direction: "start" | "end") => void) => void
}

const MESSAGE_SCROLLER_CONTEXT: InjectionKey<MessageScrollerState> = Symbol(
  "MESSAGE_SCROLLER_CONTEXT"
)
const MESSAGE_SCROLLER_CONTROLLER: InjectionKey<MessageScrollerController> =
  Symbol("MESSAGE_SCROLLER_CONTROLLER")

export function provideMessageScrollerContext(
  state: MessageScrollerState
): MessageScrollerState {
  provide(MESSAGE_SCROLLER_CONTEXT, state)
  return state
}

export function useMessageScrollerContext(
  name = "This component"
): MessageScrollerState {
  const state = inject(MESSAGE_SCROLLER_CONTEXT)
  if (!state) {
    throw new Error(`${name} must be used within a <MessageScrollerProvider>`)
  }
  return state
}

export function provideMessageScrollerController(
  controller: MessageScrollerController
): void {
  provide(MESSAGE_SCROLLER_CONTROLLER, controller)
}

/** null when no provider is above — viewport still renders without follow */
export function useMessageScrollerController(): MessageScrollerController | null {
  return inject(MESSAGE_SCROLLER_CONTROLLER, null)
}
