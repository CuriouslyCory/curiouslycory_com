import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";
import React from "react";
import { highlight } from "sugar-high";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  // const id = searchParams.get("id");

  // if (!id) {
  //   return new Response("Missing id parameter", { status: 400 });
  // }

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

  if (!sharedCode) {
    return new Response("Shared code not found", { status: 404 });
  }

  const highlightedCode = highlight(sharedCode);
  console.log(highlightedCode);
  const codeNode = React.createElement("div", null, highlightedCode);

  return new ImageResponse(
    (
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
              <code>{codeNode}</code>
            </pre>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
