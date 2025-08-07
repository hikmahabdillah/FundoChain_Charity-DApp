import type React from "react";

type CardProps = {
  className?: string;
  children: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ className, children }) => (
  <div className={`rounded-lg p-4 shadow ${className}`}>{children}</div>
);

const TransactionsSection = () => {
  return (
    <section id="transactions" className=" w-full">
      <div className="flex items-center gap-14">
        <div className="w-full h-0.5 bg-dark-brown"></div>
        <div className="flex items-center justify-center w-[200px]">
          <img src="/leftHand.webp" width={"100px"} height={"50px"} alt="" />
          <img src="/rightHand.webp" width={"100px"} height={"50px"} alt="" />
        </div>
        <div className="w-full h-0.5 bg-dark-brown"></div>
      </div>
      <div className="flex flex-col items-center justify-center mt-10">
        <h2 className="font-semibold text-5xl text-center text-dark-brown">
          Together We Can Make a Difference
        </h2>
        <p className="mt-4 text-md text-dark-brown w-full max-w-2xl text-center">
          Thank you for being a part of this journey. Below is a summary of our
          fundraising progress and generous supporters.
        </p>
      </div>
      <div className="grid grid-cols-3 grid-rows-4 gap-4 p-6 bg-[#fef5ea] h-auto w-full max-w-5xl mx-auto my-10">
        {/* Goals Card */}
        <Card className="col-span-1 row-span-2 !shadow-none flex flex-col gap-2 text-dark-brown self-center">
          <h3 className="font-semibold text-lg">Goals</h3>
          <div className="flex gap-1 items-center">
            <img src="/Ethereum.webp" width={"50px"} alt="" />
            <div>
              <h4 className="font-semibold text-2xl leading-5.5">10 ETH</h4>
              <h4 className="font-semibold text-md leading-5.5">$20000</h4>
            </div>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white border border-brown">
            <div className="w-[32%] h-full bg-yellow-400 rounded-full"></div>
          </div>
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-lg leading-5.5">32%</h4>
            <h4 className="font-semibold text-md leading-5.5">Progress</h4>
          </div>
        </Card>

        {/* Raised Card */}
        <Card className="col-span-1 row-span-4 bg-gradient-to-b from-light-yellow to-cream text-dark-brown flex flex-col items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full">
            <div className="w-full h-0.75 bg-dark-brown"></div>
            <h3 className="font-semibold text-lg text-nowrap">Raised</h3>
            <div className="w-full h-0.75 bg-dark-brown"></div>
          </div>
          <div className="flex gap-1 items-center">
            <img src="/Ethereum.webp" width={"70px"} alt="" />
            <div className="self-center mt-2">
              <h4 className="font-semibold text-4xl leading-7.5">10 ETH</h4>
              <h4 className="font-semibold text-lg leading-7.5">$20000</h4>
            </div>
          </div>
          <p className="text-sm text-center text-dark-brown font-semibold">
            Keep the momentum going — we're almost there!
          </p>
        </Card>

        {/* Latest Donations Card */}
        <Card className="col-span-1 row-span-3 bg-emerald-900 flex flex-col justify-between gap-3">
          <div className="flex items-center gap-3 w-full">
            <h3 className="font-medium text-lg text-nowrap text-light-yellow">
              Latest Donations
            </h3>
            <div className="w-full h-0.75 bg-light-yellow"></div>
          </div>
          <p className="text-sm text-light-yellow font-medium">
            Testnet Ethereum Sepolia
          </p>
        </Card>

        {/* Total Donors Card */}
        <Card className="col-span-1 row-span-2 flex flex-col gap-3 bg-white text-dark-brown">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-lg text-nowrap">Total Donors</h3>
            <div className="w-full h-0.75 bg-dark-brown"></div>
          </div>
          <div className="flex gap-1 ms-2">
            <h3 className="font-semibold text-4xl text-yellow text-nowrap">
              128
            </h3>
            <h4 className="font-semibold text-md self-end">People</h4>
          </div>
          <p className="text-sm text-dark-brown font-medium">
            Thank you to every kind soul who has contributed.
          </p>
        </Card>

        {/* Call to Action Card */}
        <Card className="col-span-1 row-span-1 bg-light-yellow flex items-center justify-center text-dark-brown font-semibold">
          <div className="flex items-center gap-3 mx-8">
            <img src="/Two Hearts.webp" width={"40px"} alt="" />
            <h3 className="font-semibold text-md">
              Bring happiness to their lives
            </h3>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default TransactionsSection;
