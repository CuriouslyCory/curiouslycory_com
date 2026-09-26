import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from "curiouslycory.com";

export const Open = () => (
  <Dialog defaultOpen>
    <DialogTrigger asChild>
      <Button variant="outline">Open quest log</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Quest Log</DialogTitle>
        <DialogDescription>
          Hidden achievements you have unlocked while exploring the site.
        </DialogDescription>
      </DialogHeader>
      <ul className="space-y-3 text-sm">
        <li className="flex items-center justify-between">
          <span>Found the constellation easter egg</span>
          <span className="text-primary font-medium">Complete</span>
        </li>
        <li className="flex items-center justify-between">
          <span>Read three blog posts</span>
          <span className="text-muted-foreground">2 / 3</span>
        </li>
      </ul>
      <DialogFooter>
        <DialogClose asChild>
          <Button>Close</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export const WithForm = () => (
  <Dialog defaultOpen>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Stay in orbit</DialogTitle>
        <DialogDescription>
          Get a transmission when a new post goes live.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-2">
        <Label htmlFor="subscribe-email">Email</Label>
        <Input
          id="subscribe-email"
          type="email"
          placeholder="astronaut@example.com"
        />
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Not now</Button>
        </DialogClose>
        <Button>Subscribe</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
