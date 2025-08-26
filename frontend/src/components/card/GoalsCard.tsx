import React from "react";
import Card from "../common/Card";
import CountUp from "../CountUp";
import { motion } from "motion/react";

interface GoalsCardProps {
  props: {
    goalsEth: number;
    loading: boolean;
    progress: number;
    goalsPrice: string | null;
  };
}

const GoalsCard = React.forwardRef<HTMLDivElement, GoalsCardProps>(
  ({ props }, ref) => {
    return (
      <Card
        ref={ref}
        className="col-span-1 row-span-2 !shadow-none flex flex-col gap-2 text-dark-brown self-center"
      >
        <h3 className="font-semibold text-lg">Goals</h3>
        <div className="flex gap-1 items-center">
          <img src="/Ethereum.webp" width={"50px"} alt="" />
          <div>
            <div className="flex items-center gap-1">
              <CountUp
                from={0}
                to={props.goalsEth}
                separator=","
                duration={3}
                className="count-up-text font-semibold text-2xl"
              />
              <h4 className="font-semibold text-2xl leading-7.5">ETH</h4>
            </div>
            <motion.h4 className="font-semibold text-md leading-5.5">
              {props.loading ? <div>Loading...</div> : props.goalsPrice}
            </motion.h4>
          </div>
        </div>
        <div className="w-full h-1.5 rounded-full bg-white border border-brown">
          <div
            className={"h-full bg-yellow-400 rounded-full"}
            style={{
              width: `${props.progress ? props.progress.toFixed(0) : 0}%`,
            }}
          ></div>
        </div>
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-lg leading-5.5">
            {props.progress ? props.progress.toFixed(2) : 0}%
          </h4>
          <h4 className="font-semibold text-md leading-5.5">Progress</h4>
        </div>
      </Card>
    );
  }
);

export default GoalsCard;
