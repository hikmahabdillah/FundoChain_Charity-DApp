import type React from "react";
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
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-[#fef4e8]"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
    >
      <nav className="w-full max-w-[1450px] mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <a
          href="https://github.com/hikmahabdillah/Simple-Decentralized-Charity-App"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/fundochain-logo-text.webp"
            height={"50px"}
            width={"175px"}
            alt="Love Icon"
          />
        </a>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-6 text-md text-brown font-medium">
          {navItems.map((item) => (
            <li key={item.label}>
              <a href={item.href} className="hover:text-red-500 transition">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Connect Wallet Button */}
        <Button
          type="button"
          text="Connect Wallet"
          className="bg-gradient-to-r from-yellow to-red text-sm font-semibold text-white !py-2.5"
          onClick={() => alert("Clicked")}
        />
      </nav>
    </motion.header>
  );
};

export default Navbar;
