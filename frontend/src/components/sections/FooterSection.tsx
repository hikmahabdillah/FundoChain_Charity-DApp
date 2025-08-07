import type React from "react";
import type { NavItem } from "../../types/navmenu";

const FooterSection: React.FC = () => {
  const navItems: NavItem[] = [
    { label: "Home", href: "#hero" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Donations", href: "#transactions" },
    { label: "About", href: "#about" },
  ];
  return (
    <div className="flex flex-col py-10 gap-4 items-center justify-center text-dark-brown border-t border-brown mt-20">
      <img src="/fundochain-logo.webp" width={"100px"} alt="" />
      {/* Navigation Links */}
      <ul className="hidden md:flex items-center gap-6 text-md text-dark-brown font-medium">
        {navItems.map((item) => (
          <li key={item.label}>
            <a href={item.href} className="hover:text-red-500 transition">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-8 underline">
        <a
          href="https://github.com/hikmahabdillah/Simple-Decentralized-Charity-App"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
        <a
          href="mailto:hikmahaldrin44@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Email
        </a>
      </div>
      <p className="mt-4 text-md text-dark-brown text-center font-medium">
        © 2025 FundoChain. Built on Ethereum Sepolia. All rights reserved.
      </p>
    </div>
  );
};

export default FooterSection;
