import React from "react";
import { useCryptoPrices } from "../hooks/useCryptoPrices";
import type { DonationFormTypes } from "../types/donationForm";
import toast from "react-hot-toast";

const DonationForm = ({
  onClose,
  isOpen,
}: {
  onClose: () => void;
  isOpen: boolean;
}) => {
  const [ethInUSD, setEthInUSD] = React.useState<number>(0);
  const { ethPrice } = useCryptoPrices();
  const [showConfirm, setShowConfirm] = React.useState<boolean>(false);

  const [formData, setFormData] = React.useState<DonationFormTypes>({
    amount: 0.001,
    name: "",
    message: "",
    isDisplay: false,
  });

  // Update the ETH to USD conversion whenever the amount or ETH price changes
  React.useEffect(() => {
    if (!ethPrice) return;
    const price: number = formData.amount * (ethPrice?.usd ?? 0);
    setEthInUSD(price);
  }, [formData.amount, ethPrice]);

  // validate form data before submission
  const validateFormData = () => {
    if (formData.amount < 0.001)
      return toast.error(
        "Minimum donation is 0.001 ETH to ensure smooth transactions."
      );
    return true;
  };

  const resetForm = () => {
    setFormData({
      amount: 0.001,
      name: "",
      message: "",
      isDisplay: false,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFormData()) return;
    setShowConfirm(true);
  };

  const confirmDonation = () => {
    console.log("Valid Donation Data:", formData);
    toast.success("Donation successful! Thank you for your support ✨");
    setShowConfirm(false);
    onClose();
    resetForm();
  };

  return (
    <>
      <div
        id="crud-modal"
        tabIndex={-1}
        // aria-hidden={!isOpen}
        className={`min-h-screen overflow-hidden fixed top-0 right-0 left-0 z-40 
        justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full 
        bg-cream/25 bg-opacity-50 ${isOpen ? "flex" : "hidden"}`}
        onClick={onClose}
      >
        <div
          className="relative p-4 w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
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
                onClick={onClose}
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
            <form className="p-5 space-y-4" onSubmit={handleSubmit}>
              {/* Amount & Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-[#5C2E00]">
                    Amount (in ETH)
                  </label>
                  <input
                    type="number"
                    placeholder="0,001"
                    step={0.001}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        amount: parseFloat(e.target.value),
                      })
                    }
                  />
                  <p className="text-dark-brown font-medium mt-2">
                    ${ethInUSD.toFixed(2)}
                  </p>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-semibold text-[#5C2E00] text-nowrap">
                    Your Name (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Aldrin"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      });
                    }}
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
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      message: e.target.value,
                    });
                  }}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                ></textarea>
              </div>

              {/* Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  id="display-name"
                  type="checkbox"
                  checked={formData.isDisplay}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      isDisplay: e.target.checked,
                    });
                  }}
                  className="w-4 h-4 rounded border-gray-300 focus:ring-yellow-400 text-yellow-400"
                />
                <label
                  htmlFor="display-name"
                  className="text-sm text-[#5C2E00]"
                >
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

      {/* Confirmation Popup */}
      {showConfirm && (
        <div
          className="fixed bg-black/50 inset-0 flex items-start pt-10 justify-center z-50"
          onClick={() => setShowConfirm(false)}
        >
          <div
            className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-[#5C2E00] mb-4">
              Confirm Your Donation
            </h3>
            <p className="mb-2">
              Amount: <strong>{formData.amount} ETH</strong> (~$
              {ethInUSD.toFixed(2)})
            </p>
            <p className="mb-4 text-sm text-gray-600">
              This transaction cannot be undone. Please confirm your details
              before proceeding.
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-[#5C2E00] font-semibold"
                onClick={confirmDonation}
              >
                Confirm & Donate
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DonationForm;
