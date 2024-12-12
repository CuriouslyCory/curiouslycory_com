"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Net } from "./inventory/items/net";
import { InventoryItemDialog } from "./inventory/inventory-item-dialog";
import PlayerMenu from "./player-menu";
import { DebugConsole } from "./debug-console";
import { Tuna } from "./inventory/items/tuna";

// Define types
export type InventoryItem = {
  name: InventoryItemId;
  type: string;
  description: string;
  quantity: number;
  icon?: ReactNode;
  asset?: ReactNode;
  active?: boolean;
};

export type Quest = {
  id: QuestId;
  progress: number;
  title: string;
  description: string;
};

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
  updateQuestProgress: (questId: string, progress: number) => void;
  addEvent: (event: PlayerEvent) => void;
  startQuest: (quest: Omit<Quest, "title" | "description">) => void;
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
    console.log(itemName);
    setInventory((prev) => {
      const newMap = new Map(prev);
      const existingItem = newMap.get(itemName);
      console.log(existingItem);
      if (existingItem) {
        newMap.set(itemName, {
          ...existingItem,
          active: !existingItem?.active,
        });
        console.log(existingItem);
      } else {
        console.error(`Item ${itemName} not found in inventory items.`);
      }
      return newMap;
    });
  };

  const startQuest = (quest: Omit<Quest, "title" | "description">) => {
    const questData = QUESTS.get(quest.id);
    if (questData) {
      setQuests((prev) => new Map([...prev, [questData.id, questData]]));
    }
  };

  const updateQuestProgress = (questId: string, progress: number) => {
    setQuests((prev) => {
      const newMap = new Map(prev);
      const existingQuest = newMap.get(questId);
      if (existingQuest) {
        newMap.set(questId, {
          ...existingQuest,
          progress,
        });
      }
      return newMap;
    });
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
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}

const quests = [
  {
    id: "bat-quest",
    progress: 0,
    title: "Find the Bats",
    description:
      "The bats have gone missing. I need you to find them and bring them back to me.",
  } as const,
  {
    id: "pet-the-cat",
    progress: 0,
    title: "Pet the Cat",
    description:
      "The cat is lonely. I need you to pet it and bring it back to me.",
  } as const,
] as const;

const QUESTS = new Map(
  Object.entries(quests).map(([_, value]) => [value.id, value as Quest]),
);

export type QuestId = (typeof quests)[number]["id"];

const inventoryItems = [
  {
    name: "net",
    type: "tool",
    description: "A large net.",
    icon: <Net />,
    asset: (
      <div className="bg-gradient-radial h-24 w-24 rounded-full from-yellow-500/20 to-transparent">
        <Net hideWrapper />
      </div>
    ),
  } as const,
  {
    name: "tuna",
    type: "food",
    description: "A can of tuna.",
    icon: <Tuna />,
    asset: <Tuna />,
  } as const,
] as const;

const INVENTORY_ITEMS = new Map(
  Object.entries(inventoryItems).map(([_, value]) => [
    value.name,
    value as Omit<InventoryItem, "quantity">,
  ]),
);

export type InventoryItemId = (typeof inventoryItems)[number]["name"];
