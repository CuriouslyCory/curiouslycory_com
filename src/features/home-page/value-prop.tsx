import { CalendlyLink } from "../../components/calendly-link";

export const ValueProp = (): JSX.Element => {
  return (
    <section className="w-full mt-10 md:mt-40 bg-slate-700 p-10 bg-opacity-10 flex justify-center">
      <div className="container flex flex-col md:flex-row items-center">
        <div className="">
          <h1 className="text-5xl pb-5">What can we do for you?</h1>
          <p className="mb-5">
            My team and I are dedicated to helping businesses like yours succeed
            online. We offer a range of web development services, including
            custom website design, e-commerce solutions, and mobile app
            development. Our team will work closely with you to understand your
            unique needs and create a website that is tailored to your business.
          </p>
          <p className="mb-5">
            With our help, you can improve your online presence, increase your
            visibility to potential customers, and drive more traffic and sales
            to your website. We take pride in delivering high-quality,
            user-friendly websites that are optimized for search engines and
            easy to navigate. Whether you&apos;re looking to revamp your current
            website or build a new one from scratch, we are here to help you
            achieve your goals.
          </p>
          <p>
            <CalendlyLink>Contact us today</CalendlyLink> to learn more about
            how we can help your business thrive online.
          </p>
        </div>
      </div>
    </section>
  );
};
