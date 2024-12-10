"use client";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  type HTMLMotionProps,
  motion,
  useInView,
} from "framer-motion";
import { toast } from "sonner";
import { BatWings as BatWingSvg } from "~/components/bat-wings";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { usePlayer } from "./player/player-provider";
import useWindowSize from "~/hooks/use-window-size";

// Types
type Edge = 0 | 1 | 2 | 3; // Top, Right, Bottom, Left
type Position = { x: number; y: number };

// Constants
const SPAWN_INTERVAL = 1000;
const MAX_WILD_BATS = 3;
const EDGE_OFFSET = 0;
const ANIMATION_DURATION = 2;

// Utility functions
const getRandomEdge = (excludeEdge?: Edge): Edge => {
  let edge: Edge;
  do {
    edge = Math.floor(Math.random() * 4) as Edge;
  } while (edge === excludeEdge);
  return edge;
};

const getEdgePosition = (
  edge: Edge,
  windowSize: { width?: number; height?: number },
): Position | undefined => {
  if (!windowSize.width || !windowSize.height) return;

  switch (edge) {
    case 0: // Top
      return { x: Math.random() * windowSize.width, y: -EDGE_OFFSET };
    case 1: // Right
      return {
        x: windowSize.width + EDGE_OFFSET,
        y: Math.random() * windowSize.height,
      };
    case 2: // Bottom
      return {
        x: Math.random() * windowSize.width,
        y: windowSize.height + EDGE_OFFSET,
      };
    case 3: // Left
      return { x: -EDGE_OFFSET, y: Math.random() * windowSize.height };
  }
};

const getCurrentEdge = (
  position: Position,
  windowSize: { width?: number },
): Edge => {
  if (position.x <= 0) return 3;
  if (position.x >= (windowSize.width ?? 0)) return 1;
  if (position.y <= 0) return 0;
  return 2;
};

// Components
const WildBatPost = memo(
  ({
    onCatch,
    ...props
  }: HTMLMotionProps<"div"> & { onCatch?: () => void }) => {
    const randomKey = useMemo(() => Math.floor(Math.random() * 3) + 1, []);
    const windowSize = useWindowSize();

    const [position, setPosition] = useState(() => {
      const edge = getRandomEdge();
      return getEdgePosition(edge, windowSize);
    });

    const getNextPosition = useCallback(() => {
      if (!position || !windowSize.width || !windowSize.height) return;
      const currentEdge = getCurrentEdge(position, windowSize);
      const nextEdge = getRandomEdge(currentEdge);
      return getEdgePosition(nextEdge, windowSize);
    }, [position, windowSize]);

    return (
      <motion.div
        animate={position}
        initial={position}
        transition={{ duration: ANIMATION_DURATION, ease: "linear" }}
        onAnimationComplete={() => setPosition(getNextPosition())}
        onClick={onCatch}
        {...props}
      >
        <BatWings>
          <BlogPostCard {...getBlogPostData(randomKey)} />
        </BatWings>
      </motion.div>
    );
  },
);
WildBatPost.displayName = "WildBatPost";

