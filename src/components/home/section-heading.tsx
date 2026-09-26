import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "~/lib/utils";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  /** Optional "see everything" link aligned to the right of the heading */
  action?: { label: string; href: string };
  className?: string;
};

export function SectionHeading({
  title,
  subtitle,
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-end justify-between gap-4",
        className,
      )}
    >
      <div>
        <h2 className="font-oswald text-[clamp(30px,3vw,36px)] leading-[1.1] font-semibold tracking-tight">
          {title}
        </h2>
        <div className="heading-accent" />
        {subtitle && (
          <p className="text-muted-foreground mt-4 text-lg">{subtitle}</p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="group flex items-center gap-1.5 text-[15px] font-semibold"
        >
          {action.label}
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      )}
    </div>
  );
}
