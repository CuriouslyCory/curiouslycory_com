"use client";

import { usePlayer } from "./player-provider";
import { cn } from "~/lib/utils";
import CursorFollower from "../cursor-follower";
import { useMemo } from "react";

export default function InventoryMenu() {
  const { inventory, activateInventoryItem } = usePlayer();

  const activeItem = useMemo(
    () => inventory.find((item) => item.active),
    [inventory],
  );

  if (inventory.length === 0) return null;

  return (
    <>
      <CursorFollower>{activeItem?.asset}</CursorFollower>
      <div className="h-fit w-20">
        <div className="grid gap-4">
          {inventory.map((item) => (
            <div
              key={item.name}
              className={cn(
                "flex cursor-pointer items-center justify-center rounded-lg border",
                activeItem?.name === item.name && "bg-slate-600/10",
              )}
              onClick={() => activateInventoryItem(item.name)}
            >
              {item.icon}
              <p className="hidden text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
