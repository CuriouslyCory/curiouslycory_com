import { Badge, Check, Sparkles, X } from "curiouslycory.com";

export const Variants = () => (
  <div className="flex flex-wrap items-center gap-2">
    <Badge>Featured</Badge>
    <Badge variant="secondary">LangGraph</Badge>
    <Badge variant="outline">TypeScript</Badge>
    <Badge variant="destructive">Deprecated</Badge>
  </div>
);

export const TechStack = () => (
  <div className="flex max-w-sm flex-wrap gap-2">
    <Badge variant="secondary">Postgres FTS</Badge>
    <Badge variant="secondary">pgvector</Badge>
    <Badge variant="secondary">Embeddings</Badge>
    <Badge variant="secondary">RRF</Badge>
    <Badge variant="secondary">Next.js</Badge>
    <Badge variant="secondary">Prisma</Badge>
  </div>
);

export const WithIcon = () => (
  <div className="flex flex-wrap items-center gap-2">
    <Badge>
      <Sparkles />
      New post
    </Badge>
    <Badge variant="secondary">
      <Check />
      Shipped
    </Badge>
    <Badge variant="outline">
      <Sparkles />
      AI Agents
    </Badge>
  </div>
);

export const ActiveFilters = () => (
  <div className="flex flex-wrap items-center gap-2">
    <span className="text-muted-foreground text-sm">Active filters:</span>
    <Badge variant="secondary" className="cursor-pointer">
      <span>query: langgraph</span>
      <X />
    </Badge>
    <Badge variant="secondary" className="cursor-pointer">
      <span>#typescript</span>
      <X />
    </Badge>
    <Badge variant="destructive" className="cursor-pointer">
      <span>2025</span>
      <X />
    </Badge>
  </div>
);

export const LiveStatus = () => (
  <div className="flex flex-col gap-3">
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="destructive">LIVE</Badge>
      <span className="font-medium">Wiring an Arduino weather station</span>
      <Badge variant="secondary">Science &amp; Technology</Badge>
      <span className="text-muted-foreground text-sm">42 viewers</span>
    </div>
    <div>
      <Badge variant="outline" className="text-muted-foreground">
        Offline
      </Badge>
    </div>
  </div>
);

export const Dark = () => (
  <div className="dark bg-background text-foreground flex flex-col gap-3 rounded-lg p-6">
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Featured</Badge>
      <Badge variant="secondary">LangGraph</Badge>
      <Badge variant="outline">TypeScript</Badge>
      <Badge variant="destructive">Deprecated</Badge>
    </div>
    <div className="flex flex-wrap items-center gap-2">
      <Badge>
        <Sparkles />
        New post
      </Badge>
      <Badge variant="secondary">
        <Check />
        Shipped
      </Badge>
      <Badge variant="outline">
        <Sparkles />
        AI Agents
      </Badge>
    </div>
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="destructive">LIVE</Badge>
      <span className="font-medium">Wiring an Arduino weather station</span>
      <Badge variant="outline" className="text-muted-foreground">
        Offline
      </Badge>
    </div>
  </div>
);
