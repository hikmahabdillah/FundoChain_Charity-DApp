import React from "react";
import type { DonationStepsProps } from "../types/steps";
import { motion } from "motion/react";

const DonationSteps: React.FC<DonationStepsProps> = ({
  icon,
  title,
  description,
  delay = 0,
}) => {
  return (
    <motion.div
      className="flex flex-col gap-2 items-center text-center px-4 text-dark-brown w-full max-w-xs"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: delay },
      }}
      viewport={{ once: true }}
    >
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-sm font-medium">{description}</p>
    </motion.div>
  );
};

export default DonationSteps;
