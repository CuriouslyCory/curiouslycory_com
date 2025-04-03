import Image from "next/image";
import Link from "next/link";
import { CodeBlock } from "~/components/ui/code-block";
import { Button } from "~/components/ui/button";
import { GraduationCap, Gamepad2, Code, Heart } from "lucide-react";

/* 
---bm
title: Reviving Number Munchers - A Math Game for the Modern Web
excerpt: How I reimagined the classic educational game to help my son improve his math skills
coverImage: /images/blog/number-munchers-clone.png
publishedAt: 2025-04-02
featured: false
published: true
tags: nextjs,react,game,education,math,nostalgia
--- 
*/

export const metadata = {
  title: "Reviving Number Munchers - A Math Game for the Modern Web",
  description:
    "How I reimagined the classic educational game to help my son improve his math skills",
  openGraph: {
    images: [
      {
        url: "/images/blog/number-munchers-clone.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reviving Number Munchers - A Math Game for the Modern Web",
    description:
      "How I reimagined the classic educational game to help my son improve his math skills",
    images: ["/images/blog/number-munchers-clone.png"],
  },
};

export default function NumberMunchersClone() {
  return (
    <article className="mx-auto max-w-3xl px-4">
      <div className="mb-8 text-center">
        <Image
          src="/images/blog/number-munchers-clone.png"
          alt="Screenshot of the Number Munchers Clone game showing a grid of numbers with a character that can 'munch' them."
          width={800}
          height={500}
          className="mb-6 rounded-lg shadow-lg"
        />
        <h1 className="mb-4 text-4xl font-bold">
          Reviving{" "}
          <span className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
            Number Munchers
          </span>
        </h1>
        <p className="text-muted-foreground text-lg">
          A modern web remake of the classic educational game
        </p>
      </div>

      <div className="prose prose-lg dark:prose-invert mx-auto">
        <div className="mb-8 flex items-center gap-2 border-b pb-4">
          <GraduationCap className="h-5 w-5 text-green-500" />
          <span className="font-medium">Educational</span>
          <span className="mx-2">•</span>
          <Gamepad2 className="h-5 w-5 text-blue-500" />
          <span className="font-medium">Game</span>
          <span className="mx-2">•</span>
          <Heart className="h-5 w-5 text-red-500" />
          <span className="font-medium">Made for my son</span>
        </div>

        <p>
          Remember playing Number Munchers on those old Apple II computers in
          elementary school? I have fond memories of this educational game from
          my childhood, and I wanted to share that experience with my son to
          help him practice math in a fun, engaging way.
        </p>

        <p>
          So I did what any developer parent would do — I rebuilt it for the
          modern web as a side project. The result is a TypeScript-based Number
          Munchers clone that preserves the nostalgic gameplay while adding
          modern features and a clean UI.
        </p>

        <h2 className="from-primary to-secondary mt-8 bg-gradient-to-r bg-clip-text text-3xl text-transparent">
          Why Number Munchers?
        </h2>

        <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="bg-card rounded-lg border p-4 shadow-sm">
            <h3 className="mb-2 text-xl font-medium">Educational Value</h3>
            <p className="text-muted-foreground">
              Number Munchers makes practicing math concepts fun through
              gameplay. Kids can work on multiples, factors, primes, equations,
              and more without it feeling like homework.
            </p>
          </div>
          <div className="bg-card rounded-lg border p-4 shadow-sm">
            <h3 className="mb-2 text-xl font-medium">Nostalgic Appeal</h3>
            <p className="text-muted-foreground">
              For those of us who grew up with it, there&apos;s a special joy in
              sharing these formative games with our children, updated for
              today&apos;s technology.
            </p>
          </div>
        </div>

        <h2 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-3xl text-transparent">
          Game Features
        </h2>

        <ul className="list-inside list-disc">
          <li>
            <strong>Multiple Game Modes</strong> - Practice different math
            concepts:
            <ul className="list-inside list-disc indent-6">
              <li>Multiples: Find numbers that are multiples of the target</li>
              <li>Factors: Find numbers that are factors of the target</li>
              <li>Primes: Find all prime numbers</li>
              <li>Equations: Find equations that equal the target value</li>
              <li>
                Inequalities: Find expressions that satisfy the inequality
              </li>
            </ul>
          </li>
          <li>
            <strong>Progressive Difficulty</strong> - The game gets harder as
            players improve
          </li>
          <li>
            <strong>Troggles!</strong> - Those pesky creatures that chase you
            around the board
          </li>
          <li>
            <strong>Score Tracking</strong> - Leaderboards to encourage
            improvement
          </li>
          <li>
            <strong>Responsive Design</strong> - Playable on desktop, tablet,
            and mobile
          </li>
        </ul>

        <h2 className="from-primary to-secondary mt-8 bg-gradient-to-r bg-clip-text text-3xl text-transparent">
          The Tech Stack
        </h2>

        <p>
          I built this project using modern web technologies to ensure it&apos;s
          fast, responsive, and maintainable:
        </p>
        <div className="my-4">
          <CodeBlock language="text">
            {`# Framework & Frontend
- Next.js 15
- React 19
- TailwindCSS 4
- shadcn/ui components

# Backend
- tRPC 11 for type-safe APIs
- Drizzle ORM with PostgreSQL
- NextAuth.js for authentication

# Development
- TypeScript
- ESLint & Prettier
- pnpm`}
          </CodeBlock>
        </div>

        <p>
          The project follows a modern monorepo structure with full-stack
          TypeScript for type safety throughout. Game state is managed with
          React hooks, while high scores and user data are stored in PostgreSQL.
        </p>

        <h2 className="from-primary to-secondary mt-8 bg-gradient-to-r bg-clip-text text-3xl text-transparent">
          What My Son Thinks
        </h2>

        <div className="my-6 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-950/30">
          <p className="m-0 italic">
            &quot;Dad, can I play the muncher game again? I want to beat my high
            score in multiples!&quot;
          </p>
        </div>

        <p>
          The most rewarding part has been watching my son actually enjoy
          practicing math. He&apos;s improved significantly with his
          multiplication tables and recognition of prime numbers, all while
          having fun trying to avoid those Troggles.
        </p>

        <h2 className="from-primary to-secondary mt-8 bg-gradient-to-r bg-clip-text text-3xl text-transparent">
          Try It Yourself
        </h2>

        <p>
          The game is open source and available to play. If you have children
          learning math concepts, or just want a nostalgic trip down memory
          lane, check it out:
        </p>

        <div className="my-8 flex flex-col gap-4 sm:flex-row">
          <Button asChild className="flex-1">
            <Link
              href="https://number-munchers.curiouslycory.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Gamepad2 className="mr-2 h-4 w-4" />
              Play the Game
            </Link>
          </Button>

          <Button asChild variant="outline" className="flex-1">
            <Link
              href="https://github.com/CuriouslyCory/number-munchers-clone"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Code className="mr-2 h-4 w-4" />
              View Source
            </Link>
          </Button>
        </div>

        <h2 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-3xl text-transparent">
          Future Plans
        </h2>

        <p>
          As my son continues to grow and learn, I plan to expand the game with:
        </p>

        <ul className="list-inside list-disc">
          <li>More advanced math concepts for older students</li>
          <li>
            Customizable game sessions focused on specific areas of difficulty
          </li>
          <li>
            Multiple player profiles to track progress for different children
          </li>
        </ul>

        <p className="my-6">
          Sometimes the best way to help our children learn is to build
          something special just for them. This project has been a labor of love
          that combines my passion for coding with my desire to make learning
          fun for my son.
        </p>

        <div className="my-8 flex justify-center">
          <Link
            href="https://github.com/CuriouslyCory/number-munchers-clone"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground flex items-center text-sm transition-colors"
          >
            <Heart className="mr-2 h-4 w-4 text-red-500" />
            Built with love for the next generation of math enthusiasts
          </Link>
        </div>
      </div>
    </article>
  );
}
