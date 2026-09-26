import * as React from "react";
import {
  Button,
  Copy,
  Download,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Link2,
  Moon,
  MoreHorizontal,
  PenLine,
  Printer,
  Sun,
  Tags,
  X,
} from "curiouslycory.com";

// Ported from src/components/theme-mode-toggle.tsx (site header).
export const ThemeToggle = () => (
  <div className="flex justify-end" style={{ width: 240 }}>
    <DropdownMenu defaultOpen modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Sun />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Moon />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

export const PostActions = () => (
  <DropdownMenu defaultOpen modal={false}>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="icon" aria-label="Post actions">
        <MoreHorizontal />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start" style={{ width: 260 }}>
      <DropdownMenuLabel>A Fork-and-Go Telegram Bot with LangGraph + MCP</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Link2 />
        Copy link
        <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Copy />
        Copy as Markdown
        <DropdownMenuShortcut>⇧⌘C</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Printer />
        Print
        <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Download />
        Download PDF
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <PenLine />
        Edit draft
      </DropdownMenuItem>
      <DropdownMenuItem variant="destructive">
        <X />
        Unpublish
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export const FeedOptions = () => {
  const [topics, setTopics] = React.useState({
    langgraph: true,
    typescript: true,
    arduino: false,
  });
  const [sort, setSort] = React.useState("newest");
  return (
    <DropdownMenu defaultOpen modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Tags />
          Filter posts
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuLabel>Topics</DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          checked={topics.langgraph}
          onCheckedChange={(v) => setTopics({ ...topics, langgraph: !!v })}
        >
          LangGraph
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={topics.typescript}
          onCheckedChange={(v) => setTopics({ ...topics, typescript: !!v })}
        >
          TypeScript
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={topics.arduino}
          onCheckedChange={(v) => setTopics({ ...topics, arduino: !!v })}
        >
          Arduino
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
          <DropdownMenuRadioItem value="newest">Newest first</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="oldest">Oldest first</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Menu content portals to <body>, outside any wrapper, so dark mode is set on
// <html> the way the site's next-themes toggle does it. The card template
// paints its own light background, so each story fills the viewport with the
// page surface a dark-mode visitor would see. Two default-open menus in one
// story dismiss each other (each one's focus lands "outside" the other), so
// the header toggle and the post-actions menu are separate stories.
const DarkPage = ({ children }: { children: React.ReactNode }) => {
  React.useEffect(() => {
    document.documentElement.classList.add("dark");
    return () => document.documentElement.classList.remove("dark");
  }, []);
  return (
    <div className="bg-background text-foreground min-h-screen p-6">
      {children}
    </div>
  );
};

export const Dark = () => (
  <DarkPage>
    <div className="flex justify-end" style={{ width: 240 }}>
      <DropdownMenu defaultOpen modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Moon className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Sun />
            Light
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Moon />
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem>System</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </DarkPage>
);

// Shortcuts, separators, and the destructive item on the dark popover surface.
export const DarkPostActions = () => (
  <DarkPage>
    <DropdownMenu defaultOpen modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Post actions">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" style={{ width: 260 }}>
        <DropdownMenuLabel>
          A Fork-and-Go Telegram Bot with LangGraph + MCP
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link2 />
          Copy link
          <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy />
          Copy as Markdown
          <DropdownMenuShortcut>⇧⌘C</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Printer />
          Print
          <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Download />
          Download PDF
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <PenLine />
          Edit draft
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive">
          <X />
          Unpublish
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </DarkPage>
);
