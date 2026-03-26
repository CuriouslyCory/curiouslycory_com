'use client';

import { type ReactNode, useState } from "react";

const MESSAGES = [
  'Calibrating star charts...',
  'Deploying bat signal...',
  'Asking the cat for directions...',
] as const;

export default function Loading(): ReactNode {
  const [message] = useState(
    () => MESSAGES[Math.floor(Math.random() * MESSAGES.length)],
  );

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6">
      <div className="relative h-10 w-10">
        <div className="orbit-arm" style={{ animationDelay: '0s' }}>
          <div className="orbit-dot" />
        </div>
        <div className="orbit-arm" style={{ animationDelay: '-0.5s' }}>
          <div className="orbit-dot" />
        </div>
        <div className="orbit-arm" style={{ animationDelay: '-1s' }}>
          <div className="orbit-dot" />
        </div>
      </div>
      <p className="font-mono text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
