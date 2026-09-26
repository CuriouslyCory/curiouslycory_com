import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "curiouslycory.com";

export const SiteFAQ = () => (
  <Accordion
    type="single"
    collapsible
    defaultValue="stack"
    className="w-full max-w-sm"
  >
    <AccordionItem value="stack">
      <AccordionTrigger>What is this site built with?</AccordionTrigger>
      <AccordionContent className="text-muted-foreground">
        Next.js App Router, Tailwind v4 and shadcn/ui, deployed on Vercel.
        Every blog post is a hand-written React page.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="easter-eggs">
      <AccordionTrigger>Are there really easter eggs?</AccordionTrigger>
      <AccordionContent className="text-muted-foreground">
        A few. Try the constellation in the header, or check your Quest Log.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="hire">
      <AccordionTrigger>Are you open to contract work?</AccordionTrigger>
      <AccordionContent className="text-muted-foreground">
        Yes. Send a transmission from the contact page and I will reply within
        a couple of days.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

export const Multiple = () => (
  <Accordion
    type="multiple"
    defaultValue={["careercraft", "telegram"]}
    className="w-full max-w-sm"
  >
    <AccordionItem value="careercraft">
      <AccordionTrigger>CareerCraft Studio</AccordionTrigger>
      <AccordionContent>
        An AI career assistant that tailors resumes and cover letters to each
        job posting, built on LangGraph agents.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="telegram">
      <AccordionTrigger>Fastify Telegram Bot</AccordionTrigger>
      <AccordionContent>
        A Telegram assistant rebuilt as a LangGraph state machine running
        behind a Fastify webhook.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="munchers">
      <AccordionTrigger>Number Munchers Clone</AccordionTrigger>
      <AccordionContent>
        A browser remake of the classic math game from the school computer lab.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

export const Collapsed = () => (
  <Accordion type="single" collapsible className="w-full max-w-sm">
    <AccordionItem value="arduino">
      <AccordionTrigger>Arduino projects</AccordionTrigger>
      <AccordionContent>
        Capacitive touch sensors, an ultrasonic parking sensor, and a
        voice-activated timeout timer.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="web3">
      <AccordionTrigger>Web3 experiments</AccordionTrigger>
      <AccordionContent>An ERC-1155 NFT starter template.</AccordionContent>
    </AccordionItem>
    <AccordionItem value="retired" disabled>
      <AccordionTrigger>Retired missions</AccordionTrigger>
      <AccordionContent>Nothing to see here.</AccordionContent>
    </AccordionItem>
  </Accordion>
);
