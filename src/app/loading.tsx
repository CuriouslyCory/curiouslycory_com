import { type ReactNode } from "react";

export default function Loading(): ReactNode {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-gray-900 dark:border-white"></div>
    </div>
  );
}
