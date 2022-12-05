import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm font-semibold mb-3 md:mb-0">
          Copyright CuriouslyCory {new Date().getFullYear()}
        </p>
        <ul className="flex items-center mb-6 md:mb-0">
          <li className="mr-3">
            <Link href="/">
              <button className="inline-block text-gray-600 hover:text-white">
                Home
              </button>
            </Link>
          </li>
          <li className="mr-3">
            <Link href="/services">
              <button className="inline-block text-gray-600 hover:text-white">
                Services
              </button>
            </Link>
          </li>
          <li className="mr-3">
            <Link href="/about">
              <button className="inline-block text-gray-600 hover:text-white">
                About
              </button>
            </Link>
          </li>
          <li className="mr-3">
            <Link href="/find-me">
              <button className="inline-block text-gray-600 hover:text-white">
                Contact Us
              </button>
            </Link>
          </li>
        </ul>
        <ul className="flex items-center">
          <li className="mr-3">
            <a href="#">
              <i className="fab fa-twitter fa-lg"></i>
            </a>
          </li>
          <li className="mr-3">
            <a href="#">
              <i className="fab fa-facebook-f fa-lg"></i>
            </a>
          </li>
          <li className="mr-3">
            <a href="#">
              <i className="fab fa-instagram fa-lg"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fab fa-linkedin-in fa-lg"></i>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
