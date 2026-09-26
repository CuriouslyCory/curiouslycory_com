import { Button, Input, Label, Search } from "curiouslycory.com";

export const Default = () => (
  <div className="grid w-full max-w-sm gap-2">
    <Label htmlFor="callsign">Callsign</Label>
    <Input id="callsign" placeholder="Major Tom" />
  </div>
);

export const Types = () => (
  <div className="grid w-full max-w-sm gap-4">
    <div className="grid gap-2">
      <Label htmlFor="frequency">Frequency</Label>
      <Input
        id="frequency"
        type="email"
        defaultValue="astronaut@example.com"
      />
    </div>
    <div className="grid gap-2">
      <Label htmlFor="quest-progress">Quest progress (%)</Label>
      <Input
        id="quest-progress"
        type="number"
        min={0}
        max={100}
        defaultValue={40}
      />
    </div>
    <div className="grid gap-2">
      <Label htmlFor="api-key">OpenAI API key</Label>
      <Input id="api-key" type="password" defaultValue="sk-proj-orbit-4815" />
    </div>
  </div>
);

export const WithIcon = () => (
  <div className="grid w-full max-w-sm gap-2">
    <Label htmlFor="blog-search">Search the blog</Label>
    <div className="relative">
      <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2" />
      <Input id="blog-search" className="pl-8" placeholder="LangGraph, Arduino, TypeScript…" />
    </div>
  </div>
);

export const WithButton = () => (
  <div className="grid w-full max-w-md gap-2">
    <Label htmlFor="orbit-email">Stay in orbit</Label>
    <div className="flex gap-2">
      <Input id="orbit-email" type="email" placeholder="astronaut@example.com" />
      <Button>Subscribe</Button>
    </div>
    <p className="text-muted-foreground text-sm">
      One transmission per new post. No spam, just space.
    </p>
  </div>
);

export const Invalid = () => (
  <div className="grid w-full max-w-sm gap-2">
    <Label htmlFor="bad-frequency" className="text-destructive">
      Frequency
    </Label>
    <Input
      id="bad-frequency"
      type="email"
      defaultValue="major-tom@ground-control"
      aria-invalid
      aria-describedby="bad-frequency-msg"
    />
    <p id="bad-frequency-msg" className="text-destructive text-sm">
      That frequency is out of range. Try a full email address.
    </p>
  </div>
);

export const Disabled = () => (
  <div className="grid w-full max-w-sm gap-2">
    <Label htmlFor="station-id">Station ID</Label>
    <Input id="station-id" defaultValue="ISS-CURIOUSLYCORY-01" disabled />
    <p className="text-muted-foreground text-sm">
      Assigned automatically when you first make contact.
    </p>
  </div>
);
