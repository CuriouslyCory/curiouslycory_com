"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  type HTMLMotionProps,
  motion,
  useInView,
} from "framer-motion"; // Corrected the import
import { toast } from "sonner";
import { BatWings as BatWingSvg } from "~/components/bat-wings";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { usePlayer } from "./player/player-provider";
import useWindowSize from "~/hooks/use-window-size";

export default function BlogPostBats() {
  const windowSize = useWindowSize();
  const [isPaused, setIsPaused] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 1 });
  const [endCount, setEndCount] = useState(0);
  const [positions, setPositions] = useState<Record<number, string | number>>({
    1: 0, // Start positions
    2: 0,
    3: 0,
  });

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Once in view, trigger the bats after 1 second
  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        setIsPaused(false);
      }, 1000);
    }
  }, [isInView]);

  const { startQuest, quests, addInventoryItem, inventory } = usePlayer();
  const batQuest = quests.find((quest) => quest.id === "bat-quest");

  // Add a useEffect to watch the quest progress
  // Refactored BlogPostBats Component
  useEffect(() => {
    console.log("batQuest", batQuest);
    const updateProgress = (progress: number) => {
      if (progress === 0) {
        addInventoryItem("net", 1);
      } else if (progress === 100) {
        toast.success("You found all the bats!");
      } else if (progress > 0) {
        toast.info(`Found ${progress}% of the bats!`);
      }
    };

    if (batQuest?.progress !== undefined) {
      updateProgress(batQuest.progress);
    }
  }, [batQuest?.progress]);

  const startBatQuest = useCallback(() => {
    startQuest({
      id: "bat-quest",
      progress: 0,
    });
  }, [startQuest]);

  const promptBatQuest = useCallback(() => {
    toast(
      "... If my boss finds out those bats are gone, I'm going to be in big trouble. Can you help me find them?",
      {
        action: {
          label: "Sure, I'll help you.",
          onClick: startBatQuest,
        },
        cancel: {
          label: "Get Lost.",
          onClick: () => {
            // Do something
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

  const activeInventoryItem = useMemo(
    () => inventory.find((item) => item.active),
    [inventory],
  );

  const [wildBats, setWildBats] = useState<{ id: string }[]>([]);
  useEffect(() => {
    if (activeInventoryItem?.name === "net" && wildBats.length < 4) {
      const batTick = setInterval(() => {
        setWildBats((prev) => [...prev, { id: Math.random().toString() }]);
      }, 1000);
      return () => clearInterval(batTick);
    }
  }, [activeInventoryItem, wildBats.length]);

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
            onClick={() =>
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
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
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

const WildBatPost = (props: HTMLMotionProps<"div">) => {
  const randomKey = Math.floor(Math.random() * 3) + 1;
  const windowSize = useWindowSize();

  const [position, setPosition] = useState(() => {
    if (!windowSize.width || !windowSize.height) return;
    // Pick random edge to start from
    const edge = Math.floor(Math.random() * 4);
    switch (edge) {
      case 0: // Top
        return { x: Math.random() * windowSize.width, y: -200 };
      case 1: // Right
        return {
          x: windowSize.width + 200,
          y: Math.random() * windowSize.height,
        };
      case 2: // Bottom
        return {
          x: Math.random() * windowSize.width,
          y: windowSize.height + 200,
        };
      default: // Left
        return { x: -200, y: Math.random() * windowSize.height };
    }
  });

  const getNextPosition = useCallback(() => {
    if (!position || !windowSize.width || !windowSize.height) return;
    // Pick a random point on a different edge
    const currentEdge =
      position.x <= 0
        ? 3 // Left
        : position.x >= windowSize.width
          ? 1 // Right
          : position.y <= 0
            ? 0 // Top
            : 2; // Bottom

    let nextEdge;
    do {
      nextEdge = Math.floor(Math.random() * 4);
    } while (nextEdge === currentEdge);

    switch (nextEdge) {
      case 0: // Top
        return { x: Math.random() * windowSize.width, y: -200 };
      case 1: // Right
        return {
          x: windowSize.width + 200,
          y: Math.random() * windowSize.height,
        };
      case 2: // Bottom
        return {
          x: Math.random() * windowSize.width,
          y: windowSize.height + 200,
        };
      default: // Left
        return { x: -200, y: Math.random() * windowSize.height };
    }
  }, [position, windowSize]);

  return (
    <motion.div
      animate={position}
      initial={position}
      transition={{
        duration: 2,
        ease: "linear",
      }}
      onAnimationComplete={() => {
        setPosition(getNextPosition());
      }}
      {...props}
    >
      <BatWings>
        <BlogPostCard
          title={getBlogPostData(randomKey).title}
          description={getBlogPostData(randomKey).description}
        />
      </BatWings>
    </motion.div>
  );
};

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
