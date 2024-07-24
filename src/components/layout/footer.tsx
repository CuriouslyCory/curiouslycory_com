import Link from "next/link";
import React from "react";
import { FaTwitter } from "react-icons/fa";
import { routes } from "../../constants/routes";
import { socialLinks } from "../../constants/socials";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="mx-2 md:mx-20 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm font-semibold mb-3 md:mb-0">
          Copyright CuriouslyCory {new Date().getFullYear()}
        </p>
        <div className="flex flex-col gap-5">
          <ul className="flex items-center mb-6 md:mb-0">
            {routes.map((route) => (
              <li key={`footer-route-${route.title}`} className="mr-3">
                <Link href={route.path}>
                  <button className="inline-block text-gray-600 hover:text-white">
                    {route.title}
                  </button>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex items-center justify-end">
            {socialLinks.map((social) => (
              <li className="mr-3" key={`footer-social-${social.title}`}>
                <a href={social.href}>
                  <social.Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
