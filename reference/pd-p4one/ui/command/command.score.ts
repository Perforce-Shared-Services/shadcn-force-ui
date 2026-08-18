/**
 * Faithful port of cmdk's default filter — the `command-score` algorithm
 * (https://github.com/pacocoursey/cmdk → bundled `command-score`).
 *
 * The Force UI `command` registry item is built on cmdk, whose default
 * `filter` runs this fuzzy scorer over each item's value (+ keywords) against
 * the current search. There is no radix-ng / CDK primitive for a command
 * palette, so the whole matching behaviour is reimplemented here rather than
 * delegated. Keeping the exact scoring means an artist typing `chr rig` still
 * surfaces `Character_Rig_v3.blend` the same way it does in the React/Vue
 * siblings — parity is the contract.
 *
 * `commandScore(text, search, keywords?)` returns a score in [0, 1]. `0` means
 * no match (item hidden); higher means a better match (items sort by score).
 * Pure function — no state, no DOM.
 */

const SCORE_CONTINUE_MATCH = 1;
const SCORE_SPACE_WORD_JUMP = 0.9;
const SCORE_NON_SPACE_WORD_JUMP = 0.8;
const SCORE_CHARACTER_JUMP = 0.17;
const SCORE_TRANSPOSITION = 0.1;
const PENALTY_SKIPPED = 0.999;
const PENALTY_CASE_MISMATCH = 0.9999;
const PENALTY_NOT_COMPLETE = 0.99;

const IS_GAP_REGEXP = /[\\/_+.#"@[({&]/;
const COUNT_GAPS_REGEXP = /[\\/_+.#"@[({&]/g;
const IS_SPACE_REGEXP = /[\s-]/;
const COUNT_SPACE_REGEXP = /[\s-]/g;

function formatInput(str: string): string {
  // convert all valid space characters to a single space so we don't penalise
  // matching a space with a dash and vice-versa
  return str.toLowerCase().replace(COUNT_SPACE_REGEXP, ' ');
}

function commandScoreInner(
  str: string,
  abbreviation: string,
  lowerString: string,
  lowerAbbreviation: string,
  stringIndex: number,
  abbreviationIndex: number,
  memoizedResults: Record<string, number>,
): number {
  if (abbreviationIndex === abbreviation.length) {
    return stringIndex === str.length ? SCORE_CONTINUE_MATCH : PENALTY_NOT_COMPLETE;
  }

  const memoizeKey = `${stringIndex},${abbreviationIndex}`;
  if (memoizedResults[memoizeKey] !== undefined) {
    return memoizedResults[memoizeKey];
  }

  const abbreviationChar = lowerAbbreviation.charAt(abbreviationIndex);
  let index = lowerString.indexOf(abbreviationChar, stringIndex);
  let highScore = 0;

  while (index >= 0) {
    let score = commandScoreInner(
      str,
      abbreviation,
      lowerString,
      lowerAbbreviation,
      index + 1,
      abbreviationIndex + 1,
      memoizedResults,
    );

    if (score > highScore) {
      if (index === stringIndex) {
        score *= SCORE_CONTINUE_MATCH;
      } else if (IS_GAP_REGEXP.test(str.charAt(index - 1))) {
        score *= SCORE_NON_SPACE_WORD_JUMP;
        const wordBreaks = str.slice(stringIndex, index - 1).match(COUNT_GAPS_REGEXP);
        if (wordBreaks && stringIndex > 0) {
          score *= Math.pow(PENALTY_SKIPPED, wordBreaks.length);
        }
      } else if (IS_SPACE_REGEXP.test(str.charAt(index - 1))) {
        score *= SCORE_SPACE_WORD_JUMP;
        const spaceBreaks = str.slice(stringIndex, index - 1).match(COUNT_SPACE_REGEXP);
        if (spaceBreaks && stringIndex > 0) {
          score *= Math.pow(PENALTY_SKIPPED, spaceBreaks.length);
        }
      } else {
        score *= SCORE_CHARACTER_JUMP;
        if (stringIndex > 0) {
          score *= Math.pow(PENALTY_SKIPPED, index - stringIndex);
        }
      }

      if (str.charAt(index) !== abbreviation.charAt(abbreviationIndex)) {
        score *= PENALTY_CASE_MISMATCH;
      }
    }

    if (
      (score < SCORE_TRANSPOSITION &&
        lowerString.charAt(index - 1) === lowerAbbreviation.charAt(abbreviationIndex + 1)) ||
      (lowerAbbreviation.charAt(abbreviationIndex + 1) === lowerAbbreviation.charAt(abbreviationIndex) &&
        lowerString.charAt(index - 1) !== lowerAbbreviation.charAt(abbreviationIndex))
    ) {
      const transposedScore = commandScoreInner(
        str,
        abbreviation,
        lowerString,
        lowerAbbreviation,
        index + 1,
        abbreviationIndex + 2,
        memoizedResults,
      );
      if (transposedScore * SCORE_TRANSPOSITION > score) {
        score = transposedScore * SCORE_TRANSPOSITION;
      }
    }

    if (score > highScore) {
      highScore = score;
    }

    index = lowerString.indexOf(abbreviationChar, index + 1);
  }

  memoizedResults[memoizeKey] = highScore;
  return highScore;
}

/**
 * Score how well `search` matches `text` (with optional `keywords` appended to
 * the searchable string, exactly as cmdk does). Returns 0 for no match.
 */
export function commandScore(text: string, search: string, keywords?: string[]): number {
  const haystack = keywords && keywords.length > 0 ? `${text} ${keywords.join(' ')}` : text;
  return commandScoreInner(
    haystack,
    search,
    formatInput(haystack),
    formatInput(search),
    0,
    0,
    {},
  );
}
