import Image from "next/image";
import Link from "next/link";

export const CaseStudies = () => {
  return (
    <section className="w-full mt-32 bg-slate-700 py-10 bg-opacity-10">
      <div className="grid grid-rows-2 md:grid-rows-none grid-cols-none md:grid-cols-2 mx-2 md:mx-20 gap-5 md:gap-10">
        <div className="w-full flex items-center">
          <div className="h-full w-full relative">
            <Image
              src="/images/liqd-perspective.png"
              layout="fill"
              objectFit="contain"
              objectPosition="center"
              alt="screenshot from lqidnft.com"
            />
          </div>
        </div>
        <div className="p-10 glass">
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
      </div>
    </section>
  );
};
