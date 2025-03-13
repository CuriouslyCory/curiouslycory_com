import { toast } from "sonner";
import { type InventoryItemId } from "./inventory/items";

type QuestStepFuncs = {
  addInventoryItem: (item: InventoryItemId, quantity: number) => void;
  activateInventoryItem: (item: InventoryItemId) => void;
};

export type QuestStep = {
  progress: number;
  description: string;
  onComplete?: (funcs: QuestStepFuncs) => void;
};

export type Quest = {
  id: QuestId;
  progress: number;
  title: string;
  description: string;
  steps: QuestStep[];
};

const quests = [
  {
    id: "bat-quest",
    progress: 0,
    title: "Find the Bats",
    description:
      "The bats have gone missing. I need you to find them and bring them back to me.",
    steps: [
      {
        progress: 0,
        description: "Get a net to catch bats",
        onComplete: (funcs: QuestStepFuncs) => {
          toast.success("You got a net! Now you can catch bats.");
          funcs.addInventoryItem("net", 1);
        },
      },
      {
        progress: 1,
        description: "Catch your first bat",
        onComplete: () => {
          toast.success("You caught your first bat!");
        },
      },
      {
        progress: 3,
        description: "Find all the bats",
        onComplete: (funcs: QuestStepFuncs) => {
          toast.success(
            "You found all the bats! You saved the day! Here, enjoy this old can of tuna as a reward.",
            {
              duration: Infinity,
            },
          );
          funcs.activateInventoryItem("net"); // deactivate net as a courtesy
          funcs.addInventoryItem("tuna", 1);
        },
      },
    ],
  } as const,
  {
    id: "pet-the-cat",
    progress: 0,
    title: "Pet the Cat",
    description:
      "The cat is lonely. I need you to pet it and bring it back to me.",
    steps: [
      {
        progress: 0,
        description: "Find the cat",
      },
      {
        progress: 100,
        description: "Pet the cat",
        onComplete: () => {
          toast.success("The cat purrs happily!");
        },
      },
    ],
  } as const,
] as const;

export const QUESTS = new Map(
  Object.entries(quests).map(([_, value]) => [
    value.id,
    {
      ...value,
      steps: [...value.steps],
    } as Quest,
  ]),
);

export type QuestId = (typeof quests)[number]["id"];
