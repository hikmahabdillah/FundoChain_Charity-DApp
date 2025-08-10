import React from "react";
import { useCryptoPrices } from "../hooks/useCryptoPrices";

const FormModal = () => {
  const [amount, setAmount] = React.useState<number>(0.0001);
  const [ethInUSD, setEthInUSD] = React.useState<number>(0);
  const { ethPrice } = useCryptoPrices();

  React.useEffect(() => {
    if (!ethPrice) return;
    const price: number = amount * (ethPrice?.usd ?? 0);
    setEthInUSD(price);
  }, [amount, ethPrice]);

  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="min-h-screen hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-cream/25 bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-md">
        {/* Modal content */}
        <div className="relative bg-white rounded-2xl shadow-sm">
          {/* Modal header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-200 rounded-t">
            <h3 className="text-lg font-semibold text-[#5C2E00]">
              Send Donation
            </h3>
            <button
              type="button"
              className="text-[#5C2E00] bg-transparent hover:bg-gray-100 rounded-lg w-8 h-8 flex justify-center items-center"
              data-modal-toggle="crud-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Modal body */}
          <form className="p-5 space-y-4">
            {/* Amount & Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-semibold text-[#5C2E00]">
                  Amount (in ETH)
                </label>
                <input
                  type="number"
                  placeholder="0,0001"
                  min={0.0001}
                  step={0.0001}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value))}
                />
                <p className="text-dark-brown font-medium mt-2">
                  ${ethInUSD.toFixed(2)}
                </p>
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold text-[#5C2E00]">
                  Your Name (optional)
                </label>
                <input
                  type="text"
                  placeholder="Aldrin"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-[#5C2E00]">
                Message
              </label>
              <textarea
                rows={3}
                placeholder="Type your message"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              ></textarea>
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-2">
              <input
                id="display-name"
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 focus:ring-yellow-400 text-yellow-400"
              />
              <label htmlFor="display-name" className="text-sm text-[#5C2E00]">
                Display name publicly
              </label>
            </div>

            {/* Donate button */}
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-[#5C2E00] font-semibold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              Donate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
