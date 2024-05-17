import Head from "next/head";

export const AboutPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>CuriouslyCory - About Me</title>
        <meta
          name="description"
          content="CuriouslyCory Web Engineering About Me Page"
        />
      </Head>
      <main className="flex flex-col justify-center items-center">
        <div className="hidden md:block absolute inset-x-0 top-0 -z-10">
          <h1 className="text-[400px] text-gray-50">ABOUT ME</h1>
        </div>
        <section className="container flex flex-col-reverse md:flex-row justify-between items-center mt-10 md:mt-20">
          <div>
            <h1 className="text-5xl pb-5">
              Want to learn a little more about me?
            </h1>
            <p>Check out some of my accomplishments and skills!</p>
          </div>
          <div className="mb-10 md:mb-0">&nbsp;</div>
        </section>
        <section className="w-full mt-10 md:mt-20 bg-slate-700 p-10 bg-opacity-10 flex flex-col justify-center">
          <h1 className="text-4xl mb-5">About Me</h1>
          <p>
            I&apos;m CuriouslyCory and I&apos;m curious about your project and
            how I can help you bring it to life. I bring a wide range of
            technical skills from enterprise level full stack development, to
            project management, product ownership, consulting, and process
            management
          </p>
        </section>
        <section className="w-full mt-10 p-10 bg-opacity-10 flex flex-col justify-center">
          <h1 className="text-4xl mb-5">Web3 dev</h1>
          <p>
            I&apos;ve been building personal projects (ERC-20 & ERC-721),
            collaborating with other devs, consulting, and taking on contracts
            in the web3 space for the since early 2021. I have been active in
            the crypto community since 2017, and have a wide and deep
            understanding of the crypto space. Currently working a principal
            developer for Balance Capital/LiqdNft building a suite of DeFi
            tools.
          </p>
        </section>
        <section className="w-full mt-10 bg-slate-700 p-10 bg-opacity-10 flex flex-col justify-center">
          <h1 className="text-4xl mb-5">CTO</h1>
          <p>
            Three years leading all technical aspects for a small company
            including: hardware and software infrastructure, software
            architecture, hiring, mentoring, and project management. Leading
            daily standups with the development team, organizing and leading
            weekly meetings with the CEO and stakeholders.
          </p>
        </section>
        <section className="w-full mt-10 p-10 bg-opacity-10 flex flex-col justify-center">
          <h1 className="text-4xl mb-5">Team Lead & Lead/Sr Developer</h1>
          <p>
            For more than 7 years across 2 large organizations I&apos;ve led
            development teams building enterprise level applications. Working
            with my peers we created effective processes and workflows to keep
            large, complex, interconnected teams organized and able to deliver
            quality work at a rapid pace. Beyond planning and team management I
            also spent a good deal of my time building software architecture
            capable of delivering scalable and highly available business
            critical applications.
          </p>
        </section>
        <section className="w-full mt-10 bg-slate-700 p-10 bg-opacity-10 flex flex-col justify-center">
          <h1 className="text-4xl mb-5">Product Ownership</h1>
          <p>
            During my time as a Lead/Sr. Developer I worked alongside a number
            of great product owners helping them develop product roadmaps,
            solutions to complicated client challenges, organize backlogs,
            prioritize work, and gather the information needed to make all of
            these decisions.
          </p>
        </section>
        <section className="w-full mt-10 p-10 bg-opacity-10 flex flex-col justify-center">
          <h1 className="text-4xl mb-5">Project Management</h1>
          <p>
            Oftentimes my role as Lead developer required me to step back from
            the code to untangle and organize a “simple project” that grew to an
            overwhelming goliath. Luckily I developed a large kit of tools and
            skills, and had great peers who were willing to point me in the
            right direction when I was running out of rope. Having worked on
            projects with such a wide array of complexities, I also know what
            tools to deploy and when, because sometimes over managing a project
            just slows it down, and other times one can hardly get started until
            everything is covered in post-it notes and highlighter marks.
          </p>
        </section>
        <section className="w-full mt-10 bg-slate-700 p-10 bg-opacity-10 flex flex-col justify-center">
          <h1 className="text-4xl mb-5">Customer Service Rep</h1>
          <p>
            Leadership is service. Early in my career I spent a lot of time on
            the phone helping people fix their internet connection. My time on
            the phone helped me hone the ability to listen to people and their
            problems, help those who are frustrated find a solution, and take a
            lot of heat from people who are angry at their situation without
            losing my cool. I&apos;m still driven today by the desire to help
            people solve their problems and succeed wildly.
          </p>
        </section>

        <section className="w-full bg-slate-700 p-10 bg-opacity-10 flex justify-center">
          <a href="https://calendly.com/curiouslycory">
            <button className="btn">Schedule a Consultation Now</button>
          </a>
        </section>
      </main>
    </>
  );
};
