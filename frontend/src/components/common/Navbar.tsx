import React, { useEffect } from "react";
import Button from "./Button";
import type { NavItem } from "../../types/navmenu";
import { motion } from "motion/react";
import { useConnectWallet } from "../../hooks/useConnectWallet";
import { FaEthereum, FaClock, FaWallet } from "react-icons/fa";
import { useUserData } from "../../hooks/useGetBalance.ts";
import { useCryptoPrices, useGetPriceInUSD } from "../../hooks/useCryptoPrices";

const navItems: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Donations", href: "#transactions" },
  { label: "About", href: "#about" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState<boolean>(false);
  const { account, formatAccount, connectWallet } = useConnectWallet();
  const { balance, fetchBalance } = useUserData();
  const { ethPrice } = useCryptoPrices();
  const getPrice = useGetPriceInUSD(
    parseFloat(String(balance)),
    ethPrice?.usd || 0
  );

  useEffect(() => {
    fetchBalance(account || "");
  }, [fetchBalance]);

  const formatBalance = parseFloat(Number(balance).toFixed(3));

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

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
          {!account && (
            <Button
              type="button"
              text="Connect Wallet"
              className="bg-gradient-to-r from-yellow to-red text-sm font-semibold text-white !py-2.5 transition-all duration-300 hover:scale-95"
              onClick={connectWallet}
            />
          )}
          {account && (
            <Button
              type="button"
              text={formatAccount(account)}
              icon={
                <img src="/User.png" alt="Wallet Icon" className="w-4 h-4" />
              }
              className="rounded-xl border-2 shadow-sm border-dark-brown/10 text-sm font-semibold text-yellow !py-2.5 transition-all duration-300 hover:scale-95"
              onClick={toggleUserMenu}
            />
          )}
        </div>
        {account && isUserMenuOpen && (
          <div
            className="shadow-md absolute top-20 right-15 z-50 my-4 text-base list-none bg-amber-50 divide-y divide-orange-100 rounded-lg"
            id="user-dropdown"
          >
            <ul className="py-2">
              <li>
                <span className="text-sm text-dark-brown font-semibold ps-3 py-2 block">
                  Current Balance
                </span>
                <div className="flex items-center gap-2 ps-2 pe-3 py-2 hover:bg-orange-100 border-l-4 border-brown bg-cream/10">
                  <FaEthereum size={30} />
                  <div className="flex flex-col">
                    <span className="text-lg text-dark-brown font-semibold">
                      {formatBalance} ETH
                    </span>
                    {ethPrice && getPrice ? (
                      <span className="text-sm text-dark-brown/80 font-medium ">
                        ≈ {getPrice} USD
                      </span>
                    ) : (
                      <span className="text-sm text-dark-brown/80 font-medium ">
                        Fetching price...
                      </span>
                    )}
                  </div>
                </div>
              </li>
              <hr className="text-cream/20 mx-2 h-1" />
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-yellow-900 hover:bg-orange-100"
                >
                  <FaClock /> Transaction History
                </a>
              </li>
              <li>
                <button
                  // onClick={onDisconnect}
                  className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                >
                  <FaWallet /> Disconnect Wallet
                </button>
              </li>
            </ul>
          </div>
        )}
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
              {!account && (
                <Button
                  type="button"
                  text="Connect Wallet"
                  className="w-full bg-gradient-to-r from-yellow to-red text-sm font-semibold text-white !py-2.5 transition-all duration-300 hover:scale-95"
                  onClick={connectWallet}
                />
              )}
              {account && (
                <Button
                  type="button"
                  text={formatAccount(account)}
                  icon={
                    <img
                      src="/User.png"
                      alt="Wallet Icon"
                      className="w-4 h-4"
                    />
                  }
                  onClick={toggleUserMenu}
                  className="w-full rounded-lg border-2 shadow-sm border-dark-brown/10 text-sm font-semibold text-yellow !py-2.5 transition-all duration-300 hover:scale-95"
                />
              )}
            </li>
          </ul>
        </div>
      )}
    </motion.header>
  );
};

export default Navbar;
