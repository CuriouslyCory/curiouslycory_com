export const ServicesHero = (): JSX.Element => {
  return (
    <section className="w-full services-hero-bg pt-20 pb-20 mx-2 md:mx-20">
      <div className="container flex flex-col-reverse md:flex-row justify-between items-center mt-10 md:mt-20 mb-20 px-2 md:px-20">
        <div className="mb-20 bg-[#f7f5f2]/80 p-5 shadow-lg">
          <h1 className="text-5xl pb-5">
            Full Stack <span className="hero-underline">and More</span>
          </h1>
          <p>
            Stand out from the competition with a stunning website crafted by
            experts.
          </p>
        </div>
      </div>
    </section>
  );
};
