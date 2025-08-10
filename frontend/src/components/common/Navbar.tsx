import React from "react";
import Button from "./Button";
import type { NavItem } from "../../types/navmenu";
import { motion } from "motion/react";

const navItems: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Donations", href: "#transactions" },
  { label: "About", href: "#about" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 bg-[#fef4e8]"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
    >
      <nav className="w-full max-w-[1450px] mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <a
          href="https://github.com/hikmahabdillah/Simple-Decentralized-Charity-App"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* Teks logo untuk sm ke atas */}
          <img
            src="/fundochain-logo-text.webp"
            height="50"
            width="175"
            alt="Fundochain Logo Text"
            className="hidden sm:block"
          />
          {/* Logo icon untuk bawah sm */}
          <img
            src="/fundochain-logo.webp"
            height="50"
            width="65"
            alt="Fundochain Logo"
            className="block sm:hidden"
          />
        </a>

        {/* Hamburger button - tampil di bawah md */}
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Navigation Links - desktop */}
        <ul className="hidden md:flex items-center gap-6 text-md text-brown font-medium">
          {navItems.map((item) => (
            <li key={item.label}>
              <a href={item.href} className="hover:text-red-500 transition">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Connect Wallet Button - desktop */}
        <div className="hidden md:block">
          <Button
            type="button"
            text="Connect Wallet"
            className="bg-gradient-to-r from-yellow to-red text-sm font-semibold text-white !py-2.5"
            onClick={() => alert("Clicked")}
          />
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#fef4e8] border-t border-gray-200">
          <ul className="flex flex-col gap-4 p-4 text-md text-brown font-medium">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="hover:text-red-500 transition"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Button
                type="button"
                text="Connect Wallet"
                className="w-full bg-gradient-to-r from-yellow to-red text-sm font-semibold text-white !py-2.5"
                onClick={() => {
                  alert("Clicked");
                  setIsOpen(false);
                }}
              />
            </li>
          </ul>
        </div>
      )}
    </motion.header>
  );
};

export default Navbar;
