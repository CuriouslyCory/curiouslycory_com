import {
  Button,
  Check,
  ChevronUp,
  CircleDashed,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Input,
  Label,
  Select,
  SelectTrigger,
  SelectValue,
  Send,
} from "curiouslycory.com";

// Ported from src/components/player/debug-console.tsx (localhost-only).
export const DebugConsole = () => (
  <Drawer defaultOpen>
    <DrawerTrigger asChild>
      <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
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
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Add Item</h3>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select item" />
                </SelectTrigger>
              </Select>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Start Quest</h3>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select quest" />
                </SelectTrigger>
              </Select>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Update Quest Progress</h3>
              <p className="text-muted-foreground text-sm">Find the Bats</p>
              <Input type="number" min={0} max={100} defaultValue={40} />
            </div>
          </div>
        </div>
      </div>
    </DrawerContent>
  </Drawer>
);

export const Subscribe = () => (
  <Drawer defaultOpen>
    <DrawerTrigger asChild>
      <Button>Stay in orbit</Button>
    </DrawerTrigger>
    <DrawerContent>
      <div className="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle className="font-oswald text-2xl tracking-tight">
            Stay in orbit
          </DrawerTitle>
          <DrawerDescription>
            Get a transmission when a new post lands. Roughly once a month, no
            spam.
          </DrawerDescription>
        </DrawerHeader>
        <div className="grid gap-2 px-4">
          <Label htmlFor="drawer-email">Email</Label>
          <Input
            id="drawer-email"
            type="email"
            placeholder="astronaut@example.com"
          />
        </div>
        <DrawerFooter>
          <Button>
            <Send />
            Subscribe
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Maybe later</Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
);

const quests = [
  { title: "Read three blog posts", progress: "3 / 3", done: true },
  { title: "Find the Bats", progress: "1 / 3", done: false },
  { title: "Pet the Cat", progress: "0 / 1", done: false },
];

export const QuestLogRight = () => (
  <Drawer defaultOpen direction="right">
    <DrawerTrigger asChild>
      <Button variant="outline">Quest Log</Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle className="font-oswald text-2xl tracking-tight">
          Quest Log
        </DrawerTitle>
        <DrawerDescription>
          Hidden achievements you have unlocked while exploring the site.
        </DrawerDescription>
      </DrawerHeader>
      <ul className="space-y-3 px-4 text-sm">
        {quests.map((q) => (
          <li key={q.title} className="flex items-center gap-2">
            {q.done ? (
              <Check className="text-primary size-4" />
            ) : (
              <CircleDashed className="text-muted-foreground size-4" />
            )}
            <span className="flex-1">{q.title}</span>
            <span
              className={
                q.done ? "text-primary font-medium" : "text-muted-foreground"
              }
            >
              {q.progress}
            </span>
          </li>
        ))}
      </ul>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button variant="outline">Close</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);
