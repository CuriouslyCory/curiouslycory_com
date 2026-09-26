import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FileText,
  Boxes,
  ScrollText,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "curiouslycory.com";

export const SiteSections = () => (
  <Tabs defaultValue="projects" className="w-full max-w-sm">
    <TabsList>
      <TabsTrigger value="projects">Projects</TabsTrigger>
      <TabsTrigger value="blog">Blog</TabsTrigger>
      <TabsTrigger value="resume">Resume</TabsTrigger>
    </TabsList>
    <TabsContent value="projects">
      <Card>
        <CardHeader>
          <CardTitle className="font-oswald text-lg tracking-tight">
            CareerCraft Studio
          </CardTitle>
          <CardDescription>
            AI resume and cover letter tailoring, one job posting at a time.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Badge variant="outline">Next.js</Badge>
          <Badge variant="outline">LangGraph</Badge>
          <Badge variant="outline">tRPC</Badge>
        </CardContent>
      </Card>
    </TabsContent>
    <TabsContent value="blog">
      <p className="text-sm">Latest transmissions from the blog.</p>
    </TabsContent>
    <TabsContent value="resume">
      <p className="text-sm">Download the printable resume.</p>
    </TabsContent>
  </Tabs>
);

export const WithIcons = () => (
  <Tabs defaultValue="blog" className="w-full max-w-sm">
    <TabsList className="w-full">
      <TabsTrigger value="projects">
        <Boxes />
        Projects
      </TabsTrigger>
      <TabsTrigger value="blog">
        <ScrollText />
        Blog
      </TabsTrigger>
      <TabsTrigger value="resume">
        <FileText />
        Resume
      </TabsTrigger>
    </TabsList>
    <TabsContent value="blog" className="space-y-3 text-sm">
      <div>
        <p className="font-medium">Rebuilding Blog Search</p>
        <p className="text-muted-foreground text-xs">
          Scanning every transmission for the right frequency.
        </p>
      </div>
      <div>
        <p className="font-medium">TypeScript: Key vs Value Optional</p>
        <p className="text-muted-foreground text-xs">
          Why traceId?: string quietly drops your telemetry.
        </p>
      </div>
    </TabsContent>
  </Tabs>
);

export const DisabledTab = () => (
  <Tabs defaultValue="published" className="w-full max-w-sm">
    <TabsList>
      <TabsTrigger value="published">Published</TabsTrigger>
      <TabsTrigger value="drafts">Drafts</TabsTrigger>
      <TabsTrigger value="archived" disabled>
        Archived
      </TabsTrigger>
    </TabsList>
    <TabsContent value="published" className="text-muted-foreground text-sm">
      14 posts in orbit. The most recent went live this week.
    </TabsContent>
  </Tabs>
);
