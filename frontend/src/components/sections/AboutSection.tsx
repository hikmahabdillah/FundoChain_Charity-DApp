import { motion } from "motion/react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 w-full ps-18 overflow-hidden">
      <div className="flex items-center gap-5">
        <motion.h2
          className="font-semibold text-5xl text-center text-dark-brown text-nowrap"
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            transition: { duration: 0.5, delay: 0.5 },
          }}
          viewport={{ once: true, amount: 0.5 }}
        >
          About FundoChain
        </motion.h2>
        <motion.div
          className="w-full h-1 bg-dark-brown"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: { duration: 0.5 },
          }}
          viewport={{ once: true, amount: 0.5 }}
        ></motion.div>
      </div>
      <div className="flex flex-col-reverse gap-16 pe-5 h-auto mt-8 lg:flex-row w-full max-w-[85rem] mr-auto">
        <motion.p
          className="font-medium text-dark-brown text-justify text-lg flex-1 min-w-[300px]"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: { duration: 0.5 },
          }}
          viewport={{ once: true, amount: 0.5 }}
        >
          FundoChain is a decentralized donation prototype built on blockchain
          to demonstrate how transparent, traceable donations can be achieved
          using smart contracts. This project runs entirely on testnet, and all
          funds used are not real — they are for educational and testing
          purposes only. Our mission is to explore how even small contributions
          can make a big impact when combined with the power of
          decentralization. <br />
          In this prototype, donations are simulated to support education access
          for underprivileged children in remote areas, showing how Web3
          technology could be applied to solve real-world challenges. Feel free
          to try it out by sending testnet ETH (e.g., SepoliaETH), and see how
          your donation is recorded immutably on the blockchain.
        </motion.p>
        <motion.div
          className="flex-1 max-w-xl p-5"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: { duration: 0.5 },
          }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="relative">
            <img
              src="/grateful.webp"
              className="rounded-3xl h-64 sm:h-96 w-full object-cover absolute -rotate-12 hover:rotate-12 transition-transform duration-500 z-10"
              alt=""
            />
            <div className="rounded-3xl h-64 sm:h-96 bg-cream rotate-12 z-0 opacity-30"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
