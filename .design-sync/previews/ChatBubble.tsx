import { ChatBubble } from "curiouslycory.com";

export const Variants = () => (
  <div className="flex flex-wrap items-start gap-6 p-4">
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
  <div className="flex justify-center p-4">
    <ChatBubble
      variant="thought"
      direction="bottom"
      text="Want to build something together? I'm all ears. Well, all helmet."
    />
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
  <div className="grid grid-cols-2 justify-items-start gap-8 p-4">
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
    <ChatBubble variant="thought" direction="bottom" text="Daydreaming" />
  </div>
);
