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
  <div className="bg-foreground flex w-fit items-center gap-6 rounded-md p-4">
    <CcLogo height="h-10" width="w-10" />
    <CcLogo />
    <CcLogo height="h-24" width="w-24" />
  </div>
);
