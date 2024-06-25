import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import { ConsultationButton } from "../components/consultation-button";
import { HomeHero } from "../features/home-page/hero";
import { Services } from "../features/home-page/services";
import ServicesBox from "../features/home-page/services-box";
import { ValueProp } from "../features/home-page/value-prop";
import { trpc } from "../utils/trpc";

export const HomePage: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

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
        <h1>{hello.data?.greeting}</h1>
        <div className="hidden md:block fixed inset-x-0 top-0 -z-10">
          <h1 className="text-[400px] text-gray-50">CuriouslyCory</h1>
        </div>
        <HomeHero />
        <ServicesBox />
        <section className="mt-16 md:mt-32">
          <ConsultationButton title="Request a free quote" />
        </section>
        <ValueProp />
        <Services />
      </main>
    </>
  );
};

export default HomePage;
