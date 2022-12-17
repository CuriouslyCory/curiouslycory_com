import clsx from "clsx";
import { ReactNode } from "react";

type WindowBoxProps = {
  children: ReactNode;
  padding?: string;
};
export const WindowBox = ({
  padding,
  children,
}: WindowBoxProps): JSX.Element => {
  return (
    <div
      className={clsx(
        "w-full h-full flex flex-col justify-center items-center text-center bg-slate-700 bg-opacity-10 shadow-md",
        padding ?? " p-10"
      )}
    >
      {children}
    </div>
  );
};
