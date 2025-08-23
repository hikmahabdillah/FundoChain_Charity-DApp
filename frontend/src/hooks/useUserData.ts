import { useState } from "react";
import { ethers } from "ethers";
import { useConnectWallet } from "./useConnectWallet";

export const useUserData = () => {
  const { provider } = useConnectWallet(); // Dapatkan provider dari hook Anda
  const [balance, setBalance] = useState<string | number>("0");

  const fetchBalance = async (address: string) => {
    if (!provider || !address) {
      setBalance("0");
      return;
    }

    try {
      const balanceBigInt = await provider.getBalance(address); // Dapatkan saldo dari provider
      const balanceInEther = ethers.formatEther(balanceBigInt); // Gunakan formatEther untuk konversi
      setBalance(Number(balanceInEther).toFixed(4));
    } catch (error) {
      console.error("Failed to fetch balance:", error);
      setBalance("0");
    }
  };
  return { balance, fetchBalance };
};
