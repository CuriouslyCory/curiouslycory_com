"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { PlusIcon, MinusIcon } from "lucide-react";

export function BlogExampleCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="border-border bg-card flex flex-col items-center gap-4 rounded-xl border p-6 shadow-sm">
      <h3 className="text-xl font-semibold">Interactive Counter</h3>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCount((prev) => prev - 1)}
          aria-label="Decrement counter"
        >
          <MinusIcon className="h-4 w-4" />
        </Button>

        <span className="bg-primary/80 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold">
          {count}
        </span>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setCount((prev) => prev + 1)}
          aria-label="Increment counter"
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>

      <p className="text-muted-foreground text-sm">
        This is a client component that maintains state
      </p>
    </div>
  );
}
