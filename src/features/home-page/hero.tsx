import Image from "next/image";

export const HomeHero = (): JSX.Element => {
  return (
    <section className="w-full hero-bg pt-20 pb-20">
      <div className="container flex flex-col-reverse md:flex-row justify-between items-center mt-10 md:mt-20 mb-20 mx-2 md:mx-10">
        <div className="mb-20 bg-[#f7f5f2]/80 p-5 shadow-lg">
          <h1 className="text-5xl pb-5">Web Development Simplified</h1>
          <p>
            Stand out from the competition with a stunning website crafted by
            experts.
          </p>
        </div>
      </div>
    </section>
  );
};
