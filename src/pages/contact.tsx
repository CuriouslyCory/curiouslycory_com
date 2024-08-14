import clsx from "clsx";
import Head from "next/head";
import { useState } from "react";
import { DiscordChat } from "../components/discord-chat";
import { SectionTitle } from "../components/section-title";
import { SocialLink } from "../components/social-link";
import { socialLinks } from "../constants/socials";

export const ContactPage = (): JSX.Element => {
  const [showDiscord, setShowDiscord] = useState(false);
  return (
    <>
      <Head>
        <title>CuriouslyCory - Where to find me</title>
        <meta
          name="description"
          content="CuriouslyCory Web Engineering Links page"
        />
      </Head>
      <main className="w-full">
        <div className="hidden md:block fixed inset-x-0 top-0 -z-10 whitespace-nowrap">
          <h1 className="text-[400px] text-gray-50">Find Me</h1>
        </div>
        <section className="w-full flex justify-left">
          <div className="mx-2 md:mx-20 mt-10 md:mt-20">
            <SectionTitle size="5xl">
              Looking to get in touch or follow along?
            </SectionTitle>
            <p>
              Here are many of the places you can find me around the internet.
            </p>
          </div>
          <div className="mb-10 md:mb-0">&nbsp;</div>
        </section>
        <section className="w-full bg-slate-700 bg-opacity-10">
          <div className="mx-2 md:mx-20 mt-5 md:mt-10 pt-10 w-fit">
            <h1 className="text-4xl mb-5">Look for me on...</h1>
            <ul>
              {socialLinks.map((link) => (
                <SocialLink key={`social-link-${link.title}`} {...link} />
              ))}
            </ul>
          </div>
        </section>
        <section className="bg-slate-700 p-10 bg-opacity-10 flex justify-center">
          <a href="https://calendly.com/curiouslycory">
            <button className="btn">Schedule a Consultation</button>
          </a>
        </section>
        <section className="px-10 mt-5 flex justify-center">
          <div>
            <button
              onClick={() => setShowDiscord(!showDiscord)}
              className={clsx("btn", { hidden: showDiscord })}
            >
              {!showDiscord ? "Open" : "Close"} Live Chat
            </button>
          </div>
          <DiscordChat channelId="1048328033087541312" isOpen={showDiscord} />
        </section>
      </main>
    </>
  );
};

export default ContactPage;
