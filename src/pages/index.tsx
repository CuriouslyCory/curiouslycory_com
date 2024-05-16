import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  //const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  return (
    <>
      <Head>
        <title>CuriouslyCory Web Application Engineer</title>
        <meta name="description" content="CuriouslyCory Web Engineering" />
        <link rel="icon" href="/favicon.ico" key="icon" />
      </Head>

      <main>
        <section className="hero">
          <h1 className="text-5xl">Hi, I&apos;m CuriouslyCory!</h1>
          <p>
            I&apos;ve been making ideas come to life on the web since 2005.
            Schedule a consultation now and let&apos;s start working on yours!
          </p>
        </section>
      </main>
    </>
  );
};

export default Home;
