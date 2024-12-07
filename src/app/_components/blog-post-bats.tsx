"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion"; // Corrected the import
import { toast } from "sonner";
import { BatWings as BatWingSvg } from "~/components/bat-wings";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function BlogPostBats() {
  const [isPaused, setIsPaused] = useState(true);
  const [endCount, setEndCount] = useState(0);
  const [positions, setPositions] = useState<Record<number, number>>({
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

  useEffect(() => {
    console.log(endCount);
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
    <section
      className="relative mb-20 mt-20 h-72 w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h2 className="mx-2 mb-4 text-3xl font-bold md:mx-6">Latest Posts</h2>

      <div className="flex w-full flex-nowrap justify-center">
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
                    [key]: latest.x as number, // Save the current position when animation is running
                  }));
                }
              }}
              onViewportLeave={() => setEndCount((prev) => prev + 1)}
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
  return (
    <div className="flex animate-rotate-15 items-center justify-center overflow-hidden align-top hover:animate-none">
      <BatWingSvg className="relative left-1 -z-10 inline-block h-12" />
      {children}
      <BatWingSvg
        direction="right"
        className="relative right-6 -z-10 inline-block h-12"
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
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}
