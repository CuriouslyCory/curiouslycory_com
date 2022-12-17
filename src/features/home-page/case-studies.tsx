import Image from "next/image";

export const CaseStudies = () => {
  return (
    <section className="w-full mt-32 bg-slate-700 py-10 bg-opacity-10">
      <div className="grid grid-rows-2 md:grid-rows-none grid-cols-none md:grid-cols-2 mx-2 md:mx-20 gap-5 md:gap-10">
        <div className="w-full flex items-center">
          <div className="h-full w-full relative border-2 border-slate-300">
            <Image
              src="/images/liqd-2.jpg"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              alt="screenshot from lqidnft.com"
            />
          </div>
        </div>
        <div className="p-10 glass">
          <h3 className="text-3xl mb-5">
            Case Study: LiqdNft.com - A NFT Marketplace and Lending Platform
          </h3>
          <p className="mb-5">
            LiqdNft.com approached our web development company with the goal of
            creating a one-stop-shop for all things NFT (non-fungible tokens).
            The platform needed to serve as both a marketplace for buying and
            selling NFTs and a lending platform for users to borrow and lend
            their NFTs to others.
          </p>
          <p className="mb-5">
            To ensure the success of the project, we began by carefully planning
            the data models and researching the best framework for the
            application. After thorough analysis, we determined that the Laravel
            framework would provide the necessary scalability and security for
            the platform.
          </p>
          <p className="mb-5">
            Next, we worked closely with the designers and product owners to
            define all the user stories and ensure that the platform would meet
            the needs of our users. We also worked with the stakeholders to
            establish clear goals and timelines for the project.
          </p>
          <p className="mb-5">
            With all of these pieces in place, we were able to begin the
            development process. We implemented best practices in the code base
            and worked efficiently to deliver a high-quality product on
            schedule.
          </p>
          <p className="mb-5">
            The end result was a sleek and user-friendly platform that met all
            of the requirements and exceeded the expectations of our client.
            LiqdNft.com has since become a leading destination for buying,
            selling, and lending NFTs, thanks in part to the strong foundation
            we helped build.
          </p>
        </div>
      </div>
    </section>
  );
};
