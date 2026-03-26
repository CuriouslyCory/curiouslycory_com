"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Menu } from "lucide-react";
import { ThemeModeToggle } from "./theme-mode-toggle";
import { CcLogo } from "~/ui/cc-logo";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "~/components/ui/drawer";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Resume/CV", href: "/cv" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
];

export function Navigation() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isActive = (href: string) => {
    return (
      pathname === href || (href === "/blog" && pathname.startsWith("/blog"))
    );
  };

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  return (
    <nav className="bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            <CcLogo />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center space-x-4 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:bg-primary-foreground hover:text-primary relative rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeModeToggle />
            <Drawer
              direction="right"
              open={drawerOpen}
              onOpenChange={setDrawerOpen}
            >
              <DrawerTrigger asChild>
                <button
                  aria-label="Open navigation menu"
                  className="flex items-center justify-center rounded-md p-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </DrawerTrigger>
              <DrawerContent className="bg-foreground text-background p-6">
                <nav className="mt-8 flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex min-h-12 items-center pl-4 text-lg font-medium transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none rounded-md ${
                        isActive(item.href)
                          ? "border-l-2 border-primary text-primary"
                          : "border-l-2 border-transparent"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </nav>
  );
}
