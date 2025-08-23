import { ethers } from "ethers";
import React from "react";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useConnectWallet = () => {
  const [provider, setProvider] = React.useState<ethers.BrowserProvider | null>(
    null
  );
  const [account, setAccount] = React.useState<string | null>(null);

  const formatAccount = (acc: string) => {
    return acc.slice(0, 5) + "..." + acc.slice(-4);
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask tidak ditemukan!");
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const newProvider = new ethers.BrowserProvider(window.ethereum);
    setProvider(newProvider);
    setAccount(formatAccount(accounts[0]));
  };

  // Auto connect + listener
  React.useEffect(() => {
    if (!window.ethereum) return;

    // Cek apakah wallet sudah pernah terhubung
    window.ethereum
      .request({ method: "eth_accounts" })
      .then((accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setProvider(new ethers.BrowserProvider(window.ethereum));
        }
      });

    // Listener jika akun berubah
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length > 0) {
        setAccount(formatAccount(accounts[0]));
        setProvider(new ethers.BrowserProvider(window.ethereum));
      } else {
        // jika disconnect
        setAccount(null);
        setProvider(null);
      }
    };

    // Listener jika network berubah
    const handleChainChanged = () => {
      window.location.reload();
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);

    // Cleanup listener saat komponen di-unmount
    // agar tidak ada listener ganda ketika komponen di-render ulang
    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, []);

  return { provider, formatAccount, account, connectWallet };
};
