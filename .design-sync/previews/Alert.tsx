import {
  Alert,
  AlertDescription,
  AlertTitle,
  Info,
  Lightbulb,
  ShieldAlert,
} from "curiouslycory.com";

export const Default = () => (
  <Alert className="max-w-md">
    <Info />
    <AlertTitle>Transmission received</AlertTitle>
    <AlertDescription>
      Thanks for reaching out. I usually reply within a couple of days.
    </AlertDescription>
  </Alert>
);

export const Destructive = () => (
  <Alert variant="destructive" className="max-w-md">
    <ShieldAlert />
    <AlertTitle>Signal lost</AlertTitle>
    <AlertDescription>
      Your message could not be sent. Check your connection and try again.
    </AlertDescription>
  </Alert>
);

export const WithList = () => (
  <Alert className="max-w-md">
    <Lightbulb />
    <AlertTitle>Before you run the bot locally</AlertTitle>
    <AlertDescription>
      <p>The LangGraph checkpointer needs a few things in place:</p>
      <ul className="list-inside list-disc text-sm">
        <li>A Postgres database with pgvector enabled</li>
        <li>TELEGRAM_BOT_TOKEN in your .env</li>
        <li>An MCP server URL for tool calls</li>
      </ul>
    </AlertDescription>
  </Alert>
);

export const TitleOnly = () => (
  <Alert className="max-w-md">
    <Info />
    <AlertTitle>This post was updated for Next.js 16.</AlertTitle>
  </Alert>
);

export const Dark = () => (
  <div className="dark bg-background text-foreground flex w-full max-w-lg flex-col gap-4 rounded-lg p-6">
    <Alert>
      <Info />
      <AlertTitle>Transmission received</AlertTitle>
      <AlertDescription>
        Thanks for reaching out. I usually reply within a couple of days.
      </AlertDescription>
    </Alert>
    <Alert variant="destructive">
      <ShieldAlert />
      <AlertTitle>Signal lost</AlertTitle>
      <AlertDescription>
        Your message could not be sent. Check your connection and try again.
      </AlertDescription>
    </Alert>
  </div>
);
