import { Button, Send, Download, Loader2, Plus } from "curiouslycory.com";

export const Variants = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button>Send Transmission</Button>
    <Button variant="secondary">View Projects</Button>
    <Button variant="outline">Read the Blog</Button>
    <Button variant="ghost">Cancel</Button>
    <Button variant="destructive">Abort Mission</Button>
    <Button variant="link">Open resume</Button>
  </div>
);

export const Sizes = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button size="sm">Small</Button>
    <Button>Default</Button>
    <Button size="lg">Large</Button>
    <Button size="icon" aria-label="Add">
      <Plus />
    </Button>
  </div>
);

export const WithIcon = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button>
      <Send />
      Send Transmission
    </Button>
    <Button variant="outline">
      <Download />
      Download PDF
    </Button>
  </div>
);

export const States = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button disabled>
      <Loader2 className="animate-spin" />
      Transmitting…
    </Button>
    <Button variant="outline" disabled>
      Disabled
    </Button>
  </div>
);

export const AsLink = () => (
  <Button asChild variant="secondary">
    <a href="#projects">Explore the Projects</a>
  </Button>
);
