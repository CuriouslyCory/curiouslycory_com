"use client";

import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { usePlayer } from "./player-provider";
import { Input } from "~/components/ui/input";
import { type InventoryItemId } from "./inventory/items";
import { type QuestId } from "./quests";

export function DebugConsole() {
  const [isLocal, setIsLocal] = useState(false);
  const { addInventoryItem, startQuest, updateQuestProgress, quests } =
    usePlayer();

  // Check if we're on localhost
  useEffect(() => {
    setIsLocal(window.location.hostname === "localhost");
  }, []);

  if (!isLocal) return null;

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full"
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Debug Console</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-8">
            <div className="space-y-4">
              {/* Add Item Section */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Add Item</h3>
                <div className="flex gap-2">
                  <Select
                    onValueChange={(value: InventoryItemId) =>
                      addInventoryItem(value, 1)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select item" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="net">Net</SelectItem>
                      <SelectItem value="tuna">Tuna</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Start Quest Section */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Start Quest</h3>
                <Select onValueChange={(value: QuestId) => startQuest(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select quest" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bat-quest">Find the Bats</SelectItem>
                    <SelectItem value="pet-the-cat">Pet the Cat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Update Quest Progress Section */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Update Quest Progress</h3>
                {quests.map((quest) => (
                  <div key={quest.id} className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {quest.title}
                    </p>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={quest.progress ?? 0}
                      onChange={(e) => {
                        const value = Math.min(
                          100,
                          Math.max(0, Number(e.target.value)),
                        );
                        updateQuestProgress(quest.id, value);
                      }}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
