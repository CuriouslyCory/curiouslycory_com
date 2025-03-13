import { type ReactNode } from "react";
import { Net } from "./net";
import { Tuna } from "./tuna";

export type InventoryItem = {
  name: InventoryItemId;
  type: string;
  description: string;
  quantity: number;
  icon?: ReactNode;
  asset?: ReactNode;
  active?: boolean;
};

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

export const INVENTORY_ITEMS = new Map(
  Object.entries(inventoryItems).map(([_, value]) => [
    value.name,
    value as Omit<InventoryItem, "quantity">,
  ]),
);

export type InventoryItemId = (typeof inventoryItems)[number]["name"];
