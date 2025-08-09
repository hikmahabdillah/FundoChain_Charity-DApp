import { useEffect, useState } from "react";

type EthPrice = {
  usd: number;
};

export const useCryptoPrices = () => {
  const [ethPrice, setEthPrice] = useState<EthPrice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEthPrice = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&x_cg_demo_api_key=CG-64GosnbdSLshvqP15uhD1PpR"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch ETH price");
      }
      const data = await response.json();
      setEthPrice({ usd: data.ethereum.usd });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEthPrice();
    const interval = setInterval(fetchEthPrice, 300_000);
    return () => clearInterval(interval);
  }, []);

  return { ethPrice, loading, error, refetch: fetchEthPrice };
};

export const useGetPriceInUSD = (eth: number, getPrice: number) => {
  const priceInUSD = eth * getPrice;

  return priceInUSD ? `$${priceInUSD.toFixed(2)}` : "$0.00";
};
