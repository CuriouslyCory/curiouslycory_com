import clsx from "clsx";
import { ReactNode } from "react";

type CalendlyLinkProps = {
  children: ReactNode;
};

export const CalendlyLink = ({ children }: CalendlyLinkProps) => {
  const textLinkStyle = "text-blue-500 hover:text-blue-700 hover:underline";

  return (
    <a
      href="https://calendly.com/curiouslycory"
      target="_blank"
      rel="noreferrer"
      className={clsx({
        "text-blue-500 hover:text-blue-700 hover:underline":
          typeof children === "string",
      })}
    >
      {children}
    </a>
  );
};
