import React from "react";
import Card from "../common/Card";
import CountUp from "../CountUp";

interface RaisedCardProps {
  props: {
    formatTotalRaised: number;
    loading: boolean;
    raisedPrice: string | null;
  };
}

const RaisedCard = React.forwardRef<HTMLDivElement, RaisedCardProps>(
  ({ props }, ref) => {
    return (
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
              <CountUp
                from={0}
                to={props.formatTotalRaised}
                separator=","
                duration={3}
                className="count-up-text font-semibold text-4xl leading-7.5"
              />
              <h4 className="font-semibold text-4xl leading-7.5">ETH</h4>
            </div>
            <h4 className="font-semibold text-lg leading-7.5">
              {props.loading && <div>Loading...</div>}
              {props.raisedPrice}
            </h4>
          </div>
        </div>
        <p className="text-sm text-center text-dark-brown font-semibold">
          Keep the momentum going — we're almost there!
        </p>
      </Card>
    );
  }
);

export default RaisedCard;
