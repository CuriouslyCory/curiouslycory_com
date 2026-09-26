import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const chatBubbleVariants = cva(
  "relative inline-block p-4 bg-white text-black rounded-2xl max-w-xs font-mono",
  {
    variants: {
      variant: {
        speech: "border-2 border-solid ",
        whisper: "border-2 border-dashed ",
        thought: "border-2 border-solid ",
        scream: "border-4 border-solid font-bold",
      },
      direction: {
        left: "",
        right: "",
        rightBottom: "",
        top: "",
        bottom: "",
        bottomLeft: "",
        bottomRight: "",
      },
    },
    defaultVariants: {
      variant: "speech",
      direction: "bottom",
    },
  },
);

const tailVariants = cva("absolute w-4 h-4 bg-white", {
  variants: {
    direction: {
      left: "-left-2 top-1/2 -translate-y-1/2 rotate-45 border-l-2 border-b-2",
      bottomLeft: "-bottom-2 left-2 -rotate-45 border-l-2 border-b-2",
      right:
        "-right-2 top-1/2 -translate-y-1/2 -rotate-45 border-r-2 border-b-2",
      rightBottom: "-right-2 bottom-3 -rotate-45 border-r-2 border-b-2",
      bottomRight: "-bottom-2 right-2 rotate-45 border-r-2 border-b-2",
      top: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-t-2 border-l-2",
      bottom:
        "-bottom-2 left-1/2 -translate-x-1/2 rotate-45 border-b-2 border-r-2",
    },
  },
});

// Thought dots trail away from the bubble along the same axis and from the
// same anchor point as the matching speech tail, largest dot first. The first
// dot sits 6px outside the 2px border: offsets are measured from the padding
// box, so the margin is 0.5rem = 2px border + 6px gap. Cross-axis anchors
// match the tail centres (bottomLeft/bottomRight tails are centred 1rem in
// from the side; the rightBottom tail is centred 1.25rem up from the bottom).
const thoughtBubbleVariants = cva("absolute flex items-center gap-1", {
  variants: {
    direction: {
      left: "right-full top-1/2 mr-2 -translate-y-1/2 flex-row-reverse",
      right: "left-full top-1/2 ml-2 -translate-y-1/2",
      rightBottom: "left-full bottom-5 ml-2 translate-y-1/2",
      top: "bottom-full left-1/2 mb-2 -translate-x-1/2 flex-col-reverse",
      bottom: "top-full left-1/2 mt-2 -translate-x-1/2 flex-col",
      bottomLeft: "top-full left-4 mt-2 -translate-x-1/2 flex-col",
      bottomRight: "top-full right-4 mt-2 translate-x-1/2 flex-col",
    },
  },
});

interface ChatBubbleProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chatBubbleVariants> {
  text: string;
}

export function ChatBubble({
  text,
  direction = "bottom",
  variant = "speech",
  className,
  ...props
}: ChatBubbleProps) {
  const thoughtBubbles = variant === "thought" && (
    <div className={thoughtBubbleVariants({ direction })}>
      <div className="h-2 w-2 rounded-full bg-black" />
      <div className="h-1.5 w-1.5 rounded-full bg-black" />
      <div className="h-1 w-1 rounded-full bg-black" />
    </div>
  );

  return (
    <div
      className={cn(chatBubbleVariants({ variant, direction, className }))}
      {...props}
    >
      {variant === "scream" ? text.toUpperCase() : text}
      {variant === "thought" ? (
        thoughtBubbles
      ) : (
        <div className={tailVariants({ direction })} />
      )}
    </div>
  );
}
