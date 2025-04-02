"use client";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  type HTMLMotionProps,
  motion,
  useInView,
} from "motion/react";
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
  }: { onCatch?: () => void } & HTMLMotionProps<"div">) => {
    const randomKey = useMemo(() => Math.floor(Math.random() * 3) + 1, []);
    const windowSize = useWindowSize();

    // Wait for window size to be available
    const [positions, setPositions] = useState<{
      start?: Position;
      current?: Position;
    }>({});

    // Initialize positions when window size is available
    useEffect(() => {
      if (!windowSize.width || !windowSize.height) return;

      const edge = getRandomEdge();
      const start = getEdgePosition(edge, windowSize);

      if (start) {
        const nextEdge = getRandomEdge(getCurrentEdge(start, windowSize));
        const current = getEdgePosition(nextEdge, windowSize);

        setPositions({ start, current });
      }
    }, [windowSize]);

    const getNextPosition = useCallback(() => {
      if (!positions.current || !windowSize.width || !windowSize.height) return;

      const currentEdge = getCurrentEdge(positions.current, windowSize);
      const nextEdge = getRandomEdge(currentEdge);
      return getEdgePosition(nextEdge, windowSize);
    }, [positions, windowSize]);

    if (!positions.start || !positions.current) return null;

    return (
      <motion.div
        initial={positions.start}
        animate={positions.current}
        transition={{ duration: ANIMATION_DURATION, ease: "linear" }}
        onAnimationComplete={() => {
          const next = getNextPosition();
          if (next) setPositions((prev) => ({ ...prev, current: next }));
        }}
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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, {
    once: true,
    amount: 1,
  });
  const [isPaused, setIsPaused] = useState(true);
  const [endCount, setEndCount] = useState(0);
  const [positions, setPositions] = useState<Record<number, string | number>>({
    1: 0,
    2: 0,
    3: 0,
  });

  const { startQuest, inventory, updateQuestProgress } = usePlayer();

  const activeInventoryItem = useMemo(
    () => inventory.find((item) => item.active),
    [inventory],
  );

  const [wildBats, setWildBats] = useState<{ id: string }[]>([]);
  const [batsCaught, setBatsCaught] = useState(0);

  // Wild bats spawning
  useEffect(() => {
    if (
      activeInventoryItem?.name !== "net" ||
      wildBats.length >= MAX_WILD_BATS - batsCaught
    )
      return;

    const batTick = setInterval(() => {
      setWildBats((prev) => [...prev, { id: Math.random().toString() }]);
    }, SPAWN_INTERVAL);

    return () => clearInterval(batTick);
  }, [activeInventoryItem, wildBats.length, batsCaught]);

  // Initial animation trigger
  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => setIsPaused(false), 1000);
    return () => clearTimeout(timer);
  }, [isInView]);

  // Quest prompt handling
  const startBatQuest = useCallback(() => {
    startQuest("bat-quest");
  }, [startQuest]);

  const promptBatQuest = useCallback(() => {
    toast(
      "If the big guy finds out those bats are gone, I'm going to be in big trouble. Can you help me find them?",
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

  const caughtBat = useCallback((batId: string) => {
    // remove bat from wildBats
    setWildBats((prev) => prev.filter((b) => b.id !== batId));

    // update batsCaught counter
    setBatsCaught((prev) => {
      const newBatsCaught = prev + 1;
      return newBatsCaught;
    });
  }, []);

  useEffect(() => {
    updateQuestProgress("bat-quest", batsCaught);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [batsCaught]);

  return (
    <>
      {wildBats.length > 0 && (
        <div
          className={cn("fixed top-0 left-0 h-screen w-screen", {
            "cursor-none": activeInventoryItem?.name === "net",
          })}
        >
          {wildBats.map((bat) => (
            <WildBatPost
              key={bat.id}
              onCatch={() => caughtBat(bat.id)}
              className="pointer-events-auto absolute inline-block w-fit"
            />
          ))}
        </div>
      )}
      <section className="relative -z-10 my-20 h-fit w-full overflow-hidden pb-8">
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
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => setIsPaused(true)}
                onHoverEnd={() => setIsPaused(false)}
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
        "animate-rotate-15 flex items-center justify-center overflow-hidden align-top hover:animate-none",
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
