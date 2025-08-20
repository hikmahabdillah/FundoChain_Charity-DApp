import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useContract } from "./useContract";
import type { DonationTypes } from "../types/donation";

export const useDonationListener = () => {
  const { contract } = useContract();
  const [donations, setDonations] = useState<DonationTypes[]>([]);
  const [goal, setGoal] = useState<number | null>(null);

  useEffect(() => {
    // Ambil data goal amount saat kontrak tersedia
    const fetchGoalAmount = async () => {
      if (contract) {
        try {
          const goalAmount = await contract.goalAmount();
          setGoal(parseFloat(ethers.formatEther(goalAmount)));
        } catch (error) {
          console.error("Gagal mengambil goal amount:", error);
        }
      }
    };

    fetchGoalAmount();

    // Pasang listener untuk donasi baru
    if (contract) {
      contract.removeAllListeners("DonationReceived");

      const onDonationReceived = (
        address: string,
        namaDonatur: string,
        message: string,
        isDisplay: boolean,
        amount: ethers.BigNumberish,
        createdAt: ethers.BigNumberish
      ) => {
        const newDonation: DonationTypes = {
          address,
          namaDonatur,
          message,
          isDisplay,
          amount: parseFloat(ethers.formatEther(amount)),
          createdAt: new Date(Number(createdAt) * 1000),
        };
        setDonations((prev) => [newDonation, ...prev]);
      };

      contract.on("DonationReceived", onDonationReceived);

      return () => {
        contract.off("DonationReceived", onDonationReceived);
      };
    }
  }, [contract]);

  return { donations, goal };
};
