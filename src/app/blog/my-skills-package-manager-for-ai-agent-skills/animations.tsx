"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";

const fadeUpProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
} as const;

export function FadeUp({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      {...fadeUpProps}
      transition={{ ...fadeUpProps.transition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggeredGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggeredItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AgentChip({ name }: { name: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.85 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 25,
          },
        },
      }}
      whileHover={{
        scale: 1.08,
        boxShadow: "0 4px 20px rgba(249,115,22,0.15)",
      }}
      whileTap={{ scale: 0.97 }}
      className="bg-muted cursor-default rounded-lg p-3 text-center text-sm font-medium transition-colors hover:bg-orange-500/10"
    >
      {name}
    </motion.div>
  );
}

export function StepBadge({ step }: { step: number }) {
  return (
    <motion.span
      whileHover={{ scale: 1.15, rotate: -6 }}
      transition={{ type: "spring", stiffness: 500, damping: 20 }}
      className="bg-primary/10 text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold"
    >
      {step}
    </motion.span>
  );
}

export function TerminalBlock({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 overflow-hidden rounded-lg border border-zinc-700/50">
      <div className="flex items-center gap-1.5 bg-zinc-800 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 text-xs text-zinc-500">terminal</span>
      </div>
      <pre className="overflow-x-auto bg-zinc-900 p-4 text-sm text-zinc-100">
        <code>{children}</code>
      </pre>
    </div>
  );
}

export function Herobadges({ badges }: { badges: string[] }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
      className="mb-8 flex flex-wrap justify-center gap-2"
    >
      {badges.map((badge) => (
        <motion.span
          key={badge}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <span className="bg-secondary/10 text-secondary-foreground inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors">
            {badge}
          </span>
        </motion.span>
      ))}
    </motion.div>
  );
}

export function LiftCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
