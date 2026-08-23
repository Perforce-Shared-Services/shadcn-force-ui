import { getContext, hasContext, setContext } from "svelte";

/**
 * [FORCE-UI] Compact Svelte port of @shadcn/react/message-scroller.
 * ponytail: covers auto-follow on append, edge tracking, and jump buttons;
 * no scroll-margin/peek tuning, prepend preservation, visibility tracking,
 * or programmatic commands yet — port packages/react/src/message-scroller
 * geometry/stores wholesale if transcripts need those behaviors.
 */

const MESSAGE_SCROLLER_CONTEXT = Symbol("MESSAGE_SCROLLER_CONTEXT");
const MESSAGE_SCROLLER_CONTROLLER = Symbol("MESSAGE_SCROLLER_CONTROLLER");

export type MessageScrollerProviderProps = {
	autoScroll?: boolean;
	/** distance (px) from an edge within which the scroller counts as "at" it */
	scrollEdgeThreshold?: number;
};

export type MessageScrollerState = {
	readonly autoScroll: boolean;
	readonly scrollEdgeThreshold: number;
	readonly atStart: boolean;
	readonly atEnd: boolean;
	scrollTo: (direction: "start" | "end") => void;
};

export function setMessageScrollerContext(
	state: MessageScrollerState
): MessageScrollerState {
	setContext(MESSAGE_SCROLLER_CONTEXT, state);
	return state;
}

export type MessageScrollerController = {
	setEdges: (atStart: boolean, atEnd: boolean) => void;
	registerScrollTo: (fn: (direction: "start" | "end") => void) => void;
};

export function setMessageScrollerController(
	controller: MessageScrollerController
): void {
	setContext(MESSAGE_SCROLLER_CONTROLLER, controller);
}

/** null when no provider is above — viewport still renders without follow */
export function getMessageScrollerController(): MessageScrollerController | null {
	if (!hasContext(MESSAGE_SCROLLER_CONTROLLER)) return null;
	return getContext<MessageScrollerController>(MESSAGE_SCROLLER_CONTROLLER);
}

export function getMessageScrollerContext(
	name = "This component"
): MessageScrollerState {
	if (!hasContext(MESSAGE_SCROLLER_CONTEXT)) {
		throw new Error(
			`${name} must be used within a <MessageScroller.Provider>`
		);
	}
	return getContext<MessageScrollerState>(MESSAGE_SCROLLER_CONTEXT);
}
