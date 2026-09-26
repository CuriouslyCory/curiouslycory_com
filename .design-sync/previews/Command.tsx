import {
  Boxes,
  Button,
  Check,
  ChevronsUpDown,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  Copy,
  FileText,
  Mail,
  Moon,
  ScrollText,
  Send,
} from "curiouslycory.com";

export const Palette = () => (
  <Command
    className="rounded-lg border shadow-md"
    style={{ width: 380 }}
  >
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Navigate">
        <CommandItem>
          <Boxes />
          Projects
        </CommandItem>
        <CommandItem>
          <ScrollText />
          Blog
        </CommandItem>
        <CommandItem>
          <FileText />
          Resume
        </CommandItem>
        <CommandItem>
          <Mail />
          Contact
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Quick actions">
        <CommandItem>
          <Moon />
          Toggle dark mode
          <CommandShortcut>⌘J</CommandShortcut>
        </CommandItem>
        <CommandItem>
          <Copy />
          Copy email address
          <CommandShortcut>⌘E</CommandShortcut>
        </CommandItem>
        <CommandItem>
          <Send />
          Send Transmission
          <CommandShortcut>⌘↵</CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
);

const tags = ["AI", "LangGraph", "Next.js", "TypeScript", "Arduino"];

// The /projects tag filter (src/components/projects-filter.tsx), shown inline:
// the trigger plus the Command list that normally sits in its Popover.
export const TagCombobox = () => {
  const selected = "TypeScript";
  return (
    <div className="grid gap-1">
      <Button
        variant="outline"
        role="combobox"
        aria-expanded
        className="w-[200px] justify-between"
      >
        {selected}
        <ChevronsUpDown className="opacity-50" />
      </Button>
      <Command className="w-[200px] rounded-md border shadow-md">
        <CommandInput placeholder="Search tags..." className="h-9" />
        <CommandList>
          <CommandEmpty>No tag found.</CommandEmpty>
          <CommandGroup>
            <CommandItem value="all-projects">
              All Projects
              <Check className="ml-auto opacity-0" />
            </CommandItem>
            {tags.map((tag) => (
              <CommandItem key={tag} value={tag}>
                {tag}
                <Check
                  className={
                    tag === selected
                      ? "ml-auto opacity-100"
                      : "ml-auto opacity-0"
                  }
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export const NoResults = () => (
  <Command className="rounded-lg border shadow-md" style={{ width: 380 }}>
    <CommandInput placeholder="Search posts..." value="quantum toaster" />
    <CommandList>
      <CommandEmpty>
        No posts found. Try &quot;LangGraph&quot; or &quot;Arduino&quot;.
      </CommandEmpty>
      <CommandGroup heading="Posts">
        <CommandItem>A Fork-and-Go Telegram Bot with LangGraph + MCP</CommandItem>
        <CommandItem>DIY Capacitive Sensor for Arduino</CommandItem>
        <CommandItem>Building CareerCraft Studio</CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
);
