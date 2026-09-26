import {
  Button,
  Check,
  ChevronsUpDown,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Input,
  Label,
  Lightbulb,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Target,
} from "curiouslycory.com";

const tags = ["AI", "LangGraph", "Next.js", "TypeScript", "Arduino"];

// Ported from src/components/projects-filter.tsx: the tag combobox on /projects.
export const TagFilter = () => {
  const selected = "LangGraph";
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Filter by tag:</span>
      <Popover defaultOpen>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded
            className="w-[200px] justify-between"
          >
            {selected}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
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
        </PopoverContent>
      </Popover>
    </div>
  );
};

export const QuestHint = () => (
  <Popover defaultOpen>
    <PopoverTrigger asChild>
      <Button variant="secondary">
        <Lightbulb />
        Need a hint?
      </Button>
    </PopoverTrigger>
    <PopoverContent align="start">
      <div className="grid gap-3">
        <div className="flex items-center gap-2">
          <Target className="text-primary size-4" />
          <h4 className="font-oswald text-lg leading-none tracking-tight">
            Find the Bats
          </h4>
        </div>
        <p className="text-muted-foreground text-sm">
          Something stirs after dark. Try switching the site to dark mode and
          look closely at the night sky on the home page.
        </p>
        <p className="text-muted-foreground text-xs">Quest progress: 1 / 3</p>
      </div>
    </PopoverContent>
  </Popover>
);

export const WithForm = () => (
  <Popover defaultOpen>
    <PopoverTrigger asChild>
      <Button variant="outline">Resume settings</Button>
    </PopoverTrigger>
    <PopoverContent
      align="start"
      style={{ width: 320 }}
      onOpenAutoFocus={(e) => e.preventDefault()}
    >
      <div className="grid gap-4">
        <div className="space-y-2">
          <h4 className="leading-none font-medium">Print layout</h4>
          <p className="text-muted-foreground text-sm">
            Tune the PDF export for CareerCraft Studio.
          </p>
        </div>
        <div className="grid gap-2">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="resume-pages">Max pages</Label>
            <Input
              id="resume-pages"
              defaultValue="2"
              className="col-span-2 h-8"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="resume-font">Font size</Label>
            <Input
              id="resume-font"
              defaultValue="11pt"
              className="col-span-2 h-8"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="resume-margin">Margins</Label>
            <Input
              id="resume-margin"
              defaultValue="0.5in"
              className="col-span-2 h-8"
            />
          </div>
        </div>
      </div>
    </PopoverContent>
  </Popover>
);
