"use client";

import { useState } from "react";
import { usePlayer } from "./player-provider";

export default function Inventory() {
  const { inventory } = usePlayer();
  const [activeItem, setActiveItem] = useState<string | null>(null);

  if (inventory.length === 0) return null;

  return (
    <div className="h-fit w-20">
      <div className="grid gap-4">
        {inventory.map((item) => (
          <div
            key={item.name}
            className="flex cursor-pointer items-center justify-between rounded-lg border p-4"
            onClick={() => setActiveItem(item.name)}
          >
            <div>
              <h4 className="font-medium">{item.name}</h4>
              <p className="hidden text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              x{item.quantity}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
