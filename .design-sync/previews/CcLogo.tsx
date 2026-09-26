import { CcLogo } from "curiouslycory.com";

export const InNavbar = () => (
  <nav className="bg-foreground text-background w-full max-w-lg rounded-md px-4">
    <div className="flex h-16 items-center justify-between">
      <CcLogo />
      <div className="flex items-center gap-4 text-sm font-medium">
        <span>Blog</span>
        <span>Projects</span>
        <span>Contact</span>
      </div>
    </div>
  </nav>
);

export const InFooter = () => (
  <footer className="bg-foreground text-background w-full max-w-sm rounded-md p-6">
    <CcLogo />
    <p className="text-background/70 mt-2 text-sm">
      Building things with TypeScript, LangGraph, and a soldering iron.
    </p>
  </footer>
);

export const Sizes = () => (
  <div className="bg-foreground text-background flex w-fit items-center gap-6 rounded-md p-4">
    <CcLogo height="h-10" width="w-10" />
    <CcLogo />
    <CcLogo height="h-24" width="w-24" />
  </div>
);

// In dark mode the site keeps `bg-foreground` on the navbar and footer, so
// those bars turn light (cream) while the page around them goes dark, and the
// logo switches to its dark:fill-[#5d5c61] / dark:stroke-black treatment.
export const Dark = () => (
  <div className="dark bg-background text-foreground flex w-full max-w-lg flex-col gap-4 rounded-lg p-4">
    <nav className="bg-foreground text-background w-full rounded-md px-4">
      <div className="flex h-16 items-center justify-between">
        <CcLogo />
        <div className="flex items-center gap-4 text-sm font-medium">
          <span>Blog</span>
          <span>Projects</span>
          <span>Contact</span>
        </div>
      </div>
    </nav>
    <p className="text-muted-foreground px-1 text-sm">
      Page content sits on the dark background between the bars.
    </p>
    <footer className="bg-foreground text-background w-full rounded-md p-6">
      <CcLogo />
      <p className="text-background/70 mt-2 text-sm">
        Building things with TypeScript, LangGraph, and a soldering iron.
      </p>
    </footer>
  </div>
);
