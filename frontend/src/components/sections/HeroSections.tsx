import React from "react";
import Button from "../common/Button";

const HeroSections = () => {
  return (
    <section
      id="hero"
      className="mt-24 min-h-screen w-full relative grid place-items-center pb-9"
    >
      <div className="w-full max-w-3xl flex flex-col items-center justify-center gap-5 ">
        <img src="/collaboration.webp" width={"70px"} alt="" />
        <h1 className="font-bold text-6xl text-center h-20 bg-gradient-to-r from-red to-yellow bg-clip-text text-transparent">
          Small Funds, Big Impact
        </h1>
        <p className="font-medium text-center text-dark-brown -mt-4 mb-3">
          Even the smallest contributions can spark change. FundoChain empowers
          you to donate securely and transparently through blockchain
          technology.{" "}
        </p>
        <Button
          type="button"
          text="Contribute"
          icon={<img src="/Two Hearts.webp" width={"30px"} alt="Love Icon" />}
          className="bg-brown text-sm font-semibold hover:bg-yellow text-dark-brown !rounded-full"
          onClick={() => alert("Clicked")}
        />
        <img src="/cuate.webp" width={"300px"} alt="" />
      </div>
      <div className="absolute bottom-5 left-0">
        <img src="/mountains-left.webp" alt="" />
      </div>
      <div className="absolute bottom-10 right-0">
        <img src="/mountains-right.webp" alt="" />
      </div>
    </section>
  );
};

export default HeroSections;
