import * as React from "react";
import { type SVGProps, memo } from "react";
import { cn } from "~/lib/utils";
const SvgComponent = (
  props: { hideWrapper?: boolean } & SVGProps<SVGSVGElement>,
) => {
  const { className, hideWrapper, ...rest } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="net"
      data-name="net"
      viewBox="0 0 258 258"
      className={cn("stroke-black", className)}
      {...rest}
    >
      <g id="net" style={{ strokeMiterlimit: 10 }}>
        <circle
          cx={129}
          cy={129}
          r={125.5}
          className={cn(hideWrapper && "hidden")}
          style={{
            strokeWidth: 7,
            stroke: "#fff",
            strokeMiterlimit: 10,
            fill: "#f7ffd4",
          }}
        />
        <ellipse
          cx={79.5}
          cy={82}
          className="fill-none stroke-black stroke-7"
          rx={27.5}
          ry={70}
          transform="rotate(-45 79.496 82.002)"
        />
        <path
          d="M128.5 131.5 217 220"
          className="fill-none stroke-black stroke-7"
        />
        <path
          d="M128.5 131.5c0 13.82-32.2 25-72 25"
          className="fill-none stroke-black"
        />
        <path d="M98.5 62.5c0 51.96-18.79 94-42 94" className="fill-none" />
        <path d="M63.5 35.5c0 66.88-3.13 121-7 121" className="fill-none" />
        <path
          d="M128.5 101.5c0 30.4-32.2 55-72 55M30.5 60.5c0 53.06 11.63 96 26 96"
          className="fill-none"
        />
        <path
          d="M117.5 85.5c0 39.24-27.28 71-61 71M39.5 28.5c0 70.75 7.6 128 17 128"
          className="fill-none"
        />
        <path
          d="M26.5 44.5c0 61.91 13.42 112 30 112M132.5 120.5c0 19.9-33.99 36-76 36"
          className="fill-none"
        />
        <path
          d="M26.5 44.5c1.62-1.39 3.85-2.98 6.73-4.24 6.9-3.02 13.31-2.3 16.27-1.76 4.04.87 9.8 2.54 16 6 6.1 3.4 9.7 6.91 15 12 23.28 22.39 21.32 19.87 25 24 9.26 10.39 14.11 15.84 18 25 .72 1.7 4.63 9.97 5 21 .27 8.21-1.61 10.78-3 12-2.7 2.38-6.51 2.23-9 2-14.93-1.39-28.62-10.11-30-11-11.44-7.43-20.1-13.05-31-24-13.62-13.69-26.31-26.45-29-46-.85-6.15-.48-11.39 0-15Z"
          className="fill-none"
        />
        <path
          d="M62.5 86.5c8.51 3.15 15.97 8.73 19 11 .01 0 .04.03.05.04 1.09.82 14.51 11.02 24.95 27.96 2.32 3.76 4.5 7.88 4 13-.13 1.32-.63 6.39-5 10-2.78 2.3-6.06 2.88-11 3-12.3.3-21.94-2.66-23-3-10.02-3.17-21.07-6.66-30-17-3.13-3.62-7.53-8.84-9-17-1.87-10.39 2.14-18.76 4-22 1.93-3.37 3.58-6.24 7-8 5.7-2.93 12.01-.59 19 2Z"
          className="fill-none"
        />
        <ellipse
          cx={185.57}
          cy={188.07}
          className="fill-none stroke-black stroke-7"
          rx={5.3}
          ry={57.76}
          transform="rotate(-45 185.569 188.065)"
        />
      </g>
    </svg>
  );
};

const Memo = memo(SvgComponent);
export { Memo as Net };
