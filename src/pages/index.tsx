import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
//import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  //const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  return (
    <>
      <NextSeo
        title="CuriouslyCory Web Development"
        description="CuriouslyCory Web Engineering"
        canonical="https://www.curiouslycory.com/"
        openGraph={{
          url: "https://www.curiouslycory.com/",
          site_name: "SiteName",
        }}
        twitter={{
          handle: "@CuriouslyCory",
          site: "@CuriouslyCory",
          cardType: "summary_large_image",
        }}
      />

      <main className="flex flex-col justify-center items-center">
        <div className="hidden md:block fixed inset-x-0 top-0 -z-10">
          <h1 className="text-[400px] text-gray-50">CuriouslyCory</h1>
        </div>
        <section className="container flex flex-col-reverse md:flex-row justify-between items-center mt-10 md:mt-20">
          <div>
            <h1 className="text-5xl pb-5">Hi, I&apos;m CuriouslyCory!</h1>
            <p>
              I&apos;ve been making ideas come to life on the web since 2005.
              Schedule a consultation now and let&apos;s start working on yours!
            </p>
          </div>
          <div className="mb-10 md:mb-0">
            <Image
              src="/images/me.jpg"
              width="155"
              height="155"
              className="rounded-full"
              alt="Picture of CuriouslyCory"
            />
          </div>
        </section>
        <section className="w-full mt-10 md:mt-20 bg-slate-700 p-10 bg-opacity-10 flex justify-center">
          <div className="container flex flex-col md:flex-row items-center">
            <div className="flex-none">
              <h1 className="text-5xl pb-5">What can I do for you?</h1>
              <ul>
                <li>Web3</li>
                <li>Solidity</li>
                <li>NFTs &amp; Minting Sites</li>
                <li>Crypto Tokens</li>
                <li>Project Forks</li>
                <li>Coaching</li>
                <li>Consultation</li>
                <li>Project Managment</li>
              </ul>
            </div>
            <div className="flex-1 flex justify-center">
              <a
                href="https://calendly.com/curiouslycory"
                target="_blank"
                rel="noreferrer"
              >
                <button className="btn">Book a Free Consultation</button>
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
