"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg text-lg grid grid-cols-6",
          content: "col-span-5 mb-2",
          title: "text-xl",
          description: "group-[.toast]:text-muted-foreground ",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground col-span-3 w-full font-semibold justify-center",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground col-span-3 w-full font-semibold justify-center",
          closeButton: "text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
