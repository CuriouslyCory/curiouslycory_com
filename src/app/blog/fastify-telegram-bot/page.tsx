import Image from "next/image";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { CodeBlock } from "~/components/ui/code-block";
import { Separator } from "~/components/ui/separator";
import {
  Bot,
  Boxes,
  Wrench,
  Database,
  Send,
  Radio,
  Server,
  Workflow,
  Cpu,
  MessageSquareReply,
  ExternalLink,
  ArrowRight,
  Info,
  type LucideIcon,
} from "lucide-react";

/*
---bm
title: "A Fork-and-Go Telegram Bot with LangGraph + MCP"
excerpt: "An open-source starter that drops a tool-using LangGraph agent into Telegram — Fastify for lifecycle, Postgres for memory, MCP for reach. What it is, how it works, and how to run your own."
coverImage: /images/blog/fastify-telegram-bot.png
publishedAt: 2025-04-02
featured: false
published: true
tags: fastify,telegram,langgraph,mcp,llm,gemini,typescript,agent
---
*/

export const metadata = {
  title: "A Fork-and-Go Telegram Bot with LangGraph + MCP",
  description:
    "An open-source starter that drops a tool-using LangGraph agent into Telegram — Fastify for lifecycle, Postgres for memory, MCP for reach. What it is, how it works, and how to run your own.",
  openGraph: {
    images: [
      {
        url: "/images/blog/fastify-telegram-bot.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "A Fork-and-Go Telegram Bot with LangGraph + MCP",
    description:
      "An open-source starter that drops a tool-using LangGraph agent into Telegram — Fastify for lifecycle, Postgres for memory, MCP for reach.",
    images: ["/images/blog/fastify-telegram-bot.png"],
  },
};

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: Bot,
    title: "LangGraph ReAct agent",
    description:
      "A prebuilt reason-and-act loop that decides when to answer directly and when to reach for a tool.",
  },
  {
    icon: Boxes,
    title: "Swappable models",
    description:
      "Gemini by default, but the model is one line to change — including a fully local Ollama setup.",
  },
  {
    icon: Wrench,
    title: "MCP + local tools",
    description:
      "Register in-process TypeScript tools and connect any MCP server, side by side, through one interface.",
  },
  {
    icon: Database,
    title: "Persistent memory",
    description:
      "A Postgres checkpointer keeps conversation state per thread, so context survives restarts.",
  },
  {
    icon: Send,
    title: "Resilient delivery",
    description:
      "Telegraf handles long-polling, with automatic message chunking and retry on flaky sends.",
  },
];

function FeatureGrid() {
  return (
    <div className="my-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {features.map(({ icon: Icon, title, description }) => (
        <div
          key={title}
          className="bg-card hover:border-foreground/20 rounded-xl border p-5 shadow-xs transition-colors"
        >
          <div className="bg-muted text-foreground mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <h3 className="mb-1 font-semibold">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>
      ))}
    </div>
  );
}

type Step = {
  icon: LucideIcon;
  title: string;
  detail: string;
};

const steps: Step[] = [
  {
    icon: Radio,
    title: "Telegram → long-poll",
    detail:
      "Telegraf pulls updates via long-polling. No webhook, no public URL to expose.",
  },
  {
    icon: Server,
    title: "TelegramService",
    detail:
      "A singleton service receives the update. Fastify is only the lifecycle host here — it isn’t in the message path.",
  },
  {
    icon: Workflow,
    title: "handleTelegramMessage",
    detail:
      "The handler wraps your text with injected context and resolves the per-thread state before invoking the agent.",
  },
  {
    icon: Cpu,
    title: "LangGraph ReAct agent",
    detail:
      "createReactAgent runs the reason/act loop with its tools and a Postgres checkpointer for memory.",
  },
  {
    icon: MessageSquareReply,
    title: "Chunked, retried reply",
    detail:
      "The response is HTML-formatted, split to fit Telegram’s 4096-char limit, and sent with retry on transient failures.",
  },
];

