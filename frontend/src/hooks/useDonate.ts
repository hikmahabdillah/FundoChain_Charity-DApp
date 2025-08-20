import { useState } from "react";
import { ethers } from "ethers";
import { useContract } from "./useContract";
import type { DonationFormTypes } from "../types/donationForm";

export const useDonate = () => {
  const { contract } = useContract();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const donate = async (formData: DonationFormTypes) => {
    if (!contract) {
      setError("Contract not initialized");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const donationAmount = ethers.parseEther(formData.amount.toString());

      const tx = await contract.donate(
        formData.name,
        formData.message,
        formData.isDisplay,
        { value: donationAmount }
      );
      await tx.wait();
      console.log("Donation successful:", tx);
    } catch (err) {
      console.error("Donation failed:", err);
      setError("Failed to process donation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { donate, isLoading, error };
};
