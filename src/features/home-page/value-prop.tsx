import { CalendlyLink } from "../../components/calendly-link";

export const ValueProp = (): JSX.Element => {
  return (
    <section className="w-full mt-16 md:mt-32 bg-slate-700 p-10 bg-opacity-10 flex justify-center">
      <div className="mx-2 md:mx-20 flex flex-col md:flex-row items-center">
        <div className="">
          <h1 className="text-5xl pb-5 hl-underline">What can I do for you?</h1>
          <p className="mb-5">
            I am dedicated to helping businesses like yours succeed online. I
            offer a range of web development services, including custom website
            design, e-commerce solutions, and mobile app development. I will
            work closely with you to understand your unique needs and create a
            website that is tailored to your business.
          </p>
          <p className="mb-5">
            With my help, you can improve your online presence, increase your
            visibility to potential customers, and drive more traffic and sales
            to your website. I take pride in delivering high-quality,
            user-friendly websites that are optimized for search engines and
            easy to navigate. Whether you&apos;re looking to revamp your current
            website or build a new one from scratch, I am here to help you
            achieve your goals.
          </p>
          <p className="font-semibold">
            <CalendlyLink>Reach out today</CalendlyLink> to learn more about how
            I can help your business thrive online.
          </p>
        </div>
      </div>
    </section>
  );
};
