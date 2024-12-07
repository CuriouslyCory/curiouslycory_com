"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

// Define types
export type InventoryItem = {
  name: string;
  type: string;
  description: string;
  quantity: number;
};

export type Quest = {
  id: string;
  progress: number;
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
  addInventoryItem: (item: InventoryItem) => void;
  removeInventoryItem: (itemName: string) => void;
  updateQuest: (quest: Quest) => void;
  addEvent: (event: PlayerEvent) => void;
};

// Create context
const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

// Create provider component
export function PlayerProvider({ children }: { children: ReactNode }) {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [events, setEvents] = useState<PlayerEvent[]>([]);

  const addInventoryItem = (item: InventoryItem) => {
    setInventory((prev) => {
      const existingItem = prev.find((i) => i.name === item.name);
      if (existingItem) {
        return prev.map((i) =>
          i.name === item.name
            ? { ...i, quantity: i.quantity + item.quantity }
            : i,
        );
      }
      return [...prev, item];
    });
  };

  const removeInventoryItem = (itemName: string) => {
    setInventory((prev) => prev.filter((item) => item.name !== itemName));
  };

  const updateQuest = (quest: Quest) => {
    setQuests((prev) => {
      const existingQuest = prev.find((q) => q.id === quest.id);
      if (existingQuest) {
        return prev.map((q) => (q.id === quest.id ? quest : q));
      }
      return [...prev, quest];
    });
  };

  const addEvent = (event: PlayerEvent) => {
    setEvents((prev) => [...prev, event]);
  };

  return (
    <PlayerContext.Provider
      value={{
        inventory,
        quests,
        events,
        addInventoryItem,
        removeInventoryItem,
        updateQuest,
        addEvent,
      }}
    >
      {children}
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
