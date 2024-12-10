"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion"; // Corrected the import
import { toast } from "sonner";
import { BatWings as BatWingSvg } from "~/components/bat-wings";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { cn } from "~/lib/utils";

export default function BlogPostBats() {
  const [isPaused, setIsPaused] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [endCount, setEndCount] = useState(0);
  const [positions, setPositions] = useState<Record<number, string | number>>({
    1: 0, // Start positions
    2: 0,
    3: 0,
  });

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const resetBats = () => {
    // Reset positions to starting points
    setPositions({
      1: 0,
      2: 0,
      3: 0,
    });
    // Reset end count
    setEndCount(0);
    // Force a re-render of the animations by removing and re-adding elements
    setIsPaused(true);
  };

  // Start the bats when the section is in view
  useEffect(() => {
    console.log(isInView);
    if (isInView) {
      setIsPaused(false);
    }
  }, [isInView]);

  useEffect(() => {
    if (endCount >= 3) {
      toast.error(
        "Erm... This is awkward but... Did you see where the bat posts went?",
        {
          action: {
            label: "Maybe?",
            onClick: resetBats,
          },
          cancel: {
            label: "Bat what now?",
            onClick: () => {
              // Do something
            },
          },
          duration: Infinity,
        },
      );
    }
  }, [endCount]);

  return (
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
