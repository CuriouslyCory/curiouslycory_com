import InventoryMenu from "./inventory/inventory-menu";
import QuestLog from "./quest-log";

export default function PlayerMenu() {
  return (
    <div className="fixed top-4 right-4 flex flex-col gap-4">
      <QuestLog />
      <InventoryMenu />
    </div>
  );
}
