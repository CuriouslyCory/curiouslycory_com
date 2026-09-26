"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { useMounted } from "~/hooks/use-mounted";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type EntityType = "cloud" | "bird" | "shootingStar" | "satellite";
type Direction = "ltr" | "rtl";

interface SkyEntity {
  id: string;
  type: EntityType;
  /** Percentage from top of the container */
  y: number;
  /** Animation duration in seconds */
  duration: number;
  /**
   * Animation delay in seconds. Negative for seeded entities so they start
   * mid-flight instead of all entering from the edge at once.
   */
  delay: number;
  direction: Direction;
  /** Visual scale multiplier */
  scale: number;
  /** CSS opacity */
  opacity: number;
  /** Timestamp (ms) when entity was spawned — used for TTL cleanup */
  createdAt: number;
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const SPAWN_INTERVAL_MS = 3_000;
const SPAWN_PROBABILITY = 0.45;
const MAX_LIGHT = 4;
const MAX_DARK = 3;
/** Entities already in flight when the sky first renders (or the theme flips) */
const SEED_COUNT = 2;
/** Extra seconds past duration before TTL prune kicks in */
const TTL_BUFFER_S = 5;
const TTL_CHECK_INTERVAL_MS = 10_000;

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function isMobile() {
  return typeof window !== "undefined" && window.innerWidth < 768;
}

function clampScale(scale: number) {
  return isMobile() ? Math.min(scale, 0.8) : scale;
}

// ---------------------------------------------------------------------------
// Entity factory
// ---------------------------------------------------------------------------

function randomDirection(): Direction {
  return Math.random() < 0.5 ? "ltr" : "rtl";
}

/**
 * Daytime drifter. Seeded entities are always clouds (a bird frozen mid-sky
 * reads oddly) and start part-way through their drift.
 */
function createLightEntity(seeded = false): SkyEntity {
  const isBird = !seeded && Math.random() < 0.4;
  if (isBird) {
    return {
      id: crypto.randomUUID(),
      type: "bird",
      y: rand(10, 70),
      duration: rand(12, 20),
      delay: 0,
      direction: randomDirection(),
      scale: clampScale(rand(0.7, 1.1)),
      opacity: rand(0.5, 0.75),
      createdAt: Date.now(),
    };
  }
  return {
    id: crypto.randomUUID(),
    type: "cloud",
    y: rand(8, 65),
    duration: rand(35, 55),
    delay: seeded ? -rand(8, 25) : 0,
    direction: randomDirection(),
    scale: clampScale(rand(0.8, 1.5)),
    opacity: rand(0.45, 0.7),
    createdAt: Date.now(),
  };
}

/**
 * Night-time drifter. Seeded entities are always satellites — a shooting
 * star lasts ~2s, so seeding one mid-streak would just flash and vanish.
 */
function createDarkEntity(seeded = false): SkyEntity {
  const isStar = !seeded && Math.random() < 0.55;
  if (isStar) {
    return {
      id: crypto.randomUUID(),
      type: "shootingStar",
      y: rand(5, 60),
      duration: rand(1.2, 2.4),
      delay: 0,
      direction: randomDirection(),
      scale: clampScale(rand(0.8, 1.2)),
      opacity: rand(0.5, 0.85),
      createdAt: Date.now(),
    };
  }
  return {
    id: crypto.randomUUID(),
    type: "satellite",
    y: rand(8, 70),
    duration: rand(18, 28),
    delay: seeded ? -rand(3, 12) : 0,
    direction: randomDirection(),
    scale: clampScale(rand(0.8, 1.1)),
    opacity: rand(0.5, 0.75),
    createdAt: Date.now(),
  };
}

function seedEntities(isDark: boolean): SkyEntity[] {
  return Array.from({ length: SEED_COUNT }, () =>
    isDark ? createDarkEntity(true) : createLightEntity(true),
  );
}

// ---------------------------------------------------------------------------
// SVG Elements (memoised via plain functions — no state, no side-effects)
// ---------------------------------------------------------------------------

function CloudSvg() {
  return (
    <svg
      width="48"
      height="24"
      viewBox="0 0 48 24"
      fill="currentColor"
      className="text-stone-300"
    >
      <ellipse cx="16" cy="16" rx="12" ry="8" />
      <ellipse cx="28" cy="12" rx="10" ry="10" />
      <ellipse cx="38" cy="16" rx="8" ry="6" />
    </svg>
  );
}

function BirdSvg({ direction }: { direction: Direction }) {
  return (
    <svg
      width="16"
      height="8"
      viewBox="0 0 16 8"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="text-stone-500"
      style={{ transform: direction === "rtl" ? "scaleX(-1)" : undefined }}
    >
      <path d="M0 4Q4 0 8 4Q12 0 16 4" />
    </svg>
  );
}

let starIdCounter = 0;

function ShootingStarSvg({ direction }: { direction: Direction }) {
  const gradientId = `starTrail-${++starIdCounter}`;
  // Flip the SVG horizontally when traveling RTL so the trail follows behind
  const flip = direction === "rtl" ? { transform: "scaleX(-1)" } : undefined;
  return (
    <svg
      width="60"
      height="6"
      viewBox="0 0 60 6"
      className="text-white"
      style={flip}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="70%" stopColor="currentColor" stopOpacity="0.6" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
        </linearGradient>
      </defs>
      <rect
        x="0"
        y="2"
        width="56"
        height="2"
        rx="1"
        fill={`url(#${gradientId})`}
      />
      <circle cx="57" cy="3" r="3" fill="currentColor" />
    </svg>
  );
}

function SatelliteSvg() {
  return (
    <svg width="4" height="4" viewBox="0 0 4 4">
      <circle cx="2" cy="2" r="2" fill="hsl(36, 24%, 86%)" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Entity wrapper — applies position + animation styles
// ---------------------------------------------------------------------------

function EntityRenderer({
  entity,
  onDone,
}: {
  entity: SkyEntity;
  onDone: (id: string) => void;
}) {
  const animationName =
    entity.type === "shootingStar"
      ? entity.direction === "ltr"
        ? "shooting-star-ltr"
        : "shooting-star-rtl"
      : entity.direction === "ltr"
        ? "sky-drift-ltr"
        : "sky-drift-rtl";

  return (
    <div
      onAnimationEnd={() => onDone(entity.id)}
      style={{
        position: "absolute",
        top: `${entity.y}%`,
        left: 0,
        willChange: "transform, opacity",
        opacity: entity.opacity,
        // Use the standalone `scale` CSS property so it doesn't conflict
        // with the keyframe animation which drives `transform` (translate3d).
        scale: `${entity.scale}`,
        animation: `${animationName} ${entity.duration}s linear ${entity.delay}s forwards`,
      }}
    >
      {entity.type === "cloud" && <CloudSvg />}
      {entity.type === "bird" && <BirdSvg direction={entity.direction} />}
      {entity.type === "shootingStar" && (
        <ShootingStarSvg direction={entity.direction} />
      )}
      {entity.type === "satellite" && <SatelliteSvg />}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function SkyAmbiance() {
  const mounted = useMounted();
  const { resolvedTheme } = useTheme();
  const [entities, setEntities] = useState<SkyEntity[]>([]);

  // Detect prefers-reduced-motion via useSyncExternalStore (no setState-in-effect)
  const reducedMotion = useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false, // server snapshot — assume no reduced motion
  );

  // Remove a single entity by id
  const removeEntity = useCallback((id: string) => {
    setEntities((prev) => prev.filter((e) => e.id !== id));
  }, []);

  // (Re)seed the sky and run the spawn loop. Re-runs on theme change, so a
  // toggle swaps clouds for satellites immediately rather than on the next
  // tick. The seed is deferred a tick so no state is set synchronously
  // inside the effect body.
  useEffect(() => {
    if (!mounted || reducedMotion || !resolvedTheme) return;
    const isDark = resolvedTheme === "dark";
    const max = isDark ? MAX_DARK : MAX_LIGHT;

    const seedId = setTimeout(() => setEntities(seedEntities(isDark)), 0);

    const intervalId = setInterval(() => {
      // Skip if tab is hidden
      if (document.visibilityState !== "visible") return;

      // Roll the dice
      if (Math.random() > SPAWN_PROBABILITY) return;

      setEntities((prev) => {
        if (prev.length >= max) return prev;
        const entity = isDark ? createDarkEntity() : createLightEntity();
        return [...prev, entity];
      });
    }, SPAWN_INTERVAL_MS);

    return () => {
      clearTimeout(seedId);
      clearInterval(intervalId);
    };
  }, [mounted, reducedMotion, resolvedTheme]);

  // TTL safety-net cleanup
  useEffect(() => {
    if (!mounted || reducedMotion) return;

    const intervalId = setInterval(() => {
      const now = Date.now();
      setEntities((prev) =>
        prev.filter(
          (e) =>
            now - e.createdAt < (e.duration + e.delay + TTL_BUFFER_S) * 1_000,
        ),
      );
    }, TTL_CHECK_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [mounted, reducedMotion]);

  // Don't render on server, or when reduced motion is preferred
  if (!mounted || reducedMotion) return null;

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[55%] overflow-hidden"
      aria-hidden="true"
    >
      {entities.map((entity) => (
        <EntityRenderer key={entity.id} entity={entity} onDone={removeEntity} />
      ))}
    </div>
  );
}
