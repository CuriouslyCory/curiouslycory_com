import Head from "next/head";
import Link from "next/link";
import { DiscordChat } from "../../components/discord-chat";

export const FindMePage = (): JSX.Element => {
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
              <li>
                <Link href="https://www.twitter.com/CuriouslyCory">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="https://www.youtube.com/channel/UCASQA6u80u7Py_UHIGFYqVA?view_as=subscriber">
                  YouTube
                </Link>
              </li>
              <li>
                <Link href="https://www.linkedin.com/in/corysougstad/">
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link href="https://discord.gg/r4D9XpDGXN">Discord</Link>
              </li>
              <li>
                <Link href="https://mirror.xyz/curiouslycory.eth">
                  Dev Blog
                </Link>
              </li>
              <li>
                <Link href="https://blog.hau.me/">Maker Blog</Link>
              </li>
              <li>
                <Link href="mailto:cory@curiouslycory.com">Email</Link>
              </li>
            </ul>
          </div>
        </section>
        <section className="w-full bg-slate-700 p-10 bg-opacity-10 flex justify-center">
          <a href="https://calendly.com/curiouslycory">
            <button className="btn">Schedule a Consultation</button>
          </a>
        </section>
        <section className="w-full px-10 mt-5">
          <DiscordChat channelId="1048328033087541312" />
        </section>
      </main>
    </>
  );
};

export default FindMePage;
