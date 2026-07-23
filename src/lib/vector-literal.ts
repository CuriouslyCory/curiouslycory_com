/**
 * Format a number array as a pgvector text literal: `"[0.1,-0.2,0.003]"`.
 *
 * pgvector's text-format parser does not accept scientific notation
 * (`1e-8`), which is exactly what `String(n)` / template-literal
 * interpolation produces for very small magnitudes (e.g. embedding
 * components near zero). Every component is therefore formatted with
 * `toFixed`, which always emits plain decimal notation, then trimmed of
 * trailing zeros (and a trailing `.`) to keep the literal compact.
 */

// text-embedding-3-small components are small floats; 8 decimal places is
// far more precision than the model provides and safely avoids scientific
// notation for any magnitude that model produces.
const DECIMALS = 8;

function formatComponent(n: number): string {
  if (!Number.isFinite(n)) {
    throw new RangeError(`toVectorLiteral: non-finite component: ${n}`);
  }
  // toFixed always returns plain decimal notation (never exponential),
  // unlike String()/toString() for tiny magnitudes.
  let formatted = n.toFixed(DECIMALS);
  // Trim trailing zeros, then a dangling decimal point, to keep literals
  // compact. Guard against "-0.00000000" collapsing to "-0".
  if (formatted.includes(".")) {
    formatted = formatted.replace(/0+$/, "").replace(/\.$/, "");
  }
  if (formatted === "-0") formatted = "0";
  return formatted;
}

export function toVectorLiteral(v: number[]): string {
  return "[" + v.map(formatComponent).join(",") + "]";
}
