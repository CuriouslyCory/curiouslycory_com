#!/usr/bin/env node
// Generate a blog cover image with Google's `gemini-3.1-flash-lite-image` model.
//
// This is intentionally dependency-free: it uses Node's built-in global `fetch`
// (Node 18+) and hits the Gemini `generateContent` REST endpoint directly, so it
// needs nothing added to package.json.
//
// Usage:
//   node .claude/skills/create-blog-post/scripts/generate-blog-image.mjs \
//     --slug my-new-post \
//     --prompt "A vibrant, editorial flat-illustration hero image about <topic>, ..."
//
// Common flags:
//   --slug     <slug>      Post slug; sets the default output to public/images/blog/<slug>.png
//   --prompt   <text>      The image prompt (required). Quote it.
//   --out      <path>      Explicit output path (overrides --slug default)
//   --aspect   <ratio>     Aspect ratio hint, e.g. 16:9 (default), 4:3, 1:1. Pass --aspect ""
//                          to omit it entirely if the model rejects imageConfig.
//   --model    <id>        Model id (default: gemini-3.1-flash-lite-image)
//
// The API key is read from GEMINI_API_KEY, falling back to GOOGLE_API_KEY. If neither
// is set in the environment, the script also reads them from a local .env file.

import { writeFileSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const next = argv[i + 1];
    // Support `--flag value` and `--flag=value`.
    if (key.includes("=")) {
      const [k, ...rest] = key.split("=");
      args[k] = rest.join("=");
    } else if (next !== undefined && !next.startsWith("--")) {
      args[key] = next;
      i++;
    } else {
      args[key] = "";
    }
  }
  return args;
}

// Minimal .env reader so a key stored in .env "just works" without dotenv.
function readEnvFileValue(name) {
  if (!existsSync(".env")) return undefined;
  const line = readFileSync(".env", "utf8")
    .split("\n")
    .find((l) => l.trim().startsWith(`${name}=`));
  if (!line) return undefined;
  let value = line.slice(line.indexOf("=") + 1).trim();
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }
  return value || undefined;
}

function resolveApiKey() {
  return (
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    readEnvFileValue("GEMINI_API_KEY") ||
    readEnvFileValue("GOOGLE_API_KEY")
  );
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  const prompt = args.prompt;
  if (!prompt) {
    console.error(
      "Error: --prompt is required.\n" +
        'Example: --prompt "An editorial flat-illustration hero image about ..."',
    );
    process.exit(1);
  }

  const slug = args.slug;
  if (!args.out && !slug) {
    console.error("Error: provide --slug or --out so the script knows where to save the image.");
    process.exit(1);
  }

  const model = args.model || "gemini-3.1-flash-lite-image";
  // `--aspect ""` explicitly omits imageConfig; otherwise default to a landscape cover.
  const aspect = "aspect" in args ? args.aspect : "16:9";

  const apiKey = resolveApiKey();
  if (!apiKey) {
    console.error(
      "Error: no API key found. Set GEMINI_API_KEY (or GOOGLE_API_KEY) in your\n" +
        "environment or in a local .env file. Get a key at https://aistudio.google.com/apikey",
    );
    process.exit(1);
  }

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseModalities: ["IMAGE"],
      ...(aspect ? { imageConfig: { aspectRatio: aspect } } : {}),
    },
  };

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  console.log(`Generating cover image with ${model} (aspect: ${aspect || "default"})...`);

  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error(`Network error calling Gemini: ${err.message}`);
    process.exit(1);
  }

  const text = await res.text();
  if (!res.ok) {
    console.error(`Gemini API returned ${res.status} ${res.statusText}:\n${text}`);
    if (aspect && text.includes("imageConfig")) {
      console.error("\nHint: this model may not accept imageConfig — retry with --aspect \"\".");
    }
    process.exit(1);
  }

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    console.error(`Could not parse Gemini response as JSON:\n${text.slice(0, 2000)}`);
    process.exit(1);
  }

  // Find the first inline image part across candidates.
  const parts = data?.candidates?.flatMap((c) => c?.content?.parts ?? []) ?? [];
  const imagePart = parts.find((p) => p?.inlineData?.data || p?.inline_data?.data);
  const inline = imagePart?.inlineData ?? imagePart?.inline_data;

  if (!inline?.data) {
    // Surface any text the model returned instead — usually a refusal or safety block.
    const textParts = parts.map((p) => p?.text).filter(Boolean).join("\n");
    console.error(
      "No image was returned by the model.\n" +
        (textParts ? `Model said:\n${textParts}\n` : "") +
        `\nRaw response (truncated):\n${text.slice(0, 2000)}`,
    );
    process.exit(1);
  }

  // Save with an extension that matches the bytes we actually got back. An explicit
  // --out wins; otherwise derive it from the returned MIME type so the coverImage
  // path never lies about the file's format (this lite model tends to return JPEG).
  const mimeExt = { "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp" };
  const ext = mimeExt[inline.mimeType] ?? "png";
  const out = args.out || `public/images/blog/${slug}.${ext}`;

  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, Buffer.from(inline.data, "base64"));

  const publicPath = out.replace(/^public/, "");
  console.log(`\n✓ Saved cover image to ${out}`);
  console.log(`  Set the post's coverImage (and OG image) to: ${publicPath}`);
}

main();
