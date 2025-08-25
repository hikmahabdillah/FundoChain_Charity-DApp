import React from "react";
import { FaEthereum, FaClock, FaWallet } from "react-icons/fa";

interface UserMenuProps {
  formatBalance: string | number;
  ethPrice: object | number | null;
  getPrice: string | null;
}

const UserMenu: React.FC<UserMenuProps> = ({
  formatBalance,
  ethPrice,
  getPrice,
}) => {
  return (
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
          className="flex items-center gap-2 p-4 text-sm text-yellow-900 hover:bg-orange-100"
        >
          <FaClock /> Transaction History
        </a>
      </li>
      <li>
        <button
          // onClick={onDisconnect}
          className="w-full text-left flex items-center gap-2 p-4 text-sm text-red-600 hover:bg-red-100"
        >
          <FaWallet /> Disconnect Wallet
        </button>
      </li>
    </ul>
  );
};

export default UserMenu;
