import { getContext, hasContext, setContext } from "svelte";

export type Direction = "ltr" | "rtl";

const DIRECTION_CONTEXT = Symbol("DIRECTION_CONTEXT");

/**
 * [FORCE-UI] Svelte-5-idiomatic context: stores a getter thunk so the value
 * stays reactive without leaking runes into a plain .ts module. Must be called
 * during component initialisation (from direction-provider.svelte).
 */
export function setDirectionContext(getDirection: () => Direction): void {
	setContext(DIRECTION_CONTEXT, getDirection);
}

export function useDirection(): Direction {
	if (!hasContext(DIRECTION_CONTEXT)) {
		return "ltr";
	}
	const getDirection = getContext<() => Direction>(DIRECTION_CONTEXT);
	return getDirection();
}
