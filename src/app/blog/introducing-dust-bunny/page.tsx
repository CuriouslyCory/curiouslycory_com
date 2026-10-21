import Image from "next/image";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { CodeBlock } from "~/components/ui/code-block";
import { Separator } from "~/components/ui/separator";
import {
  Building2,
  Code,
  Gamepad2,
  House,
  Keyboard,
  Trees,
  Trophy,
  type LucideIcon,
} from "lucide-react";

/*
---bm
title: "Introducing Dust Bunny: A Katamari-Style Roguelike You Can Play in Your Browser"
excerpt: Roll across the floor as a 1 cm dust bunny, absorb everything smaller than you, and grow until you can swallow the Roomba, the street sweeper, and finally a garbage truck. Free to play in the browser on desktop and mobile.
coverImage: /images/blog/dust-bunny.webp
publishedAt: 2026-10-21
featured: true
published: true
tags: game,threejs,typescript,roguelike,webgl,vite,indie-game
---
*/

export const metadata = {
  title:
    "Introducing Dust Bunny: A Katamari-Style Roguelike You Can Play in Your Browser",
  description:
    "Roll across the floor as a 1 cm dust bunny, absorb everything smaller than you, and grow until you can swallow the Roomba, the street sweeper, and finally a garbage truck. Free to play in the browser on desktop and mobile.",
  openGraph: {
    images: [
      {
        url: "/images/blog/dust-bunny.webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Introducing Dust Bunny",
    description:
      "A Katamari-style roguelike in the browser: start as a 1 cm speck under the couch, end by absorbing a garbage truck downtown.",
    images: ["/images/blog/dust-bunny.webp"],
  },
};

const PLAY_URL = "https://dustbunny.curiouslycory.com/";
const REPO_URL = "https://github.com/CuriouslyCory/dust-bunny";

function AreaCard({
  icon: Icon,
  image,
  alt,
  children,
}: {
  icon: LucideIcon;
  image: string;
  alt: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="overflow-hidden pt-0">
      <Image
        src={image}
        alt={alt}
        width={1600}
        height={900}
        className="w-full"
      />
      <CardHeader className="flex flex-row items-start gap-3">
        <Icon className="text-primary mt-1 h-6 w-6 shrink-0" />
        <div className="space-y-1.5">{children}</div>
      </CardHeader>
    </Card>
  );
}

export default function IntroducingDustBunnyPost() {
  return (
    <div className="mx-auto max-w-4xl">
      {/* Hero */}
      <div className="mb-10 text-center">
        <h1 className="animate-fade-in from-primary to-secondary mb-6 bg-gradient-to-r bg-clip-text font-serif text-5xl font-bold text-transparent">
          Introducing Dust Bunny
        </h1>
        <p className="text-muted-foreground mb-8 text-xl">
          A Katamari-style roguelike for the browser. Start as a 1 cm speck
          under the couch. Finish by absorbing a garbage truck downtown.
        </p>
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <Badge variant="secondary">three.js</Badge>
          <Badge variant="secondary">TypeScript</Badge>
          <Badge variant="secondary">Vite</Badge>
          <Badge variant="secondary">Roguelike</Badge>
          <Badge variant="secondary">Desktop + Mobile</Badge>
          <Badge variant="secondary">Free</Badge>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <Link href={PLAY_URL} target="_blank" rel="noopener noreferrer">
              <Gamepad2 className="mr-2 h-5 w-5" />
              Play Dust Bunny
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href={REPO_URL} target="_blank" rel="noopener noreferrer">
              <Code className="mr-2 h-5 w-5" />
              View the Source
            </Link>
          </Button>
        </div>
      </div>

      <Image
        src="/images/blog/dust-bunny.webp"
        alt="Dust Bunny title art: a fluffy grey dust bunny on a wooden floor beside a red rug, a lint roller and a coffee table, with the tagline Roll. Absorb. Grow."
        width={1200}
        height={630}
        className="border-border mb-12 rounded-lg border shadow-md"
        priority
      />

      <div className="prose prose-lg dark:prose-invert max-w-none">
        {/* Intro */}
        <div className="mb-12">
          <p className="text-xl leading-relaxed">
            Everyone has watched a dust bunny drift out from under a couch and
            thought, briefly, that it looked alive. Dust Bunny is the game where
            it is. You roll across the floor, absorb anything smaller than you,
            and every piece you pick up sticks to your fur and makes you bigger.
            Bigger means you can absorb bigger things. Keep going and the couch
            you started under turns into furniture you can eat.
          </p>

          <p>
            It’s live now at{" "}
            <Link href={PLAY_URL} target="_blank" rel="noopener noreferrer">
              dustbunny.curiouslycory.com
            </Link>
            . It runs in the browser on a laptop or a phone, there’s nothing to
            install, and you don’t need an account to play. The winning runs on
            the leaderboard so far took between 9 and 19 minutes. Your first few
            runs probably won’t get that far, because the household appliances
            fight back.
          </p>
        </div>

        <Separator className="my-8" />

        {/* Areas */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            From Under the Couch to Downtown
          </h2>

          <p className="mb-6">
            The game measures everything in real centimetres, and a run covers
            nearly three orders of magnitude. You start with a radius of 1 cm.
            By the end your radius is over 6 metres. Along the way you grow
            through nine Tiers in three areas, and each area ends with a boss
            that you have to absorb to move on.
          </p>

          <div className="not-prose mb-8 space-y-8">
            <AreaCard
              icon={House}
              image="/images/blog/dust-bunny-house.webp"
              alt="A Tier 4 Dust Devil rolling past an orange armchair and a teal couch in the living room, with a coffee table on a red rug and debris scattered across the wooden floor."
            >
              <CardTitle className="text-2xl">The House</CardTitle>
              <CardDescription>
                Tiers 1–5, Speck to Dust Titan. Boss: the Robo-Vac 9000.
              </CardDescription>
              <p className="text-muted-foreground pt-2 leading-relaxed">
                You start under the couch absorbing lint, crumbs and staples.
                Each Tier pulls the camera back: coins and LEGO, then socks and
                toy cars, then shoes and books, until chairs and laundry baskets
                are on the menu and the whole floor plan fits on screen.
              </p>
            </AreaCard>
            <AreaCard
              icon={Trees}
              image="/images/blog/dust-bunny-neighborhood.webp"
              alt="A tan, fluffy Tier 6 Dust Storm in the middle of a suburban street, surrounded by traffic cones, tires, trash cans and garden gnomes, with houses and a big oak tree on either side."
            >
              <CardTitle className="text-2xl">The Neighborhood</CardTitle>
              <CardDescription>
                Tiers 6–7, Dust Storm to Dust Cyclone. Boss: the Street Sweeper.
              </CardDescription>
              <p className="text-muted-foreground pt-2 leading-relaxed">
                Absorb the Robo-Vac and the front door swings open. Outside, the
                floor is a whole street: garden gnomes and pinecones first, then
                mailboxes, bikes and grills, then picnic tables and parked cars.
                Robotic mowers, sprinklers and leaf blowers patrol the lawns.
              </p>
            </AreaCard>
            <AreaCard
              icon={Building2}
              image="/images/blog/dust-bunny-city.webp"
              alt="A Tier 8 Dust Hurricane, now several metres across, rolling through a downtown intersection between glass office towers, with taxis, buses, food trucks and a park fountain around it."
            >
              <CardTitle className="text-2xl">The City</CardTitle>
              <CardDescription>
                Tiers 8–9, Dust Hurricane to Dust Colossus. Boss: the Garbage
                Truck.
              </CardDescription>
              <p className="text-muted-foreground pt-2 leading-relaxed">
                Absorb the Street Sweeper and the road barrier lifts. Downtown
                at golden hour you eat parking meters, phone booths and hot dog
                carts, then taxis and food trucks, then buses and fire trucks,
                while floor scrubbers and pressure washers try to clean you off
                the pavement.
              </p>
            </AreaCard>
          </div>

          <p>
            Every run is generated from a seed: the room layout and furniture,
            the street with its seven houses and park, and the city grid with
            its avenues, office towers, parking lots and fountain square. A new
            run means a new floor plan.
          </p>
        </section>

        <Separator className="my-8" />

        {/* Hazards */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">The Cleaning Crew</h2>

          <p className="mb-6">
            The house doesn’t want you there. Roombas wander the floor with a
            suction ring, lint rollers patrol lanes and peel mass off you, a
            broom sweeps a telegraphed arc, a spray bottle fires mist from a
            fixed spot, a mop leaves a slippery trail, and an upright vacuum
            pulls you into its cone. Outside it’s robotic mowers, push mowers,
            leaf blowers and sprinklers. In the city it’s ride-on floor
            scrubbers, pressure washers, litter vacuums and a street flusher
            truck.
          </p>

          <Image
            src="/images/blog/dust-bunny-models.webp"
            alt="Rendered models of the cleaning Hazards in three rows: house (Roomba, lint roller, broom, spray bottle, mop), neighborhood (robotic mower, lawn mower, leaf blower, sprinkler, street sweeper) and city (fire hydrant, floor scrubber, pressure washer, street flusher, litter vacuum)."
            width={1600}
            height={600}
            className="border-border my-8 rounded-lg border shadow-md"
          />

          <p className="mb-6">
            Every Hazard is dangerous until it isn’t. Once you outgrow one, a
            green ring appears around it and touching it absorbs it instead of
            hurting you, which is one of the most satisfying moments in the
            game: the Roomba that chased you around the living room at 2 cm
            becomes a snack at 25.
          </p>

          <Image
            src="/images/blog/dust-bunny-boss.webp"
            alt="The Robo-Vac 9000 boss in a bedroom, lining up a charge: a red telegraph lane runs from it, through the hallway, to a Tier 5 Dust Titan beside the TV. The HUD reads Robo-Vac 9000, absorb at 51.4 cm."
            width={1600}
            height={900}
            className="border-border my-8 rounded-lg border shadow-md"
          />

          <p>
            Bosses are bigger than you when they arrive. Above, the{" "}
            <strong>Robo-Vac 9000</strong> has just lined up a charge: the red
            lane on the floor is the path it’s about to take, straight through
            where I’m standing. The HUD says I need a 51.4 cm radius to absorb
            it, and I’m at 46.8. The way through is to dodge the charge, let it
            hit a wall, and bump it while it’s stunned. Each bump chips it down
            and knocks pieces loose for you to eat, so it gets smaller while you
            get bigger. The Street Sweeper and the Garbage Truck work the same
            way at street scale, and they summon mini mowers and mini scrubbers
            to help.
          </p>
        </section>

        <Separator className="my-8" />

        {/* Roguelike */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            A Roguelike Under the Fluff
          </h2>

          <p className="mb-6">
            Every run starts with a choice of three Characters, each a different
            kind of dust:
          </p>

          <div className="not-prose mb-8 grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Lint</CardTitle>
                <CardDescription>Dryer lint</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="font-medium">3 hearts · 3 s Dash cooldown</div>
                <p className="text-muted-foreground">
                  Balanced. No weak spots, no special strength. The default.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tumble</CardTitle>
                <CardDescription>Pet-hair tumbleweed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="font-medium">5 hearts · 4 s Dash cooldown</div>
                <p className="text-muted-foreground">
                  Starts bigger and shrugs off knockback, but it’s slow and
                  turns like a shopping cart.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Zap</CardTitle>
                <CardDescription>Static fluff</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="font-medium">2 hearts · 2 s Dash cooldown</div>
                <p className="text-muted-foreground">
                  Fast, with a built-in magnet pull. Fragile, and vacuums pull
                  it 1.5× harder.
                </p>
              </CardContent>
            </Card>
          </div>

          <p className="mb-6">
            Each time you cross a Tier, the game pauses and offers you a draft
            of three Perks that last for the rest of the run: Thick Fur for an
            extra heart, Glutton for faster growth, Second Wind to revive once,
            Spiky Dash to stun Hazards by dashing into them, and eight more.
            Most of them stack, so a run that keeps picking Aerodynamic ends up
            very fast and very hard to steer.
          </p>

          <Image
            src="/images/blog/dust-bunny-perk-draft.webp"
            alt="The Tier up perk draft: three cards for Lucky Find, Aerodynamic and Regrowth over a paused game, with 2 picks waiting."
            width={1600}
            height={900}
            className="border-border my-8 rounded-lg border shadow-md"
          />

          <p className="mb-6">
            On the floor you’ll find glowing Pickups that last a few seconds:
            Static Charge pulls nearby debris toward you, Sugar Rush makes you
            faster, Bubble Wrap blocks a hit, Glue Dab doubles your growth,
            Crumb Cake heals, and Dust Cloud makes Hazards ignore you.
          </p>

          <div className="not-prose mb-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Fluff and the Shop</CardTitle>
                <CardDescription>Progress that survives a run</CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-2">
                <p>
                  When a run ends you earn Fluff based on how big you got, how
                  much you absorbed and how far you made it. Spend it in the
                  Shop on permanent Upgrades: extra hearts, a head start, a
                  wider Perk choice, a Perk reroll and more.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Three Difficulties</CardTitle>
                <CardDescription>Casual, Arcade and Hardcore</CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-2">
                <p>
                  Casual is the default balance. Arcade makes Hazards faster and
                  more frequent. Hardcore goes further, takes away a heart, cuts
                  Pickups and skips the heal between areas. Harder runs pay
                  1.25× or 1.6× the Fluff and leaderboard score.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Leaderboard */}
        <section className="mb-12">
          <h2 className="mb-6 flex items-center gap-3 text-3xl font-bold">
            <Trophy className="text-primary h-8 w-8" />
            The Leaderboard
          </h2>

          <p className="mb-6">
            At the end of each run you can post your score to a global
            leaderboard. You can post anonymously, or sign in with Google or
            Discord to get a ✓ next to your name and a cloud save, so your Fluff
            and Upgrades follow you from your laptop to your phone. Signing in
            is optional; everything else works without it.
          </p>

          <p>
            As I write this, the top score is mine: 110,815, from a 9-minute Zap
            run on Casual. Nobody has posted an Arcade or Hardcore run yet, and
            those pay 1.25× and 1.6× the score. It shouldn’t be hard to take
            first place from me.
          </p>
        </section>

        <Separator className="my-8" />

        {/* Under the hood */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Under the Hood</h2>

          <p className="mb-6">
            Dust Bunny is TypeScript, Vite and three.js with no game engine and
            no physics library. The world is a flat floor, so movement and
            collision are 2D circles and boxes on the XZ plane, and three.js
            only draws the result. A few decisions that made the game work:
          </p>

          <div className="not-prose mb-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Growth is volume, not radius</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-3">
                <p>
                  Absorbing something adds its volume to yours, so the radius
                  grows with a cube root. Small debris stops mattering as you
                  grow, which is what pushes you toward bigger targets and gives
                  each Tier its own feel.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Thousands of things on the floor</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-3">
                <p>
                  Each of the 98 debris types is one <code>InstancedMesh</code>,
                  and lookups go through a spatial hash grid. The target is 60
                  fps with about 5,000 pieces of debris on a mid-range laptop. A
                  spawner keeps topping up absorbable debris just off screen so
                  there’s always something to eat at your size.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Models built from code</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-3">
                <p>
                  All 60 models, from the sock to the 95-metre glass skyscraper,
                  are generated by Python scripts running in headless Blender
                  and exported as glTF: about 75,000 triangles and 3 MB in
                  total. Every one also has a procedural three.js fallback, so
                  the game still runs if a model fails to load.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>No audio files</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-3">
                <p>
                  The sound effects and the lo-fi music loop are synthesized
                  with the Web Audio API at runtime. The music’s intensity
                  follows your Tier and picks up when a boss arrives.
                </p>
              </CardContent>
            </Card>
          </div>

          <CodeBlock language="typescript">
            {`// What absorbing a piece of debris does to your radius
// (src/systems/absorb.ts). size is the debris radius in cm.
canAbsorb = size <= radius * absorbRatio; // absorbRatio defaults to 0.7

r_new = Math.cbrt(r ** 3 + growthFactor * growthMultiplier * mass * size ** 3);`}
          </CodeBlock>

          <p className="mt-6 mb-6">
            The simulation never touches the DOM or WebGL. A run is a plain
            object that the browser renders each frame, which means the same
            code also runs in Node. Vitest drives full runs in the integration
            tests, and <code>pnpm sim</code> runs a headless bot through seeded
            runs for each Character and prints how long every Tier took, so a
            balance change shows up as a number before anyone has to play
            through it.
          </p>

          <p>
            The backend is a small set of Vercel functions on Neon Postgres for
            the leaderboard, accounts (self-hosted{" "}
            <Link
              href="https://better-auth.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Better Auth
            </Link>
            ) and the cloud save. The server recomputes every score from the
            submitted run stats rather than trusting the number the client
            sends. If the API is down, the game falls back to a local
            leaderboard and keeps going.
          </p>
        </section>

        <Separator className="my-8" />

        {/* How it was built */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Built in About a Day</h2>

          <p className="mb-6">
            The first commit landed on the evening of October 20th. The
            neighborhood, the city, the three Difficulties, the mobile HUD and
            accounts with a cloud save were all in by the next afternoon: 79
            commits in about 23 hours, 71 of them co-authored with Claude.
          </p>

          <p>
            Working that fast with an agent only held together because the repo
            is written to be read. A domain glossary in <code>CONTEXT.md</code>
            pins down words like Debris, Hazard, Tier and Absorb so they mean
            one thing everywhere. An architecture doc maps every module, the
            game loop, the event bus and the step-by-step recipes for adding a
            Hazard, a Perk or a whole new area. The headless sim, plus 34 test
            files, checked the work at each step. If you want to see how that’s
            set up, the{" "}
            <Link href={REPO_URL} target="_blank" rel="noopener noreferrer">
              repo is MIT-licensed
            </Link>
            .
          </p>
        </section>

        <Separator className="my-8" />

        {/* Controls + tips */}
        <section className="mb-12">
          <h2 className="mb-6 flex items-center gap-3 text-3xl font-bold">
            <Keyboard className="text-primary h-8 w-8" />
            Controls and a Few Tips
          </h2>

          <div className="not-prose mb-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Keyboard and mouse</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-2">
                <div>
                  <strong className="text-foreground">Move:</strong> WASD or
                  arrow keys, or click and hold to roll toward the cursor
                </div>
                <div>
                  <strong className="text-foreground">Dash:</strong> Space or
                  Shift
                </div>
                <div>
                  <strong className="text-foreground">Pause:</strong> Esc or P
                </div>
                <div>
                  <strong className="text-foreground">Mute:</strong> M
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Touch</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-2">
                <div>
                  <strong className="text-foreground">Steer:</strong> drag
                  anywhere on the left half of the screen
                </div>
                <div>
                  <strong className="text-foreground">Dash:</strong> tap the
                  right half, or the Dash button
                </div>
                <div>
                  <strong className="text-foreground">Fullscreen:</strong> the
                  button in the HUD on phones
                </div>
              </CardContent>
            </Card>
          </div>

          <ul>
            <li>
              Hazards can’t follow you under furniture they don’t fit beneath.
              The gap under the couch is the safest place in the house while
              you’re small.
            </li>
            <li>
              A green ring around a Hazard means you’re big enough to absorb it,
              which is worth far more than any sock.
            </li>
            <li>
              Bosses telegraph their charges with a red lane on the floor. Step
              aside, let them hit a wall, then touch them while they’re stunned
              to chip them down to an absorbable size.
            </li>
            <li>
              Once an area’s exit is open, the skip button (or Enter) moves you
              on from wherever you are. You never have to roll back across the
              map.
            </li>
          </ul>
        </section>

        <Separator className="my-8" />

        {/* CTA */}
        <section className="not-prose mb-12">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Go clean up</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Pick a Character, roll out from under the couch, and see how far
                you get before the Roomba finds you. If you reach the Garbage
                Truck, post the score. If you find a bug or have an idea for a
                Hazard, open an issue on GitHub.
              </p>
            </CardContent>
          </Card>

          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href={PLAY_URL} target="_blank" rel="noopener noreferrer">
                <Gamepad2 className="mr-2 h-5 w-5" />
                Play Dust Bunny
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link
                href={`${REPO_URL}/issues`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Code className="mr-2 h-5 w-5" />
                Report a Bug or Suggest a Hazard
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
