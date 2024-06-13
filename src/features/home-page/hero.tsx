import Image from "next/image";

export const HomeHero = (): JSX.Element => {
  return (
    <section className="container flex flex-col-reverse md:flex-row justify-between items-center mt-10 md:mt-20">
      <div>
        <h1 className="text-5xl pb-5">Hi, I&apos;m CuriouslyCory!</h1>
        <p>
          Stand out from the competition with a stunning website crafted by
          experts.
        </p>
      </div>
      <div className="mb-10 md:mb-0">
        <Image
          src="/images/me.jpg"
          width="155"
          height="155"
          className="rounded-full"
          alt="Picture of CuriouslyCory"
        />
      </div>
    </section>
  );
};
