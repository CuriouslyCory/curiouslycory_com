"use client";

import { useEffect, useRef, useState } from "react";
import { ChatBubble } from "~/components/ui/chat-bubble";

const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

const GRAVITY_KEY = "zero-gravity";

function readInitialGravityState() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(GRAVITY_KEY) === "true";
}

export function EasterEggs() {
  const [isZeroGravity, setIsZeroGravity] = useState(readInitialGravityState);
  const sequenceRef = useRef<string[]>([]);

  // Sync body class with React state (effect updates external system from state)
  useEffect(() => {
    if (isZeroGravity) {
      document.body.classList.add(GRAVITY_KEY);
    } else {
      document.body.classList.remove(GRAVITY_KEY);
    }
  }, [isZeroGravity]);

  // Listen for the astronaut restoring gravity (setState in callback, not in effect body)
  useEffect(() => {
    const handleRestore = () => {
      localStorage.removeItem(GRAVITY_KEY);
      setIsZeroGravity(false);
    };
    window.addEventListener("gravity-restored", handleRestore);
    return () => window.removeEventListener("gravity-restored", handleRestore);
  }, []);

  // Listen for Konami code (setState in callback, not in effect body)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept keyboard input in form elements
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      const key = e.code;
      sequenceRef.current = [
        ...sequenceRef.current,
        key,
      ].slice(-KONAMI_SEQUENCE.length);

      if (
        sequenceRef.current.length === KONAMI_SEQUENCE.length &&
        sequenceRef.current.every((k, i) => k === KONAMI_SEQUENCE[i])
      ) {
        localStorage.setItem(GRAVITY_KEY, "true");
        setIsZeroGravity(true);
        sequenceRef.current = [];
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isZeroGravity) return null;

  return (
    <div className="pointer-events-none fixed bottom-28 left-1/2 z-50 -translate-x-1/2">
      <ChatBubble
        variant="speech"
        direction="top"
        text="Oops, gravity module offline."
      />
    </div>
  );
}
