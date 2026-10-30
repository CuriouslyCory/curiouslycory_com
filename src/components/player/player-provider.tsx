"use client";

import {
  createContext,
  use,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { InventoryItemDialog } from "./inventory/inventory-item-dialog";
import PlayerMenu from "./player-menu";
import { DebugConsole } from "./debug-console";
import { type Quest, type QuestId, QUESTS } from "./quests";
import {
  INVENTORY_ITEMS,
  type InventoryItem,
  type InventoryItemId,
} from "./inventory/items";

export type PlayerEvent = {
  id: string;
  date: Date;
};

// Define context type
type PlayerContextType = {
  inventory: InventoryItem[];
  quests: Quest[];
  events: PlayerEvent[];
  newItem: InventoryItem | null;
  addInventoryItem: (item: InventoryItemId, quantity: number) => void;
  removeInventoryItem: (itemName: InventoryItemId) => void;
  activateInventoryItem: (itemName: InventoryItemId) => void;
  updateQuestProgress: (questId: QuestId, progress: number) => void;
  addEvent: (event: PlayerEvent) => void;
  startQuest: (questId: QuestId) => void;
};

// Create context
const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

// Create provider component
export function PlayerProvider({ children }: { children: ReactNode }) {
  const [inventory, setInventory] = useState<Map<string, InventoryItem>>(
    new Map(),
  );
  const [quests, setQuests] = useState<Map<string, Quest>>(new Map());
  // Mirrors `quests` so handlers can read the latest progress and run quest
  // steps immediately, even when several updates land in the same tick.
  const questsRef = useRef(quests);
  const [events, setEvents] = useState<PlayerEvent[]>([]);
  const [newItem, setNewItem] = useState<InventoryItem | null>(null);

  const addInventoryItem = (item: InventoryItemId, quantity: number) => {
    setInventory((prev) => {
      const newMap = new Map(prev);
      const existingItem = newMap.get(item);
      const itemData = INVENTORY_ITEMS.get(item);

      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + quantity,
        };
        newMap.set(item, updatedItem);
        setNewItem(updatedItem);
      } else if (itemData) {
        const newInventoryItem = {
          ...itemData,
          quantity,
        };
        newMap.set(item, newInventoryItem);
        setNewItem(newInventoryItem);
      }
      return newMap;
    });
  };

  const removeInventoryItem = (itemName: string) => {
    setInventory((prev) => {
      const newMap = new Map(prev);
      const existingItem = newMap.get(itemName);
      if (existingItem) {
        existingItem.quantity -= 1;
        if (existingItem.quantity <= 0) {
          newMap.delete(itemName);
        }
      }
      return newMap;
    });
  };

  const activateInventoryItem = (itemName: InventoryItemId) => {
    setInventory((prev) => {
      const newMap = new Map(prev);
      const existingItem = newMap.get(itemName);
      if (existingItem) {
        newMap.set(itemName, {
          ...existingItem,
          active: !existingItem?.active,
        });
      } else {
        console.error(`Item ${itemName} not found in inventory items.`);
      }
      return newMap;
    });
  };

  const commitQuests = (next: Map<string, Quest>) => {
    questsRef.current = next;
    setQuests(next);
  };

  const startQuest = (questId: QuestId) => {
    const questData = QUESTS.get(questId);
    if (questData) {
      commitQuests(new Map(questsRef.current).set(questData.id, questData));
      executeQuestSteps(questId, -1, 0);
    }
  };

  const executeQuestSteps = (
    questId: QuestId,
    prevProgress: number,
    newProgress: number,
  ) => {
    const questDefinition = QUESTS.get(questId);
    if (!questDefinition) return;

    const triggeredSteps = questDefinition.steps
      .filter(
        (step) => step.progress > prevProgress && step.progress <= newProgress,
      )
      .sort((a, b) => a.progress - b.progress);

    triggeredSteps.forEach((step) => {
      step.onComplete?.({ addInventoryItem, activateInventoryItem });
    });
  };

  const updateQuestProgress = (questId: QuestId, progress: number) => {
    const existingQuest = questsRef.current.get(questId);
    // if the quest has not started or is already at the desired progress, do nothing
    if (!existingQuest || existingQuest.progress === progress) return;

    commitQuests(
      new Map(questsRef.current).set(questId, { ...existingQuest, progress }),
    );
    executeQuestSteps(questId, existingQuest.progress, progress);
  };

  const addEvent = (event: PlayerEvent) => {
    setEvents((prev) => [...prev, event]);
  };

  useEffect(() => {
    console.log(quests);
  }, [quests]);

  return (
    <PlayerContext.Provider
      value={{
        inventory: Array.from(inventory.values()),
        quests: Array.from(quests.values()),
        events,
        newItem,
        addInventoryItem,
        removeInventoryItem,
        activateInventoryItem,
        updateQuestProgress,
        addEvent,
        startQuest,
      }}
    >
      {children}
      <InventoryItemDialog item={newItem} />
      <PlayerMenu />
      <DebugConsole />
    </PlayerContext.Provider>
  );
}

// Create hook for using the context
export function usePlayer() {
  const context = use(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}
