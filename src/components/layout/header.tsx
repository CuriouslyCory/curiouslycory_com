import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import styles from "./header.module.css";

export const Header = (): JSX.Element => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div id="header-wrapper" className="px-2 sm:px-4 py-2.5">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link href="/" className="flex items-center">
          <Image src="/images/cc-logo.svg" width="100" height="120" />
        </Link>
        <button
          onClick={() => setNavOpen(!navOpen)}
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <IoMenu className="text-3xl" />
        </button>
        <div
          className={clsx(
            { hidden: !navOpen },
            "w-full",
            "md:block",
            "md:w-auto"
          )}
          id="navbar-default"
        >
          <ul className="flex flex-col p-4 mt-4 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
            <li>
              <Link href="/">
                <span className={styles.navLink}>Home</span>
              </Link>
            </li>
            <li>
              <Link href="/services" className={styles.navLink}>
                <span className={styles.navLink}>Services</span>
              </Link>
            </li>
            <li>
              <Link href="/about" className={styles.navLink}>
                <span className={styles.navLink}>About</span>
              </Link>
            </li>
            <li>
              <Link href="/contact-us" className={styles.navLink}>
                <span className={styles.navLink}>Contact Us</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
