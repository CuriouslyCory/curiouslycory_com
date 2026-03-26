"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
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
  const [collapsed, setCollapsed] = useState(false);

  // Safely convert children to string
  let codeContent = "";
  if (Array.isArray(children)) {
    codeContent = children.join("").replace(/\n$/, "");
  } else if (children !== null && children !== undefined) {
    // Only stringify if children is not null or undefined
    codeContent = String(children).replace(/\n$/, "");
  }

  return (
    <div className="overflow-hidden rounded-md">
      {/* Terminal title bar */}
      <div className="flex items-center justify-between bg-zinc-800 px-4 py-2 rounded-t-md">
        <div className="flex items-center gap-1.5">
          <button
            aria-label="Collapse code block"
            onClick={() => setCollapsed(true)}
            className="h-2.5 w-2.5 rounded-full bg-red-500/60 hover:bg-red-500/90 transition-colors"
          />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          {language}
        </span>
      </div>

      {/* Code area with collapse animation */}
      <AnimatePresence initial={false}>
        {collapsed ? (
          <motion.button
            key="collapsed"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setCollapsed(false)}
            className="w-full bg-zinc-900 px-4 py-2 text-left font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {"// collapsed — click to expand"}
          </motion.button>
        ) : (
          <motion.div
            key="expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <button
              onClick={() => copyToClipboard(codeContent)}
              className="bg-background/80 text-muted-foreground hover:bg-background absolute top-2 right-2 rounded-md p-1 text-xs z-10"
              aria-label="Copy code"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
            <SyntaxHighlighter
              language={language}
              style={vscDarkPlus}
              customStyle={{ margin: 0, borderRadius: 0 }}
              codeTagProps={{ className: "break-all md:break-words" }}
              showLineNumbers={false}
              wrapLongLines={true}
            >
              {codeContent}
            </SyntaxHighlighter>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
