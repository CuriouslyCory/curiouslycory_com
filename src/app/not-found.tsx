import Link from "next/link";
import { Astronaut } from "~/components/astronaut";
import { Button } from "~/components/ui/button";
import { ChatBubble } from "~/components/ui/chat-bubble";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 px-4 text-center">
      <div className="relative flex flex-col items-center gap-4">
        <ChatBubble
          variant="whisper"
          direction="bottom"
          text="I think we took a wrong turn at the nebula."
        />
        <Astronaut
          className="h-48 w-48"
          style={{ animationDuration: "6s" }}
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="font-mono text-4xl font-bold text-primary">404</p>
        <p className="text-muted-foreground">Page not found</p>
      </div>
      <Button asChild>
        <Link href="/">Take me home</Link>
      </Button>
    </div>
  );
}
