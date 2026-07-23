/**
 * Split extracted post prose into overlapping chunks for embedding.
 *
 * `Post.content` is currently a flat, single-spaced string (the #43 AST
 * extractor collapses all whitespace — see `blog-content-extractor.ts`), so
 * the "paragraph-aware" boundary preference below degrades to
 * sentence/word/hard splitting on real posts today. The hierarchy is kept
 * anyway so future content that *does* preserve paragraph breaks benefits
 * without a rewrite here. Do not "fix" this by modifying the extractor —
 * that's out of scope and would rehash every post's `contentHash`.
 *
 * Boundary preference (search backwards from the ideal cut point for the
 * latest match): paragraph break (`\n{2,}`) → single newline (`\n`) →
 * sentence end (`. `, `! `, `? `) → whitespace → hard cut.
 */

export interface TextChunk {
  index: number;
  content: string;
}

export interface ChunkTextOptions {
  maxChars?: number;
  overlap?: number;
}

const PARAGRAPH_BOUNDARY = /\n{2,}/g;
const SENTENCE_BOUNDARY = /[.!?]\s/g;

/**
 * Find the best cut point in `text.slice(start, ...)` at or before the ideal
 * end offset `idealEnd`, preferring (in order) a paragraph break, a
 * newline, a sentence end, or whitespace. Falls back to a hard cut at
 * `idealEnd` when no boundary is found in the search window.
 */
function findCutPoint(text: string, start: number, idealEnd: number): number {
  const window = text.slice(start, idealEnd);
  if (window.length === 0) return idealEnd;

  // Paragraph break — prefer the last one in the window.
  let lastMatch = -1;
  PARAGRAPH_BOUNDARY.lastIndex = 0;
  for (
    let m = PARAGRAPH_BOUNDARY.exec(window);
    m;
    m = PARAGRAPH_BOUNDARY.exec(window)
  ) {
    lastMatch = m.index + m[0].length;
  }
  if (lastMatch > 0) return start + lastMatch;

  // Single newline — prefer the last one.
  const lastNewline = window.lastIndexOf("\n");
  if (lastNewline > 0) return start + lastNewline + 1;

  // Sentence end — prefer the last one.
  lastMatch = -1;
  SENTENCE_BOUNDARY.lastIndex = 0;
  for (
    let m = SENTENCE_BOUNDARY.exec(window);
    m;
    m = SENTENCE_BOUNDARY.exec(window)
  ) {
    lastMatch = m.index + m[0].length;
  }
  if (lastMatch > 0) return start + lastMatch;

  // Whitespace — prefer the last one.
  const lastSpace = window.lastIndexOf(" ");
  if (lastSpace > 0) return start + lastSpace + 1;

  // Hard cut — no boundary found in the window.
  return idealEnd;
}

/**
 * Chunk `text` into overlapping windows of at most `maxChars`, preferring
 * natural boundaries near the ideal cut point. Returns `[]` for empty or
 * whitespace-only input; returns a single chunk when `text` is already
 * shorter than `maxChars`.
 */
export function chunkText(
  text: string,
  { maxChars = 1500, overlap = 200 }: ChunkTextOptions = {},
): TextChunk[] {
  const trimmed = text.trim();
  if (trimmed.length === 0) return [];

  if (trimmed.length <= maxChars) {
    return [{ index: 0, content: trimmed }];
  }

  // Clamp so `step` is always positive — prevents an infinite loop when
  // `overlap >= maxChars`.
  const step = Math.max(1, maxChars - overlap);

  const chunks: TextChunk[] = [];
  let start = 0;
  let index = 0;

  while (start < trimmed.length) {
    const idealEnd = Math.min(start + maxChars, trimmed.length);
    const end =
      idealEnd >= trimmed.length
        ? trimmed.length
        : findCutPoint(trimmed, start, idealEnd);

    const content = trimmed.slice(start, end).trim();
    if (content.length > 0) {
      chunks.push({ index, content });
      index += 1;
    }

    if (end >= trimmed.length) break;

    // Advance by `step` from the actual cut point, not the ideal one, so
    // overlap is measured against what was actually emitted.
    const next = end - overlap;
    start = next > start ? next : start + step;
  }

  return chunks;
}
