import React, { use } from "react";
import Button from "../common/Button";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import CountUp from "../CountUp";
import { useInView } from "react-intersection-observer";
import { useCryptoPrices, useGetPriceInUSD } from "../../hooks/useCryptoPrices";
import { data } from "../../data/dummy";

type CardProps = {
  className?: string;
  children: React.ReactNode;
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children }, ref) => (
    <motion.div
      className={`rounded-lg p-4 shadow ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{
        opacity: 1,
        transition: { duration: 1, delay: 0.5 },
      }}
      viewport={{ once: true }}
      ref={ref}
    >
      {children}
    </motion.div>
  )
);

const TransactionsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  function shortenAddress(address: string): string {
    const start = address.slice(0, 5); // ambil 10 karakter pertama
    const end = address.slice(-4); // ambil 8 karakter terakhir
    return `${start}......${end}`;
  }

  const datas = data;
  const transactions = datas.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const latestDonations = transactions.slice(0, 4).map((item) => ({
    amount: item.amount,
    from: shortenAddress(item.address),
    isDisplay: item.isDisplay,
    name: item.namaDonatur,
  }));

  const totalDonaturs = datas.length;

  const totalRaised = datas.reduce(
    (acc, transaction) => acc + (transaction.amount ?? 0),
    0
  );

  const { ethPrice, loading, error } = useCryptoPrices();
  const goalsEth = 15; // 15 eth
  const goalsPrice = useGetPriceInUSD(goalsEth, ethPrice?.usd ?? 0); // 15 eth
  const raisedPrice = useGetPriceInUSD(totalRaised, ethPrice?.usd ?? 0); //10 eth

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
        <Card
          ref={ref}
          className="col-span-1 row-span-2 !shadow-none flex flex-col gap-2 text-dark-brown self-center"
        >
          <h3 className="font-semibold text-lg">Goals</h3>
          <div className="flex gap-1 items-center">
            <img src="/Ethereum.webp" width={"50px"} alt="" />
            <div>
              <div className="flex items-center gap-1">
                <div ref={ref}>
                  {inView && (
                    <CountUp
                      from={0}
                      to={10}
                      separator=","
                      duration={3}
                      className="count-up-text font-semibold text-2xl"
                    />
                  )}
                </div>
                <h4 className="font-semibold text-2xl leading-7.5">ETH</h4>
              </div>
              <motion.h4 className="font-semibold text-md leading-5.5">
                {loading && <div>Loading...</div>}
                {goalsPrice}
              </motion.h4>
            </div>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white border border-brown">
            <div className="w-[32%] h-full bg-yellow-400 rounded-full"></div>
          </div>
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-lg leading-5.5">
              {progress.toFixed(2)}%
            </h4>
            <h4 className="font-semibold text-md leading-5.5">Progress</h4>
          </div>
        </Card>

        {/* Raised Card */}
        <Card
          ref={ref}
          className="col-span-1 row-span-4 bg-gradient-to-b from-light-yellow to-cream text-dark-brown flex flex-col items-center justify-between gap-3"
        >
          <div className="flex items-center gap-2 w-full">
            <div className="w-full h-0.75 bg-dark-brown"></div>
            <h3 className="font-semibold text-lg text-nowrap">Raised</h3>
            <div className="w-full h-0.75 bg-dark-brown"></div>
          </div>
          <div className="flex gap-1 items-center">
            <img src="/Ethereum.webp" width={"70px"} alt="" />
            <div className="self-center mt-2">
              <div ref={ref} className="flex items-center gap-2">
                {inView && (
                  <CountUp
                    from={0}
                    to={totalRaised}
                    separator=","
                    duration={3}
                    className="count-up-text font-semibold text-4xl leading-7.5"
                  />
                )}
                <h4 className="font-semibold text-4xl leading-7.5">ETH</h4>
              </div>
              <h4 className="font-semibold text-lg leading-7.5">
                {loading && <div>Loading...</div>}
                {raisedPrice}
              </h4>
            </div>
          </div>
          <p className="text-sm text-center text-dark-brown font-semibold">
            Keep the momentum going — we're almost there!
          </p>
        </Card>

        {/* Latest Donations Card */}
        <Card
          ref={ref}
          className="col-span-1 row-span-3 bg-emerald-900 flex flex-col justify-between gap-3"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 w-full">
              <h3 className="font-medium text-lg text-nowrap text-light-yellow">
                Latest Donations
              </h3>
              <div className="w-full h-0.75 bg-light-yellow"></div>
            </div>
            <div className="flex flex-col gap-1">
              {latestDonations.map((donation, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between font-medium text-white"
                >
                  <li>{donation.amount} ETH</li>
                  <p>
                    from {donation?.isDisplay ? donation.name : donation.from}
                  </p>
                </div>
              ))}
              <Link
                to={"/transactions-log"}
                className="font-medium underline text-light-yellow self-end mt-3"
              >
                View all
              </Link>
            </div>
          </div>
          <p className="text-sm text-light-yellow font-medium">
            Testnet Ethereum Sepolia
          </p>
        </Card>

        {/* Total Donors Card */}
        <Card
          ref={ref}
          className="col-span-1 row-span-2 flex flex-col gap-3 bg-white text-dark-brown"
        >
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-lg text-nowrap">Total Donors</h3>
            <div className="w-full h-0.75 bg-dark-brown"></div>
          </div>
          <div className="flex gap-1 ms-2">
            <div ref={ref}>
              {inView && (
                <CountUp
                  from={0}
                  to={totalDonaturs}
                  separator=","
                  duration={2}
                  className="font-semibold text-4xl text-yellow text-nowrap"
                />
              )}
            </div>
            <h4 className="font-semibold text-md self-end">People</h4>
          </div>
          <p className="text-sm text-dark-brown font-medium">
            Thank you to every kind soul who has contributed.
          </p>
        </Card>

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
          showModal={true}
        />
      </div>
    </section>
  );
};

export default TransactionsSection;
