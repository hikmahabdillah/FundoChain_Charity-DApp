import { ethers } from "ethers";
import React from "react";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useEthers = () => {
  const [provider, setProvider] = React.useState<ethers.BrowserProvider | null>(
    null
  );
  const [account, setAccount] = React.useState<string | null>(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask tidak ditemukan!");
      return;
    }

    // Minta izin akses akun
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    // Buat provider dari MetaMask
    const newProvider = new ethers.BrowserProvider(window.ethereum);

    setProvider(newProvider);
    setAccount(formatAccount(accounts[0]));

    console.log("Wallet terhubung:", formatAccount(accounts[0]));
  };

  // format akun untuk ditampilkan
  const formatAccount = (acc: string) => {
    return acc.slice(0, 5) + "..." + acc.slice(-4);
  };

  const getProvider = () => {
    if (!provider) throw new Error("Provider belum diinisialisasi.");
    return provider;
  };

  const getAccount = () => {
    if (!account) throw new Error("Wallet belum terhubung.");
    return account;
  };

  // agar otomatis koneksi saat halaman dimuat
  React.useEffect(() => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setAccount(formatAccount(accounts[0]));
            setProvider(new ethers.BrowserProvider(window.ethereum));
          }
        });
    }
  }, []);

  return {
    connectWallet,
    getProvider,
    getAccount,
    account,
    provider,
  };
};
