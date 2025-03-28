"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ThemeModeToggle } from "./theme-mode-toggle";
import { CcLogo } from "~/ui/cc-logo";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Resume/CV", href: "/cv" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            <CcLogo />
          </Link>
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-primary-foreground hover:text-primary"
              >
                {item.name}
                {pathname === item.href && (
                  <motion.div
                    className="absolute inset-0 z-[-1] rounded-md bg-primary-foreground"
                    layoutId="navbar-active"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <ThemeModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
