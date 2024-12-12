"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import type { InventoryItem } from "../player-provider";

export function InventoryItemDialog({ item }: { item: InventoryItem | null }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (item) {
      setIsOpen(true);
    }
  }, [item]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Item Acquired!</DialogTitle>
        </DialogHeader>
        {item && (
          <div className="flex flex-col items-center gap-4 p-4">
            <div className="h-24 w-24">{item.icon}</div>
            <h3 className="text-lg font-semibold capitalize">{item.name}</h3>
            <p className="text-center text-sm text-muted-foreground">
              {item.description}
            </p>
            <p className="text-sm">Quantity: {item.quantity}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
