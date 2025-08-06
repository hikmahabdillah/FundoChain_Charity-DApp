import React from "react";
import DonationSteps from "../DonationSteps";
import { steps } from "../../data/donationStep";
import type { DonationStepsProps } from "../../types/steps";

const HowItWorksSection = () => {
  return (
    <section
      id="how-it-works"
      className="w-full relative grid place-items-center overflow-hidden bg-yellow py-28 mt-14"
    >
      <img
        src="/collaboration.webp"
        width={"200px"}
        className="absolute bottom-0 -left-5 opacity-25 z-0 -rotate-18"
        alt=""
      />
      <img
        src="/collaboration.webp"
        width={"200px"}
        className="absolute top-0 -right-5 opacity-25 z-0 rotate-45"
        alt=""
      />
      <div className="flex flex-wrap items-center justify-center gap-14 md:gap-8 w-full z-1">
        {steps.map((step: DonationStepsProps, index: number) => (
          <DonationSteps
            key={index}
            icon={step.icon}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
