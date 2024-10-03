import Image from "next/image";
import Link from "next/link";
import { CodeBlock } from "~/components/ui/code-block";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import {
  InfoIcon,
  BotIcon,
  BrainCircuitIcon,
  DatabaseIcon,
  RocketIcon,
} from "lucide-react";

/* 
---bm
title: Building an AI-Powered Telegram Bot with Fastify
excerpt: Learn how to create an intelligent Telegram bot that leverages Google's Gemini LLM and tool-based capabilities
coverImage: /images/blog/fastify-telegram-bot.png
publishedAt: 2025-04-02
featured: false
published: true
tags: fastify,telegram,bot,llm,google,gemini,typescript,nodejs
--- 
*/

export const metadata = {
  title: "Building an AI-Powered Telegram Bot with Fastify",
  description:
    "Learn how to create an intelligent Telegram bot that leverages Google's Gemini LLM and tool-based capabilities",
  openGraph: {
    images: [
      {
        url: "/images/blog/fastify-telegram-bot.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Building an AI-Powered Telegram Bot with Fastify",
    description:
      "Learn how to create an intelligent Telegram bot that leverages Google's Gemini LLM and tool-based capabilities",
    images: ["/images/blog/fastify-telegram-bot.png"],
  },
};

export default async function FastifyTelegramBot() {
  return (
    <article className="mx-4 flex max-w-3xl flex-col gap-8 md:mx-auto">
      <div className="relative">
        <Image
          src="/images/blog/fastify-telegram-bot.png"
          alt="Illustration of a robot with a Telegram logo, surrounded by AI components and tools, all built on a Fastify foundation."
          width={1000}
          height={500}
          className="rounded-xl object-cover shadow-lg"
        />
        <div className="from-background/80 absolute inset-0 bg-gradient-to-t to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <Badge className="mb-2" variant="outline">
            AI & Chat Bots
          </Badge>
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            Building an AI-Powered
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Telegram Bot with Fastify
            </span>
          </h1>
        </div>
      </div>

      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <BrainCircuitIcon className="h-4 w-4" />
        <span>Google Gemini LLM</span>
        <span className="mx-1">•</span>
        <BotIcon className="h-4 w-4" />
        <span>Telegram API</span>
        <span className="mx-1">•</span>
        <RocketIcon className="h-4 w-4" />
        <span>Fastify</span>
        <span className="mx-1">•</span>
        <DatabaseIcon className="h-4 w-4" />
        <span>Prisma ORM</span>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="lead">
          Imagine having your own AI assistant available 24/7 right in your
          Telegram chats. Need to look up information, check the weather, or get
          help with a task? What if your assistant could access the web, reason
          step-by-step, and even learn from your interactions?
        </p>

        <p>
          In this article, I&apos;ll walk you through building an intelligent
          Telegram bot powered by Google&apos;s Gemini LLM, using Fastify as our
          backend framework. This bot goes beyond simple pre-programmed
          responses — it can understand natural language, leverage external
          tools, and maintain context throughout a conversation.
        </p>

        <Alert className="my-6">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Project Overview</AlertTitle>
          <AlertDescription>
            <p className="mt-0">
              The{" "}
              <a
                href="https://github.com/CuriouslyCory/fastify-telegram-bot"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fastify Telegram Bot
              </a>{" "}
              is an open-source project that demonstrates how to build a modern
              AI-powered chatbot with tool-enabled capabilities. It&apos;s
              perfect for developers looking to create intelligent assistants on
              the Telegram platform.
            </p>
          </AlertDescription>
        </Alert>

        <h2 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-3xl text-transparent">
          What Makes This Bot Special
        </h2>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="mb-2 flex items-center gap-2 text-xl font-medium">
              <BrainCircuitIcon className="h-5 w-5 text-blue-500" />
              Powered by Gemini
            </h3>
            <p className="text-muted-foreground">
              Utilizing Google&apos;s state-of-the-art Gemini LLM for natural
              language understanding and generation.
            </p>
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="mb-2 flex items-center gap-2 text-xl font-medium">
              <RocketIcon className="h-5 w-5 text-green-500" />
              Tool-Enabled
            </h3>
            <p className="text-muted-foreground">
              Can perform actions beyond text generation, like searching the
              web, checking weather, and more.
            </p>
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="mb-2 flex items-center gap-2 text-xl font-medium">
              <DatabaseIcon className="h-5 w-5 text-amber-500" />
              Persistent Memory
            </h3>
            <p className="text-muted-foreground">
              Stores conversation history in a database, allowing it to maintain
              context across sessions.
            </p>
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="mb-2 flex items-center gap-2 text-xl font-medium">
              <BotIcon className="h-5 w-5 text-purple-500" />
              Customizable Personality
            </h3>
            <p className="text-muted-foreground">
              Easily configure the bot&apos;s system prompt to give it different
              personalities and capabilities.
            </p>
          </div>
        </div>

        <h2 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-3xl text-transparent">
          Technical Architecture
        </h2>

        <p>
          The bot combines several technologies to create a powerful, extensible
          system:
        </p>

        <Tabs defaultValue="server" className="my-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger className="cursor-pointer" value="server">
              Server
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="ai">
              AI Integration
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="db">
              Database
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="tools">
              MCP Tools
            </TabsTrigger>
          </TabsList>
          <TabsContent value="server" className="py-4">
            <h3 className="mb-2 text-xl font-medium">Fastify Backend</h3>
            <p>
              Fastify provides a lightning-fast, low-overhead web framework
              perfect for building APIs and services. In this project, it serves
              as our application core, handling webhook endpoints and message
              processing.
            </p>
            <CodeBlock language="typescript">
              {`// src/index.ts
import Fastify from 'fastify';
import { bot } from './bot';

const server = Fastify({
  logger: true,
});

// Register webhook handler for Telegram
server.post('/webhook', async (request, reply) => {
  const update = request.body as TelegramUpdate;
  
  // Process the incoming message
  await bot.handleUpdate(update);
  
  return { ok: true };
});

// Start the server
const start = async () => {
  try {
    await server.listen({ port: process.env.PORT || 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();`}
            </CodeBlock>
          </TabsContent>

          <TabsContent value="ai" className="py-4">
            <h3 className="mb-2 text-xl font-medium">
              LangChain + Google Gemini
            </h3>
            <p>
              LangChain provides a framework for working with LLMs, while
              Google&apos;s Gemini model handles the actual language processing.
              Together, they enable our bot to understand and generate
              human-like responses.
            </p>
            <CodeBlock language="typescript">
              {`// src/agent/index.ts
import { AgentExecutor, createToolCallingAgent } from "langchain/agents";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { tools } from "./tools";

// Initialize the LLM
const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY!,
  modelName: "gemini-pro",
  maxOutputTokens: 2048,
});

// Create the agent with tools
const agent = createToolCallingAgent({
  llm: model,
  tools,
  systemPrompt: [
    "You are a helpful telegram assistant.",
    "Limit your message responses to 4000 characters.",
    "Format your replies in plain text.",
  ].join("\\n"),
});

// Create an executor to run the agent
export const agentExecutor = AgentExecutor.fromAgentAndTools({
  agent,
  tools,
  verbose: true,
});`}
            </CodeBlock>
          </TabsContent>

          <TabsContent value="db" className="py-4">
            <h3 className="mb-2 text-xl font-medium">Prisma ORM</h3>
            <p>
              Prisma provides a type-safe database client that makes it easy to
              work with our PostgreSQL database. The bot uses this to store
              conversation history and user preferences.
            </p>
            <CodeBlock language="typescript">
              {`// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id         String   @id @default(cuid())
  telegramId BigInt   @unique
  name       String?
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  messages   Message[]
}

model Message {
  id        String   @id @default(cuid())
  content   String
  role      String   // "user" or "assistant"
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
}

// Example usage in code:
// src/db/user.ts
export async function getOrCreateUser(telegramId: number, name?: string) {
  return await prisma.user.upsert({
    where: { telegramId: BigInt(telegramId) },
    update: { name },
    create: { 
      telegramId: BigInt(telegramId),
      name 
    },
  });
}`}
            </CodeBlock>
          </TabsContent>

          <TabsContent value="tools" className="py-4">
            <h3 className="mb-2 text-xl font-medium">
              MCP Services (Model Context Protocol)
            </h3>
            <p>
              MCP services extend the bot&apos;s capabilities beyond text
              generation, allowing it to access external data and perform
              actions. These tools are dynamically loaded based on
              configuration.
            </p>
            <CodeBlock language="json">
              {`// src/constants/mcp.json
{
  "mcpServers": {
    "weather": {
      "command": "npx",
      "args": [
        "-y",
        "@smithery/cli@latest",
        "run",
        "@turkyden/weather",
        "--key",
        "\${SMITHERY_API_KEY}"
      ]
    },
    "web-search": {
      "command": "npx",
      "args": [
        "-y",
        "@smithery/cli@latest",
        "run",
        "@nickclyde/duckduckgo-mcp-server",
        "--key",
        "\${SMITHERY_API_KEY}"
      ]
    }
  }
}`}
            </CodeBlock>
          </TabsContent>
        </Tabs>

        <h2 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-3xl text-transparent">
          Setting Up Your Own Bot
        </h2>

        <p>
          Let&apos;s walk through the process of setting up your own AI-powered
          Telegram bot using this template:
        </p>

        <ol className="space-y-4">
          <li>
            <strong>Create a Telegram Bot:</strong> First, you&apos;ll need to
            create a bot through the BotFather on Telegram. This will give you
            an API token that your bot will use to authenticate with the
            Telegram API.
            <CodeBlock language="bash">
              {`# Start a chat with @BotFather on Telegram
# Use the /newbot command
# Follow the instructions to create your bot
# Copy the API token it provides`}
            </CodeBlock>
          </li>
          <li>
            <strong>Clone the Repository:</strong> Get the project code from
            GitHub and install dependencies.
            <CodeBlock language="bash">
              {`git clone https://github.com/CuriouslyCory/fastify-telegram-bot.git
cd fastify-telegram-bot
pnpm install`}
            </CodeBlock>
          </li>
          <li>
            <strong>Set Up Environment Variables:</strong> Create a .env file
            with your credentials and API keys.
            <CodeBlock language="bash">
              {`cp .env.example .env
# Edit .env with your favorite editor
# Add your Telegram token, database URL, and API keys`}
            </CodeBlock>
          </li>
          <li>
            <strong>Set Up the Database:</strong> Initialize the database with
            Prisma.
            <CodeBlock language="bash">
              {`pnpm db:generate
pnpm db:push`}
            </CodeBlock>
          </li>
          <li>
            <strong>Start the Development Server:</strong> Run the bot locally
            for testing.
            <CodeBlock language="bash">{`pnpm dev`}</CodeBlock>
          </li>
          <li>
            <strong>Deploy for Production:</strong> Once you&apos;re ready,
            deploy the bot to your preferred hosting platform.
          </li>
        </ol>

        <h2 className="from-primary to-secondary mt-8 bg-gradient-to-r bg-clip-text text-3xl text-transparent">
          Customizing the Bot&apos;s Personality
        </h2>

        <p>
          One of the most powerful features of this bot is how easily you can
          customize its personality and behavior through the system prompt.
          Let&apos;s look at some examples:
        </p>

        <div className="my-6 space-y-4">
          <div className="bg-muted/30 rounded-lg border-l-4 border-blue-500 p-4">
            <h3 className="mb-1 text-lg font-medium">Weather Assistant</h3>
            <CodeBlock language="json">
              {`{
  "telegram": {
    "system_prompt": [
      "You are a friendly weather assistant specialized in providing accurate weather forecasts.",
      "Always use the weather tool when users ask about weather conditions.",
      "Limit your message responses to 4000 characters.",
      "Format temperature in both Celsius and Fahrenheit.",
      "For weather forecasts, always include: temperature, conditions, and precipitation probability."
    ]
  }
}`}
            </CodeBlock>
          </div>

          <div className="bg-muted/30 rounded-lg border-l-4 border-green-500 p-4">
            <h3 className="mb-1 text-lg font-medium">Research Assistant</h3>
            <CodeBlock language="json">
              {`{
  "telegram": {
    "system_prompt": [
      "You are a research assistant that helps users find information online.",
      "Always use the web search tool for factual queries and current events.",
      "Limit your message responses to 4000 characters.",
      "When providing information, cite your sources.",
      "Format complex information in easy-to-read bullet points."
    ]
  }
}`}
            </CodeBlock>
          </div>
        </div>

        <h2 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-3xl text-transparent">
          Extending with MCP Services
        </h2>

        <p>
          Model Context Protocol (MCP) services allow your bot to access
          external data and perform actions. To add a new service, you simply
          edit the <code>src/constants/mcp.json</code> file:
        </p>

        <CodeBlock language="json">
          {`{
  "mcpServers": {
    "your-new-service-name": {
      "command": "npx",
      "args": [
        "-y",
        "@smithery/cli@latest",
        "run",
        "@namespace/service-name",
        "--key",
        "\${SMITHERY_API_KEY}"
      ]
    }
  }
}`}
        </CodeBlock>

        <p>
          The service will be automatically available to the agent on the next
          startup, giving your bot new capabilities.
        </p>

        <h2 className="from-primary to-secondary mt-8 bg-gradient-to-r bg-clip-text text-3xl text-transparent">
          Real-World Applications
        </h2>

        <p>
          What can you actually build with this template? Here are some ideas:
        </p>

        <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="bg-card rounded-lg p-4 shadow-sm">
            <h3 className="mb-2 font-medium">Customer Support Bot</h3>
            <p className="text-muted-foreground text-sm">
              Answer FAQs, collect support tickets, and provide self-service
              resolution options for common issues.
            </p>
          </div>
          <div className="bg-card rounded-lg p-4 shadow-sm">
            <h3 className="mb-2 font-medium">Personal Assistant</h3>
            <p className="text-muted-foreground text-sm">
              Schedule reminders, summarize news, check weather, and provide
              information lookups on demand.
            </p>
          </div>
          <div className="bg-card rounded-lg p-4 shadow-sm">
            <h3 className="mb-2 font-medium">Educational Tool</h3>
            <p className="text-muted-foreground text-sm">
              Create interactive learning experiences, quiz students, or provide
              explanations for complex topics.
            </p>
          </div>
        </div>

        <h2 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-3xl text-transparent">
          Performance Considerations
        </h2>

        <p>When deploying your bot, keep these performance factors in mind:</p>

        <ul className="list-inside list-disc">
          <li>
            <strong>Response Times:</strong> LLM calls can take several seconds,
            especially for complex queries. Consider adding typing indicators or
            acknowledgments for better user experience.
          </li>
          <li>
            <strong>Memory Usage:</strong> The conversation history can grow
            large over time. Implement methods to summarize or prune older
            messages to keep memory usage manageable.
          </li>
          <li>
            <strong>API Costs:</strong> LLM and tool API calls can incur costs
            based on usage. Set up monitoring and potentially rate limiting to
            control expenses.
          </li>
          <li>
            <strong>Scaling:</strong> For high-traffic bots, consider horizontal
            scaling with a load balancer, or implementing a queue-based
            architecture for message processing.
          </li>
        </ul>

        <Alert className="my-6">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Pro Tip</AlertTitle>
          <AlertDescription>
            <p className="mt-0">
              Consider implementing caching for common queries or tool results
              to improve performance and reduce API costs.
            </p>
          </AlertDescription>
        </Alert>

        <h2 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-3xl text-transparent">
          Conclusion
        </h2>

        <p>
          The Fastify Telegram Bot template provides a solid foundation for
          building sophisticated AI-powered chat bots that leverage the latest
          LLM technology. With its modular architecture, database integration,
          and tool-enabled capabilities, you can quickly create intelligent
          assistants tailored to your specific needs.
        </p>

        <p>
          Whether you&apos;re looking to build a personal assistant, a customer
          support bot, or an educational tool, this template gives you the
          building blocks to create something truly useful and engaging.
        </p>

        <div className="my-8 flex justify-center">
          <Button asChild className="px-8 py-6 text-lg">
            <Link
              href="https://github.com/CuriouslyCory/fastify-telegram-bot"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Started on GitHub →
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
