"use client";

import { AnimatePresence, motion } from "motion/react";
import { BatWings as BatWingSvg } from "~/components/bat-wings";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function BlogPostBats() {
  return (
    <section className="mb-20 mt-20 h-48 w-full overflow-hidden">
      <h2 className="mb-4 text-3xl font-bold">Latest Blog Posts</h2>

      <AnimatePresence>
        <motion.div
          className="absolute"
          initial={{ left: -100 }}
          animate={{ left: "100vw" }}
          transition={{ duration: 5 }}
        >
          <BatWings>
            <BlogPostCard
              title="Local Photo and File Storage With Nextcloud"
              description="Join me as I build a local photo and file storage solution with
            Nextcloud. Including fulltext search, deuping content, and
            remote backups to backblaze."
            />
          </BatWings>
        </motion.div>
        <motion.div
          className="absolute"
          initial={{ x: -200 }}
          animate={{ x: "100vw" }}
          transition={{ duration: 5, delay: 1 }}
        >
          <BatWings>
            <BlogPostCard
              title="Image Converter With NextJs and Vercel"
              description="I built a simple image converter with NextJs and Vercel. It allows you to upload an image and convert it to a different format."
            />
          </BatWings>
        </motion.div>
        <motion.div
          className="absolute"
          initial={{ x: -200 }}
          animate={{ x: "100vw" }}
          transition={{ duration: 5, delay: 2 }}
        >
          <BatWings>
            <BlogPostCard
              title="Hand Writing Practice Game Made With NextJs"
              description="I built a simple hand writing practice game with NextJs. It allows you to practice your handwriting with a variety of fonts and languages."
            />
          </BatWings>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function BatWings({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-rotate-15 flex items-center justify-center overflow-hidden align-top">
      <BatWingSvg className="relative left-1 -z-10 inline-block h-12" />
      {children}
      <BatWingSvg
        direction="right"
        className="relative -z-10 inline-block h-12"
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
