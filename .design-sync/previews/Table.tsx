import {
  Badge,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "curiouslycory.com";

const posts = [
  { title: "Building CareerCraft Studio", tag: "LangGraph", date: "Sep 2026", read: "14 min" },
  { title: "Rebuilding Blog Search", tag: "Next.js", date: "Aug 2026", read: "8 min" },
  { title: "TypeScript: Key vs Value Optional", tag: "TypeScript", date: "Jun 2025", read: "6 min" },
  { title: "Fastify Telegram Bot on LangGraph", tag: "LangGraph", date: "May 2025", read: "11 min" },
  { title: "Voice-Activated Timeout Timer", tag: "Arduino", date: "Jan 2020", read: "9 min" },
];

export const BlogPosts = () => (
  <Table>
    <TableCaption>Recent transmissions from the blog.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Title</TableHead>
        <TableHead>Topic</TableHead>
        <TableHead>Published</TableHead>
        <TableHead className="text-right">Read time</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {posts.map((p) => (
        <TableRow key={p.title}>
          <TableCell className="font-medium">{p.title}</TableCell>
          <TableCell>
            <Badge variant="outline">{p.tag}</Badge>
          </TableCell>
          <TableCell className="text-muted-foreground">{p.date}</TableCell>
          <TableCell className="text-right">{p.read}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const projects = [
  { name: "CareerCraft Studio", status: "Live", variant: "default", stack: "Next.js, LangGraph, tRPC", commits: 412 },
  { name: "Infinite Docs", status: "Beta", variant: "secondary", stack: "Next.js, Postgres", commits: 188 },
  { name: "My Skills", status: "Beta", variant: "secondary", stack: "TypeScript CLI", commits: 96 },
  { name: "Number Munchers Clone", status: "Archived", variant: "outline", stack: "React, Canvas", commits: 54 },
] as const;

export const ProjectsWithFooter = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Project</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Stack</TableHead>
        <TableHead className="text-right">Commits</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {projects.map((p) => (
        <TableRow key={p.name}>
          <TableCell className="font-medium">{p.name}</TableCell>
          <TableCell>
            <Badge variant={p.variant}>{p.status}</Badge>
          </TableCell>
          <TableCell className="text-muted-foreground">{p.stack}</TableCell>
          <TableCell className="text-right">{p.commits}</TableCell>
        </TableRow>
      ))}
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell colSpan={3}>Total commits</TableCell>
        <TableCell className="text-right">750</TableCell>
      </TableRow>
    </TableFooter>
  </Table>
);

export const SelectedRow = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Achievement</TableHead>
        <TableHead>Unlocked</TableHead>
        <TableHead className="text-right">Progress</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell className="font-medium">Found the constellation</TableCell>
        <TableCell className="text-muted-foreground">Sep 12, 2026</TableCell>
        <TableCell className="text-right">Complete</TableCell>
      </TableRow>
      <TableRow data-state="selected">
        <TableCell className="font-medium">Read three blog posts</TableCell>
        <TableCell className="text-muted-foreground">In progress</TableCell>
        <TableCell className="text-right">2 / 3</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">Survived zero gravity</TableCell>
        <TableCell className="text-muted-foreground">Locked</TableCell>
        <TableCell className="text-right">0 / 1</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

export const Dark = () => (
  <div className="dark bg-background text-foreground w-full rounded-lg p-6">
    <Table>
      <TableCaption>Active missions and their commit counts.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Project</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Stack</TableHead>
          <TableHead className="text-right">Commits</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((p) => (
          <TableRow
            key={p.name}
            data-state={p.name === "Infinite Docs" ? "selected" : undefined}
          >
            <TableCell className="font-medium">{p.name}</TableCell>
            <TableCell>
              <Badge variant={p.variant}>{p.status}</Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">{p.stack}</TableCell>
            <TableCell className="text-right">{p.commits}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total commits</TableCell>
          <TableCell className="text-right">750</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  </div>
);
