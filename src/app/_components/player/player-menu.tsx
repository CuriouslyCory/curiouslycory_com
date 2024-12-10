import InventoryMenu from "./inventory-menu";
import QuestLog from "./quest-log";

export default function PlayerMenu() {
  return (
    <div className="fixed right-4 top-4 flex flex-col gap-4">
      <QuestLog />
      <InventoryMenu />
    </div>
  );
}
