import { ReactNode } from "react";

type WindowBoxProps = {
  children: ReactNode;
};
export const WindowBox = ({ children }: WindowBoxProps): JSX.Element => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-center bg-slate-700 p-10 bg-opacity-10 shadow-md">
      {children}
    </div>
  );
};
