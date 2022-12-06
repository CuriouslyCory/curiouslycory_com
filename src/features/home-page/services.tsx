import { CalendlyLink } from "../../components/calendly-link";

export const Services = (): JSX.Element => {
  return (
    <section className="w-full mt-10 md:mt-20 p-10 mb-10 md:mb-40 bg-opacity-10 flex justify-center">
      <div className="container flex flex-col md:flex-row items-center">
        <div className="flex-none">
          <h1 className="text-5xl pb-5">Some of the services we provide</h1>
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
          <CalendlyLink>
            <button className="btn">Book a Free Consultation</button>
          </CalendlyLink>
        </div>
      </div>
    </section>
  );
};
