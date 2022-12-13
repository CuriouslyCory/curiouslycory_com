import Head from "next/head";
import {
  FaEthereum,
  FaLaptopCode,
  FaMobileAlt,
  FaRegClock,
  FaRegImage,
} from "react-icons/fa";
import { CalendlyLink } from "../components/calendly-link";
import SvgServiceNow from "../components/custom-icons/service-now";
import { SectionTitle } from "../components/section-title";
import { WindowBox } from "../components/window-box";
import { ServicesHero } from "../features/services-page/hero";

export const ServicesPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>CuriouslyCory - Services</title>
        <meta
          name="description"
          content="CuriouslyCory Web Engineering Services Page"
        />
      </Head>
      <main className="flex flex-col justify-center items-center">
        <div className="hidden md:block fixed inset-x-0 top-0 -z-10 whitespace-nowrap">
          <h1 className="text-[400px] text-gray-50">Services</h1>
        </div>
        <ServicesHero />
        <section className="container flex flex-col-reverse md:flex-row justify-between items-center mt-10 md:mt-20">
          <div className="w-full flex justify-center">
            <SectionTitle size="4xl">What can I build for you?</SectionTitle>
          </div>
        </section>
        <section className="mt-10 mx-20 mb-5">
          <div className="grid grid-rows-3 md:grid-rows-none grid-cols-none md:grid-cols-3 justify-between items-center gap-5">
            <WindowBox>
              <FaRegClock size={64} className="mb-4 text-gray-600" />
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Hourly Services
              </h3>
              <ul className="mb-auto mt-auto">
                <li>Hourly Development: $130</li>
                <li>Consultation and Coaching: $150</li>
              </ul>
              <CalendlyLink>
                <button className="btn mt-5">Let&amp;s Chat</button>
              </CalendlyLink>
            </WindowBox>
            <WindowBox>
              <FaRegImage size={64} className="mb-4 text-gray-600" />
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Basic NFT Pack - $350 *
              </h3>
              <ul>
                <li>Minting Site</li>
                <li>Github configuration</li>
                <li>Hosting up to 100GB/mo</li>
                <li>Contract Deployment</li>
              </ul>
              <span className="text-sm mt-5">
                * Does not include contract network deployment fees.
              </span>
              <CalendlyLink>
                <button className="btn mt-5">Get Started</button>
              </CalendlyLink>
            </WindowBox>
            <WindowBox>
              <FaEthereum size={64} className="mb-4 text-gray-600" />
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Basic Token - $250 *
              </h3>
              <ul>
                <li>Token Site</li>
                <li>Github configuration</li>
                <li>Hosting up to 100GB/mo</li>
                <li>Contract Deployment</li>
              </ul>
              <span className="text-sm mt-5">
                * Does not include contract network deployment fees.
              </span>
              <CalendlyLink>
                <button className="btn mt-5">Get Started</button>
              </CalendlyLink>
            </WindowBox>
          </div>
        </section>
        <section className="mx-20 mb-32">
          <div className="grid grid-rows-2 md:grid-rows-none grid-cols-none md:grid-cols-2 justify-between items-center gap-5">
            <WindowBox>
              <FaMobileAlt size={64} className="mb-4 text-gray-600" />
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Mobile App Development
              </h3>
              <p className="text-sm text-gray-700">
                Cross platform mobile apps developed using React Native for a
                native UI feeling with half the development time.
              </p>
              <CalendlyLink>
                <button className="btn mt-5">Learn More</button>
              </CalendlyLink>
            </WindowBox>
            <WindowBox>
              <SvgServiceNow className="mb-4 text-gray-600 text-6xl" />
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                ServiceNow Development
              </h3>
              <p className="text-sm text-gray-700">
                Service Portals, service Catalogs, custom applications, enhance
                your existing tools, or even a brand new deployment.
              </p>
              <CalendlyLink>
                <button className="btn mt-5">Get a Quote</button>
              </CalendlyLink>
            </WindowBox>
          </div>
        </section>
        <section className="w-full bg-slate-700 p-10 bg-opacity-10 flex justify-center mb-32">
          <a href="https://calendly.com/curiouslycory">
            <button className="btn">Schedule a Consultation Now</button>
          </a>
        </section>
      </main>
    </>
  );
};

export default ServicesPage;
