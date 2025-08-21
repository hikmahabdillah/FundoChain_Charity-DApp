import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useContract } from "./useContract";
import type { DonationTypes } from "../types/donation";

export const useDonationListener = () => {
  const { contract } = useContract();
  const [donations, setDonations] = useState<DonationTypes[]>([]);
  const [goal, setGoal] = useState<number | null>(null);

  useEffect(() => {
    const fetchDonationsAndListen = async () => {
      if (contract) {
        try {
          // const pastEvents = await contract.queryFilter("DonationReceived");
          const getDonations = await contract.getDonationsList();
          const formattedDonations: DonationTypes[] = getDonations
            .map((donation: any) => ({
              address: donation.donor,
              donorName: donation.name,
              message: donation.message,
              isDisplay: donation.isAnonymous,
              amount: parseFloat(ethers.formatEther(donation.amount)),
              createdAt: new Date(Number(donation.timestamp) * 1000),
            }))
            .sort(
              (a: any, b: any) => b.createdAt.getTime() - a.createdAt.getTime()
            ); // Sort from newest to oldest
          setDonations(formattedDonations);

          // const formattedPastDonations: DonationTypes[] = pastEvents
          //   .map((event: any) => {
          //     const [address, amount, timestamp, name, message, isAnonymous] =
          //       event.args;
          //     return {
          //       address: address,
          //       donorName: name,
          //       message: message,
          //       isDisplay: isAnonymous,
          //       amount: parseFloat(ethers.formatEther(amount)),
          //       createdAt: new Date(Number(timestamp) * 1000),
          //     };
          //   })
          //   .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); // Urutkan dari yang terbaru

          // setDonations(formattedPastDonations);

          const goalAmount = await contract.goalAmount();
          setGoal(parseFloat(ethers.formatEther(goalAmount)));

          contract.removeAllListeners("DonationReceived");

          const onDonationReceived = (
            address: string,
            amount: ethers.BigNumberish,
            timestamp: ethers.BigNumberish,
            name: string,
            message: string,
            isAnonymous: boolean
          ) => {
            const newDonation: DonationTypes = {
              address,
              donorName: name,
              message,
              isDisplay: isAnonymous,
              amount: parseFloat(ethers.formatEther(amount)),
              createdAt: new Date(Number(timestamp) * 1000),
            };
            setDonations((prev) => [newDonation, ...prev]);
          };

          contract.on("DonationReceived", onDonationReceived);

          // Cleanup function
          return () => {
            contract.off("DonationReceived", onDonationReceived);
          };
        } catch (error) {
          console.error("Gagal mengambil data donasi:", error);
        }
      }
    };

    fetchDonationsAndListen();
  }, [contract]);

  return { donations, goal };
};
