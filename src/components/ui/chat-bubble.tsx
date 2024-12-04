import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const chatBubbleVariants = cva(
  "relative inline-block p-4 bg-white text-black rounded-2xl max-w-xs",
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
      top: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-t-2 border-r-2",
      bottom:
        "-bottom-2 left-1/2 -translate-x-1/2 rotate-45 border-b-2 border-r-2",
    },
  },
});

const thoughtBubbleVariants = cva("absolute flex gap-1", {
  variants: {
    direction: {
      left: "-left-4 top-1/2 -translate-y-1/2",
      bottomLeft: "-bottom-4 left-2",
      right: "-right-4 top-1/2 -translate-y-1/2",
      rightBottom: "-bottom-4 -right-4",
      bottomRight: "right-2",
      top: "top-0 left-1/2 -translate-x-1/2 -translate-y-full",
      bottom: "-bottom-4 left-1/2 -translate-x-1/2",
    },
  },
});

interface ChatBubbleProps
  extends React.HTMLAttributes<HTMLDivElement>,
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
