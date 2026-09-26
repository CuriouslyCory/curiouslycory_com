/** Average adult silent-reading speed for technical prose. */
const WORDS_PER_MINUTE = 225;

/**
 * Estimates how long a post takes to read, rounded up to whole minutes.
 * Always returns at least 1 so a stub post never reads as "0 min".
 */
export function readingTimeMinutes(text: string | null | undefined): number {
  const words = text?.trim().split(/\s+/).filter(Boolean).length ?? 0;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
