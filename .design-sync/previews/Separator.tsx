import { Separator } from "curiouslycory.com";

export const Horizontal = () => (
  <div className="max-w-md">
    <div className="space-y-1">
      <h4 className="font-oswald text-lg font-semibold tracking-tight">
        Rebuilding Blog Search
      </h4>
      <p className="text-muted-foreground text-sm">
        Hybrid ranking with Postgres full-text search and pgvector.
      </p>
    </div>
    <Separator className="my-4" />
    <p className="text-sm leading-relaxed">
      Keyword search alone missed half the posts people were looking for, so I
      fused it with embeddings using reciprocal rank fusion.
    </p>
  </div>
);

export const Vertical = () => (
  <div className="flex h-5 items-center gap-4 text-sm">
    <span>Blog</span>
    <Separator orientation="vertical" />
    <span>Projects</span>
    <Separator orientation="vertical" />
    <span>Resume</span>
    <Separator orientation="vertical" />
    <span>Contact</span>
  </div>
);

export const ArticleSections = () => (
  <div className="max-w-md text-sm leading-relaxed">
    <h4 className="font-oswald text-base font-semibold">Why a package manager</h4>
    <p className="text-muted-foreground mt-1">
      Copying agent skills between repos by hand stopped scaling.
    </p>
    <Separator className="my-8" />
    <h4 className="font-oswald text-base font-semibold">How installs work</h4>
    <p className="text-muted-foreground mt-1">
      Each skill resolves from a registry and lands in .claude/skills.
    </p>
  </div>
);

export const Dark = () => (
  <div className="dark bg-background text-foreground w-full max-w-lg rounded-lg p-6">
    <div className="space-y-1">
      <h4 className="font-oswald text-lg font-semibold tracking-tight">
        Rebuilding Blog Search
      </h4>
      <p className="text-muted-foreground text-sm">
        Hybrid ranking with Postgres full-text search and pgvector.
      </p>
    </div>
    <Separator className="my-4" />
    <div className="flex h-5 items-center gap-4 text-sm">
      <span>Blog</span>
      <Separator orientation="vertical" />
      <span>Projects</span>
      <Separator orientation="vertical" />
      <span>Resume</span>
      <Separator orientation="vertical" />
      <span>Contact</span>
    </div>
  </div>
);
