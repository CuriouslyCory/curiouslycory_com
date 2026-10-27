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
excerpt: Start under the couch and grow through nine areas and 21 tiers, all the way to the universe. A free browser roguelike with character abilities, Keepsakes and saved runs on desktop and mobile.
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
    "Start under the couch and grow through nine areas and 21 tiers, all the way to the universe. A free browser roguelike with character abilities, Keepsakes and saved runs on desktop and mobile.",
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
      "A Katamari-style browser roguelike: start under the couch, absorb planets and galaxies, and take on the expansion of the universe.",
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
          A Katamari-style roguelike for the browser. Start as a speck under the
          couch. Grow until galaxies are small enough to absorb.
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
        <p className="text-muted-foreground text-sm">
          Updated October 27, 2026. Dust Bunny now has nine areas, 21 growth
          tiers, character abilities, Keepsakes and save-and-resume.
        </p>

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
            It&apos;s live now at{" "}
            <Link href={PLAY_URL} target="_blank" rel="noopener noreferrer">
              dustbunny.curiouslycory.com
            </Link>
            . It runs in the browser on a laptop or a phone, there&apos;s
            nothing to install, and you don&apos;t need an account to play.
            Clearing the house is only the first chapter now. The run continues
            through the city, across the planet and out into space. Save &amp;
            quit lets you come back to an unfinished run, so you don&apos;t have
            to do it all in one sitting.
          </p>
        </div>

        <Separator className="my-8" />

        {/* Areas */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            From under the couch to the universe
          </h2>

          <p className="mb-6">
            Lint starts with a radius of 1 cm. A full run now spans 21 Tiers in
            nine areas, with a boss at the end of each one. The size readout
            climbs through metres, kilometres, Earth radii, astronomical units
            and light-years. The Garbage Truck used to be the finish line. Now
            it opens the highway to the fourth area.
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
                the pavement. Beat the Garbage Truck and the highway on-ramp
                opens. You are still getting started.
              </p>
            </AreaCard>
          </div>

          <h3>Beyond the city</h3>
          <p>
            The next six areas change what counts as Debris, and what the
            cleaning crew looks like:
          </p>
          <ul>
            <li>
              The Region, Tiers 10–11. Roll through farmland, highways and towns
              while freight trains and crop dusters get in the way. The
              Incinerator guards the motorway west.
            </li>
            <li>
              The Continent, Tiers 12–13. Mountain ranges become Debris. Dodge
              volcanoes and hurricanes, then take on the Ice Sheet to open the
              launch corridor.
            </li>
            <li>
              The Globe, Tiers 14–15. The Earth map wraps east to west, so you
              can roll a lap around the planet. Absorb the Orbital Sweeper to
              escape orbit.
            </li>
            <li>
              The Solar System, Tiers 16–17. Planets line the orbit lanes and
              Jupiter blocks the way until Dust Star. The boss is the Sun.
            </li>
            <li>
              The Galaxy, Tiers 18–19. Stars and nebulae are Debris, and black
              holes are the vacuums. Absorbing Sagittarius A* turns your bunny
              into a black hole with a lint accretion disc. It keeps its eyes.
            </li>
            <li>
              The Universe, Tiers 20–21. Roll along the cosmic web, absorb
              galaxies and avoid the nearly empty voids that slow you down. The
              final boss is the Expansion itself.
            </li>
          </ul>
          <p>
            A deadpan narrator follows the whole thing, starting with a camera
            dive under the couch and continuing through chapter cards and boss
            introductions. You can skip the story or turn its captions off.
            There is an ending after the Universe, and each win adds to your
            Universes count.
          </p>
          <p>
            Every run is generated from a seed. The house floor plan, the
            neighborhood streets and the later maps all change between runs. The
            three screenshots above show the original areas.
          </p>
        </section>

        <Separator className="my-8" />

        {/* Hazards */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">The cleaning crew</h2>

          <p className="mb-6">
            The house doesn&apos;t want you there. Roombas wander the floor with
            a suction ring, lint rollers patrol lanes and peel mass off you, a
            broom sweeps a telegraphed arc, a spray bottle fires mist from a
            fixed spot, a mop leaves a slippery trail, and an upright vacuum
            pulls you into its cone. Outside it&apos;s robotic mowers, push
            mowers, leaf blowers and sprinklers. In the city it&apos;s ride-on
            floor scrubbers, pressure washers, litter vacuums and a street
            flusher truck.
          </p>

          <Image
            src="/images/blog/dust-bunny-models.webp"
            alt="Rendered models of the cleaning Hazards in three rows: house (Roomba, lint roller, broom, spray bottle, mop), neighborhood (robotic mower, lawn mower, leaf blower, sprinkler, street sweeper) and city (fire hydrant, floor scrubber, pressure washer, street flusher, litter vacuum)."
            width={1600}
            height={600}
            className="border-border my-8 rounded-lg border shadow-md"
          />

          <p className="mb-6">
            Once you outgrow an ordinary Hazard, a green ring appears around it.
            Touching it absorbs it instead of hurting you. The Roomba that
            chased you around the living room becomes something you can roll
            straight over.
          </p>

          <Image
            src="/images/blog/dust-bunny-boss.webp"
            alt="The Robo-Vac 9000 boss in a bedroom, lining up a charge: a red telegraph lane runs from it, through the hallway, to a Tier 5 Dust Titan beside the TV. The HUD reads Robo-Vac 9000, absorb at 51.4 cm."
            width={1600}
            height={900}
            className="border-border my-8 rounded-lg border shadow-md"
          />

          <p>
            The screenshot above is from the original Robo-Vac 9000 fight.
            Bosses now have hit-based health. Dodge a telegraphed charge, let
            the boss crash, then ram it while it is stunned. Each stun lets you
            land one hit and knock loose parts to absorb. Three hits break most
            bosses regardless of your size, or you can grow large enough to
            absorb them directly. Hits no longer shrink a boss.
          </p>
          <p>
            Later fights have their own rules. The Ice Sheet crashes into
            mountain ranges, and Sagittarius A* takes five hits. The Expansion
            is a tug-of-war rather than a target you ram: keep absorbing Debris
            to pull its gravity bar up while it pushes everything outward. Fill
            the bar to finish the run.
          </p>
        </section>

        <Separator className="my-8" />

        {/* Roguelike */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            A roguelike under the fluff
          </h2>

          <p className="mb-6">
            Every run starts with a choice of three Characters. Each has its own
            Ability from the first run, alongside its base stats. The hearts and
            Dash cooldowns below are before Upgrades and Perks:
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
                  Balanced. Decoy sheds a lint ball that draws nearby Hazards
                  away and briefly clogs the ones that touch it.
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
                  Starts bigger and resists knockback, but rolls slowly. Hold
                  Amass to pull Debris and smaller Hazards inward. A charging
                  boss crashes into Tumble while it channels.
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
                  Fast and fragile, with a built-in magnet. Rolling fast fills
                  the Static meter. Discharge spends it to destroy a nearby
                  Hazard or stun a boss. You still have to ram the boss.
                </p>
              </CardContent>
            </Card>
          </div>

          <p className="mb-6">
            Each time you cross a Tier, the game pauses and offers you a draft
            of three Perks that last for the rest of the run: Thick Fur for an
            extra heart, Glutton for faster growth, Second Wind to revive once,
            Spiky Dash to stun Hazards by dashing into them, and eight more.
            Each Character also has five exclusive Perks mixed into its drafts.
            Lint can leave a clogging trail, Tumble can grow a rechargeable fur
            shield, and Zap can turn a full Static meter into protection from a
            hit. Stat caps keep their strengths distinct, and the draft stops
            offering Perks whose stats are already capped.
          </p>

          <Image
            src="/images/blog/dust-bunny-perk-draft.webp"
            alt="The Tier up perk draft: three cards for Lucky Find, Aerodynamic and Regrowth over a paused game, with 2 picks waiting."
            width={1600}
            height={900}
            className="border-border my-8 rounded-lg border shadow-md"
          />

          <p className="mb-6">
            On the floor you&apos;ll find glowing Pickups that last a few
            seconds: Static Charge pulls nearby debris toward you, Sugar Rush
            makes you faster, Bubble Wrap blocks a hit, Glue Dab doubles your
            growth, Crumb Cake heals, and Dust Cloud makes Hazards ignore you.
          </p>

          <h3>Keepsakes and Under the Couch</h3>
          <p>
            Bosses leave Keepsakes tangled in your Character&apos;s fur. Each
            Character has five types that modify its Ability, in rarities from
            Common through Rare, Epic, Legendary and Mythic. Later bosses are
            more likely to leave stronger ones. The first time a Character beats
            a boss, you choose one of three offered types.
          </p>
          <p>
            Tuck up to two into your Loadout before a run. If a slot is still
            empty, you can tuck in a fresh boss drop during the run and use it
            immediately. The Keepsakes you earn stay in that Character&apos;s
            Hoard even if you die afterward. Hardcore drops an extra one per
            boss.
          </p>
          <p>
            Under the Couch is the hub for managing your Hoard. Felting combines
            three Keepsakes of the same type and rarity into one of the next
            rarity, for Fluff, within the limit set by the best boss that
            Character has beaten. Shedding trades a spare for Fluff. The picker
            has filters and sorting to help find what you want to tuck in.
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
                  Pickups and skips the heal between areas. Arcade pays 2× the
                  Fluff and 1.25× the score. Hardcore pays 5× the Fluff and 1.6×
                  the score.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Saving and leaderboards */}
        <section className="mb-12">
          <h2 className="mb-6 flex items-center gap-3 text-3xl font-bold">
            <Trophy className="text-primary h-8 w-8" />
            Save a run, then chase a score
          </h2>

          <p className="mb-6">
            Save &amp; quit in the pause menu keeps an unfinished run on your
            device. Resume returns to the area you left, with your Character,
            Difficulty, Loadout, Perks, timed Pickups, size, health and
            position. Hazards and a boss fight restart for that area. Starting a
            new run abandons the saved one, so choose Resume when you want to
            carry on.
          </p>
          <p className="mb-6">
            Sign in with Google or Discord and your Fluff, Upgrades, Keepsakes,
            remembered Loadouts and saved run follow you between devices. There
            is one saved run per Account. You can leave a run on your laptop and
            resume it on your phone. Sign-in is optional.
          </p>
          <p>
            The leaderboard now has a full-Run board and a separate board for
            every area you clear. Signed-in players&apos; entries post
            automatically and carry a check mark. Anonymous players can choose
            to submit on the results screen. You don&apos;t have to reach the
            ending to put a House or Neighborhood clear on the board.
          </p>
        </section>

        <Separator className="my-8" />

        {/* Under the hood */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Under the hood</h2>

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
                  Debris rendering uses <code>InstancedMesh</code> batches, and
                  lookups go through a spatial hash grid. The target is 60 fps
                  with about 5,000 pieces of debris on a mid-range laptop. A
                  spawner tops up absorbable debris off screen until the area
                  goes quiet near its growth limit, leaving the boss to finish.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Models built from code</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-3">
                <p>
                  Python scripts running in headless Blender generate the models
                  and export them as glTF. The catalog now includes household
                  objects, weather systems and cosmic Hazards. The renderer also
                  has procedural three.js fallbacks if a model fails to load.
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
                  with the Web Audio API at runtime. The music&apos;s intensity
                  follows your Tier and picks up when a boss arrives.
                </p>
              </CardContent>
            </Card>
          </div>

          <p>
            Each later area uses its own world unit, so the simulation can work
            with small numbers even when the HUD reads light-years. Chapter
            transitions cover size leaps between those scales. Planets and stars
            are drawn at sizes that make them playable.
          </p>

          <CodeBlock language="typescript">
            {`// What absorbing a piece of debris does to your radius
// (src/systems/absorb.ts). Radii use the current area's unit.
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
            sends. A server ledger credits signed-in runs once, so resuming on
            another device doesn&apos;t double the Fluff. If the API is down,
            the game falls back to a local leaderboard and keeps going.
          </p>
        </section>

        <Separator className="my-8" />

        {/* How it was built */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            The first version took about a day
          </h2>

          <p className="mb-6">
            The first commit landed on the evening of October 20th. The
            neighborhood, the city, the three Difficulties, the mobile HUD and
            accounts with a cloud save were all in by the next afternoon: 79
            commits in about 23 hours, 71 of them co-authored with Claude. That
            was the three-area version this post originally announced. The six
            later areas, the story and the progression systems arrived
            afterward.
          </p>

          <p>
            Working that fast with an agent only held together because the repo
            is written to be read. A domain glossary in <code>CONTEXT.md</code>
            pins down words like Debris, Hazard, Tier and Absorb so they mean
            one thing everywhere. An architecture doc maps every module, the
            game loop, the event bus and the step-by-step recipes for adding a
            Hazard, a Perk or a whole new area. The headless sim and automated
            tests check the mechanics and progression. If you want to see how
            that&apos;s set up, the{" "}
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
            Controls and a few tips
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
                  <strong className="text-foreground">Ability:</strong> E or
                  right mouse button. Tap for Lint or Zap, hold for Tumble
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
                  <strong className="text-foreground">Ability:</strong> the
                  Ability button. Hold it to channel Amass with Tumble
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
              Hazards can&apos;t follow you under furniture they don&apos;t fit
              beneath. The gap under the couch is the safest place in the house
              while you&apos;re small.
            </li>
            <li>
              A green ring around a Hazard means you&apos;re big enough to
              absorb it, which is worth far more than any sock.
            </li>
            <li>
              Watch the boss intro and its attack telegraphs. Against the
              Robo-Vac, step out of the charge lane, let it hit a wall, then ram
              it while stunned. A stun opens a hit; it doesn&apos;t deal one for
              you.
            </li>
            <li>
              Once an area&apos;s exit is open, the skip button moves you on
              from wherever you are. Enter dismisses a banner first, then leaves
              a cleared area. You never have to roll back across the map.
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
                you get before the Roomba finds you. Clear the house, try a new
                Keepsake, or keep going until the universe has a dust problem.
                If you find a bug or have an idea for a Hazard, open an issue on
                GitHub.
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
