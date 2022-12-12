import { CalendlyLink } from "../../components/calendly-link";

export const Services = (): JSX.Element => {
  return (
    <section className="w-full mt-10 md:mt-32 p-10 mb-10 md:mb-40 bg-opacity-10 flex justify-center">
      <div className="container flex flex-col md:flex-row items-center">
        <div className="flex-none">
          <h2 className="text-5xl pb-5 hl-underline">
            Some of the services we provide
          </h2>
          <ul>
            <li>React Development</li>
            <li>Angular Development</li>
            <li>Web3</li>
            <li>Solidity</li>
            <li>NFTs &amp; Minting Sites</li>
            <li>ERC20 Tokens</li>
            <li>New Websites</li>
            <li>Website Updates</li>
            <li>App Development</li>
            <li>ServiceNow</li>
            <li>Coaching</li>
            <li>Consultation</li>
            <li>Project Managment</li>
            <li>
              Don&apos;t see what you&apos;re looking for?{" "}
              <CalendlyLink>Let&apos;s chat!</CalendlyLink>
            </li>
          </ul>
        </div>
        <div className="flex-1 flex justify-center">
          <CalendlyLink>
            <button className="btn">Book a Free Consultation</button>
          </CalendlyLink>
        </div>
      </div>
    </section>
  );
};
