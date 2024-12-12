"use client";

import { useState } from "react";
import { type Quest, usePlayer } from "./player-provider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";

export default function QuestLog() {
  const { quests } = usePlayer();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {quests.length > 0 && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="rounded-full p-4">
              Quests
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Quest Log</DialogTitle>
            </DialogHeader>
            {quests.length > 0 && <QuestList data={quests} />}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

function QuestList({ data }: { data: Quest[] }) {
  return (
    <section>
      {data.map((quest) => (
        <article key={quest.id}>
          <h3>{quest.title}</h3>
          <p>{quest.description}</p>
        </article>
      ))}
    </section>
  );
}
