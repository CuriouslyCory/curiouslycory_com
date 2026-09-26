import { Button, Card, ChatBubble, Input, Label } from "curiouslycory.com";

export const Variants = () => (
  <div className="flex flex-wrap items-start gap-6 px-4 pt-4 pb-12">
    <ChatBubble variant="speech" text="Oops, gravity module offline." />
    <ChatBubble
      variant="whisper"
      text="No transmissions found on that frequency."
    />
    <ChatBubble
      variant="thought"
      text="Want to build something together? I'm all ears. Well, all helmet."
    />
    <ChatBubble variant="scream" text="Houston, we have a bug!" />
  </div>
);

export const ContactThought = () => (
  <div className="mx-auto max-w-lg p-4">
    <h1 className="font-oswald mb-6 text-3xl font-bold">Contact Me</h1>
    <div className="mb-10 flex justify-center">
      <ChatBubble
        variant="thought"
        direction="bottom"
        text="Want to build something together? I'm all ears. Well, all helmet."
      />
    </div>
    <Card className="p-6">
      <div className="space-y-2">
        <Label htmlFor="contact-callsign">Callsign</Label>
        <Input id="contact-callsign" placeholder="Major Tom" />
      </div>
      <Button className="w-fit">Send Transmission</Button>
    </Card>
  </div>
);

export const Directions = () => (
  <div className="grid grid-cols-2 justify-items-start gap-8 p-4">
    <ChatBubble direction="top" text="Tail on top" />
    <ChatBubble direction="bottom" text="Tail on bottom" />
    <ChatBubble direction="left" text="Tail on the left" />
    <ChatBubble direction="right" text="Tail on the right" />
    <ChatBubble direction="bottomLeft" text="Bottom left" />
    <ChatBubble direction="bottomRight" text="Bottom right" />
    <ChatBubble direction="rightBottom" text="Right, near bottom" />
  </div>
);

export const ThoughtDirections = () => (
  <div className="grid grid-cols-2 justify-items-start gap-x-16 gap-y-12 px-10 py-10">
    <ChatBubble variant="thought" direction="top" text="Pondering upward" />
    <ChatBubble variant="thought" direction="left" text="Drifting left" />
    <ChatBubble variant="thought" direction="right" text="Drifting right" />
    <ChatBubble
      variant="thought"
      direction="bottomLeft"
      text="Trailing off below"
    />
    <ChatBubble
      variant="thought"
      direction="rightBottom"
      text="Off to the lower right"
    />
    <ChatBubble
      variant="thought"
      direction="bottomRight"
      text="Drifting down and right"
    />
    <ChatBubble variant="thought" direction="bottom" text="Daydreaming" />
  </div>
);

export const Dark = () => (
  <div className="dark bg-background text-foreground grid grid-cols-2 items-start justify-items-start gap-x-16 gap-y-12 rounded-lg px-10 pt-10 pb-14">
    <ChatBubble variant="speech" direction="top" text="Oops, gravity module offline." />
    <ChatBubble
      variant="whisper"
      text="No transmissions found on that frequency."
    />
    <ChatBubble
      variant="thought"
      direction="bottom"
      text="Want to build something together? I'm all ears. Well, all helmet."
    />
    <ChatBubble variant="thought" direction="right" text="Drifting right" />
    <ChatBubble variant="scream" direction="left" text="Houston, we have a bug!" />
    <ChatBubble variant="thought" direction="bottomLeft" text="Trailing off below" />
  </div>
);
