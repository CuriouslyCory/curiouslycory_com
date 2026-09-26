import {
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ExternalLink,
} from "curiouslycory.com";

export const Project = () => (
  <Card className="w-full max-w-sm">
    <CardHeader>
      <CardTitle className="font-oswald text-xl tracking-tight">
        CareerCraft Studio
      </CardTitle>
      <CardDescription>
        An AI career assistant that tailors resumes and cover letters to each
        job posting.
      </CardDescription>
      <CardAction>
        <Badge variant="secondary">Live</Badge>
      </CardAction>
    </CardHeader>
    <CardContent className="flex flex-wrap gap-2">
      <Badge variant="outline">Next.js</Badge>
      <Badge variant="outline">LangGraph</Badge>
      <Badge variant="outline">tRPC</Badge>
    </CardContent>
    <CardFooter className="gap-2">
      <Button size="sm">
        <ExternalLink />
        Visit
      </Button>
      <Button size="sm" variant="ghost">
        Read the write-up
      </Button>
    </CardFooter>
  </Card>
);

export const Toolbox = () => (
  <Card className="w-full max-w-md p-2 md:p-6">
    <CardHeader>
      <h2 className="font-oswald text-2xl font-semibold tracking-tight">
        My Main Toolbox
      </h2>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-2">
        {["TypeScript", "React", "Tailwind", "Prisma", "Postgres"].map((t) => (
          <div
            key={t}
            className="hover:bg-primary/10 rounded-xl px-4 py-2 text-sm font-medium transition-colors"
          >
            {t}
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export const Bordered = () => (
  <Card className="w-full max-w-sm">
    <CardHeader className="border-b">
      <CardTitle>Mission Log</CardTitle>
      <CardDescription>Last contact 3 days ago</CardDescription>
    </CardHeader>
    <CardContent className="text-sm leading-relaxed">
      Rebuilt the telegram bot on LangGraph and shipped a new blog post about
      it. Next up: a resume builder that prints cleanly to PDF.
    </CardContent>
    <CardFooter className="border-t">
      <span className="text-muted-foreground text-xs">Posted to the blog</span>
    </CardFooter>
  </Card>
);