// Main component
export default function BlogPostBats() {
  const windowSize = useWindowSize();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 1 });
  const [isPaused, setIsPaused] = useState(true);
  const [endCount, setEndCount] = useState(0);
  const [positions, setPositions] = useState<Record<number, string | number>>({
    1: 0,
    2: 0,
    3: 0,
  });

  const { startQuest, quests, addInventoryItem, inventory } = usePlayer();
  const batQuest = quests.find((quest) => quest.id === "bat-quest");
  const activeInventoryItem = useMemo(
    () => inventory.find((item) => item.active),
    [inventory],
  );

  const [wildBats, setWildBats] = useState<{ id: string }[]>([]);

  // Quest progress handling
  useEffect(() => {
    if (batQuest?.progress === undefined) return;

    if (batQuest.progress === 0) {
      addInventoryItem("net", 1);
    } else if (batQuest.progress === 100) {
      toast.success("You found all the bats!");
    } else if (batQuest.progress > 0) {
      toast.info(`Found ${batQuest.progress}% of the bats!`);
    }
  }, [batQuest?.progress, addInventoryItem]);

  // Wild bats spawning
  useEffect(() => {
    if (activeInventoryItem?.name !== "net" || wildBats.length >= MAX_WILD_BATS)
      return;

    const batTick = setInterval(() => {
      setWildBats((prev) => [...prev, { id: Math.random().toString() }]);
    }, SPAWN_INTERVAL);

    return () => clearInterval(batTick);
  }, [activeInventoryItem, wildBats.length]);

  // Initial animation trigger
  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => setIsPaused(false), 1000);
    return () => clearTimeout(timer);
  }, [isInView]);

  // Quest prompt handling
  const startBatQuest = useCallback(() => {
    startQuest({ id: "bat-quest", progress: 0 });
  }, [startQuest]);

  const promptBatQuest = useCallback(() => {
    toast(
      "... If my boss finds out those bats are gone, I'm going to be in big trouble. Can you help me find them?",
      {
        action: { label: "Sure, I'll help you.", onClick: startBatQuest },
        cancel: {
          label: "Get Lost.",
          onClick: () => {
            // do something
          },
        },
        duration: Infinity,
      },
    );
  }, [startBatQuest]);

  useEffect(() => {
    if (endCount >= 3) {
      setEndCount(0);
      toast.error(
        "Erm... This is awkward but... Did you see where the bat posts went?",
        {
          action: {
            label: "Maybe?",
            onClick: promptBatQuest,
          },
          cancel: {
            label: "Bat what now?",
            onClick: promptBatQuest,
          },
          duration: Infinity,
        },
      );
    }
  }, [endCount, promptBatQuest]);

  return (
    <>
      <div
        className={cn(
          "pointer-events-none absolute left-0 top-0 h-full w-full",
          activeInventoryItem?.name === "net" && "cursor-none",
        )}
      >
        {wildBats.map((bat) => (
          <WildBatPost
            key={bat.id}
            onCatch={() =>
              setWildBats((prev) => prev.filter((b) => b.id !== bat.id))
            }
            className="pointer-events-auto"
          />
        ))}
      </div>
      <section className="relative my-20 h-fit w-full overflow-hidden pb-8">
        <h2 className="mx-2 mb-10 text-3xl font-bold md:mx-6">Latest Posts</h2>

        <div
          className="flex w-full flex-col flex-nowrap justify-center gap-y-6 md:flex-row"
          ref={ref}
        >
          <AnimatePresence>
            {[1, 2, 3].map((key) => (
              <motion.div
                key={key}
                animate={
                  isPaused
                    ? { x: positions[key] }
                    : {
                        x: "100vw",
                        transition: {
                          delay: key - 1,
                          duration: 5,
                          ease: "linear",
                        },
                      }
                }
                onUpdate={(latest) => {
                  if (!isPaused) {
                    setPositions((prev) => ({
                      ...prev,
                      [key]: latest.x ?? 0, // Save the current position when animation is running
                    }));
                    if (latest.x === "100vw") {
                      setEndCount((prev) => prev + 1);
                    }
                  }
                }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <BatWings>
                  <BlogPostCard
                    title={getBlogPostData(key).title}
                    description={getBlogPostData(key).description}
                  />
                </BatWings>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}

// Helper function to get blog post data
function getBlogPostData(key: number) {
  const posts = {
    1: {
      title: "Local Photo and File Storage With Nextcloud",
      description:
        "Join me as I build a local photo and file storage solution with Nextcloud. Including fulltext search, deuping content, and remote backups to backblaze.",
    },
    2: {
      title: "Image Converter With NextJs and Vercel",
      description:
        "I built a simple image converter with NextJs and Vercel. It allows you to upload an image and convert it to a different format.",
    },
    3: {
      title: "Hand Writing Practice Game Made With NextJs",
      description:
        "I built a simple hand writing practice game with NextJs. It allows you to practice your handwriting with a variety of fonts and languages.",
    },
  };
  return posts[key as keyof typeof posts];
}

function BatWings({ children }: { children: React.ReactNode }) {
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      setTimeout(() => {
        setIsPaused(false);
      }, 1000);
    }
  }, [isPaused]);

  return (
    <div
      className={cn(
        "flex animate-rotate-15 items-center justify-center overflow-hidden align-top hover:animate-none",
        isPaused && "animate-none",
      )}
      onClick={() => setIsPaused(!isPaused)}
    >
      <BatWingSvg className="relative left-1 -z-10 inline-block h-12 w-12" />
      {children}
      <BatWingSvg
        direction="right"
        className="relative right-4 -z-10 inline-block h-12 w-12"
      />
    </div>
  );
}

function BlogPostCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card className="max-w-xs">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}
