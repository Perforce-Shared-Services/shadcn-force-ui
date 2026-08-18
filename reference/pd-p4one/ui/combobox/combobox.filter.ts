/**
 * base-ui Combobox filter — faithful port of `@base-ui/react`'s
 * `internals/filter.ts`. Unlike `command` (which uses cmdk's fuzzy scorer), the
 * combobox matches with a locale-aware **substring "contains"** built on
 * `Intl.Collator`, so it is case- AND accent-insensitive (á == a == A) without a
 * scoring/ranking pass. Items keep their registration order (no re-sort).
 *
 * Collators are expensive to construct, so they are cached per
 * `locale|JSON.stringify(options)` exactly like base-ui.
 */

/** A predicate `(itemLabel, query) => matches`. */
export type ComboboxContains = (itemLabel: string, query: string) => boolean;

export interface ComboboxFilter {
  readonly contains: ComboboxContains;
  readonly startsWith: ComboboxContains;
  readonly endsWith: ComboboxContains;
}

/** Default collator options — base-ui's `usage:'search'` / `sensitivity:'base'`. */
const DEFAULT_OPTIONS: Intl.CollatorOptions = {
  usage: 'search',
  sensitivity: 'base',
  ignorePunctuation: true,
};

const collatorCache = new Map<string, Intl.Collator>();

function getCollator(
  locale: Intl.LocalesArgument,
  options: Intl.CollatorOptions,
): Intl.Collator {
  const key = `${JSON.stringify(locale) ?? ''}|${JSON.stringify(options)}`;
  let collator = collatorCache.get(key);
  if (!collator) {
    collator = new Intl.Collator(locale, options);
    collatorCache.set(key, collator);
  }
  return collator;
}

/**
 * Build a `{ contains, startsWith, endsWith }` filter bound to a collator.
 * `contains` slides a query-length window across the label and compares each
 * equal-length slice with the collator (NOT `String.prototype.includes`, which
 * cannot fold case/accents). An empty query matches everything.
 *
 * Angular equivalent of base-ui's exported `useFilter` hook.
 */
export function getComboboxFilter(
  locale: Intl.LocalesArgument = undefined,
  options: Intl.CollatorOptions = {},
): ComboboxFilter {
  const collator = getCollator(locale, { ...DEFAULT_OPTIONS, ...options });

  const contains: ComboboxContains = (label, query) => {
    if (!query) {
      return true;
    }
    const end = label.length - query.length;
    for (let i = 0; i <= end; i++) {
      if (collator.compare(label.slice(i, i + query.length), query) === 0) {
        return true;
      }
    }
    return false;
  };

  const startsWith: ComboboxContains = (label, query) => {
    if (!query) {
      return true;
    }
    return (
      label.length >= query.length &&
      collator.compare(label.slice(0, query.length), query) === 0
    );
  };

  const endsWith: ComboboxContains = (label, query) => {
    if (!query) {
      return true;
    }
    return (
      label.length >= query.length &&
      collator.compare(label.slice(label.length - query.length), query) === 0
    );
  };

  return { contains, startsWith, endsWith };
}

/** The default `contains` matcher at the runtime locale. */
export const comboboxContains: ComboboxContains = getComboboxFilter().contains;
