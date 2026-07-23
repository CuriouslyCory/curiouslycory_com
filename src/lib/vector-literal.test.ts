import { describe, expect, it } from "vitest";
import { toVectorLiteral } from "./vector-literal";

describe("toVectorLiteral", () => {
  it("formats a simple vector", () => {
    expect(toVectorLiteral([0.1, 0.2, 0.3])).toBe("[0.1,0.2,0.3]");
  });

  it("formats negative values", () => {
    expect(toVectorLiteral([-0.5, 0.5, -1])).toBe("[-0.5,0.5,-1]");
  });

  it("never emits scientific notation for tiny magnitudes", () => {
    // String(1e-8) === "1e-8", which pgvector's text parser rejects.
    const literal = toVectorLiteral([1e-8, -1e-8, 1e-7]);
    expect(literal).not.toMatch(/e[+-]/i);
    expect(literal).toBe("[0.00000001,-0.00000001,0.0000001]");
  });

  it("collapses negative-zero-after-rounding to plain 0", () => {
    // A tiny negative value that rounds to zero at our precision must not
    // render as the pgvector-incompatible "-0".
    const literal = toVectorLiteral([-1e-12]);
    expect(literal).toBe("[0]");
  });

  it("trims trailing zeros without leaving a dangling decimal point", () => {
    expect(toVectorLiteral([1.5, 2])).toBe("[1.5,2]");
  });

  it("handles an empty vector", () => {
    expect(toVectorLiteral([])).toBe("[]");
  });

  it("throws on non-finite components rather than emitting invalid SQL", () => {
    expect(() => toVectorLiteral([NaN])).toThrow();
    expect(() => toVectorLiteral([Infinity])).toThrow();
    expect(() => toVectorLiteral([-Infinity])).toThrow();
  });

  it("round-trips a realistic 1536-dim-style embedding sample without scientific notation", () => {
    const sample = [0.023, -0.0000001, 0.999999999, -0.5, 0];
    const literal = toVectorLiteral(sample);
    expect(literal).not.toMatch(/e[+-]/i);
    expect(literal.startsWith("[")).toBe(true);
    expect(literal.endsWith("]")).toBe(true);
  });
});
