import React from "react";
import type { DonationStepsProps } from "../types/steps";

const DonationSteps: React.FC<DonationStepsProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col gap-2 items-center text-center px-4 text-dark-brown w-full max-w-xs">
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-sm font-medium">{description}</p>
    </div>
  );
};

export default DonationSteps;
