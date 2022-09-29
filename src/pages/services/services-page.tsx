import Head from "next/head";

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
        <div className="hidden md:block absolute inset-x-0 top-0 -z-10">
          <h1 className="text-[400px] text-gray-50">SERVICES</h1>
        </div>
        <section className="container flex flex-col-reverse md:flex-row justify-between items-center mt-10 md:mt-20">
          <div>
            <h1 className="text-5xl pb-5">What can I build for you?</h1>
            <p>
              We have standard rates and package deals to offer. Let me know how
              I can help you!
            </p>
          </div>
          <div className="mb-10 md:mb-0">&nbsp;</div>
        </section>
        <section className="w-full mt-10 md:mt-20 bg-slate-700 p-10 bg-opacity-10 flex justify-center">
          <h1>Standard Rates</h1>
          <ul>
            <li>Hourly Development: $130</li>
            <li>Consultation and Coaching: $150</li>
          </ul>
        </section>
        <section className="w-full bg-slate-700 p-10 bg-opacity-10 flex justify-center">
          <h1>Packages</h1>
          <ul>
            <li>Basic NFT Pack - $350 (plus contract deployment fees)</li>
            <ul>
              <li>Minting Site</li>
              <li>Github configuration</li>
              <li>Hosting up to 100GB/mo</li>
              <li>Contract Deployment</li>
            </ul>
            <li>Basic Token - $250 (plus contract deployment fees)</li>
            <ul>
              <li>Token Site</li>
              <li>Github configuration</li>
              <li>Hosting up to 100GB/mo</li>
              <li>Contract Deployment</li>
            </ul>
          </ul>
        </section>
        <section className="w-full bg-slate-700 p-10 bg-opacity-10 flex justify-center">
          <a href="https://calendly.com/curiouslycory">
            <button className="btn">Schedule a Consultation Now</button>
          </a>
        </section>
      </main>
    </>
  );
};
