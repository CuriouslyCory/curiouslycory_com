"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { ScrollText } from "lucide-react";
import { SOCIALS } from "~/data/socials";
import { motion } from "motion/react";

export const MyLinks = (): ReactNode => {
  return (
    <div className="bg-foreground text-background dark:text-foreground w-full pt-8 pb-10 dark:bg-gray-100/10">
      <div className="container mx-2 flex flex-col gap-y-4 md:mx-auto">
        <h2 className="mb-2 text-center text-3xl font-bold">My Links</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-6 lg:grid-cols-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link href="/cv">
              <div className="flex flex-col items-center gap-2 transition-all hover:scale-105 hover:text-orange-500">
                <ScrollText className="h-12 w-12" />
                <span>Resume/CV</span>
              </div>
            </Link>
          </motion.div>
          {SOCIALS.map((link, index) => (
            <motion.div
              key={link.url}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={link.url} target="top">
                <div className="flex flex-col items-center gap-2 transition-colors hover:scale-105 hover:text-orange-500">
                  <link.icon className="h-12 w-12" />
                  <span className="text-center">{link.title}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
