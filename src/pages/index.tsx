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
        <h1 className="text-5xl">Hello World</h1>
        <p>Content test</p>
      </main>
    </>
  );
};

export default Home;