function MessageFlow() {
  return (
    <div className="my-12">
      <ol className="before:bg-border relative space-y-8 before:absolute before:top-2 before:bottom-2 before:left-5 before:w-px">
        {steps.map(({ icon: Icon, title, detail }, i) => (
          <li key={title} className="relative flex gap-4">
            <div className="bg-card text-foreground relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="pt-1">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground font-mono text-xs">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-semibold">{title}</h3>
              </div>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                {detail}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

type ChatLine = { from: "user" | "bot"; text: string };

const exchange: ChatLine[] = [
  { from: "user", text: "what’s the weather in Lisbon right now?" },
  {
    from: "bot",
    text: "Let me check. Lisbon is 24°C and clear — light breeze off the Tagus. Good evening for a walk. 🌤️",
  },
  { from: "user", text: "search for the best pastéis de nata in the city" },
  {
    from: "bot",
    text: "On it — pulling a few well-reviewed spots now and I’ll send the shortlist over.",
  },
];

function TelegramExchange() {
  return (
    <div className="bg-muted/40 my-12 space-y-3 rounded-xl border p-4 sm:p-6">
      {exchange.map((line, i) => (
        <div
          key={i}
          className={line.from === "user" ? "flex justify-end" : "flex justify-start"}
        >
          <div
            className={
              line.from === "user"
                ? "bg-primary text-primary-foreground max-w-[80%] rounded-2xl rounded-br-sm px-4 py-2 text-sm"
                : "bg-card text-foreground max-w-[80%] rounded-2xl rounded-bl-sm border px-4 py-2 text-sm"
            }
          >
            {line.text}
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function FastifyTelegramBot() {
  return (
    <article className="mx-auto max-w-4xl px-4">
      {/* Hero */}
      <div className="mb-12 text-center">
        <h1 className="animate-fade-in from-primary to-secondary mb-6 bg-gradient-to-r bg-clip-text font-serif text-5xl font-bold text-transparent">
          A Fork-and-Go Telegram Bot
        </h1>
        <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl">
          An open-source starter that drops a tool-using LangGraph agent into
          Telegram — Fastify for lifecycle, Postgres for memory, MCP for reach.
          Clone it, point it at a token, and you have a real assistant.
        </p>
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <Badge variant="secondary">Telegram</Badge>
          <Badge variant="secondary">LangGraph</Badge>
          <Badge variant="secondary">MCP</Badge>
          <Badge variant="secondary">Fastify</Badge>
          <Badge variant="secondary">Postgres</Badge>
        </div>
      </div>

      <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-xl">
        <Image
          src="/images/blog/fastify-telegram-bot.png"
          alt="A Telegram message flowing into a LangGraph agent that calls tools and replies"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="lead">
          I keep coming back to the same idea: a chat interface is the
          lowest-friction way to talk to an LLM agent. You already have Telegram
          on your phone. You already know how to send a message. So why build a
          whole web app when you could just… text your bot?
        </p>

        <p>
          This is that bot, cleaned up into something you can actually fork.
          It’s a Telegram bot backed by a LangGraph agent that can call tools,
          remember your conversation, and run on whatever model you point it at
          — Gemini out of the box, or a local model on your own machine if you’d
          rather not send anything to the cloud.
        </p>

        <p>
          I want to be clear about what this is: it’s a <strong>starting
          point</strong>, not a product. It’s the boring, load-bearing 80% — the
          message plumbing, the agent wiring, the memory layer, the tool loading
          — so you can spend your time on the 20% that’s actually yours. Fork it,
          swap the prompt, plug in your tools, ship your own thing.
        </p>

        <p>
          Repo:{" "}
          <a
            href="https://github.com/CuriouslyCory/fastify-telegram-bot"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/CuriouslyCory/fastify-telegram-bot
          </a>{" "}
          (ISC licensed — do what you want with it).
        </p>
      </div>

      <TelegramExchange />

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h2>What you get out of the box</h2>
        <p>
          None of this is glamorous, and that’s the point — it’s the wiring you’d
          otherwise rebuild from scratch every time.
        </p>
      </div>

      <FeatureGrid />

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h2>How it works</h2>
        <p>
          <strong>
            Fastify is here as the process host, not as a web server for
            Telegram.
          </strong>{" "}
          There are no webhook endpoints. The Telegram path does not go through
          HTTP routes at all. Fastify handles app lifecycle — plugins, startup,
          graceful shutdown — and gives me a clean <code>onReady</code> hook to
          launch the bot. The bot itself talks to Telegram over{" "}
          <strong>long-polling</strong>.
        </p>
        <p>Here’s the path a message takes:</p>
      </div>

      <MessageFlow />

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>
          One small nicety along the way: the bot replies{" "}
          <em>“Processing your request…”</em> the instant a message lands so you
          know it’s alive — and if the agent’s entire reply is just{" "}
          <code>&quot;okay&quot;</code>, the bot stays quiet instead of spamming
          you. Documents get politely rejected for now: send a PDF and you’ll get
          “Documents not supported at this time.”
        </p>

        <h2>The agent core</h2>
        <p>
          The heart of the project is one call to LangGraph’s{" "}
          <code>createReactAgent</code>. This is a genuine agent runtime — it
          manages the reason-act-observe loop, tool invocation, and state — so
          I’m not hand-rolling any of that.
        </p>

        <CodeBlock language="typescript">
          {`// src/agents/telegram-agent.ts (trimmed)
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { SystemMessage } from "@langchain/core/messages";
import { MultiServerMCPClient } from "@langchain/mcp-adapters";

// Load MCP tools from config at startup
const client = MultiServerMCPClient.fromConfigFile("./src/constants/mcp.json");
await client.initializeConnections();
const mcpTools = client.getTools();

const agent = createReactAgent({
  llm: models.geminiToolsModel, // gemini-2.0-flash-exp, temperature 0
  tools: [...mathTools, stringLengthTool, ...mcpTools],
  stateModifier: new SystemMessage(systemPrompt),
  checkpointSaver: pgCheckpointSaver, // Postgres-backed memory
});`}
        </CodeBlock>

        <p>
          <strong>The model</strong> defaults to{" "}
          <code>geminiToolsModel</code> — <code>ChatGoogleGenerativeAI</code>{" "}
          running <code>gemini-2.0-flash-exp</code> at temperature 0. Swapping it
          means pointing at a different entry in the <code>models</code> map
          (more on that in “Make it yours”).
        </p>
        <p>
          <strong>The system prompt</strong> comes from a JSON file, so you can
          rewrite your bot’s personality without touching code.
        </p>
        <p>
          <strong>The context injection</strong> is the part I’m quietest-proud
          of. Before each message reaches the agent, I wrap it so the model
          always knows <em>when</em> it’s operating and <em>who</em> it’s talking
          to:
        </p>

        <CodeBlock language="text">
          {`<Context>
- The current date and time is July 23, 2026, 2:02:11 PM
- Chat ID: 123456789
- User ID: 987654321
</Context>
<UserMessage>what's the weather in Denver?</UserMessage>`}
        </CodeBlock>

        <p>
          That framing keeps the model from hallucinating the date and gives
          tools the IDs they need to act.
        </p>

        <h2>Tools: local + MCP</h2>
        <p>
          There are two ways to give the agent capabilities, and the split
          matters.
        </p>
        <p>
          <strong>Local tools</strong> live in <code>src/tools/</code> and are
          just TypeScript functions with a Zod schema. Here’s the addition tool,
          in full — this is the whole pattern:
        </p>

        <CodeBlock language="typescript">
          {`// src/tools/math.ts
import { tool } from "@langchain/core/tools";
import { z } from "zod";

export const additionTool = tool(
  async ({ numbers }) => numbers.reduce((a, b) => a + b, 0),
  {
    name: "addition_tool",
    description: "Add two or more numbers",
    schema: z.object({
      numbers: z
        .array(z.number())
        .describe("Array of numbers to add together"),
    }),
  }
);`}
        </CodeBlock>

        <p>
          Write the function, describe it well (the description is what the model
          reads to decide when to call it), export it, add it to the tools array.
          That’s a new capability.
        </p>
        <p>
          <strong>MCP tools</strong> come from external{" "}
          <a
            href="https://modelcontextprotocol.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            Model Context Protocol
          </a>{" "}
          servers, loaded at startup from a config file. No code required — just
          an entry:
        </p>

        <CodeBlock language="json">
          {`// src/constants/mcp.json
{
  "mcpServers": {
    "weather": {
      "command": "npx",
      "args": ["-y", "@smithery/cli@latest", "run", "@turkyden/weather", "--config", "{}"]
    },
    "duckduckgo-mcp-server": {
      "command": "npx",
      "args": [
        "-y", "@smithery/cli@latest", "run",
        "@nickclyde/duckduckgo-mcp-server",
        "--key", "\${SMITHERY_API_KEY}"
      ]
    }
  }
}`}
        </CodeBlock>

        <p>
          At boot, <code>MultiServerMCPClient.fromConfigFile(...)</code> reads
          this file, spins up each server, and merges their tools into the agent
          alongside the local ones.{" "}
          <strong>
            Adding a search engine, a database, a calendar — it’s a config entry
            and a restart.
          </strong>{" "}
          That’s the whole point of the two-tier design: trivial stuff is a local
          function, big integrations are somebody else’s MCP server.
        </p>

        <h2>Memory</h2>
        <p>
          Conversation memory is handled by LangGraph’s{" "}
          <strong>Postgres checkpointer</strong>, not by an ORM and not by
          anything I hand-wrote.
        </p>

        <CodeBlock language="typescript">
          {`// src/agents/checkpointer.ts (trimmed)
import { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const checkpointer = new PostgresSaver(pool);
await checkpointer.setup(); // creates its own tables on first run`}
        </CodeBlock>

        <p>
          Here’s the model to hold in your head: LangGraph persists the full
          agent state — message history, intermediate steps — against a{" "}
          <strong>
            <code>thread_id</code>
          </strong>
          . Every time the agent runs with the same <code>thread_id</code>, it
          resumes that thread’s state from Postgres. Different thread, clean
          slate. Because it’s backed by Postgres and not process memory,
          restarting the bot doesn’t wipe anything.
        </p>
        <p>
          (There’s a wrinkle in exactly <em>how</em> the thread_id is composed —
          I’ll be straight about it in the rough-edges section below.)
        </p>

        <h2>Set up your own</h2>
        <p>Roughly ten minutes, most of it spent collecting API keys.</p>

        <p>
          <strong>1. Create your Telegram bot.</strong> Message{" "}
          <a
            href="https://t.me/BotFather"
            target="_blank"
            rel="noopener noreferrer"
          >
            @BotFather
          </a>
          , send <code>/newbot</code>, follow the prompts, and copy the token it
          hands back.
        </p>

        <p>
          <strong>2. Clone and install.</strong>
        </p>
        <CodeBlock language="bash">
          {`git clone https://github.com/CuriouslyCory/fastify-telegram-bot.git
cd fastify-telegram-bot
pnpm install`}
        </CodeBlock>

        <p>
          <strong>3. Fill in your environment.</strong>
        </p>
        <CodeBlock language="bash">{`cp .env.example .env`}</CodeBlock>
        <p>You need four things:</p>
        <ul>
          <li>
            <code>TELEGRAM_BOT_TOKEN</code> — from BotFather above.
          </li>
          <li>
            <code>GEMINI_API_KEY</code> — free from{" "}
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google AI Studio
            </a>
            .
          </li>
          <li>
            <code>DATABASE_URL</code> — any Postgres.{" "}
            <a href="https://neon.tech" target="_blank" rel="noopener noreferrer">
              Neon
            </a>{" "}
            or{" "}
            <a
              href="https://supabase.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Supabase
            </a>{" "}
            free tiers work great.
          </li>
          <li>
            <code>PORT</code> — anything free, e.g. <code>3000</code>.
          </li>
        </ul>
        <p>
          Optional: LangSmith tracing vars, and a <code>SMITHERY_API_KEY</code>{" "}
          from{" "}
          <a href="https://smithery.ai" target="_blank" rel="noopener noreferrer">
            smithery.ai
          </a>{" "}
          if you want the search / sequential-thinking MCP servers.
        </p>

        <blockquote>
          <p>
            <strong>Heads up on the Smithery key.</strong> There’s a known bug:{" "}
            <code>{"${SMITHERY_API_KEY}"}</code> doesn’t currently get injected
            into the MCP server config from your <code>.env</code>. Until that’s
            fixed, paste the key <strong>directly into <code>mcp.json</code></strong>{" "}
            where the <code>--key</code> argument is. If your search tool silently
            isn’t working, this is why.
          </p>
        </blockquote>

        <p>
          <strong>4. Set up the database.</strong>
        </p>
        <CodeBlock language="bash">
          {`pnpm db:generate
pnpm db:push`}
        </CodeBlock>
        <p>
          The LangGraph checkpointer also creates its own tables on first run via{" "}
          <code>setup()</code>, so you don’t need to do anything extra for chat
          memory.
        </p>

        <p>
          <strong>5. Run it.</strong>
        </p>
        <CodeBlock language="bash">{`pnpm dev`}</CodeBlock>
        <p>
          That runs <code>tsx watch src/index.ts</code>. Open Telegram, message
          your bot, and you should get a reply. Other scripts worth knowing:{" "}
          <code>pnpm start</code> (production), <code>pnpm db:studio</code>{" "}
          (browse the DB), <code>pnpm test</code> (vitest), <code>pnpm lint</code>
          , <code>pnpm format</code>.
        </p>

        <h2>Make it yours</h2>
        <p>
          This is where forking pays off. Three levers, from easiest to most
          involved.
        </p>
        <p>
          <strong>Change its personality.</strong> Open{" "}
          <code>src/constants/agent-prompts.json</code> and edit{" "}
          <code>telegram.system_prompt</code> — it’s a string array joined with
          newlines. The default is a plain, helpful assistant capped at 4000
          characters. Rewrite it into a terse ops bot, a cheerful concierge,
          whatever fits.
        </p>

        <CodeBlock language="json">
          {`// src/constants/agent-prompts.json
{
  "telegram": {
    "system_prompt": [
      "You are a friendly weather assistant.",
      "Always use the weather tool when asked about conditions.",
      "Format temperature in both Celsius and Fahrenheit.",
      "Limit your message responses to 4000 characters."
    ]
  }
}`}
        </CodeBlock>

        <p>
          <strong>Add capabilities.</strong> New MCP server? Add an entry to{" "}
          <code>mcp.json</code> and restart. Something bespoke? Write a local{" "}
          <code>tool()</code> in <code>src/tools/</code> (see the addition
          example above) and add it to the agent’s tools array.
        </p>
        <p>
          <strong>Swap the model.</strong> The <code>models</code> object in{" "}
          <code>src/utils/ai-models.ts</code> already defines a Gemini reasoning
          model and two local Ollama models (<code>deepseek-r1:14b</code>,{" "}
          <code>openthinker</code>) alongside the default. Point the agent at a
          different one to change engines. If you want to run{" "}
          <strong>fully local</strong> — no API keys, nothing leaving your machine
          — switch to an Ollama model and pull it locally. Same agent, same
          tools, private inference.
        </p>
      </div>

      {/* One honest note */}
      <aside className="bg-muted/40 my-12 rounded-xl border p-6 sm:p-8">
        <div className="mb-4 flex items-center gap-2">
          <Info className="text-muted-foreground h-5 w-5" aria-hidden="true" />
          <h2 className="m-0 text-2xl font-bold">
            Known rough edges / what’s next
          </h2>
        </div>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>
            I said this is a starting point, so here’s the honest list of things
            I’d fix before calling it finished. None of it is a dealbreaker; all
            of it is worth knowing before you build on top.
          </p>
          <p>
            <strong>Memory resets daily — and it’s a quirk, not a feature.</strong>{" "}
            The checkpointer’s <code>thread_id</code> is{" "}
            <code>{"${userId}-${YYYYMMDD}"}</code> — user ID plus today’s date.
            That means every day, each user gets a brand-new thread, and
            yesterday’s context is gone. It happened to work out as a natural
            “fresh start each morning,” but let’s be clear: it’s an accident of
            how I built the key, not a deliberate design decision. If you want
            continuous long-term memory, drop the date from the thread_id. If you{" "}
            <em>like</em> the daily reset, keep it. Either way, know that it’s a
            choice you should make on purpose.
          </p>
          <p>
            <strong>There’s a vestigial NextAuth scaffold.</strong>{" "}
            <code>prisma/schema.prisma</code> still carries Account / Session /
            User / VerificationToken tables from the T3-style template this
            started as. <strong>None of it stores chat history</strong> — that’s
            all the LangGraph checkpointer. The Prisma models are just dead weight
            right now. Leave them if you plan to add web auth later; delete them
            if you want a leaner repo.
          </p>
          <p>
            <strong>The Smithery key injection bug</strong> (covered in setup):{" "}
            <code>{"${SMITHERY_API_KEY}"}</code> doesn’t flow from{" "}
            <code>.env</code> into the MCP config yet, so you paste it into{" "}
            <code>mcp.json</code> by hand. This is downstream of LangChain
            shifting their MCP API around while I built this — worth revisiting
            once that settles.
          </p>
          <p>
            <strong>Long-polling is fine until it isn’t.</strong> For a personal
            bot or a single deployment, <code>bot.launch()</code> polling is
            simple and works great. If you’re scaling to many bots or high volume,
            you’d want to move to webhooks — which, notably, is where Fastify
            would finally earn its keep as an actual HTTP server. Right now it’s
            just the lifecycle host.
          </p>
        </div>
      </aside>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h2>Fork it and go</h2>
        <p>
          That’s the whole thing: Fastify hosting the process, Telegraf handling
          the chat, a LangGraph ReAct agent doing the thinking, Postgres
          remembering, and a tool layer you can extend without touching the core.
        </p>
        <p>
          I built it to be forked. If you’ve been meaning to make a little agent
          you can text — a research assistant, a home-automation controller, a bot
          that watches something and pings you — this gives you every
          unglamorous part already wired up. Clone it, swap the prompt, plug in
          your tools, and make it yours.
        </p>
      </div>

      <Separator className="my-12" />

      <div className="mb-16 text-center">
        <p className="text-muted-foreground mx-auto mb-6 max-w-xl">
          The whole thing is open source. Clone it, drop in a bot token and a
          Postgres URL, and you’re talking to your own agent in a few minutes.
          PRs welcome — especially on those rough edges.
        </p>
        <Button asChild size="lg">
          <Link
            href="https://github.com/CuriouslyCory/fastify-telegram-bot"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="h-5 w-5" />
            View on GitHub
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </article>
  );
}
