"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { ThemeModeToggle } from "./theme-mode-toggle";
import { CcLogo } from "~/ui/cc-logo";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Resume/CV", href: "/cv" },
  { name: "Blog", href: "/blog" },
];

export function Navigation() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return (
      pathname === href || (href === "/blog" && pathname.startsWith("/blog"))
    );
  };

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
                className="hover:bg-primary-foreground hover:text-primary relative rounded-md px-0 py-2 text-sm font-medium transition-colors md:px-3"
              >
                {item.name}
                {isActive(item.href) && (
                  <motion.div
                    className="h-1 w-full bg-orange-500"
                    layoutId="navbar-active"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
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
