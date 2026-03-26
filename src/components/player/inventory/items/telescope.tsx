import * as React from "react";
import { type SVGProps, memo } from "react";
import { cn } from "~/lib/utils";

const TelescopeIcon = (props: SVGProps<SVGSVGElement>) => {
  const { className, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className={cn("h-10 w-10", className)}
      fill="currentColor"
      {...rest}
    >
      {/* Objective lens */}
      <circle
        cx="13"
        cy="24"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      {/* Main tube (trapezoid) */}
      <path d="M21 19 L52 27 L52 33 L21 29 Z" />
      {/* Eyepiece */}
      <rect x="50" y="25" width="11" height="7" rx="2" />
      {/* Tripod legs */}
      <line
        x1="36"
        y1="36"
        x2="27"
        y2="54"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <line
        x1="36"
        y1="36"
        x2="45"
        y2="54"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <line
        x1="36"
        y1="36"
        x2="36"
        y2="54"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      {/* Tripod base */}
      <line
        x1="24"
        y1="54"
        x2="48"
        y2="54"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
};

export const Telescope = memo(TelescopeIcon);

export function TelescopeAsset() {
  return (
    <div
      className="h-24 w-24 rounded-full border border-primary/40"
      style={{
        background:
          "radial-gradient(circle at center, rgba(249,115,22,0.12) 0%, rgba(249,115,22,0.04) 40%, transparent 70%)",
        boxShadow:
          "0 0 0 1px rgba(249,115,22,0.15), 0 0 20px rgba(249,115,22,0.08)",
      }}
    />
  );
}
