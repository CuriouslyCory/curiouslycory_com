import { Button, Card, Input, Label, Send, Textarea } from "curiouslycory.com";

export const Default = () => (
  <div className="grid w-full max-w-md gap-2">
    <Label htmlFor="message">Your Message</Label>
    <Textarea
      id="message"
      placeholder="Want to build something together? I'm all ears. Well, all helmet."
    />
  </div>
);

export const ContactForm = () => (
  <Card className="w-full max-w-md p-6">
    <form className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="cf-name">Callsign</Label>
        <Input id="cf-name" defaultValue="Ada Lovelace" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="cf-email">Frequency</Label>
        <Input id="cf-email" type="email" defaultValue="ada@analytical.engine" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="cf-message">Your Message</Label>
        <Textarea
          id="cf-message"
          defaultValue="Loved the CareerCraft Studio write-up. Any chance you'd open-source the LangGraph resume agent?"
        />
      </div>
      <Button type="button">
        <Send />
        Send Transmission
      </Button>
    </form>
  </Card>
);

export const WithHelperText = () => (
  <div className="grid w-full max-w-md gap-2">
    <Label htmlFor="job-posting">Job posting</Label>
    <Textarea
      id="job-posting"
      className="min-h-32"
      defaultValue={
        "Senior Full-Stack Engineer (TypeScript, Next.js)\nWe're looking for someone who ships fast, writes tests, and has opinions about tRPC."
      }
    />
    <p className="text-muted-foreground text-sm">
      Paste the full description. CareerCraft Studio tailors your resume to it.
    </p>
  </div>
);

export const Invalid = () => (
  <div className="grid w-full max-w-md gap-2">
    <Label htmlFor="short-message" className="text-destructive">
      Your Message
    </Label>
    <Textarea
      id="short-message"
      defaultValue="hi"
      aria-invalid
      aria-describedby="short-message-error"
    />
    <p id="short-message-error" className="text-destructive text-sm">
      Transmission too short. Give me at least 20 characters to work with.
    </p>
  </div>
);

export const Disabled = () => (
  <div className="grid w-full max-w-md gap-2">
    <Label htmlFor="archived-note">Mission notes</Label>
    <Textarea
      id="archived-note"
      disabled
      defaultValue="Arduino weather station retired after the 2024 storm season. Notes are read-only."
    />
  </div>
);

export const Dark = () => (
  <div className="dark bg-background text-foreground grid w-full max-w-md gap-6 rounded-lg p-6">
    <Card className="p-6">
      <form className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="dark-cf-name">Callsign</Label>
          <Input id="dark-cf-name" defaultValue="Ada Lovelace" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="dark-cf-message">Your Message</Label>
          <Textarea
            id="dark-cf-message"
            placeholder="Want to build something together? I'm all ears. Well, all helmet."
          />
        </div>
        <Button type="button">
          <Send />
          Send Transmission
        </Button>
      </form>
    </Card>
    <div className="grid gap-2">
      <Label htmlFor="dark-short-message" className="text-destructive">
        Your Message
      </Label>
      <Textarea
        id="dark-short-message"
        defaultValue="hi"
        aria-invalid
        aria-describedby="dark-short-message-error"
      />
      <p id="dark-short-message-error" className="text-destructive text-sm">
        Transmission too short. Give me at least 20 characters to work with.
      </p>
    </div>
    <div className="grid gap-2">
      <Label htmlFor="dark-archived-note">Mission notes</Label>
      <Textarea
        id="dark-archived-note"
        disabled
        defaultValue="Arduino weather station retired after the 2024 storm season. Notes are read-only."
      />
    </div>
  </div>
);
