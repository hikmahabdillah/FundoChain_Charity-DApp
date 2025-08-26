import React from "react";
import { motion } from "motion/react";

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

export default Card;
