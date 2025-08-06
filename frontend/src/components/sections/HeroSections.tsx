import Button from "../common/Button";
import { motion } from "motion/react";

const HeroSections = () => {
  return (
    <section
      id="hero"
      className="pt-24 h-[850px] w-full relative grid place-items-center pb-9 overflow-hidden"
    >
      <div className="w-full max-w-4xl flex flex-col items-center justify-center gap-5 p-5">
        <img src="/collaboration.webp" width={"70px"} alt="" />
        <h1 className="font-bold text-6xl text-center p-5 bg-gradient-to-r from-red to-yellow bg-clip-text text-transparent">
          Small Funds, Big Impact
        </h1>
        <p className="font-medium text-center text-dark-brown -mt-4 mb-3 w-[90%]">
          Even the smallest contributions can spark change. FundoChain empowers
          you to donate securely and transparently through blockchain
          technology.{" "}
        </p>
        <Button
          type="button"
          text="Contribute"
          icon={<img src="/Two Hearts.webp" width={"30px"} alt="Love Icon" />}
          className="bg-brown text-sm font-semibold hover:bg-yellow text-dark-brown !rounded-full"
          onClick={() => {
            const section = document.getElementById("transactions");
            section?.scrollIntoView();
          }}
        />
        <motion.img
          src="/cuate.webp"
          width={"300px"}
          alt=""
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: 0.5 },
          }}
        />
      </div>
      <div className="absolute bottom-5 left-0">
        <motion.img
          src="/mountains-left.webp"
          alt=""
          initial={{ opacity: 0, x: -100 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, delay: 1 },
          }}
        />
      </div>
      <div className="absolute bottom-10 right-0">
        <motion.img
          src="/mountains-right.webp"
          alt=""
          initial={{ opacity: 0, x: 100 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, delay: 0.75 },
          }}
        />
      </div>
    </section>
  );
};

export default HeroSections;
