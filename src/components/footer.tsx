"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { CcLogo } from "~/components/ui/cc-logo";
import { SOCIALS } from "~/data/socials";
import { usePlayer } from "~/components/player/player-provider";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Resume/CV", href: "/cv" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
];

const tagline = "Curious about everything. Building what matters.";

function TypingTagline() {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      i++;
      setDisplayed(tagline.slice(0, i));
      if (i >= tagline.length) clearInterval(interval);
    }, 35);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <p
      ref={ref}
      className="text-muted-foreground mt-3 min-h-[1.25rem] text-sm"
      aria-label={tagline}
    >
      {displayed}
      {displayed.length < tagline.length && isInView && (
        <span className="animate-pulse">|</span>
      )}
    </p>
  );
}

function BottomBarRight() {
  return (
    <>
      <span className="font-mono text-xs opacity-60 dark:hidden">
        {"// end of transmission"}
      </span>
      <span className="hidden font-mono text-xs opacity-60 dark:inline">
        {"// signing off for the night"}
      </span>
    </>
  );
}

export function Footer() {
  const { addInventoryItem } = usePlayer();

  return (
    <footer className="bg-foreground text-background">
      <div className="via-primary h-px bg-gradient-to-r from-transparent to-transparent" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Column 1: Logo + tagline */}
          <div>
            <CcLogo />
            <TypingTagline />
          </div>

          {/* Column 2: Explore nav links */}
          <div>
            <h3 className="font-oswald text-muted-foreground text-sm font-semibold tracking-widest uppercase">
              Explore
            </h3>
            <ul className="mt-4 space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-primary text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Find Me social icons */}
          <div>
            <h3 className="font-oswald text-muted-foreground text-sm font-semibold tracking-widest uppercase">
              Find Me
            </h3>
            <ul className="mt-4 flex flex-wrap gap-4">
              {SOCIALS.map((social) => (
                <li key={social.url}>
                  <motion.a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.title}
                    className="hover:text-primary transition-colors"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-background/20 mt-10 flex flex-col items-center justify-between gap-2 border-t pt-6 sm:flex-row">
          <span className="text-sm opacity-80">
            &copy; {new Date().getFullYear()} CuriouslyCory
            <button
              onClick={() => addInventoryItem("telescope", 1)}
              className="ml-1 cursor-default opacity-[0.06] transition-opacity hover:opacity-20"
              aria-hidden="true"
              tabIndex={-1}
            >
              ✦
            </button>
          </span>
          <BottomBarRight />
        </div>
      </div>
    </footer>
  );
}
