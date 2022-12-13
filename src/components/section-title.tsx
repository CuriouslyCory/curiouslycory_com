import clsx from "clsx";
import { ReactNode } from "react";

type SectionTitleProps = {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
};

export const SectionTitle = ({
  children,
  size = "6xl",
}: SectionTitleProps): JSX.Element => {
  return (
    <h2 className={clsx("mb-10 hl-underline", `text-${size}`)}>{children}</h2>
  );
};
