"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import { usePlayer } from "~/components/player/player-provider";

type ConstellationDef = {
  id: string;
  label: string;
  style: CSSProperties;
  stars: { x: number; y: number }[];
  lines: [number, number][];
};

const CONSTELLATIONS: ConstellationDef[] = [
  {
    id: "curiosia-major",
    label: "Curiosia Major",
    style: { top: "15%", left: "8%" },
    stars: [
      { x: 15, y: 50 },
      { x: 35, y: 20 },
      { x: 55, y: 40 },
      { x: 75, y: 15 },
      { x: 90, y: 55 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ],
  },
  {
    id: "the-debugger",
    label: "The Debugger",
    style: { top: "40%", right: "10%" },
    stars: [
      { x: 50, y: 10 },
      { x: 20, y: 45 },
      { x: 80, y: 45 },
      { x: 35, y: 80 },
      { x: 65, y: 80 },
    ],
    lines: [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 4],
      [3, 4],
    ],
  },
  {
    id: "orions-fork",
    label: "Orion's Fork",
    style: { top: "65%", left: "18%" },
    stars: [
      { x: 50, y: 10 },
      { x: 50, y: 45 },
      { x: 25, y: 78 },
      { x: 75, y: 78 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [1, 3],
    ],
  },
  {
    id: "the-stack",
    label: "The Stack",
    style: { top: "28%", left: "52%" },
    stars: [
      { x: 50, y: 10 },
      { x: 28, y: 38 },
      { x: 72, y: 38 },
      { x: 50, y: 62 },
      { x: 50, y: 88 },
    ],
    lines: [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 3],
      [3, 4],
    ],
  },
];

const REVEAL_RADIUS = 80;

function Constellation({ def }: { def: ConstellationDef }) {
  const ref = useRef<HTMLDivElement>(null);
  const [nearCursor, setNearCursor] = useState(false);
  const { inventory } = usePlayer();
  const telescopeActive = inventory.some(
    (item) => item.name === "telescope" && item.active,
  );

  useEffect(() => {
    if (!telescopeActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      // Reading ref.current inside an event handler is allowed
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.sqrt((e.clientX - cx) ** 2 + (e.clientY - cy) ** 2);
      setNearCursor(dist < REVEAL_RADIUS);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [telescopeActive]);

  // Gate visibility by telescope being active — when it's deactivated, nearCursor
  // may still be true from last event, but the gate prevents showing
  const visible = telescopeActive && nearCursor;

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed h-20 w-20 transition-opacity duration-500"
      style={{ ...def.style, opacity: visible ? 1 : 0 }}
    >
      <svg
        width="80"
        height="80"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {def.lines.map(([a, b], i) => (
          <line
            key={i}
            x1={def.stars[a]!.x}
            y1={def.stars[a]!.y}
            x2={def.stars[b]!.x}
            y2={def.stars[b]!.y}
            stroke="rgba(249,115,22,0.5)"
            strokeWidth="1"
          />
        ))}
        {def.stars.map((star, i) => (
          <circle
            key={i}
            cx={star.x}
            cy={star.y}
            r="2.5"
            fill="rgb(249,115,22)"
          />
        ))}
      </svg>
      <p className="mt-0.5 text-center font-mono text-[9px] text-primary/80">
        {def.label}
      </p>
    </div>
  );
}

export function ConstellationsOverlay() {
  return (
    <>
      {CONSTELLATIONS.map((def) => (
        <Constellation key={def.id} def={def} />
      ))}
    </>
  );
}
