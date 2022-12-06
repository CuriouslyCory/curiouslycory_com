import React from "react";
import { FaLaptopCode, FaMobileAlt } from "react-icons/fa";

import { GiChaingun } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";

const ServicesBox = () => {
  return (
    <section className="mt-32 mx-20">
      <h2 className="text-4xl mb-10 text-center hl-underline">
        Full Stack and More
      </h2>
      <div className="grid grid-rows-4 md:grid-rows-none grid-cols-none md:grid-cols-4 justify-between items-center gap-5">
        <div className="w-full flex flex-col justify-center items-center text-center px-4 py-6 bg-slate-700 p-10 bg-opacity-10 shadow-md">
          <FaLaptopCode size={64} className="mb-4 text-gray-600" />
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Web Development
          </h3>
          <p className="text-sm text-gray-700">
            Our experienced developers can help you build a custom website that
            is tailored to your business needs.
          </p>
        </div>
        <div className="w-full flex flex-col justify-center items-center text-center px-4 py-6 bg-slate-700 p-10 bg-opacity-10 shadow-md">
          <GiChaingun size={64} className="mb-4 text-gray-600" />
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Web 3 and Blockchain
          </h3>
          <p className="text-sm text-gray-700">
            Our skilled web 3 artisans can help you create take your business
            into the blockchain.
          </p>
        </div>
        <div className="w-full flex flex-col justify-center items-center text-center px-4 py-6 bg-slate-700 p-10 bg-opacity-10 shadow-md">
          <FaMobileAlt size={64} className="mb-4 text-gray-600" />
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Mobile App Development
          </h3>
          <p className="text-sm text-gray-700">
            Our team can help you create a cross-platform mobile app to improve
            your business&apos;s reach and engagement.
          </p>
        </div>
        <div className="w-full flex flex-col justify-center items-center text-center px-4 py-6 bg-slate-700 p-10 bg-opacity-10 shadow-md">
          <IoIosPeople size={64} className="mb-4 text-gray-600" />
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Consulting Services
          </h3>
          <p className="text-sm text-gray-700">
            Don&apos;t know where to start? Our team can identify your
            project&apos;s needs and create a plan to achieve your goals.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesBox;
