import {
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "curiouslycory.com";

const resumes = [
  { id: "fullstack", icon: "🚀", title: "Full-Stack Engineer" },
  { id: "ai", icon: "🤖", title: "AI Engineer" },
  { id: "lead", icon: "🧭", title: "Engineering Lead" },
  { id: "maker", icon: "🔧", title: "Hardware Tinkerer" },
];

export const Open = () => (
  <div className="grid gap-3">
    <span className="text-sm">I wear many hats, choose one:</span>
    <Select defaultOpen defaultValue="ai">
      <SelectTrigger style={{ width: 280 }} aria-label="Resume">
        <SelectValue placeholder="Select a resume" />
      </SelectTrigger>
      <SelectContent>
        {resumes.map((resume) => (
          <SelectItem key={resume.id} value={resume.id}>
            <span>{resume.icon}</span>
            <span>{resume.title}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export const Default = () => (
  <div className="grid gap-2">
    <Label htmlFor="quest">Start Quest</Label>
    <Select>
      <SelectTrigger id="quest" style={{ width: 240 }}>
        <SelectValue placeholder="Select quest" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="bat-quest">Find the Bats</SelectItem>
        <SelectItem value="pet-the-cat">Pet the Cat</SelectItem>
      </SelectContent>
    </Select>
  </div>
);

export const Grouped = () => (
  <div className="grid gap-2">
    <Label htmlFor="topic">Filter by topic</Label>
    <Select defaultOpen defaultValue="langgraph">
      <SelectTrigger id="topic" style={{ width: 240 }}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>AI</SelectLabel>
          <SelectItem value="langgraph">LangGraph</SelectItem>
          <SelectItem value="agents">Agents</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Hardware</SelectLabel>
          <SelectItem value="arduino">Arduino</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
);

export const Sizes = () => (
  <div className="flex items-start gap-4">
    <div className="grid gap-2">
      <Label htmlFor="item-sm">Add item (sm)</Label>
      <Select defaultValue="net">
        <SelectTrigger id="item-sm" size="sm" style={{ width: 160 }}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="net">Net</SelectItem>
          <SelectItem value="tuna">Tuna</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div className="grid gap-2">
      <Label htmlFor="item-default">Add item (default)</Label>
      <Select defaultValue="tuna">
        <SelectTrigger id="item-default" style={{ width: 160 }}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="net">Net</SelectItem>
          <SelectItem value="tuna">Tuna</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
);

export const States = () => (
  <div className="flex items-start gap-4">
    <div className="grid gap-2">
      <Label htmlFor="theme-disabled" className="opacity-50">
        Theme
      </Label>
      <Select defaultValue="dark" disabled>
        <SelectTrigger id="theme-disabled" style={{ width: 200 }}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="dark">Deep space (dark)</SelectItem>
          <SelectItem value="light">Daylight</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div className="grid gap-2">
      <Label htmlFor="resume-invalid" className="text-destructive">
        Resume
      </Label>
      <Select>
        <SelectTrigger
          id="resume-invalid"
          aria-invalid
          style={{ width: 200 }}
        >
          <SelectValue placeholder="Select a resume" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="fullstack">Full-Stack Engineer</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-destructive text-sm">Pick a hat before printing.</p>
    </div>
  </div>
);
