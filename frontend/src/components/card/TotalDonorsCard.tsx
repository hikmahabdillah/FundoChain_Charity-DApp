import React from "react";
import Card from "../common/Card";
import CountUp from "../CountUp";

interface TotalDonorsCardProps {
  props: {
    totalDonaturs: number;
  };
}

const TotalDonorsCard = React.forwardRef<HTMLDivElement, TotalDonorsCardProps>(
  ({ props }, ref) => {
    return (
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
            <CountUp
              from={0}
              to={props.totalDonaturs}
              separator=","
              duration={2}
              className="font-semibold text-4xl text-yellow text-nowrap"
            />
          </div>
          <h4 className="font-semibold text-md self-end">People</h4>
        </div>
        <p className="text-sm text-dark-brown font-medium">
          Thank you to every kind soul who has contributed.
        </p>
      </Card>
    );
  }
);

export default TotalDonorsCard;
