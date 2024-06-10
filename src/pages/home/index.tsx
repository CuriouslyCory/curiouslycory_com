import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { CalendlyLink } from "../../components/calendly-link";
import { HomeHero } from "./hero";
import { Services } from "./services";
import { ValueProp } from "./value-prop";
//import { trpc } from "../utils/trpc";

export const HomePage: NextPage = () => {
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
        <HomeHero />
        <ValueProp />
        <Services />
      </main>
    </>
  );
};

export default HomePage;
