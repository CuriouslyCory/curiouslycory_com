"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
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
  /** Percentage from top of the container (5–28) */
  y: number;
  /** Animation duration in seconds */
  duration: number;
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

const SPAWN_INTERVAL_MS = 4_000;
const SPAWN_PROBABILITY = 0.35;
const MAX_LIGHT = 3;
const MAX_DARK = 2;
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

function createLightEntity(): SkyEntity {
  const isBird = Math.random() < 0.4;
  if (isBird) {
    return {
      id: crypto.randomUUID(),
      type: "bird",
      y: rand(5, 28),
      duration: rand(10, 18),
      direction: Math.random() < 0.5 ? "ltr" : "rtl",
      scale: clampScale(rand(0.6, 1.0)),
      opacity: rand(0.45, 0.7),
      createdAt: Date.now(),
    };
  }
  return {
    id: crypto.randomUUID(),
    type: "cloud",
    y: rand(5, 28),
    duration: rand(25, 40),
    direction: Math.random() < 0.5 ? "ltr" : "rtl",
    scale: clampScale(rand(0.6, 1.1)),
    opacity: rand(0.4, 0.65),
    createdAt: Date.now(),
  };
}

function createDarkEntity(): SkyEntity {
  const isStar = Math.random() < 0.5;
  if (isStar) {
    return {
      id: crypto.randomUUID(),
      type: "shootingStar",
      y: rand(5, 28),
      duration: rand(1, 2.5),
      direction: Math.random() < 0.5 ? "ltr" : "rtl",
      scale: clampScale(rand(0.7, 1.1)),
      opacity: rand(0.4, 0.7),
      createdAt: Date.now(),
    };
  }
  return {
    id: crypto.randomUUID(),
    type: "satellite",
    y: rand(5, 28),
    duration: rand(15, 25),
    direction: Math.random() < 0.5 ? "ltr" : "rtl",
    scale: clampScale(rand(0.5, 0.8)),
    opacity: rand(0.4, 0.6),
    createdAt: Date.now(),
  };
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
      <rect x="0" y="2" width="56" height="2" rx="1" fill={`url(#${gradientId})`} />
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
        animation: `${animationName} ${entity.duration}s linear forwards`,
      }}
    >
      {entity.type === "cloud" && <CloudSvg />}
      {entity.type === "bird" && <BirdSvg direction={entity.direction} />}
      {entity.type === "shootingStar" && <ShootingStarSvg direction={entity.direction} />}
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

  // Track theme in refs so the interval callback always reads the fresh value.
  // prevThemeRef lets us detect theme changes inside the interval without
  // needing setState-in-effect for clearing.
  const themeRef = useRef(resolvedTheme);
  const prevThemeRef = useRef(resolvedTheme);
  useEffect(() => {
    themeRef.current = resolvedTheme;
  }, [resolvedTheme]);

  // Remove a single entity by id
  const removeEntity = useCallback((id: string) => {
    setEntities((prev) => prev.filter((e) => e.id !== id));
  }, []);

  // Spawn interval — also handles clearing entities on theme change
  useEffect(() => {
    if (!mounted || reducedMotion) return;

    const intervalId = setInterval(() => {
      // Skip if tab is hidden
      if (document.visibilityState !== "visible") return;

      // If theme changed since last tick, clear all entities
      if (themeRef.current !== prevThemeRef.current) {
        prevThemeRef.current = themeRef.current;
        setEntities([]);
        return;
      }

      // Roll the dice
      if (Math.random() > SPAWN_PROBABILITY) return;

      const isDark = themeRef.current === "dark";
      const max = isDark ? MAX_DARK : MAX_LIGHT;

      setEntities((prev) => {
        if (prev.length >= max) return prev;
        const entity = isDark ? createDarkEntity() : createLightEntity();
        return [...prev, entity];
      });
    }, SPAWN_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [mounted, reducedMotion]);

  // TTL safety-net cleanup
  useEffect(() => {
    if (!mounted || reducedMotion) return;

    const intervalId = setInterval(() => {
      const now = Date.now();
      setEntities((prev) =>
        prev.filter(
          (e) => now - e.createdAt < (e.duration + TTL_BUFFER_S) * 1_000,
        ),
      );
    }, TTL_CHECK_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [mounted, reducedMotion]);

  // Don't render on server, or when reduced motion is preferred
  if (!mounted || reducedMotion) return null;

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[30%] overflow-hidden"
      aria-hidden="true"
    >
      {entities.map((entity) => (
        <EntityRenderer
          key={entity.id}
          entity={entity}
          onDone={removeEntity}
        />
      ))}
    </div>
  );
}
