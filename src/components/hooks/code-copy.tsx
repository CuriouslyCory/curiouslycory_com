import { useState } from "react";

// Helper function for copying code to clipboard
export function useCodeCopy() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    void navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return { copied, copyToClipboard };
}
