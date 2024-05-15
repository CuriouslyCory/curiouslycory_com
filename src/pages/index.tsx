import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  //const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="CuriouslyCory Web Engineering" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <h1>Hello World</h1>
      </main>
    </>
  );
};

export default Home;
