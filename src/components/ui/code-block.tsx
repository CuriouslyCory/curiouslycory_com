"use client";

import { Check, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useCodeCopy } from "../hooks/code-copy";

// Define the props type for our code component
interface CodeBlockProps {
  children: string;
  language: string;
}

// Create a wrapper component to use the hook properly
export function CodeBlock({ children, language }: CodeBlockProps) {
  const { copied, copyToClipboard } = useCodeCopy();

  // Safely convert children to string
  let codeContent = "";
  if (Array.isArray(children)) {
    codeContent = children.join("").replace(/\n$/, "");
  } else if (children !== null && children !== undefined) {
    // Only stringify if children is not null or undefined
    codeContent = String(children).replace(/\n$/, "");
  }

  return (
    <div className="relative">
      <button
        onClick={() => copyToClipboard(codeContent)}
        className="bg-background/80 text-muted-foreground hover:bg-background absolute top-2 right-2 rounded-md p-1 text-xs"
        aria-label="Copy code"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{ margin: 0, borderRadius: "0.375rem" }}
        codeTagProps={{ className: "rounded-md break-all md:break-words" }}
        showLineNumbers={false}
        wrapLongLines={true}
      >
        {codeContent}
      </SyntaxHighlighter>
    </div>
  );
}
