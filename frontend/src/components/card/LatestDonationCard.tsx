import React from "react";
import { Link } from "react-router-dom";
import Card from "../common/Card";

interface TotalDonorsCardProps {
  props: {
    latestDonations: {
      amount: number;
      from: string;
      name: string;
      isDisplay: boolean;
    }[];
  };
}

const LatestDonationCard = React.forwardRef<
  HTMLDivElement,
  TotalDonorsCardProps
>(({ props }, ref) => {
  return (
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
          {props.latestDonations.length > 0 ? (
            props.latestDonations.map((donation, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between font-medium text-white"
              >
                <li>{donation.amount} ETH</li>
                <p>
                  from {donation?.isDisplay ? donation.name : donation.from}
                </p>
              </div>
            ))
          ) : (
            <p className="text-white text-center">No donations yet</p>
          )}
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
  );
});

export default LatestDonationCard;
