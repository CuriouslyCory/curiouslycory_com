"use client";

import {
  createContext,
  useContext,
  useEffect,
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
  const [events, setEvents] = useState<PlayerEvent[]>([]);
  const [newItem, setNewItem] = useState<InventoryItem | null>(null);
  const [pendingQuestUpdate, setPendingQuestUpdate] = useState<{
    questId: QuestId;
    prevProgress: number;
    newProgress: number;
  } | null>(null);

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

  const startQuest = (questId: QuestId) => {
    const questData = QUESTS.get(questId);
    if (questData) {
      setQuests((prev) => new Map([...prev, [questData.id, questData]]));
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
    setQuests((prev) => {
      // if the quest has not started or is already at the desired progress, do nothing
      if (!prev.has(questId) || prev.get(questId)?.progress === progress)
        return prev;

      const existingQuest = prev.get(questId);
      if (!existingQuest) return prev;

      // Queue the step execution
      setPendingQuestUpdate({
        questId,
        prevProgress: existingQuest.progress,
        newProgress: progress,
      });

      const newMap = new Map(prev);
      newMap.set(questId, {
        ...existingQuest,
        progress,
      });

      return newMap;
    });
  };

  const addEvent = (event: PlayerEvent) => {
    setEvents((prev) => [...prev, event]);
  };

  useEffect(() => {
    console.log(quests);
  }, [quests]);

  useEffect(() => {
    if (pendingQuestUpdate) {
      const { questId, prevProgress, newProgress } = pendingQuestUpdate;
      executeQuestSteps(questId, prevProgress, newProgress);
      setPendingQuestUpdate(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingQuestUpdate]);

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
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}
