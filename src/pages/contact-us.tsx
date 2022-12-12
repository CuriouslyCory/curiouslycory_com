import clsx from "clsx";
import Head from "next/head";
import { useState } from "react";
import { DiscordChat } from "../components/discord-chat";
import { SocialLink } from "../components/social-link";
import { socialLinks } from "../constants/socials";

export const ContactUsPage = (): JSX.Element => {
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
      <main className="flex flex-col justify-center items-center">
        <div className="hidden md:block fixed inset-x-0 top-0 -z-10 whitespace-nowrap">
          <h1 className="text-[400px] text-gray-50">Find Me</h1>
        </div>
        <section className="container flex flex-col-reverse md:flex-row justify-between items-center mt-10 md:mt-20">
          <div>
            <h1 className="text-5xl pb-5">
              Looking to get in touch or follow along?
            </h1>
            <p>
              Here are many of the places you can find me around the internet.
            </p>
          </div>
          <div className="mb-10 md:mb-0">&nbsp;</div>
        </section>
        <section className="w-full mt-10 md:mt-20 bg-slate-700 p-10 bg-opacity-10 flex justify-center">
          <div className="container flex-col justify-center">
            <h1 className="text-4xl mb-5">Look for me on...</h1>
            <ul>
              {socialLinks.map((link) => (
                <SocialLink key={`social-link-${link.title}`} {...link} />
              ))}
            </ul>
          </div>
        </section>
        <section className="w-full bg-slate-700 p-10 bg-opacity-10 flex justify-center">
          <a href="https://calendly.com/curiouslycory">
            <button className="btn">Schedule a Consultation</button>
          </a>
        </section>
        <section className="w-full px-10 mt-5 flex justify-center">
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

export default ContactUsPage;
