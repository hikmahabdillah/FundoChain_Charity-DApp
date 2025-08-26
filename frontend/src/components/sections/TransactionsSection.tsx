import React, { useEffect } from "react";
import Button from "../common/Button";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { useCryptoPrices, useGetPriceInUSD } from "../../hooks/useCryptoPrices";
import DonationForm from "../DonationForm";
import { useDonationListener } from "../../hooks/useDonationListener";
import { useConnectWallet } from "../../hooks/useConnectWallet";
import { useUserData } from "../../hooks/useGetBalance";
import toast from "react-hot-toast";
import GoalsCard from "../card/GoalsCard";
import RaisedCard from "../card/RaisedCard";
import LatestDonationCard from "../card/LatestDonationCard";
import TotalDonorsCard from "../card/TotalDonorsCard";
import Card from "../common/Card";

const TransactionsSection = () => {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const { donations, goal } = useDonationListener();
  const goalsEth = goal ?? 0;
  const uniqueAddresses = new Set();
  donations.forEach((donation) => {
    uniqueAddresses.add(donation.address);
  });
  const totalDonaturs = uniqueAddresses.size;

  const { account } = useConnectWallet();
  const { fetchBalance } = useUserData();

  const handleButtonClick = () => {
    !account
      ? toast.error("Please connect your wallet to donate.")
      : setShowModal(true);
  };

  useEffect(() => {
    if (account) {
      fetchBalance(account);
    }
  }, [account, fetchBalance]);

  console.log("donations", donations);

  const { ref } = useInView({
    triggerOnce: true,
    threshold: 0,
  });

  function shortenAddress(address: string): string {
    const start = address.slice(0, 5);
    const end = address.slice(-4);
    return `${start}......${end}`;
  }

  const datas = donations;
  const transactions = datas.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const latestDonations = transactions.slice(0, 4).map((item) => ({
    amount: item.amount,
    from: shortenAddress(item.address),
    isDisplay: item.isDisplay,
    name: item.donorName ?? "",
  }));

  const totalRaised = datas.reduce(
    (acc, transaction) => acc + (transaction.amount ?? 0),
    0
  );
  const formatTotalRaised = parseFloat(totalRaised.toFixed(3));

  const { ethPrice, loading, error } = useCryptoPrices();
  const goalsPrice = useGetPriceInUSD(goalsEth, ethPrice?.usd ?? 0);
  const raisedPrice = useGetPriceInUSD(totalRaised, ethPrice?.usd ?? 0);

  const progress = (totalRaised / goalsEth) * 100;
  if (error) return <div>Error: {error}</div>;

  return (
    <section id="transactions" className="w-full relative">
      <div className="flex items-center gap-14 pt-10">
        <motion.div
          className="h-0.5 bg-dark-brown"
          initial={{ opacity: 0, width: 0 }}
          whileInView={{
            opacity: 1,
            width: "100%",
            transition: { duration: 1 },
          }}
          viewport={{ once: true }}
        ></motion.div>
        <div className="flex items-center justify-center w-[200px]">
          <motion.img
            src="/leftHand.webp"
            width={"100px"}
            height={"50px"}
            alt=""
            initial={{ opacity: 0, x: -100 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { duration: 1 },
            }}
            viewport={{ once: true }}
          />
          <motion.img
            src="/rightHand.webp"
            width={"100px"}
            height={"50px"}
            alt=""
            initial={{ opacity: 0, x: 100 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { duration: 1 },
            }}
            viewport={{ once: true }}
          />
        </div>
        <motion.div
          className="h-0.5 bg-dark-brown"
          initial={{ opacity: 0, width: 0 }}
          whileInView={{
            opacity: 1,
            width: "100%",
            transition: { duration: 1 },
          }}
          viewport={{ once: true }}
        ></motion.div>
      </div>
      <div className="flex flex-col items-center justify-center mt-10 p-5">
        <motion.h2
          className="font-semibold text-3xl md:text-5xl  text-center text-dark-brown"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: 0.5 },
          }}
          viewport={{ once: true }}
        >
          Together We Can Make a Difference
        </motion.h2>
        <motion.p
          className="mt-4 text-sm md:text-base text-dark-brown w-full max-w-2xl text-center font-medium"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: 0.75 },
          }}
          viewport={{ once: true }}
        >
          Thank you for being a part of this journey. Below is a summary of our
          fundraising progress and generous supporters.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 grid-rows-6 sm:grid-cols-2 lg:grid-cols-3 md:grid-rows-4 gap-4 p-6 bg-[#fef5ea] h-auto w-full max-w-5xl mx-auto mt-7">
        {/* Goals Card */}
        <GoalsCard
          ref={ref}
          props={{ goalsEth, loading, progress, goalsPrice }}
        />

        {/* Raised Card */}
        <RaisedCard
          ref={ref}
          props={{ formatTotalRaised, loading, raisedPrice }}
        />

        {/* Latest Donations Card */}
        <LatestDonationCard ref={ref} props={{ latestDonations }} />

        {/* Total Donors Card */}
        <TotalDonorsCard ref={ref} props={{ totalDonaturs }} />

        {/* Call to Action Card */}
        <Card
          ref={ref}
          className="col-span-1 row-span-1 !p-0 shadow-none flex items-center justify-center text-dark-brown font-semibold"
        >
          <div className=" pointer-events-none">
            <img src="/coingecko.png" alt="CoinGecko" className="w-full" />
          </div>
        </Card>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 p-5">
        <p className="mt-4 text-md text-dark-brown text-center font-medium">
          Be part of the change. Every contribution matters.
        </p>
        <Button
          type="button"
          text="Donate Now"
          icon={<img src="/Donate.webp" width={"30px"} alt="Love Icon" />}
          className="bg-brown text-md font-semibold hover:bg-yellow text-dark-brown !rounded-full"
          onClick={handleButtonClick}
        />
      </div>
      {showModal && (
        <DonationForm isOpen={showModal} onClose={() => setShowModal(false)} />
      )}
    </section>
  );
};

export default TransactionsSection;
