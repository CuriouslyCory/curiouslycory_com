"use client";
import React, { useEffect, useRef } from "react";

const CursorFollower: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = followerRef.current;

    if (!element) return;

    // Throttled position updater
    const updatePosition = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Use transform for GPU acceleration
      element.style.transform = `translate3d(${clientX - 96 / 2}px, ${clientY - 96 / 2}px, 0)`;
    };

    // Use `mousemove` listener with `requestAnimationFrame` optimization
    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => updatePosition(e));
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={followerRef}
      className="pointer-events-none fixed left-0 top-0 h-24 w-24 rounded-full"
      style={{
        willChange: "transform",
        transition: "transform 0.01s ease-out",
      }}
    >
      {children}
    </div>
  );
};

export default CursorFollower;
