import React from "react";
import { highlight } from "sugar-high";

export function CodeComponent(): JSX.Element {
  const sharedCode = `
  import { ImageResponse } from "next/og";

  export const runtime = "edge";

  export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    return new ImageResponse(
        <div>Hello</div>
    );
  }
`;

  const highlightedCode = highlight(sharedCode);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1f2937",
        padding: 40,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <h1
          style={{
            fontSize: 60,
            fontWeight: 800,
            color: "#f3f4f6",
            marginBottom: 20,
          }}
        >
          Shared Code
        </h1>
        <div
          style={{
            fontSize: 30,
            color: "#d1d5db",
            marginBottom: 20,
            display: "flex",
          }}
        >
          Language: {"Typescript"}
        </div>
        <div>
          <pre>
            <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
          </pre>
        </div>
      </div>
    </div>
  );
}
