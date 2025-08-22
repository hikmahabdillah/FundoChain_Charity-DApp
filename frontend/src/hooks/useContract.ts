import { ethers } from "ethers";
import { useConnectWallet } from "./useConnectWallet";
import { useEffect, useState } from "react";

// import file JSON ABI and contract address
import abi from "../contracts/abi/Donation.json";

type ContractABi = ethers.Interface | ethers.InterfaceAbi;
type ContractAddress = {
  [chainId: string]: string | undefined;
};

const addresses: ContractAddress = {
  "31337": import.meta.env.VITE_CONTRACT_ADDRESS_LOCAL,
  "11155111": import.meta.env.VITE_CONTRACT_ADDRESS_SEPOLIA,
};

export const useContract = () => {
  const { provider, account } = useConnectWallet();
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  useEffect(() => {
    const getContractInstance = async () => {
      if (!provider || !account) {
        setContract(null);
        return;
      }

      const network = await provider.getNetwork();
      const chainId = network.chainId.toString();

      // Ambil Contract Address dari objek ADDRESSES
      const contractAddress = addresses[chainId];

      if (contractAddress) {
        try {
          // Buat instance Signer untuk mengirim transaksi
          const signer = await provider.getSigner();
          const contractInstance = new ethers.Contract(
            contractAddress,
            abi.abi as ContractABi,
            signer
          );
          setContract(contractInstance);
        } catch (error) {
          console.error("Gagal membuat instance kontrak:", error);
          setContract(null);
        }
      } else {
        console.warn(
          `Alamat kontrak tidak ditemukan untuk Chain ID: ${chainId}`
        );
        setContract(null);
      }
    };

    getContractInstance();
  }, [provider, account]);

  return { contract };
};
