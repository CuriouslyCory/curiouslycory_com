import Image from "next/image";
import Link from "next/link";

export const CaseStudies = () => {
  return (
    <section className="mt-32 bg-slate-700 py-10 bg-opacity-10 border w-full">
      <div className="grid grid-rows-2 md:grid-rows-none grid-cols-none md:grid-cols-2 gap-5 md:gap-10 mx-auto border w-fit">
        <div className="perspective-left flex items-center justify-center">
          <Image
            src="/images/liqd-2.jpg"
            height="500"
            width="500"
            alt="screenshot from lqidnft.com"
            className="transform-perspective"
          />
        </div>
        <div className="p-10 glass max-w-2xl">
          <h3 className="text-3xl mb-5">
            Case Study: <Link href="https://liqdnft.com">LiqdNft.com</Link> - A
            NFT Marketplace and Lending Platform
          </h3>
          <p className="mb-5">
            I have worked with LiqdNft.com with the goal of creating a
            one-stop-shop for all things NFT (non-fungible tokens). The platform
            needed to serve as both a marketplace for buying and selling NFTs
            and a lending platform for users to borrow and lend their NFTs to
            others.
          </p>
          <p className="mb-5">
            To ensure the success of the project, I began by carefully planning
            the data models and researching the best framework for the
            application. Working closely with the designers and product owners I
            helped define all the user stories and ensure that the platform
            would meet the needs of our users. I also worked with the
            stakeholders to establish clear goals and timelines for the project.
          </p>
          <p className="mb-5">
            The end result was a sleek and user-friendly platform that met all
            of the requirements and exceeded the expectations of the LiqdNFT
            team. LiqdNft.com has since become a leading destination for buying,
            selling, and lending NFTs, thanks in part to the strong foundation I
            helped build.
          </p>
          <Link href="https://liqdnft.com">https://liqdnft.com</Link>
        </div>

        <div className="p-10 glass max-w-2xl">
          <h3 className="text-3xl mb-5">
            Case Study: <Link href="https://cozy.express">Cozy Express</Link> -
            Narrative driven NFT project
          </h3>
          <p className="mb-5">
            Cozy Express was looking for a developer to help them translate
            their rough mockups into a full interactive web experience. Working
            with them to understand their vision I was able to create a rich and
            engaging experience that was both fun and easy to use.
          </p>
          <p className="mb-5">
            I also provided consulting services, identifying the best
            development stack and hosting solutions that would best fit their
            needs.
          </p>
          <p className="mb-5">
            Pleased with the results, they engaged me to also build their NFT
            smart contract and minting page. Based on their target audience I
            selected the web3 tools that would give them the most flexibility
            and ease of use with the least amount of time to implement.
          </p>
          <Link href="https://cozy.express">https://cozy.express</Link>
        </div>
        <div className="perspective-right flex items-center justify-center">
          <Image
            src="/images/cozy-case-study.png"
            height="500"
            width="500"
            alt="screenshot from cozy.express"
            className="transform-perspective"
          />
        </div>

        <div className="perspective-left flex items-center justify-center">
          <Image
            src="/images/forge-case-study.png"
            height="500"
            width="500"
            alt="screenshot from forge nft"
            className="transform-perspective"
          />
        </div>
        <div className="p-10 glass max-w-2xl">
          <h3 className="text-3xl mb-5">
            Case Study:{" "}
            <Link href="https://forge.mechachaotic.com">
              MechaChaotic Forge
            </Link>{" "}
            - Forge Your NFT
          </h3>
          <p className="mb-5">
            Forge was a challenging but really fun project to work on. The
            concept was simple enough, allow people who own an NFT to layer
            additional traits onto their NFTs to create something new and
            unique. The two primary challenges were implementing the team&apos;s
            unique and complex design and processing the images in a way that
            would support a wide variety of NFT projects.
          </p>
          <p className="mb-5">
            At a static resolution implementing the design would have been a
            breeze, but in today&apos;s modern world providing an interface that
            will work just as well on mobile as a desktop is imperitive.
            Implementing the design required developing a lot of custom
            components that would allow me to implement complex scalable borders
            and text.
          </p>
          <p className="mb-5">
            Most NFT images were not a problem to process, being either jpegs or
            pngs, but targeting Neotokyo Citizens I knew we needed SVG support.
            At first glance this would be easy, with many image libraries
            providing great SVG support, but none of them would download
            embedded images, which Neotokyo Citizens relys on. After a lot of
            work, I was able to develop a solution that was able to download and
            process these images. Even better, these functions work as lambdas
            or serverless functions rather than relying on hosting and
            maintaining a server for the API.
          </p>
          <Link href="https://forge.mechachaotic.com">
            https://forge.mechachaotic.com
          </Link>
        </div>
      </div>
    </section>
  );
};
